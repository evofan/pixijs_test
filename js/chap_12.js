document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM構築完了");
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

  // Pixiが自動的に作成したcanvasをHTMLドキュメントに追加する
  document.body.appendChild(app.view);

  // 画像をロードし、完了したらsetup()を実行する
  loader.add("images/cat.png").load(setup);

  let cat;

  // このsetup()は画像の読み込みが完了した時に実行される
  function setup() {
    // catのスプライトを作成する
    cat = new Sprite(resources["images/cat.png"].texture);

    app.stage.addChild(cat);

    cat.position.set(122, 122);

    // スプライトのアンカーポイントを指定（0-1）
    // cat.anchor.x = 0.5;
    // cat.anchor.y = 0.5;

    // 同時に設定
    // cat.anchor.set(0.5, 0.5);

    // ピボットでも指定可能（px指定）
    cat.pivot.set(50, 50);

    // 回転させる（ラジアンで指定）
    cat.rotation = 0.5;
  }
};
