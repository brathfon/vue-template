

const namespaced = true;

const state = {
    // current choices for filters
    exampleFilterChoice : 'All'
  }

const mutations = {
    updateExampleFilterChoice(state, labShortName) {
      state.exampleFilterChoice = labShortName;
    }

  };  // end of mutations

  export default {
    namespaced, state, mutations
  }
