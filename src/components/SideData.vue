<template>
  <div class="bg-container pa-5">
    <h3 class="text-h5 text-center mb-3">Forecast Weather</h3>
    <v-list class="bg-container">
      <v-list-item
        v-for="item in forecastData"
        :key="item.dt"
        class="pa-4 pb-2 mx-3 side-list"
      >
        <v-list-item-content>
          <div class="d-flex align-center sideData">
            <div class="d-flex flex-column align-center">
            <v-img
              max-height="60"
              max-width="60"
              :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
            ></v-img>
            <p class="text-body-2">{{ item.dt }}</p>
            </div>
            <v-spacer></v-spacer>
            <p class="text-body-1 font-weight-bold ml-4 mt-5 text-capitalize">
                {{ item.weather[0].description }}
              </p>
            <v-spacer></v-spacer>
            <div>
              <p class="text-body-1 mt-4">
                <b>{{ Math.trunc(item.main.temp_max) }}</b
                >/{{ Math.round(item.main.temp_max) }}
              </p>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "SideData",

  computed: {
    forecastData() {
      let forecast = this.$store.getters.getForcastData;
      let newData = [];
      for (let i = 0; i < forecast.length; i++) {
        if (i % 8 == 0) {
          var myDate = new Date(1000 * forecast[i].dt);
          var days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          var day = days[myDate.getDay()];
          forecast[i].dt = day;
          newData.push(forecast[i]);
        }
      }
      return newData;
    },
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
.bg-container {
  background-color: #eaecef;
  border-radius: 0.5rem;
}
.side-list {
  border-bottom: 1px solid black;
}

@media screen and (max-width: 430px){
.sideData{
  flex-direction: column;
  align-items: center;
}
.sideData > p{
  margin-top: 2px;
}
}
</style>