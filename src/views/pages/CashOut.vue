<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="desserts"
   
    class="elevation-1"
      :sort-by="['dtCreated']"
    :sort-desc="[ true]"
  >
  
      <template v-slot:[`item.dtCreated`]="{ item }">
    <span>{{new Date(item.dtCreated).toLocaleString('en-CA')}}</span>
  </template>


      <!-- <template v-slot:[`item.amount`]="{ item }">

    <span v-if="item.amount != 0|| ''">{{item.amount.toFixed(2)}}</span>
  </template> -->
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Payout</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
          <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

         <v-btn color="primary" dark class="mb-2"   @click="GeneratedLinkBTN()">
              Cash-out
            </v-btn>

              <GenerateLinkDialog
         
            :dialog="editDialog.dialog"
            @close="editDialog.dialog = !editDialog.dialog"
          ></GenerateLinkDialog>
        <!-- <v-dialog v-model="dialog" max-width="500px">
          <template >
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"  @click="GeneratedLinkBTN()">
              Add Link
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
        </v-dialog> -->
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
import GenerateLinkDialog from "../dialogs/CashOutDialog.vue";
export default {
          components: {
    GenerateLinkDialog,
  },
  data: () => ({
        GenerateLinkDialog: { dialog: false },
         editDialog: { dialog: false },
        search: "",
   dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Cash out Request Date",
        align: "start",
        sortable: true,
        value: "dtCreated",
      },
      {
        text: "Amount",
        align: "start",
        sortable: false,
        value: "amount",
      },
      { text: "Account Name", value: "acctName" },
        { text: "Account NUmber", value: "acctNumber" },
          { text: "Payment Type", value: "paymentType" },
      { text: "is Approved", value: "isApproved" },
       { text: "Approved By", value: "ApprovedBy" },
        { text: "Date Approved", value: "dtApproved" },
              { text: "Reference No", value: "ReferenceNo" },
      //{ text: "Actions", value: "actions", sortable: false },
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
     GetRequest: {
    
      userid: "",
      
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
     // var TToken = localStorage.getItem("token");
     var userid = localStorage.getItem("userid");
        this.GetRequest.userid=userid;
      await this.$api
        .post("/Affiliate/PayoutTrxn",this.GetRequest,  {
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
        .delete("/admin/designations", {
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
          alert("Designations is successfully deleted");
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
          .put("/admin/designations", this.editedItem, {
            headers: {
              Authorization: TToken,
            },
          })
          .then((response) => {
            console.log(response);
            this.$emit("obj", true);
            // this.loadingBtn = false;

            this.dialog = false;
            alert("Designations is successfully edited");
          })
          .catch((e) => {
            console.log(e);
            //this.loadingBtn = false;
          });
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.$api
          .post("/admin/designations", this.editedItem, {
            headers: {
              Authorization: TToken,
            },
          })
          .then((response) => {
            console.log(response);
            this.$emit("obj", true);
            // this.loadingBtn = false;

            this.dialog = false;
            alert("Designations is successfully created");
            this.initialize()
          })
          .catch((e) => {
            console.log(e);
            //this.loadingBtn = false;
          });
      }
      this.close();
    },
    GeneratedLinkBTN() {

      this.editDialog.dialog = true;
    },
  },
};
</script>