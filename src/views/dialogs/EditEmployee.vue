<template>
<div>
    <v-dialog v-model="dialog" max-width="100%">
          <v-card>
            <v-card-title class="text-h5">Employee</v-card-title>
            <v-card-text>
               <form-wizard @onComplete="onComplete">
    <tab-content title="Personal Information" :selected="true">
      <v-col cols="3">
        <div class="form-group">
          <v-label for="employeeId">Employee ID</v-label>
          <v-text-field
            type="text"
            class="form-control"
            placeholder="Enter your employeeId"
            v-model="editedItem.employeeId"
          ></v-text-field>
        </div>
      </v-col>
      <v-row>
        <v-col cols="3">
          <div class="form-group">
            <v-label for="lastName">Last Name</v-label>
            <v-text-field
              type="text"
              class="form-control"
              placeholder="Enter your Last Name"
              v-model="editedItem.lastName"
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="form-group">
            <v-label for="firstName">First Name</v-label>
            <v-text-field
              type="text"
              class="form-control"
              placeholder="Enter your First Name"
              v-model="editedItem.firstName"
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="form-group">
            <v-label for="middleName">Middle Name</v-label>
            <v-text-field
              type="text"
              class="form-control"
              placeholder="Enter your Middle Initial"
              v-model="editedItem.middleName"
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="form-group">
            <v-label for="suffix">Suffix</v-label>
            <v-text-field
              type="text"
              class="form-control"
              placeholder="Enter your empSuffix"
              v-model="editedItem.suffix"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <div class="form-group">
            <v-label for="birthday">Date of Birth</v-label>
            <v-menu
              v-model="modalbirthday"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="editedItem.birthday"
                  label="Enter your Date of Birth"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="editedItem.birthday"
                @input="modalbirthday = false"
              ></v-date-picker>
            </v-menu>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="form-group">
            <v-label for="placeOfBirth">Place of Birth</v-label>
            <v-text-field
              type="text"
              class="form-control"
              placeholder="Enter your Place of Birth"
              v-model="editedItem.placeOfBirth"
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="form-group">
            <v-label for="gender">Gender</v-label>
            <v-select
              v-model="editedItem.gender"
              :items="['MALE', 'FEMALE']"
              label="Enter your Gender"
              required
            ></v-select>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="form-group">
            <v-label for="civilStatus">Civil Status</v-label>
            <v-select
              v-model="editedItem.civilStatus"
              :items="['MARRIED', 'SINGLE', 'WIDOW', 'SEPARATED']"
              label="Enter your Civil Status"
              required
            ></v-select>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="form-group">
            <v-label for="citizenship">Citizenship</v-label>
            <v-select
              v-model="editedItem.citizenship"
              :items="['FILIPINO']"
              label="Enter your Citizenship"
              required
            ></v-select>
          </div>
        </v-col>
      </v-row>
    </tab-content>
    <tab-content title="Contact Details">
      <div class="form-group">
        <v-row>
          <v-col cols="6">
            <div class="form-group">
              <v-label for="mobileNumber">mobile</v-label>
              <v-text-field
                type="text"
                class="form-control"
                placeholder="Enter your mobile"
                v-model="editedItem.mobileNumber"
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="form-group">
              <v-label for="emailAddress">Email</v-label>
              <v-text-field
                type="text"
                class="form-control"
                placeholder="Enter your Email"
                v-model="editedItem.emailAddress"
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="form-group">
              <v-label for="name">Emergency Contact Name</v-label>
              <v-text-field
                type="text"
                class="form-control"
                placeholder="Enter Emergency Contact Name"
                v-model="editedItem.emergencyContactDetails.name"
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="form-group">
              <v-label for="ecdPhone">Emergency Phone/Mobile</v-label>
              <v-text-field
                type="text"
                class="form-control"
                placeholder="Enter your Emergency  Phone/Mobile"
                v-model="editedItem.emergencyContactDetails.mobileNumber"
              ></v-text-field>
            </div>
          </v-col>

          <v-col cols="4">
            <div class="form-group">
              <v-label for="region">Region</v-label>
              <v-select
                v-model="selectedRegion"
                :items="listCountry"
                item-text="name"
                item-value="_id"
                label="Enter your region"
                @change="onChangeCountry()"
                required
                return-object
                single-line
              ></v-select>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="form-group">
              <v-label for="Province">Province</v-label>
              <v-select
                v-model="selectedProvince"
                :items="listState"
                item-text="name"
                item-value="_id"
                label="Enter your Province"
                @change="onChangeState"
                return-object
                required
              ></v-select>
            </div>
          </v-col>

          <v-col cols="4">
            <div class="form-group">
              <v-label for="City">City</v-label>
              <v-select
                v-model="editedItem.city"
                :items="listCities"
                item-text="name"
                item-value="name"
                label="Enter your City"
                required
              ></v-select>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="form-group">
              <v-label for="Address">Address</v-label>
              <v-textarea
                type="text"
                class="form-control"
                placeholder="Enter your Address"
                v-model="editedItem.address"
              ></v-textarea>
            </div>
          </v-col>
        </v-row>
      </div>
    </tab-content>

    <tab-content title="Gov. ID">
      <div class="form-group">
        <v-row>
          <v-col cols="3">
            <div class="form-group">
              <v-label for="govTin">TIN ID</v-label>
              <v-text-field
                type="text"
                class="form-control"
                placeholder="Enter your TIN ID"
                v-model="editedItem.governmentId.tin"
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="form-group">
              <v-label for="govSSS">SSS ID</v-label>
              <v-text-field
                type="text"
                class="form-control"
                placeholder="Enter your SSS ID"
                v-model="editedItem.governmentId.sss"
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="form-group">
              <v-label for="govPhilhealth">Philhealth ID</v-label>
              <v-text-field
                type="text"
                class="form-control"
                placeholder="Enter your Philhealth ID"
                v-model="editedItem.governmentId.philhealth"
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="form-group">
              <v-label for="govPagIbig">PagIbig ID</v-label>
              <v-text-field
                type="text"
                class="form-control"
                placeholder="Enter your PagIbig ID"
                v-model="editedItem.governmentId.pagibig"
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
      </div>
    </tab-content>
    <tab-content title="Job Information">
      <div class="form-group">
        <v-row>
          <v-col cols="3">
            <div class="form-group">
              <v-label for="Designations">Designations</v-label>
              <v-select
                v-model="editedItem.jobInformation.designationId"
                :items="listDesignations"
                item-text="name"
                item-value="_id"
                label="Enter your Designations"
                required
              ></v-select>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="form-group">
              <v-label for="department">Department</v-label>

              <v-select
                v-model="editedItem.jobInformation.departmentId"
                :items="listDepartments"
                item-text="name"
                item-value="_id"
                label="Enter your Department"
                required
              ></v-select>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="form-group">
              <v-label for="dateOfJoining">Date of Joining</v-label>
              <v-menu
                v-model="modaldateOfJoining"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="editedItem.jobInformation.startDate"
                    label="Enter your Date of Joining"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editedItem.jobInformation.startDate"
                  @input="modaldateOfJoining = false"
                ></v-date-picker>
              </v-menu>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="form-group">
              <v-label for="govPagIbig">Date Of Regularization</v-label>
              <v-menu
                v-model="modalregularizationDate"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="editedItem.jobInformation.regularizationDate"
                    label="Enter your Date of Regularization"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editedItem.jobInformation.regularizationDate"
                  @input="modalregularizationDate = false"
                ></v-date-picker>
              </v-menu>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="form-group">
              <v-label for="empStatus">Status</v-label>

              <v-select
                v-model="editedItem.jobInformation.jobStatusId"
                :items="listStatus"
                item-text="name"
                item-value="_id"
                label="Enter your Status"
                required
              ></v-select>
            </div>
          </v-col>
        </v-row>
      </div>
    </tab-content>
    <tab-content title="Bank Details">
      <div class="form-group">
        <v-row>
          <v-col cols="12" md="4" sm="6">
            <div class="form-group">
              <v-label for="bankname">Bankname</v-label>
              <v-text-field
                type="text"
                class="form-control"
                placeholder="Enter your Bankname"
                v-model="editedItem.bankDetails.name"
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <div class="form-group">
              <v-label for="accountName">Account Name</v-label>
              <v-text-field
                type="text"
                class="form-control"
                placeholder="Enter your Account Name"
                v-model="editedItem.bankDetails.accountName"
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <div class="form-group">
              <v-label for="accountNo">Account No</v-label>
              <v-text-field
                type="text"
                class="form-control"
                placeholder="Enter your Account No"
                v-model="editedItem.bankDetails.accountNumber"
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
      </div>
    </tab-content>
    <tab-content title="Employment History">
      <div class="form-group">
        <v-row>
          <v-col cols="4">
            <div class="form-group">
              <v-label for="prevEmployer"> Employer Name</v-label>
              <v-text-field
                type="text"
                class="form-control"
                placeholder="Enter your  Employer Name"
                v-model="editedItem.employmentHistory.name"
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="form-group">
              <v-label for="prevEmployerAddress"> Employer Address</v-label>
              <v-text-field
                type="text"
                class="form-control"
                placeholder="Enter your  Employer Address"
                v-model="editedItem.employmentHistory.address"
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="form-group">
              <v-label for="prevEmployerTin"> Employer Tin</v-label>
              <v-text-field
                type="text"
                class="form-control"
                placeholder="Enter your  Employer Tin"
                v-model="editedItem.employmentHistory.tin"
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="form-group">
              <v-label for="prevLastDateEmployement">
                Last Date Employement</v-label
              >

              <v-menu
                v-model="modalElastDate"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="editedItem.employmentHistory.lastDate"
                    label="Enter your Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editedItem.employmentHistory.lastDate"
                  @input="modalElastDate = false"
                ></v-date-picker>
              </v-menu>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="form-group">
              <v-label for="prevEmpStatus"> Status</v-label>

              <v-select
                v-model="editedItem.employmentHistory.employentStatus"
                :items="listStatus"
                item-text="name"
                item-value="_id"
                label="Enter your  Status"
                required
              ></v-select>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="form-group">
              <v-label for="prevDateSeparated"> Date Separated</v-label>
              <v-menu
                v-model="modalprevDateSeparated"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="editedItem.employmentHistory.dateSeparated"
                    label="Enter your Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editedItem.employmentHistory.dateSeparated"
                  @input="modalprevDateSeparated = false"
                ></v-date-picker>
              </v-menu>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="form-group">
              <v-label for="Notes">Notes</v-label>
              <v-text-field
                type="text"
                class="form-control"
                placeholder="Enter your Notes"
                v-model="editedItem.employmentHistory.notes"
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
      </div>
    </tab-content>
  </form-wizard>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close()">Close</v-btn>

              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
