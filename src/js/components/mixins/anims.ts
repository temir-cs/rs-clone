export default {
  isPlayingAnims(animsKey:any):any {
    return (this.anims.isPlaying && this.anims.getName()) === animsKey;
  }
};
