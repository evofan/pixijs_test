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
  let cat, man;

  //（１）スプライトのアニメーションに、PixiのTickerを使う
  // Pixiのティッカーを使ってループ関数を作る=これはgame loop（ゲームループ）と呼ばれる
  // ゲームループの中に収めるコードは毎秒60回更新される

  function setup() {
    cat = new Sprite(resources["images/cat.png"].texture);
    app.stage.addChild(cat);
    cat.position.set(80, 80);
    cat.anchor.x = 0.5;
    cat.anchor.y = 0.5;

    // Pixiの `ticker`に` gameLoop`関数を追加し、
    // それに `delta`引数を与えてゲームループを始める
    // tickerに追加↓関数は、毎秒60fpsで呼ばれる
    app.ticker.add(delta => gameLoop(delta));

    man = new Sprite(resources["images/pic_man.png"].texture);
    app.stage.addChild(man);
    man.position.set(180, 180);
    man.anchor.x = 0.5;
    man.anchor.y = 0.5;

    // 初回呼び出し
    gameLoop2();
  }

  function gameLoop(delta) {
    // cat.x += 1;

    // deltaの値をオプションとして使える
    // ※delta値はフレーム間の断片的な遅れの量を表す
    // 遅いデバイスで実行している時など、60fpsに追いつくのに苦労している場合に効果が現れる
    // （一般的なゲームエンジンでも使われている考え方）
    cat.x += 1 + delta;
  }

  //（２）スプライトのアニメーションに、requestAnimationFrame()を使う（Tickerを使わない方法）
  function gameLoop2() {
    // 次の画面描画でこの `gameLoop`関数を呼び出す
    //（1秒間に60回発生します）
    requestAnimationFrame(gameLoop2);

    man.x -= 1;
  }

  // どのスタイルを好むかは自分次第
  // 注：一番良いのはrequestAnimationFrame()+経過時間で制御
};
