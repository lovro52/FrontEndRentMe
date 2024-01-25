<template>
  <v-card>
    <v-row>
      <!-- Left side with the car image -->
      <v-col cols="4">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          alt="Car Image"
          width="150"
        ></v-img>
      </v-col>

      <!-- Middle section with title, subtitle, and text -->
      <v-col cols="4" class="text-left">
        <v-card-text>
          <div>
            <h2 class="headline">Car Title</h2>
            <h3 class="subtitle-1">Car Subtitle</h3>
            <p>Some description text about the car goes here.</p>
          </div>
        </v-card-text>
      </v-col>

      <!-- Right side with a button -->
      <v-col cols="4">
        <v-card-actions>
          <v-btn color="primary">Learn More</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>
<!--src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"-->

<script>
export default {
  name: "CompanieCard",
};
</script>

<style scoped>
/* Add any custom styling here if needed */
</style>
