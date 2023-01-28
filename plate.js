/* Preparing products */
const foodList1 = document.querySelector(".foodlist1");
const foodList2 = document.querySelector(".foodlist2");

const productList = [
  {img: "🥕", desc: "Carrot", pct: 0.1},
  {img: "🫑", desc: "Bell Pepper", pct: 0.2},
  {img: "🍅", desc: "Tomato", pct: 0.2},
  {img: "🥬", desc: "Spinach", pct: 0.15},
  {img: "🥦", desc: "Broccoli", pct: 0.15},
  {img: "🍎", desc: "Apple", pct: 0.2},
  {img: "🫐", desc: "Blueberries", pct: 0.1},
  {img: "🍉", desc: "Watermelon", pct: 0.1},
  {img: "🍐", desc: "Pear", pct: 0.1},
  {img: "🍞", desc: "Bread", pct: 0.1},
  {img: "🍝", desc: "Spaghetti", pct: 0.1},
  {img: "🍚", desc: "Rice", pct: 0.15},
  {img: "🥜", desc: "Peanuts", pct: 0.1},
  {img: "🐟", desc: "Fish", pct: 0.25},
  {img: "🥚", desc: "Egg", pct: 0.15},
  {img: "🧀", desc: "Cheese", pct: 0.1},
  {img: "🍗", desc: "Chicken", pct: -0.1},
  {img: "🍟", desc: "French Fries", pct: -0.3},
  {img: "🍫", desc: "Chocolate", pct: -0.2},
  {img: "🍬", desc: "Watermelon", pct: -0.15}
]

productList.forEach( (prod, i) => {
  var newProd = document.createElement("div");
  newProd.classList.add("food");
  var s1 = document.createElement("span");
  s1.innerHTML = prod.img;
  s1.classList.add("food-img");
  newProd.appendChild(s1);
  var s2 = document.createElement("span");
  s2.innerHTML = prod.desc;
  s2.classList.add("food-name");
  newProd.appendChild(s2);
  console.log(newProd)
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

let start,
  offsetY,
  offsetX,
  targetRect,
  target,
  dropped = false,
  expanded = false;

const stopped = () => {
  start = false;
  if (target) {
    showcase.classList.remove("is-dragging");
    target.classList.remove("is-selected");
    drop.classList.remove("is-active");
    drop.classList.remove("is-ready");
  }
  if (dropped) {
    showcase.classList.add("is-preview");
    target.classList.add("is-expanded");
    drop.classList.add("is-dropped");
    drop.textContent = "CLOSE";
    expanded = true;
  } else {
    drop.classList.remove("is-dropped");
    showcase.classList.remove("is-preview");
    target.classList.remove("is-expanded");
    drop.textContent = "LEARN MORE";
    expanded = false;
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
    clientY > drop.offsetTop &&
    clientY < drop.offsetTop + drop.offsetHeight &&
    clientX > drop.offsetLeft &&
    clientX < drop.offsetLeft + drop.offsetWidth &&
    start &&
    !expanded
  ) {
    drop.classList.add("is-ready");
    dropped = true;
  } else {
    drop.classList.remove("is-ready");
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


