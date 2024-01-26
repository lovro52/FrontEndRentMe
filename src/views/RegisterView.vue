<template>
  <v-app class="pozadina">
    <v-container fill-height fluid class="background">
      <v-row align="center" justify="center">
        <v-col align="center" justify="center" cols="12">
          <v-card class="card-border" width="600px" outlined>
            <v-card-title align="left">REGISTER</v-card-title>
            <v-card-subtitle align="left">
              Deer user, plz register
            </v-card-subtitle>
            <v-card-text>
              <v-form v-model="valid">
                <v-text-field
                  v-model="firstName"
                  dense
                  label="Name"
                  clearble
                  type="text"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="lastName"
                  dense
                  label="Last Name"
                  clearble
                  type="text"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  dense
                  label="Email"
                  clearble
                  type="text"
                  :rules="[rules.required, rules.email]"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  dense
                  label="Password"
                  clearble
                  :append-icon="showIcon ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="showIcon ? 'text' : 'password'"
                  outlined
                ></v-text-field>
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
              <v-btn
                :disabled="isButtonDisabled"
                outlined
                @click="registerUser"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "RegisterView",
  components: {},
  watch: {
    valid: function (isValid) {
      this.isButtonDisabled = isValid != true;
    },
  },
  data() {
    return {
      isButtonDisabled: false,
      valid: true,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      showIcon: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v?.length >= 6 || "Min 6 characters",
        email: (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      },
    };
  },
  methods: {
    clearFormData() {
      this.firstName = null;
      this.lastName = null;
      this.email = null;
      this.password = null;
    },
  },
  postActionMoveToView() {
    this.$router.push({ path: "/home" });
  },
};
</script>

<style scoped>
.pozadina {
  /* Lighter coral color with reduced RGB values */
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
