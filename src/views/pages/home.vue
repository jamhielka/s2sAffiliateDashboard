<template>
  <v-row>
    <v-col cols="12" lg="3" md="6">
      <card-widget
        icon="mdi-web"
        label="No. of URL"
        :value="loadingData ? 0 : ReportItem.NoURL"
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
    <v-col cols="12" lg="12" md="12">
      <!-- <v-card height="100%">
        <v-card-text class="text-center">
          <v-row>
            <v-col cols="3">
              <v-card class="mx-auto" max-width="344" color="blue lighten-4">
                <v-card-text>
                  <div>No. of URL</div>
                  <p class="text-h4 text--primary">{{ ReportItem.NoURL }}</p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="3">
              <v-card class="mx-auto" max-width="344" color="blue lighten-4">
                <v-card-text>
                  <div>Total Clicks</div>
                  <p class="text-h4 text--primary">
                    {{ ReportItem.TTLClicks }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="3">
              <v-card class="mx-auto" max-width="344" color="blue lighten-4">
                <v-card-text>
                  <div>Sign Up</div>
                  <p class="text-h4 text--primary">{{ ReportItem.SignUp }}</p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="3">
              <v-card class="mx-auto" max-width="344" color="blue lighten-4">
                <v-card-text>
                  <div>Activated</div>
                  <p class="text-h4 text--primary">
                    {{ ReportItem.Activated }}
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card> -->

      <v-card height="100%">
        <v-card-text class="text-center">
          <v-row class="text-center">
            <v-col cols="12">
              <div id="chart">
                <apexchart
                  type="line"
                  height="350"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </div>
            </v-col>
            <v-col cols="12"
              >First, you need to create your own affiliate link</v-col
            >

            <v-col cols="12">
              <v-btn depressed color="primary" @click="GeneratedLinkBTN()">
                Create your Affiliate Link
              </v-btn>
            </v-col>
            <GenerateLinkDialog
              :data="approveData"
              :dialog="editDialog.dialog"
              @close="editDialog.dialog = !editDialog.dialog"
            ></GenerateLinkDialog>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import GenerateLinkDialog from "../dialogs/GenerateLink.vue";
import CardWidget from "../../components/CardWidget.vue";
export default {
  components: {
    GenerateLinkDialog,
    CardWidget,
  },
  data: () => ({
    loadingData: true,
    GenerateLinkDialog: { dialog: false },
    approveData: {},
    ReportItem: {
      NoURL: "",
      TTLClicks: "",
      SignUp: "",
      Activated: "",
    },
    GeneratedItem: {
      userid: "",
      socialMedia: "",
    },
    ReportReqItem: {
      userid: "",
    },
    SeriesItem: {
      name: "",
      type: "",
      data: [],
    },
    LineSeriesItem: {
      name: "",
      type: "",
      data: [],
    },
    Seriesdata: [],
    LineSeriesdata: [],
    editDialog: { dialog: false },
    series: [],
    chartOptions: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: [],
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Click Counts",
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + "";
            }
            return y;
          },
        },
      },
    },
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
      this.getReportList();
      this.TrxnCountList();
    },

    async getReportList() {
      var userid = localStorage.getItem("userid");
      this.ReportReqItem.userid = userid;
      //console.log(TToken);
      await this.$api
        .post("/Affiliate/Report", this.ReportReqItem, {})

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
    async TrxnCountList() {
      var userid = localStorage.getItem("userid");
      this.ReportReqItem.userid = userid;
      //console.log(TToken);
      await this.$api
        .post("/Affiliate/GetCount", this.ReportReqItem, {})

        .then((response) => {
          const newArr = response.data.data;
          console.log(newArr);
          for (let i = 0; i < newArr.length; i++) {
            this.Seriesdata.push(response.data.data[i].TCOUNT);
            this.LineSeriesdata.push(response.data.data[i].TCOUNT);

            this.chartOptions.labels.push(response.data.data[i].TDATE);
          }
          this.SeriesItem.name = "Clicks";
          this.SeriesItem.type = "column";
          this.SeriesItem.data = this.Seriesdata;

          this.LineSeriesItem.name = "SignUp";
          this.LineSeriesItem.type = "line";
          this.LineSeriesItem.data = this.LineSeriesdata;
          this.series.push(this.LineSeriesItem);
          this.series.push(this.SeriesItem);
          console.log(this.series);
          console.log(this.labels);
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