<template>
  <div v-bind:class="[alert, alertDismissible, alertLevel]">
    <button type="button" class="close" data-dismiss="alert" v-on:click="resetError">&times;</button>
    <p class="mb-0">Best check yo self, you're not looking too good.</p>
    <h4> {{error.title}}</h4>
    <div v-for="str in error.text">
      {{ str }}
    </div>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      alert : 'alert',
      alertDismissible : 'alert-dismissible'}
  },

  computed : {
    alertLevel : function () {
      return "alert-" + this.error.level.toLowerCase();
    }
  },

  methods: {
    resetError : function() {
      console.log("ErrorAlerts:resetError");
      this.$emit('reset-error', this.id);
    },

  },
  props: ['error', 'id']

}
</script>
