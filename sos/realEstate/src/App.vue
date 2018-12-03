<template>
  <div class="package">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
    
<style lang="scss">
@import "./styles/main";
@import "./styles/common";
@import "./styles/mixin";

.package {
  width: 100%;
  height: 100%;
}
</style>