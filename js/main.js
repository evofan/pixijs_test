// Learning Pixi
// https://github.com/kittykatattack/learningPixi

// pixiの表示タイプを指定
let type = "WebGL";

if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

PIXI.utils.sayHello(type); // Pixi.js 4.5.3 - ✰ WebGL ✰      http://www.pixijs.com/    ♥♥♥

// Pixiアプリケーションを作成する
let app = new PIXI.Application({
  width: 256,
  height: 256
});

// Pixiが自動的に作成したcanvasをHTMLドキュメントに追加する
document.body.appendChild(app.view);
