<template>
  <v-app>
    <v-app-bar app color="#008080" dark>
      <v-toolbar-title>RentMe</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="white" rounded class="my-2" text to="/">Home</v-btn>
      <v-btn v-if="!user" color="white" rounded class="my-2" text to="/login"
        >Login</v-btn
      >
      <v-btn v-if="!user" color="white" rounded class="my-2" text to="/register"
        >Register</v-btn
      >
      <v-btn v-if="user" color="white" rounded class="my-2" text @click="logout"
        >Logout</v-btn
      >
      <v-btn v-if="user" color="white" rounded class="my-2" text to="/profile"
        >Profile</v-btn
      >
      <v-btn color="white" rounded class="my-2" text to="/OurCompanies"
        >Our Companies</v-btn
      >
      <v-menu bottom min-width="200px" rounded offset-y></v-menu>
    </v-app-bar>

    <v-main>
      <router-view @user-logged-in="fetchUser" />
    </v-main>

    <v-footer color="#008080" dark padless>
      <v-col class="text-center" cols="12">
        <img
          src="./assets/logo.png"
          alt="Logo"
          height="50px"
          class="logo-border"
        />
        <p class="white--text">
          &copy; {{ currentYear }} RentMe. All rights reserved.
        </p>
        <p class="white--text">{{ currentDate }}</p>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      user: null,
      currentYear: new Date().getFullYear(),
      currentDate: new Date().toLocaleDateString(),
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.user = null;
      this.$router.push("/login");
    },
    fetchUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
  },
  mounted() {
    this.fetchUser();
  },
};
</script>

<style scoped>
.v-footer {
  padding: 20px 0;
}
.logo-border {
  border: 2px solid white;
  border-radius: 5px;
  padding: 5px;
}
</style>
