import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        currentWeather: '',
        forecastWeather: '',
        city: ''
    },
    getters: {
        getForcastData() {
            return store.state.forecastWeather
        },
        getCurrentWeather(){
            return store.state.currentWeather
        },
        cityName(){
            return store.state.city
        }
    },
    mutations: {
        getInitialData(state, data) {
            state.forecastWeather = data.list
        },
        getCurrentWeather(state, data) {
            state.currentWeather = data
        },
        setCity(state, city){
            state.city = city
            store.dispatch("getInitialData");
        }
    },
    actions: {
        getInitialData(context) {
            if(store.state.city){
            fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${store.state.city}&units=metric&appid=10432c2e3f84b54767a8dc7581b1393e`).then(response => response.json()).then(data => {
                context.commit("getInitialData", data)
            });
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${store.state.city}&units=metric&appid=10432c2e3f84b54767a8dc7581b1393e`).then(response => response.json()).then(data => {
                context.commit("getCurrentWeather", data)
            });
        }
        },
        getLocation(context, location) {
            var api_key = '959d62974e7842729c7a03ff7bc19aae';

            var api_url = 'https://api.opencagedata.com/geocode/v1/json'

            var request_url = api_url
                + '?'
                + 'key=' + api_key
                + '&q=' + encodeURIComponent(location[1] + ',' + location[0])
                + '&pretty=1'
                + '&no_annotations=1';

            var request = new XMLHttpRequest();
            request.open('GET', request_url, true);

            request.onload = function () {

                if (request.status === 200) {
                    // Success!
                    let data = JSON.parse(request.responseText);
                    context.commit("setCity" ,data.results[0].components.city)

                } else if (request.status <= 500) {
                    console.log("unable to geocode! Response code: " + request.status);
                    let data = JSON.parse(request.responseText);
                    console.log('error msg: ' + data.status.message);
                } else {
                    console.log("server error");
                }
            };

            request.onerror = function () {
                // There was a connection error of some sort
                console.log("unable to connect to server");
            };

            request.send();  // make the request
        },

    }
})