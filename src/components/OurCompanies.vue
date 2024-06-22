<template>
  <v-card class="izgled">
    <v-row>
      <!-- Left side with the car image -->
      <!--       <v-col cols="4">
        <v-img :src="companieList" alt="Car Image" width="150"></v-img>
      </v-col> -->

      <!-- Middle section with title, subtitle, and text -->
      <v-col cols="4" class="text-left">
        <v-card-text>
          <div>
            <h2 class="headline">{{ companieList.naziv }}</h2>
            <h3 class="subtitle-1">{{ companieList.lokacija }}</h3>
            <p>{{ companieList.description }}</p>
          </div>
        </v-card-text>
      </v-col>

      <!-- Right side with a button -->
      <v-col cols="4">
        <v-card-actions class="justify-end">
          <v-btn color="primary" @click="navigateToVehicles">Vozila</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { Auth, Companies, Service } from "@/services";
export default {
  name: "CompanieCard",
  props: ["companieList"],
  data() {
    return {
      companieList: [],
    };
  },
  mounted() {
    this.GetAllCompanies();
  },
  methods: {
    async GetAllCompanies() {
      try {
        // Call your getAll function from your service
        this.companieList = await Service.GetAllCompanies(); // Replace YourService with your actual service name
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    },

    navigateToVehicles() {
      this.$router.push("/OurVozila"); // Change '/vehicles' to the desired route path
    },
  },
};
</script>
