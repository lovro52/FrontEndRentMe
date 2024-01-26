<template>
  <v-app class="pozadina">
    <v-container>
      <row><VozilaCard /></row>
    </v-container>
  </v-app>
</template>

<script>
import VozilaCard from "@/components/Vozila.vue";
export default {
  components: {
    VozilaCard,
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
