<template>
  <div class="all">
    <router-view/>
    <!-- <top></top> -->
  </div>
</template>

<script>
  import top from '@/components/topOption'
export default {
  name: 'all',
  components: {
    top: top
  }
}
</script>

<<style lang="scss">
@import './styles/common';
@import './styles/main';
.all {
  width: 100%;
  height: 100%;
}
</style>
