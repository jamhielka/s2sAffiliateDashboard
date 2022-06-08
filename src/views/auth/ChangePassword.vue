<template>
  <v-card class="elevation-12 rounded-card">
    <v-card-title>Change Password</v-card-title>
    <v-divider></v-divider>

    <v-card-text>
      <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="2000">
        {{ text }}
      </v-snackbar>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="editedItem.otp"
          :rules="rules.required"
          label="OTP"
          @finish="onFinish"
          placeholder="OTP"
          outlined
        ></v-text-field>

        <v-text-field
          id="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          v-model="editedItem.password"
          :rules="rules.passwordRules"
          @click:append="showPassword = !showPassword"
          placeholder="Password"
          outlined
        ></v-text-field>
        <v-text-field
          id="confirmpassword"
          :append-icon="CshowPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Confirm Password"
          :type="CshowPassword ? 'text' : 'password'"
          v-model="editedItem.confirmpassword"
          :rules="rules.passwordRules"
          @click:append="CshowPassword = !CshowPassword"
          placeholder="Confirm Password"
          outlined
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions class="pb-10">
      <v-spacer></v-spacer>

      <v-btn
        color="#3b054f"
        class="px-12 text-white"
        @click="ChangePassword"
        :disabled="loading"
        large
        rounded
        block
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
</template>
<style scoped>
.position-relative {
  position: relative;
}
</style>
<script>
export default {
  data: () => ({
    valid: true,
    loading: false,
    showPassword: false,
    CshowPassword: false,
    password: "",
    confirmpassword: "",

    snackbar: false,
    snackbarColor: "default",
    otp: "",
    text: "",
    expectedOtp: "",
    rules: {
      required: [(value) => !!value || "Required."],
      passwordRules: [
        (value) => !!value || "Required",
        (value) => (value && value.length >= 6) || "Minimum 6 characters",
        (value) =>
          (value && /[A-Z]{1}/.test(value)) || "At least one capital letter",
        (value) =>
          (value && /[^A-Za-z0-9]/.test(value)) ||
          "At least one special character",
        (value) => (value && /\d/.test(value)) || "At least one number",
      ],
      emailRules: [
        (v) => !!v || "Required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
      mobileNumberRules: [
        (value) => !!value || "Required",
        (value) => (value && value.length >= 13) || "Invalid mobile number",
      ],
    },
    editedItem: {
      otp: "",
      password: "",
      confirmpassword: "",
      msisdn: "",
    },
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
      // this.$router.push("/Login");
    },
    ChangePassword() {
      var isvalid = this.$refs.form.validate();
      console.log(isvalid);

      if (this.editedItem.password == this.editedItem.confirmpassword) {
        this.editedItem.msisdn = localStorage.getItem("MOB");

        this.$api
          .post("/Affiliate/ChangePassword", this.editedItem, {
            // headers: {
            //   Authorization: TToken,
            // },
          })
          .then((response) => {
            console.log(response.data.data.status);
            var message = response.data.data.Message;
            //var status = response.data.data.status;

            if (message == "Saved Successfully") {
              this.$swal(
                "Thank you!",
                "Password is has been updated",
                "success"
              );

              //alert();
              this.$router.push("/Login");
              localStorage.removeItem("MOB");
            } else {
              this.$swal("Oops!", message, "error");
              // alert(message);
              ///this.$router.push("/Login");
            }
          })
          .catch((e) => {
            console.log(e);
            this.$swal("Oops!", "something wrong...", "error");
            //alert();
            //this.$router.push("/Login");
          });
      } else {
        this.$swal("Oops!", "Password did not match!", "error");
        //alert()
      }
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

<style scoped>
.rounded-card {
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.9);
}

.text-white {
  color: #fff;
}
</style>
