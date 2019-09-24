<template>
  <div>
    <button
      type="button"
      class="btn btn-primary border border-dark rounded-pill shadow-lg"
      style="margin-right: 10px;"
      data-toggle="modal"
      id="avgexpense"
      data-target="#avgexp"
      v-on:click="avgexpense"
    >Average Expense</button>
    <div
      class="modal fade"
      id="avgexp"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id>Average Expense Limit</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <div id="avgexpform">
                <table class="table" id="avgexptable">
                  <thead>
                    <tr>
                      <td scope="col" style="text-align:center">
                        <b>Year</b>
                      </td>
                      <td scope="col" style="text-align:center">
                        <b>Total Cost</b>
                      </td>
                    </tr>
                  </thead>
                  <tr scope="row" v-for="exp in this.avg_year_expense">
                    <td scope="col" style="text-align:center">{{exp.year}}</td>
                    <td scope="col" style="text-align:center">{{exp.expense}}</td>
                  </tr> 
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AverageExpense",
  props: ["base_api_url"],
  data() {
    return {
      avg_year_expense: {}
    };
  },
  methods: {
    avgexpense: function() {
      const auth = {
        headers: {
          Authorization: "Bearer " + window.localStorage["access_token"]
        }
      };
      axios
        .get(this.base_api_url + "/averageyearexpense/", auth)
        .then(response => {
            console.log(response.data)
          this.avg_year_expense = response.data;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>
