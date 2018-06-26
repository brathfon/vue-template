<template>
  <div>
    <div v-if="haveErrors">
    <h3>System Error</h3>
    <error-alerts v-bind:errors="systemErrors" v-on:reset-error="resetError"></error-alerts>
  </div>
 </div>
</template>

<script>

import ErrorAlerts from './ErrorAlerts.vue';

export default {
  methods: {
    resetError : function(id) {
      this.$store.commit('systemErrors/removeError', id);
    }
  },
  computed: {
    haveErrors: function () {
      return (this.$store.state.systemErrors.errors.length > 0);
    },
    systemErrors: function () {
      return this.$store.state.systemErrors.errors;
    }

  },
  components: {ErrorAlerts}
}
</script>
