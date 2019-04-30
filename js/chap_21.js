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

  // グループを使用すると、ゲームシーンを作成したり、類似のスプライトを1つの単位としてまとめて管理できる。
  // Pixiには、これを可能にするContainerというオブジェクトがある。

  function setup() {
    cat = new Sprite(resources["images/cat.png"].texture);
    dog = new Sprite(resources["images/dog.png"].texture);
    rabbit = new Sprite(resources["images/rabbit.png"].texture);

    animals.addChild(cat);
    animals.addChild(dog);
    animals.addChild(rabbit);

    // ステージオブジェクトもコンテナであり、これは、すべてのPixiスプライトのルートコンテナである。
    app.stage.addChild(animals);

    console.log(animals.children); // (3) [e, e, e]

    animals.position.set(25, 25);

    console.log(animals.width); // 100
    console.log(animals.height); // 100

    animals.width = 200;
    animals.height = 200;

    // 必要に応じて深い階層を作成するために、他のコンテナの中に好きなだけ多くのコンテナを入れ子にすることが出来る。
    // ただし、DisplayObject（Spriteや別のContainerなど）は一度に1つの親にしか属することが出来ない。
    // addChild()を使用してスプライトを別のオブジェクトの子にすると、Pixiは自動的に現在の親からそれを削除する。
  }
};
