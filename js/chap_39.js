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

  // 上記のループ内のコードは、いずれかの敵が探検家に触れたかどうかを判断するためにhitTestRectangle()を使用しています。

  /*
  if(hitTestRectangle(explorer, blob)) {
    explorerHit = true;
  }
  */

  // hitTestRectangle()がtrueを返す場合、それは衝突があったことを意味し、explorerHitという変数がtrueに設定されます。
  // explorerHitがtrueの場合、play()関数は探検家を半透明にし、体力バーの幅を1ピクセル縮小します。

  /*
  if(explorerHit) {

    // 冒険家を半透明にする
    explorer.alpha = 0.5;

    // 体力バーの内側の長方形の幅を1ピクセル減らす
    healthBar.outer.width -= 1;

  } else {

    // ヒットしていない場合は、冒険家を完全に不透明'Opaque'（不透明'non-transparent'）にします。
    explorer.alpha = 1;
  }

  // explorerHitがfalseの場合、冒険家のalphaプロパティは1に維持され、完全に不透明（のまま）になります。

  // play()関数はまた宝箱と探検家間の衝突をチェックします。
  // ヒットした場合、宝物はわずかにオフセットされた状態で探索者探検家の位置に設定されます。
  // これはそれが探検家が宝物を運んでいるように見えます。

  // これを行うコードは次のとおりです。

  /*
  if (hitTestRectangle(explorer, treasure)) {
    treasure.x = explorer.x + 8;
    treasure.y = explorer.y + 8;
  }
  */
};
