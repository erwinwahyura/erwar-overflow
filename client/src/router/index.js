import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signin from '@/components/Signin'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import jsonwebtoken from 'jsonwebtoken'
import DetailContent from '@/components/DetailContent'
import AddQuestion from '@/components/AddQuestion'
import EditQuestion from '@/components/EditQuestion'
import Comments from '@/components/Comment'
// import VoteAnswer from '@/components/VoteAnswer'

// Vue.use(jsonwebtoken)
Vue.use(VueAxios, axios)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: true
    },
    {
      path: '/login',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/questions/:id',
      component: DetailContent,
      props: true,
      children: [
        {
          path: '/questions/:id/answer',
          component: Comments,
          props: true
        }
      ]
    },
    {
      path: '/add_question',
      component: AddQuestion
    },
    {
      path: '/edit_question/:id',
      component: EditQuestion,
      props: true
    }
  ]
})
