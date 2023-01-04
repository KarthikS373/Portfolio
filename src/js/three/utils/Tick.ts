import { EventEmitter } from "events"

class Tick extends EventEmitter {
  currentTime: number
  deltaTime: number
  elapsedTime: number
  start: number

  constructor() {
    super()

    this.start = Date.now()
    this.currentTime = this.start

    this.elapsedTime = 0
    this.deltaTime = 17

    this.update()
  }

  update() {
    const targetTime = Date.now()
    this.deltaTime = targetTime - this.currentTime

    this.currentTime = targetTime
    this.elapsedTime = this.currentTime - this.start

    this.emit("update", { elapsed: this.elapsedTime, delta: this.deltaTime })
    this.raf()
  }

  raf() {
    window.requestAnimationFrame(this.update.bind(this))
  }
}

export default Tick
