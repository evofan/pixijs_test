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

  // Pixiには、ParticleContainer（PIXI.particles.ParticleContainer）と呼ばれる、
  // スプライトをグループ化するための別の高性能な方法がある。
  // ParticleContainer内のスプライトは、通常のコンテナ内にある場合よりも2〜5倍速くレンダリングされる
  // これはゲームにとって大きなパフォーマンスの向上となる。

  // let superFastSprites = new PIXI.particles.ParticleContainer();
  // それから普通のContainerと同じように、addChild()を使ってスプライトを追加する。

  // ParticleContainerを使用することにした場合は、妥協する必要がある。
  // ParticleContainer内のスプライトには、x、y、width、height、scale、pivot、alpha、visibleという基本的なプロパティが幾つかあるだけ。
  // また、その中に含まれているスプライトが自分のchildを入れ子にすることは出来ない。
  // ParticleContainerでは、フィルタやブレンドモードなどのPixiの高度な視覚効果も使用出来ない。
  // 各ParticleContainerは1つのテクスチャしか使用出来ない（したがって、外観の異なるスプライトが必要な場合は、スプライトシートを使用する必要がある）。
  // しかし、パフォーマンスが大幅に向上したことを考えると、これらの妥協は通常、価値がある。
  // また、同じプロジェクト内でContainersとParticleContainersを同時に使用出来るため、最適化を微調整出来る。

  // パーティクルコンテナのスプライトがこんなに速いのは何故か？
  // スプライトの位置はGPU上で直接計算されているから。
  // Pixi開発チームは、可能な限り多くのスプライト処理をGPUでオフロードしようとしているので、
  // 使用している最新バージョンのPixiは、ここで説明したものよりはるかに機能豊富なParticleContainerを持つ事になる。
  // 詳細については現在のParticleContainerドキュメントをチェック。
  //　http://pixijs.download/release/docs/PIXI.particles.ParticleContainer.html

  // ParticleContainerを作成する場所には、サイズ、プロパティ、batchSize、autoResizeの4つのオプション引数を指定出来る。
  // let superFastSprites = new ParticleContainer(maxSize, properties, batchSize, autoResize);

  // maxSizeのデフォルト値は1500。
  // したがって、より多くのスプライトを含める必要がある場合は、それをもっと大きい数に設定する。
  // properties引数は、設定可能な5つのブール値（スケール、位置、回転、UV、およびalphaAndTint）を持つオブジェクトである。
  // positionのデフォルト値はtrueだが、他のすべての値はfalseに設定されている。
  // つまり、ParticleContainerの回転、スケール、色合い、またはスプライトのUVを変更する場合は、次のようにこれらのプロパティをtrueに設定する必要がある。

  /*
  let superFastSprites = new ParticleContainer(
  size, {
    rotation: true,
    alphaAndtint: true,
    scale: true,
    uvs: true
  });
  */

  let container = new ParticleContainer();

  // ただし、これらのプロパティを使用する必要が無いと思われる場合は、
  // 最大のパフォーマンスを引き出すためにこれらのプロパティをfalseに設定したままにしておく。

  // uvsプロパティとは何か？アニメーション中にテクスチャを変更するパーティクルがある場合にのみtrueに設定する。
  //（これが機能するためには、すべてのスプライトのテクスチャも同じタイルセットイメージ上にある必要があります）

  //（注：UVマッピングは、3Dサーフェスにマッピングされているテクスチャ（画像）のx座標とy座標を指す3Dグラフィック表示用語。
  // Uはx軸、Vはy軸。WebGLはすでに使用している。3D空間配置の場合はx、y、zなので、2D画像テクスチャの場合、xとyを表すためにUとVが選択された。）

  // （私がこれら2つのオプションの引数、batchSizeとautoResizeを最後に何にしているのか正確にはわからないので、
  // もし誰かが知っているなら、問題の中で知っておいてください！）

  function setup() {
    // cat = new Sprite(resources["images/cat.png"].texture);

    for (let i = 0; i < 100; ++i) {
      let sprite = new PIXI.Sprite.from("images/cat.png");
      container.addChild(sprite);
    }

    app.stage.addChild(container);
  }
};

//  new PIXI.particles.ParticleContainer () Deprecated : since 5.0.0
// -> PIXI.ParticleContainer
//
// ParticleContainerクラスはスピードのためだけに作られたコンテナの本当に速いバージョンですので、
// たくさんのスプライトやパーティクルが必要なときに使ってください。
//
// ParticleContainerのトレードオフは、最も高度な機能が機能しないことです。
// ParticleContainerは基本的なオブジェクト変換（位置、スケール、回転）とtint（v4.5.6以降）のような高度な機能を実装しています。
//
// マスキング、子、フィルタなどの他のより高度な機能は、このバッチのスプライトでは動作しません。
// 使い方はとても簡単です。
