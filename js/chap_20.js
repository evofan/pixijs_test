document.addEventListener("DOMContentLoaded", function() {
  setPixi();
});

let setPixi = function() {
  let type = "WebGL";

  if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
  }
};

let Application = PIXI.Application;
let loader = PIXI.loader;
let resources = PIXI.loader.resources;
let Sprite = PIXI.Sprite;

let app = new Application({
  width: 256,
  height: 256,
  antialias: true,
  transparent: false,
  resolution: 1
});

app.renderer.backgroundColor = 0x00000;
document.body.appendChild(app.view);

loader.add("images/cat.png").load(setup);
let cat;
let state;

// もう少し手を加えるだけで、キーボードを使用してスプライトを制御する簡単なシステムを構築できる。
// コードを単純化するために、キーボードと呼ばれるこのカスタム関数を使用して、キーボードイベントを監視してキャプチャすることをお勧めする。

function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  // ダウンハンドラー
  key.downHandler = event => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  // アップハンドラー
  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  // イベントリスナーを追加
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  window.addEventListener("keydown", downListener, false);
  window.addEventListener("keyup", upListener, false);

  // イベントリスナーを削除
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };

  return key;
}

function setup() {
  cat = new Sprite(resources["images/cat.png"].texture);
  app.stage.addChild(cat);
  cat.position.set(50, 50);
  cat.anchor.x = 0.5;
  cat.anchor.y = 0.5;

  cat.vx = 0;
  cat.vy = 0;

  app.stage.addChild(cat);

  // キーボードの矢印キーをキャプチャーする
  let left = keyboard("ArrowLeft"),
    up = keyboard("ArrowUp"),
    right = keyboard("ArrowRight"),
    down = keyboard("ArrowDown");

  // 左矢印キー押した時の処理
  left.press = () => {
    // キーが押された時に猫の速度を変える
    cat.vx = -5;
    cat.vy = 0;
  };

  // 左矢印キー離した時の処理
  left.release = () => {
    // 左矢印が離され、右矢印が下向きでなく、猫が上下に動いていない場合：猫を停止する
    if (!right.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };

  // 上矢印キー押した時の処理
  up.press = () => {
    cat.vy = -5;
    cat.vx = 0;
  };
  // 上矢印キー離した時の処理
  up.release = () => {
    if (!down.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };

  // 右矢印キー押した時の処理
  right.press = () => {
    cat.vx = 5;
    cat.vy = 0;
  };
  // 右矢印キー離した時の処理
  right.release = () => {
    if (!left.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };

  // 下矢印キー押した時の処理
  down.press = () => {
    cat.vy = 5;
    cat.vx = 0;
  };
  // 下矢印キー離した時の処理
  down.release = () => {
    if (!up.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };

  // ゲームのステートを設定する
  state = play;

  // ゲームループをスタートする
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  // 現在のゲームステートを更新する
  state(delta);
}

function play(delta) {
  // 速度を使って猫を動かします
  cat.x += cat.vx;
  cat.y += cat.vy;
}
