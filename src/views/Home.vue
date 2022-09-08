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
      map: null,
      zoom: 5,
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
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
      this.map
        .locate({ setView: true, watch: false, maxZoom: 17 })
        .on("locationfound", (e) => {
          console.log("Position acquired");
          this.lat = e.latitude;
          this.lng = e.longitude;
          // this.marker = new L.circleMarker([this.lat, this.lng]).addTo(toRaw(this.map))
        })
      // .circleMarker([this.lat, this.lng])
      // .addTo(toRaw(this.map))
      // .bindPopup("I am here!")
      // .openPopup();


      // Initialise the FeatureGroup to store editable layers
      var editableLayers = new L.FeatureGroup();
      this.map.addLayer(editableLayers);

      var drawPluginOptions = {
        position: 'topright',
        draw: {
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
              color: '#e1e100', // Color the shape will turn when intersects
              message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
            },
            shapeOptions: {
              color: '#97009c'
            }
          },
          // disable toolbar item by setting it to false
          polyline: false,
          circle: false, // Turns off this drawing tool
          rectangle: false,
          marker: false,
          circlemarker:false
        },
        edit: {
          featureGroup: editableLayers, //REQUIRED!!
          remove: false
        }
      };

      // Initialise the draw control and pass it the FeatureGroup of editable layers
      var drawControl = new L.Control.Draw(drawPluginOptions);
      this.map.addControl(drawControl);

      var editableLayers = new L.FeatureGroup();
      this.map.addLayer(editableLayers);

      this.map.on('draw:created', function (e) {
        var type = e.layerType,
          layer = e.layer;

        if (type === 'marker') {
          layer.bindPopup('A popup!');
        }

        if(type==='polygon')
        {
          console.log(layer.getLatLngs())
        }

        editableLayers.addLayer(layer);
      });
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
      // console.log(event)

      // var newMarker = new L.marker(event.latlng)
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