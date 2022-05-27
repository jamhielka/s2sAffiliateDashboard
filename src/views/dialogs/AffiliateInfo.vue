

<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">Affiliate Info</v-card-title>
        <v-card-text>
          <v-card-title>
            <div class="row">
              <div class="col-md-12" style="padding: 0">
                <h5 style="font-size: small">
                  Name:{{ this.scheduleItem.NAME }}
                </h5>
              </div>
              <div class="col-md-12" style="padding: 0">
                <h5 style="font-size: small">
                  Mobile Number:
                  {{
                    this.scheduleItem.msisdn 
                  }}
                </h5>
              </div>
              <div class="col-md-12" style="padding: 0">
                <h5 style="font-size: small">
                  CITY: {{ this.scheduleItem.city }}
                </h5>
              </div>
               <div class="col-md-12" style="padding: 0">
                <h5 style="font-size: small">
                  Province: {{ this.scheduleItem.province }}
                </h5>
              </div>
            </div>
            <br/>
             <br/>
             <div class="row">
              <div class="col-md-12" style="padding: 0">
                <h5 style="font-size: small">
                  Total Clicks:{{ this.scheduleItem.CLICKS }}
                </h5>
              </div>
              <div class="col-md-12" style="padding: 0">
                <h5 style="font-size: small">
                  Total Sign-Up:
                  {{
                    this.scheduleItem.SIGNUP 
                  }}
                </h5>
              </div>
              <div class="col-md-12" style="padding: 0">
                <h5 style="font-size: small">
                  Total Activation: {{ this.scheduleItem.ACTIVATED }}
                </h5>
              </div>
               <div class="col-md-12" style="padding: 0">
                <h5 style="font-size: small">
                  Wallet Balance: {{ this.scheduleItem.Revenue }}
                </h5>
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
          <v-btn color="primary" text @click="close()">Close</v-btn>
          <!-- <v-btn color="warning" text @click="ItemConfirm()">Completed</v-btn> -->
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
      NAME: "",
      msisdn: "",
      province: "",
      city: "",
      CLICKS: "",
      SIGNUP: "",
      Revenue: "",
      ACTIVATED: "",
    },
   dialog: false,
   
 
  }),
  props: ["data", "dialog"],

  watch: {
    dialog: function () {
      console.log(this.$props.data);
 
      var UID= this.$props.data;
     this.loadShift(UID);
      
    },
  },
  methods: {
        loadShift(uid) {
      this.$api
        .post("/Admin/AdminAffiliateInfo", {userid:uid}, {
          //headers: {
          // Authorization: `Bearer ${this.authToken}`,
          // Accept: "application/json",
          //},
        })
        .then((res) => {
          this.scheduleItem = res.data.data[0];
        
       
        });
    },

    close() {
      this.$emit("close", false);
    },
    ItemConfirm() {
      this.$emit("ItemConfirmed", true);
    }
  },
};
</script>
                                          