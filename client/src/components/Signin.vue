<template lang="html">
  <div class="bg column is-4 is-offset-4">
    <div class="content-register">
      <h1>LOGIN HERE</h1>
      <hr>
      <div class="field">
        <label class="label">Username</label>
        <p class="control has-icons-left has-icons-right">
          <input class="input is-success" type="text" placeholder="Text input" required="" v-model="dataUser.username">
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fa fa-check"></i>
          </span>
        </p>
        <p class="help is-success">This username is available</p>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <p class="control has-icons-left has-icons-right">
          <input class="input is-success" type="password" placeholder="Text input" required="" v-model="dataUser.password">
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fa fa-check"></i>
          </span>
        </p>
        <p class="help is-success">This password is available</p>
      </div>

      <div class="field is-grouped">
        <div class="column is-12">
          <button type="button" class="button is-primary" name="button" @click="doLogin()">Sign Up</button>
        </div>
      </div>
  </div>

  </div>

</template>

<script>
export default {
  data () {
    return {
      dataUser: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    doLogin () {
      var self = this
      this.axios.post('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/users/signin', {
        username: self.dataUser.username,
        password: self.dataUser.password
      })
      .then((response) => {
        self.dataUser.username = ''
        self.dataUser.password = ''
        console.log(response.data)
        if (response.data) {
          console.log(response.data)
          var token = response.data.token
          localStorage.setItem('token', token)
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('unique', response.data.id)
          this.$router.push('/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="css" scoped>
.content{
  text-align: left;
  margin-left: 200px;
  color: #fff;
  font-weight: bolder;
}
h1 {
  color: #fff;
}
.columns.content-full {
  padding-top: 50px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 0px;
  background-color: #108AEC;
}
label {
  text-align: left;
  color: white;
}
.content-register {
  line-height: 0.1rem;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
}
div.column.is-12 {
  padding-top: 10px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
}
button.button.is-primary {
    width: 100%;
}
.bg {
  padding-top: 60px;
  /*background-color: green;*/
  border: 1px solid #e4e6e8;
}
.bg.column.is-4.is-offset-4 {
    margin-top: 100px;
}
label {
  color: black;
}
h1 {
  color: black;
}
</style>
