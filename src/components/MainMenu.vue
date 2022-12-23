<template>
  <div>
    <div class="bg-container pa-5 pb-0 d-flex">
      <v-text-field
        outlined
        label="Enter your City here"
        append-icon="mdi-map-marker"
        v-model="city"
        @change="getDataByCity"
      ></v-text-field>
      <v-btn
        depressed
        color="primary"
        class="py-7 ml-n2"
        @click="getDataByCity"
      >
        Go
      </v-btn>
    </div>
    <div class="d-flex bg-container pa-5 mt-5 main-menu">
      <div>
        <h3 class="text-h4">{{ currentWeather ? currentWeather.name: 'City' }}</h3>
        <p class="text-body-2 mt-2">
          Humidity Level: {{ currentWeather ? currentWeather.main.humidity: '-' }}
        </p>
        <h3 class="text-h4 mt-10 font-weight-bold">
          {{ currentWeather ? currentWeather.main.temp : '-'}} C
        </h3>
      </div>
      <v-spacer></v-spacer>
      <v-img
              max-height="200"
              max-width="250"
              :src="`https://openweathermap.org/img/wn/${ currentWeather ? currentWeather.weather[0].icon : '50d'}@2x.png`"
            ></v-img>
    </div>

    <div class=" pa-5 mt-5">
      <p class="text-h5 text-center">Today's Forecast</p>
      <div class="d-flex flex-column ">
        <div class="flex-data d-flex justify-space-between  bg-container my-2 py-4 px-7" v-for="item in dailyForecastData" :key="item.dt">

          <v-img
              max-height="60"
              max-width="60"
              :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
            ></v-img>
          <p class="text-body-1 text-center mt-3">{{item.dt_txt.slice(11, item.dt_txt.length)}}</p>
          <div class="mt-2">
            <h4 class="text-center mb-2">{{ item.main.temp }}  C</h4> 
            <p class="text-body-1 text-center ">{{item.weather[0].description}}</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainMenu",
  data() {
    return {
      city: "",
    };
  },
  methods: {
    getDataByCity() {
      this.$store.state.city = this.city;
      this.$store.dispatch("getInitialData");
    },
  },
  mounted() {
    this.$store.dispatch("getInitialData")
  },
  computed: {
    currentWeather() {
      return this.$store.getters.getCurrentWeather;
    },
    cityName() {
      return this.$store.getters.cityName;
    },
    dailyForecastData() {
      let forecast = this.$store.getters.getForcastData;
      let newData = forecast.slice(1,5)
      return newData;
      
    },
  },
};
</script>

<style scoped>
.bg-container {
  background-color: #eaecef;
  border-radius: 0.5rem;
}
@media screen and (max-width: 430px){
.flex-data{
  flex-direction: column;
  align-items: center;
}
.flex-data > p{
  margin-top: 2px;
}
.main-menu{
  flex-direction: column;
  align-items: center;
}
}
</style>