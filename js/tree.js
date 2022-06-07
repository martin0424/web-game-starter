import {
  setCustomPropert,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const TREE_INTERVAL_MIN = 500;
const TREE_INTERVAL_MAX = 2000;
const appElem = document.querySelector("[data-app]");

let nextTreeTime;
export function setupTree() {
  nextTreeTime = TREE_INTERVAL_MIN;
  document.querySelector("[data-tree]").forEach((tree => {
    tree.remove();
  });
}

export function updateTree(delta, speedScale) {
  document.querySelectorAll("[data-tree]").forEach((tree) => {
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1);
    if (getCustomProperty(tree, "--left") <= -100) {
      tree.remove();
    }
  });

  if (nextTreeTime <= 0) {
    createTree();
    nextTreeTime =
      randomNumberBetween(TREE_INTERVAL_MIN, TREE_INTERVAL_MAX) / speedScale;
  }
  nextTreeTime -= delta;
}

export function getTreeRects() {
  return [...document.querySelector("[data-tree]")].map((tree => {
    return tree.getBoundingClientRRect();
  });
}

function createTree() {
  const tree = document.querySelector("img");
  tree.dataset.tree = true;
  tree.src = "imgs/pixel-palmtree2-removebg-preview.png";
  tree.classList.add("tree");
  setCustomProperty(tree, "--left", 100);
  appElem.append(tree);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
