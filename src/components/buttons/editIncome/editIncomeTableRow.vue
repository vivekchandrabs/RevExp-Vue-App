<template>
  <tr scope="row">
    <td scope="col">{{res_data.categories.title}}</td>
    <td scope="col">
      <input class="form-control" v-model="title"/>
    </td>
    <td scope="col">
      <input class="form-control" v-model="description" />
    </td>
    <td scope="col">
      <input class="form-control" v-model="money" />
    </td>
    <td scope="col">
      <button
        class="btn btn-sm btn-success"
        data-dismiss="modal"
        v-on:click="edit_inc_function()"
        style="margin-top:3px;"
      >save</button>
    </td>
  </tr>
</template>

<script>
import axios from "axios"
export default {
  name: "EditIncomeTableRow",
  props: ["res_data", "month_number", "base_api_url"],
  data() {
    return {
      id: this.res_data.id,
      month: this.month_number,
      title: this.res_data.title,
      description: this.res_data.description,
      money: this.res_data.money
    };
  },
  methods: {
    edit_inc_function() {
      let url = this.base_api_url + "/income/" + this.id + "/";
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
            money: this.money
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
