<template>
  <v-app style="background-color: #f5f5f5">
    <div>
      <div class="hidden-lg-and-up">
      <v-row >
        <v-col class="col-sm-12 d-flex">
          <v-spacer></v-spacer>
          <div>
          <v-img
            max-height="120"
            max-width="150"
            src="./assets/logo.png"
            class=" mt-5 "
            style="border-radius: 1rem"
          ></v-img>
          <h3 class="text-h5 font-weight-bold text-center">Weatherist</h3>
        </div>
          <v-spacer></v-spacer>
        </v-col>
      </v-row>
      <div class="mx-8 mt-5">
        <v-expansion-panels>
          <v-expansion-panel >
            <v-expansion-panel-header color='#eaecef' class=" text-body-1  font-weight-bold"> Menu </v-expansion-panel-header>
            <v-expansion-panel-content color="#eaecef">
              <SideBarMenu />
            </v-expansion-panel-content >
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
      
      <v-row class="ma-5">
        <v-col class="col-lg-2 hidden-md-and-down">
          <SideBarMenu />
        </v-col>
        <v-col class="col-lg-6 col-md-6 col-sm-12">
          <MainMenu />
        </v-col>
        <v-col class="col-lg-4 col-md-6 col-sm-12">
          <SideData />
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import SideBarMenu from "./components/SideBarMenu.vue";
import MainMenu from "./components/MainMenu.vue";
import SideData from "./components/SideData.vue";
import { store } from "./store";

export default {
  name: "App",

  components: {
    SideBarMenu,
    MainMenu,
    SideData,
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude.toFixed(1) + "";
        var longitude = position.coords.longitude.toFixed(1) + "";
        store.dispatch("getLocation", [longitude, latitude]);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  },
  data: () => ({
    //
  }),
};
</script>
