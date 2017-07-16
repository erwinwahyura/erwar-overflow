<template lang="html">
  <div class="container">
    <!-- get answer -->
    <article class="media" :cekAnswerFlag="cekAnswerFlag">
      <figure class="media-left">
        <div class="votes">
          <a class="vote-up-off" @click="up_answer"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-up-b-128.png" alt="vote-up"></a>
          <div class="score">{{ scoreAnswer }}</div>
          <a href="" class="vote-down-off" @click="down_answer"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-128.png" alt="vote-up"></a>
        </div>
      </figure>
      <div class="media-content" >
        <div class="content">
          <!-- <h1>{{ qd.answers }}</h1> -->
          <p>
            {{ dataAnswer.answers }}
            <br>
            <!-- <strong> answered by: {{ dataAnswer.creator }}</strong> <small>@johnsmith</small> <small>31m ago</small> -->
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: ['cekAnswerFlag'],
  methods: {
    up_answer () {
      var self = this
      this.axios.put('http://localhost:3000/api/questions/' + self.id + '/upvote', {
        creator: localStorage.getItem('name')
      }, {
        headers: {token: localStorage.getItem('token')}
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    down_answer () {
      var self = this
      this.axios.put('http://localhost:3000/api/questions/' + self.id + '/downvote', {
        creator: localStorage.getItem('name')
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

<style lang="css">
</style>
