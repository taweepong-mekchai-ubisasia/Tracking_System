<template>
  <div class="Survey" data-theme="winter">
    <AppLayout ref="AppLayout">
      <template #modal> </template>
      <template #view>
        <div class="grid grid-cols-1 gap-8 w-full">
          <div class="text-left w-full mb-4 pt-4">
            <h1 class="text-5xl font-bold text-center">Survey List</h1>
          </div>
          <div
            class="grid gap-4 auto-cols-max grid-flow-row-dense grid-cols-5 grid-rows-3"
          >
            <div
              class="card bg-base-100 shadow-xl card-bordered w-full"
              v-for="i in 20"
              :key="i"
            >
              <figure class="mt-4">
                <img :src="require(`@/assets/images/11.png`)" alt="Shoes" />
              </figure>
              <div class="card-body pt-0">
                <div class="divider"></div>
                <h2 class="card-title">Survey Post</h2>
                <div class="card-actions justify-end">
                  <div class="badge badge-outline">11/11/11</div>
                </div>
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

export default {
  name: "Survey",
  components: {
    AppLayout,
  },
  props: [],
  data() {
    return {};
  },
  computed: {},
  methods: {
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
    fn_decentraland() {
      window.open(this.link_decentraland, `_blank_zepeto`).focus();
    },

    fn_spatial() {
      window.open(this.link_spatial, `_blank_zepeto`).focus();
    },
    fn_zepeto() {
      // let route = this.$router.resolve({ name: name });
      // window.open(`${route.href}`, `_popup_${name}`, "width=600,height=600");
      // return false;
      window.open(this.link_zepeto, `_blank_zepeto`).focus();
    },
    fn_update_roblox() {
      // console.log("UPDATe");
      // this.$emit("update_profile", {roblox:roblox_uuid});
      // this.$emit("update_profile",this.profileUpdate.temp)
      // console.log(this.profileUpdate.temp);
      // let image = { ...this.profileUpdate.temp.image[0] };
      // delete image.temp;
      let obj = {
        // image: this.profileUpdate.temp.image,
        roblox: this.roblox_uuid,
        // lastname: this.profileUpdate.temp.lastname,
        // mobile: this.profileUpdate.temp.mobile,
        // roblox: this.profileUpdate.temp.roblox,
        // rating: this.profileUpdate.temp.rating,
        // coin: this.profileUpdate.temp.coin,
        // type: this.profileUpdate.temp.type,
        // comment_feedback: this.profileUpdate.temp.comment_feedback,

        // image: [image],
      };
      if (this.user.type == "email") {
        obj.image = [image];
      }
      fetch(`${this.ServiceUrl}controllers/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.jwt}`,
        },

        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res.row);
          if (res.success) {
            // alert("SUCCESS");
            if (localStorage.getItem("jwt")) {
              localStorage.setItem("jwt", res.jwt);
            }
            this.$store.commit("user", res.row);
            this.$store.commit("jwt", localStorage.getItem("jwt"));
            this.modal_roblox = false;
            this.getLink(`${this.link_roblox}`, "Roblox");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // openweb(url) {
    //   // let route = this.$router.resolve({ name: name });
    //   window.open(`${url}`, `_popup_${url}`, "width=600,height=600");
    //   return false;
    // },
    // showPopup(name) {
    //   let route = this.$router.resolve({ name: name });
    //   window.open(`${route.href}`, `_popup_${name}`, "width=600,height=600");
    //   return false;
    // },
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
    this.language = localStorage.getItem("language")
      ? localStorage.getItem("language")
      : "th";
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