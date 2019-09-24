<template>
  <div>
    <div>
      <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 28rem;">
        <div class="card-body">
          <canvas
            ref="BarChart"
            width="400"
            height="400px"
            style="max-height: 400px; max-width: 400px"
          ></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BarGraph",
  props: ["res_data"],
  mounted() {
    var ctx = this.$refs.BarChart;
    var myBarChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        datasets: [
          {
            label: this.res_data.chart_type,
            backgroundColor: [
              "#e74c3c",
              "#3498db",
              "#2ecc71",
              "#3498db",
              "#f1c40f",
              "#4834d4",
              "#130f40",
              "#95afc0",
              "#f0932b"
            ],
            borderColor: "rgb(0,0,0)",
            data: this.res_data.data
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
};
</script>

<style>
</style>
