<template lang="html">
  <div class="container">
    <article class="media">
      <!-- <figure class="media-left">
        <p class="image is-64x64">
          <img src="http://bulma.io/images/placeholders/128x128.png">
        </p>
      </figure> -->
      <div class="media-content">
        <div class="field">
          <p class="control">
            <textarea class="textarea" placeholder="Add a comment..." v-model="answer"></textarea>
          </p>
        </div>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <a class="button is-info" @click="addComment()">Submit</a>
              <br>
            </div>
            <div class="level-item">
              <router-link :to="'/questions/'+id">Cancel</router-link>
            </div>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      answer: ''
    }
  },
  methods: {
    addComment () {
      console.log('idnya ', this.id)
      var self = this
      this.axios.post('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id + '/answer/', {
        answerBody: self.answer,
        parent: self.id,
        creator: localStorage.getItem('token')
      }, {
        headers: {token: localStorage.getItem('token')}
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
