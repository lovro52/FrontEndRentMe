<template>
  <v-app class="pozadina">
    <v-container class="pa-4">
      <v-row class="d-flex justify-center">
        <v-col
          v-for="company in companies"
          :key="company._id"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          class="d-flex"
        >
          <v-card class="mx-2 my-2 card-size">
            <div class="card-img-container">
              <v-img
                src="../assets/CompanyLogo.jpg"
                aspect-ratio="1.7"
                class="card-img"
              ></v-img>
            </div>
            <v-card-title class="pt-4">{{ company.name }}</v-card-title>
            <v-divider></v-divider>
            <v-card-subtitle class="py-2">{{
              company.location
            }}</v-card-subtitle>
            <v-divider></v-divider>
            <v-card-actions class="pt-4">
              <v-btn color="primary" @click="goToVehicles(company._id)"
                >View Vehicles</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      companies: [],
    };
  },
  mounted() {
    this.fetchCompanies();
  },
  methods: {
    fetchCompanies() {
      axios
        .get("https://backendrentme.onrender.com/companies")
        .then((response) => {
          this.companies = response.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the companies!", error);
        });
    },
    goToVehicles(companyId) {
      this.$router.push(`/OurVozila/${companyId}`);
    },
  },
};
</script>

<style scoped>
.v-card {
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.card-size {
  width: 100%;
  padding: 20px;
}
.v-card-title {
  font-weight: bold;
  font-size: 1.5rem;
}
.v-card-subtitle {
  color: #757575;
  font-size: 1.25rem;
}
.v-btn {
  margin-left: auto;
}
.v-divider {
  margin: 12px 0;
}
.card-img-container {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}
.card-img {
  height: 250px;
  object-fit: cover;
}
.pozadina {
  background-color: #e7f6fc;
}
</style>
