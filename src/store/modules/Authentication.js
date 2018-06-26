
const namespaced = true;

const state = {
    firstName : '',
    lastName : '',
    userID : -1,
    roles : [],
    roleIDs : [],
    roleAbrvs : [],
    roleLongNames : [],
    isLoggedIn : false
  };

const mutations = {
    // ************** Authorization mutations *****************
    updateFirstName(state, newFirstName) {
      state.firstName = newFirstName;
    },
    updateLastName(state, newLastName) {
      state.lastName = newLastName;
    },
    updateRoles(state, newRoles) {
      state.roles = newRoles;
    },
    updateRoleIDs(state, newRoleIDs) {
      state.roleIDs = newRoleIDs;
    },
    updateRoleAbrvs(state, newRoleAbrvs) {
      state.roleAbrvs = newRoleAbrvs;
    },
    updateRoleLongNames(state, newRoleLongNames) {
      state.roleLongNames = newRoleLongNames;
    },
    updateUserID (state, newUserID) {
      state.userID = newUserID;
    },
    updateIsLoggedIn (state, status) {
      state.isLoggedIn = status;
    }
  };  // end of mutations

  const getters = {

    // checks to see of either the abreviated or long name for a role is true for this userID
    // returns true or false
    // To call this.$store.getters['auth/hasRole']("Administration"));
    hasRole: (state) => (roleStr) => {
      let result = state.roleAbrvs.find((roleAbrv) => roleAbrv === roleStr) ||
                   state.roleLongNames.find( (roleLongName) => roleLongName === roleStr);
      return result !== undefined;
    }
  };

  const actions = {
    // ************** Authorization actions *****************
    resetAuth(context) {
      context.commit('updateUserID',  -1);
      context.commit('updateFirstName', '');
      context.commit('updateLastName',  '');
      context.commit('updateRoles',     []);
      context.commit('updateRoleIDs',     []);
      context.commit('updateRoleAbrvs',     []);
      context.commit('updateRoleLongNames',     []);
      context.commit('updateIsLoggedIn', false);
    }
  };

  export default {
    namespaced, state, mutations, getters, actions
  }
