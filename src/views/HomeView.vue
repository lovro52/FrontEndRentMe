<template>
  <v-app class="pozadina">
    <div class="main">
      <v-container>
        <v-row>
          <v-col>
            <h2 class="text-title">
              Najam vozila - Pretražite, usporedite i uštedite
            </h2>
            <v-card class="calendar-card">
              <Calendar
                @update:startDate="setStartDate"
                @update:endDate="setEndDate"
              />
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="startDate && endDate" class="mt-4">
          <v-col>
            <v-btn color="primary" @click="viewAvailableVehicles">
              View Available Vehicles
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="wave"></div>
    <v-container class="odabir">
      <v-row>
        <v-col>
          <v-card
            class="vehicle-card"
            @click="viewVehiclesByType('car')"
            @mouseover="hoverCard($event)"
            @mouseleave="resetCard($event)"
          >
            <v-img src="../assets/car2.jpg" aspect-ratio="1.7"></v-img>
            <v-card-title>Car</v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="vehicle-card"
            @click="viewVehiclesByType('suv')"
            @mouseover="hoverCard($event)"
            @mouseleave="resetCard($event)"
          >
            <v-img src="../assets/SUV.jpg" aspect-ratio="1.7"></v-img>
            <v-card-title>SUV</v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="vehicle-card"
            @click="viewVehiclesByType('van')"
            @mouseover="hoverCard($event)"
            @mouseleave="resetCard($event)"
          >
            <v-img src="../assets/Van.jpeg" aspect-ratio="1.7"></v-img>
            <v-card-title>Van</v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="vehicle-card"
            @click="viewVehiclesByType('scooter')"
            @mouseover="hoverCard($event)"
            @mouseleave="resetCard($event)"
          >
            <v-img src="../assets/scooter.jpg" aspect-ratio="1.7"></v-img>
            <v-card-title>Scooter</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Calendar from "@/components/Calendar.vue";

export default {
  components: {
    Calendar,
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      type: null,
    };
  },
  methods: {
    setStartDate(date) {
      this.startDate = date;
    },
    setEndDate(date) {
      this.endDate = date;
    },
    viewAvailableVehicles() {
      this.$router.push({
        name: "AvailableVehicles",
        params: { startDate: this.startDate, endDate: this.endDate },
      });
    },
    viewVehiclesByType(type) {
      this.$router.push({
        name: "VehiclesByType",
        params: { type },
      });
    },
    hoverCard(event) {
      event.currentTarget.style.transform = "scale(1.05)";
      event.currentTarget.style.transition = "transform 0.3s ease";
    },
    resetCard(event) {
      event.currentTarget.style.transform = "scale(1)";
    },
  },
};
</script>

<style scoped>
.odabir {
  margin-top: 5%;
}
.pozadina {
  background-color: teal;
}
body {
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
.main {
  width: 100%;
  height: 500px;
  background-color: #e7f6fc;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  padding: 0 20px;
  font-family: Arial;
}

.main h1 {
  font-size: 40px;
}

.main p {
  font-size: 18px;
  width: 80%;
  margin-top: -5px;
}

.text-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: teal; /* Light blue color */
}

.calendar-card {
  border: 2px solid #008080; /* Teal border color */
  padding: 20px;
}

.vehicle-card {
  cursor: pointer;
  transition: transform 0.3s ease;
  overflow: hidden;
}

.wave {
  display: block;
  position: relative;
  height: 40px;
  width: 100%;
  background: #e7f6fc;
  transform: scale(1, 1.5);
}

.wave:before {
  content: "";
  display: block;
  position: absolute;
  border-radius: 100%;
  width: 100%;
  height: 300px;
  background-color: teal;
  right: -25%;
  top: 20px;
}

.wave:after {
  content: "";
  display: block;
  position: absolute;
  border-radius: 100%;
  width: 100%;
  height: 300px;
  background-color: #e7f6fc;
  left: -25%;
  top: -240px;
  clip-path: ellipse(100% 15% at -15% 100%);
}
</style>
