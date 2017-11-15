let pl = require('./A_programming_language.js')

let specialForms = pl.specialForms
let run = pl.run
let evaluate = pl.evaluate

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

run('do(define(x, 4),',
    '  define(setx, fun(val, set(x, val))),',
    '  setx(50),',
    '  print(x))')                                           // 50
