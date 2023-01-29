/* Preparing products */
const foodList1 = document.querySelector(".foodlist1");
const foodList2 = document.querySelector(".foodlist2");

const productList = [
  {img: "🥕", desc: "Carrot", pct: 0.15},
  {img: "🫑", desc: "Bell Pepper", pct: 0.2},
  {img: "🍅", desc: "Tomato", pct: 0.2},
  {img: "🥦", desc: "Broccoli", pct: 0.15},
  {img: "🍎", desc: "Apple", pct: 0.5},
  {img: "🫐", desc: "Blueberries", pct: 0.15},
  {img: "🍉", desc: "Watermelon", pct: 0.1},
  {img: "🍐", desc: "Pear", pct: 0.1},
  {img: "🍞", desc: "Bread", pct: 0.2},
  {img: "🍝", desc: "Spaghetti", pct: 0.1},
  {img: "🍚", desc: "Rice", pct: 0.15},
  {img: "🐟", desc: "Fish", pct: 0.25},
  {img: "🥚", desc: "Egg", pct: 0.15},
  {img: "🧀", desc: "Cheese", pct: 0.05},
  {img: "🍗", desc: "Chicken", pct: -0.1},
  {img: "🍟", desc: "French Fries", pct: -0.3},
  {img: "🍫", desc: "Chocolate", pct: -0.2},
  {img: "🍬", desc: "Watermelon", pct: -0.15}
]

productList.forEach( (prod, i) => {
  var newProd = document.createElement("div");
  newProd.setAttribute('pct', prod.pct);
  newProd.classList.add("food");
  var s1 = document.createElement("span");
  s1.innerHTML = prod.img;
  s1.classList.add("food-img");
  newProd.appendChild(s1);
  var s2 = document.createElement("span");
  s2.innerHTML = prod.desc;
  s2.classList.add("food-name");
  newProd.appendChild(s2);

  if (i % 2 == 0) {
    foodList1.appendChild(newProd);
  } else {
    foodList2.appendChild(newProd);
  }
})

/* Game */
const foods = document.querySelectorAll(".food");
const drop = document.querySelector(".drop");
const plate = document.querySelector(".plate");
const showcase = document.querySelector(".showcase");
const progressbar = document.querySelector(".progress-bar");

let start,
  offsetY,
  offsetX,
  targetRect,
  target,
  dropped = false,
  expanded = false,
  pct = 0,
  onPlate = [];

const stopped = () => {
  start = false;
  if (target) {
    showcase.classList.remove("is-dragging");
    target.classList.remove("is-selected");
    drop.classList.remove("is-active");
  }
  if (dropped) {
    pct += Math.round(Number(target.getAttribute("pct")) * 100);
    progressbar.style = `width: ${pct}%`;
    if (pct >= 100) {
      openModal();
    }
  } 
};

const started = (e, type) => {
  start = true;
  target = e.target;
  if (type === "touch") {
    console.log(e.touches[0]);
    offsetY = target.offsetWidth / 2 + target.offsetTop;
    offsetX = target.offsetWidth / 2 + target.offsetLeft;
  } else {
    offsetY = e.offsetY + target.offsetTop;
    offsetX = e.offsetX + target.offsetLeft;
  }
  targetRect = target.getBoundingClientRect();
  target.classList.add("is-selected");
  showcase.classList.add("is-dragging");
};

foods.forEach(food => {
  food.addEventListener("mousedown", e => {
    started(e, "mouse");
  });
  food.addEventListener("touchstart", e => {
    started(e, "touch");
  });
});

const docUp = () => {
  if (!expanded && target) {
    stopped();
  }
};

document.addEventListener("mouseup", () => {
  docUp();
});
document.addEventListener("touchend", () => {
  docUp();
});

const docMove = (e, type) => {
  let clientX = 0,
    clientY = 0;

  if (type === "touch") {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  if (
    clientY > plate.offsetTop &&
    clientY < plate.offsetTop + plate.offsetHeight &&
    clientX > plate.offsetLeft &&
    clientX < plate.offsetLeft + plate.offsetWidth &&
    start &&
    !expanded
  ) {
    dropped = true;
  } else {
    dropped = false;
  }

  if (start && !expanded) {
    target.style.transform = `translateY(${clientY -
      offsetY}px) translateX(${clientX - offsetX}px)`;
  }
};

document.addEventListener("mousemove", e => {
  docMove(e, "mouse");
});
document.addEventListener("touchmove", e => {
  docMove(e, "touch");
});

drop.addEventListener("click", () => {
  if (expanded) {
    dropped = false;
    target.style.transform = "none";
    stopped();
  }
});

function isInArray(string, array) {
  return array.indexOf(string) !== -1;
}

function deleteFromArray(string, array) {
  return array.filter(item => item !== string);
}

function openModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}