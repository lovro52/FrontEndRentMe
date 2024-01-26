<template>
  <v-app class="pozadina">
    <v-container>
      <row><CompanieCard /></row>
      <row><CompanieCard /></row>
    </v-container>
  </v-app>
</template>

<script>
import CompanieCard from "@/components/OurCompanies.vue";
export default {
  components: {
    CompanieCard,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.pozadina {
  /* Lighter coral color with reduced RGB values */
  background-color: #e7f6fc;
}
</style>
