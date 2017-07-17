<template>
  <div id="app">
    <Navbar :islogin="islogin"></Navbar>
    <router-view :islogin="islogin"></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'app',
  components: {
    Navbar
  },
  data () {
    return {
      islogin: false
    }
  },
  methods: {
    checkToken () {
      if (localStorage.getItem('token') !== null) {
        this.islogin = true
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.checkToken()
    }
  },
  created () {
    this.checkToken()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
