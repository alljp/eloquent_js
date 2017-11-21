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

function Player (pos) {
  this.pos = pos.plus(new Vector(0, -0.5))
  this.size = new Vector(0.8, 1.5)
  this.speed = new Vector(0, 0)
}
Player.prototype.type = 'player'

function Coin (pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1))
  this.size = new Vector(0.6, 0.6)
  this.wobble = Math.random() * Math.PI * 2
}
Coin.prototype.type = 'coin'
 