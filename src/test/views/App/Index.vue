<template>
  <div class="Home" data-theme="winter">
    <AppLayout
      ref="AppLayout"
      @setgame="$emit('setgame')"
      @getgame="$emit('getgame')"
    >
      <template #modal> </template>
      <template #view>
        <div v-for="(v, i) in element" :key="i">{{ v }}</div>
        <draggable-resizable-vue
          v-for="(v, i) in element"
          :key="i"
          :show-grid="true"
          grid-color="rgba(1, 1, 1, 1)"
          v-model:x="v.x"
          v-model:y="v.y"
          v-model:h="v.height"
          v-model:w="v.width"
          v-model:active="v.isActive"
          :style="{
            'background-color': v.bg,
          }"
           @activated="onActivated(v,i)"
        >
          <p
            :style="
              v.rotate
                ? {
                    position: 'relative',
                    transform: 'scale(-1)',
                    'writing-mode': 'vertical-rl',
                    display: 'grid',
                    'align-content': 'center',
                    'justify-content': 'center',
                    'align-items': 'center',
                    height: '100%',
                    width: '100%',
                  }
                : {
                    position: 'relative',
                    transform: 'scale(1)',
                    height: '100%',
                    display: 'grid',
                    'align-content': 'center',
                  }
            "
          >
            <span style="word-wrap: break-word; width: 100%; overflow: hidden"
              >DSADSAsssssssssssssssssss</span
            >
          </p>
        </draggable-resizable-vue>
      </template>
    </AppLayout>
  </div>
</template>

<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
// import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
// Dev draggable-panel
import DraggableResizableVue from "draggable-resizable-vue3";
// import DropArea from 'vue-dialog-drag/dist/drop-area'

// import 'vue-dialog-drag/dist/vue-dialog-drag.css';
// import 'vue-dialog-drag/dist/drop-area.css';

// import 'vue-dialog-drag/dist/dialog-styles.css';
export default {
  name: "Home",
  components: {
    AppLayout,
    DraggableResizableVue,
    // DropArea
  },
  props: ["showLogin", "showtokens", "token_gameplay"],
  data() {
    return {
      element: [
        {
          x: 20,
          y: 20,
          width: 100,
          height: 400,
          isActive: false,
          bg: "red",
          rotate: true,
        },
        {
          x: 20,
          y: 20,
          width: 200,
          height: 200,
          isActive: false,
          bg: "blue",
          rotate: false,
        },
        {
          x: 20,
          y: 20,
          width: 200,
          height: 200,
          isActive: false,
          bg: "blue",
          rotate: false,
        },
        {
          x: 20,
          y: 20,
          width: 200,
          height: 200,
          isActive: false,
          bg: "blue",
          rotate: false,
        },
        {
          x: 20,
          y: 20,
          width: 200,
          height: 200,
          isActive: false,
          bg: "blue",
          rotate: false,
        },
      ],
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
    user() {
      return this.$store.getters.user;
    },
    rating() {
      return this.$store.getters.rating;
    },
    survey() {
      return this.$store.getters.survey;
    },

    coin() {
      return this.$store.getters.coin;
    },
    gamelist() {
      return this.$store.getters.gamelist;
    },
    jwt() {
      return this.$store.getters.jwt;
    },
    game_type() {
      return this.$store.getters.game_type;
    },
  },
  methods: {
    drop(id) {
      console.log("drop id:", id);
    },
    onActivated(v,i){
      console.log(v,i)
    }
  },
  mounted() {},
  created() {},
  beforeDestroy() {},
  watch: {},
};
</script>