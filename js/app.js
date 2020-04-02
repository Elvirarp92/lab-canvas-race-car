let gameApp = {
  canvasDom: undefined,
  ctx: undefined,
  background: undefined,
  car: undefined,
  canvasWidth: 500,
  canvasHeight: 700,

  init(id) {
    this.canvasDom = document.getElementById(id)
    this.ctx = this.canvasDom.getContext('2d')
    this.drawBackground()
    this.drawCar()
  },

  drawBackground() {
    this.background = new Background(this.ctx)
    this.background.drawRoad()
    this.background.drawHedges()
    this.background.drawMiddleLine()
    this.background.drawBermLines()
  },

  drawCar() {
    this.car = new Car(this.ctx, this.canvasWidth/2-35, this.canvasHeight-160, 75, 160)
    this.car.init()
  }
}

class Background {
  constructor(ctx) {
    this.ctx = ctx
    this.posX = 0
    this.posY = 0
    this.bgHeight = 700
    this.bgWidth = 500
  }

  drawHedges() {
    this.ctx.fillStyle = 'green'
    this.ctx.fillRect(this.posX, this.posY, 40, this.bgHeight)
    this.ctx.fillRect(this.bgWidth - 40, this.posY, 40, this.bgHeight)
  }

  drawRoad() {
    this.ctx.fillStyle = '#9C9C9C'
    this.ctx.fillRect(this.posX, this.posY, this.bgWidth, this.bgHeight)
  }

  drawMiddleLine() {
    this.ctx.strokeStyle = '#DADADA'
    this.ctx.lineWidth = 10
    this.ctx.setLineDash([80, 40])
    this.ctx.beginPath()
    this.ctx.moveTo(this.bgWidth / 2, 0)
    this.ctx.lineTo(this.bgWidth / 2, this.bgHeight)
    this.ctx.stroke()
    this.ctx.closePath()
  }

  drawBermLines() {
    //left berm
    this.ctx.strokeStyle = '#DADADA'
    this.ctx.lineWidth = 10
    this.ctx.setLineDash([])
    this.ctx.beginPath()
    this.ctx.moveTo(60, 0)
    this.ctx.lineTo(60, this.bgHeight)
    this.ctx.stroke()
    this.ctx.closePath()

    //right berm
    this.ctx.beginPath()
    this.ctx.moveTo(this.bgWidth - 60, 0)
    this.ctx.lineTo(this.bgWidth - 60, this.bgHeight)
    this.ctx.stroke()
    this.ctx.closePath()
  }
}

class Car {
  constructor(ctx, posX, posY, carW, carH) {
    this.ctx = ctx
    this.posX = posX
    this.posY = posY
    this.carW = carW
    this.carH = carH
    this.bgSize = {
      width: 500,
      height: 700
    }
    this.car = undefined
  }

  draw() {
    this.ctx.drawImage(this.car, this.posX, this.posY, this.carW, this.carH)
  }

  init() {
    this.car = new Image()
    this.car.src = 'images/car.png'
    console.log("initialized!")
    this.car.onload = () =>
      this.ctx.drawImage(this.car, this.posX, this.posY, this.carW, this.carH)
  }
}
