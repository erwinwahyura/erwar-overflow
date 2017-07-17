<template lang="html">
<div class="container AddQuestion">
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <h1>FORM EDIT QUESTION</h1>
      <hr>
      <div class="field">
        <label class="label">TITLE</label>
        <p class="control">
          <input class="input" type="text" placeholder="Text input" value="EditQuestion.title" v-model="EditQuestion.title">
        </p>
        </div>

        <div class="field">
        <label class="label">Message</label>
        <p class="control">
          <textarea class="textarea" placeholder="Textarea" value="EditQuestion.body" v-model="EditQuestion.body"></textarea>
        </p>
        </div>

        <div class="field is-grouped">
        <p class="control">
          <button class="button is-primary" @click="Edit()">Submit</button>
        </p>
        <p class="control">
          <button class="button is-link" @click="cancel()">Cancel</button>
        </p>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      EditQuestion: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    getDataById () {
      var self = this
      this.axios.get('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id)
      .then(function (response) {
        console.log(response.data)
        self.EditQuestion.title = response.data.title
        self.EditQuestion.body = response.data.body
        console.log('ini title ', self.EditQuestion.title)
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    Edit () {
      var self = this
      this.axios.put('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id, {
        title: self.EditQuestion.title,
        body: self.EditQuestion.body,
        creator: localStorage.getItem('name')
      }, {headers: { token: localStorage.getItem('token') }})
      .then((response) => {
        console.log(response.data)
        self.$router.push('/questions/' + self.id)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    cancel () {
      this.AddQuestion = ''
    }
  },
  created () {
    this.getDataById()
  }
}
</script>

<style lang="css" scoped>
label {
  text-align: left;
}
.column{
  margin-top: 40px;
  border: 1px solid #e4e6e8;
}
.AddQuestion {
  height: 1000px;
}
</style>
