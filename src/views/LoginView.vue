<template>
  <v-app class="pozadina">
    <v-container fill-height fluid class="background">
      <v-row align="center" justify="center">
        <v-col align="center" justify="center" cols="12">
          <v-card class="card-border" width="600px" outlined>
            <v-card-title align="left">LOGIN</v-card-title>
            <v-card-subtitle align="left">
              Dear user, please login
            </v-card-subtitle>
            <v-card-text class="card-text-border">
              <v-form v-model="valid">
                <v-text-field
                  v-model="emailOrUsername"
                  dense
                  label="Email or Username"
                  clearable
                  type="text"
                  :rules="[rules.required]"
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
              </v-form>
              <v-btn @click="login" :disabled="!valid" outlined>OK</v-btn>
            </v-card-text>
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
  data() {
    return {
      valid: false,
      emailOrUsername: "",
      password: "",
      showIcon: false,
      snackbar: {
        show: false,
        message: "",
        color: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
        min: (value) => value.length >= 6 || "Min 6 characters",
      },
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:5000/login", {
          emailOrUsername: this.emailOrUsername,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          this.snackbar.message = "Login successful!";
          this.snackbar.color = "success";
          this.snackbar.show = true;
          setTimeout(() => {
            if (response.data.user.role === "company") {
              this.$router.push("/profile");
            } else {
              this.$router.push("/");
            }
            this.$emit("user-logged-in");
          }, 1000);
        })
        .catch((err) => {
          this.snackbar.message =
            "Login failed. Please check your credentials.";
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
