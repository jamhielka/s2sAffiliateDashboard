<template>
  <v-data-table
    :search="search"
    :headers="headers"
    :items="desserts"
    class="elevation-1"
    :sort-by="['dtCreated']"
    :sort-desc="[true]"
  
  >

  <template v-slot:[`item.NAME`]="slotData">
   <a @click="handleClick(slotData.item.id)">{{ slotData.item.NAME }}</a>

</template>

    <template v-slot:[`item.dtCreated`]="{ item }">
      <span>{{ new Date(item.dtCreated).toLocaleString("en-CA") }}</span>
    </template>
    <template v-slot:[`item.LINK`]="{ item }">
      <input
        type="label"
        
      
        readonly
        :value="item.LINK"
        style="width: 250px"
      />
   
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
    

            <v-btn    v-bind="attrs"
          v-on="on" icon color="red" @click="copy(item)" target="Copy">
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>

           
      </template>
      <span>Copy</span>
    </v-tooltip>
  
   
    </template>
 
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Affiliates</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        
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
           <AffiliateDialog
          :data="approveData"
          :dialog="editDialog.dialog"
          @close="editDialog.dialog = !editDialog.dialog"
        ></AffiliateDialog>
      </v-toolbar>
    </template>
    <!-- <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template> -->
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>

</template>
<script>
import AffiliateDialog from "../dialogs/AffiliateInfo.vue";
//import GenerateLinkDialog from "../dialogs/GenerateLink.vue";
export default {
  components: {
 AffiliateDialog,
  },
  data: () => ({
    
    editDialog: { dialog: false },
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
           //{ text: "Date/Time", value: "dtCreated" },
      {
        text: "Name",
        align: "start",

        value: "NAME",
      },
      {
        text: "City",
        align: "start",

        value: "city",
      },
      { text: "Total Clicks", value: "CLICKS" },
      { text: "Total Sign-Up", value: "SIGNUP" },
      { text: "Total Activation", value: "ACTIVATED" },
      { text: "Current Incentive", value: "Revenue" },
   
      // { text: "Actions", value: "actions" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      code: "",
    },
   
    GetRequest: {
      userid: "",
    },
    approveData: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
   
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
      this.GetRequest.userid = userid;
      await this.$api
        .post("/Admin/AdminAffiliate", this.GetRequest, {
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
      console.log("deleteItemConfirm " + this.editedItem._item);
      // this.desserts.splice(this.editedIndex, 1);
      this.$api
        .delete(
          "/admin/designations",
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
            this.initialize();
          })
          .catch((e) => {
            console.log(e);
            //this.loadingBtn = false;
          });
      }
      this.close();
    },
   
    copy(item) {
    //   console.log()
    // navigator.clipboard.writeText();
var text = item.LINK;
navigator.clipboard.writeText(text).then(function() {
  console.log('Async: Copying to clipboard was successful!');
}, function(err) {
  console.error('Async: Could not copy text: ', err);
});

    },
    handleClick(item) {
      this.approveData=item;
     this.editDialog.dialog = true;
  
    //alert("pak!"+ item)
    // or just do something with your current clicked row item data
   // console.log(item);
},
  },
};
</script>
