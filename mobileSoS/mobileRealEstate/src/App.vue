<template>
  <div class="all">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'all'
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
