document.addEventListener("DOMContentLoaded", function() {
  // console.log("DOM構築完了");
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
    .add("images/pic_man.png")
    .load(setup);
  let cat;

  // 柔軟性を高めるために、vxとvyの2つの速度プロパティを使用してスプライトの移動速度を制御する。
  // vxは、スプライトの速度と方向をx軸（水平方向）に設定するために使用。
  // vyは、スプライトの速度と方向をy軸（垂直）に設定するために使用。
  // スプライトのx値とy値を直接変更する代わりに、まずvelocity（速度）変数を更新してから、それらの速度値をスプライトに割り当てる。
  // これは、インタラクティブなゲームアニメーションに必要となる、ちょっとしたモジュールになる。

  function setup() {
    cat = new Sprite(resources["images/cat.png"].texture);
    app.stage.addChild(cat);
    cat.position.set(50, 50);
    cat.anchor.x = 0.5;
    cat.anchor.y = 0.5;

    cat.vx = 0;
    cat.vy = 0;

    // Pixiの `ticker`に` gameLoop`関数を追加し、
    // それに `delta`引数を与えてゲームループを始める
    // tickerに追加↓関数は、毎秒60fpsで呼ばれる
    app.ticker.add(delta => gameLoop(delta));
  }

  function gameLoop(delta) {
    // velocityを更新
    // 猫を別の方向に動かしたい場合はどうするか？猫を左に動かすには、vxの値を-1にする。
    // 上に移動させるには、猫に-1のvy値を与える。
    // 猫の動きを速くするには、3、5のようにvxとvyの値を大きくする。
    cat.vx = 3;
    cat.vy = 5;

    // このようにスプライトの速度をモジュール化すると、物理的な制御・実装が容易になる（後々例をみれる）。

    cat.x += cat.vx;
    cat.y += cat.vy;
  }
};
