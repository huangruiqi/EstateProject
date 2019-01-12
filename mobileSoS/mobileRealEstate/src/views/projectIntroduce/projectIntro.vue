<template>
  <div class="projectIntro" :style="{ 'background-image': 'url(' + backgroundImage + ')'}">
    <div class="wordIntro">
      <div class="wordIntroContent">
        <p>
          {{ words }}
        </p>
      </div>
    </div>
    <div class="allBack" @click="clickBack">
      <img src="@/assets/img/goHouseHistory/back.png" alt="">
    </div>
  </div>
</template>
<script>
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
    this.$axios.get('/project')
      .then(res=>{
        this.backgroundImage = res.data.data.image.fileName;
        this.words = res.data.data.introduction
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
    height: px2rem(266);
    color: #fff;
    background-color: rgba(18, 18, 18, 0.7);
    bottom: 0;
    position: absolute;
    z-index: 99;
    opacity: 0.8;
    .wordIntroContent {
      width: 100%;
      height: 19rem;
      @include fj(center);
      align-items: center;
      p {
        width: 90%;
        height: 13rem;
        color: #fff;
        @include fontSize(23);
        @include lineHeight(32);
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

