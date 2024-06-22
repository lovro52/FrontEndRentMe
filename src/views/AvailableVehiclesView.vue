<template>
  <v-app class="pozadina">
    <v-container class="pa-4">
      <v-row>
        <v-col
          v-for="vehicle in availableVehicles"
          :key="vehicle._id"
          cols="12"
          class="d-flex justify-center"
        >
          <v-card class="mx-2 my-2 card-size">
            <v-row>
              <v-col cols="12">
                <v-card-title>{{ vehicle.type }}</v-card-title>
                <v-divider class="thick-divider"></v-divider>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <div class="info-section">
                    <strong>Seats:</strong> {{ vehicle.seats }}<br />
                    <strong>Transmission:</strong> {{ vehicle.transmission
                    }}<br />
                    <strong>Fuel Economy:</strong> {{ vehicle.fuelEconomy
                    }}<br />
                    <strong>Luggage Capacity:</strong>
                    {{ vehicle.luggageCapacity }}
                  </div>
                </v-card-text>
              </v-col>
              <v-col cols="1" class="d-flex justify-center">
                <v-divider vertical class="thick-divider"></v-divider>
              </v-col>
              <v-col cols="4">
                <v-card-text>
                  <div class="info-section">
                    <strong>Price:</strong> ${{ vehicle.price }}
                  </div>
                </v-card-text>
              </v-col>
              <v-col cols="3" class="image-container d-flex justify-center">
                <v-img
                  :src="getVehicleImage(vehicle.type)"
                  aspect-ratio="1.7"
                  class="card-img"
                ></v-img>
              </v-col>
              <v-col cols="12">
                <v-divider class="thick-divider"></v-divider>
              </v-col>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn
                  color="primary"
                  class="rent-button"
                  @click="openRentDialog(vehicle)"
                  >Rent</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog.show" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">Rent Confirmation</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="dialog.rentalDays"
                label="Rental Days"
                type="number"
                min="1"
                required
              ></v-text-field>
              <v-btn
                color="blue darken-1"
                text
                @click="rentVehicle(dialog.vehicle)"
                >Confirm</v-btn
              >
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog.show = false"
              >Cancel</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
        {{ snackbar.message }}
        <v-btn color="white" text @click="snackbar.show = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      vehicles: [],
      rentedVehicleIds: [],
      username: "",
      dialog: {
        show: false,
        vehicle: null,
        rentalDays: 1,
      },
      snackbar: {
        show: false,
        message: "",
        color: "",
      },
    };
  },
  computed: {
    availableVehicles() {
      return this.vehicles.filter(
        (vehicle) => !this.rentedVehicleIds.includes(vehicle._id)
      );
    },
  },
  mounted() {
    this.fetchVehicles();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.username = user.username;
    }
  },
  methods: {
    fetchVehicles() {
      const { startDate, endDate } = this.$route.params;
      axios
        .get(`http://localhost:5000/available-vehicles`, {
          params: { startDate, endDate },
        })
        .then((response) => {
          this.vehicles = response.data.vehicles;
          this.rentedVehicleIds = response.data.rentedVehicleIds;
          this.checkRentStatus();
        })
        .catch((error) => {
          console.error("There was an error fetching the vehicles!", error);
        });
    },
    checkRentStatus() {
      axios
        .get("http://localhost:5000/rents")
        .then((response) => {
          this.rentedVehicleIds = response.data.map(
            (rent) => rent.vehicleId._id
          );
        })
        .catch((error) => {
          console.error("There was an error fetching the rent status!", error);
        });
    },
    openRentDialog(vehicle) {
      this.dialog.vehicle = vehicle;
      this.dialog.show = true;
    },
    rentVehicle(vehicle) {
      const userId = JSON.parse(localStorage.getItem("user")).id;
      const companyId = vehicle.companyId;
      axios
        .post(
          "http://localhost:5000/rents",
          {
            userId,
            vehicleId: vehicle._id,
            companyId,
            rentalDays: this.dialog.rentalDays,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          this.dialog.show = false;
          this.snackbar.message = "Vehicle rented successfully!";
          this.snackbar.color = "success";
          this.snackbar.show = true;
          this.fetchVehicles();
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            this.snackbar.message = "This vehicle is already rented.";
            this.snackbar.color = "error";
            this.snackbar.show = true;
          } else {
            console.error("There was an error renting the vehicle!", error);
          }
        });
    },
    confirmRental() {
      this.dialog.show = false;
      this.$router.push("/");
    },
    getVehicleImage(type) {
      switch (type.toLowerCase()) {
        case "car":
          return require("../assets/car2.jpg");
        case "suv":
          return require("../assets/SUV.jpg");
        case "scooter":
          return require("../assets/scooter.jpg");
        case "van":
          return require("../assets/Van.jpeg");
        default:
          return require("../assets/car.jpg");
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  border: 2px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.card-size {
  width: 100%;
  max-width: 800px;
  padding: 8px;
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  background-color: white;
}
.v-card-title {
  font-weight: bold;
  font-size: 1.15rem;
}
.info-section {
  margin-bottom: 8px;
}
.thick-divider {
  border-width: 2px;
}
.rent-button {
  font-size: 14px;
  padding: 8px 16px;
}
.pozadina {
  background-color: #e7f6fc;
}
</style>
