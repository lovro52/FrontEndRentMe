<template>
  <v-app class="pozadina">
    <v-container fill-height fluid class="background">
      <v-row align="center" justify="center">
        <v-col align="center" justify="center" cols="12">
          <v-card class="card-border" width="600px" outlined>
            <v-card-title align="left">REGISTER</v-card-title>
            <v-card-subtitle align="left">
              Dear user, please register
            </v-card-subtitle>
            <v-card-text>
              <v-form v-model="valid">
                <v-text-field
                  v-model="username"
                  dense
                  label="Username"
                  clearable
                  type="text"
                  :rules="[rules.required]"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  dense
                  label="Email"
                  clearable
                  type="text"
                  :rules="[rules.required, rules.email]"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  dense
                  label="Password"
                  clearable
                  :append-icon="showIcon ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="showIcon ? 'text' : 'password'"
                  @click:append="showIcon = !showIcon"
                  outlined
                ></v-text-field>
                <v-select
                  v-model="role"
                  :items="['normal', 'company']"
                  label="Role"
                  :rules="[rules.required]"
                  outlined
                ></v-select>
                <div v-if="role === 'company'">
                  <v-text-field
                    v-model="companyName"
                    dense
                    label="Company Name"
                    clearable
                    type="text"
                    :rules="[rules.required]"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="companyLogo"
                    dense
                    label="Company Motto"
                    clearable
                    type="text"
                    :rules="[rules.required]"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="companyLocation"
                    dense
                    label="Company Location"
                    clearable
                    type="text"
                    :rules="[rules.required]"
                    outlined
                  ></v-text-field>
                </div>
              </v-form>
            </v-card-text>
            <v-card-actions class="card-actions">
              <v-btn
                class="btn-right-margin"
                @click="clearFormData"
                color="red darken-3"
                outlined
              >
                CLEAR
              </v-btn>
              <v-btn :disabled="!valid" outlined @click="registerUser">
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
        {{ snackbar.message }}
        <v-btn color="white" text @click="snackbar.show = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterView",
  data() {
    return {
      valid: false,
      username: "",
      email: "",
      password: "",
      role: "",
      companyName: "",
      companyLogo: "",
      companyLocation: "",
      showIcon: false,
      snackbar: {
        show: false,
        message: "",
        color: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
        min: (value) => value.length >= 6 || "Min 6 characters",
        email: (value) => {
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    clearFormData() {
      this.username = "";
      this.email = "";
      this.password = "";
      this.role = "";
      this.companyName = "";
      this.companyLogo = "";
      this.companyLocation = "";
    },
    registerUser() {
      const payload = {
        username: this.username,
        password: this.password,
        email: this.email,
        role: this.role,
        companyName: this.role === "company" ? this.companyName : null,
        companyLogo: this.role === "company" ? this.companyLogo : null,
        companyLocation: this.role === "company" ? this.companyLocation : null,
      };

      axios
        .post("http://localhost:5000/register", payload)
        .then((response) => {
          this.snackbar.message = "Registration successful!";
          this.snackbar.color = "success";
          this.snackbar.show = true;
          setTimeout(() => {
            this.$router.push("/login");
          }, 1000);
        })
        .catch((err) => {
          this.snackbar.message = "Registration failed. Please try again.";
          this.snackbar.color = "error";
          this.snackbar.show = true;
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.pozadina {
  background-color: #e7f6fc;
}
.card-border {
  padding: 2%;
}
.card-text-border {
  padding: 2.5%;
}
.card-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.btn-right-margin {
  margin-right: 2%;
}
</style>
