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
        <v-toolbar-title>Job Status</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
             <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" >
                    <v-text-field
                      v-model="editedItem.code"
                      label="Code"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
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
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
      search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Status ID",
        align: "start",
        sortable: true,
        value: "_id",
      },
      {
        text: "Status Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Code", value: "code" },
      { text: "Date/Time", value: "createdDateTimeLabel" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
    
      name: "",
      code: "",
    },
    defaultItem: {
    
      name: "",
      code: "",
    },
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
    async getForMerchantList() {
      // this.table.loading = true;
      var TToken = localStorage.getItem("token");
      console.log(TToken);
      await this.$api
        .get("/admin/job-status", {
          headers: {
            Authorization: TToken,
          },
        })

        .then((response) => {
          console.log(response);
          const newArr = response.data.data.jobStatuses;
          this.desserts = newArr;
          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },
    editItem(item) {
     
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialog = true;
    },

    deleteItem(item) {
    
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      var TToken = localStorage.getItem("token");
   console.log("deleteItemConfirm "+ this.editedItem._item);
      // this.desserts.splice(this.editedIndex, 1);
      this.$api
        .delete("/admin/job-status", {
          headers: {
            Authorization: TToken,
          }},
          this.editedItem
        )
        .then((response) => {
          console.log(response);
          this.$emit("obj", true);
          // this.loadingBtn = false;

          this.dialog = false;
          alert("Job status is successfully deleted");
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

    save() {
      var TToken = localStorage.getItem("token");
      if (this.editedIndex > -1) {
        this.$api
          .put("/admin/job-status", this.editedItem, {
            headers: {
              Authorization: TToken,
            },
          })
          .then((response) => {
            console.log(response);
            this.$emit("obj", true);
            // this.loadingBtn = false;

            this.dialog = false;
            alert("Job status is successfully edited");
          })
          .catch((e) => {
            console.log(e);
            //this.loadingBtn = false;
          });
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.$api
          .post("/admin/job-status", this.editedItem, {
            headers: {
              Authorization: TToken,
            },
          })
          .then((response) => {
            console.log(response);
            this.$emit("obj", true);
            // this.loadingBtn = false;

            this.dialog = false;
            alert("Job status is successfully created");
            this.initialize()
          })
          .catch((e) => {
            console.log(e);
            //this.loadingBtn = false;
          });
      }
      this.close();
    },
  },
};
</script>