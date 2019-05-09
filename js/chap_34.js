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

  // 私はあなたが今あなたがゲームを作り始めるのに必要なすべてのスキルを持っているとあなたに言いました。
  //  何？ あなたは私を信じていませんか？ それを証明しましょう！
  // トレジャーハンターと呼ばれる単純なオブジェクトコレクションと敵の回避ゲームの作り方を詳しく見てみましょう。
  // （examplesフォルダにあります）

  // トレジャーハンターは、これまでに学んだツールを使用して作成できる最も簡単な完成ゲームの1つの好例です。
  // キーボードの矢印キーを使って、探検家が宝物を見つけて出口まで運んでください。
  // 6つのブロブモンスターがダンジョンの壁の間を上下に移動し、探検家にぶつかると半透明になり、右上隅のヘルスメーターが縮小します。
  // すべての健康状態が使い果たされると、ステージに「You Lost！」と表示されます。
  // 探検家が宝物のある出口にたどり着くと、「You Won！」と表示されます。

  //  これは基本的なプロトタイプですが、トレジャーハンターには、より大きなゲームで見つけることができるほとんどの要素が含まれています。
  // テクスチャアトラスグラフィック、インタラクティブ機能、衝突、複数のゲームシーンなどです。
  // 自分のゲームの開始点として使用できるように、ゲームがどのようにまとめられたかを見ていきましょう。

  // The code structure（コードの構築方法）

  // treasureHunter.htmlファイルを開くと、すべてのゲームコードが1つの大きなファイルにまとめられていることがわかります。
  // これは、すべてのコードがどのように編成されているかを俯瞰したものです。

  // Pixiをセットアップし、テクスチャアトラスファイルをロードします - ロードされたときに `setup`関数を呼び出します
  function setup() {
    // ゲームスプライトを初期化し、ゲームの `state`を` play`に設定して 'gameLoop'を起動します
  }

  function gameLoop(delta) {
    // 現在のゲームの状態をループで実行し、スプライトをレンダリングします。
  }

  function play(delta) {
    // すべてのゲームロジックはここにあります
  }

  function end() {
    // ゲーム終了時に実行されるべきすべてのコードがあります。
  }

  //The game's helper functions:
  // ゲームのヘルパー関数：
  //　「キーボード（keyboard）」、「ヒットテスト（hitTestRectangle）」「コンテイン（contain）」「ランダム数値（randomInt）」

  // 各セクションがどのように機能するかを見ながら、これをゲームの世界地図として使用します。
};
