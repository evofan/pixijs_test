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
  let Container = PIXI.Container;
  let ParticleContainer = PIXI.ParticleContainer;
  let Graphics = PIXI.Graphics;

  let app = new Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
  });

  app.renderer.backgroundColor = 0x00000;
  document.body.appendChild(app.view);

  // イメージテクスチャの使用はスプライトを作成するための最も便利な方法の1つだが、Pixiには独自の低レベルの描画ツールもある。
  // あなたはそれらを使って長方形、シェイプ（さまざまな形）、線、複雑な多角形や、テキストを作る事が出来る。
  // そして幸いな事に、これはCanvas Drawing APIとほぼ同じAPIを使用しているので、すでにキャンバスに慣れている人にとっては、特に学ぶことは無い。
  // しかし大きな利点は、Canvas Drawing APIとは異なり、Pixiを使用して描画した図形がGPU上のWebGLによってレンダリングされる事である。
  // Pixiを使用すると、あなたを未開発のパフォーマンス力に到達させる。

  // 基本的な形の作り方を簡単に見てみましょう。これが先のコードで作るすべての形です。

  // 25.長方形
  // すべての形状は、最初にPixiのGraphicsクラス（PIXI.Graphics）の新しいインスタンスを作成することによって作られます。
  let rectangle = new Graphics();

  // 図形に輪郭を付ける場合は、lineStyleメソッドを使用します。四角形の幅4ピクセルの赤い輪郭をアルファ値1で指定する方法は次のとおりです。
  rectangle.lineStyle(4, 0xff3300, 1); // width, color, alpha

  // 長方形を描画するには、drawRect()メソッドを使用します。その4つの引数は、x、y、width、およびheightです。
  // rectangle.drawRect(x, y, width, height);

  // 終了したらendFill()を使用します。

  // Canvas Drawing APIとまったく同じです。
  // これが、四角形を描画し、その位置を変更し、それをステージに追加するために必要なすべてのコードです。

  rectangle.beginFill(0x66ccff);
  rectangle.drawRect(0, 0, 64, 64);
  rectangle.endFill();
  rectangle.x = 170;
  rectangle.y = 170;
  app.stage.addChild(rectangle);

  // このコードは、ステージのx:170とy:170の位置に、赤い枠を持つ64 x 64の青い長方形を作成します。

  // 26. 円
  // drawCircle()メソッドで円を描きます。 3つの引数は、x、y、およびradiusです。
  // drawCircle(x, y, radius)

  // 長方形やスプライトとは異なり、円のxとyの位置もその中心点です。
  // これは、半径32ピクセルの紫色の円を作る方法です。

  let circle = new Graphics();
  circle.beginFill(0x9966ff);
  circle.drawCircle(0, 0, 32);
  circle.endFill();
  circle.x = 64;
  circle.y = 130;
  app.stage.addChild(circle);

  // 27.Ellipses（楕円）

  // Canvas Drawing APIより一歩先んじたものとして、PixiではdrawEllipse()メソッドを使用して楕円を描画できます。
  // drawEllipse(x, y, width, height);

  // x/y位置は、楕円の左上隅を定義します。
  // （楕円は、目に見えない長方形の境界ボックスで囲まれています - そのボックスの左上隅が楕円のx/yアンカー位置を表します）
  // これは、幅50ピクセル、高さ20ピクセルの黄色い楕円です。

  let ellipse = new Graphics();
  ellipse.beginFill(0xffff00);
  ellipse.drawEllipse(0, 0, 50, 20);
  ellipse.endFill();
  ellipse.x = 180;
  ellipse.y = 130;
  app.stage.addChild(ellipse);

  // 28.Rounded rectangles（角丸長方形）

  // Pixiでは、drawRoundedRect()メソッドを使用して角丸四角形を作成することもできます。
  // 最後の引数cornerRadiusはピクセル単位の数値で、角の丸みの量によって決まります。

  //drawRoundedRect(x, y, width, height, cornerRadius)

  // 角の半径が10ピクセルの丸みを帯びた長方形を作成する方法は次の通りです。

  let roundBox = new Graphics();
  roundBox.lineStyle(4, 0x99ccff, 1);
  roundBox.beginFill(0xff9933);
  roundBox.drawRoundedRect(0, 0, 84, 36, 10);
  roundBox.endFill();
  roundBox.x = 48;
  roundBox.y = 190;
  app.stage.addChild(roundBox);

  // 29.Lines（線）

  // 上記の例では、lineStyle()メソッドを使用して線を定義できることがわかりました。
  // Canvas Drawing APIと同じ方法で、moveTo()メソッドとlineTo()メソッドを使用して線の始点と終点を描画できます。
  // これは、幅4ピクセルの白い対角線を引く方法です。

  let line = new Graphics();
  line.lineStyle(4, 0xffffff, 1);
  line.moveTo(0, 0);
  line.lineTo(80, 50);
  line.x = 32;
  line.y = 32;
  app.stage.addChild(line);

  // 線のようなPIXI.Graphicsオブジェクトは、スプライトのようにxとyの値を持っているので、
  // 描画した後はステージ上のどこにでも配置できます。

  // 30.Polygons（多角形）

  // drawPolygon()メソッドを使用すると、線を結合して色で塗りつぶして複雑な形状にすることができます。
  // drawPolygon()の引数は、形状上の各点の位置を定義するx / y点のパス配列です。

  //  drawPolygon()はこれら3つの点を結合して形を作ります。
  // これは、drawPolygon()を使用して3本の線を接続し、青い枠線のある赤い三角形を作成する方法です。
  // 三角形は位置0, 0で描画され、次にxプロパティとyプロパティを使用してステージ上のその位置に移動されます。

  let triangle = new Graphics();

  // 塗りつぶしの色を指定
  triangle.beginFill(0x66ff33);

  triangle.drawPolygon(
    [
        -32, 64, // 1点目
        32, 64, // 2点目
        0, 0 // 3点目
    ]
  );
  triangle.endFill();

  // 三角形を描いた後に配置します。
  // 三角形のx/y位置は、パスの最初の点に固定されています。
  triangle.x = 180;
  triangle.y = 22;

  app.stage.addChild(triangle);
};
