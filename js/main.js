// Learning Pixi
// https://github.com/kittykatattack/learningPixi

// pixiの表示タイプを指定
let type = "WebGL";

if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

PIXI.utils.sayHello(type); // Pixi.js 4.5.3 - ✰ WebGL ✰      http://www.pixijs.com/    ♥♥♥

// Pixiアプリケーションを作成する
/*
let app = new PIXI.Application({
  width: 256,
  height: 256
});
*/

// 横幅・高さ以外にも様々なオプション・オブジェクトがある
// let app = new PIXI.Application({

// エイリアスの使用
let Application = PIXI.Application;
let loader = PIXI.loader;
let resources = PIXI.loader.resources;
let Sprite = PIXI.Sprite;


let app = new Application({
  width: 512, // default: 800
  height: 512, // default: 600
  antialias: true, // default: false、ターゲット（プラットフォーム）により使えないので注意
  transparent: false, // default: false、キャンバスの背景を透明にする
  resolution: 1 // default: 1、レティナ対応？通常殆ど1でOK
});

// Pixiが自動的に作成したcanvasをHTMLドキュメントに追加する
document.body.appendChild(app.view);

// テクスチャーの指定
// let texture = PIXI.utils.TextureCache["images/cat.png"];

// ↑エイリアス使用して↓のように書ける
let TextureCache = PIXI.utils.TextureCache;
let texture = TextureCache["images/cat.png"]

// let sprite = new PIXI.Sprite(texture);

// 画像をロードし、完了したらsetup()を実行する
// PIXI.loader.add("images/cat.png").load(setup);

// エイリアスの使用
loader.add("images/cat.png").load(setup);

let cat;

// このsetup()は画像の読み込みが完了した時に実行される
function setup() {

  // catのスプライトを作成する
  // cat = new PIXI.Sprite(PIXI.loader.resources["images/cat.png"].texture);

  // エイリアスの使用
  cat = new Sprite(resources["images/cat.png"].texture)

  // ステージにcatを追加する
  app.stage.addChild(cat);

  // スプライト（cat）を削除する
  // app.stage.removeChild(cat);

  // より簡単に効率的に削除する
  // cat.visible = false;

};

// アトラス（スプライトシート）の使用
