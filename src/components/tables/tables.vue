<template>
  <div>
    <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 28rem;">
      <div class="card-body">
        <div style="text-align:center">
          <p>
            <b>{{this.res_data.table_type}}</b>
          </p>
        </div>

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">
                <b>CATEGORY</b>
              </th>
              <th scope="col">
                <b>TITLE</b>
              </th>
              <th scope="col">
                <b>DATE</b>
              </th>
              <th scope="col">
                <b>MONEY</b>
              </th>
            </tr>
          </thead>
          <tbody id="table">
            <tr scope="row" v-for="row in this.res_data.data">
              <td>{{row.categories.title}}</td>
              <td>{{row.title}}</td>
              <td>{{row.timestamp}}</td>
              <td>₹{{row.cost}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Table",
  data() {
    return {
      table_data: {}
    };
  },
  props: ["res_data"]
};
</script>

<style>
</style>
