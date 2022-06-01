

<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Forgot Password</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="editedItem.email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>

                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                >
                  Submit
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
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
      this.$api
        .post("/Affiliate/Checkemail", this.editedItem, {
          // headers: {
          //   Authorization: TToken,
          // },
        })
        .then((response) => {
          console.log(response);
          var message = response.data.data.Message;

               localStorage.setItem('MOB', response.data.data.msisdn);
         var status = response.data.status;
     
          if (status == "OK") {
              
         
            alert("OTP has been sent to your registered mobile number");
            this.$router.push("/ChangePassword");
          } else {
          alert(message);
             //alert("OTP has been sent to your registered mobile number");
           // this.$router.push("/ChangePassword");
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
  },
};
</script>