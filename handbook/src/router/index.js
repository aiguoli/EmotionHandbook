import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import LoginPage from '@/components/LoginPage'
import SignUp from '@/components/SignUp'
import HomeCompo from '@/components/router/HomeCompo'
import SearchByTime from '@/components/router/SearchByTime'
import Previous from '@/components/router/Previous'
import NotFound from '@/components/public/NotFound'
import ResultByPeriod from '@/components/router/results/ResultByPeriod'
import SearchByCompanion from '@/components/router/SearchByCompanion'
import ResultByDay from '@/components/router/results/ResultByDay'
import MoodDetail from '@/components/router/MoodDetail'
import MultipleSearch from '@/components/router/MultipleSearch'
import ResultByCompanion from '@/components/router/results/ResultByCompanion'
import ResultByLocation from '@/components/router/results/ResultByLocation'
import ResultByEmotion from '@/components/router/results/ResultByEmotion'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: {
        title: '🏠home',
        showAdd: false
      },
      children: [{
        path: '/home',
        name: 'HomeCompo',
        component: HomeCompo,
        meta: {
          title: '🏠home',
          showAdd: false
        }
      }, {
        path: '/search-by-time',
        name: 'SearchByTime',
        component: SearchByTime,
        meta: {
          title: '🔍search-by-time',
          showAdd: true
        }
      }, {
        path: '/previous',
        name: 'Previous',
        component: Previous,
        meta: {
          title: '📚previous',
          showAdd: true
        }
      }, {
        path: '/detail',
        name: 'MoodDetail',
        component: MoodDetail,
        meta: {
          title: '📚detail',
          showAdd: true
        }
      }, {
        path: '/search-result-by-period',
        name: 'ResultByPeriod',
        component: ResultByPeriod,
        meta: {
          title: '📅search-result-by-time',
          showAdd: true
        }
      }, {
        path: '/result-by-day',
        name: 'ResultByDay',
        component: ResultByDay,
        meta: {
          title: '📅search-result-by-time',
          showAdd: true
        }
      }, {
        path: '/search-by-companion',
        name: 'SearchByCompanion',
        component: SearchByCompanion,
        meta: {
          title: 'search-by-companion',
          showAdd: true
        }
      }, {
        path: '/multiple-search',
        name: 'MultipleSearch',
        component: MultipleSearch,
        meta: {
          title: '🧍multiple-search',
          showAdd: true
        }
      }, {
        path: '/result-by-companion',
        name: 'ResultByCompanion',
        component: ResultByCompanion,
        meta: {
          title: '🧍result-by-companion',
          showAdd: true
        }
      }, {
        path: '/result-by-location',
        name: 'ResultByLocation',
        component: ResultByLocation,
        meta: {
          title: '🧭result-by-location',
          showAdd: true
        }
      }, {
        path: '/result-by-emotion',
        name: 'ResultByEmotion',
        component: ResultByEmotion,
        meta: {
          title: '😊result-by-emotion',
          showAdd: true
        }
      }]
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      meta: {
        title: '👏log in',
        showAdd: false
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      meta: {
        title: '✍️sign up',
        showAdd: false
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: '😥Not found'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  let redirectPath
  if (to.path !== '/login' && to.path !== '/signup' && to.path !== '/api') {
    if (!localStorage.getItem('token')) {
      redirectPath = to.fullPath === '/' ? '/home' : to.fullPath
      next({
        path: '/login?redirect=' + redirectPath
      })
    } else {
      document.title = to.meta.title
      if (to.path === '/') {
        next({
          path: '/home'
        })
      }
      next()
    }
  } else if (to.path === '/login' || to.path === '/signup') {
    if (localStorage.getItem('token')) {
      redirectPath = from.fullPath
      document.title = from.meta.title
      next({
        path: redirectPath
      })
    } else {
      next()
    }
  }
})
// function checkToken (from, to, next, redirectPath) {
//   Message.info('Checking your identity.⏳')
//   Vue.axios.get('/item?moodId=1')
//     .then((res) => {
//       if (res.data.code === 401) {
//         Message.error('Either the token was expired or invalid, please log in again.🧐')
//         next({
//           path: '/login?redirect=' + redirectPath
//         })
//         localStorage.removeItem('token')
//       } else {
//         document.title = to.meta.title
//         if (to.path === '/') {
//           next({
//             path: '/home'
//           })
//         } else {
//           next()
//         }
//       }
//     })
//     .catch((error) => {
//       if (error.response.status === 500) {
//         Message.error('An internal server error occurred.😭')
//         localStorage.removeItem('token')
//       }
//       next({
//         path: '/login?redirect=' + redirectPath
//       })
//     })
// }
export default router
