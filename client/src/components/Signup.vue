<template lang="html">
  <div class="columns content-full">
    <div class="column is-half">
      <div class="content">
        <h1>Learn, Share, Build</h1>
        <p>Each month, over 50 million developers come to Stack Overflow to learn, share their knowledge, and build their careers.</p>
        <p>Join the world’s largest developer community.</p>
      </div>
    </div>
    <div class="column is-half">
      <h1>REGISTRATION HERE</h1>
      <div class="content-register">
        <div class="field">
          <label class="label">Name</label>
          <p class="control">
            <input class="input" type="text" placeholder="Text input" v-model="register.name" required>
          </p>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <p class="control has-icons-left has-icons-right">
            <input class="input is-danger" type="text" placeholder="Email input" value="" v-model="register.email" required>
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-warning"></i>
            </span>
          </p>
          <p class="help is-danger">This email is invalid</p>
        </div>

        <div class="field">
          <label class="label">Username</label>
          <p class="control has-icons-left has-icons-right">
            <input class="input is-success" type="text" placeholder="Text input" v-model="register.username" required>
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
            <input class="input is-success" type="password" placeholder="Text input" v-model="register.password" required>
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-check"></i>
            </span>
          </p>
          <p class="help is-success">This username is available</p>
        </div>

        <div class="field is-grouped">
          <div class="is-primary">
            <button type="button" class="column is-12 button is-primary"  @click="doRegister()">Sign Up</button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  data () {
    return {
      register: {
        name: '',
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    doRegister () {
      var self = this
      this.axios.post('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/users/signup', {
        name: self.register.name,
        username: self.register.username,
        email: self.register.email,
        password: self.register.password
      })
      .then((response) => {
        console.log(response.data)
        if (response.data.name !== '' && response.data.username !== '' && response.data.email !== '' && response.data.password !== '') {
          alert('Sign Up Success \n' + 'Welcome :' + response.data.name)
          this.$router.push('/login')
        } else {
          alert('Sign Up Failed, Check Your Input Please')
        }
        self.register.name = ''
        self.register.username = ''
        self.register.email = ''
        self.register.password = ''
      })
      .catch((err) => {
        console.log(err)
      })
    },
    coba () {
      alert('hio')
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
button.column.is-12.button.is-primary {
    width: 653%;
}
.columns.content-full {
  position: relative;
  top: 14px;
}
header {
    /*border-top: 3px solid #F48024;*/
    /*border-bottom: 1px solid #e4e6e8;*/
}
</style>
