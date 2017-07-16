<template>
  <div id="app">
    <Navbar :islogin="islogin"></Navbar>
    <!-- <img src="./assets/logo.png"> -->
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
  created () {
    if (localStorage.getItem('token') !== null) {
      this.islogin = true
    }
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
