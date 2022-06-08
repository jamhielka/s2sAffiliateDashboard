<template>
  <v-row>
    <v-col cols="12" lg="3" md="6">
      <card-widget
        icon="mdi-web"
        label="No. of Affiliates"
        :value="loadingData ? 0 : ReportItem.NoAffiliate"
      ></card-widget>
    </v-col>
    <v-col cols="12" lg="3" md="6">
      <card-widget
        icon="mdi-mouse"
        label="Total Clicks"
        :value="loadingData ? 0 : ReportItem.TTLClicks"
      ></card-widget>
    </v-col>
    <v-col cols="12" lg="3" md="6">
      <card-widget
        icon="mdi-account-star"
        label="SignUp"
        :value="loadingData ? 0 : ReportItem.SignUp"
      ></card-widget>
    </v-col>
    <v-col cols="12" lg="3" md="6">
      <card-widget
        icon="mdi-currency-usd"
        label="Activated"
        :value="loadingData ? 0 : ReportItem.Activated"
      ></card-widget>
    </v-col>
  <v-col cols="12" lg="3" md="6">
      <card-widget
        icon="mdi-web"
        label="Today's New Affiliates"
        :value="loadingData ? 0 : ReportItem1.NoAffiliate"
      ></card-widget>
    </v-col>
    <v-col cols="12" lg="3" md="6">
      <card-widget
        icon="mdi-mouse"
        label="Today's Clicks"
        :value="loadingData ? 0 : ReportItem1.TTLClicks"
      ></card-widget>
    </v-col>
    <v-col cols="12" lg="3" md="6">
      <card-widget
        icon="mdi-account-star"
        label="Today's SignUp"
        :value="loadingData ? 0 : ReportItem1.SignUp"
      ></card-widget>
    </v-col>
    <v-col cols="12" lg="3" md="6">
      <card-widget
        icon="mdi-currency-usd"
        label="Today's Activated"
        :value="loadingData ? 0 : ReportItem1.Activated"
      ></card-widget>
    </v-col>
      <v-col cols="12" lg="3" md="6">
      <card-widget
        icon="mdi-web"
        label="Monthly Affiliates"
        :value="loadingData ? 0 : ReportItem2.NoAffiliate"
      ></card-widget>
    </v-col>
    <v-col cols="12" lg="3" md="6">
      <card-widget
        icon="mdi-mouse"
        label="Monthly Clicks"
        :value="loadingData ? 0 : ReportItem2.TTLClicks"
      ></card-widget>
    </v-col>
    <v-col cols="12" lg="3" md="6">
      <card-widget
        icon="mdi-account-star"
        label="Monthly SignUp"
        :value="loadingData ? 0 : ReportItem2.SignUp"
      ></card-widget>
    </v-col>
    <v-col cols="12" lg="3" md="6">
      <card-widget
        icon="mdi-currency-usd"
        label="Monthly Activated"
        :value="loadingData ? 0 : ReportItem2.Activated"
      ></card-widget>
    </v-col>
<v-col cols="12" lg="12" md="12">
      <v-card height="100%">
        <v-card-text class="text-center">
          <v-row class="text-center">
          
            <v-col cols="12">
                <h3>TOP 10 AFFILATE</h3>

  <v-data-table
    dense
    :headers="headers"
    :items="desserts"
    item-key="name"
    class="elevation-1"
  ></v-data-table>

            </v-col>

         
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
<v-col cols="12" lg="12" md="12">
      <v-card height="100%">
        <v-card-text class="text-center">
          <v-row class="text-center">
          
            <v-col cols="12">
                <h3>TOP 10 AFFILATE-MONTHLY</h3>

  <v-data-table
    dense
    :headers="headers"
    :items="desserts2"
    item-key="name"
    class="elevation-1"
  ></v-data-table>

            </v-col>

         
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>

import CardWidget from "../../components/CardWidget.vue";
export default {
  components: {

    CardWidget,
  },
  data: () => ({
    loadingData: true,
   
    approveData: {},
    ReportItem: {
      NoAffiliate: "",
      TTLClicks: "",
      SignUp: "",
      Activated: "",
    },
     ReportItem1: {
      NoAffiliate: "",
      TTLClicks: "",
      SignUp: "",
      Activated: "",
    },
     ReportItem2: {
      NoAffiliate: "",
      TTLClicks: "",
      SignUp: "",
      Activated: "",
    },
    GeneratedItem: {
      userid: "",
      socialMedia: "",
    },
    ReportReqItem: {
      type: "",
    },
      headers: [
      {
        text: "Name",
        align: "start",

        value: "NAME",
         width: "20px"
      },
      {
        text: "City",
        align: "start",

        value: "city",
      },
      { text: "Clicks", value: "CLICKS" },
      { text: "Sign-Up", value: "SIGNUP" },
      { text: "Activated", value: "ACTIVATED" },
    //   { text: "Revenue", value: "REVENUE" },
    //   { text: "Date/Time", value: "dtCreated" },
      // { text: "Actions", value: "actions" },
    ],
    desserts: [],
  desserts2: [],
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.getReport_OverallTotal();
      this.getReport_Today();
      this.getReport_MTD();
       this.getReport_TOP10();
       this.getReport_TOP10MTD();
    },

    async getReport_OverallTotal() {
      //var userid = localStorage.getItem("userid");
    
      //console.log(TToken);
      await this.$api
        .post("/Admin/AdminReport",  {type: "OTOTAL"}, {})

        .then((response) => {
          //  console.log(response);
          const newArr = response.data.data[0];
          this.ReportItem = newArr;
          this.loadingData = false;
          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },
       async getReport_Today() {
     // var userid = localStorage.getItem("userid");
     
      //console.log(TToken);
      await this.$api
        .post("/Admin/AdminReport",  {type: "TODAY"}, {})

        .then((response) => {
          //  console.log(response);
          const newArr = response.data.data[0];
          this.ReportItem1 = newArr;
          this.loadingData = false;
          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },
     async getReport_MTD() {
      //var userid = localStorage.getItem("userid");
     
      //console.log(TToken);
      await this.$api
        .post("/Admin/AdminReport",  {type: "MTD"}, {})

        .then((response) => {
          //  console.log(response);
          const newArr = response.data.data[0];
          this.ReportItem2 = newArr;
          this.loadingData = false;
          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },
    
     async getReport_TOP10() {
    
      await this.$api
        .post("/Admin/AdminTop10",  {type: "OTOTAL"}, {})

        .then((response) => {
        
          const newArr = response.data.data;
           console.log(newArr);
          this.desserts = newArr;
          this.loadingData = false;
          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },
    
     async getReport_TOP10MTD() {
    
      await this.$api
        .post("/Admin/AdminTop10",  {type: "MTD"}, {})

        .then((response) => {
        
          const newArr = response.data.data;
           console.log(newArr);
          this.desserts2 = newArr;
          this.loadingData = false;
          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },

    GeneratedLinkBTN() {
      //this.$router.push({
      // name: 'Add Employee',
      // params: {
      //      editedItemX: Object.assign({}, item)
      //  }
      //});/
      // console.log(item);

      //this.approveData = Object.assign({}, item);
      //console.log(this.approveData);
      this.editDialog.dialog = true;
    },
  },
};
</script>