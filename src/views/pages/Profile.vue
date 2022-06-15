<template>
  <v-container fluid class="down-top-padding">
    <v-row align="center">
      <!-- <v-col cols="12" lg="4">
        <v-card>
          <v-card-text class="text-center pa-7">
            <img
              src="https://randomuser.me/api/portraits/men/81.jpg"
              alt="user"
              width="150px"
              class="img-fluid rounded-circle shadow-sm"
            />
            <h4 class="mt-2 title blue-grey--text text--darken-2 font-weight-regular">Hanna Gover</h4>
            <h6 class="subtitle-2 font-weight-light">Accoubts Manager Amix corp</h6>
          </v-card-text>
        </v-card>
      </v-col> -->
      <v-col cols="12" lg="8" offset-lg="2" align="center">
        <v-card>
          <v-card-text>
            <h3
              class="title blue-grey--text text--darken-2 font-weight-regular"
            >
              Profile
            </h3>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
              <v-form ref="form" lazy-validation>
            <v-text-field
              type="text"
              class="form-control"
              label="Lastname"
              placeholder="Enter your Last Name"
              v-model="editedItem.lastname"
               :rules="rules.required"
            ></v-text-field>
            <v-text-field
              type="text"
              class="form-control"
              label="Firstname"
              placeholder="Enter your First Name"
              v-model="editedItem.firstname"
               :rules="rules.required"
            ></v-text-field>
            <v-text-field
              type="tel"
              class="form-control"
              label="Mobile Number"
              placeholder="+63915XXXXXXX"
              v-model="editedItem.msisdn"
              :rules="rules.mobileNumberRules"
               v-mask="'+639#########'"
                autocomplete="null"
          @keydown="catchZero($event)"
          @keyup="catchZero($event)"
          @copy.prevent
          @paste.prevent
          @click.right.prevent
          outlined
          masked="false"
            ></v-text-field>

            <v-text-field
              type="date"
              class="form-control"
              placeholder="Enter your Date of Birth"
              label="Date of Birth"
              v-model="editedItem.dob"
            ></v-text-field>
            <v-text-field
              type="email"
              v-model="editedItem.email"
              label="Email"
              filled
              background-color="transparent"
                :rules="rules.emailRules"
            ></v-text-field>
            <!-- <v-text-field
              v-model="password"
              filled
              background-color="transparent"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field> -->
            <!-- <v-textarea
              filled
              name="input-7-4"
              rows="3"
              label="Textarea"
              value
              background-color="transparent"
            ></v-textarea> -->
            <div class="mt-4">
              <v-select
                v-model="editedItem.gender"
                :items="['Male', 'Female']"
                label="Gender"
                   :rules="rules.required"
              ></v-select>
            </div>
            <div class="mt-4">
              <v-select
                v-model="selectedRegion"
                :items="listCountry"
                item-text="name"
                item-value="name"
                label="Region"
                @change="onChangeCountry()"
                 :rules="rules.required"
                return-object
              ></v-select>
            </div>
            <div class="mt-4">
              <v-select
                v-model="selectedProvince"
                :items="listState"
                item-text="name"
                item-value="name"
                label="Province"
                @change="onChangeState"
                return-object
                 :rules="rules.required"
              ></v-select>
            </div>
            <div class="mt-4">
              <v-select
                v-model="selectedCity"
                :items="listCities"
                item-text="name"
                item-value="name"
                label="City"
                :rules="rules.required"
              ></v-select>
            </div>
            <v-textarea
              type="text"
              class="form-control"
              placeholder="Enter your Address"
              label="Address"
              v-model="editedItem.address"
            ></v-textarea>
              </v-form>
           
          </v-card-text>
           <v-card-actions>
      <v-spacer></v-spacer>
    
      <v-btn
        class="text-white"
        @click="save()"
        :disabled="loading"
        color="primary"
        large
        rounded
        block
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "Profile",

  data: () => ({
     loading: false,
    dtext: "George deo",
    emailtext: "",
    password: "",
    disableinput: "",
    checkbox1: "",
    checkbox2: "",
    checkbox3: "",
    show1: false,
    // rules: {
    //   required: (value) => !!value || "Required.",
    //   min: (v) => v.length >= 8 || "Min 8 characters",
    //   emailMatch: () => "The email and password you entered don't match",
    // },
    items: ["London", "India", "America"],
    editedItem: {
      lastname: "",
      firstname: "",
      msisdn: "",
      dob: "",
      email: "",
      gender: "",
      region: "",
      province: "",
      city: "",
      address: "",
      userid: "",
    },
    GetRequest: {
      userid: "",
    },
    listCountry: [],
    listState: [],
    listCities: [],
    selectedRegion: null,
    selectedProvince: null,
    selectedCity: null,
     rules: {
        required: [(value) => !!value || "Required."],
        passwordRules: [
          (value) => !!value || "Required",
          (value) => (value && value.length >= 6) || "Minimum 6 characters",
          (value) =>
            (value && /[A-Z]{1}/.test(value)) || "At least one capital letter",
          (value) =>
            (value && /[^A-Za-z0-9]/.test(value)) ||
            "At least one special character",
          (value) => (value && /\d/.test(value)) || "At least one number",
        ],
        emailRules: [
          (v) => !!v || "Required",
          (v) =>
            /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              v
            ) || "E-mail must be valid",
        ],
        mobileNumberRules: [
          (value) => !!value || "Required",
          (value) => (value && value.length >= 13) || "Invalid mobile number",
        ],
      },
  }),
  components: {},

  created() {
    this.loadCountry();
    this.loadProvinces();

    setTimeout(() => {
        this.initialize();
    }, 1000);
  
  },

  methods: {
    initialize() {
      this.getAffiliateInfo();
      //var xregion = this.editedItem.region;
      var xprovince = this.editedItem.province;
      console.log(xprovince);
    },

    async getAffiliateInfo() {
      // this.table.loading = true;
      // var TToken = localStorage.getItem("token");
      var userid = localStorage.getItem("userid");
      this.GetRequest.userid = userid;
      await this.$api
        .post("/Affiliate/AgentInfo", this.GetRequest, {
          //   headers: {
          //     Authorization: TToken,
          //   },
        })

        .then((response) => {
          this.editedItem = response.data.data[0];
          this.selectedRegion = this.editedItem.region;
          this.selectedProvince = this.editedItem.province;
          this.selectedCity = this.editedItem.city;
          this.editedItem.dob = moment(this.editedItem.dob).format(
            "YYYY-MM-DD"
          );

          this.editedItem.userid = userid;
          let region = this.selectedRegion;
          var prov = this.selectedProvince;
          var valobjReg = this.listCountry.filter(function(elem) {
            if (elem.name == region) return elem._id;
          });

          axios
            .get(
              `http://52.220.32.14:10210/api/provinces?regionId=${valobjReg[0]._id}`,
              {
                //headers: {
                // Authorization: `Bearer ${this.authToken}`,
                // Accept: "application/json",
                //},
              }
            )
            .then((res) => {
              this.listState = res.data.data.provinces;

              // this.selectedRegion = this.selectedRegion.name;
            });
          setTimeout(() => {
            var valObj = this.listState.filter(function(elem) {
              if (elem.name == prov) return elem._id;
            });
            axios
              .get(
                `http://52.220.32.14:10210/api/cities?provinceId=${valObj[0]._id}`,
                {
                  //headers: {
                  //  Authorization: `Bearer ${this.authToken}`,
                  //   Accept: "application/json",
                  // },
                }
              )
              .then((res) => {
                // console.log(res.data.data.cities);
                this.listCities = res.data.data.cities;
                // this.editedItem.province = this.prov.name;
              });
          }, 1000);

          // this.editedItem.city=this.editedItem.city;

          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },

    loadCountry() {
      axios
        .get("http://52.220.32.14:10210/api/regions", {
          //headers: {
          // Authorization: `Bearer ${this.authToken}`,
          // Accept: "application/json",
          //},
        })
        .then((res) => {
          this.listCountry = res.data.data.regions;
          // console.log(this.listCountry);
          //console.log(this.listCountry);
        });
    },
    loadProvinces() {
      axios
        .get("http://52.220.32.14:10210/api/provinces", {
          //headers: {
          // Authorization: `Bearer ${this.authToken}`,
          // Accept: "application/json",
          //},
        })
        .then((res) => {
          this.listState = res.data.data.provinces;
          //console.log(this.listCountry);
        });
    },
    onChangeCountry() {
      console.log("Label: ", this.selectedRegion.name);
      console.log("Value: ", this.selectedRegion._id);

      axios
        .get(
          `http://52.220.32.14:10210/api/provinces?regionId=${this.selectedRegion._id}`,
          {
            //headers: {
            // Authorization: `Bearer ${this.authToken}`,
            // Accept: "application/json",
            //},
          }
        )
        .then((res) => {
          this.listState = res.data.data.provinces;
          this.selectedRegion = this.selectedRegion.name;
        });
    },

    onChangeState() {
      console.log("Label: ", this.selectedProvince.name);
      console.log("Value: ", this.selectedProvince._id);
      axios
        .get(
          `http://52.220.32.14:10210/api/cities?provinceId=${this.selectedProvince._id}`,
          {
            //headers: {
            //  Authorization: `Bearer ${this.authToken}`,
            //   Accept: "application/json",
            // },
          }
        )
        .then((res) => {
          this.listCities = res.data.data.cities;
          this.selectedProvince = this.selectedProvince.name;
          this.selectedCity = this.editedItem.city;
        });
    },
    save() {
      // var TToken = localStorage.getItem("token");
      var userid = localStorage.getItem("userid");

      this.editedItem.region = this.selectedRegion;
      this.editedItem.province = this.selectedProvince;
      this.editedItem.city = this.selectedCity;

      this.editedItem.userid = userid;
      this.$api
        .post("/Affiliate/UInfo", this.editedItem, {
          // headers: {
          //   Authorization: TToken,
          // },
        })
        .then((response) => {
          //console.log(response);
          //this.$emit("obj", true);
          // this.loadingBtn = false;

       

            if (response.data.data[0].status == 0) {
                 this.dialog = false;
          //alert("User info is successfully saved");
           this.$swal({
              title: "Thank you",
              text: response.data.data[0].Message,
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "OK",
              //cancelButtonText: "No, cancel it!"
            }).then(
              function () {
                 return false;
              },
              function () {
                return false;
              }
            );
            } else {
               this.$swal({
              title: "Oops!",
              text: response.data.data[0].Message,
              type: "warning",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "OK",
              //cancelButtonText: "No, cancel it!"
            }).then(
              function () {
                 return false;
              },
              function () {
                return false;
              }
            );
            }
        })
        .catch((e) => {
          console.log(e);
          //this.loadingBtn = false;
        });
    },
     catchZero(e) {
      if (e.target.value == "+63 0") {
        // return;
        // console.log("Adasd")
        this.form.pmsisdn = "";
      }
    },
    keydown: function(e) {
      console.log(e);
    },
  },
};
</script>
