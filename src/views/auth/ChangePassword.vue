<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Change Password</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                  <v-snackbar
                  v-model="snackbar"
                  :color="snackbarColor"
                  :timeout="2000"
                >
                  {{ text }}
                </v-snackbar>
              <v-form ref="form" lazy-validation>
              <v-text-field
                  v-model="editedItem.otp"
                    :rules="rules.required"
                  label="OTP"
                  required
                    prepend-icon="mdi-lock"
                   @finish="onFinish"
                ></v-text-field>
              
                <v-text-field
                  id="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  prepend-icon="mdi-lock"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="editedItem.password"
                  :rules="rules.required"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-text-field
                  id="confirmpassword"
                  :append-icon="CshowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  prepend-icon="mdi-lock"
                  label="Confirm Password"
                  :type="CshowPassword ? 'text' : 'password'"
                  v-model="editedItem.confirmpassword"
                  :rules="rules.required"
                  @click:append="CshowPassword = !CshowPassword"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="pb-1">
              <v-spacer></v-spacer>

              <v-btn
                color="primary"
                class="px-12"
                @click="ChangePassword"
                :disabled="loading"
              >
                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  class="mr-2"
                ></v-progress-circular>
                <span v-if="!loading">Submit</span>
                <span v-if="loading">Submit in</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>
<style scoped>
 .position-relative {
   position: relative;
 }
</style>
<script>

export default {
  data: () => ({
    loading: false,
    showPassword: false,
    CshowPassword: false,
    password: "",
    confirmpassword: "",

    snackbar: false,
    snackbarColor: "default",
    otp: "",
    text: "",
    expectedOtp: "133707",
    rules: {
      required: [(value) => !!value || "Required."],
    },
      editedItem: {
      otp: "",
       password: "",
    confirmpassword: "",
    msisdn:""
    }
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
  this.$router.push("/Login");
    },
    ChangePassword() {
      this.$refs.form.validate();
      this.editedItem.msisdn= localStorage.getItem('MOB');
      console.log(this.editedItem.msisdn);
      this.$api
        .post("/Affiliate/ChangePassword", this.editedItem, {
          // headers: {
          //   Authorization: TToken,
          // },
        })
        .then((response) => {
          console.log(response);
          var message = response.data.data.message;
          if (message == "Saved Successfully") {
            alert("Password is now updated");
            this.$router.push("/Login");
               localStorage.removeItem('MOB')
          } else {
               alert("Password is now updated");
              this.$router.push("/Login");
          }
        })
        .catch((e) => {
          console.log(e);
           alert("something wrong...");
            this.$router.push("/Login");
        });
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    onFinish(rsp) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.snackbarColor = rsp === this.expectedOtp ? "success" : "warning";
        this.text = `Processed OTP with "${rsp}" (${this.snackbarColor})`;
        this.snackbar = true;
      }, 3500);
    },
  },
};
</script>