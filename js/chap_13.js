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
  let Sprite = PIXI.Sprite;

  let Rectangle = PIXI.Rectangle;
  let TextureCache = PIXI.utils.TextureCache;

  let app = new Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
  });
  document.body.appendChild(app.view);

  app.renderer.backgroundColor = 0x00000;

  loader.add("images/animals.png").load(setup);

  function setup() {

    // テクスチャーからタイルセットのスプライトを作る
    let texture = TextureCache["images/animals.png"];

    // テクスチャから、抽出したい部分画像の位置とサイズを定義する
    // 矩形オブジェクトを作成します（ `Rectangle`は` PIXI.Rectangle`のエイリアスです）
    let rectangle = new Rectangle(100, 0, 100, 100);

    // その長方形の断面を使用するようにテクスチャに伝えます
    texture.frame = rectangle;

    // テクスチャからスプライトを作成する
    let bird = new Sprite(texture);

    bird.x = 75;
    bird.y = 75;

    app.stage.addChild(bird);

    // app.render.render(app.stage);
  }
};
