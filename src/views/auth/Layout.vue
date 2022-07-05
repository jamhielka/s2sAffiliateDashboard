<template>
  <!-- <div class="masthead"> -->
  <v-main fill-height class="bg py-15">
    <!-- <v-parallax src="../../assets/S2S_Affiliate_Program.png" height="100%"> -->
    <v-container fill-height>
      <v-row class="mb-6" no-gutters>
        <!-- <v-flex xs12 sm8 md4> -->
        <v-col md="8" v-if="!$vuetify.breakpoint.smAndDown" class="d-flex justify-center align-start">
          <div class="tagline">
            Join our affiliate program and earn ₱200.00 per successful referral
          </div>
        </v-col>

        <v-col md="4" sm="12">
          <router-view />
        </v-col>
      </v-row>
    </v-container>

    <!-- </v-parallax> -->
  </v-main>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { title: "Login", link: "/login" },
        { title: "Register", link: "/register" },
      ],
    };
  },

  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
};
</script>

<style scoped>
.vh-100 {
  height: 100vh !important;
}
</style>
<style>
.v-parallax__image-container {
  bottom: -170px !important;
}

.v-parallax {
  position: relative;
  overflow: hidden;
  z-index: 0;
  height: 100vh;
}

.bg {
  background: url("../../assets/S2S_Affiliate_Program.png") no-repeat center
    center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100%;
}
</style>
