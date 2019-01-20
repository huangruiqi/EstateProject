<template>
  <div class="brandCommon" :style="{ 'background-image': 'url(' + backgroundImage + ')'}">
    <router-view></router-view>
    <!-- <div class="allBack" @click="clickBack">
      <img src="@/assets/img/goHouseHistory/back.png" alt="">
    </div> -->
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
import getImage from '../../utils/getImage.js'
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
      backgroundImage: '',
      head: 'http://118.24.113.182:80/'
    }
  },
  created(){
    this.$axios.get('/brand/enterpriseCulture/image/get')
      .then(res => {
        this.backgroundImage = getImage(res.data.data.backgroundImageLocation, 3)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
		clickBack: function() {
			this.$router.push({path: '/index'});
		},
    getImage (data, i) {
      const imgSplit = data.split(/\_|\./g)
      return this.head + imgSplit[0] + '_' + imgSplit[i] + '.' + imgSplit[imgSplit.length - 1]
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
  background-color: #ffffff;
  .brandBottom_father {
    width: 100%;
    height: 100%;
    @include fj(center);
    align-items: center;
    li {
      width: 9rem;
      height: 2rem;
      color: #666666;
      @include fj(center);
      align-items: center;
      @include fontSize(28);
      font-weight: bold;
      border-right: 1px solid #e6e6e6;
    }
    .router-link-active {
      color: #c7ad8c;
    }
  }
}

</style>
