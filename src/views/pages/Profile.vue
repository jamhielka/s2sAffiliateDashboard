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
            <v-text-field
              type="text"
              class="form-control"
              placeholder="Enter your Last Name"
              v-model="editedItem.lastname"
            ></v-text-field>
            <v-text-field
              type="text"
              class="form-control"
              placeholder="Enter your First Name"
              v-model="editedItem.firstname"
            ></v-text-field>
            <v-text-field
              type="text"
              class="form-control"
              placeholder="Enter your Mobile Number"
              v-model="editedItem.msisdn"
            ></v-text-field>

            <v-text-field
              type="date"
              class="form-control"
              placeholder="Enter your Date of Birth"
              v-model="editedItem.dob"
            ></v-text-field>
            <v-text-field
              type="email"
              v-model="editedItem.email"
              label="Email e.g. 'example@gmail.com"
              filled
              background-color="transparent"
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
                label="Enter your Gender"
                required
              ></v-select>
            </div>
            <div class="mt-4">
              <v-select
                v-model="selectedRegion"
                :items="listCountry"
                item-text="name"
                item-value="name"
                label="Enter your region"
                @change="onChangeCountry()"
                required
                return-object
                single-line
              ></v-select>
            </div>
            <div class="mt-4">
              <v-select
                v-model="selectedProvince"
                :items="listState"
                item-text="name"
                item-value="name"
                label="Enter your Province"
                @change="onChangeState"
                return-object
                required
              ></v-select>
            </div>
            <div class="mt-4">
              <v-select
                v-model="editedItem.city"
                :items="listCities"
                item-text="name"
                item-value="name"
                label="Enter your City"
                required
              ></v-select>
            </div>
            <v-textarea
              type="text"
              class="form-control"
              placeholder="Enter your Address"
              v-model="editedItem.address"
            ></v-textarea>
            <v-btn
              class="text-capitalize mt-5 element-0"
              color="success"
              @click="save()"
              >Submit</v-btn
            >
          </v-card-text>
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
    dtext: "George deo",
    emailtext: "",
    password: "",
    disableinput: "",
    checkbox1: "",
    checkbox2: "",
    checkbox3: "",
    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match",
    },
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
      userid:""
    },
    GetRequest: {
      userid: "",
    },
    listCountry: [],
    listState: [],
    listCities: [],
    selectedRegion: null,
    selectedProvince: null,
  }),
  components: {},
  created() {
    this.initialize();
    this.loadCountry();
    this.loadProvinces();
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
          console.log(response.data.data[0]);
          this.editedItem = response.data.data[0];
          this.selectedRegion = this.editedItem.region;
          this.selectedProvince = this.editedItem.province;
       
          this.editedItem.dob = moment(this.editedItem.dob).format(
            "YYYY-MM-DD"
          );
          //this.editedItem.city = response.data.data.city;
          this.editedItem.userid = userid;
          let prov = this.selectedProvince;
          var valObj = this.listState.filter(function (elem) {
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
              this.listCities = res.data.data.cities;
              this.editedItem.province = this.prov.name;
            });
          //this.editedItem.city=this.editedItem.city;

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
        });
    },
    save() {
      // var TToken = localStorage.getItem("token");
           var userid = localStorage.getItem("userid");

 this.editedItem.region = this.selectedRegion;
      this.editedItem.province = this.selectedProvince;
     
 
      this.editedItem.userid=userid;
      this.$api
        .post("/Affiliate/UInfo", this.editedItem, {
          // headers: {
          //   Authorization: TToken,
          // },
        })
        .then((response) => {
          console.log(response);
          //this.$emit("obj", true);
          // this.loadingBtn = false;

          this.dialog = false;
          alert("User info is successfully saved");
        })
        .catch((e) => {
          console.log(e);
          //this.loadingBtn = false;
        });
    },
  },
};
</script>
