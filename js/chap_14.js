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

  // テクスチャアトラスのロード
  loader.add("images/atras.json").load(setup);



let bicycle, explorer, treasure, id;

function setup() {

  // テクスチャアトラス枠からスプライトを作る方法は3つある

  // （１）TextureCacheにアクセス
  let bicycleTexture = TextureCache["pic_jitensya.png"];
  bicycle = new Sprite(bicycleTexture);
  app.stage.addChild(bicycle);

  
/*
  //2. Access the texture using through the loader's `resources`:
  explorer = new Sprite(
    resources["images/treasureHunter.json"].textures["explorer.png"]
  );
  explorer.x = 68;

  //Center the explorer vertically
  explorer.y = app.stage.height / 2 - explorer.height / 2;
  app.stage.addChild(explorer);

  //3. Create an optional alias called `id` for all the texture atlas 
  //frame id textures.
  id = PIXI.loader.resources["images/treasureHunter.json"].textures; 
  
  //Make the treasure box using the alias
  treasure = new Sprite(id["treasure.png"]);
  app.stage.addChild(treasure);

  //Position the treasure next to the right edge of the canvas
  treasure.x = app.stage.width - treasure.width - 48;
  treasure.y = app.stage.height / 2 - treasure.height / 2;
  app.stage.addChild(treasure);
  */
  }

};
