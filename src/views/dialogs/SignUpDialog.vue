
<template>
  <div>
    <v-dialog v-model="dialog" width="720px">
      <v-card>
        <v-card-title class="text-h5">SIGNUP LIST</v-card-title>
        <v-card-text>
          <v-container>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="5"
              class="elevation-1"

            >
            
                 <template v-slot:[`item.dtCreated`]="{ item }">
        <span>{{ new Date(item.dtCreated).toLocaleString("en-CA") }}</span>
      </template>
               <template v-slot:[`item.dtActivated`]="{ item }">
        <span>{{ new Date(item.dtActivated).toLocaleString("en-CA") }}</span>
      </template>
            </v-data-table>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close()">Close</v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  data: () => ({
      headers: [
        {
          text: "Date/Time",
          align: "start",
          sortable: false,
          value: "dtCreated",
        },
        { text: "Click ID", value: "clickID" },
        { text: "ReferenceNo", value: "referenceNo" },
        { text: "isActivated", value: "isActivated" },
        { text: "Date Activated", value: "dtActivated" },
      ],
      desserts: [],
      GetRequest: {
        clickID: "",
      },
      
    dialog: false,
   }),
  props: ["data", "dialog"],

  watch: {
    dialog: function () {
      console.log("DATA: " + this.$props.data);
      //        var url =this.$props.data["Link"];

      var lastsegment = this.$props.data.split("/").pop();
      // //var lastsegment = array[array.length-1];
      console.log(lastsegment);
      this.getSignUpList(lastsegment);
      // ,this.$props.data.employeeId);
      //this.loadShift();
      // this.scheduleItem.userid = this.$props.data.userid;
    },
  },

  methods: {
    async getSignUpList(link) {
      // this.table.loading = true;
      // var TToken = localStorage.getItem("token");
      //var userid = localStorage.getItem("userid");
      //console.log(link.substring(link.lastIndexOf('/') + 1));

      //this.GetRequest.userid = userid;
      this.GetRequest.clickID = link;
      await this.$api
        .post("/Affiliate/GetSignUpList", this.GetRequest, {
          //   headers: {
          //     Authorization: TToken,
          //   },
        })

        .then((response) => {
          console.log(response);
          const newArr = response.data.data;
          this.desserts = newArr;
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
  },
 
};
</script>