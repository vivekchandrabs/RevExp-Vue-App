<template>
  <button class="btn btn-secondary" v-on:click="logout()">Logout</button>
</template>

<script>
export default {
    name:"Logout",
    methods:{
        logout(){
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            this.$router.push({ path: '/' })
        }
    }
};
</script>

<style>
</style>
