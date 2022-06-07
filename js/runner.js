import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

const runnerElem = document.querySelector("[data-runner]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const RUNNER_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let runnerFrame
let currentFrameTime;
let yVelocity;
export function setupRunner() {
  isJumping = false;
  runnerFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(runnerElem, "--bottom", 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

export function updateRunner(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}
export function getRunnerRect() {
  return runnerElem.getBoundingClientRect();
}

export function setRunnerLose() {
  runnerElem.src = "imgs/character-standing.png"
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    runnerElem.src = "imgs/character-standing.png";
    return;
  }

  if (currentFrameTime >= FRAME_TIME) {
    runnerFrame = (runnerFrame + 1) % RUNNER_FRAME_COUNT;
    runnerElem.src = "imgs/character-walk-${runnerFrame}.png";
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(runnerElem, "--bottom", yVelocity * delta)

    if (getCustomProperty(runnerElem, "--bottom",) <= 0){
        setCustomProperty(runnerElem, "--bottom", 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta
}

function onJump(e) {
    if (e.code ! == "Space" || isJumping) return
    yVelocity = JUMP_SPEED
    isJumping = true
}