<template>
  <router-link :to="widgetLink" class="text-decoration-none">
    <v-card height="100%">
      <v-card-text class="text-center">
        <v-row>
          <v-col cols="4">
            <div class="my-2">
              <v-icon large color="blue darken-2">{{ icon }}</v-icon>
            </div>
          </v-col>
          <v-col cols="8 text-left pl-0">
            <h4
              class="mt-2 title blue-grey--text text--darken-2 font-weight-regular"
            >
              <span v-if="type === 'string'">{{ value }}</span>
              <span v-else> {{ formatNum(value) }}</span>
              <h6 class="subtitle-2 font-weight-light">
                {{ label }}
              </h6>
            </h4>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </router-link>
</template>

<script>
export default {
  props: {
    value: {
      // type: Number,
      default: 0,
    },
    label: {
      type: String,
    },
    icon: {
      type: String,
    },

    link: {
      default: "#",
      type: String,
    },

    type: {
      default: "number",
    },
  },

  methods: {
    formatNum(num = 0) {
      if (num > 0) {
        return num.toLocaleString();
      }
      return 0;
    },
  },

  computed: {
    widgetLink() {
      const role = this.$store.getters.userRole;
      let link = "#";
      if (this.$props.link != "#") {
        link = `/${role.toLowerCase()}/${this.$props.link}`;
      }

      return link;
    },
  },
};
</script>