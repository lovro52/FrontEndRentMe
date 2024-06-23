<template>
  <v-app class="pozadina">
    <v-container fill-height fluid class="background container-adjustment">
      <v-row align="center" justify="center">
        <v-col align="center" justify="center" cols="12">
          <v-card class="card-border" width="600px" outlined>
            <v-card-title>Profile</v-card-title>
            <v-card-text align="left">
              <div v-if="user.role === 'normal'">
                <p><strong>Username:</strong> {{ user.username }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Role:</strong> {{ user.role }}</p>
                <v-divider class="custom-divider"></v-divider>
                <p><strong>Rented Vehicles:</strong></p>
                <v-row>
                  <v-col
                    v-for="rent in user.rentals"
                    :key="rent._id"
                    cols="12"
                    md="6"
                    lg="4"
                  >
                    <v-card
                      @click="showVehicleDetails(rent.vehicleId, 'normal')"
                      class="mx-auto my-4"
                    >
                      <v-card-title>{{ rent.vehicleId.title }}</v-card-title>
                      <v-card-subtitle>{{
                        rent.vehicleId.type
                      }}</v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
              <div v-else-if="user.role === 'company'">
                <p><strong>Company Name:</strong> {{ user.company.name }}</p>
                <v-divider class="custom-divider"></v-divider>
                <p><strong>Vehicles:</strong></p>
                <v-row>
                  <v-col
                    v-for="vehicle in vehicles"
                    :key="vehicle._id"
                    cols="12"
                    md="6"
                    lg="4"
                  >
                    <v-card
                      @click="showVehicleDetails(vehicle, 'company')"
                      class="mx-auto my-4"
                    >
                      <v-card-title>{{ vehicle.title }}</v-card-title>
                      <v-card-subtitle>{{ vehicle.type }}</v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
                <v-divider class="custom-divider"></v-divider>
                <v-btn
                  @click="openAddVehicleDialog"
                  color="light-green"
                  class="add-vehicle-btn"
                >
                  Add Vehicle
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Add Vehicle Dialog -->
      <v-dialog v-model="dialog.show" persistent max-width="400">
        <v-card>
          <v-card-title>Add Vehicle</v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="vehicleTitle"
                dense
                label="Vehicle Title"
                clearable
                :rules="[rules.required]"
                outlined
              ></v-text-field>
              <v-select
                v-model="vehicleType"
                :items="['van', 'car', 'scooter', 'suv']"
                label="Vehicle Type"
                dense
                clearable
                :rules="[rules.required]"
                outlined
              ></v-select>
              <v-text-field
                v-model="vehiclePrice"
                dense
                label="Vehicle Price"
                clearable
                type="number"
                :rules="[rules.required]"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="vehicleSeats"
                dense
                label="Number of Seats"
                clearable
                type="number"
                :rules="[rules.required]"
                outlined
              ></v-text-field>
              <v-select
                v-model="vehicleTransmission"
                :items="['manual', 'automatic', 'sequential']"
                label="Transmission Type"
                dense
                clearable
                :rules="[rules.required]"
                outlined
              ></v-select>
              <v-text-field
                v-model="vehicleFuelEconomy"
                dense
                label="Fuel Economy (mpg)"
                clearable
                type="number"
                :rules="[rules.required]"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="vehicleLuggageCapacity"
                dense
                label="Luggage Capacity (liters)"
                clearable
                type="number"
                :rules="[rules.required]"
                outlined
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="addVehicle" :disabled="!valid">Add</v-btn>
            <v-btn @click="dialog.show = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Vehicle Details Dialog -->
      <v-dialog v-model="dialogVehicle.show" max-width="600px">
        <v-card>
          <v-card-title>{{ dialogVehicle.title }}</v-card-title>
          <v-card-text>
            <v-img
              :src="getVehicleImage(dialogVehicle.type)"
              aspect-ratio="1.7"
              class="card-img"
            ></v-img>
            <p><strong>Type:</strong> {{ dialogVehicle.type }}</p>
            <p><strong>Price:</strong> {{ dialogVehicle.price }} USD</p>
            <p><strong>Seats:</strong> {{ dialogVehicle.seats }}</p>
            <p>
              <strong>Transmission:</strong> {{ dialogVehicle.transmission }}
            </p>
            <p>
              <strong>Fuel Economy:</strong> {{ dialogVehicle.fuelEconomy }} mpg
            </p>
            <p>
              <strong>Luggage Capacity:</strong>
              {{ dialogVehicle.luggageCapacity }} liters
            </p>
            <p>
              <strong>Status:</strong>
              {{ isVehicleRented(dialogVehicle._id) ? "Rented" : "Available" }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="dialogVehicle.show = false">Close</v-btn>
            <v-btn color="red" @click="handleDelete">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Snackbar for Notifications -->
      <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" top>
        {{ snackbar.message }}
        <v-btn color="red" text @click="snackbar.show = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {},
      vehicles: [],
      rentedVehicleIds: [],
      dialog: {
        show: false,
      },
      dialogVehicle: {
        show: false,
        title: "",
        type: "",
        price: "",
        seats: "",
        transmission: "",
        fuelEconomy: "",
        luggageCapacity: "",
        picture: "",
        _id: "",
        role: "",
      },
      vehicleTitle: "",
      vehicleType: "",
      vehiclePrice: "",
      vehicleSeats: "",
      //vehiclePicture: "",
      vehicleTransmission: "",
      vehicleFuelEconomy: "",
      vehicleLuggageCapacity: "",
      valid: false,
      snackbar: {
        show: false,
        message: "",
        timeout: 3000,
      },
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    fetchProfile() {
      axios
        .get("https://backendrentme.onrender.com/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.user = response.data;
          if (this.user.role === "company") {
            this.fetchVehicles();
          } else {
            this.vehicles = this.user.rentals.map((rent) => rent.vehicleId);
          }
          this.checkRentStatus();
        })
        .catch((error) => {
          console.error("There was an error fetching the profile!", error);
        });
    },
    fetchVehicles() {
      const companyId = this.user.company.id;
      axios
        .get(`https://backendrentme.onrender.com/vehicles/company/${companyId}`)
        .then((response) => {
          this.vehicles = response.data;
          this.checkRentStatus();
        })
        .catch((error) => {
          console.error("There was an error fetching the vehicles!", error);
        });
    },
    checkRentStatus() {
      axios
        .get("https://backendrentme.onrender.com/rents")
        .then((response) => {
          this.rentedVehicleIds = response.data.map(
            (rent) => rent.vehicleId._id
          );
        })
        .catch((error) => {
          console.error("There was an error fetching the rent status!", error);
        });
    },
    isVehicleRented(vehicleId) {
      return this.rentedVehicleIds.includes(vehicleId);
    },
    openAddVehicleDialog() {
      this.dialog.show = true;
    },
    showVehicleDetails(vehicle, role) {
      this.dialogVehicle = { ...vehicle, show: true, role };
    },
    addVehicle() {
      const payload = {
        title: this.vehicleTitle,
        type: this.vehicleType,
        price: this.vehiclePrice,
        seats: this.vehicleSeats,
        //picture: this.vehiclePicture,
        transmission: this.vehicleTransmission,
        fuelEconomy: this.vehicleFuelEconomy,
        luggageCapacity: this.vehicleLuggageCapacity,
        companyId: this.user.company.id, // Use the id field from the company data
      };

      axios
        .post("https://backendrentme.onrender.com/vehicles", payload)
        .then((response) => {
          this.dialog.show = false;
          this.fetchVehicles(); // Refresh the vehicle list to show the new vehicle
        })
        .catch((error) => {
          console.error("There was an error adding the vehicle!", error);
        });
    },
    handleDelete() {
      if (this.dialogVehicle.role === "company") {
        this.deleteVehicle(this.dialogVehicle._id);
      } else {
        const rentId = this.user.rentals.find(
          (rent) => rent.vehicleId._id === this.dialogVehicle._id
        )._id;
        this.deleteRent(rentId);
      }
      this.dialogVehicle.show = false;
    },
    deleteVehicle(vehicleId) {
      axios
        .delete(`https://backendrentme.onrender.com/vehicles/${vehicleId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          this.fetchVehicles(); // Refresh the vehicle list after deletion
          this.snackbar.message = "Your vehicle has been removed";
          this.snackbar.show = true;
        })
        .catch((error) => {
          console.error("There was an error deleting the vehicle!", error);
        });
    },
    deleteRent(rentId) {
      axios
        .delete(`https://backendrentme.onrender.com/rents/${rentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          this.fetchProfile(); // Refresh the profile after deletion
          this.snackbar.message =
            "Your rent has been deleted, the company will be notified";
          this.snackbar.show = true;
        })
        .catch((error) => {
          console.error("There was an error deleting the rent!", error);
        });
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
.v-card-title {
  font-weight: bold;
}
.v-card-subtitle {
  margin-top: -10px;
  color: gray;
}
.v-card-actions {
  justify-content: center;
}
.pozadina {
  background-color: #e7f6fc;
}
.container-adjustment {
  padding-top: 10px; /* Adjust this value as needed */
}
.card-border {
  padding: 2%;
}
.card-text-border {
  padding: 2.5%;
}
.card-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.btn-right-margin {
  margin-right: 2%;
}
.custom-divider {
  border-top: 3px solid teal; /* Adjust the thickness as needed */
}
.odabir {
  margin-top: 5%;
}
.add-vehicle-btn {
  background-color: #8bc34a; /* Light green color */
  color: white;
  margin: 0 auto;
  display: block;
}
</style>
