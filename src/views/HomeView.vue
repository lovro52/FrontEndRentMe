<template>
  <v-app class="pozadina">
    <div class="main">
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <Calendar />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="wave"></div>
    <v-container class="odabir">
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Motori</v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>Auti</v-card-title>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title>Kamioni</v-card-title>
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
    return {};
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

.main button {
  border: 2px solid #fff;
  color: #fff;
  font-size: 16px;
  padding: 8px 15px;
  width: 120px;
  margin-top: 10px;
  background-color: transparent;
  border-radius: 4px;
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
