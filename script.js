const grid = 10;
let body = document.querySelector("body");

let hue;

let colours = ["#f03e3e", "#fd7e14", "#ffe066", "#51cf66", "#228be6", "#cc5de8", "#f783ac", "#868e96", "rainbow"];
let hues = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "monochrome", ""];

function init() {
  for (let j in colours) {
    let el = document.createElement("div");

    if (colours[j].indexOf("#") == 0) {
      el.style.backgroundColor = colours[j];
      el.className = "colour-picker";
    } else {
      el.className = "colour-picker rainbow";
    }

    el.setAttribute("hue", hues[j]);
    el.style.bottom = j * 50 + 20 + "px";

    el.onclick = (e) => {
      hue = e.target.getAttribute("hue");
      e.preventDefault();
    };

    body.appendChild(el);
  }

  let el = document.createElement("div");
  el.className = "trash";
  el.innerText = "♻";
  el.onclick = (e) => {
    body.innerHTML = "";
    init();
  };
  body.appendChild(el);
  hue = null;
}

function drawAtTouch(t) {
  var el = document.createElement("div");
  el.style.top = Math.floor(t.pageY / grid) * grid + "px";
  el.style.left = Math.floor(t.pageX / grid) * grid + "px";
  el.style.width = grid + "px";
  el.style.height = grid + "px";
  el.className = "box";

  if (hue) {
    el.style.backgroundColor = randomColor({ hue: hue });
  } else {
    el.style.backgroundColor = randomColor();
  }
  body.appendChild(el);
}

function handleTouch(e) {
  e.preventDefault();

  let touches = e.changedTouches;
  let text = "touches";

  if (e.buttons && e.buttons == 1 && touches == undefined) {
    touches = [e];
  }

  if (touches) {
    for (let t of touches) {
      drawAtTouch(t);
    }
  }
}

body.ontouchmove = handleTouch;
body.ontouchstart = handleTouch;
body.ontouchend = (e) => {
  e.target == body && e.preventDefault();
};
body.ontouchcancel = (e) => {
  e.preventDefault();
};

body.onmousemove = handleTouch;
init();
