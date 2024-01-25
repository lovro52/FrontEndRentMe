<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card> <Calendar /> </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Calendar from "@/components/Calendar.vue";
export default {
  components: {
    Calendar,
  },
  data() {
    return {};
  },
};
</script>
