function Level (plan) {
  this.width = plan[0].length
  this.height = plan.length
  this.grid = []
  this.actors = []

  for (let y = 0; y < this.height; y++) {
    let line = plan[y]
    let gridLine = []
    for (let x = 0; x < this.width; x++) {
      let ch = line[x]
      let fieldType
      let Actor = actorChars[ch]
      if (Actor) {
        this.actors.push(new Actor(new Vector(x, y), ch))
      } else if (ch === 'x') {
        fieldType = 'wall'
      } else if (ch === '!') {
        fieldType = 'lava'
      }
      gridLine.push(fieldType)
    }
    this.grid.push(gridLine)
  }
  this.player = this.actors.filter(function (actor) {
    return actor.type === 'player'
  })[0]
  this.status = this.finishDelay = null
}

function Vector (x, y) {
  this.x = x
  this.y = y
  Vector.prototype.plus = function (other) {
    return new Vector(this.x + other.x, this.y + other.y)
  }
  Vector.prototype.times = function (factor) {
    return new Vector(this.x * factor, this.y * factor)
  }
}

let actorChars = {
  '@': Player,
  'o': Coin,
  '=': Lava,
  '|': Lava,
  'v': Lava
}
