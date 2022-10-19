<template>
  <div class="mapContainer">
    <p @click="showMovement2()">Control</p>
    <l-map :use-global-leaflet="true" @ready="onLoad" ref="map" v-model="zoom" v-model:zoom="zoom">
      <l-tile-layer :url="url" :attribution="attribution"> </l-tile-layer>

      <!-- <l-control class="clickControl" :position="position">
        
      </l-control> -->
      <!-- <l-marker :lat-lng="[0, 0]" draggable @moveend="log('moveend')">
        <l-tooltip>
          lol
        </l-tooltip>
      </l-marker> -->



      <l-marker v-for="(markertt, index) in markers" :key="index" :lat-lng="markertt"></l-marker>
    </l-map>

  </div>
  <br/>
  <hr/>
  <div class="grid grid-cols-2 gap-2">
    <listBuses @createTrip="createTrip($event)"  @confirmTrip="confirmTrip($event)"/>
    <!-- <registerParking @registerTrip="registerTrip($event)" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import listBuses from "../components/ListBuses.vue";
import registerParking from "../components/RegisterParking.vue";

import { getAllParkingBuses, createTrip,confirmTrip } from '../services/parkingService'
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LControlLayers,
  LControl,
} from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-draw"
import { mapState } from "vuex"; export default {
  name: "Buses",
  components: {
    listBuses,
    LMap,
    LTileLayer,
    LControlLayers,
    LControl,
    registerParking
  },
  mounted() {
    console.log(`the component is now mounted.`)
    this.getAllParkingBuses()

  },
  data() {
    return {
      parkingsBuses: [],
      result: 0,
      map: null,
      zoom: 5,
      url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
      center: [4.629822826586647, -73.94979519267287],
      position: "topleft",
      centerLatLng: {},
      currentCenter: Number,
      currentZoom: Number,
      lat: null,
      lng: null,
      // marker: null,
      markers: L.layerGroup(),
      circle: {
        center: null,
        radius: 6,
        color: "red",
      },

    };
  },
  computed: {

  },
  methods: {
    onLoad() {
      this.map = this.$refs.map.leafletObject;
      console.log("Acquiring user position...");

      this.map.setView(new L.LatLng(4.698197888657291, -74.25460039635972), 10)


    },

    showMovement(start, destination) {

      let logo = require('/assets/images/taxi.png')
      var taxiIcon = L.icon({
        iconUrl: logo,
        iconSize: [70, 70]
      })
      var marker = L.marker([28.2380, 83.9956], { icon: taxiIcon }).addTo(this.map);
      var control = L.Routing.control({
        waypoints: [
          L.latLng(start.lat, start.lng),
          L.latLng(destination.lat, destination.lng)
        ]
      }).on('routesfound', function (e) {
        var routes = e.routes;
        console.log(routes);

        e.routes[0].coordinates.forEach(function (coord, index) {
          setTimeout(function () {
            marker.setLatLng([coord.lat, coord.lng]);
          }, 100 * index)


        })
        var summary = routes[0].summary;
        console.log(summary)

      }).addTo(this.map);


    },
    showMovement2() {

      var latlng = L.latLng(4.633874113458368, -74.08808111162087);
      var latlng2 = L.latLng(4.660539778246436, -74.00580277032782);

      this.showMovement(latlng, latlng2)
    },
    getAllParkingBuses() {
      Promise.all([getAllParkingBuses()])
        .then(([res]) => {

          this.parkingsBuses = res.data.busParkings;

        })
        .catch(function (error) {
          console.log(error);
        });
    },
    createTrip(data) {
      console.log('data:::', data)
      createTrip(data).then(response => {
        console.log(response);
        this.getAllParkingBuses();


        this.showMovement(latlng, latlng2)

      })
        .catch(function (error) {
          console.log(error);
        });
    },
    confirmTrip(data) {
      console.log('data:::', data)
      confirmTrip(data).then(response => {
        console.log(response);
       

      })
        .catch(function (error) {
          console.log(error);
        });
    }


  },
};
</script>

<style scoped>
.mapContainer {
  height: 45vh;
  width: 100%;
  z-index: 100;
  border: 1px solid black;
}

.clickControl {
  background: #fff;
  padding: 0 0.5rem;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
}

.controller {
  height: 33vh;
  width: 100%;
}
</style>

<style>
.leaflet-routing-container {
  display: none;
}
</style>