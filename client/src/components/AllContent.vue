<template lang="html">
  <div class="list-content">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <h1>Top Questions</h1>
        <hr>
        <div class="columns" v-for="lq in listQuestion">
          <div class="column is-2">
            <div class="level-left">
              <div class="votes">
                <h1>votes</h1>
                <h1>{{ lq.upvotes.length - lq.downvotes.length }}</h1>
              </div>
              <div class="reply">
                <h1>reply</h1>
                <h1>{{ lq.answers.length }}</h1>
              </div>
              <div class="view">
                <h1>view</h1>
                <h1>0</h1>
              </div>
            </div>
            <!-- <div class="level-left">
              <a class="level-item">
                <span class="tag"><h1>{{ lq.upvotes.length - lq.downvotes.length }}</h1></span>
              </a>
              <a class="level-item">
                <span class="tag"><h1>{{ lq.answer.length }}</h1></span>
              </a>
              <a class="level-item">
                <span class="tag"><h1>{{ lq.upvotes.length - lq.downvotes.length }}</h1></span>
              </a>
            </div> -->

          </div>
          <div class="column">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <p>
                    <router-link :to="'/questions/'+lq._id"><strong style="color: #3af">{{ lq.title }}</strong></router-link>
                    <br>
                    <p>Asked: {{ lq.creator.name }}</p>
                  </p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <p>Tags: </p>
                    <a class="level-item">
                      <!-- <span class="icon is-small"><i class="fa fa-reply"></i></span> -->
                      <span class="tag">JavaScript</span>
                    </a>
                    <a class="level-item">
                      <span class="tag">Vuejs</span>
                    </a>
                    <a class="level-item">
                      <!-- <span class="icon is-small"><i class="fa fa-heart"></i></span> -->
                      <small>31m</small>
                    </a>
                  </div>
                  <hr>
                </nav>

              </div>

            </article>

          </div>
        </div>

        <div class="columns">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listQuestion: []
    }
  },
  created () {
    this.getQuestion()
  },
  methods: {
    getQuestion () {
      var self = this
      this.axios.get('http://ec2-52-221-213-0.ap-southeast-1.compute.amazonaws.com:3000/api/questions/')
      .then((response) => {
        console.log(response.data)
        self.listQuestion = response.data
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="css" scoped>
h1 {
  text-align: left;
  margin-left: 10px;
}
.tag {
  background-color: #E1ECF4;
}
.content p:not(:last-child), .content dl:not(:last-child), .content ol:not(:last-child), .content ul:not(:last-child), .content blockquote:not(:last-child), .content pre:not(:last-child), .content table:not(:last-child) {
    margin-bottom: 0em;
}
.content {
  background-color: #eff0f1;
}
.column.is-8.is-offset-2 {
    position: relative;
    top: 29px;
}
</style>
