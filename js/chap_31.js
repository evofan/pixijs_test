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
  let Text = PIXI.Text;
  let TextStyle = PIXI.TextStyle;

  let app = new Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
  });

  app.renderer.backgroundColor = 0xcccccc;
  document.body.appendChild(app.view);

  // テキストオブジェクト（PIXI.Text）を使用してステージにテキストを表示します。
  // その最も単純な形式では、このようにすることができます。

  let message = new Text("Hello Pixi!");
  app.stage.addChild(message);

  // これにより、キャンバスに「こんにちは、Pixi」という単語が表示されます。
  // PixiのTextオブジェクトはSpriteクラスを継承しているため、x、y、width、height、alpha、rotationなど、
  // すべて同じプロパティが含まれています。
  // 他のスプライトと同じように、テキストをステージ上に配置してサイズを変更します。
  // Sたとえば、position.setを使用してメッセージのxとyの位置を次のように設定できます。

  message.position.set(10, 96);

  // それはあなたに基本的でスタイルのないテキストを与えるでしょう。
  // あなたがよりおしゃれにしたいならば、カスタムテキストスタイルを定義するためにPixiのTextStyle()関数を使ってください。
  // 方法は次のとおりです。

  let style = new TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fill: "white",
    stroke: "#ff3300",
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6
  });

  // これにより、使用したいすべてのテキストスタイルを含む新しいスタイルオブジェクトが作成されます。
  // 使用できるすべてのスタイルプロパティの一覧については、こちら（http://pixijs.download/release/docs/PIXI.TextStyle.html）を参照してください。

  // スタイルをテキストに適用するには、次のようにTextオブジェクトの2番目の引数としてスタイルオブジェクトを追加します。
  let message2 = new Text("Hello Pixi!", style);
  app.stage.addChild(message2);

  // テキストオブジェクトの作成後にその内容を変更する場合は、textプロパティを使用します。
  message2.text = "Text changed!";

  // スタイルプロパティを再定義する場合は、styleプロパティを使用してください。
  message.style = {
    fill: "black",
    font: "28px PetMe64",
    wordWrap: true,
    wordWrapWidth: 256
  };

  // Pixiは、Canvas Drawing APIを使用してテキストを非表示の一時的なキャンバス要素にレンダリングすることでテキストオブジェクトを作成します。
  // 次に、キャンバスをWebGLテクスチャに変換してスプライトにマッピングできるようにします。
  // テキストの色を文字列で囲む必要があるのはそのためです。これはCanvas Drawing APIの色の値です。
  // 他のキャンバスカラー値と同様に、「赤」や「緑」などの一般的な色の単語を使用することも、rgba、hsla、または16進値を使用することもできます。

  // Pixiは長いテキスト行を折り返すこともできます。
  // テキストのwordWrapスタイルプロパティをtrueに設定してから、wordWrapWidthを最大テキスト長（ピクセル単位）に設定します。
  // これはテキストの行になるはずです。
  // 複数行テキストの配置を設定するには、alignプロパティを使用します。
  // （注：alignは単一行テキストには影響しません）

  // カスタムフォントファイルを使用する場合は、CSS@font-faceルールを使用して、
  // フォントファイルをPixiアプリケーションが実行されているHTMLページにリンクします。

  /*
  @font-face {
    font-family: "fontFamilyName";
    src: url("fonts/fontFile.ttf");
  }
  */
  // この@font-faceルールをHTMLページのCSSスタイルシートに追加してください。

  // Pixiはビットマップフォントもサポートしています（http://pixijs.download/release/docs/PIXI.extras.BitmapText.html）。
  // JSONまたは画像ファイルを読み込むのと同じ方法で、
  // Pixiのローダーを使ってビットマップフォントXMLファイルを読み込むことができます。
};
