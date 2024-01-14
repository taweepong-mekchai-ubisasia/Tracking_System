<template>
  <div class="Login" data-theme="winter">
    <div class="lg:hero min-h-screen lg:bg-base-200">
      <div class="lg:hero-content text-center">
        <div class="w-full lg:max-w-md">
          <!-- <h1 class="text-5xl font-bold">Hello there</h1> -->
          <!-- <p class="py-6"> -->
          <div
            class="
              card
              flex-shrink-0
              lg:w-screen
              w-full
              lg:max-w-sm
              shadow-2xl
              bg-base-100
              h-screen
              lg:h-auto
              flex
            "
          >
            <div class="card-body">
              <h1 class="text-5xl font-bold text-primary">Login</h1>
              <p class="font-bold uppercase text-neutral text-opacity-60">
                Verify your access
              </p>

              <div class="alert shadow-lg alert-error" v-if="errorMsg">
                <div>
                  <span class="text-xs">{{ errorMsg }}</span>
                </div>
              </div>

              <div class="form-control mt-4">
                <label class="label">
                  <span class="label-text text-opacity-60">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  class="input input-bordered"
                  v-model="authen.form.email"
                  @keyup.enter="authentication()"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-opacity-60">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  class="input input-bordered"
                  v-model="authen.form.password"
                  @keyup.enter="authentication()"
                />
                <!-- <label class="label">
                  <a
                    href="#"
                    class="label-text-alt link link-hover text-opacity-60"
                    >Forgot password?</a
                  >
                </label> -->
              </div>
              <div class="form-control mt-10">
                <button class="btn btn-primary" @click="authentication()">
                  Login
                </button>
              </div>
              <div class="form-control">
                <p class="label-text-alt text-right">
                  Visit @
                  <a href="#" class="label-text-alt link link-hover font-bold">
                    <router-link to="/#"> Posting </router-link>
                  </a>
                </p>
              </div>
            </div>
          </div>
          <!-- </p> -->
          <!-- <button class="btn btn-primary">Get Started</button> -->
        </div>
      </div>
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Login now!</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Login",
  components: {
    // HelloWorld,
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
  },
  data() {
    return {
      errorMsg: "",
      authen: {
        form: {
          email: "",
          password: "",
        },
      },
    };
  },
  methods: {
    authentication() {
      this.errorMsg = "";
      if (!this.authen.form.email || !this.authen.form.password) {
        this.errorMsg = `Email/Password require`;
        return;
      }
      fetch(`${this.$store.state.serviceUrl}controllers/authentication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          admin: true,
          email: this.authen.form.email,
          password: this.authen.form.password,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          // console.log(res)
          if (res.success) {
            // console.log("success")
            localStorage.setItem("_jwt", res.jwt);
            // this.category.modal = false;
            // console.log(this.category.current);
            // this.category_search();
            // this.$route
            this.$router.push({ name: "admin_dashboard" });
          } else {
            localStorage.removeItem("_jwt");
            this.errorMsg = res.errorMsg
              ? res.errorMsg
              : `Incorrect email or password, please try again.`;
          }
          // callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          // callback([]);
          this.errorMsg = error;
          // console.error("Error:", error);
        });
    },
  },
  mounted() {
    if (localStorage.getItem("_jwt")) {
      this.$router.push({ name: "admin_dashboard" });
    }
    // console.log("DASDas")
  },
};
</script>
