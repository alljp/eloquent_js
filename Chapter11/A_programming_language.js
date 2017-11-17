function parseExpression (program) {
  program = skipSpace(program)
  let match, expr
  if (match = /^"([^"]*)"/.exec(program)) {
    expr = {type: 'value', value: match[1]}
  } else if (match = /^\d+\b/.exec(program)) {
    expr = {type: 'value', value: Number(match[0])}
  } else if (match = /^[^\s(),"]+/.exec(program)) {
    expr = {type: 'word', name: match[0]}
  } else {
    throw new SyntaxError('Unexpected syntax: ' + program)
  }
  return parseApply(expr, program.slice(match[0].length))
}

function skipSpace (string) {
  let skip = string.match(/^(#.*|\s)*/)
  return string.slice(skip[0].length)
}

function parseApply (expr, program) {
  program = skipSpace(program)
  if (program[0] !== '(') {
    return {expr: expr, rest: program}
  }
  program = skipSpace(program.slice(1))
  expr = {type: 'apply', operator: expr, args: []}
  while (program[0] !== ')') {
    let arg = parseExpression(program)
    expr.args.push(arg.expr)
    program = skipSpace(arg.rest)
    if (program[0] === ',') {
      program = skipSpace(program.slice(1))
    } else if (program[0] !== ')') {
      throw new SyntaxError("Expected ',' or ')'")
    }
  }
  return parseApply(expr, program.slice(1))
}

function parse (program) {
  let result = parseExpression(program)
  if (skipSpace(result.rest).length > 0) {
    throw new SyntaxError('Unexpected text after program')
  }
  return result.expr
}
// Parse output
//    operator: {type: "word", name: "+"},
//    args: [{type: "word", name: "a"},
//           {type: "value", value: 10}]}

function evaluate (expr, env) {
  switch (expr.type) {
    case 'value':
      return expr.value

    case 'word':
      if (expr.name in env) {
        return env[expr.name]
      } else {
        throw new ReferenceError('Undefined variable: ' + expr.name)
      }
    case 'apply':
      if (expr.operator.type === 'word' && expr.operator.name in specialForms) {
        return specialForms[expr.operator.name](expr.args, env)
      }
      let op = evaluate(expr.operator, env)
      if (typeof op !== 'function') {
        throw new TypeError('Applying a non-function.')
      }
      return op.apply(null, expr.args.map(function (arg) {
        return evaluate(arg, env)
      }))
  }
}

let specialForms = Object.create(null)

specialForms['if'] = function (args, env) {
  if (args.length !== 3) {
    throw new SyntaxError('Bad number of args to if')
  }

  if (evaluate(args[0], env) !== false) {
    return evaluate(args[1], env)
  } else {
    return evaluate(args[2], env)
  }
}

specialForms['while'] = function (args, env) {
  if (args.length !== 2) {
    throw new SyntaxError('Bad number of args to while')
  }
  while (evaluate(args[0], env) !== false) {
    evaluate(args[1], env)
  }
  // Since undefined does not exist in Egg, we return false,
  // for lack of a meaningful result.
  return false
}

specialForms['do'] = function (args, env) {
  let value = false
  args.forEach(function (arg) {
    value = evaluate(arg, env)
  })
  return value
}

specialForms['define'] = function (args, env) {
  if (args.length !== 2 || args[0].type !== 'word') {
    throw new SyntaxError('Bad use of define')
  }
  let value = evaluate(args[1], env)
  env[args[0].name] = value
  return value
}

specialForms['fun'] = function (args, env) {
  if (!args.length) {
    throw new SyntaxError('Functions need a body')
  }
  function name (expr) {
    if (expr.type !== 'word') {
      throw new SyntaxError('Arg names must be words')
    }
    return expr.name
  }
  let argNames = args.slice(0, args.length - 1).map(name)
  let body = args[args.length - 1]

  return function () {
    if (arguments.length !== argNames.length) {
      throw new TypeError('Wrong number of arguments')
    }
    let localEnv = Object.create(env)
    for (let i = 0; i < arguments.length; i++) {
      localEnv[argNames[i]] = arguments[i]
    }
    return evaluate(body, localEnv)
  }
}

specialForms['set'] = function (args, env) {
  if (args.length !== 2 || args[0].type !== 'word') {
    throw new SyntaxError('Bad use of set')
  }
  let varName = args[0].name
  let value = evaluate(args[1], env)

  for (let scope = env; scope; scope = Object.getPrototypeOf(scope)) {
    if (Object.prototype.hasOwnProperty.call(scope, varName)) {
      scope[varName] = value
      return value
    }
  }
  throw new ReferenceError('Setting undefined variable ' + varName)
}

let topEnv = Object.create(null)
let ops = ['+', '-', '*', '/', '==', '<', '>']

topEnv['true'] = true
topEnv['false'] = false

ops.forEach(function (op) {
  topEnv[op] = new Function('a, b', 'return a ' + op + ' b')
})

topEnv['print'] = function (value) {
  console.log(value)
  return value
}

topEnv['array'] = function () {
  return Array.prototype.slice.call(arguments, 0)
}

topEnv['length'] = function (array) {
  return array.length
}

topEnv['element'] = function (array, i) {
  return array[i]
}

function run () {
  let env = Object.create(topEnv)
  let program = Array.prototype.slice.call(arguments, 0).join('\n')
  return evaluate(parse(program), env)
}

module.exports.run = run
module.exports.evaluate = evaluate
module.exports.topEnv = topEnv
module.exports.specialForms = specialForms
// Examples
// run(' do ( define ( total , 0) ,',
// 'define ( count , 1) ,',
// 'while ( <( count , 11) ,',
// 'do ( define ( total , +( total , count )) ,',
// 'define ( count , +( count , 1) ))) ,',
// 'print ( total ) ) ')                            // 55

// let prog = parse('if(true, false, true)')
// console.log(evaluate(prog, topEnv))              // false

// run('do(define(plusOne, fun(a, +(a, 1))),',
// '   print(plusOne(10)))')                        // 11

// // run('+(a,2)')                                 // ReferenceError: Undefined variable: a

console.log(run('do(define(plusOne, fun(a, +(a, 1))),',
'   print(plusOne(10)))'))

run('do(define(sum, fun(array,',
    '     do(define(i, 0),',
    '        define(sum, 0),',
    '        while(<(i, length(array)),',
    '          do(define(sum, +(sum, element(array, i))),',
    '             define(i, +(i, 1)))),',
    '        sum))),',
    '   print(sum(array(1, 2, 3))))')

run('print(array(2,4,1))')

run('do(define(x, 4),',
    '  define(setx, fun(val, set(x, val))),',
    '  setx(50),',
    '  print(x))')
