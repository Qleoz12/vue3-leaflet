<template>
  <div class="mapContainer">
    <p @click="showMovement2()">Control</p>
    <l-map :use-global-leaflet="true" @ready="onLoad" ref="map" v-model="zoom" v-model:zoom="zoom" >
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

    <div id="result" class="success">{{ result }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
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
export default {
  name: "Home",
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    LControl,
  },
  mounted() {
    console.log(`the component is now mounted.`)
    console.log(this.map)
   

  },
  data() {
    return {
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
    ...mapState(["onMoveLatitude", "onMoveLongitude"]),
  },
  methods: {
    onLoad() {
      this.map = this.$refs.map.leafletObject;
      console.log("Acquiring user position...");
      
      this.map.setView(new L.LatLng(4.698197888657291, -74.25460039635972), 10)  
      

    },

    showMovement(start,destination){
    
    let logo= require('/assets/images/taxi.png')
		var taxiIcon = L.icon({
			iconUrl: logo,
			iconSize: [70, 70]
		})
      var marker = L.marker([28.2380, 83.9956], { icon: taxiIcon }).addTo(this.map);
      L.Routing.control({
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

			}).addTo(this.map);
    },

    showMovement2(){

      var latlng = L.latLng(4.633874113458368, -74.08808111162087);
      var latlng2 = L.latLng(4.660539778246436, -74.00580277032782);

      this.showMovement(latlng,latlng2)
    },
    
  },
};
</script>

<style scoped>
.mapContainer {
  height: 65vh;
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