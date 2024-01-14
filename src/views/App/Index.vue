<template>
  <div class="Home" data-theme="winter">
    <AppLayout
      ref="AppLayout"
      @setgame="$emit('setgame')"
      @getgame="$emit('getgame')"
    >
      <template #modal> </template>
      <template #view>
       Coming soon
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
      // modal_roblox: false,
      // roblox_uuid: "",
      // link_roblox: null,
      // decentraland: null,
      // modal_zepeto: false,
      // link_zepeto: null,

      // modal_decentraland: false,
      // link_decentraland: null,

      // modal_spatial: false,
      // link_spatial: null,

      // slide: [
      //   // "./img/Visual_01_shadow.png",
      //   "@/assets/images/Landing_Page_Edit/Head Page_No text.png",
      //   // "https://s3-ap-northeast-1.amazonaws.com/psh-ex-ftnikkei-3937bb4/images/2/4/4/9/39219442-1-eng-GB/photo_SXM2022021500001571.png",
      //   // "https://venturebeat.com/wp-content/uploads/2021/03/article23-1.jpg?w=1200&strip=all",
      //   // "https://beaconvcfund.sgp1.cdn.digitaloceanspaces.com/2022/06/metaverse-cover-1288x724-1.jpeg",
      // ],
      // example_text: `test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test`,
      // token: {},
      // // game_type : null,
      // modal_tokens: false,
      // // tab: {
      // //   join: "login",
      // //   profile: "profile",
      // // },
      // language: "th",
      // carousel: 0,
      // interval: null,
      dataset: {
        doc: {
          code: "https://irrelevant-jellyfish.jurassic.ninja/2023/05/22/new/",
        },
        items: { code: "https://qrstud.io/qrmnky" },
      },
      ready: false,
      datalist: [],
      temp: null,
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
    mouseup(e) {
      console.log(e);
    },
    touchmove(e) {
      console.log(e);
    },
    next() {
      if (this.carousel >= 3) {
        this.carousel = 0;
      } else {
        this.carousel++;
      }
    },
    back() {
      if (this.carousel <= 0) {
        this.carousel = 3;
      } else {
        this.carousel--;
      }
    },

    getgamelist() {
      let vm = this;
      fetch(`${this.ServiceUrl}controllers/game`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          res.rows.forEach((v, i) => {
            console.log(v.image ? true : false);
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            if (v.type == "decentraland") {
              console.log(v.link);
              this.decentraland = v.link;
            }
            console.log();
            res.rows[i].master = 0;
          });
          this.explore = res;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    getLink(web, type) {
      console.log(web, type);
      // return
      if (type.toLowerCase() == "decentraland") {
        this.modal_decentraland = true;
        this.link_decentraland = web;
        return;
        // <label for="my-modal-5" class="btn">open modal</label>
      }
      if (type.toLowerCase() == "spatial") {
        this.modal_spatial = true;
        this.link_spatial = web;
        return;
        // <label for="my-modal-5" class="btn">open modal</label>
      }

      if (type.toLowerCase() == "roblox" && !this.user.row.roblox) {
        this.modal_roblox = true;
        this.link_roblox = web;
        this.roblox_uuid = "";

        return;
        // <label for="my-modal-5" class="btn">open modal</label>
      }
      if (type.toLowerCase() == "zepeto") {
        this.modal_zepeto = true;
        this.link_zepeto = web;
        return;
        // <label for="my-modal-5" class="btn">open modal</label>
      }

      return window.open(web, "_blank").focus();
    },
    Logout() {
      this.$refs.LoginComponent.Logout();
      this.$refs.AppLayout.joinnows.checked = true;
      this.$refs.AppLayout.profile.checked = false;
    },
    // removeStorage(){
    //   localStorage.removeItem('game_type')
    // }
    loadVideo(id) {
      let video = document.getElementsByClassName(`video-${id}`);
      // let video1 = document.getElementsByClassName("video-1");
      // let video2 = document.getElementsByClassName("video-2");
      // let video3 = document.getElementsByClassName("video-3");
      // console.log(video0)
      if (!video.paused) {
        return;
      }
      for (let key in video) {
        let vi = video[key];
        if (vi.classList) {
          vi.currentTime > 0 && !vi.paused && !vi.ended && vi.readyState > 2
            ? ""
            : vi.play();
        }
      }
      // for (let key in video1) {
      //   let vi = video1[key];
      //   if (vi.classList) {
      //     vi.currentTime > 0 && !vi.paused && !vi.ended && vi.readyState > 2
      //     ? ""
      //     : vi.play();
      //   }

      // }
      // for (let key in video2) {
      //   let vi = video2[key];
      //   if (vi.classList) {
      //     vi.currentTime > 0 && !vi.paused && !vi.ended && vi.readyState > 2
      //     ? ""
      //     : vi.play();
      //   }

      // }

      // for (let key in video3) {
      //   let vi = video3[key];
      //   if (vi.classList) {
      //     vi.currentTime > 0 && !vi.paused && !vi.ended && vi.readyState > 2
      //     ? ""
      //     : vi.play();
      //   }

      // }
    },
  },
  mounted() {
    // this.interval = setInterval(() => {
    //   this.next();
    // }, 10000);
    this.language = localStorage.getItem("language")
      ? localStorage.getItem("language")
      : "th";
    // new Vue({
    //     el: "#app",
    // });

    // video.src = "http://iandevlin.github.io/mdn/video-player/video/tears-of-steel-battle-clip-medium.mp4";
    // video.play();
    // this.game_type = localStorage.getItem('game_type')?localStorage.getItem('game_type'):null
    // localStorage.removeItem('game_type')
    // console.log("game_type"+this.game_type)
    // this.getgamelist();
  },
  //   updated(){
  //     console.log('updated')
  //     this.interval?clearInterval(this.interval):''
  // this.interval = setInterval(()=>{
  //   this.carousel++
  // },1000)
  //   },
  beforeDestroy() {},
  watch: {
    // ready: function (val) {
    //   if (val == true) {
    //     this.loadVideo(0);
    //     this.loadVideo(1);
    //     this.loadVideo(2);
    //     this.loadVideo(3);
    //   }
    // },
    showLogin: function (val) {
      this.$emit("response", false);
      this.$refs.AppLayout.joinnows.checked = true;
    },
    showtokens: function (val) {
      console.log(
        "showtokensshowtokensshowtokensshowtokensshowtokensshowtokensshowtokensshowtokens"
      );
      console.log(this.showtokens);
      console.log(this.game_type);
      if (this.showtokens && this.game_type) {
        this.modal_tokens = val;
        // this.$store.commit("game_type", null);
      }
    },
    gamelist: function (val) {
      this.image.forEach((v, i) => {
        this.image[i].active = false;
      });

      if (val.total == 0) {
        return;
      }
      // console.log(this.image)
      // console.log(val)
      val.rows.forEach((v, i) => {
        let index = this.image.findIndex((va) => va.title == v.game_type);

        if (index >= 0) {
          // console.log(v,index);
          this.image[index].active = true;
        }
      });
    },
  },
};
</script>

<style>
img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}
p,
div {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 1em;
}
button:disabled {
  background: #fff;
  color: #ddd;
  cursor: not-allowed;
}
</style>

<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  /* border: 5px solid white; */
  color: whitesmoke;
  width: 100px;
  height: 100px;
}

.carousel__icon {
  width: 75px;
  height: 75px;
}

.carousel__pagination {
  position: absolute;
  bottom: 40px;
  z-index: 1;
  width: 100%;
  place-content: center;
}

.carousel__pagination-button::after {
  width: 20px;
  height: 20px;
  border-radius: 100px;
  /* color: whitesmoke; */
  background: rgba(255, 255, 255, 0.35);
}
.carousel__pagination-button:hover::after,
.carousel__pagination-button--active::after {
  background-color: whitesmoke;
}
</style>