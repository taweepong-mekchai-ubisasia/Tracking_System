<template>
  <div
  class="card-body overflow-auto" style="max-height: inherit;" 
    :class="`${tab != 'forgot-password' ? 'hidden' : ''}`"
  >
    <div class="text-xl font-bold">Forgot password</div>
    <div class="text-md">
      Enter your registered email below to receive password reset instruction.
    </div>
    <div class="flex flex-col w-full border-opacity-50">
      <div class="form-control grid">
        <!-- <label class="label">
                  <span class="label-text">Email Address*</span>
                </label> -->
        <input
          type="text"
          placeholder="Email Address*"
          class="input input-bordered"
          v-model="temp.email"
        />
      </div>
    </div>
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
    <div class="form-control mt-2">
      <button
        class="
          btn btn-xs
          sm:btn-sm
          md:btn-md
          lg:btn-lg
          bg-black
          text-white
          border-black
          w-full
        "
     
        @click="forgotPassword"
        :disabled="process"
      >
      <!-- @click="$emit('changetab','verify-email')" -->
        Reset password
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "forgotPassword",
  data() {
    return {
      temp: {
        email:''
      },
      success: "",
      errorMsg: "",
      interval: null,
      process: false,
    };
  },
  props: ["tab"],
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    forgotPassword() {
      let vm = this;
      vm.success = "";
      vm.process = true;
      if (vm.interval) {
        vm.process = false;
        // this.errorMsg = 'Please try again after 30 second.'
        return;
      }

      vm.errorMsg = "";

      
      fetch(`${vm.ServiceUrl}controllers/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:this.temp.email
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          vm.process = false;
          let i = 0;
          vm.interval = setInterval(() => {
            i++;
            vm.errorMsg = `Please try again after ${31 - i} second.`;
            if (i == 31) {
              clearInterval(vm.interval);
              vm.interval = null;
              vm.errorMsg = "";
            }
          }, 1000);
          console.log(res);
          if (res.success) {
            vm.success = "Successfully send email reset password.";
            //   vm.$store.commit("isLogin", true);
            //   vm.$store.commit("user", res.user);
            //   vm.$store.commit("jwt", vm.jwt);
            //   console.log(vm.$route.query);
            //   if (vm.$route.query.gp_code) {
            //     // console.log("vm.$route.query.gp_codevm.$route.query.gp_codevm.$route.query.gp_codevm.$route.query.gp_codevm.$route.query.gp_codevm.$route.query.gp_code")
            //     vm.$emit("setgame");
            //   } else {
            //     vm.$emit("getgame");
            //   }
            // } else {
            //   vm.$store.commit("isLogin", false);
            //   vm.$store.commit("jwt", false);
            //   localStorage.removeItem("jwt");
            return;
          }
          this.errorMsg = res.errorMsg;
        })
        .catch((error) => {
          vm.process = false;
          vm.errorMsg = res.errorMsg;
          // vm.$store.commit("isLogin", false);
          // vm.$store.commit("jwt", false);
          // localStorage.removeItem("jwt");
          console.error("Error:", error);
        });
    },
  },
  watch: {
    tab: function (val) {
      if (val == "forgot-password") {
        this.temp = {
          email:''
        }
        // this.temp = { ...this.user };
      }
    },
  },
};
</script>