import { images } from "./images.js";

const gameParameters = {};

const gameStatus = {
  currentScene: null,
};

const mainContainer = {
  element: null,
  width: 320,
  height: 480,
};

const headerContainer = {
  element: null,
  width: mainContainer.width,
  height: mainContainer.height * 0.1,
};

const helpButtonContainer = {
  element: null,
  isShowMessageBox: false,
};

const screenContainer = {
  element: null,
  width: mainContainer.width * 0.9,
  height: mainContainer.height * 0.6,
};

const statusMessageContainer = {
  element: null,
  width: mainContainer.width * 0.9,
  height: mainContainer.height * 0.05,
};

const loaderContainer = {
  progressBarElement: null,
  messageElement: null,
};

const canvas = {
  element: null,
  context: null,
  width: screenContainer.width,
  height: screenContainer.height,
};

window.onload = () => {
  init();
};

const init = () => {
  mainContainer.element = document.getElementById("main-container");
  mainContainer.element.style.position = "relative";
  mainContainer.element.style.width = mainContainer.width + "px";
  mainContainer.element.style.height = mainContainer.height + "px";
  mainContainer.element.style.margin = "5px";
  mainContainer.element.style.fontFamily =
    "'Helvetica Neue',Arial, 'Hiragino Kaku Gothic ProN','Hiragino Sans', Meiryo, sans-serif";
  mainContainer.element.style.backgroundColor = "#f5deb3";
  mainContainer.element.style.border = "2px solid #deb887";
  mainContainer.element.style.boxSizing = "border-box";
  mainContainer.element.style.borderRadius = "5px";
  mainContainer.element.style.display = "flex";
  mainContainer.element.style.alignItems = "center";
  mainContainer.element.style.justifyContent = "center";
  mainContainer.element.style.flexDirection = "column";
  mainContainer.element.style.overflow = "hidden";
  mainContainer.element.style.userSelect = "none";
  mainContainer.element.style.webkitUserSelect = "none";

  headerContainer.element = document.createElement("div");
  headerContainer.element.style.display = "flex";
  headerContainer.element.style.justifyContent = "space-evenly";
  headerContainer.element.style.alignItems = "center";
  headerContainer.element.style.width = headerContainer.width + "px";
  headerContainer.element.style.height = headerContainer.height + "px";
  mainContainer.element.appendChild(headerContainer.element);

  helpButtonContainer.element = document.createElement("div");
  helpButtonContainer.element.classList.add("helpbutton");
  helpButtonContainer.element.textContent = "？";
  const handleHelpButtonDown = () => {
    if (helpButtonContainer.isShowMessageBox) {
      return;
    }
    helpButtonContainer.isShowMessageBox = true;

    const messageBox = document.createElement("div");
    messageBox.style.fontFamily =
      "'Helvetica Neue',Arial, 'Hiragino Kaku Gothic ProN','Hiragino Sans', Meiryo, sans-serif";
    messageBox.style.position = "absolute";
    messageBox.style.top =
      mainContainer.element.getBoundingClientRect().top + 8 + "px";
    messageBox.style.left =
      mainContainer.element.getBoundingClientRect().left + 15 + "px";
    messageBox.style.width = mainContainer.width * 0.85 + "px";
    messageBox.style.height = mainContainer.height * 0.925 + "px";
    messageBox.style.padding = "10px";
    messageBox.style.backgroundColor = "black";
    messageBox.style.opacity = "0.95";
    messageBox.style.color = "white";
    messageBox.style.borderRadius = "10px";
    messageBox.style.textAlign = "center";
    messageBox.style.zIndex = "1";
    const message1 = document.createElement("div");
    message1.textContent = "【ルール説明】";
    messageBox.appendChild(message1);

    const closeButton = document.createElement("div");
    closeButton.style.fontSize = "16px";
    closeButton.style.marginTop = "3px";
    closeButton.style.padding = "3px";
    closeButton.style.backgroundColor = "orange";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.textContent = "閉じる";

    const handleButtonDown = (e) => {
      e.preventDefault();
      helpButtonContainer.isShowMessageBox = false;
      document.body.removeChild(messageBox);
    };

    if (window.ontouchstart === null) {
      closeButton.ontouchstart = handleButtonDown;
    } else {
      closeButton.onpointerdown = handleButtonDown;
    }

    messageBox.appendChild(closeButton);
    document.body.appendChild(messageBox);
  };

  if (window.ontouchstart === null) {
    helpButtonContainer.element.ontouchstart = handleHelpButtonDown;
  } else {
    helpButtonContainer.element.onpointerdown = handleHelpButtonDown;
  }

  headerContainer.element.appendChild(helpButtonContainer.element);

  screenContainer.element = document.createElement("div");
  screenContainer.element.style.position = "relative";
  screenContainer.element.style.backgroundColor = "black";
  screenContainer.element.style.width = screenContainer.width + "px";
  screenContainer.element.style.height = screenContainer.height + "px";
  screenContainer.element.style.margin = "3px";
  screenContainer.element.style.display = "flex";
  screenContainer.element.style.alignItems = "center";
  screenContainer.element.style.justifyContent = "center";
  mainContainer.element.appendChild(screenContainer.element);

  canvas.element = document.createElement("canvas");
  screenContainer.element.appendChild(canvas.element);
  canvas.context = canvas.element.getContext("2d");
  canvas.element.width = canvas.width;
  canvas.element.height = canvas.height;
  canvas.context.fillStyle = "lightcyan";
  canvas.context.fillRect(0, 0, canvas.width, canvas.height);

  statusMessageContainer.element = document.createElement("div");
  statusMessageContainer.element.style.position = "relative";
  statusMessageContainer.element.style.display = "flex";
  statusMessageContainer.element.style.alignItems = "center";
  statusMessageContainer.element.style.justifyContent = "center";
  statusMessageContainer.element.style.backgroundColor = "#deb887";
  statusMessageContainer.element.style.width =
    statusMessageContainer.width + "px";
  statusMessageContainer.element.style.height =
    statusMessageContainer.height + "px";
  statusMessageContainer.element.style.margin = "3px";
  statusMessageContainer.element.style.borderRadius = "10px";
  statusMessageContainer.element.style.fontSize = "16px";
  statusMessageContainer.element.textContent = "START ボタンを押してください";
  mainContainer.element.appendChild(statusMessageContainer.element);

  loaderContainer.progressBarElement = document.createElement("div");
  loaderContainer.progressBarElement.classList.add("progress-bar");
  loaderContainer.progressBarElement.style.position = "absolute";
  loaderContainer.messageElement = document.createElement("div");
  loaderContainer.messageElement.classList.add("message");
  loaderContainer.messageElement.textContent = "読み込み中...";
  mainContainer.element.appendChild(loaderContainer.progressBarElement);
  mainContainer.element.appendChild(loaderContainer.messageElement);

  loadImages();
  gameStatus.currentScene = scene.find((e) => e.name === "initImages");
  tick();
};

const tick = () => {
  gameStatus.currentScene.update();
  requestAnimationFrame(tick);
};

const scene = [
  {
    name: "initImages",
    update: () => {
      if (images.some((image) => image.isLoaded === false)) {
        return;
      }
      loaderContainer.progressBarElement.style.display = "none";
      loaderContainer.messageElement.style.display = "none";
      gameStatus.currentScene = scene.find((e) => e.name === "resetGame");
    },
  },
  {
    name: "resetGame",
    update: () => {},
  },
  {
    name: "ready",
    update: () => {},
  },
  {
    name: "gamePlay",
    update: () => {},
  },
  {
    name: "gameOver",
    update: () => {},
  },
];

const loadImages = () => {
  images.forEach((image) => {
    image.element = new Image();
    image.element.src = image.path;
    image.element.onload = () => {
      image.isLoaded = true;
    };
  });
};

// const drawMap = () => {
//   reels.map((reel) =>
//     reel.cells.map((cell) => {
//       canvas.context.drawImage(
//         images.find((image) => image.name === "image_" + cell.id).element,
//         reel.x,
//         cell.y - cellHeight
//       );
//     })
//   );
// };
