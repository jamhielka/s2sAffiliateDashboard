<template>
  <div class="admin-schedule">
    <!-- <v-card-title>
      Employee Scheduling
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-simple-table  :search="search">
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee._id">
            <td>{{ employee.fullName }}</td>
            <td
              @click="SetSchedule(employee)"
              v-for="schedule in employee.schedules"
              :key="schedule.scheduleDate"
            >
              <span v-if="schedule.hasSchedule">{{ schedule.timeLabel }} </span>
            </td>
            <td>{{ employee.summary.workingHours }}</td>
            <td>{{ employee.summary.ot }}</td>
            <td>{{ employee.summary.holiday }}</td>
            <td>{{ employee.summary.leave }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table> -->

    <v-card>
      <v-card-title>
        Scheduling
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-btn color="primary" class="ml-auto">
          <download-csv :data="exportData" :name="`${fileName}.csv`">
            <v-icon dense>mdi-download</v-icon>
            Export
          </download-csv>
        </v-btn>
      </v-card-title>
      <v-data-table
        @click:row="SetSchedule"
        item-key="name"
        single-select
        :headers="headers"
        :items="desserts"
        :search="search"
      >
        <!-- <template slot-scope="props">
        <tr>
          <th>          
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="freezeheader"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
       <template slot="items" slot-scope="props">
        <tr>         
          <td class="text-xs-left headcol">{{ props.item["Employee Name"] }}</td>
          
        </tr>
      </template> -->
      </v-data-table>
    </v-card>

    <ScheduleDialog
      :data="scheduledData"
      :dialog="scheduleDialog.dialog"
      @close="scheduleDialog.dialog = !scheduleDialog.dialog"
      @SchedItemConfirm="SchedItemConfirm()"
    ></ScheduleDialog>
  </div>
</template>

<style scoped>
table > tr > td:nth-child(1),
table > thead > tr > th:nth-child(1) {
  position: sticky !important;
  position: -webkit-sticky !important;
  left: 0 !important;
  z-index: 1 !important;
  background: white !important;
}
table > thead > tr > th:nth-child(1) {
  z-index: 1 !important;
}
table > tbody > tr > td:nth-child(1) {
  border-right: 1px solid rgb(12, 1, 1) !important;
}
table > thead > tr > th:nth-child(1) {
  border-right: 1px solid rgb(12, 1, 1) !important;
}
.headcol {
  position: absolute;
  width: 30%;
  left: 0;
  background: #eee;
  text-align: center !important;
  padding-top: 10px !important;
}
.fluid-table tr:first-child td {
  font-weight: bold;
  background: #fff !important;
}
.scrollsettings {
  margin-left: 30%;
  width: 800px;
}
</style>
<script>
//import axios from "axios";
import moment from "moment";
import ScheduleDialog from "../dialogs/scheduling.vue";
export default {
  components: {
    ScheduleDialog,
  },
  data: () => ({
    search: "",
    employees: [],
    scheduledData: {},
    scheduleDialog: { dialog: false },
    headers: [],
    desserts: [],
    exportData: [],
    fileName: "",
  }),
  created() {
    this.getEvents();
  },
  methods: {
    getEvents() {
      //API

      var TToken = localStorage.getItem("token");
      ///console.log(TToken);
      this.$api
        .get("admin/schedule", {
          headers: {
            Authorization: TToken,
          },
        })

        .then((response) => {
          console.log("data", response.data);
          //this.employees = response.data.data.employees;
          const newEmployees = response.data.data.employees;
          const newHeaders = response.data.data.headers;

          var obj = {};
          //HEADERS TABLE
          for (var y = 0; y < newHeaders.length; y++) {
            this.tmp = {
              text: newHeaders[y],
              value: newHeaders[y],
            };
            this.headers.push(this.tmp);
          }
          //HEADERS TABLE
          for (var i = 0; i < newEmployees.length; i++) {
            const newSchedules = newEmployees[i].schedules;
            this.tmp2 = {
              employeeId: newEmployees[i].employeeId,
              "Employee Name": newEmployees[i].fullName,
            };

            for (var x = 0; x < newSchedules.length; x++) {
              obj["Working Hours"] = newEmployees[i].summary.workingHours;
              obj["OT"] = newEmployees[i].summary.ot;
              obj["Holiday"] = newEmployees[i].summary.holiday;
              obj["Leave"] = newEmployees[i].summary.leave;
              obj[
                moment(newSchedules[x]["scheduleDateLabel"]).format(
                  "MM-DD-YYYY"
                )
              ] = newSchedules[x]["timeLabel"];
            }

            //  }
            const merged = Object.assign({}, this.tmp2, obj);
            //console.log(merged);
            this.desserts.push(merged);
          }
          this.exportData = this.desserts;
          this.fileName = `Sheduling_${moment(moment().toDate()).format(
            "MMM_DD_YYYY"
          )}`;
          console.log(this.desserts);
          // console.log(this.headers);
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    SetSchedule(item) {
      //console.log("Schedule" + item.employeeId);
      this.scheduledData = Object.assign({}, item);

      this.scheduleDialog.dialog = true;
    },
  },
};
</script>
