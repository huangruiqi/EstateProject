<template>
  <div class="brandCommon" :style="{ 'background-image': 'url(' + backgroundImage + ')'}">
    <router-view></router-view>
    <div class="allBack" @click="clickBack">
      <img src="@/assets/img/goHouseHistory/back.png" alt="">
    </div>
    <div class="brandBottom">
      <ul class="brandBottom_father">
        <router-link tag="li" v-for="(word, index) in words" :key="index" :to="word.address" :class="[index==Num?leftBottom:'',index==(words.length-1)?borderRight:'']">
          {{ word.name }}
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'brandCommon',
  data() {
    return {
      words: [
        {
            "name": "企业介绍",
            "address": "/brand/brandIntro"
        },
        {
            "name": "品牌荣誉",
            "address": "/brand/brandHonor"
        },
        {
            "name": "发展历程",
            "address": "/brand/brandHistory"
        },
        {
            "name": "企业文化",
            "address": "/brand/brandCulture"
        }
      ],
      Num: 0,
      leftBottom: 'leftBottom',
      borderRight: 'borderRight',
      backgroundImage: ''
    }
  },
  created(){
    this.$axios.get('/honor')
      .then(res=>{
        this.backgroundImage = res.data.data.backgroundImage.min
      })
  },
  methods: {
		clickBack: function() {
			this.$router.push({path: '/index'});
		}
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/mixin';
.borderRight {
  border-right: 0 !important;
}
.brandCommon {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
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
.brandBottom {
  width: 100%;
  height: 10%;
  position: fixed;
  bottom: 0;
  background-color: #1b1b1b;
  border-top: 1px solid #ffdaaa;
  .brandBottom_father {
    width: 100%;
    height: 100%;
    @include fj(center);
    align-items: center;
    li {
      width: 9rem;
      height: 2rem;
      color: #fefefe;
      @include fj(center);
      align-items: center;
      @include fontSize(28);
      border-right: 1px solid #ffdaaa;
    }
    .router-link-active {
      color: #ffdaaa;
    }
  }
}

</style>
