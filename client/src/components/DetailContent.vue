<template lang="html">
  <div class="container">
    <article class="media">
      <figure class="media-left">
        <div class="votes">
          <a class="vote-up-off" @click="up"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-up-b-128.png" alt="vote-up"></a>
          <div class="score">{{ score }}</div>
          <a href="" class="vote-down-off" @click="down"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-128.png" alt="vote-up"></a>
        </div>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>{{ questionDetail.title }}</h1>
          <p>
            {{ questionDetail.body }}
            <br>
            <strong> asked by: {{ name }}</strong> <small>@johnsmith</small> <small>31m ago</small>
          </p>

        </div>

        <nav class="level is-mobile" v-if="flag">
          <div class="level-left">
            <a class="level-item">
              <!-- <span class="icon is-small"><i class="fa fa-reply" ></i></span> -->
              <router-link class="icon is-small" :to="'/questions/' + id + '/answer'"><i class="fa fa-reply"></i></router-link>
              <router-view></router-view>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fa fa-trash" @click="remove()"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fa fa-heart"></i></span>
            </a>
            <a class="level-item">
              <router-link class="icon is-small" :to="'/edit_question/'+questionDetail._id"><i class="fa fa-pencil"></i></router-link>
              <!-- <span class="icon is-small" @click="edit()"><i class="fa fa-pencil"></i></span> -->
            </a>
          </div>
        </nav>
        <nav class="level is-mobile" v-else>
          <div class="level-left">
            <router-link class="icon is-small" :to="'/questions/' + id + '/answer'"><i class="fa fa-reply"></i></router-link>
            <router-view></router-view>
            <a class="level-item">
              <span class="icon is-small"><i class="fa fa-heart"></i></span>
            </a>
          </div>
        </nav>
        <!-- answer -->
        <article class="media" v-if="cekAnswerFlag" v-for="(dataAnswer, index) in dataAnswers">
          <figure class="media-left">
            <div class="votes">
              <a class="vote-up-off" @click="up_answer(dataAnswer._id)"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-up-b-128.png" alt="vote-up"></a>
              <!-- <div class="score">{{ scoreAnswer }}</div> -->
              <div class="score">{{ dataAnswer.upvotes.length - dataAnswer.downvotes.length }}</div>
              <a href="" class="vote-down-off" @click="down_answer(dataAnswer._id)"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-128.png" alt="vote-up"></a>
            </div>
          </figure>
          <div class="media-content" >
            <div class="content" >
              <!-- <h1>{{ qd.answers }}</h1> -->
              {{ dataAnswer.answerBody }}
              ini cek id answer : {{dataAnswer._id}}
              <br>
              <strong> answered by: {{ dataAnswer.creator.name }}</strong> <small>@johnsmith</small> <small>31m ago</small>
            </div>
          </div>
        </article>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      questionDetail: [],
      name: '',
      idCreator: '',
      flag: false,
      score: '',
      dataAnswers: [],
      // scoreAnswer: 0,
      cekAnswerFlag: true
    }
  },
  methods: {
    getQuestionById () {
      var self = this
      this.axios.get('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id)
      .then(function (response) {
        console.log(response.data)
        self.questionDetail = response.data
        self.name = response.data.creator.name
        self.idCreator = response.data.creator._id
        self.score = response.data.upvotes.length - response.data.downvotes.length
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    remove () {
      var self = this
      this.axios.delete('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id, {
        headers: {token: localStorage.getItem('token')}
      })
      .then(function (response) {
        console.log(response.data)
        alert('Download Success!')
        self.$router.push('/')
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    checkFlag () {
      var self = this
      this.axios.get('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id)
      .then(function (response) {
        console.log(response.data)
        // self.questionDetail = response.data
        // self.name = response.data.creator.name
        // self.idCreator = response.data.creator._id
        var obj = response.data
        console.log(localStorage.getItem('token'))
        var cek = localStorage.getItem('unique')
        console.log('ini cek', cek)
        console.log('ini name ', obj.creator._id)
        if (obj.creator._id === cek) {
          self.flag = true
        }
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    up () {
      var self = this
      this.axios.put('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id + '/upvote', {
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
    down () {
      var self = this
      this.axios.put('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id + '/downvote', {
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
    reply () {
      var self = this
      this.axios.post('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id + '/answer/', {
        answerBody: self.answer,
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
    getDataAnswer () {
      var self = this
      this.axios.get('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id)
      .then((response) => {
        // console.log('ini data =====> ', response.data)
        // self.dataAnswers = response.data
        // self.scoreAnswer = (parseInt(response.data.answers.upvotes.length) - parseInt(response.data.answers.downvotes.length))
        // console.log('ini scoreAnswer ', self.scoreAnswer)
        console.log('================')
        console.log(response.data.answers[0].answerBody)
        console.log('================')
      })
      .catch((err) => {
        console.log(err)
      })
    },
    cekAnswer () {
      var self = this
      this.axios.get('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id)
      .then((response) => {
        // console.log('ini data =====> ', response.data)
        // self.dataAnswers = response.data
        // self.scoreAnswer = (parseInt(response.data.answers.upvotes.length) - parseInt(response.data.answers.downvotes.length))
        // console.log('ini scoreAnswer ', self.scoreAnswer)
        console.log('================')
        console.log(response.data.answers)
        self.dataAnswers = response.data.answers
        console.log('================')
      })
      .catch((err) => {
        console.log(err)
      })
      var cek = parseInt(this.dataAnswers)
      if (cek) {
        this.cekAnswerFlag = true
      }
    },
    up_answer (ids) {
      var self = this
      this.axios.put('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id + '/answer/' + ids + '/upvote', {
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
    down_answer (ids) {
      var self = this
      this.axios.put('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id + '/answer/' + ids + '/downvote', {
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
  },
  created () {
    this.getDataAnswer()
    this.getQuestionById()
    this.checkFlag()
    this.cekAnswer()
  }
}
</script>

<style lang="css" scoped>
article.media {
  padding-top: 50px;
}
.content {
  background-color: #eff0f1;
}
.score {
  text-align: center;
  font-size: 20px;
}
img {
  height: 30px;
  width: auto;
  text-align: center;
}
</style>
