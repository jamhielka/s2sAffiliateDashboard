<template>
  <!-- <v-main> -->
  <!-- <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4> -->
  <v-card class="elevation-12 rounded-card">
    <!-- <v-toolbar dark color="primary">
              <v-toolbar-title>Forgot Password</v-toolbar-title>
            </v-toolbar> -->
    <v-card-title>Forgot Password</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="editedItem.email"
          :rules="emailRules"
          label="Email Address"
          required
          placeholder="Email Address"
          outlined
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="#3b054f"
          class="mr-4 mb-3 text-white"
          @click="validate"
          large
          rounded
          block
        >
          Submit
        </v-btn>

        <v-btn
          color="#218e8a"
          to="register"
          class="text-white"
          large
          rounded
          block
          @click.prevent="cancel"
        >
          Cancel
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
  <!-- </v-flex>
      </v-layout>
    </v-container>
  </v-main> -->
</template>
<script>
export default {
  data: () => ({
    valid: true,
    //   name: '',
    //   nameRules: [
    //     v => !!v || 'Name is required',
    //     v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    //   ],
    editedItem: {
      email: "",
    },
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    //   select: null,
    //   items: [
    //     'Item 1',
    //     'Item 2',
    //     'Item 3',
    //     'Item 4',
    //   ],
    //   checkbox: false,
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
      this.valid=true;
      this.$api
        .post("/Affiliate/Checkemail", this.editedItem, {
          // headers: {
          //   Authorization: TToken,
          // },
        })
        .then((response) => {
          console.log(response);
          var message = response.data.data.Message;

          localStorage.setItem("MOB", response.data.data.msisdn);
          var status = response.data.status;

          if (status == "OK") {
<<<<<<< HEAD
              
          this.$swal("Thank you!", "OTP has been sent to your registered mobile number", "success");
            //alert("OTP has been sent to your registered mobile number");
            this.$router.push("/ChangePassword");
          } else {
              this.$swal("Oops.", message, "error");
          //alert(message);
             //alert("OTP has been sent to your registered mobile number");
           // this.$router.push("/ChangePassword");
=======
            alert("OTP has been sent to your registered mobile number");
            this.$router.push("/ChangePassword");
          } else {
            alert(message);
            //alert("OTP has been sent to your registered mobile number");
            // this.$router.push("/ChangePassword");
>>>>>>> 1ee3ce659f444e7a7d4115d2929cd92ce4bc6395
          }
        })
        .catch((e) => {
          console.log(e);
          alert("OTP has been sent to your registered mobile number");
          this.$router.push("/ChangePassword");
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    cancel() {
      this.$router.push("/login");
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
