import Experience from "./js/three"
import Main from "./js/general"

import "./style/style.scss"

const canvas: Element = document.querySelector("canvas#webgl")!

const experience = new Experience(canvas)
const main = new Main()

window.experience = experience
window.main = main
