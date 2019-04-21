document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM構築完了");
  setPixi();
});

let setPixi = function() {
  // pixiの表示タイプを指定
  let type = "WebGL";

  if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
  }

  // エイリアスの使用
  let Application = PIXI.Application;
  let loader = PIXI.loader;
  let resources = PIXI.loader.resources;
  let Sprite = PIXI.Sprite;

  let app = new Application({
    width: 320, // default: 800
    height: 120, // default: 600
    antialias: true, // default: false、ターゲット（プラットフォーム）により使えないので注意
    transparent: false, // default: false、キャンバスの背景を透明にする
    resolution: 1 // default: 1、レティナ対応？通常殆ど1でOK
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
};
