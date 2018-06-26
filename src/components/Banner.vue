<template>
  <div class="navbar navbar-inverse navbar-fixed-top">
   <div class="container">
     <div class="navbar-header">
       <a href="/" class="navbar-brand">Vue Template</a>
     </div>
     <div id="navbar-main" class="navbar-collapse collapse">
       <ul class="nav navbar-nav">
         <li v-if="showSessions">
           <a href="/#/labSessionsOverview/">Sessions</a>
         </li>
       </ul>
       <ul class="nav navbar-nav navbar-right">
         <li v-if="showLogout">
           <a href="/#" v-on:click="logout"">Logout {{userFullName}}</a>
         </li>
         <li v-if="!showLogout"">
           <a href="/#/login">Login</a>
         </li>
       </ul>
     </div>
   </div>
 </div>
</template>

<script>
  export default {
    computed: {
      showSessions() { return this.$store.state.auth.isLoggedIn; },
      showLogout() { return this.$store.state.auth.isLoggedIn; },
      userFullName() {
        return this.$store.state.auth.firstName + " " + this.$store.state.auth.lastName;
      }
    },
    methods: {
      logout: function() {
        this.$store.dispatch('auth/resetAuth');
        this.$router.push('/#');  // redirect to the landing page
      }
    }
  }
</script>
