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

};
