<template>
  <!-- <div
  data-theme="wireframe"
    class="w-full bottom-0 bg-black bg-opacity-80 text-white p-6"
    style="z-index: 1000"
    :class="`${!getcookie || getcookie == `` ? `absolute` : `hidden`}`"
  >
    <div class="text-center">
      <div class="text-xl">เว็บไซต์นี้มีการใช้คุกกี้</div>

      <div class="hero">
        <div class="flex-col justify-center hero-content lg:flex-row">
          <div class="text-center lg:text-left">
            <p class="mb-5 text-white">
              เพื่อเพิ่มประสิทธิภาพการให้บริการ ท่านยินยอมให้เว็บไซต์นี้จัดเก็บ
              "คุกกี้"

              <a
                href="https://pdpa.thaihealth.or.th/content/cookiepolicy"
                target="_blank"
                ><span style="color: orange">[นโยบายการใช้คุกกี้]</span>
              </a>
              ลงในอุปการณ์ของท่านใช่หรือไม่
              ท่านสามารถอ่านและทำความเข้าใจนโยบายการคุ้มครองข้อมูลส่วนบุคคล
              และการใช้คุกกี้ได้ที่
              <a
                href="https://pdpa.thaihealth.or.th/content/policy"
                target="_blank"
                ><span style="color: orange"
                  >[นโยบายการคุ้มครองส่วนบุคคล]</span
                ></a
              >
            </p>
          </div>
          <div class="flex-shrink-0 w-full w-max">
            <div class="btn-group ">
              <button class="btn" @click="cookie_accept()">
                ยินยอม
              </button>
              <button class="btn btn-secondary" @click="cookie_not_accept()">
                ไม่ยินยอม
              </button>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="scroll-smooth">
    <router-view
      ref="view"
      :showLogin="showLogin"
      :showtokens="showtokens"
      :token_gameplay="token_gameplay"
      @response="
        (val) => {
          showLogin = val;
        }
      "
      @setgame="setgame"
      @getgame="getgame"
    />
  </div>
