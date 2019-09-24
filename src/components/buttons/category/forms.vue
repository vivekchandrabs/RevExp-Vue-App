<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <label class="col-form-label">Enter your new Category:</label>
        <input
          type="text"
          class="form-control"
          v-model="newCategory.category"
          v-on:keydown="sendData()"
          required
        />
      </div>
      <div class="col-md-6">
        <label class="col-form-label">Enter your Description:</label>
        <input
          type="text"
          class="form-control"
          v-model="newCategory.description"
          v-on:keydown="sendData()"
          required
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forms",
  data() {
    return {
      newCategory: {
        category: "",
        description: ""
      }
    };
  },
  methods: {
    sendData() {
      this.$emit('childToParent', this.newCategory)
    }
  }
};
</script>

<style>
</style>
