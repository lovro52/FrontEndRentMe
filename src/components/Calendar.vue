<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="naslov">Iznajmite vozilo već danas</div>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col>
        <!-- Vehicle selection with Vuetify MDI Icons -->
        <div class="d-flex align-center mb-2">
          <div class="mr-2">
            <v-icon @click="selectVehicle('car')">mdi-car</v-icon>
          </div>
          <div class="mr-2">
            <v-icon @click="selectVehicle('van')">mdi-bus</v-icon>
          </div>
          <div>
            <v-icon @click="selectVehicle('motorcycle')">mdi-bike</v-icon>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-divider class="custom-divider"></v-divider>
    <!-- Datepickers Section -->
    <div class="d-flex justify-space-around">
      <!-- First Datepicker Section -->
      <div>
        <label for="example-datepicker">Choose a date</label>
        <b-form-datepicker
          id="example-datepicker-1"
          v-model="startDate"
          class="mb-2"
        ></b-form-datepicker>
        <p>Selected Start Date: '{{ startDate }}'</p>
      </div>

      <!-- Second Datepicker Section -->
      <div>
        <label for="example-datepicker">Choose a date</label>
        <b-form-datepicker
          id="example-datepicker-2"
          v-model="endDate"
          class="mb-2"
        ></b-form-datepicker>
        <p>Selected End Date: '{{ endDate }}'</p>
      </div>
    </div>

    <!-- Box for displaying the number of days between selected dates -->
    <div class="mt-4">
      <p>
        Number of Days Between Selected Dates:
        {{ getDaysDifference(startDate, endDate) }}
      </p>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      selectedVehicle: null,
      startDate: null,
      endDate: null,
    };
  },
  methods: {
    selectVehicle(vehicle) {
      this.selectedVehicle = vehicle;
    },
    getDaysDifference(start, end) {
      if (start && end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const timeDifference = endDate.getTime() - startDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return daysDifference;
      }
      return 0;
    },
  },
};
</script>

<style scoped>
.custom-divider {
  border-top: 3px solid teal; /* Adjust the thickness as needed */
}
.pozadina {
  background-color: teal;
}
</style>