</template>
<script>
export default {
  name: "app",
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user() {
      return this.$store.getters.user;
    },
    jwt() {
      return this.$store.getters.jwt;
    },
  },
  data() {
    return {
      version: "0.00.1",
      showLogin: false,
      showtokens:false,
      token_gameplay :{},
      getcookie: "",
      // gamelist: { rows: [], total: 0 },
    };
  },
  methods: {
    getgame() {
      // console.log(this.user.row.veridated_at)
      if (!this.user.row.veridated_at) {
        return;
      }
      // if(this.user)
      let vm = this;
      fetch(`${this.ServiceUrl}controllers/gameplay`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${vm.jwt}`,
        },
        // body: JSON.stringify({
        //   code: vm.$route.query.gp_code,
        // }),
      })
        .then((response) => response.json())
        .then((res) => {
          // console.log(res)

          // console.log(res)
          // this.gamelist = res.rows;
          this.$store.commit("gamelist", res);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    setgame() {
      let vm = this;
      if (!vm.$route.query.gp_code) {
        return;
      }
      let gp_code = vm.$route.query.gp_code;
      vm.$router.push({ query: {} });

      fetch(`${this.ServiceUrl}controllers/maping`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${vm.jwt}`,
        },
        body: JSON.stringify({
          code: gp_code,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            // console.log(res);
            vm.$router.push({ query: {} });
            vm.showtokens = true
            if(vm.user){
            vm.getgame();}

            return;
          }
          alert(res.errorMsg);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    setCookie(cname, cvalue, exdays) {
      let d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      // console.log(ca)
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    cookie_accept() {
      this.setCookie("cookie_accept", "accept", 365);
      this.getcookie = this.getCookie("cookie_accept");
      // console.log(this.getcookie)
      // $(".main_cookie").fadeOut("slow", function () {
      //   $(".main_cookie").addClass("hidden");
      // });
    },
    cookie_not_accept() {
      this.getcookie = "no";
      // $(".main_cookie").fadeOut("slow", function () {
      //   $(".main_cookie").addClass("hidden");
      // });
    },
  },
  mounted() {
    this.getcookie = this.getCookie("cookie_accept");
  },
  created() {
    //  console.log(this.$route)
    //     console.log(this.$route.query)
  },
  watch: {
    // "$route.query": function (val) {
    //   console.log(val);
    //   let vm = this;
    //   if (val.test && val.type) {
    //     fetch(`${this.ServiceUrl}controllers/gameplay`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         // Authorization: `Bearer ${this.jwt}`,
    //       },
    //       body: JSON.stringify({
    //         game_uid: "1234",
    //         game_type: val.type,
    //       }),
    //     })
    //       .then((response) => response.json())
    //       .then((res) => {
    //         if (res.success) {
    //           // this.token_gameplay = res.row
    //           console.log(res.row.game_type)
    //           vm.$store.commit("game_type", res.row.game_type);

    //           console.log("game_typegame_typegame_typegame_typegame_typegame_typegame_typegame_typegame_typegame_typegame_typegame_typegame_typegame_typegame_typegame_type")
    //           console.log(res.row.game_type)
    //           // localStorage.setItem("game_type",res.row.game_type)
    //           vm.$router.push({ query: { gp_code: res.row.code } });
    //           // alert("SUCCESS : " + res.row.code);
    //           // vm.$store.commit("isLogin", true);
    //           // vm.$store.commit("user", res.user);
    //           // this.$refs.view.modal_tokens = true;
       
    //           // console.log
    //           return;
    //         }
    //         // else {
    //         //   vm.$store.commit("isLogin", false);
    //         //   vm.$store.commit("jwt", false);
    //         //   localStorage.removeItem("jwt");
    //         // }
    //         alert(res.errorMsg);
    //       })
    //       .catch((error) => {
    //         vm.$store.commit("isLogin", false);
    //         vm.$store.commit("jwt", false);
    //         localStorage.removeItem("jwt");
    //         console.error("Error:", error);
    //       });

    //     // fetch(`http://localhost/anyi/aroca/controllers/gameplay`, {
    //     //   method: "POST",
    //     //   headers: {
    //     //     "Content-Type": "application/json",
    //     //   },
    //     //   body: JSON.stringify({
    //     //     game_uid: "1234",
    //     //     game_type: "test",
    //     //   }),
    //     // })
    //     //   .then((response) => response.json())
    //     //   .then((res) => {
    //     //     console.log(res);
    //     //     if (res.success) {
    //     //       // vm.$route.query.gp_code = res.row.code
    //     //       vm.$router.push({ query: { gp_code: res.row.code } });

    //     //       alert("SUCCESS : " + res.row.code);
    //     //       // vm.$emit("changetab", "login");
    //     //       // vm.booking.modal = false;
    //     //       // vm.$refs.layout.profile.checked = true;
    //     //       // vm.$refs.layout.tab.profile = "orderhistory";
    //     //       // return;
    //     //     }
    //     //     alert(res.errorMsg);
    //     //   })
    //     //   .catch((error) => {
    //     //     console.error("Error:", error);
    //     //   });
    //   }
    //   // console.log(val.gp_code);
    //   if (val.gp_code) {
    //     console.log(val.gp_code);
    //     console.log(this.jwt);
    //     // console.log(this.$refs.view.modal_tokens)
    //     // console.log(this.showLogin)
    //     if (!this.jwt) {
    //       this.showLogin = true;
        
    //       // console.log(this.showLogin);
    //       return;
    //     } else {
        
    //       this.setgame(this.jwt);
    //     }
    //     //
    //     // fetch(`${this.ServiceUrl}controllers/maping`, {
    //     //   method: "POST",
    //     //   headers: {
    //     //     "Content-Type": "application/json",
    //     //     Authorization: `Bearer ${this.jwt}`,
    //     //   },
    //     //   body: JSON.stringify({
    //     //     code: val.gp_code,
    //     //   }),
    //     // })
    //     //   .then((response) => response.json())
    //     //   .then((res) => {
    //     //     if (res.success) {
    //     //       console.log(res)
    //     //       this.$router.push({ query: { gp_code: res.row.code } });
    //     //       // alert("SUCCESS : " + res.row.code);
    //     //       // this.$store.commit("isLogin", true);
    //     //       // this.$store.commit("user", res.user);
    //     //       return
    //     //     }
    //     //     // else {
    //     //     //   this.$store.commit("isLogin", false);
    //     //     //   this.$store.commit("jwt", false);
    //     //     //   localStorage.removeItem("jwt");
    //     //     // }
    //     //     alert(res.errorMsg);
    //     //   })
    //     //   .catch((error) => {
    //     //     this.$store.commit("isLogin", false);
    //     //     this.$store.commit("jwt", false);
    //     //     localStorage.removeItem("jwt");
    //     //     console.error("Error:", error);
    //     //   });

    //     // fetch(`http://localhost/anyi/aroca/controllers/maping`, {
    //     //   method: "POST",
    //     //   headers: {
    //     //     "Content-Type": "application/json",
    //     //     Authorization: `Bearer ${this.jwt}`,
    //     //   },
    //     //   body: JSON.stringify({
    //     //     code: val.gp_code,
    //     //   }),
    //     // })
    //     //   .then((response) => response.json())
    //     //   .then((res) => {
    //     //     console.log(res);
    //     //     if (res.success) {
    //     //       this.$router.push({ query: { gp_code: res.row.code } });
    //     //       alert("SUCCESS : " + res.row.code);
    //     //     }
    //     //     alert(res.errorMsg);
    //     //   })
    //     //   .catch((error) => {
    //     //     console.error("Error:", error);
    //     //   });
    //   }
    // },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap');

#app,
html,
* {
  // font-family: Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  //   Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    //  font-family: 'IBM Plex Sans Thai', sans-serif;
    // font-weight: 500; 
  // --font-mono: "Fira Mono", monospace;
  --pure-white: #ffffff;
  --primary-color: #b9c6d2;
  --secondary-color: #d0dde9;
  --tertiary-color: #edf0f8;
  --accent-color: #ff3e00;
  --heading-color: rgba(0, 0, 0, 0.7);
  --text-color: #444444;
  --background-without-opacity: rgba(255, 255, 255, 0.7);
  --column-width: 42rem;
  --column-margin-top: 4rem;
  scroll-behavior: smooth;
}

body {
  /* background-color: red; */
  height: 100dvh;
  --tw-bg-opacity: 1;
  background-color: var(--fallback-b2, oklch(var(--b2) / 1));
  background-color: var(--fallback-b2, oklch(var(--b2) / var(--tw-bg-opacity)));
}
[data-theme="ubis"] .menu li > *:not(ul):not(.menu-title):not(details):active, .menu li > *:not(ul):not(.menu-title):not(details).active, .menu li > details > summary:active {
  border-width: 2px;
  border-color: rgba(180, 180, 180, 0.2);
  color: white !important;
}

body::before {
  content: "";
  width: 80vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 10vw;
  z-index: -1;
  background: radial-gradient(
    50% 50% at 50% 50%,
    var(--pure-white) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0.05;
}

#svelte {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

h1,
h2,
p {
  font-weight: 400;
  color: var(--heading-color);
}

p {
  line-height: 1.5;
}

a {
  color: var(--accent-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

h1 {
  font-size: 2rem;
  text-align: center;
}

h2 {
  font-size: 1rem;
}

pre {
  font-size: 16px;
  font-family: var(--font-mono);
  background-color: rgba(255, 255, 255, 0.45);
  border-radius: 3px;
  box-shadow: 2px 2px 6px rgb(255 255 255 / 25%);
  padding: 0.5em;
  overflow-x: auto;
  color: var(--text-color);
}

input,
button {
  font-size: inherit;
  font-family: inherit;
}

button:focus:not(:focus-visible) {
  outline: none;
}

@media (min-width: 720px) {
  h1 {
    font-size: 2.4rem;
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
/* width */
::-webkit-scrollbar {
  width: 3.5px;
  height: 3.5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #b6b6b6;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #a4a4a4;
}
</style>