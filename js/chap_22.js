document.addEventListener("DOMContentLoaded", function() {
  // console.log("DOM構築完了");
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

  let app = new Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
  });

  app.renderer.backgroundColor = 0x00000;
  document.body.appendChild(app.view);

  loader
    .add("images/cat.png")
    .add("images/dog.png")
    .add("images/rabbit.png")
    .load(setup);

  let cat, dog, rabbit;
  let animals = new Container();

  function setup() {
    cat = new Sprite(resources["images/cat.png"].texture);
    dog = new Sprite(resources["images/dog.png"].texture);
    rabbit = new Sprite(resources["images/rabbit.png"].texture);

    animals.addChild(cat);
    animals.addChild(dog);
    animals.addChild(rabbit);

    // ステージオブジェクトもコンテナであり、これは、すべてのPixiスプライトのルートコンテナである。
    app.stage.addChild(animals);
    animals.x = 50;
    animals.y = 50;

  // コンテナにスプライトを追加すると、そのxとyの位置はグループの左上隅からの相対位置になる。
  // それがスプライトのローカルポジションになる。
    cat.x = 20;
    console.log(cat.x); // 20

    // スプライトはまたグローバルな座標を持っている。
    // グローバル座標は、ステージの左上隅からスプライトのアンカーポイント（通常はスプライトの左上隅）までの距離である。
    // toGlobal()メソッドを使用して、スプライトのグローバル位置を見つけることが出来る。
    // parentSprite.toGlobal(childSprite.position)

    console.log(animals.toGlobal(cat.position)); // t {x: 70, y: 50}

    // スプライトのグローバルな位置を見つけたいが、スプライトの親コンテナが何であるかわからない場合、
    // どのスプライトにもparentという名前のプロパティがあり、これによってスプライトの親が何であるかが分かる。
    // スプライトを直接ステージに追加すると、stageがスプライトの親になる。
    // 上の例では、猫の親はanimalsになる
    
    // また、次のようなコードを書くことによって猫のグローバルな位置を得ることが出来る。
    console.log(cat.parent.toGlobal(cat.position)); // t {x: 70, y: 50}

    // グローバル座標位置を計算するもう1つの方法（最善の方法）
    // キャンバスの左上隅からスプライトまでの距離を知りたいが、スプライトの親コンテナが何であるかわからない場合や、
    // 気にしない場合は、getGlobalPosition()メソッドを使用する。

    dog.x = 50;
    dog.y = 60;
    console.log(dog.getGlobalPosition()); // t {x: 100, y: 110}

    // getGlobalPosition()についての特別な事はそれが非常に正確であり、
    // ローカル位置が変わるとすぐそのスプライトの正確なグローバル位置を知らせる。

    // グローバル座標をローカル座標に変換したい場合は、toLocal()メソッドを使うことが出来る。
    // sprite.toLocal(sprite.position, anyOtherSprite)

    // toLocalを使用して、スプライトと他のスプライトの間の距離を見つける事が出来る。

    rabbit.x = 100;
    rabbit.y = -40;

    console.log(rabbit.toLocal(rabbit.position, dog).x); // 50
    console.log(rabbit.toLocal(rabbit.position, dog).y); // 60





  }
};
