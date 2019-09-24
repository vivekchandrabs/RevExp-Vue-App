<template>
  <div>
    <button
      type="button"
      class="btn btn-primary border border-dark rounded-pill shadow-lg"
      style="margin-right: 10px;"
      data-toggle="modal"
      data-target="#addcat"
    >Add Category</button>

    <div
      class="modal fade"
      id="addcat"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Add Category</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <Forms  v-on:childToParent="onChildClick" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              data-dismiss="modal"
              id="save_category"
              v-on:click="addcategory"
              class="btn btn-primary"
            >Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Forms from "./forms.vue";
import Vue from "vue";
import axios from "axios";

export default {
  name: "AddCategory",
  components: {
    Forms
  },
  props: ["base_api_url"],
  data() {
    return {
      newCategory: {}
    };
  },
  methods: {
    addcategory: function() {
      const auth = {
        headers: {
          Authorization: "Bearer " + window.localStorage["access_token"]
        }
      };
      axios
        .post(
          this.base_api_url + "/category/",
          {
            title: this.newCategory.category,
            description: this.newCategory.description
          },
          auth
        )
        .then(response => console.log(response))
        .catch(err => console.log(err));
    },
    onChildClick: function(value) {
      this.newCategory = value;
    }
  }
};
</script>

<style>
</style>
