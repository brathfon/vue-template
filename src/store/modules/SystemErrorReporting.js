  const namespaced = true;

  const state = {
    errors: []
  }

  const mutations = {
    addError(state, newError) {
      state.errors.push(newError);
    },
    removeError(state, index) {
      state.errors.splice(index, 1);
    }
  }

export default {
  namespaced, state, mutations
}
