import Vue from 'vue'
import Vuex from 'vuex'
import LandingPage from './modules/LandingPage'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    LandingPage,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
