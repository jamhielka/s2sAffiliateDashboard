<template>
<div class="">
      <v-data-table 
      :headers="logHeaders" 
      :items="logRows"
     
      >
    
      </v-data-table>
</div>

</template>
<style>
.headcol {
    position:absolute; 
    width:30%; 
    left:0;
    background:#eee;   
    text-align: center !important;   
    padding-top: 10px !important;
 }
.fluid-table tr:first-child td {
   font-weight: bold;
   background:#fff !important;
}
.scrollsettings{
 margin-left: 30%;
 width:800px;
}
</style>
  <script>

export default {
  data() {
    return {
      logs: []
    };
  },
  computed: {
    logHeaders() {
      // tranforms the logs to find out which is the longest
      // row
      let logRecords = this.logs.map((log) => {
        let dtrTypes = [];
        log.dtr.forEach((d) => dtrTypes.push(d.type));
        return {
          employee_id: log.employee_id,
          dtrLength: log.dtr.length,
          dtrTypes: dtrTypes
        };
      });

      let records =logRecords.sort((a, b) => (a.dtrLength > b.dtrLength) ? 1 : -1);
      // find the longest record
      let longestRecord = records[records.length - 1];
      let headers = [];

      console.log("records: ", records[records.length - 1]);
      //construct the header row
      headers.push({
        text: "employee_id",
        value: "employee_id"
        
      });

      // inside object we can only store unique keys!!
      //index plays a crucial role in this as it changes
      // timein to be timein1. timein2 so on

      longestRecord.dtrTypes.forEach((type, index) =>
        headers.push({ text: type, value: type + "" + index})
      );
      console.log("headers", headers);
      return headers;
    },
    logRows() {
      let logR = this.logs.map((log) => {
        let dtrRecord = {};
        // construct the row accroding to headers
        // checkour
        log.dtr.forEach(
          (d, index) => (dtrRecord[d.type + "" + index] = d.time)
        );
        return Object.assign(
          {},
          { employee_id: log.employee_id, ...dtrRecord }
        );
      });
      console.log("rows", logR);
      return logR;
    }
  },
  methods: {
    getLogs() {
      return [
        {
          employee_id: "Jacklyn Genabe",
          dtr: [
            {
              type: "March 10, 2022",
              time: "8:00 am 5:30pm"
            },
            {
              type: "March 11, 2022",
              time: "5:00 pm"
            },
            {
              type: "March 12, 2022",
              time: "8:30 pm"
            },
            {
              type: "March 13, 2022",
              time: "8:45 pm"
            },
            {
              type: "March 14, 2022",
              time: "10:45 pm"
            },
             {
              type: "Working Hours",
              time: "16"
            },
            {
              type: "OT",
              time: "1"
            },
             {
              type: "Holiday",
              time: ""
            },
          ]
        },
        {
          employee_id: "Napoleon Patague",
          dtr: [
            {
              type: "March 10, 2022",
              time: "8:00 am 5:30pm"
            },
            {
              type: "March 11, 2022",
              time: "5:00 pm"
            },
            {
              type: "March 12, 2022",
              time: "8:30 pm"
            },
            {
              type: "March 13, 2022",
              time: "8:45 pm"
            },
            {
              type: "March 14, 2022",
              time: "10:45 pm"
            },
             {
              type: "Working Hours",
              time: "16"
            },
            {
              type: "OT",
              time: "1"
            },
             {
              type: "Holiday",
              time: ""
            },
          ]
        },
        {
          employee_id: "Ariel Aparte",
          dtr: [
           {
              type: "March 10, 2022",
              time: "8:00 am 5:30pm"
            },
            {
              type: "March 11, 2022",
              time: "5:00 pm"
            },
            {
              type: "March 12, 2022",
              time: "8:30 pm"
            },
            {
              type: "March 13, 2022",
              time: "8:45 pm"
            },
            {
              type: "March 14, 2022",
              time: "10:45 pm"
            },
             {
              type: "Working Hours",
              time: "16"
            },
            {
              type: "OT",
              time: "1"
            },
             {
              type: "Holiday",
              time: ""
            },
          ]
        }
      ];
    },
    initLogs() {
      this.logs = this.getLogs();
    }
  },
  created() {
    this.initLogs();
  }
};

  </script>
  