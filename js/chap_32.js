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
  let Graphics = PIXI.Graphics;
  let TextureCache = PIXI.utils.TextureCache;
  let Text = PIXI.Text;
  let TextStyle = PIXI.TextStyle;

  let app = new Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
  });

  app.renderer.backgroundColor = 0x00000;
  document.body.appendChild(app.view);

  loader.add("images/cat.png").load(setup);
  let cat;
  let state;
  let box;
  let message;

  // これで、多種多様なグラフィックスオブジェクトを作成する方法がわかりましたが、それらを使って何ができますか？
  // 楽しいことは、簡単な衝突検知システムを構築することです。
  // 任意の2つの長方形Pixiスプライトが接触しているかどうかをチェックするhitTestRectangle()というカスタム関数を使用できます。
  // hitTestRectangle(spriteOne, spriteTwo);

  // 2つが重なっている場合は、hitTestRectangle()はtrueを返します。
  // 次のように2つのスプライト間の衝突をチェックするために、ifステートメントでhitTestRectangle()を使用できます。
  /*
  if (hitTestRectangle(cat, box)) {
    //There's a collision
  } else {
    //There's no collision
  }
  */

  // ご覧のとおり、hitTestRectangle()はゲームデザインの広大な世界への入り口です。

  // hitTestRectangle()の使用方法の実用的な例については、examplesフォルダのcollisionDetection.htmlファイルを実行して下さい。
  // 猫を動かすのに矢印キーを使用して下さい。
  // 猫が箱にぶつかると、箱は赤くなり、「当たり」とテキストオブジェクトによって表示されます。

  // 猫を動かすキーボード制御システムだけでなく、これらすべての要素を作成するすべてのコードは既に見たことがあります。
  // 唯一の新しいことは、衝突をチェックするためにplay()関数内でhitTestRectangle()が使用される方法です。

  function setup() {
    // 箱の作成
    box = new PIXI.Graphics();
    box.beginFill(0xccff99);
    box.drawRect(0, 0, 64, 64);
    box.endFill();
    box.x = 120;
    box.y = 96;
    app.stage.addChild(box);

    // 猫
    cat = new Sprite(resources["images/cat.png"].texture);
    app.stage.addChild(cat);
    cat.position.set(16, 96);
    cat.anchor.x = 0.5;
    cat.anchor.y = 0.5;
    cat.vx = 0;
    cat.vy = 0;

    // キーボードの矢印キーをキャプチャーする
    let left = keyboard("ArrowLeft"),
      up = keyboard("ArrowUp"),
      right = keyboard("ArrowRight"),
      down = keyboard("ArrowDown");

    // 左矢印キー押した時の処理
    left.press = () => {
      // キーが押された時に猫の速度を変える
      cat.vx = -5;
      cat.vy = 0;
    };

    // 左矢印キー離した時の処理
    left.release = () => {
      // 左矢印が離され、右矢印が下向きでなく、猫が上下に動いていない場合：猫を停止する
      if (!right.isDown && cat.vy === 0) {
        cat.vx = 0;
      }
    };

    // 上矢印キー押した時の処理
    up.press = () => {
      cat.vy = -5;
      cat.vx = 0;
    };
    // 上矢印キー離した時の処理
    up.release = () => {
      if (!down.isDown && cat.vx === 0) {
        cat.vy = 0;
      }
    };

    // 右矢印キー押した時の処理
    right.press = () => {
      cat.vx = 5;
      cat.vy = 0;
    };
    // 右矢印キー離した時の処理
    right.release = () => {
      if (!left.isDown && cat.vy === 0) {
        cat.vx = 0;
      }
    };

    // 下矢印キー押した時の処理
    down.press = () => {
      cat.vy = 5;
      cat.vx = 0;
    };
    // 下矢印キー離した時の処理
    down.release = () => {
      if (!up.isDown && cat.vx === 0) {
        cat.vy = 0;
      }
    };

    // テキスト用のスプライトを作成する
    let style = new TextStyle({
      fontFamily: "sans-serif",
      fontSize: 18,
      fill: "white"
    });
    message = new Text("No collision...", style);
    message.position.set(8, 8);
    app.stage.addChild(message);

    // ゲームのステートを設定する
    state = play;

    // ゲームループをスタートする
    app.ticker.add(delta => gameLoop(delta));
  }

  function gameLoop(delta) {
    // 現在のゲームステートを更新
    state(delta);
  }

  function play(delta) {
    // 猫の移動
    cat.x += cat.vx;
    cat.y += cat.vy;

    // 猫と箱の間の衝突チェック
    if (hitTestRectangle(cat, box)) {
      // もし衝突していたら、メッセージテキストを変更し、箱を赤色にする。
      message.text = "hit!";
      box.tint = 0xff3300;
    } else {
      // 衝突していなければ、メッセージと箱の色をリセットする。
      message.text = "No collision...";
      box.tint = 0xccff99;
    }
  }

  // hitTestRectangle関数
  function hitTestRectangle(r1, r2) {
    // 計算する必要がある変数を定義します
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    // hitは衝突があるかどうかを決定します
    hit = false;

    // 各スプライトの中心点を見つける
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    // 各スプライトの半分の幅と高さを求める
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    // スプライト間の距離ベクトルを計算する
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    // 半分の幅と高さの合計を求める
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    // X軸上の衝突をチェックする
    if (Math.abs(vx) < combinedHalfWidths) {
      // 衝突が発生している可能性があります。y軸上の衝突を確認する。
      if (Math.abs(vy) < combinedHalfHeights) {
        // 間違いなく衝突が起こっているのでhitをtrueにする。
        hit = true;
      } else {
        // y軸に衝突はありません。
        hit = false;
      }
    } else {
      // x軸に衝突はありません。
      hit = false;
    }

    // `hit`は` true`か `false`のどちらかになります。
    return hit;
  }

  // キーボード関連処理
  function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    // ダウンハンドラー
    key.downHandler = event => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };

    // アップハンドラー
    key.upHandler = event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };

    // イベントリスナーを追加
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    window.addEventListener("keydown", downListener, false);
    window.addEventListener("keyup", upListener, false);

    // イベントリスナーを削除
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };

    return key;
  }
};
