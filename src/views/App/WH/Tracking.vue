<template>
  <div class="Home" data-theme="winter">
    <AppLayout
      ref="AppLayout"
      @setgame="$emit('setgame')"
      @getgame="$emit('getgame')"
    >
      <template #modal> </template>
      <template #view>
        <div class="flex flex-col gap-4">
          <div class=" flex flex-col-reverse lg:flex-row flex-nowrap justify-around items-center gap-4">
           
            <div class="max-h-[40vh] h-[40vh] self-center">
              <qrcode-stream
              v-if="seelct"
                @detect="onDetect"
                @error="onError"
                @camera-on="onReady"
                :track="selected.value"
                class="max-w-lg"
              ></qrcode-stream>
            </div>
            <div class="w-full lg:w-auto">
              <select class="select select-bordered select-sm w-full lg:max-w-xs"   v-model="seelct">
                <option disabled selected value="0">เลือกรายการ</option>
                <option value="1">รายการ 1</option>
                <option value="2">รายการ 2</option>
                <option value="3">รายการ 3</option>
              </select>
            </div>
          </div>
          <div class="w-full text-left">Lists</div>
          <div class="overflow-x-auto h-[30vh]">
            <div class="card w-screen bg-base-100 shadow-xl">
              <table class="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <th></th>
                    <th>รหัส</th>
                    <th>code</th>
                    <th>Lotno</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in datalist" :key="index">
                    <th>{{ index }}</th>
                    <td>{{ item.code }}</td>
                    <td>{{ item.title }}</td>
                    <th>{{ item.lot }}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <button class="btn btn-primary">ยืนยัน</button>
        </div>
      </template>
    </AppLayout>
  </div>
</template>

<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";

export default {
  name: "Home",
  components: {
    AppLayout,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
  },
  props: ["showLogin", "showtokens", "token_gameplay"],
  data() {
    const options = [
      { text: "nothing (default)", value: undefined },
      { text: "outline", value: this.paintOutline },
      { text: "centered text", value: this.paintCenterText },
      { text: "bounding box", value: this.paintBoundingBox },
    ];

    const selected = options[1];
    return {
      selected: selected,
      options: options,
      dataset: {
        doc: {
          code: "https://irrelevant-jellyfish.jurassic.ninja/2023/05/22/new/",
        },
        items: { code: "https://qrstud.io/qrmnky" },
      },
      ready: false,
      datalist: [],
      temp: null,
      seelct:0
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
    jwt() {
      return this.$store.getters.jwt;
    },
    game_type() {
      return this.$store.getters.game_type;
    },
  },
  methods: {
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
    paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height },
        } = detectedCode;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#007bff";
        ctx.strokeRect(x, y, width, height);
      }
    },

    paintCenterText(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const { boundingBox, rawValue } = detectedCode;

        const centerX = boundingBox.x + boundingBox.width / 2;
        const centerY = boundingBox.y + boundingBox.height / 2;

        const fontSize = Math.max(
          12,
          (50 * boundingBox.width) / ctx.canvas.width
        );
        console.log(boundingBox.width, ctx.canvas.width);

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = "center";

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#35495e";
        ctx.strokeText(detectedCode.rawValue, centerX, centerY);

        ctx.fillStyle = "#5cb984";
        ctx.fillText(rawValue, centerX, centerY);
      }
    },
    onDetect(detectedCodes) {
      console.log(detectedCodes);
      // if (this.temp == detectedCodes[0].rawValue) {
      //   return;
      // }
      this.temp = detectedCodes[0].rawValue;
      if ((detectedCodes[0].rawValue = this.dataset.doc.code && !this.ready)) {
        this.ready = true;
      }
      if (!detectedCodes[0].rawValue && this.ready) {
        console.log(this.datalist);
        this.datalist.push({
          code: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          title: "BBBBBBBBBBBBBBBBBBBBBBBBB",
          lot: "CCCCCCCCCCCCCCCCCCCCCCCCCCC",
        });
      }

      // console.log(detectedCodes[0].rawValue)
    },
    onReady(capabilities) {
      console.log(capabilities);
    },
    onError(error) {
      if (error.name === "NotAllowedError") {
        console.log("user denied camera access permission");
      } else if (error.name === "NotFoundError") {
        console.log("no suitable camera device installed");
      } else if (error.name === "NotSupportedError") {
        console.log("page is not served over HTTPS (or localhost)");
      } else if (error.name === "NotReadableError") {
        console.log("maybe camera is already in use");
      } else if (error.name === "OverconstrainedError") {
        console.log("did you request the front camera although there is none?");
      } else if (error.name === "StreamApiNotSupportedError") {
        console.log("browser seems to be lacking features");
      }
    },
  },
  mounted() {},
  beforeDestroy() {},
  watch: {
    seelct:function(v){
      console.log(v)
      this.datalist = []
    }
  },
};
</script>