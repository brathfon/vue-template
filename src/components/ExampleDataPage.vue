<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <h3>Example Data</h3>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th class="center-align-table-cell">Example ID</th>
              <th class="center-align-table-cell">Col 1</th>
              <th class="center-align-table-cell">The Date</th>
              <th class="center-align-table-cell">The Time</th>
              <th class="center-align-table-cell">Comments</th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="example in exampleData">
              <td class="center-align-table-cell">{{example.example_id}}</td>
              <td class="center-align-table-cell">{{example.col_1}}</td>
              <td class="center-align-table-cell">{{example.the_date}}</td>
              <td class="center-align-table-cell">{{example.the_time}}</td>
              <td class="center-align-table-cell">{{example.comments}}</td>

            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
var errorMsgs = require('../util/errorMessages');

export default {
  data() {
    return {  exampleData : []
    }
  },
  components: {
  },
  computed: {
  },
  methods: {

    getExampleData: function() {

      console.log("LOADING EXAMPLE DATA");
      var msg = {
        method: 'get',
        url: '/api/getExampleData',
        data: {}
      }

      this.$http(msg)
        .then((response) => {
          if (response.data.exampleData ){
            this.exampleData = response.data.exampleData;
          }
        })
        .catch((error) => {
          errorMsgs.handleHttpErrors.call(this, error);
        });
    }


  },  // end of methods
  created() {
    this.getExampleData();
  }
}
</script>
