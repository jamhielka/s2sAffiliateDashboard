<template>
  <!-- <v-main> -->
  <!-- <v-container fluid fill-height> -->
  <!-- <v-layout align-center justify-center> -->

  <!-- <v-flex xs12 sm8 md4> -->
  <v-card class="elevation-12 py-10 rounded-card">
    <!-- <v-toolbar dark color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar> -->
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field
          label="Email Address"
          v-model="username"
          :rules="rules.required"
          type="text"
          placeholder="Email Address"
          outlined
        ></v-text-field>
        <!-- <v-text-field
              prepend-icon="mdi-account"
              label="Email Address"
              type="text"
              v-model="username"
              :rules="rules.required"
            ></v-text-field> -->
        <!-- <v-text-field
              id="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              prepend-icon="mdi-lock"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              :rules="rules.required"
              @click:append="showPassword = !showPassword"
            ></v-text-field> -->

        <v-text-field
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          :rules="rules.required"
          placeholder="Password"
          outlined
          @click:append="showPassword = !showPassword"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions class="pb-1">
      <!-- <v-spacer></v-spacer> -->
      <v-btn
        color="#3b054f"
        large
        class="text-white"
        rounded
        @click="login"
        block
        :disabled="loading"
      >
        <v-progress-circular
          v-if="loading"
          indeterminate
          class="mr-2"
        ></v-progress-circular>
        <span v-if="!loading">Login</span>
        <span v-if="loading">Logging in</span>
      </v-btn>
    </v-card-actions>
    <v-card-actions class="pb-1 d-flex justify-center">
      <!-- <p class="forgot-password text-right"> -->
      <router-link class="forgot-password" to="forgot"
        >Forgot Password</router-link
      >
      <!-- </p> -->
    </v-card-actions>
    <v-card-actions class="pt-10">
      <!-- <v-spacer></v-spacer> -->
      <v-btn
        color="#218e8a"
        to="register"
        class="text-white"
        large
        rounded
        block
      >
        Create new account
      </v-btn>
    </v-card-actions>
  </v-card>

  <!-- </v-layout> -->
  <!-- </v-container> -->
  <!-- </v-main> -->
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      showPassword: false,
      username: "",
      password: "",
      rules: {
        required: [(value) => !!value || "Required."],
      },
    };
  },

  props: {
    source: String,
  },
  methods: {
    login() {
      if (!this.$refs.form.validate()) {
        return false;
      }
      this.loading = true;
      let username = this.username;
      let password = this.password;
      const data = {
        username: username,
        password: password,
      };

      this.$store
        .dispatch("login", data)
        .then(() => {
          //if (
          // this.$store.getters.userRole === "ADMIN" ||
          // this.$store.getters.userRole === "RESBAKUNA"
          //) {
          //  this.$router.push("/admin");
          //} else if (this.$store.getters.userRole === "VALIDATOR") {
          //  this.$router.push("/validator");
          //} else {

          //}
          console.log(this.$store.getters.userRole);
          if (this.$store.getters.userRole === "USER") {
            this.$router.push("/admin");
          } else {
            this.$router.push("/S2Sadmin");
          }

          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          alert(err);
          console.log(err);
        });
    },
  },

  created() {
    // console.log(this.$store.getters.isLoggedIn)
    if (this.$store.getters.isLoggedIn) {
      return this.$router.push({ path: `/${this.userRole.toLowerCase()}` });
    }
  },

  computed: {
    userRole() {
      return this.$store.getters.userRole;
    },
  },
};
</script>

<style scoped>
.text-white {
  color: #fff;
}

/* .rounded{
  border-radius: 25px !important;
} */

a.forgot-password {
  color: #ff7200;
  text-decoration: none;
}

.rounded-card {
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
