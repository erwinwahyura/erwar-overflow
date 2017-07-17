<template lang="html">
  <div class="container">
    <article class="media">
      <figure class="media-left">
        <div class="votes">
          <a class="vote-up-off" @click="up"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-up-b-128.png" alt="vote-up"></a>
          <div class="score">{{ score }}</div>
          <a class="vote-down-off" @click="down"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-128.png" alt="vote-up"></a>
        </div>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>{{ questionDetail.title }}</h1>
          <p>
            {{ questionDetail.body }}
            <br>
            <strong> asked by: {{ name }}</strong>
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
              <router-link class="icon is-small" :to="'/edit_question/'+questionDetail._id"><i class="fa fa-pencil"></i></router-link>
              <!-- <span class="icon is-small" @click="edit()"><i class="fa fa-pencil"></i></span> -->
            </a>
          </div>
        </nav>
        <nav class="level is-mobile" v-else>
          <div class="level-left">
            <router-link class="icon is-small" :to="'/questions/' + id + '/answer'"><i class="fa fa-reply"></i></router-link>
            <router-view></router-view>
          </div>
        </nav>
        <!-- answer -->
        <article class="media" v-if="cekAnswerFlag" v-for="(dataAnswer, index) in dataAnswers">
          <figure class="media-left">
            <div class="votes">
              <a class="vote-up-off" @click="up_answer(dataAnswer._id, index)"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-up-b-128.png" alt="vote-up"></a>
              <!-- <div class="score">{{ scoreAnswer }}</div> -->
              <div class="score">{{ scoreAnswer }}</div>
              <a class="vote-down-off" @click="down_answer(dataAnswer._id, index)"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-down-b-128.png" alt="vote-up"></a>
            </div>
          </figure>
          <div class="media-content" >
            <div class="content" >
              <!-- <h1>{{ qd.answers }}</h1> -->
              {{ dataAnswer.answerBody }}
              <!-- ini cek id answer : {{dataAnswer._id}} -->
              <br>
              <strong> answered by: {{ dataAnswer.creator.name }}</strong>
               <!-- ini id si penjawab <strong> answered by: {{ dataAnswer.creator._id }}</strong> -->
            </div>
            <div class="level-left" v-if="dataAnswer.creator._id === currentUser">
              <a class="level-item">
                <span class="icon is-small"><i class="fa fa-trash" @click="removeAnswer(dataAnswers._id)"></i></span>
              </a>
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
      score: 0,
      dataAnswers: [],
      scoreAnswer: 0,
      cekAnswerFlag: true,
      commentCreator: false
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
        // self.scoreAnswer = response.data.answers.upvotes.length - response.data.answers.downvotes.length
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
        alert('Delete Success!')
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
        creator: self.currentUser
      }, {
        headers: {token: localStorage.getItem('token')}
      })
      .then((response) => {
        if (self.currentUser) {
          var idUp = response.data.upvotes.indexOf(self.currentUser)
          var idDown = response.data.downvotes.indexOf(self.currentUser)
          if (idUp === -1 && idDown === -1) {
            response.data.upvotes.push(self.currentUser)
            self.score = response.data.upvotes.length - response.data.downvotes.length
          } else if (idDown !== -1) {
            response.data.downvotes.splice(idDown, 1)
            self.score = response.data.upvotes.length - response.data.downvotes.length
          }
          // this.axios.
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    down () {
      var self = this
      this.axios.put('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id + '/downvote', {
        creator: self.currentUser
      }, {
        headers: {token: localStorage.getItem('token')}
      })
      .then((response) => {
        console.log(response.data)
        if (self.currentUser) {
          var idUp = response.data.upvotes.indexOf(self.currentUser)
          var idDown = response.data.downvotes.indexOf(self.currentUser)
          if (idUp === -1 && idDown === -1) {
            response.data.downvotes.push(self.currentUser)
            self.score = response.data.upvotes.length - response.data.downvotes.length
          } else if (idUp !== -1) {
            response.data.upvotes.splice(idDown, 1)
            self.score = response.data.upvotes.length - response.data.downvotes.length
          }
        }
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
        console.log(response.data)
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
        // self.$router.push('/questions/' + self.id)
      })
      .catch((err) => {
        console.log(err)
      })
      var cek = parseInt(this.dataAnswers)
      if (cek) {
        this.cekAnswerFlag = true
      }
    },
    up_answer (idsAnswer, index) {
      var self = this
      this.axios.put('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id + '/answer/' + idsAnswer + '/upvote', {
        creator: self.currentUser
      }, {
        headers: {token: localStorage.getItem('token')}
      })
      .then((response) => {
        console.log('log ini dong : ', response.data)
        console.log('log currentUser : ', self.currentUser)
        if (self.currentUser) {
          var idUp = response.data.upvotes.indexOf(self.currentUser)
          var idDown = response.data.downvotes.indexOf(self.currentUser)
          console.log('ini idup :', idUp)
          console.log('ini idDown :', idDown)
          if (idUp === -1 && idDown === -1) {
            var a = response.data.upvotes.push(self.currentUser)
            console.log('hasil push', a)
            response.data.upvotes.push(self.currentUser)
            // self.dataAnswers[index].upvotes.push(self.currentUser)
            self.scoreAnswer = response.data.upvotes.length - response.data.downvotes.length
          } else if (idDown !== -1) {
            response.data.downvotes.splice(idDown, 1)
            // self.dataAnswers[index].downvotes.push(self.currentUser)
            self.scoreAnswer = response.data.upvotes.length - response.data.downvotes.length
          }
          self.getDataAnswer()
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    down_answer (idsAnswer, index) {
      var self = this
      this.axios.put('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + self.id + '/answer/' + idsAnswer + '/downvote', {
        creator: self.currentUser
      }, {
        headers: {token: localStorage.getItem('token')}
      })
      .then((response) => {
        console.log(response.data)
        console.log('log currentUser : ', self.currentUser)
        if (self.currentUser) {
          var idUp = response.data.upvotes.indexOf(self.currentUser)
          console.log('ini idup :', idUp)
          var idDown = response.data.downvotes.indexOf(self.currentUser)
          console.log('ini iddown :', idDown)
          if (idUp === -1 && idDown === -1) {
            response.data.downvotes.push(self.currentUser)
            // self.dataAnswers[index].downvotes.push(self.currentUser)
            self.scoreAnswer = response.data.upvotes.length - response.data.downvotes.length
          } else if (idUp !== -1) {
            response.data.upvotes.splice(idDown, 1)
            // self.dataAnswers[index].upvotes.push(self.currentUser)
            self.scoreAnswer = response.data.upvotes.length - response.data.downvotes.length
          }
          // this.getDataAnswer()
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    removeAnswer (idsAnswer) {
      // var self = this
      this.axios.delete('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/' + this.id + '/answer/' + idsAnswer)
      .then((response) => {
        alert('delete Success')
      })
      .catch((err) => { console.log(err) })
    }
  },
  computed: {
    currentUser () {
      return localStorage.getItem('unique')
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
