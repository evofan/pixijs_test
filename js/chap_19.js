document.addEventListener("DOMContentLoaded", function() {
  setPixi();
});

let setPixi = function() {
  let type = "WebGL";

  if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
  }

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

  loader
    .add("images/cat.png")
    .load(setup);
  let cat;
  let state;

  // スタイルの問題と、あなたのコードをモジュール化するのを助けるために、
  // ゲームループをこのように構築することを勧める：

  function setup() {
    cat = new Sprite(resources["images/cat.png"].texture);
    app.stage.addChild(cat);
    cat.position.set(50, 50);
    cat.anchor.x = 0.5;
    cat.anchor.y = 0.5;

    cat.vx = 0;
    cat.vy = 0;

    // ゲームのステートを設定
    state = play;

    app.ticker.add(delta => gameLoop(delta));
  }

  function gameLoop(delta) {
    // 現在のゲームステートを更新
    state(delta);
  }

  function play(delta) {
    cat.vx = 1;
    cat.x += cat.vx;
  }

  // このようにゲームのループを構成すると、
  // ゲームのシーンやレベル（背景）を切り替えるなどの作業がはるかに簡単になる。
};
