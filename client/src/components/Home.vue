<template lang="html">
  <div class="home">
    <Signup v-if="!islogin"></Signup>
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
.home {
    min-height: 100vh;
}
</style>
