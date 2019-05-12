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

  // play()関数はまた、ブロブモンスターを移動させ、それらをダンジョンの壁の中に閉じ込めたままにし、
  // そしてそれぞれのプレイヤーとの衝突をチェックします。
  // ブロブがダンジョンの上壁または下壁にぶつかると、方向が逆になります。
  // これはすべて、毎フレームでBLOB配列内のBLOBスプライトのそれぞれを繰り返すforEach()ループを使用して行われます。

  /*
  blobs.forEach(function(blob) {
    // ブロブを移動する
    blob.y += blob.vy;

    // BLOBのスクリーン上の境界をチェックする
    let blobHitsWall = contain(blob, { x: 28, y: 10, width: 488, height: 480 });

    // ブロブがステージの上または下に当たった場合は、方向を逆にします
    if (blobHitsWall === "top" || blobHitsWall === "bottom") {
      blob.vy *= -1;
    }

    // 衝突をテストします。 いずれかの敵が探検家に触れている場合は、`explorerHit`を` true`に設定します。
    if (hitTestRectangle(explorer, blob)) {
      explorerHit = true;
    }
  });
  */

  //  このコードでは、contain()関数の戻り値を使用してBLOBを壁から反射させる方法がわかります。
  // 戻り値を取得するためにblobHitsWallという変数が使用されます。

  // let blobHitsWall = contain(blob, { x: 28, y: 10, width: 488, height: 480 });

  // blobHitsWallは通常未定義です。
  // しかし、ブロブが上の壁に当たった場合、blobHitsWallの値は"top"になります。
  // ブロブが底壁に当たった場合、blobHitsWallは "bottom"という値になります。
  // これらのケースのいずれかが当てはまる場合は、速度を逆にすることでブロブの方向を逆にすることができます。
  // これを行うコードは次のとおりです。

  /*
  if (blobHitsWall === "top" || blobHitsWall === "bottom") {
    blob.vy *= -1;
  }
  */

  // ブロブのvy（vertical velocity：垂直速度）値に-1を掛けると、その移動方向が反転します。
};
