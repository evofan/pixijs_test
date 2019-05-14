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

  // 本を買って下さい！ 信じられないことに、誰かが実際に私にこのチュートリアルを書き終えて本に変えるために支払ったのです！

  // Learn PixiJS（https://www.springer.com/us/book/9781484210956）
  //（そしてそれは、単なるゴージャスな "e-book"だけではなく、世界最大の出版社であるSpringerによって出版された本物の重い紙の本です）

  // このチュートリアルの内容よりも80％多くの内容があり、
  // Pixiを使ってあらゆる種類のインタラクティブなアプリケーションやゲームを作成するために
  // 知っておく必要のある基本的なテクニックがすべて揃っています。

  // どのようなハウツーがあるかご覧ください。
  // ・アニメのゲームキャラクターを作成
  // ・フル機能のアニメーションステートプレーヤーを作成
  // ・線や図形を動的にアニメート
  // ・無限パララックススクロールにタイルスプライトを使用
  // ・ブレンドモード、フィルタ、着色、マスク、ビデオ、およびレンダリングテクスチャの使用
  // ・複数の解像度でのコンテンツを作成
  // ・インタラクティブボタンの作成
  // ・Pixi用の柔軟なドラッグアンドドロップインターフェイスの作成
  // ・パーティクル効果の作成
  // ・あらゆる規模に対応できる安定したソフトウェアアーキテクチャモデルの構築
  // ・完全なゲームの作成

  // そして、おまけとして、すべてのコードは完全に最新バージョンのJavaScript：ES6 / 2015で書かれています。
  // そして、この本のコードはPixi v3.xに基づいていますが、最新バージョンのPixi 4.xでも問題なく動作します！

  // あなたがこのプロジェクトを支援したいならば、この本のコピーを購入してください、
  // そしてあなたの母のために別のコピーを購入してください！

  //または、以下に寄付をして下さい。
  // http://www.msf.org
};
