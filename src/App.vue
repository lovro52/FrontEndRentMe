<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Nekretnine4U</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="white" rounded class="my-2" text to="/">Home</v-btn>
      <v-btn
        color="white"
        rounded
        class="my-2"
        v-if="!currentUser"
        text
        to="/login"
        >Login</v-btn
      >
      <v-btn
        color="white"
        rounded
        class="my-2"
        v-if="!currentUser"
        text
        to="/register"
        >Register</v-btn
      >
      <v-btn color="white" rounded class="my-2" text to="/profile"
        >Profile</v-btn
      >
      <v-btn color="white" rounded class="my-2" text to="/Nekretnine"
        >Nekretnine</v-btn
      >
      <v-menu bottom min-width="200px" rounded offset-y> </v-menu>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
