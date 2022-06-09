<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Cashout</v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-select
              v-model="scheduleItem.paymentType"
              :items="listShift"
              item-text="name"
              item-value="code"
              label="Select Wallet"
              :rules="rules.required"
            ></v-select>

            <v-text-field
              type="number"
              class="form-control"
              label="Account Number"
              v-model="scheduleItem.accountNumber"
              :rules="rules.required"
            ></v-text-field>

            <v-text-field
              type="text"
              class="form-control"
              label="Account Name"
              v-model="scheduleItem.accountName"
              :rules="rules.required"
            ></v-text-field>

            <v-text-field
              type="number"
              class="form-control"
              placeholder="Amount"
              v-model="scheduleItem.amount"
              :rules="rules2"
         
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close()">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="SchedItemConfirm()"
            >Submit</v-btn
          >

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <v-dialog v-model="GenerateLinkdialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h6">
            <p>Congratulation! You now have your own link to share to your friends.</p>
</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
           
  <v-col cols="12">
      <label>Link:</label>
                <input  type="label"
           v-on:focus="$event.target.select()" 
           ref="clone" 
           readonly 
           :value="generatedlink"
           style="width: 250px;"
           />

           <v-btn
              icon
              color="red"
            @click="copy">
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
              </v-col>
           
 
              
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete()">Close</v-btn>
          

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
//import moment from "moment";
//import axios from "axios";
//import moment from "moment";

export default {
  data: () => ({
    // textFieldProps: {
    //   prependIcon: "mdi-calendar-month-outline",
    //   rules: [(value) => !!value || "Required."],
    // },
    // timeProps: {
    //   useSeconds: true,
    //   ampmInTitle: true,
    // },

    listShift: [],
    scheduleItem: {
      userId: "",
      accountName: "",
      accountNumber: "",
      paymentType: "",
      amount: "",
    },
    Message:"",
    defaultItem: {
      name: "",
      code: "",
    },
    generatedlink: "",
    modalScheduleDate: false,
    _id: "",
    GenerateLinkdialog: false,
    rules: {
      required: [(value) => !!value || "Required."],
    },
    rules2: [
      (v) => !!v || "Required",

      (v) => v >= 100 || "Cash-out should be above P100",
      (v) => v <= 5000 || "Max should not be above P5,000",
     (v) => (v && /^[0-9]*(\.[0-9]{0,2})?$/.test(v)) || "At least 2 decimal places only."
    ],
  }),
  props: ["data", "dialog"],

  watch: {
    dialog: function () {
      // console.log(this.$props.data["Employee Name"]
      // ,this.$props.data.employeeId);
      this.loadShift();
      this.scheduleItem.userid = this.$props.data.userid;
    },
  },

  methods: {
    loadShift() {
      // console.log(TToken);
      this.$api
        .post("/Affiliate/PaymentChannel", {
          //   headers: {
          //     Authorization: TToken,
          //   },
        })

        .then((response) => {
          console.log(response);
          this.listShift = response.data.data;

          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },

    close() {
      this.$emit("close", false);
    },
    SchedItemConfirm() {
      if (!this.$refs.form.validate()) {
        return false;
      }
      var userid = localStorage.getItem("userid");
      this.scheduleItem.userId = userid;
      console.log("code", this.scheduleItem.socialMedia);
      this.$api
        .post("/Affiliate/Payout", this.scheduleItem, {
          //   headers: {
          //     Authorization: TToken,
          //   },
        })

        .then((response) => {
          console.log(response.data.data[0]);
          //this.generatedlink= response.data.data[0].TrackingLink;
          //this.GenerateLinkdialog= true;
            this.Message=response.data.data[0].Message;

             
          if ((this.Message == "Insufficient Fund")) {
             this.$swal("Oops!", this.Message, "error");
           // alert(this.Message);
          } else {

                this.$swal("Thank you!", this.Message, "success");
           
                 this.close();
             this.$router.push('/admin/cashout') 
                this.scheduleItem.accountName= "";
      this.scheduleItem.accountNumber= "";
      this.scheduleItem.paymentType= "";
      this.scheduleItem.amount= "";
            
          
          }
          // alert(response.data.data[0].Message);
          // var r = confirm(response.data.data[0].Message);
          // if (r == true) {
          //   window.location.reload();
          // }
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });

       
         
    },

    closeDelete() {
      this.GenerateLinkdialog = false;
      this.dialog = false;
    },
    copy() {
      this.$refs.clone.focus();
      document.execCommand("copy");
    },
  },
};
</script>