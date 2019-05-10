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

  // テクスチャアトラス画像がロードされるとすぐに、setup()関数が実行されます。
  // それは一度だけ実行され、あなたはあなたのゲームのために一度だけセットアップタスクを実行することを可能にします。
  // オブジェクト、スプライト、ゲームシーンの作成や初期化、データ配列の生成、ロードされたJSONゲームデータの解析を行うのに最適な場所です。

  // これがTreasure Hunterのセットアップ機能とそれが実行するタスクの概要です。

  // 最後の2行のコード、state = play。 そしてgameLoop()がおそらく最も重要です。
  // PixiのティッカーにgameLoop()を追加すると、ゲームのエンジンがオンになり、play()関数が連続ループで呼び出されます。
  // しかし、それがどのように機能するのかを見る前に、setup()関数内の特定のコードが何をするのか見てみましょう。

  function setup() {
    //Create the `gameScene` group

    //Create the `door` sprite

    //Create the `player` sprite

    //Create the `treasure` sprite

    //Make the enemies

    //Create the health bar

    //Add some text for the game over message

    //Create a `gameOverScene` group

    //Assign the player's keyboard controllers

    // ゲームのステートを`play`に設定する
    state = play;

    // ゲームのループをスタートする
    app.ticker.add(delta => gameLoop(delta));
  }

  // 1.ゲームのシーンを作成する

  // setup()関数は、gameSceneとgameOverSceneという2つのコンテナグループを作成します。
  // これらのそれぞれがステージに追加されます。

  // gameScene = new Container();
  // app.stage.addChild(gameScene);

  // gameOverScene = new Container();
  // app.stage.addChild(gameOverScene);

  // メインゲームの一部であるスプライトはすべてgameSceneグループに追加されます。
  // ゲーム終了時に表示されるべきゲームオーバーテキストは、gameOverSceneグループに追加されます。

  // これはsetup()関数内で作成されますが、ゲームが最初に起動したときにgameOverSceneが表示されないようにする必要があります。
  // そのため、そのvisibleプロパティはfalseに初期化されています。

  // gameOverScene.visible = false;

  // ゲームが終了すると、gameOverSceneのvisibleプロパティがtrueに設定され、
  // ゲームの終わりに表示されるテキストが表示されます。
  // （※シーン切り替えの考え方）

  // 2. ダンジョン、ドア、探検家、宝箱の作成

  // プレイヤー（探検家）、出口のドア、宝箱、ダンジョンの背景画像はすべてテクスチャアトラスフレームから作られたスプライトです。
  // 非常に重要なことに、それらはすべてgameSceneの子（children）として追加されています。

  // テクスチャアトラスフレームIDのエイリアスを作成します。
  // id = resources["images/treasureHunter.json"].textures;

  // ダンジョン
  // dungeon = new Sprite(id["dungeon.png"]);
  // gameScene.addChild(dungeon);

  // ドア
  // door = new Sprite(id["door.png"]);
  // door.position.set(32, 0);
  // gameScene.addChild(door);

  // プレイヤー（探検家）
  // explorer = new Sprite(id["explorer.png"]);
  // explorer.x = 68;
  // explorer.y = gameScene.height / 2 - explorer.height / 2;
  // explorer.vx = 0;
  // explorer.vy = 0;
  // gameScene.addChild(explorer);

  // 宝箱
  // treasure = new Sprite(id["treasure.png"]);
  // treasure.x = gameScene.width - treasure.width - 48;
  // treasure.y = gameScene.height / 2 - treasure.height / 2;
  // gameScene.addChild(treasure);

  // それらをgameSceneグループにまとめておくと、ゲームが終了したときにgameSceneを非表示にして
  // gameOverSceneを表示するのが簡単になります。
  //（※シーン切り替えをスマートにする考え方）

  // 3.モンスターの作成

  // 6つのブロブ（BLOB：小さい固まり）モンスターが1つのループ内に作成されます。
  // 各ブロブにはランダムな初期位置とvelocity（速度）が与えられます。
  // 垂直方向の速度は、各ブロブに対して交互に1または-1で乗算されます。
  // そのため、各ブロブは隣の方向とは反対方向に移動します。
  // 作成されたそれぞれのブロブモンスターは、blobsと呼ばれる配列にプッシュ（で格納）されます。

  /*
let numberOfBlobs = 6,
    spacing = 48,
    xOffset = 150,
    speed = 2,
    direction = 1;
*/

  // すべてのブロブモンスターを格納するための配列
  // blobs = [];

  // `numberOfBlobs`と同数のブロブを作成します
  /*
for (let i = 0; i < numberOfBlobs; i++) {

  // ブロブを作成する
  let blob = new Sprite(id["blob.png"]);

  // `spacing`の値に従って各ブロブを水平方向に間隔を空けます。
  // `xOffset`は最初のブロブが追加されるべき画面の左からの位置を決定します
  let x = spacing * i + xOffset;

  // ブロブにランダムな「y」位置を与える
  let y = randomInt(0, stage.height - blob.height);

  // ブロブの位置を設定する
  blob.x = x;
  blob.y = y;

  // ブロブの垂直方向の速度を設定します。
  // directionは、1か-1のどちらかになります。
  // 「1」は敵が下に移動することを意味し、「-1」はブロブが上に移動することを意味します。
  //　`direction`を` speed`で乗算すると、ブロブの垂直方向が決まります。
  blob.vy = speed * direction;

  // 次のブロブの方向を逆にする
  direction *= -1;

  // ブロブを`blobs`配列にプッシュ（追加）します
  blobs.push(blob);

  // ブロブを`gameScene`に追加します
  gameScene.addChild(blob);
}
*/

  // 4.ヘルス（体力）バーの作成

  // Treasure Hunterをプレイすると、探検家が敵の1人に触れると、画面の右上隅にあるhealthBar（体力バー）の幅が狭くなります。
  // この体力バーはどうやって作られたのですか？ それはちょうど同じ位置にある2つの重なっている長方形です。
  // 後ろの黒い長方形と前の赤い長方形です。 それらは1つの体力バーグループにまとめられています。
  // その後、体力バーグがgameSceneに追加され、ステージ上に配置されます。

  // 体力バーを作成する
  // healthBar = new PIXI.Container();
  // healthBar.position.set(stage.width - 170, 4)
  // gameScene.addChild(healthBar);

  // 黒い背景の四角形を作成する
  // let innerBar = new PIXI.Graphics();
  // innerBar.beginFill(0x000000);
  // innerBar.drawRect(0, 0, 128, 8);
  // innerBar.endFill();
  // healthBar.addChild(innerBar);

  // 前面の赤い長方形を作成する
  // let outerBar = new PIXI.Graphics();
  // outerBar.beginFill(0xFF3300);
  // outerBar.drawRect(0, 0, 128, 8);
  // outerBar.endFill();
  // healthBar.addChild(outerBar);

  // healthBar.outer = outerBar;

  // outerというプロパティがhealthBarに追加されたことがわかります。
  // 後でアクセスするのに便利なように、outerBar（赤い長方形）を参照するだけです。
  // healthBar.outer = outerBar;
  // それはかなりきれいで読みやすいです、それで我々はそれを守ります！

  // あなたはこれをする必要はありません。 しかし、なぜそうではないのでしょう！
  // つまり、赤いouterBarの幅を制御したい場合は、次のような滑らかなコードを書くことができます。
  // healthBar.outer.width = 30;

  // 5.メッセージテキストの作成

  // ゲームが終了すると、ゲームの結果に応じて「あなたは勝ちました」または「あなたは負けました」というテキストが表示されます。
  // これはテキストスプライトを使用してそれをgameOverSceneに追加することで行われます。
  // ゲームの開始時にgameOverSceneのvisibleプロパティはfalseに設定されているため、このテキストは表示されません。
  // これは、メッセージテキストを作成してそれをgameOverSceneに追加するsetup関数のコードです。
  /*
let style = new TextStyle({
    fontFamily: "Futura",
    fontSize: 64,
    fill: "white"
  });
message = new Text("The End!", style);
message.x = 120;
message.y = app.stage.height / 2 - 32;
gameOverScene.addChild(message);
*/
};
