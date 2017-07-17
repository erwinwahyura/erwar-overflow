<template lang="html">
  <header>
    <nav class="navbar" v-if="islogin">

      <router-link class="navbar-item " to="/"><img src="https://s3-ap-southeast-1.amazonaws.com/erwar-todo/download+(3).png" alt="erwar" width="112" height="28"></router-link>

      <router-link class="navbar-item " to="/">Developer Jobs</router-link>

      <router-link class="navbar-item " to="/">Documentation (Beta)</router-link>

      <router-link class="navbar-item " to="/">Tags</router-link>

      <router-link class="navbar-item " to="/">Users</router-link>

      <input class="input is-medium" type="text" placeholder="Search..">
      <span class="icon is-medium is-left">
        <i class="fa fa-search"></i>
      </span>

      <div class="navbar-item has-dropdown is-hoverable">
        <p class="navbar-link"> Welcome, {{ name }}</p>
        <div class="navbar-dropdown ">
          <router-link to="/add_question" class="navbar-item ">Add Question</router-link>

          <a class="navbar-item " @click="logout()">Log Out</a>
          <!-- <hr class="navbar-divider">
          <div class="navbar-item">
            <div>version <p class="has-text-info">0.4.3</p></div>
          </div> -->
        </div>
      </div>

      <!-- <a class="navbar-item " @clicks="logout()">Log Out</a> -->

      <!-- <router-link class="navbar-item " to="/signup">Sign Up</router-link> -->
    </nav>
    <nav class="navbar" v-else>

      <router-link class="navbar-item " to="/"><img src="https://s3-ap-southeast-1.amazonaws.com/erwar-todo/download+(3).png" alt="erwar"></router-link>

      <router-link class="navbar-item " to="/">Developer Jobs</router-link>

      <router-link class="navbar-item " to="/">Documentation (Beta)</router-link>

      <router-link class="navbar-item " to="/">Tags</router-link>

      <router-link class="navbar-item " to="/">Users</router-link>

      <input class="input is-medium" type="text" placeholder="Search..">
      <span class="icon is-medium is-left">
        <i class="fa fa-search"></i>
      </span>

      <router-link class="navbar-item " to="/login">Log In</router-link>
      <!-- <router-link class="navbar-item " to="/signup">Sign Up</router-link> -->
    </nav>

    <!-- <Signup></Signup>
    <AllContent></AllContent> -->

  </header>

</template>

<script>
import Signup from '@/components/Signup'
import AllContent from '@/components/AllContent'

export default {
  props: ['islogin'],
  data () {
    return {
      name: ''
    }
  },
  components: {
    Signup,
    AllContent
  },
  watch: {
    '$route' (to, from) {
      this.setName()
    }
  },
  created () {
    this.setName()
  },
  methods: {
    logout () {
      console.log('hi logout')
      localStorage.clear()
      this.$router.push('/')
    },
    setName () {
      this.name = localStorage.getItem('name')
    }
  }
}
</script>

<style lang="css" scoped>
  .input.input.is-medium {
    margin-top: 11px;
    margin-left: 11px;
    width: 220px;
    height: 30px;
  }
  span.icon.is-medium.is-left {
    margin-top: 7px;
    margin-right: 11px;
  }
  nav.navbar {
    /*border-top: 3px solid #F48024;
    border-bottom: 1px solid #e4e6e8;*/
  }
  a.navbar-item {
    text-align: center;
  }
  header{
    width: 100%;
    border-top: 3px solid #F48024;
    border-bottom: 1px solid #e4e6e8;
  }
  nav {
    max-width: 1060px;
    margin: 0 auto;
  }


</style>
