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

  // Pixiは多くのことができますが、何でも出来るわけではありません。
  // Pixiを使ってゲームや複雑なインタラクティブアプリケーションを作り始める場合は、
  // ヘルパーライブラリを使用する必要があります。

  // Bump: ゲームのための2D衝突ライブラリの完全なスイート

  // Tink: ドラッグアンドドロップ、ボタン、ユニバーサルポインタ、その他の便利なインタラクティブツール

  // Charm: Pixiスプライト用の使いやすいトゥイーンアニメーション効果

  // Dust: 爆発、火、魔法等を作成するためのパーティクルエフェクト

  // Sprite Utilities: ステートマシンとアニメーションプレーヤーを追加するだけでなく、
  // Pixiスプライトを作成および使用するためのより簡単で直感的な方法。
  // Pixiを使った作業がもっと楽しくなります。

  // Sound.js: サウンドと音楽の効果をロード、コントロール、生成するためのマイクロライブラリ。
  // ゲームにサウンドを追加するために必要なすべてのもの。

  // Smoothie :真のデルタタイム補間を使用した超スムーズスプライトアニメーション
  // また、ゲームやアプリケーションが実行されるfps（1秒あたりのフレーム数）を指定したり、
  // スプライトレンダリングループとアプリケーションロジックループを完全に分離したりすることもできます。

  // Pixiでこれらのライブラリをすべて使用する方法については、
  // Learn PixiJS本（https://www.springer.com/us/book/9781484210956）を参照してください。

  // Hexi
  // これらのライブラリのすべての機能を使いたいのですが、それらを自分で統合する手間をかけたくありませんか？
  // Hexiを使う： ゲームやインタラクティブアプリケーションを構築するための完全な開発環境：
  // https://github.com/kittykatattack/hexi

  // これは、ゲームを作るためのシンプルで楽しい方法のために、Pixiの最新バージョン（最新の安定版）を
  // これらすべてのライブラリー（およびそれ以上）にバンドルしています。
  // HexiではグローバルPIXIオブジェクトに直接アクセスすることもできるので、
  // Hexiアプリケーションで直接低レベルのPixiコードを書くことができ、必要に応じてHexiの特別な便利さの内のの幾つでも使用することを選択できます。

  // BabylonJS
  //
  // Pixiは2Dには最適ですが、3Dはできません。
  // 3次元に踏み込む準備が整ったら、Web用の最も機能豊富で使いやすい3Dゲーム開発プラットフォームはBabylonJS（https://www.babylonjs.com/）です。
  // それはあなたのスキルをさらに磨くための素晴らしい次のステップです。
};
