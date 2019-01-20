<template>
  <div class="projectIntro" :style="{ 'background-image': 'url(' + backgroundImage + ')'}">
    <div class="wordIntro">
      <div class="wordIntroContent">
        <p>
          {{ words }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import getImage from '../../utils/getImage.js'
export default {
  name: 'projectIntro',
  data() {
    return {
      backgroundImage: '',
      words: '',
      backgroundSize: ''
    }
  },
  created() {
    this.$axios.get('/project/info/get')
      .then(res=>{
        this.backgroundImage = getImage(res.data.data.backgroundImageLocation, 2)
        this.words = res.data.data.content;
    })
    this.$nextTick(()=>{
      document.title = '项目介绍'
    })
  },
  methods: {
    clickBack: function() {
      this.$router.push({path: '/index'});
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/mixin';
@import '../../styles/main';
.projectIntro {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  @include fj();
  flex-direction: column-reverse;
  align-items: center;
  position: relative;
  .wordIntro {
    width: 100%;
    height: px2rem(340);
    color: #000000;
    background-color: #d1d1d1;
    opacity: .7;
    bottom: 0;
    position: absolute;
    z-index: 99;
    .wordIntroContent {
      width: 100%;
      height: 19rem;
      @include fj(center);
      align-items: center;
      p {
        width: 85%;
        height: 15rem;
        color: #000000;
        @include fontSize(28);
        @include lineHeight(48);
        letter-spacing: .1em;
        text-indent: 2em;
      }
    }
  }
  .allBack {
    width: 4rem;
    height: 4rem;
    position: fixed;
    top: 2rem;
    right: 2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

