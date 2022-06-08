

<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">Cash-out Request</v-card-title>
        <v-card-text>
          <v-card-title>
            <div class="row">
              <div class="col-md-12" style="padding: 0">
                <h5 style="font-size: small">
                  Name:{{ this.scheduleItem.acctName }}
                </h5>
              </div>
              <div class="col-md-12" style="padding: 0">
                <h5 style="font-size: small">
                  Wallet type:
                  {{ this.scheduleItem.paymentType }}
                </h5>
              </div>
              <div class="col-md-12" style="padding: 0">
                <h5 style="font-size: small">
                  Account Number: {{ this.scheduleItem.acctNumber }}
                </h5>
              </div>
              <div class="col-md-12" style="padding: 0">
                <h5 style="font-size: small">
                  Amount: {{ this.scheduleItem.amount }}
                </h5>
              </div>
              <div class="col-md-12" style="padding: 0">
                <v-text-field
                  type="text"
                  class="form-control"
                  label="Reference No"
                  v-model="scheduleItem.ReferenceNo"
                  :rules="rules.required"
                ></v-text-field>
              </div>
            </div>
          </v-card-title>

          <!-- 
          <v-data-table
            dense
            :headers="headers"
            :items="desserts"
            item-key="name"
            loading="loadTable"
            loading-text="Loading... Please wait"
            class="elevation-1"
          >
            <template v-slot:[`item.quantity`]="{ item }">
              <div v-if="item.quantity">
                {{ item.quantity }}
              </div>
              <div v-else>
                <v-btn x-small> Upload </v-btn>
              </div>

      
            </template>
          </v-data-table> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" text @click="CashOutConfirm()">Done</v-btn>
          <v-btn color="primary" text @click="close()">Close</v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
//import moment from "moment";
export default {
  data: () => ({
    scheduleItem: {
      trxnid: "",
      name: "",
      paymentType: "",
      acctName: "",
      acctNumber: "",
      amount: "",
      id: "",
      ReferenceNo: "",
      userid:"",
    },
    COREQ: {
      userId: "",
      payoutId: "",
      adminUser: "",
       isApproved: true,
       referenceNo:"",
    },

    dialog: false,
    rules: {
      required: [(value) => !!value || "Required."],
    },
  }),
  props: ["data", "dialog"],

  watch: {
    dialog: function () {
      console.log("PROPS:" + this.$props.data.item.acctName);

      this.scheduleItem.acctName = this.$props.data.item.acctName;
      this.scheduleItem.acctNumber = this.$props.data.item.acctNumber;
      this.scheduleItem.paymentType = this.$props.data.item.paymentType;
      this.scheduleItem.amount = this.$props.data.item.amount;
     this.scheduleItem.id = this.$props.data.item.id;
      this.scheduleItem.userid = this.$props.data.item.userid;
     //this.loadShift(UID);
    },
  },
  methods: {
    loadShift(uid) {
      this.$api
        .post(
          "/Admin/AdminAffiliateInfo",
          { userid: uid },
          {
            //headers: {
            // Authorization: `Bearer ${this.authToken}`,
            // Accept: "application/json",
            //},
          }
        )
        .then((res) => {
          this.scheduleItem = res.data.data[0];
        });
    },

    close() {
      this.$emit("close", false);
    },
    ItemConfirm() {
      this.$emit("ItemConfirmed", true);
    },
    CashOutConfirm() {

        this.COREQ.userId=this.scheduleItem.userid;
        this.COREQ.payoutId=this.scheduleItem.id;
        this.COREQ.referenceNo=this.scheduleItem.ReferenceNo;
        this.COREQ.adminUser="Admin";
      this.$api
        .post(
          "/Admin/PayoutApproved",
          this.COREQ,
          {
            //headers: {
            // Authorization: `Bearer ${this.authToken}`,
            // Accept: "application/json",
            //},
          }
        )
        .then((res) => {
           this.$swal("Message", res.data.Message, "sucess");
          //alert(res.data.Message);
  
          this.scheduleItem.ReferenceNo="";
       
        
          
        });
    },
  },
};
</script>
                                          