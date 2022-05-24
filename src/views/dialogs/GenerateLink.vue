<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Create Affiliate Link</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <!-- <label for="ID">Employee ID: {{ scheduleItem.employeeId }}</label><br/> -->
                <!-- <label for="Name">Employee Name: {{ scheduleItem.Name }}</label> -->
              </v-col>
              <v-col cols="12">
                <!-- <v-select
                  v-model="scheduleItem.socialMedia"
                  :items="listShift"
                  item-text="name"
                  item-value="code"
                  label="Select your  Social Media"
                  required
                ></v-select> -->
                <!-- <v-text-field
              type="text"
              class="form-control"
              placeholder="Enter name of link"
              v-model="scheduleItem.socialMedia"
                 required

                 
            ></v-text-field> -->

                <v-text-field
                
                  v-model="scheduleItem.socialMedia"
                  :rules="[() => !!scheduleItem.socialMedia || 'This field is required']"
                  label="Name"
                  placeholder="Name of Link"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close()">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="SchedItemConfirm()"
            >OK</v-btn
          >

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="GenerateLinkdialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h6">
          <p>
            Congratulation! You now have your own link to share to your friends.
          </p>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <label>Link:</label>
                <input
                  type="label"
                  v-on:focus="$event.target.select()"
                  ref="clone"
                  readonly
                  :value="generatedlink"
                  style="width: 250px"
                />

                <v-btn icon color="red" @click="copy">
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete()">Close</v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
//import moment from "moment";
//import axios from "axios";
//import moment from "moment";

export default {
  data: () => ({
    snackbar: false,
    text: "",
    textFieldProps: {
      prependIcon: "mdi-calendar-month-outline",
      rules: [(value) => !!value || "Required."],
    },
    timeProps: {
      useSeconds: true,
      ampmInTitle: true,
    },

    listShift: [],
    scheduleItem: {
      socialMedia: "",
      userid: "",
    },
    defaultItem: {
      name: "",
      code: "",
    },
    generatedlink: "",
    modalScheduleDate: false,
    _id: "",
    GenerateLinkdialog: false,
  }),
  props: ["data", "dialog"],

  watch: {
    dialog: function () {
      // console.log(this.$props.data["Employee Name"]
      // ,this.$props.data.employeeId);
      this.loadShift();
      this.scheduleItem.userid = this.$props.data.userid;
    },
  },

  methods: {
    loadShift() {
      // console.log(TToken);
      this.$api
        .post("/Affiliate/SocialMedia", {
          //   headers: {
          //     Authorization: TToken,
          //   },
        })

        .then((response) => {
          console.log(response);
          this.listShift = response.data.data;

          //this.table.loading = false;
        })
        .catch((e) => {
          //this.table.loading = false;
          console.log(e);
        });
    },

    close() {
      this.$emit("close", false);
    },
    SchedItemConfirm() {
      if (this.scheduleItem.socialMedia == "") {
        alert("Enter name of link");
      } else {
        var userid = localStorage.getItem("userid");
        this.scheduleItem.userid = userid;
        console.log("code", this.scheduleItem.socialMedia);
        this.$api
          .post("/Affiliate/GenerateLink", this.scheduleItem, {
            //   headers: {
            //     Authorization: TToken,
            //   },
          })

          .then((response) => {
            console.log(response.data.data[0].TrackingLink);
            this.generatedlink = response.data.data[0].TrackingLink;
            if (this.generatedlink == "") {
              // this.snackbar = true;
              // this.text = response.data.data[0].Message;
           alert(response.data.data[0].Message);
            } else {
              this.GenerateLinkdialog = true;
            }
          })
          .catch((e) => {
            //this.table.loading = false;
            console.log(e);
          });

        this.close();
      }
    },

    closeDelete() {
      this.GenerateLinkdialog = false;
      this.dialog = false;
    },
    copy() {
      this.$refs.clone.focus();
      document.execCommand("copy");
    },
  },
};
</script>