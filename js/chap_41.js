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

  // これまで、x、y、visible、およびrotationなど、便利なスプライトプロパティをいくつか使用して、
  // スプライトの位置と外観を制御できるようにする方法を学びました。
  // しかし、Pixi Spritesにはもっと楽しいプロパティがたくさんあります。
  // これが完全なリストです（http://pixijs.download/release/docs/PIXI.Sprite.html）。

  // ※例：
  //
  // □Member
  // aplha, blendmode, buttonMode, caheAsBitmap, filters, cursor, hitArea, name, pivot, shader,
  // texture, tint, visible,
  //
  // □Methods
  // addChild, getBounds, getChildByName, getLocalBounds, removeChild, renderCanvas , renderWebGL
  // setTransform, toGlobal, toLocal
  //
  // □Event
  // click, mousedown, ↓rightclick, tap, touchend, touchendoutside
  // ポインターデバイスの2次ボタン（通常はマウスの右ボタン）が表示オブジェクト上で押されて放されたときに発生します。
  // イベントを発生させるには、DisplayObjectのinteractiveプロパティをtrueに設定する必要があります。

  // Pixiのクラス継承システムはどのように機能しますか？
  // （クラスと継承とは何ですか？調べるにはこのリンクをクリックしてください）
  // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects
  // Pixiのスプライトは、次のような継承モデルに基づいています。

  // DisplayObject > Container > Sprite

  // 継承とは、チェーンの後半のクラスが、チェーンの前の方のクラスのプロパティとメソッドを使用することを意味します。
  // つまり、Spriteはチェーンの最後のクラスですが、独自の固有のプロパティに加えて、DisplayObjectおよびContainerと同じプロパティをすべて持っています。
  // 最も基本的なクラスはDisplayObjectです。
  // DisplayObjectであるものなら何でもステージ上にレンダリングできます。
  // コンテナは継承チェーンの次のクラスです。
  // DisplayObjectが他のDisplayObjectのコンテナとして機能することを可能にします。
  // チェーンの3番目にあるのはSpriteクラスです。
  // スプライトはステージ上に表示することも、他のスプライトのコンテナにすることもできます。
};
