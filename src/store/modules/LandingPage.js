
// initial state
const state = {
  landingPageType: "",
  landingPageId: ""
}

// getters
const getters = {
  //templateId
  getLandingPageType: state => state.landingPageType,
  //pageId
  getLandingPageId: state => state.landingPageId
}

// actions
const actions = {


}

// mutations
const mutations = {
  setLandingPageType (state, landingPageType) {
    state.landingPageType = landingPageType
  },

  setLandingPageId (state, landingPageId) {
    state.landingPageId = landingPageId
  },

  InitialLandingPageType (state) {
    state.landingPageType = ""
  },

  InitialLandingPageId (state) {
    state.landingPageId = ""
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
