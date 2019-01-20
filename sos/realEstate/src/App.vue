<template>
  <div class="package">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import contact from './components/haveContact';
export default {
  name: 'App',
  components: {
    contact
  }

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