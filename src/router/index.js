import Vue from 'vue'
import VueRouter from 'vue-router'
import EventCreate from '@/views/EventCreate.vue'
import EventList from '@/views/EventList.vue'
import EventShow from '@/views/EventShow.vue'
import NProgress from 'nprogress'
import store from '@/store'
import NotFound from '@/views/NotFound.vue'
import NetworkIssue from '@/views/NetworkIssue.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'event-list', 
    component: EventList,
    props: true
  },
  {
    path: '/event/:id',
    name: 'event-show', 
    component: EventShow,
    props: true,
    beforeEnter(to, from, next) {
      store.dispatch('event/fetchEvent', to.params.id).then((event) => {
        to.params.event = event
        next()
      }).catch(error => {
        if(error.response && error.response.status == 404) {
          next({name: '404', params: {resource: 'event'}})
        } else {
          next({name: 'network-issue'})
        }
      })
    }
  },
  {
    path: '/event/create',
    name: 'event-create', 
    component: EventCreate
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue,
  },
  {
    path: '*',
    redirect: {name: '404', params: {resource: 'page'}}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.beforeResolve((to, from, next) => {
  const currentPage = parseInt(to.query.page) || 1
  store.dispatch('event/fetchEvents', {
    page: currentPage
  }).then(() => {
    to.params.page = currentPage
    next()
  })
})

router.afterEach(() => {
  NProgress.done()
})


export default router
