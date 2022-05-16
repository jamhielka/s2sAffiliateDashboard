<template>
  <!-- <div> -->
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12 mt-10 mb-10">
        <v-img
          src="@/assets/s2s-affiliate-banner.png"
          aspect-ratio="1.9"
        ></v-img>

        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              label="First Name"
              type="text"
              v-model="form.pfirstname"
              :rules="rules.required"
            ></v-text-field>

            <v-text-field
              label="Last Name"
              type="text"
              v-model="form.plastname"
              :rules="rules.required"
            ></v-text-field>

            <v-text-field
              label="Email Address"
              type="email"
              v-model="form.pemail"
              :rules="rules.required"
            ></v-text-field>

            <v-text-field
              label="Mobile Number"
              placeholder="+63 915 XXXX XXX"
              v-model="form.pmsisdn"
              :rules="rules.required"
              v-mask="'+63 ### #### ###'"
              masked="false"
              type="tel"
            ></v-text-field>

            <v-select
              :items="gender"
              :rules="rules.required"
              v-model="form.pgender"
              label="Gender"
            >
            </v-select>

            <v-text-field
              label="Birthday"
              type="date"
              v-model="form.pdob"
              :rules="rules.required"
            ></v-text-field>

            <v-text-field
              id="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              v-model="form.ppassword"
              :rules="rules.required"
              @click:append="showPassword = !showPassword"
            ></v-text-field>

            <v-textarea
              label="Address"
              type="text"
              v-model="form.paddress"
              :rules="rules.required"
              :auto-grow="true"
              :rows="1"
            ></v-textarea>

            <v-select
              :items="location.regions"
              label="Region"
              item-text="name"
              @change="regionSelected($event)"
              :rules="rules.required"
              v-model="form.pregion"
              :disabled="location.regions < 1"
              return-object
            ></v-select>

            <v-select
              :items="location.provinces"
              label="Province"
              item-text="name"
              @change="provinceSelected($event)"
              :rules="rules.required"
              v-model="form.pprovince"
              :disabled="location.provinces < 1"
              return-object
            ></v-select>

            <v-select
              :items="location.cities"
              label="City"
              item-text="name"
              @change="citySelected($event)"
              :rules="rules.required"
              v-model="form.pcity"
              :disabled="location.cities < 1"
              return-object
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions class="pb-10">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="px-5"
            @click="submitForm"
            :disabled="loading"
          >
            <v-progress-circular
              v-if="loading"
              indeterminate
              class="mr-2"
            ></v-progress-circular>
            <span v-if="!loading">Submit</span>
            <span v-if="loading">Submitting</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  <!-- </v-content> -->
  <!-- </div> -->
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      loading: false,
      showPassword: false,
      form: {
        pfirstname: "",
        plastname: "",
        pmsisdn: "",
        paddress: "",
        pemail: "",
        pdob: "",
        pgender: "",
        ppassword: "",
        pregion: "",
        pprovince: "",
        pcity: "",
      },
      rules: {
        required: [(value) => !!value || "Required."],
      },

      gender: ["Male", "Female"],

      location: {
        regions: [],
        provinces: [],
        cities: [],
        barangay: [],
      },
    };
  },

  methods: {
    async submitForm() {
      if (!this.$refs.form.validate()) {
        return false;
      }

      this.loading = true;

      const form = this.form;
      form.pdob = moment(form.pdob).format("MM-DD-YYYY");
      form.pmsisdn = this.trimMobileNumber(form.pmsisdn);

      await this.$api
        .post("/Affiliate/SignUp", form)
        .then((response) => {
          const res = response.data;
          this.loading = false;
          if (res.status == 1) {
            this.$swal("Oops.", res.message, "error");
            return;
          }

          this.$swal("Thank you!", res.message, "success")
            .then(() => {
              // location.reload();
              this.$router.push("/login");
            })
            .catch((err) => {
              console.log(err);
            });

          // this.games = response.data;
          // this.latestGame = response.data.reverse();
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },

    async getLocation(base = "regions", params = "") {
      await this.$location
        .get(`${base}?${params}`)
        .then((response) => {
          const res = response.data.data;
          if (base === "regions") {
            this.location.regions = res.regions;
          }
          if (base === "provinces") {
            this.location.provinces = res.provinces;
          }
          if (base === "cities") {
            this.location.cities = res.cities;
          }
          if (base === "barangay") {
            this.location.barangay = res.baranggay;
          }
          // return (res);
        })
        .catch((e) => {
          console.log(e);
          this.loadingBtn = false;
        });
    },

    regionSelected(e) {
      this.getLocation("provinces", `regionId=${e._id}`);
      this.form.pregion = e.name;
      this.form.pprovince = "";
      this.form.pcity = "";
      // this.form.pbarangay = "";
    },

    provinceSelected(e) {
      // const provinceId = e.target ? e.target.selectedOptions[0].dataset.id : e;
      // this.getLocation("cities", `provinceId=${provinceId}`);
      this.getLocation("cities", `provinceId=${e._id}`);
      this.form.pprovince = e.name;

      this.form.pcity = "";
      // this.form.pbarangay = "";
    },

    citySelected(e) {
      console.log(e);
      this.form.pcity = e.name;
      // const cityId = e.target ? e.target.selectedOptions[0].dataset.id : e;
      // this.getLocation("barangay", `cityId=${cityId}`);
      // // this.form.city = ""
      // this.form.barangay = "";
    },

    trimMobileNumber(num) {
      return num.replace(/\s+/g, "").replace("+", "");
    },
  },

  created() {
    this.getLocation();
  },
};
</script>
