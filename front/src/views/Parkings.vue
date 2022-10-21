<template>
  <div>

    <div class="mapContainer">
      <p @click="showMovement2()">sample movement button</p>
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

    <div class="grid grid-cols-2 gap-2">
      <div>
        <h1 class="text-4xl uppercase font-extrabold">parkings </h1>
        <CreateParking @createParking="userCreate($event)" />
      </div>
      <listParking :numberOfUsers="numberOfUsers" :parkings="parkings" />
      <div>
        <h1 class="text-4xl uppercase font-extrabold">buses at parkings </h1>
        <listParkingBuses :numberOfUsers="numberOfUsers" :parkingsBuses="busParkings" />
      </div>
    </div>

  </div>
</template>

<script>


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
import { mapState } from "vuex";
import CreateParking from '../components/CreateParking.vue'
import ListParking from '../components/ListParking.vue'
import ListParkingBuses from '../components/ListParkingBuses.vue'
import { getParkings, createParking, getAllParkingBuses } from '../services/parkingService'


export default {
  name: 'Parkings',
  components: {
    CreateParking,
    ListParking,
    ListParkingBuses,
    LMap,
    LTileLayer,
    LControlLayers,
    LControl,

  },
  data() {
    return {

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

      parkings: [],
      busParkings: [],
      numberOfUsers: 0,
    }
  },
  methods: {
    onLoad() {
      this.map = this.$refs.map.leafletObject;
      console.log("Acquiring user position...");

      this.map.setView(new L.LatLng(4.698197888657291, -74.25460039635972), 10)


    },
    getParkings() {
      Promise.all([getParkings(), getAllParkingBuses()])
        .then(([res, res2]) => {

          this.parkings = res.data.parkings;
          this.busParkings = res2.data.busParkings;

          for (var _i = 0; _i < this.parkings.length; _i++) 
          {
            var latlng=L.latLng(this.parkings[_i].locations.lat, this.parkings[_i].locations.lng);
            var newMarker = new L.marker(latlng)
            this.markers.addLayer(newMarker);
            this.markers.addTo(this.map)
          }

        })
        .catch(function (error) {
          console.log(error);
        });
    },
    userCreate(data) {
      console.log('data:::', data)
      createParking(data).then(response => {
        console.log(response);
        this.getAllUsers();
      })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  mounted() {

    console.log(`the component is now mounted.`)
    this.getParkings();
  }
}
</script>
<style scoped>
.mapContainer {
  height: 45vh;
  width: 100%;
  z-index: 100;
  border: 1px solid black;
  margin: 0 0 2em 0;
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