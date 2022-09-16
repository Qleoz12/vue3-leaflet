<template>
  <div class="mapContainer">
    <l-map :use-global-leaflet="true" @ready="onLoad" ref="map" v-model="zoom" v-model:zoom="zoom" :center="center"
      @update:center="centerUpdate" @update:zoom="zoomUpdate" @click="addMarkercustomFucntion">
      <l-tile-layer :url="url" :attribution="attribution"> </l-tile-layer>
      <!-- <l-control class="clickControl" :position="position">
        <p @click="flyToTarget()">Control</p>
      </l-control> -->
      <!-- <l-marker :lat-lng="[0, 0]" draggable @moveend="log('moveend')">
        <l-tooltip>
          lol
        </l-tooltip>
      </l-marker> -->

      

      <l-marker v-for="(markertt, index) in markers" :key="index" :lat-lng="markertt"></l-marker>
    </l-map>

    <div id="result" class="success">{{ result  }}</div>
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
import "leaflet-draw"
import { mapState } from "vuex";
import { onMounted, toRaw } from "vue";
import {getDistanceFromLatLonInKm} from "../helpers/index.ts"
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
      result:0,
      map: null,
      zoom: 5,
       url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
      center: [51.505, -0.09],
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
      var one=new L.circle([24.711454873635766,46.67438218019588], { radius:977690,color: "#5CB8E4"}).addTo(this.map);

      var one=new L.circle([39.65467179595615,66.97572083948319], { radius:2169860,color: "#367E18"}).addTo(this.map);

      var one=new L.circle([40.78689100382049,14.368456432286543], { radius:2749400,color: "#25316D"}).addTo(this.map);
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showClick() {
      console.log("clicked");
    },
    flyToTarget() {
      console.log("Acquiring user position...");
      this.map
        .locate({ setView: false, watch: true })
        .on("locationfound", (e) => {
          console.log("Position acquired");
          this.map.flyTo([e.latitude, e.longitude], 16);
        });
    },
    removeMarker(index) {
      this.markers.splice(index, 1);
    },
    addMarkercustomFucntion(event) {
      console.log(event)

      this.result = JSON.parse(event)
      
      // this.markers.addLayer(newMarker);
      // this.markers.addTo(this.map)

      // console.log(this.markers.getLayers()[0])
      // console.log(this.markers.getLayers())
    }
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