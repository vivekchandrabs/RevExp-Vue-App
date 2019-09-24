<template>
  <div>
    <button
      type="button"
      class="btn btn-primary border border-dark rounded-pill shadow-lg"
      style="margin-right: 10px;"
      v-on:click="edit_expense(0)"
      data-toggle="modal"
      data-target="#editexp"
    >Edit Expense</button>

    <div class="modal fade bd-example-modal-xl" id="editexp">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="container">
            <div style="display: inline-block;">
              <h5 style="text-align:center;padding-top:20px;">Edit Expense</h5>
              <button v-on:click="edit_expense(-1)">
                <span>&#8592;</span>
              </button>
              <button v-on:click="edit_expense(+1)">
                <span>&#8594;</span>
              </button>
            </div>
            <hr style="background-color: black" />
            <div id="expense_month_year"></div>

            <div id="edit_exp_div">
              <table class="table" id="edit_exp_div_item_table">
                <thead>
                  <tr>
                    <td scope="col">
                      <b>Category</b>
                    </td>
                    <td scope="col">
                      <b>Title</b>
                    </td>
                    <td scope="col">
                      <b>Description</b>
                    </td>
                    <td scope="col">
                      <b>Cost</b>
                    </td>
                    <td scope="col">
                      <b>Option</b>
                    </td>
                  </tr>
                </thead>
                <EditExpenseTableRow
                  :res_data="exp"
                  :month_number="month"
                  :base_api_url="base_api_url"
                  v-for="exp in monthly_exp"
                />
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" data-dismiss="modal" class="btn btn-primary">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EditExpenseTableRow from "./editExpenseTablerow";
var date = new Date();
var current_date = date.getMonth() + 1;
export default {
  name: "EditExpense",
  components: {
    EditExpenseTableRow
  },
  props: ["base_api_url"],
  data() {
    return {
      monthly_exp: {},
      expense_exp_id: 1,
      edit_exp: {},
      month: 1
    };
  },
  methods: {
    edit_expense: function(month_number) {
      if (current_date + month_number <= 1) {
        current_date = 1;
      } else if (current_date + month_number >= 12) {
        current_date = 12;
      } else {
        current_date = month_number + current_date;
      }
      this.month = current_date;
      const auth = {
        headers: {
          Authorization: "Bearer " + window.localStorage["access_token"]
        }
      };
      axios
        .get(this.base_api_url + "/expense/?month=" + current_date, auth)
        .then(response => {
          this.monthly_exp = response.data;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>
