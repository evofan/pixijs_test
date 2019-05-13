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

  // ゲームを終了するには2つの方法があります。宝を出口に持っていくと勝つことができます。
  // 体力がなくなると負けることができます。

  // ゲームに勝つために、宝箱はちょうど出口ドアに触れる必要があります。
  // その場合、ゲームの状態はend（終了）に設定され、メッセージテキストには「あなたは勝ちました」と表示されます。

  //  if (hitTestRectangle(treasure, door)) {
  //    state = end;
  //    message.text = "You won!";
  //  }

  // 体力が悪くなると、ゲームに負けます。
  // ゲームの状態もend（終了）に設定され、メッセージテキストに「You Lost！」と表示されます。

  /*
  if (healthBar.outer.width < 0) {
    state = end;
    message.text = "You lost!";
  }
  */

  // しかし、これはどういう意味ですか？

  // state = end;

  // あなたは、gameLoop()が毎秒60回でstateと呼ばれる関数を絶えず更新していることを以前の例から思い出すでしょう。
  // これがgameLoop()です。

  /*
  function gameLoop(delta){

    // 現在のゲーム状態を更新します。
    state(delta);
  }
  */

  // また、最初にstateの値をplayに設定したことも覚えているでしょう。
  // これがplay()関数がループで実行される理由です。
  // stateをendに設定することで、endと呼ばれる別の関数をループ内で実行することをコードに伝えています。
  // より大きなゲームでは、tileScene状態を持ち、leveOne、levelTwo、levelThreeの様に各ゲームレベルの状態を表すことができます。
  // それでは、そのend命令はどれですか？ ここにあります！

  /*
  function end() {
    gameScene.visible = false;
    gameOverScene.visible = true;
  }
  */

  // ゲームシーンの見え方を反転させるだけです。
  // これがgameSceneを隠し、ゲーム終了時にgameOverSceneを表示するものです。

  // これはゲームのstate（状態）を切り替える方法の非常に単純な例ですが、
  // あなたはあなたのゲームで好きなだけ多くのゲームstateを持ち、あなたが必要とするだけ多くのコードでそれらを満たすことができます。
  // ループの中で実行したい関数にstateの値を変更するだけです。

  // そして、これがTreasure Hunterの全てです。
  // もう少し手を加えると、この単純なプロトタイプを完全なゲームに変えることができます - それを試してみてください。
};
