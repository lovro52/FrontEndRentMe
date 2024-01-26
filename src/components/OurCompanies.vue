<template>
  <v-card class="izgled">
    <v-row>
      <!-- Left side with the car image -->
      <v-col cols="4">
        <v-img
          src="../../src/assets/logo.png"
          alt="Car Image"
          width="150"
        ></v-img>
      </v-col>

      <!-- Middle section with title, subtitle, and text -->
      <v-col cols="4" class="text-left">
        <v-card-text>
          <div>
            <h2 class="headline">RentaSplit</h2>
            <h3 class="subtitle-1">Split</h3>
            <p>Some description text about the companie goes here.</p>
          </div>
        </v-card-text>
      </v-col>

      <!-- Right side with a button -->
      <v-col cols="4">
        <v-card-actions class="justify-end">
          <v-btn color="primary" @click="navigateToVehicles">Vozila</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>
<!--src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"-->

<script>
export default {
  name: "CompanieCard",
  methods: {
    navigateToVehicles() {
      // Use Vue Router to navigate to the desired route
      this.$router.push("/OurVozila"); // Change '/vehicles' to the desired route path
    },
  },
};
</script>

<style scoped>
.izgled {
  margin: 5%;
}
</style>
