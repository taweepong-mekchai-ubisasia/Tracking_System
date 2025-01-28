<template>
  <div class="Department">
    <AppLayout>
      <template #modal> </template>
      <template #view>
        <div class="grid grid-cols-1 gap-6 lg:px-10 lg:py-2">
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body overflow-auto">
              <div style="height: 600px; width: 800px">
                <l-map
                  ref="map"
                  v-model:zoom="zoom"
                  :center="[location.lat, location.lng]"
                >
                  <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    layer-type="base"
                    name="OpenStreetMap"
                  ></l-tile-layer>
     
                  <l-marker :lat-lng="[location.lat,location.lng]" ></l-marker>
                  <!-- L.marker([50.5, 30.5]).addTo(map); -->
                </l-map>
              </div>
            </div>
          </div>
        </div>
      </template>
    </AppLayout>
  </div>
</template>
<style>
.crop {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 1px;
}
</style>
<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
// import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";

import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer,LMarker } from "@vue-leaflet/vue-leaflet";

export default {
  name: "Department",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    LMap,
    LTileLayer,
    LMarker
    // AppModuleGlobalShowImage,
  },
  data() {
    return {
      zoom: 5,
      location: { lat: 0, lng: 0 },
    };
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      console.log("TOKEN");
      console.log(this.$store.getters.user_token);
      return this.$store.getters.user_token;
    },
    user() {
      return this.$store.getters.user;
    },
    transpotationItem() {
      return this.$store.getters.transpotationItem;
    },
    transpotation() {
      return this.$store.getters.transpotation;
    },
  },
  methods: {},
  mounted() {
    this.$nextTick(() => {});
  },
  created() {
    const success = (pos) => {
      console.log(pos.coords.latitude);
      this.location.lat = pos.coords.latitude;
      this.location.lng = pos.coords.longitude;

      const crd = pos.coords;

      if (
        this.location.latitude === crd.latitude &&
        this.location.longitude === crd.longitude
      ) {
        console.log("Congratulations, you reached the target");
        navigator.geolocation.clearWatch(id);
      }

      // Do something with the position
    };

    const error = (err) => {
      console.log(error);
    };

    // This will open permission popup
    navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    });
  },
};
</script>
<style scrop>
tr,
td {
  white-space: nowrap;
}
/* 
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #000000, #000000);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.container {
  width: "100%";
  padding: 8px 16px;
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}
</style>
