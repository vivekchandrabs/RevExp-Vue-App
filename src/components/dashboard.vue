<template>
  <div>
    <Base :is_authenticated="is_authenticated" />
    <div class="container">
      <div class="row">
        <AddCategory :base_api_url="base_api_url" />
        <DeleteCategory :base_api_url="base_api_url" />
        <AddExpense :base_api_url="base_api_url" />
        <EditExpense :base_api_url="base_api_url" />
        <AddIncome :base_api_url="base_api_url" />
        <EditIncome :base_api_url="base_api_url" />
        <SetExpenseLimit :base_api_url="base_api_url" />
        <AvgExpense :base_api_url="base_api_url" />
      </div>
      <br />
      <br />
      <div class="row">
        <div class="col-md-6">
          <Piechart
            :base_api_url="base_api_url"
            :res_data="expense_pi_chart"
            v-if="!expense_pi_chart_loading"
          />
        </div>
        <div class="col-md-6">
          <BarChart
            :base_api_url="base_api_url"
            :res_data="expense_bar_chart"
            v-if="!expense_bar_chart_loading"
          />
        </div>
      </div>
      <br />
      <br />
      <div class="row">
        <div class="col-md-6">
          <Piechart
            :base_api_url="base_api_url"
            :res_data="income_pi_chart"
            v-if="!income_pi_chart_loading"
          />
        </div>
        <div class="col-md-6">
          <BarChart
            :base_api_url="base_api_url"
            :res_data="income_bar_chart"
            v-if="!income_bar_chart_loading"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <Tables
            :base_api_url="base_api_url"
            :res_data="expense_table"
            v-if="!expense_table_loading"
          />
        </div>
        <div class="col-md-6">
          <Tables
            :base_api_url="base_api_url"
            :res_data="income_table"
            v-if="!income_table_loading"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Base from "./base.vue";
import AddCategory from "./buttons/category/addCategory.vue";
import DeleteCategory from "./buttons/deleteCategory/deleteCategory.vue";
import AddExpense from "./buttons/addExpense/addExpense.vue";
import EditExpense from "./buttons/editExpense/editExpense.vue";
import AddIncome from "./buttons/addIncome/addIncome.vue";
import EditIncome from "./buttons/editIncome/editIncome.vue";
import SetExpenseLimit from "./buttons/setExpenseLimit/setExpenseLimit.vue";
import AvgExpense from "./buttons/avgExpenseLimit/avgExpenseLimit.vue";
import Tables from "./tables/tables.vue";
import Piechart from "./graphs/piechart.vue";
import BarChart from "./graphs/barChart.vue";

export default {
  name: "DashBoard",
  components: {
    Base,
    AddCategory,
    DeleteCategory,
    AddExpense,
    EditExpense,
    AddIncome,
    EditIncome,
    SetExpenseLimit,
    AvgExpense,
    Tables,
    Piechart,
    BarChart
  },
  data() {
    return {
      expense_table_loading: true,
      expense_table: {
        data: {},
        table_type: ""
      },

      income_table_loading: true,
      income_table: {
        data: {},
        table_type: ""
      },

      expense_pi_chart_loading: true,
      expense_pi_chart: {},

      expense_bar_chart_loading: true,
      expense_bar_chart: {},

      income_pi_chart_loading: true,
      income_pi_chart: {},

      income_bar_chart_loading: true,
      income_bar_chart: {},

      base_api_url: "http://api.cloudstores.me",
      // base_api_url: "http://127.0.0.1:8000/api",
      is_authenticated: false
    };
  },
  created: function() {
    const auth = {
      headers: {
        Authorization: "Bearer " + window.localStorage["access_token"]
      }
    };

    if (localStorage["access_token"]) {
      this.is_authenticated = true;
    } else {
      this.$router.push({ path: "/" });
    }

    // Expense Pi chart
    axios
      .get(this.base_api_url + "/allmonthexpense/", auth)
      .then(response => {
        (this.expense_pi_chart = response.data),
          ((this.expense_pi_chart.chart_type = "Yearly Expense"),
          (this.expense_pi_chart_loading = false));
      })
      .catch(err => console.log(err));

    // Expense Bar Chart
    axios
      .get(this.base_api_url + "/barchartexp/", auth)
      .then(response => {
        this.expense_bar_chart = response.data;
        this.expense_bar_chart.chart_type = "Yearly Expense";
        this.expense_bar_chart_loading = false;
      })
      .catch(err => console.log(err));

    //   Income Pie Chart
    axios
      .get(this.base_api_url + "/allmonthincome/", auth)
      .then(response => {
        this.income_pi_chart = response.data,
        (this.income_pi_chart.chart_type = "Yearly Income"),
        this.income_pi_chart_loading = false
      })
      .catch(err => console.log(err));

    // Income Bar Chart
    axios
      .get(this.base_api_url + "/barchartinc/", auth)
      .then(response => {
        this.income_bar_chart = response.data;
        this.income_bar_chart.chart_type = "Yearly Income";
        this.income_bar_chart_loading = false;
      })
      .catch(err => console.log(err));

    // Expense table data
    axios
      .get(this.base_api_url + "/tabledata/", auth)
      .then(response => {
        (this.expense_table.data = response.data),
          (this.expense_table.table_type = "Expense Table"),
          (this.expense_table_loading = false);
      })
      .catch(err => console.log(err));

    // Income table data
    axios
      .get(this.base_api_url + "/incomedata/", auth)
      .then(response => {
        (this.income_table.data = response.data),
          (this.income_table.table_type = "Income Table");
        this.income_table_loading = false;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style>
</style>
