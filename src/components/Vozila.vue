<template>
  <v-card class="mx-auto" max-width="400">
    <v-img class="white--text align-end" height="200px" src="../assets/car.jpg">
      <v-card-title>Auto</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0"> 500eura </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Lx</div>

      <div>5.0 400hp</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text> Detalji </v-btn>

      <v-btn color="orange" text> Rent </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "VozilaCard",
};
</script>
