import * as Phaser from 'phaser';
import * as WebFontLoader from 'webfontloader';

export default class WebFontFile extends Phaser.Loader.File {
  fontNames: Array<string>;
  service: string;

  constructor(loader: Phaser.Loader.LoaderPlugin, fontNames:string | Array<string>, service = 'google') {
    super(loader, {
      type: 'webfont',
      key: fontNames.toString()
    });

    this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames];
    this.service = service;
  }

  load():void {
    const config = {
      active: () => {
        this.loader.nextFile(this, true);
      },
      google: null,
    };

    switch (this.service) {
      case 'google':
        config.google = {
          families: this.fontNames
        };
        break;

      default:
        throw new Error('Unsupported font service');
    }

    WebFontLoader.load(config);
  }
}
