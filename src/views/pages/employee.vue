<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="desserts"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Employee</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-btn to="/addEmployee" color="primary" dark class="mb-2"
          >Add Employee</v-btn
        >
      
              <EditDialog :data="approveData"
              :dialog="editDialog.dialog"
                @close="editDialog.dialog = !editDialog.dialog"
              ></EditDialog>
          
      
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn x-small tile color="success" @click="editItem(item)">
        <v-icon left> mdi-pencil </v-icon>
        Edit
      </v-btn>
      <v-btn x-small tile color="warning" @click="deleteItem(item)">
        <v-icon left> mdi-delete </v-icon>
        Delete
      </v-btn>
     
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
//import moment from "moment";
import axios from "axios";
import EditDialog from "../dialogs/EditEmployee.vue";

export default {
  components: {
    EditDialog,
  },
  data: () => ({
        search: "",
    approveData: {},
    dialog: false,
    dialogDelete: false,
    dialogSchedule: false,
    editDialog:{dialog:false},
    headers: [
      {
        text: "Employee ID",
        align: "start",
        sortable: true,
        value: "employeeId",
      },
      {
        text: "firstName",
        align: "start",
        sortable: false,
        value: "firstName",
      },
      { text: "lastName", value: "lastName" },
      { text: "Date/Time", value: "createdDateTimeLabel" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    listShift: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      code: "",
    },
    scheduleItem: {
      employeeId: 0,
      shiftId: 0,
      date: "",
    },
    defaultItem: {
      name: "",
      code: "",
    },
    modalScheduleDate: false,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.getForMerchantList();
    },

    loadShift() {
      var TToken = localStorage.getItem("token");
      console.log(TToken);
      this.$api
        .get("/admin/shift", {
          headers: {
            Authorization: TToken,
          },
        })

        .then((response) => {
          console.log(response);
          this.listShift = response.data.data.shifts;

          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },
    async getForMerchantList() {
      // this.table.loading = true;
      var TToken = localStorage.getItem("token");
      //console.log(TToken);
      await this.$api
        .get("admin/employee", {
          headers: {
            Authorization: TToken,
          },
        })

        .then((response) => {
          //  console.log(response);
          const newArr = response.data.data.employee;
          this.desserts = newArr;
          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },
    editItem(item) {
      //this.$router.push({
      // name: 'Add Employee',
      // params: {
      //      editedItemX: Object.assign({}, item)
      //  }
      //});/
      // console.log(item);
 
      this.approveData = Object.assign({}, item);
console.log(this.approveData);
      this.editDialog.dialog = true;
    },
    SchedItemConfirm() {
      var TToken = localStorage.getItem("token");
      console.log("token", TToken);
      //this.scheduleItem.date=moment(this.scheduleItem.date).format("MM-DD-YYYY");
      console.log("log", this.scheduleItem.shiftId);
      console.log("log", this.scheduleItem.date);
      console.log("log", this.scheduleItem.employeeId);
      // this.scheduleItem.employeeId = ;
      // this.desserts.splice(this.editedIndex, 1);

      axios
        .post(
          "http://161.49.63.45:8085/api/admin/schedule",
          this.scheduleItem,
          {
            headers: {
              Authorization: `Bearer ${this.authToken}`,
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.dialogSchedule = false;
        });

      this.closeSched();
    },
    scheduleItemX(item) {
      //this.$router.push({
      // name: 'Add Employee',
      // params: {
      //      editedItemX: Object.assign({}, item)
      //  }
      //});/

      this.scheduleItem.employeeId = item._id;
      this.loadShift();
      //this.approveData= Object.assign({}, item);

      this.dialogSchedule = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      var TToken = localStorage.getItem("token");
      console.log("deleteItemConfirm " + this.editedItem._item);
      // this.desserts.splice(this.editedIndex, 1);
      this.$api
        .delete(
          "/admin/employee",
          {
            headers: {
              Authorization: TToken,
            },
          },
          this.editedItem
        )
        .then((response) => {
          console.log(response);
          this.$emit("obj", true);
          // this.loadingBtn = false;

          this.dialog = false;
          alert("employee is successfully deleted");
        })
        .catch((e) => {
          console.log(e);
          //this.loadingBtn = false;
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeSched() {
      this.dialogSchedule = false;
    },
    save() {
      var TToken = localStorage.getItem("token");
      if (this.editedIndex > -1) {
        this.$api
          .put("/admin/employee", this.editedItem, {
            headers: {
              Authorization: TToken,
            },
          })
          .then((response) => {
            console.log(response);
            this.$emit("obj", true);
            // this.loadingBtn = false;

            this.dialog = false;
            alert("employee is successfully edited");
          })
          .catch((e) => {
            console.log(e);
            //this.loadingBtn = false;
          });
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.$api
          .post("/admin/employee", this.editedItem, {
            headers: {
              Authorization: TToken,
            },
          })
          .then((response) => {
            console.log(response);
            this.$emit("obj", true);
            // this.loadingBtn = false;

            this.dialog = false;
            alert("employee is successfully created");
            this.initialize();
          })
          .catch((e) => {
            console.log(e);
            //this.loadingBtn = false;
          });
      }
       this.editDialog.dialog = false;
    },
  },
};
</script>