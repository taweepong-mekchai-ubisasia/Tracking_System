<template>
  <div class="Home" data-theme="winter">
    <AppLayout
      ref="AppLayout"
      @setgame="$emit('setgame')"
      @getgame="$emit('getgame')"
    >
      <template #modal> </template>
      <template #view v-if="user">
        <div class="flex flex-col gap-4 ">
          <div
            class="flex flex-col-reverse lg:flex-row flex-nowrap justify-around items-center gap-4"
          >
            <div v-if="!seelct">
              <h5>กรุณเลือกรายการ</h5>
            </div>
            <div class="max-h-[40vh] h-[40vh] self-center" v-else>
              <qrcode-stream
                @detect="onDetect"
                @error="onError"
                @camera-on="onReady"
                :track="selected.value"
                class="max-w-lg"
              ></qrcode-stream>
            </div>
            <div class="w-full lg:w-auto">
              <div class="join w-full min-w-[20vw]">
                <!-- <SelectSearch
                  :placeholder="'Short code'"
                  :label="'ItemCode'"
                  :code="'ItemCode'"
                  :minChar="3"
                  :delay="0.5"
                  :limit="10"
                  :customClass="`input input-bordered border-base-content ${
                    checkbox == 'M' ? 'input-disabled' : ''
                  }`"
                  :disabled="checkbox == 'M' ? true : false"
                  :current="base.form.item_code"
                  :refresh="refresh"
                  @updateValue="
                    (obj) => {
                      seelct = obj;
                    }
                  "
                  @stopRefresh="
                    (obj) => {
                      refresh = obj.value;
                    }
                  "
                  :url="`${this.serviceUrl}api/controllers/SAP/UBA/oitm`"
                  :param="`&total=1&wh=wh1&rac_list=1`"
                /> -->

                <select
                  class="select select-bordered border-base-content select-sm w-full lg:max-w-xs join-item"
                  v-model="seelct"
                >
                  <option disabled selected value="0">เลือกรายการ</option>
                  <option value="1">รายการ 1</option>
                  <option value="2">รายการ 2</option>
                  <option value="3">รายการ 3</option>
                </select>
                <div class="indicator">
                  <button class="btn btn-primary btn-sm join-item">
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="seelct">
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
          </div>
        </div>
      </template>
    </AppLayout>
  </div>
</template>

<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import SelectSearch from "@/components/App/Module/Global/SelectSearch.vue";

export default {
  name: "Home",
  components: {
    AppLayout,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
    SelectSearch,
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
      seelct: 0,
      base: {
        rows: [],
        total: 0,
        page: 1,
        bay: 20,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: null,
      },
    };
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      return this.$store.getters.user_token;
    },
    user() {
      return this.$store.getters.user;
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
      let ar = JSON.parse(detectedCodes[0].rawValue);
      let itemCode = ar[0].split(" : ")[1];
      // console.log( );
      // if (this.temp == detectedCodes[0].rawValue) {
      //   return;
      // }
      // this.temp = detectedCodes[0].rawValue;
      // if ((detectedCodes[0].rawValue = this.dataset.doc.code && !this.ready)) {
      //   this.ready = true;
      // }
      if (itemCode) {
        console.log(this.datalist);
        this.getList(itemCode, (res) => {
          console.log(res);
        });
        // this.datalist.push({
        //   code: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        //   title: "BBBBBBBBBBBBBBBBBBBBBBBBB",
        //   lot: "CCCCCCCCCCCCCCCCCCCCCCCCCCC",
        // });
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

    getList(itemCode, callback) {
      let vm = this;
      fetch(
        `${this.serviceUrl}api/controllers/tracking?DBType=mysqli&rows=20&total=1&itemCode=${itemCode}&transRef=I&quantitys=1&warehouse=wh1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          callback(res);
          // console.log(res)
          // res.rows.forEach((v, i) => {
          //   console.log(v.image ? true : false);
          //   res.rows[i].image = v.image ? JSON.parse(v.image) : [];
          //   if (v.type == "decentraland") {
          //     console.log(v.link);
          //     this.decentraland = v.link;
          //   }
          //   console.log();
          //   res.rows[i].master = 0;
          // });
          // this.explore = res;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  mounted() {
    // this.getList();
  },
  beforeDestroy() {},
  watch: {
    seelct: function (v) {
      console.log(v);
      this.datalist = [];
    },
    user: function (val) {
      if (!val) {
        return;
      }
      console.log(this.user.access);
      !this.user.access["WH"]
        ? this.$router.push({ name: `404` })
        : !this.user.access["WH"][this.$route.name]
        ? this.$router.push({ name: `404` })
        : "";
    },
  },
};
</script>
