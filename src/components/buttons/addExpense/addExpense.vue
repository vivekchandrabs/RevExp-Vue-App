<template>
  <div>
    <button
      type="button"
      class="btn btn-primary border border-dark rounded-pill shadow-lg"
      style="margin-right: 10px;"
      id="add_expense"
      data-toggle="modal"
      data-target="#addexp"
      v-on:click="fetchcategories"
    >Add Expense</button>

    <div
      class="modal fade"
      id="addexp"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Add Expense</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <div class="dropdown">
                  <label class="col-form-label">Select Category:</label>
                  <select class="form-group" style="width:100%" @change="onChange($event)">
                    <option
                      v-for="category in this.categories"
                      :value="category.id"
                    >{{category.title}}</option>
                  </select>
                </div>
                <form>
                  <div class="form-group" id="category">
                    <label for="recipient-name" class="col-form-label">Add Amount :</label>
                    <input type="number" v-model="json_data.cost" class="form-control" required />
                  </div>
                </form>
                <form>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Title :</label>
                    <input type="text" v-model="json_data.title" class="form-control" required />
                  </div>
                </form>
                <form>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Description :</label>
                    <input
                      type="text"
                      v-model="json_data.description"
                      class="form-control"
                      required
                    />
                  </div>
                </form>
                <form>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Select Date :</label>
                    <input type="date" v-model="json_data.time" class="form-control" required />
                  </div>
                </form>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              data-dismiss="modal"
              class="btn btn-primary"
              v-on:click="createExpense"
              id="done"
            >Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddExpense",
  props: ["base_api_url"],
  data() {
    return {
      categories: [],
      json_data: {
        categories: ""
      }
    };
  },
  methods: {
    fetchcategories: function() {
      const auth = {
        headers: {
          Authorization: "Bearer " + window.localStorage["access_token"]
        }
      };
      axios
        .get(this.base_api_url + "/category/", auth)
        .then(response => {
          (this.categories = response.data),
            (this.json_data.categories = response.data[0].id);
        })
        .catch(err => console.log(err));
    },
    onChange: function(event) {
      this.json_data.categories = event.target.value;
    },
    createExpense: function() {
      const auth = {
        headers: {
          Authorization: "Bearer " + window.localStorage["access_token"]
        }
      };
      axios
        .post(this.base_api_url + "/expense/", this.json_data, auth)
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>
