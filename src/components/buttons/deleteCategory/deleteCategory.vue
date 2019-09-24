<template>
  <div>
    <button
      type="button"
      class="btn btn-primary border border-dark rounded-pill shadow-lg"
      style="margin-right: 10px;"
      id="delete_cat"
      v-on:click="fetchCategory"
      data-toggle="modal"
      data-target="#delcat"
    >Delete Category</button>

    <div
      class="modal fade"
      id="delcat"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Delete Category</h5>checkbox
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group" id="delcategory">
                <label for="recipient-name" class="col-form-label">Select your category :</label>
                <div v-for="category in this.category">
                  <input type="checkbox" ref="{{category.id}}" v-on:change="addTolist(category.id)" />
                  <label>{{category.title}}</label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              data-dismiss="modal"
              id="del_category"
              v-on:click="del_category"
              class="btn btn-primary"
            >Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DeleteCategory",
  props: ["base_api_url"],
  data() {
    return {
      category: [],
      id: "",
      category_ids: []
    };
  },
  methods: {
    fetchCategory: function() {
      const auth = {
        headers: {
          Authorization: "Bearer " + window.localStorage["access_token"]
        }
      };
      axios
        .get(this.base_api_url + "/category/", auth)
        .then(response => (this.category = response.data))
        .catch(err => console.log(err));
    },
    addTolist: function(id) {
      if (!this.category_ids.includes(id)) {
        this.category_ids.push(id);
      } else {
        this.category_ids.splice(this.category_ids.indexOf(id), 1);
      }
    },
    del_category: function() {
      for (let i of this.category_ids) {
        const auth = {
          headers: {
            Authorization: "Bearer " + window.localStorage["access_token"]
          }
        };
        axios
          .delete(this.base_api_url + "/category/" + i + "/", auth)
          .then(response => console.log(response))
          .catch(err => console.log(err));
      }
    }
  }
};
</script>

<style>
</style>
