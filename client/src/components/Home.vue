<template lang="html">
  <div class="home" v-if="islogin">
    <AllContent></AllContent>
  </div>
  <div class="home" v-else>
    <Signup></Signup>
    <AllContent></AllContent>
  </div>
</template>

<script>
import Signup from '@/components/Signup'
import AllContent from '@/components/AllContent'

export default {
  props: ['islogin'],
  components: {
    Signup,
    AllContent
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="css" scoped>
.columns {
    height: 1000px;
}
.home {
    height: 1000px;
}
</style>
