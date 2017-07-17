<template lang="html">
<div class="container AddQuestion">
  <div class="columns">
    <div class="column is-8 is-offset-2">
      <h1>FORM ADD QUESTION</h1>
      <hr>
      <div class="field">
        <label class="label">TITLE</label>
        <p class="control">
          <input class="input" type="text" placeholder="Text input" v-model="AddQuestion.title">
        </p>
        </div>

        <div class="field">
        <label class="label">Message</label>
        <p class="control">
          <textarea class="textarea" placeholder="Textarea" v-model="AddQuestion.body"></textarea>
        </p>
        </div>

        <div class="field is-grouped">
        <p class="control">
          <button class="button is-primary" @click="Add()">Submit</button>
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
  data () {
    return {
      AddQuestion: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    Add () {
      var self = this
      this.axios.post('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions', {
        title: self.AddQuestion.title,
        body: self.AddQuestion.body,
        creator: localStorage.getItem('name')
      }, {headers: { token: localStorage.getItem('token') }})
      .then((response) => {
        console.log(response.data)
        alert('Success')
        self.$router.push('/')
      })
      .catch((err) => {
        console.log(err)
      })
    },
    cancel () {
      this.AddQuestion = ''
    }
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
