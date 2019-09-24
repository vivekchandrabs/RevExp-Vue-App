<template>
  <tr>
    <td scope="col">{{res_data.categories.title}}</td>
    <td scope="col">
      <input class="form-control" v-model="title" />
    </td>
    <td scope="col">
      <input class="form-control" v-model="description" />
    </td>
    <td scope="col">
      <input class="form-control" v-model="cost" />
    </td>
    <td scope="col">
      <button
        class="btn btn-sm btn-success"
        data-dismiss="modal"
        v-on:click="edit_exp_function()"
        style="margin-top:3px;"
      >save</button>
    </td>
  </tr>
</template>

<script>
import axios from "axios"
export default {
  name: "EditExpenseRow",
  props: ["res_data", "month_number", "base_api_url"],
  data() {
    return {
      id: this.res_data.id,
      month: this.month_number,
      title: this.res_data.title,
      description: this.res_data.description,
      cost: this.res_data.cost
    };
  },
  methods: {
    edit_exp_function() {
      let url = this.base_api_url + "/expense/" + this.id + "/";
      const auth = {
        headers: {
          Authorization: "Bearer " + window.localStorage["access_token"]
        }
      };
      axios
        .patch(
          url,
          {
            month: this.month,
            title: this.title,
            description: this.description,
            cost: this.cost
          },
          auth
        )
        .then(response => console.log("done"))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>
