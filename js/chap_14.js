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

  let resources = PIXI.loader.resources;
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

  // テクスチャアトラスのロード
  loader.add("images/atras.json").load(setup);

  let bicycle, car, airplane, id;

  function setup() {
    // テクスチャアトラス枠からスプライトを作る方法は3つある

    // （１）TextureCacheにアクセス
    let bicycleTexture = TextureCache["pic_bicycle.png"];
    bicycle = new Sprite(bicycleTexture);
    app.stage.addChild(bicycle);

    //（２）loaderのresourcesを使ってテクスチャにアクセスする
    car = new Sprite(resources["images/atras.json"].textures["pic_car.png"]);
    car.x = 100;
    app.stage.addChild(car);

    // 画面中央に配置
    car.y = app.stage.width / 2 - app.stage.height / 2;

    // (3) すべてのテクスチャアトラスに対して `id`というオプションのエイリアスを作成する
    id = PIXI.loader.resources["images/atras.json"].textures;

    // エイリアスを使ってairplaneを作成する
    airplane = new Sprite(id["pic_airplane.png"]);
    app.stage.addChild(airplane);
    airplane.y = 100;
  }
};
