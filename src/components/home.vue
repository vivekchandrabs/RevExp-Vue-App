<template>
  <!-- Start of the forms -->
  <div>
    <Base />
    <div class="container">
      <h1 style="text-align:center">
        <b>Rev-Exp</b>
      </h1>
      <br />
      <br />
      <div class="row">
        <div class="col-md-6">
          <h2>Sign Up</h2>
          <br />
          <div class="form-group">
            <label for="exampleDropdownFormPassword1">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="signup_user.username"
              placeholder="Username"
              name="username"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleDropdownFormPassword1">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="signup_user.email"
              placeholder="Email"
              name="email"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleDropdownFormPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="signup_user.password"
              placeholder="Confirm Password"
              name="password"
              required
            />
          </div>

          <button id="signup" v-on:click="create_user()" class="btn btn-primary">Sign up</button>
        </div>

        <div class="col-md-6">
          <h2>Log In</h2>
          <br />
          <div class="form-group">
            <label for="exampleDropdownFormEmail1">Username</label>
            <input
              type="username"
              class="form-control"
              id="signin_username"
              v-model="signin_user.username"
              placeholder="Username"
              name="username"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleDropdownFormPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="signin_password"
              v-model="signin_user.password"
              placeholder="Password"
              name="password"
              required
            />
          </div>

          <button
            id="signin"
            v-on:click="login_user(signin_user.username, signin_user.password)"
            class="btn btn-primary"
          >Log in</button>
        </div>
      </div>
      <div class="dropdown-divider"></div>
    </div>
  </div>

  <!-- End of the forms -->
</template>

<script>
import axios from "axios";
import Base from "./base.vue";

export default {
  data() {
    return {
      signin_user: {},
      signup_user: {},
      base_api_url:"http://api.cloudstores.me"
      //  base_api_url: "http://127.0.0.1:8000/api",
       
    };
  },
  components: {
    Base
  },
  methods: {
    login_user: function(username, password) {
      axios
        .post(this.base_api_url + "/token/", {
          username: username,
          password: password
        })
        .then(response => {
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          this.$router.push({ path: '/dashboard/' })
        })
        .catch(err => {
          alert(err);
        });
    },
    create_user: function() {
      axios
        .post(this.base_api_url + "/signup/", {
          username: this.signup_user.username,
          password: this.signup_user.password,
          email: this.signup_user.email
        })
        .then(response => {
          console.log(response);
          this.login_user(this.signup_user.username, this.signup_user.password);
        })
        .catch(err => alert(err));
    }
  }
};
</script>

<style>
</style>
