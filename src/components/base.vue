<template>
  <div>
    <!-- Start of nav bar -->

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="margin-bottom:50px">
      <div class="container">
        <a class="navbar-brand" href="/">RevExp</a>
        <ul class="navbar-nav mr-auto"></ul>
        <form class="form-inline my-2 my-lg-0">
          <Logout v-if="is_authenticated"/>
        </form>
      </div>
    </nav>

    <!-- End of the nav bar -->
  </div>
</template>

<script>
import Logout from "./logout.vue";
export default {
  name: "Base",
  props: ["is_authenticated"],
  components: {
    Logout
  }
};
</script>

<style>
</style>
