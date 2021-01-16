export default {
  isPlayingAnims(animsKey:any):boolean {
    return (this.anims.isPlaying && this.anims.getName()) === animsKey;
  }
};
