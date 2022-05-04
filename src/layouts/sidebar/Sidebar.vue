<template>
  <v-navigation-drawer
    v-model="Sidebar_drawer"
    :dark="SidebarColor !== 'white'"
    :color="SidebarColor"
    mobile-breakpoint="960"
    clipped
    :right="$vuetify.rtl"
    mini-variant-width="70"
    :expand-on-hover="expandOnHover"
    app
    id="main-sidebar"
  >
    <v-list dense nav>
      <!---USer Area -->
      <v-list-item two-line class="px-0">
        <!-- <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" />
        </v-list-item-avatar> -->
    

          <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ UsernameDisplay }}</v-list-item-title>
        </v-list-item-content>
        
      </v-list-item>
      <!---USer Area -->
      <!--REVENUE-->
      <v-list-item>
           <v-list-item-icon>
          <v-icon>mdi-currency-php</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Revenue</v-list-item-title>
           <v-list-item-content>{{ formatPrice(commission) }}</v-list-item-content>
           <v-list-item-action><v-btn
              x-small
              color="primary"
              dark @click="CashoutBTN()"
            >
             Cash-Out
            </v-btn></v-list-item-action>
             
        </v-list-item-content>
      </v-list-item>
           <!--REVENUE-->
           <hr/>
      <!---Sidebar Items -->
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        :active-class="`success white--text`"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!---Sidebar Items -->
    </v-list>
         <CashOutDialog
         
            :dialog="editDialog.dialog"
            @close="editDialog.dialog = !editDialog.dialog"
          ></CashOutDialog>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import CashOutDialog from "../../views/dialogs/CashOutDialog.vue";
//import CardWidget from "../../components/CardWidget.vue";
export default {
  name: "Sidebar",
  components: {
      CashOutDialog,
  },
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
        CashOutDialog: { dialog: false },
         editDialog: { dialog: false },
    loadingData: true,
    items: [
      {
        title: "Home",
        icon: "mdi-view-dashboard",
        to: "/admin",
      },

      {
        title: "Affiliate Link",
        icon: "mdi-table-column-width",
        to: "/trackinglink",
      },
      {
        title: "Cash-out Transaction",
        icon: "mdi-account-cash",
        to: "/cashout",
      },
      {
        title: "Profile",
        icon: "mdi-account-box",
        to: "/profile",
      },
    ],
    ReportReqItem: {
      userid: "",
    },
    commission: "",
  }),
  computed: {
    ...mapState({
      SidebarColor: (state) => state.SidebarDrawerModule.SidebarColor,
      SidebarBg: (state) => state.SidebarDrawerModule.SidebarBg,
    }),
    Sidebar_drawer: {
      get() {
        return this.$store.state.Sidebar_drawer;
      },
      set(val) {
        this.$store.commit("SET_SIDEBAR_DRAWER", val);
      },
    },
    UsernameDisplay() {
      return this.$store.getters.getUsername;
      // format/do something with date
    },
  },
  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.getReportList();
    },

    async getReportList() {
      var userid = localStorage.getItem("userid");
      this.ReportReqItem.userid = userid;
      //console.log(TToken);
      await this.$api
        .post("/Affiliate/UserCommision", this.ReportReqItem, {})

        .then((response) => {
          //  console.log(response);
          const newArr = response.data.data[0];
          this.commission = newArr.Commission;
          this.loadingData = false;
          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
  },  
     CashoutBTN() {

      this.editDialog.dialog = true;
    },
      formatPrice(value) {
        let val = (value/1);
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  },
};
</script>
<style lang="scss">
#main-sidebar {
  box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  .v-navigation-drawer__border {
    display: none;
  }
  .v-list {
    padding: 8px 15px;
  }
  .v-list-item {
    &__icon--text,
    &__icon:first-child {
      justify-content: center;
      text-align: center;
      width: 20px;
    }
  }
}
</style>
