<template>
  <div>
  <error-alert v-for="(error, index, id) in errors" :key="id" v-bind:id="index" v-bind:error="error" v-on:reset-error="resetError"></error-alert>
  </div>
</template>

<script>
import ErrorAlert from './ErrorAlert.vue';

export default {
  methods: {
    resetError : function(index) {
      console.log("ErrorAlerts:resetError: " + index);
      this.$emit('reset-error', index);
    },

  },
  props: ['errors'],
  components: {ErrorAlert}

}
</script>
