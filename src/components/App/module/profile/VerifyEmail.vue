<template>
  <div
    class="card-body overflow-auto max-h-[inherit]"
    :class="`${tab != 'verify-email' ? 'hidden' : ''}`"
  >
    <Icon icon="fa6-solid:envelope-circle-check" class="text-5xl" />
    <div class="text-xl font-bold">Verify your email</div>
    <div class="text-md">Please check your email to verify your account.</div>

    <div class="text-md">
      if you haven't received the email, be sure to check your
      <b>junk mail folder</b> or <b>promotion tab</b>.
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
        class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-black text-white border-black w-full"
        @click="verifyEmail"
        :disabled="process"
      >
        Resend email
      </button>
    </div>
    <div class="form-control">
      <!-- <button
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
        @click="$emit('Logout')"
      >
        Logout
      </button> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "VerifyEmail",
  data() {
    return {
      temp: null,
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
    jwt() {
      return this.$store.getters.jwt;
    },
  },
  methods: {
    verifyEmail() {
      let vm = this;
      vm.success = "";
      vm.process = true;
      if (vm.interval) {
        vm.process = false;
        // this.errorMsg = 'Please try again after 30 second.'
        return;
      }

      vm.errorMsg = "";

      fetch(`${vm.ServiceUrl}api/controllers/verify-email`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${vm.jwt}`,
        },
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
          // console.log(res);
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            vm.success = "Successfully resend verify email.";
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
            //   vm.$store.commit("jwt", false);
            //   localStorage.removeItem("jwt");
            return;
          }
          this.errorMsg = res.errorMsg;
        })
        .catch((error) => {
          vm.process = false;
          vm.errorMsg = res.errorMsg;
          // vm.$store.commit("jwt", false);
          // localStorage.removeItem("jwt");
          console.error("Error:", error);
        });
    },
  },
  watch: {
    tab: function (val) {
      if (val == "verify-email") {
        // this.temp = { ...this.user };
        clearInterval(this.interval);
        this.interval = null;
        this.errorMsg = "";
      }
    },
  },
};
</script>
