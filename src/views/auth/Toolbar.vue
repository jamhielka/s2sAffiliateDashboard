<template>
  <v-app>
    <v-app-bar color="primary" dark fixed app>
      <v-toolbar-title>S2S Affiliate</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <template v-for="(menu, i) in menus">
          <v-btn text exact :to="menu.link" :key="i">
            <span class="mr-2">{{ menu.title }}</span>
          </v-btn>
        </template>
        <!-- <v-btn text to="create">
          <span class="mr-2">Create Post</span>
        </v-btn>
        <v-btn text to="/">
          <span class="mr-2">All Posts</span>
        </v-btn> -->
      </v-toolbar-items>

      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" v-show="isMobile">
            <v-icon>mdi-dots-vertical </v-icon>
          </v-btn>
        </template>

        <v-list>
          <template v-for="(menu, i) in menus">
            <v-list-item :to="menu.link" :key="i">
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid fill-height>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
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
