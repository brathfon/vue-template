const namespaced = true;

const state = {
  roles: []
}


const mutations = {
  updateRoles(state, status) {
    state.roles = status;
  }
}; // end of mutations


const actions = {};

export default {
  namespaced,
  state,
  mutations,
  actions
}
