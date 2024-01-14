<template>
  <div class="card-body overflow-auto" style="max-height: inherit;" v-if="!isLogin">
    <div class="text-xl font-bold">LOG IN OR CREATE AN ACCOUNT</div>
    <div class="text-md">Log in with social</div>
    <div class="flex flex-col w-full border-opacity-50">
      <div class="grid h-20 card rounded-box place-items-center">
        <div class="grid gap-4 grid-cols-1 w-full" v-if="isLogin">
          <div class="form-control">
            <div
              @click="Logout"
              :class="`
                          btn btn-circle btn-xs
                          sm:btn-sm
                          md:btn-md
                          lg:btn-lg
                          bg-black
                          text-white
                          border-black
                          w-full`"
            >
              Logout
            </div>
          </div>
        </div>
        <div class="grid gap-4 md:grid-cols-2 grid-cols-1 w-full" v-else>
          <div class="form-control">
            <!-- <v-facebook-login
              v-model="model"
              @sdk-init="handleSdkInit"
              @login="fb_login"
              :class="` btn btn-circle
                        btn-sm
                        md:btn-md
                        lg:btn-lg
                        bg-black
                        text-white
                        border-black
                        w-full`"
              app-id="1143730129547879"
              :style="`display: flex;`"
            >
              <template #login>Facebook</template>

              <template #logout>ออกจากระบบ</template>

              <template #working>กำลังตรวจสอบ</template>
            </v-facebook-login> -->
          </div>
          <div class="form-control">
            <div>
              <!-- <h1>IsInit: {{ Vue3GoogleOauth.isInit }}</h1>
                          <h1>IsAuthorized: {{ Vue3GoogleOauth.isAuthorized }}</h1>
                          <h2 v-if="user">signed user: {{ user }}</h2> -->
              <!-- <button
                class="
                  btn btn-circle btn-sm
                  md:btn-md
                  lg:btn-lg
                  bg-black
                  text-white
                  border-black
                  w-full
                "
                @click="handleClickSignIn"
                v-if="Vue3GoogleOauth.isInit && !Vue3GoogleOauth.isAuthorized"
              >
                Google
              </button> -->
              <!-- <button
                          class="
                            btn btn-circle btn-xs
                            sm:btn-sm
                            md:btn-md
                            lg:btn-lg
                            bg-black
                            text-white
                            border-black
                            w-full
                          "
                          @click="handleClickGetAuthCode"
                          v-if="Vue3GoogleOauth.isInit"
                        >
                          get authCode
                        </button> -->
              <!-- <button
                class="
                  btn btn-circle btn-sm
                  md:btn-md
                  lg:btn-lg
                  bg-black
                  text-white
                  border-black
                  w-full
                "
                @click="handleClickSignOut"
                v-if="Vue3GoogleOauth.isAuthorized"
              >
                sign out
              </button> -->
              <!-- <button
                          class="
                            btn btn-circle btn-xs
                            sm:btn-sm
                            md:btn-md
                            lg:btn-lg
                            bg-black
                            text-white
                            border-black
                            w-full
                          "
                          @click="handleClickDisconnect"
                          :disabled="!Vue3GoogleOauth.isAuthorized"
                        >
                          disconnect
                        </button> -->
            </div>
          </div>
        </div>
      </div>
      <div class="divider">OR</div>
      <div class="text-md">ENTER YOUR MEMBERS CREDENTIALS</div>
      <div class="text-md text-xs bg-base-300" v-if="re_password">
        {{ re_password }}
      </div>

      <div class="form-control grid mt-4">
        <label class="label">
          <span class="label-text">Email Address*</span>
        </label>
        <input
          type="text"
          placeholder="Email Address*"
          class="input input-bordered"
          v-model="authen.form.email"
          @keyup.enter="(authen.form.password && authen.form.password.length < 8) || errorMsgemail || process ? '' : login()"
          :class="errorMsgemail ? 'input-error' : ''"
        />
        <label class="label" :class="errorMsgemail ? '' : 'hidden'">
          <span class="label-text-alt text-error">{{ errorMsgemail }}</span>
          <!-- <span class="label-text-alt">Alt label</span> -->
        </label>
      </div>
      <div class="form-control grid mt-4">
        <label class="label">
          <span class="label-text">Password*</span>
        </label>
        <!-- <input
          type="password"
          placeholder="Password*"
          class="input input-bordered"
          v-model="authen.form.password"
          @keyup.enter="login()"
        /> -->
        <div class="relative">
          <input
            placeholder="Password*"
            :type="showpassword ? 'password' : 'text'"
            class="input input-bordered text-md w-full"
            v-model="authen.form.password"
            @keyup.enter="(authen.form.password && authen.form.password.length < 8) || errorMsgemail || process ? '' : login()"
            :class="authen.form.password && authen.form.password.length < 8  ? 'input-error' : ''"
          />
          <div
            class="
              absolute
              inset-y-0
              right-0
              pr-3
              flex
              items-center
              text-sm
              leading-5
            "
          >
            <font-awesome-icon
              icon="fa-solid fa-eye"
              @click="showpassword = !showpassword"
              :class="{ hidden: !showpassword, block: showpassword }"
            />
            <font-awesome-icon
              icon="fa-sharp fa-solid fa-eye-slash"
              @click="showpassword = !showpassword"
              :class="{ block: !showpassword, hidden: showpassword }"
            />
          </div>
        </div>
        <label
          class="label"
          :class="authen.form.password && authen.form.password.length < 8 ? '' : 'hidden'"
        >
          <span class="label-text-alt text-error">{{
            authen.form.password && authen.form.password.length < 8 ? "Password require min 8 characters." : ""
          }}</span>
          <!-- <span class="label-text-alt">Alt label</span> -->
        </label>
      </div>
      <div class="form-control grid mt-4 mb-4">
        <div class="flex w-full">
          <div class="rounded-box">
            <label class="label cursor-pointer">
              <input
                type="checkbox"
                checked="checked"
                class="checkbox"
                v-model="remember"
              />
              <span class="label-text pl-2">Remember me</span>
            </label>
          </div>
          <div class="grid flex-grow rounded-box justify-end">
            <label class="label">
              <a
                href="#"
                class="label-text-alt link link-hover font-bold"
                @click="$emit('changetab', 'forgot-password')"
              >
                Forgot password?
              </a>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="form-control">
      <div
        class="alert shadow-lg"
        v-if="success || errorMsg"
        :class="`${success ? `alert-success` : `alert-error`}`"
      >
        <div>
          <svg
            v-if="this.success"
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ success ? success : errorMsg }}</span>
        </div>
      </div>
    </div>
    <div class="form-control">
      <button
        class="
          btn btn-sm
          md:btn-md
          lg:btn-lg
          bg-black
          text-white
          border-black
          w-full
        "
        @click="(authen.form.password && authen.form.password.length < 8) || errorMsgemail || process ? '' : login()"
      >
        Login
      </button>
    </div>
    <div class="form-control">
      <p class="label-text-alt">
        You don't have an account yes?
        <a
          href="#"
          class="label-text-alt link link-hover font-bold"
          @click="$emit('changetab', 'register')"
          >Join now!
        </a>
      </p>
    </div>
  </div>
</template>
<script>
// import VFacebookLogin from "vue-facebook-login-component-next";
import { inject, toRefs } from "vue";
export default {
  name: "Login",
  components: {
    // VFacebookLogin,
  },
  props: ["tab", "re_password"],
  data() {
    return {
      showpassword: true,
      remember: false,
      facebook: null,
      errorMsgemail: "",
      FB: {},
      model: {},
      scope: {},
      authen: {
        form: {
          email: "",
          password: "",
        },
      },
      success: "",
      errorMsg: "",
      interval: null,
      process: false,
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
  },
  setup(props) {
    const { isSignIn } = toRefs(props);
    // const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    const handleClickLogin = () => {};
    return {
      // Vue3GoogleOauth,
      handleClickLogin,
      isSignIn,
    };
  },
  methods: {
    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.errorMsgemail = "";
      } else {
        this.errorMsgemail = "Invalid Email Address";
      }
    },
    login() {
      this.process = true;
      this.errorMsg = "";
      fetch(`${this.ServiceUrl}controllers/authentication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "email",
          email: this.authen.form.email,
          password: this.authen.form.password,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          this.process = false;
          if (res.success) {
            if (this.remember) {
              localStorage.setItem("jwt", res.jwt);
            }
            this.$store.commit("jwt", res.jwt);
            this.$emit("setJoinnows");
            return;
          }
          //  else {
          this.errorMsg = res.errorMsg
            ? res.errorMsg
            : "Incorrect email or password, please try again.";
          localStorage.removeItem("jwt");
          // localStorage.removeItem("_a");
          // }
          // callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          this.errorMsg = error;
        });
    },
    fb_login(response) {
      this.process = true;
      this.errorMsg = "";
      console.log(response);
      this.facebook = response;
      // let vm = this;
      // this.facebook.isAuthorized = true;
      //   this.$refs.joinnows.checked = false;
      this.$emit("setJoinnows");
      if (!response) {
        return;
      }

      // this.FB.login(function (response) {
      //   // console.log(this.FB);
      //   console.log(vm.facebook);
      //   vm.facebook = response;

      //   // console.log(vm.facebook);
      //   // console.log(response);
      //   if (response.authResponse) {
      //     console.log("Welcome!  Fetching your information.... ");
      //     // console.log(FB.getAccessToken());
      //     // FB.api("/me", function (response) {
      //     //   console.log(response);
      //     //   console.log("Good to see you, " + response.name + ".");
      //     // });
      //   } else {
      //     console.log("User cancelled login or did not fully authorize.");
      //   }
      // });
    },
    // Logout() {
    //   console.log("LOGOUT");
    //   let vm = this;
    //   // console.log(this.facebook);

    //   console.log(this.Vue3GoogleOauth.isAuthorized);
    //   console.log(this.user);
    //   if (this.user.type == "fb") {
    //     FB.logout(function (response) {
    //       // user is now logged out
    //       console.log(response);
    //       vm.facebook = null;
    //     });
    //   } else if (this.user.type == "gmail") {
    //     this.handleClickSignOut();
    //   } else {
    //     console.log("ESELSE");
    //   }

    //   localStorage.removeItem("jwt");
    //   this.$store.commit("jwt", null);
    //   this.$store.commit("user", null);
    //   this.$store.commit("isLogin", false);

    //   //   this.$emit("setLogout");
    // },
    // handleSdkInit({ FB, scope }) {
    //   this.FB = FB;
    //   console.log(scope);
    //   this.scope = scope;
    // },
    //////////////////// GMAIL
    async handleClickSignIn() {
      this.process = true;
      this.errorMsg = "";
      try {
        // const googleUser = await this.$gAuth.signIn();
        // if (!googleUser) {
        //   return null;
        // }
        // console.log("googleUser", googleUser);
        // this.user = googleUser.getBasicProfile().getEmail();
        // console.log("getId", this.user);
        // console.log("getBasicProfile", googleUser.getBasicProfile());
        // console.log("getAuthResponse", googleUser.getAuthResponse());
        // console.log(
        //   "getAuthResponse",
        //   this.$gAuth.instance.currentUser.get().getAuthResponse()
        // );
        this.$emit("setJoinnows");
        // fetch()

        //   fetch(
        //     `https://accounts.google.com/o/oauth2/token?client_id=594749811693-j8rrlliai8tkj81gh65vi5f3tgd02seq.apps.googleusercontent.com&code=ya29.a0Aa4xrXOSkF_YKLQrBkUDvi6qJVnlEYZ0SxCC53CWl9wEKmBmH_4jxDRiqD2u9m1sS6k9ExUiSa-zNJSOVIt91uyCOWv-gKFAW7M2ZGLkHchJMbHTF4ri9RnG4zT9jJ_OG0rFNwhQHYc5hxxAx3i2Cc2XBGz_aCgYKATASARISFQEjDvL9IQcEP745fGPeX062vYi2NA0163`,
        //     {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({
        //         client_id:
        //           "594749811693-j8rrlliai8tkj81gh65vi5f3tgd02seq.apps.googleusercontent.com",
        //         code: "4%2F0ARtbsJppyUsdiKur-UAOa1PlT4LEdhA_NZafKMc12LloZKNb5bDzlgUhGxyLNT6x6YLSZQ",
        //         grant_type: "authorization_code",
        //         client_secret: "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",
        //       }),
        //     }
        //   )
        //     .then((response) => response.json())
        //     .then((res) => {
        //       console.log(res);
        //       if (res.success) {
        //         alert("SUCCESS");
        //         // this.$emit("changetab", "login");
        //         this.booking.modal = false;
        //         this.$refs.layout.profile.checked = true;
        //         this.$refs.layout.tab.profile = "orderhistory";
        //         return;
        //       }
        //       alert(res.errorMsg);
        //     })
        //     .catch((error) => {
        //       console.error("Error:", error);
        //     });
        //   // this.$refs.joinnows.checked = false;
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    // async handleClickGetAuthCode() {
    //   this.process = true;
    //   this.errorMsg = "";
    //   try {
    //     const authCode = await this.$gAuth.getAuthCode();
    //     console.log("authCode", authCode);
    //   } catch (error) {
    //     //on fail do something
    //     console.error(error);
    //     return null;
    //   }
    // },
    // async handleClickSignOut() {
    //   try {
    //     await this.$gAuth.signOut();
    //     console.log("isAuthorized", this.Vue3GoogleOauth.isAuthorized);
    //     this.user = "";
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // handleClickDisconnect() {
    //   window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
    // },
  },
  mounted() {},
  beforeDestroy() {},
  watch: {
    // getLogout: function (val) {
    //   console.log("getLogout", val);
    //   if (val) {
    //     this.Logout();
    //     this.$emit("response");
    //   }
    // },
    // 'facebook': function (val) {
    //   console.log(FB.getAccessToken())
    //   // console.log(
    //   //   "WTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    //   // );
    //   console.log(val && FB.getAccessToken());
    //   if (!val && !FB.getAccessToken()) {
    //     return;
    //   }
    //   if (FB.getAccessToken()) {
    //     this.process = true;
    //     fetch(`${this.ServiceUrl}controllers/authentication`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       // 1665568588499 > Date.now()
    //       body: JSON.stringify({
    //         type: "fb",
    //         // userID: val.authResponse.accessToken,
    //         accessToken: FB.getAccessToken(),
    //       }),
    //     })
    //       .then((response) => response.json())
    //       .then((res) => {
    //         this.process = false;
    //         // console.log(res);
    //         if (res.success) {
    //           localStorage.setItem("jwt", res.jwt);
    //           this.$store.commit("jwt", localStorage.getItem("jwt"));
    //           return;
    //         }
    //         this.errorMsg = res.errorMsg
    //           ? res.errorMsg
    //           : "Incorrect email or password, please try again.";
    //         // alert(res.errorMsg);
    //       })
    //       .catch((error) => {
    //         this.process = false;
    //         this.errorMsg = error;
    //       });
    //     // FB.api("/me", function (response) {
    //     //   console.log("Good to see you, " + response.name + ".");
    //     // });
    //     this.$store.commit("isLogin", true);
    //   }
    // },
    // "Vue3GoogleOauth.isAuthorized": function (val) {
    //   // console.log(val);
    //   let auth = this.$gAuth.instance.currentUser.get().getAuthResponse();
    //   if (auth) {
    //     // this.commit
    //     this.$store.commit("Vue3GoogleOauth", this.Vue3GoogleOauth);
    //     this.$store.commit("gAuth", this.$gAuth);
        
    //     this.process = true;
    //     // this.errorMsg = ""
    //     // console.log(this.$gAuth.instance.currentUser.get().getAuthResponse());
    //     // console.log(
    //     //   this.$gAuth.instance.currentUser.get().getBasicProfile().getEmail()
    //     // );
      
    //     fetch(`${this.ServiceUrl}controllers/authentication`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       // 1665568588499 > Date.now()

    //       body: JSON.stringify({
    //         type: "gmail",
    //         access_token: auth.access_token,
    //         id_token: auth.id_token,
    //         login_hint: auth.login_hint,
    //       }),
    //     })
    //       .then((response) => response.json())
    //       .then((res) => {
    //         this.process = false;
    //         // console.log(res);
    //         if (res.success) {
    //           localStorage.setItem("jwt", res.jwt);
    //           this.$store.commit("jwt", localStorage.getItem("jwt"));
    //           return;
    //           // alert("SUCCESS");
    //           // this.$emit("changetab", "login");
    //           // localStorage.setItem("jwt", res.jwt);
    //           // this.$store.commit
    //           // return
    //         }
    //         // alert(res.errorMsg);
    //         this.errorMsg = res.errorMsg
    //           ? res.errorMsg
    //           : "Incorrect email or password, please try again.";
    //       })
    //       .catch((error) => {
    //         this.process = false;
    //         this.errorMsg = error;
    //         // console.error("Error:", error);
    //       });
    //     // console.log(this.$gAuth.getBasicProfile().getEmail())
    //     this.$store.commit("isLogin", true);
    //   }
    // },

    tab: function (val) {
      if (val == "login") {
        this.remember = false;
        this.authen = {
          form: {
            email: "",
            password: "",
          },
        };
      }
    },
    "authen.form.email"(value) {
      // binding this to the data value in the email input
      this.authen.form.email = value;
      this.validateEmail(value);
    },
  },
};
</script>

<style >
/* .v-facebook-login .logo {
  display: none;
} */
</style>