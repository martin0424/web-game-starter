import { setupGround, updateGround } from './ground.js'
import { updateRunner, setupRunner, getRunnerRect, setRunnerLose} from './runner.js'
import { updateTree, setupTree, getTreeRects } from './tree.js'

const APP_WIDTH = 200;
const APP_HEIGHT = 60;
const SPEED_SCALE_INCREASE = 0.00001

const appElem = document.querySelector('[data-app]');
const scoreElem = document.querySelector('[data-score]')
const startScreenElem = document.querySelector('[data-start-screen]')

setPixelToAppScale();
window.addEventListener("resize", setPixelToAppScale);
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedScale
let score
function update(time) {
	if (lastTime == null) {
		lastTime = time
		window.requestAnimationFrame(update)
		return
	}
	const delta = time - lastTime
	
	updateGround(delta, speedScale)
	updateRunner(delta, speedScale)
	updateTree(delta, speedScale)
	updateSpeedScale(delta)
	updateScore(delta)
	if (checkLose()) return handleLose()

	lastTime = time
	window.requestAnimationFrame(update)
}

function checkLose(){
	const runnerRect = getRunnerRect()
	return getRunnerRect().some(rect => isCollision(rect,runnerRect))
}

function isCollision(rect1, rect2) {
	return (
		rect1.left < rect2.right &&
		rect1.top < rect2.bottom &&
		rect1.right > rect2.left &&
		rect1.bottom > rect2.top
	)
}

function updateSpeedScale(delta) {
	speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
	score += delta * 0.01
	scoreElem.textContent = Math.floor(score)
}

function handleStart(){
	lastTime = null
	speedScale = 1
	score = 0
	setupGround()
	setupRunner()
	setupTree()
	startScreenElem.classList.add("hide")
	window.requestAnimationFrame(update)
}
function handleLose() {
	setRunnerLose()
	setTimeout(() => {
		document.addEventListener("keydown", handleStart, { once : true})
		startScreenElem.classList.remove("hide")
	}, 100)
}

function setPixelToAppScale() {
	let appToPixelScale
	if (window.innerWidth / window.innerHeight < APP_WIDTH / APP_HEIGHT);
	{
		appToPixelScale = window.innerWidth / APP_WIDTH
	} else {
		appToPixelScale = window.innerHeight / APP_HEIGHT
	}
}

appElem.style.width = `${APP_WIDTH * appToPixelScale}px`;
appElem.style.height = `${APP_HEIGHT * appToPixelScale}px`; 