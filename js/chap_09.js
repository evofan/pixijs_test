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
    width: 320,
    height: 240,
    antialias: true,
    transparent: false,
    resolution: 1
  });

  // Pixiが自動的に作成したcanvasをHTMLドキュメントに追加する
  document.body.appendChild(app.view);

  // 画像をロードし、完了したらsetup()を実行する
  loader.add("images/cat.png").load(setup);

  let cat;

  // 既存のイメージオブジェクトからスプライトを作成する
  let base = new PIXI.BaseTexture(imgElement);
  let texture = new PIXI.Texture(base);
  let man = new PIXI.Sprite(texture);
  app.stage.addChild(man);
  man.x = 100;
  man.y = 10;

  // このsetup()は画像の読み込みが完了した時に実行される
  function setup() {
    // catのスプライトを作成する
    cat = new Sprite(resources["images/cat.png"].texture);

    // ステージにcatを追加する
    app.stage.addChild(cat);
    cat.y = 10;

    // スプライト（cat）を削除する
    // app.stage.removeChild(cat);

    // より簡単に効率的に削除する
    // cat.visible = false;
  }

  let canvas = document.getElementById("myCanvas")
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.fillStyle = 'rgb(192, 255, 192)';
  ctx.arc(80, 40, 30, 0, Math.PI*2, false);
  ctx.fill();

  // 既存のキャンバス要素からテクスチャを作成する。
  let base2 = new PIXI.BaseTexture.fromCanvas(myCanvas);
  let texture2 = new PIXI.Texture(base2);
  let circle = new PIXI.Sprite(texture2);
  app.stage.addChild(circle);
  circle.x = 10;
  circle.y = 100;
};
