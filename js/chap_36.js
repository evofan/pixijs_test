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

  // すべてのゲームロジックと、スプライトを動かすコードは、play()関数の中で発生します。
  // この関数は、連続ループで実行されます。これがplay()関数の機能の概要です。

  function play(delta) {
    // 探検家を動かし、それをダンジョンの中に閉じ込めます
    // ブロブモンスターを動かします
    // ブロブと探検家の間の衝突をチェックします
    // 探検家と宝物の間の衝突をチェックします
    // 宝物とドアの間の衝突をチェックします
    // ゲームが勝ったか負けたかを決めます
    // ゲームが終了したら、ゲームの「状態」を「終了」に変更します。
  }

  // これらすべてがどのように機能するのかを見てみましょう。
};
