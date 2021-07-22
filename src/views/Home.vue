<template>
  <div class="mapContainer">
    <l-map
      ref="mymap"
      v-model="zoom"
      v-model:zoom="zoom"
      :center="center"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution"> </l-tile-layer>
      <l-control class="clickControl" :position="position">
        <p @click="showClick">Control</p>
      </l-control>
    </l-map>
    <button @click="flyToTarget()">Save</button>
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
import { mapState } from "vuex";
import { onMounted, ref } from "vue";

export default {
  name: "Home",
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    LControl,
  },
  data() {
    return {
      map: null,
      zoom: 13,
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
      center: [51.505, -0.09],
      position: "topright",
      centerLatLng: {},
      currentCenter: Number,
      currentZoom: Number,
    };
  },
  computed: {
    ...mapState(["onMoveLatitude", "onMoveLongitude"]),
  },
  setup() {
    onMounted(() => {
      this.$nextTick(() => {
        this.$refs.mymap.mapObject;
      });
    });
  },

  methods: {
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
      console.log(
        "lat " + this.onMoveLatitude + " and " + "lng " + this.onMoveLongitude
      );
      this.$refs.mymap.mapObject.panTo(this.center, 13);
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