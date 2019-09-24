<template>
  <div>
    <button
      type="button"
      class="btn btn-primary border border-dark rounded-pill shadow-lg"
      style="margin-right: 10px;"
      v-on:click="edit_income(0)"
      data-toggle="modal"
      data-target="#editinc"
    >Edit Income</button>

    <div class="modal fade bd-example-modal-xl" id="editinc">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="container">
            <div style="display: inline-block;">
              <h5 style="text-align:center;padding-top:20px;">Edit Income</h5>
              <button style="float:left" v-on:click="edit_income(-1)">
                <span>&#8592;</span>
              </button>
              <button style="float:right" v-on:click="edit_income(+1)">
                <span>&#8594;</span>
              </button>
            </div>
            <hr style="background-color: black" />
            <div id="edit_inc_div">
              <table class="table" id="edit_inc_div_item_table">
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
                <EditIncomeTableRow
                  v-for="inc in monthly_inc"
                  :key=inc.id
                  :res_data="inc"
                  :month_number="month_number"
                  :base_api_url="base_api_url"
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
import EditIncomeTableRow from "./editIncomeTableRow.vue";
var date = new Date();
var income_date = date.getMonth() + 1;
var edit_inc_id = 1;
export default {
  name: "EditIncome",
  props: ["base_api_url"],
  components: {
    EditIncomeTableRow
  },
  data() {
    return {
      edit_inc_id: 1,
      monthly_inc: {},
      month_number: 1
    };
  },
  methods: {
    edit_income: function(month_number) {
      if (income_date + month_number <= 1) {
        income_date = 1;
      } else if (income_date + month_number >= 12) {
        income_date = 12;
      } else {
        income_date = month_number + income_date;
      }
      this.month_number = income_date;
      const auth = {
        headers: {
          Authorization: "Bearer " + window.localStorage["access_token"]
        }
      };
      axios
        .get(this.base_api_url + "/income/?month=" + income_date, auth)
        .then(response => {
          this.monthly_inc = response.data;
        });
    }
  }
};
</script>

<style>
</style>
