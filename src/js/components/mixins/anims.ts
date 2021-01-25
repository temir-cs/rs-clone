export default {
  isPlayingAnims(animsKey:string):boolean {
    return (this.anims.isPlaying && this.anims.getName()) === animsKey;
  }
};