</div>


</template>

<script>
import axios from "axios";
import { FormWizard, TabContent } from "vue-step-wizard";
import "vue-step-wizard/dist/vue-step-wizard.css";

export default {
  name: "BasicStepperForm",

  components: {
    FormWizard,
    TabContent,
    // AddressDDL,
  },
  data() {
    return {
      editedItem: {
        _id: "",
        employeeId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        address: "",
        region: "",
        city: "",
        barangay: "",
        province: "",
        mobileNumber: "",
        birthday: "",
        placeOfBirth: "",
        gender: "",
        civilStatus: "",
        citizenship: "",
        phoneNumber: "",
        emailAddress: "",
        emergencyContactDetails: {
          name: "",
          mobileNumber: "",
        },
        governmentId: {
          tin: "",
          sss: "",
          philhealth: "",
          pagibig: "",
        },
        jobInformation: {
          designationId: "",
          departmentId: "",
          startDate: "",
          regularizationDate: "",
          jobStatusId: "",
        },
        bankDetails: {
          name: "",
          accountName: "",
          accountNumber: "",
        },
        employmentHistory: {
          name: "",
          address: "",
          tin: "",
          lastDate: "",
          employentStatus: "",
          dateSeparated: "",
          notes: "",
        },
      },
      listCountry: [],
      listState: [],
      listCities: [],
      listDepartments: [],
      listDesignations: [],
      listStatus: [],
      date: null,
      modalbirthday: false,
      modaldateOfJoining: false,
      modalregularizationDate: false,
      modalElastDate: false,
      modalprevDateSeparated: false,
      selectedRegion: null,
      selectedProvince: null,
    };
  },
  props: ["data", "dialog"],

  created() {
    this.loadCountry();
    this.loadProvinces()
    this.loadDesignation();
    this.loadDepartment();
    this.loadStatus();
  },

  watch: {
    dialog: function () {
      console.log(this.$props.data);
      var xregion = this.$props.data.region;
      var xprovince = this.$props.data.province;
  
      var valObj = this.listCountry.filter(function (elem) {
        if (elem.name == xregion) return elem._id;
      });

      if (valObj.length > 0) this.selectedRegion = valObj[0]._id;
    console.log(xregion + "|" + valObj[0]._id);
 
      this.onChangeCountry();
 
      var valObjProv = this.listState.filter(function (Xelem) {
        if (Xelem.name == xprovince) return Xelem._id;
      });
      if (valObjProv.length > 0) this.selectedProvince = valObjProv[0]._id;
 console.log(valObjProv);
      console.log(xprovince + "|" + valObjProv[0]._id);

      axios
        .get(
          `http://52.220.32.14:10210/api/cities?provinceId=${valObjProv[0]._id}`,
          {
            //headers: {
            //  Authorization: `Bearer ${this.authToken}`,
            //   Accept: "application/json",
            // },
          }
        )
        .then((res) => {
          this.listCities = res.data.data.cities;
          this.editedItem.province = this.selectedProvince.name;
        });

      //this.editedItem.employeeId=this.$props.data.employeeId;
      setTimeout(() => {
        const currentData = this.$props.data;

        const form = this.editedItem;

        Object.keys(form)
          .filter((key) => key in currentData)
          .forEach((key) => {
            form[key] = currentData[key];
          });
      }, 500);
    },
  },
  methods: {
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
    console.log("Label: ", this.selectedRegion.name)
      console.log("Value: ", this.selectedRegion._id)   
    
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
          this.editedItem.region = this.selectedRegion.name;
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
          this.editedItem.province = this.selectedProvince.name;
        });
    },
    loadDesignation() {
      var TToken = localStorage.getItem("token");

      this.$api
        .get("admin/designations", {
          headers: {
            Authorization: TToken,
          },
        })

        .then((response) => {
          this.listDesignations = response.data.data.designations;

          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },
    loadDepartment() {
      var TToken = localStorage.getItem("token");

      this.$api
        .get("admin/departments", {
          headers: {
            Authorization: TToken,
          },
        })

        .then((response) => {
          this.listDepartments = response.data.data.departments;

          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },
    loadStatus() {
      var TToken = localStorage.getItem("token");

      this.$api
        .get("/admin/job-status", {
          headers: {
            Authorization: TToken,
          },
        })

        .then((response) => {
          this.listStatus = response.data.data.jobStatuses;

          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },
    onComplete() {
      var TToken = localStorage.getItem("token");
      console.log(JSON.stringify(this.editedItem));

      this.$api
        .put("/admin/employee", this.editedItem, {
          headers: {
            Authorization: TToken,
          },
        })
        .then((response) => {
          console.log(response);
          alert("Employee is successfully updated");
          this.$router.push({ path: "/employee" });
        })
        .catch((e) => {
          console.log(e);
          //this.loadingBtn = false;
        });
    },
     close() {
      this.$emit("close", false);
    
    },
  },
};
</script>
<style>
.vue-step-wizard {
  background-color: #f7f8fc;
  width: 100% !important;
  margin: auto;
  padding: 40px;
}
.tabLabel {
  font-size: smaller !important;
}
</style>