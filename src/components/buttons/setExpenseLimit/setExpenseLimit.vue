<template>
  <div>
    <button
      type="button"
      class="btn btn-primary border border-dark rounded-pill shadow-lg"
      style="margin-right: 10px;"
      data-toggle="modal"
      id="explimit"
      data-target="#explim"
      v-on:click="explimit"
    >Set Expense Limit</button>

    <div
      class="modal fade"
      id="explim"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id>Set Expense Limit</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Enter Expense Limit:</label>
              <div id="expform">
                <input
                  type="number"
                  id="expenselimit"
                  v-model="expenseLimit"
                  class="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              data-dismiss="modal"
              id="save_expense_limit"
              class="btn btn-primary"
              v-on:click="save_expense_limit"
            >Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SetExpenseLimit",
  props:["base_api_url"],
  data() {
    return {
      expenseLimit: "",
      expenselimit_id:""
    };
  },
  methods: {
    explimit: function() {
      const auth = {
        headers: {
          Authorization: "Bearer " + window.localStorage["access_token"]
        }
      };
      axios
        .get(this.base_api_url + "/expenselimit/", auth)
        .then(response => {
          console.log(response.data)
          this.expenseLimit = response.data[0].expense_limit;
          this.expenselimit_id = response.data[0].id
        });
    },
    save_expense_limit: function() {
      const auth = {
        headers: {
          Authorization: "Bearer " + window.localStorage["access_token"]
        }
      };
      axios
        .patch(
          this.base_api_url + "/expenselimit/"+this.expenselimit_id+"/",
          {
            expense_limit: this.expenseLimit
          },
          auth
        )
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>
