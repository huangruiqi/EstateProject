<template>
  <div class="video4">
    <iframe height=100% width=100% src='http://player.youku.com/embed/XMzU3MTI4NTYwNA==' frameborder=0 allowfullscreen>
    </iframe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      back: '',
      src1: ''
    }
  },
  created() {
    this.$axios.get("/introduction")
      .then(res => {
        this.src1 = res.data.data.videoUrl;
        console.log(this.src1)
      })
      .catch(error => {
        console.log(error);
      })
  },
  methods: {
    clickBack: function() {
			this.$router.push({path: '/brand/brandIntro'});
		}
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/main.scss';
@import '../../styles/mixin.scss';
.video4 {
  width: 100%;
  height: 90%;
  padding-top: 6rem;
}
</style>
