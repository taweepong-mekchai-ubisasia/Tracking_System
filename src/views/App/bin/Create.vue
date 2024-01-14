<template>
  <div class="Posting" data-theme="winter">
    <AppLayout
      ref="AppLayout"
      @setgame="$emit('setgame')"
      @getgame="$emit('getgame')"
    >
      <template #modal> </template>
      <template #view>
        <div class="hero min-h-screen bg-base-100">
          <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="grid grid-cols-1 gap-8">
              <div class="text-left w-full mb-4 ">
                <h1 class="text-5xl font-bold text-center">Choose your method</h1>
                <!-- <p class="py-6">Message detail ..... bra bra bra</p>
              <button
                class="btn btn-lg btn-primary shadow-lg text-white border-transparent hover:border-transparent rounded-2xl"
                style="
                  border: unset;
                  background-image: linear-gradient(to right, #47cdd0, #abedd9);
                "
              >
                Create Post
              </button> -->
              </div>
              <!-- <img
              :src="require(`@/assets/images/aaaa.png`)"
              class="rounded-lg md:w-full lg:w-1/2"
            /> -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div class="card bg-base-100 card-bordered hover:shadow-lg border-2 border-slate-200 cursor-pointer"   @click=" this.$router.push({ name: `CreateSurvey` });">
                    <figure class="mt-8">
                      <img
                        :src="require(`@/assets/images/11.png`)"
                        alt="Shoes"
                      />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">Survey Post</h2>
                      <p>text detail .............. bra bra bra</p>
                      <!-- <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div> -->
                    </div>
                  </div>
                </div>
                <!-- ... -->
                <div>
                  <div class="card bg-base-100 card-bordered hover:shadow-lg border-2 border-slate-200 cursor-pointer"   @click="this.$router.push({ name: `CreateAdvertising` });">
                    <figure class="mt-8">
                      <img
                        :src="require(`@/assets/images/22.png`)"
                        alt="Shoes"
                      />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">Advertising Post</h2>
                      <p>text detail .............. bra bra bra</p>
                      <!-- <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div> -->
                    </div>
                  </div>
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
  name: "Posting",
  components: {
    AppLayout,
  },
  props: ["showLogin", "showtokens", "token_gameplay"],
  data() {
    return {
      modal_roblox: false,
      roblox_uuid: "",
      link_roblox: null,
      decentraland: null,
      modal_zepeto: false,
      link_zepeto: null,

      modal_decentraland: false,
      link_decentraland: null,

      modal_spatial: false,
      link_spatial: null,
      image: [
        {
          title: "Candy",
          active: false,
          image: {
            block: "_Candy.png",
            active: "Candy.png",
          },
        },
        {
          title: "Fire",
          active: false,
          image: {
            block: "_Fire.png",
            active: "Fire.png",
          },
        },
        {
          title: "Force",
          active: false,
          image: {
            block: "_Force.png",
            active: "Force.png",
          },
        },
        {
          title: "GP_Suit",
          active: false,
          image: {
            block: "_GP_Suit.png",
            active: "GP_Suit.png",
          },
        },
        {
          title: "Kinght",
          active: false,
          image: {
            block: "_Kinght.png",
            active: "Kinght.png",
          },
        },
        {
          title: "MSMK_Suit",
          active: false,
          image: {
            block: "_MSMK_Suit.png",
            active: "MSMK_Suit.png",
          },
        },
      ],
      explore: {
        // decentraland: {
        //   image:
        //     "https://nftevening.com/wp-content/uploads/2021/08/featuredddddd.jpg",
        // },
        // roblox: {
        //   image:
        //     "https://media.wired.com/photos/604be13a1d09b7f18fe49d6c/125:94/w_1436,h_1080,c_limit/Gear-Roblox-jailbreak_1920x1080.jpg",
        // },
        // zepeto: {
        //   image:
        //     "https://assets.moguravr.com/uploads/2021/12/202112081801837000.jpg",
        // },
        // spatial: {
        //   image:
        //     "https://dd2cgqlmnwvp5.cloudfront.net/spatial.io/vid/1080/posters/park-no-avatars.jpg",
        // },
      },
      slide: [
        // "./img/Visual_01_shadow.png",
        "@/assets/images/Landing_Page_Edit/Head Page_No text.png",
        // "https://s3-ap-northeast-1.amazonaws.com/psh-ex-ftnikkei-3937bb4/images/2/4/4/9/39219442-1-eng-GB/photo_SXM2022021500001571.png",
        // "https://venturebeat.com/wp-content/uploads/2021/03/article23-1.jpg?w=1200&strip=all",
        // "https://beaconvcfund.sgp1.cdn.digitaloceanspaces.com/2022/06/metaverse-cover-1288x724-1.jpeg",
      ],
      example_text: `test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test`,
      token: {},
      // game_type : null,
      modal_tokens: false,
      // tab: {
      //   join: "login",
      //   profile: "profile",
      // },
      language: "th",
      carousel: 0,
      interval: null,
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
      fetch(`${this.ServiceUrl}api/controllers/user`, {
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
      fetch(`${this.ServiceUrl}api/controllers/game`, {
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