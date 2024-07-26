<template>
  <div class="Login" :data-theme="theme">
    <div class="lg:hero min-h-screen lg:bg-base-200">
      <div class="lg:hero-content text-center">
        <div class="w-full lg:max-w-2xl">
          <div
            class="card flex-shrink-0 lg:w-screen w-full lg:max-w-md shadow-2xl bg-base-100 h-screen lg:h-auto flex lg:flex-row lg:flex-nowrap flex-col-reverse"
            style="align-content: center; align-items: center"
          >
            <div
              class="card-body w-[100%] h-[100vh] lg:h-auto absolute lg:relative z-10"
            >
              <div class="self-center">
                <img
                  alt="Ubis LOGO"
                  :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/ubis-logo.png&s=50`"
                  class="w-48 py-2 px-4"
                />
              </div>
              <h1 class="text-2xl font-bold text-primary">
                Management Systems
              </h1>
              <p class="font-bold uppercase text-gray-700 text-opacity-60">
                Verify your access
              </p>

              <div
                class="alert shadow-lg py-2 alert-error text-white"
                v-if="errorMsg"
              >
                <div>
                  <span class="text-xs">{{ errorMsg }}</span>
                </div>
              </div>

              <div class="form-control mt-4">
                <label class="label">
                  <span class="label-text text-opacity-60">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  class="input input-bordered border-base-content"
                  v-model="authen.form.username"
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
                  class="input input-bordered border-base-content"
                  v-model="authen.form.password"
                  @keyup.enter="authentication()"
                />
              </div>
              <div class="form-control mt-10">
                <button
                  class="btn btn-primary text-white"
                  @click="authentication()"
                >
                  Login
                </button>
              </div>
              <div
                class="form-control"
                style="
                  display: flex;
                  flex-direction: row;
                  align-content: center;
                  flex-wrap: nowrap;
                  justify-content: center;
                  align-items: center;
                "
              >
                <label class="label">
                  <a
                    href="#"
                    class="label-text-alt link link-hover text-opacity-60"
                    >Forgot password?</a
                  >
                </label>
                <p class="label-text-alt text-right">
                  Visit @
                  <a href="#" class="label-text-alt link link-hover font-bold">
                    <router-link to="/#"> UbisAsia </router-link>
                  </a>
                </p>
              </div>
            </div>

            <!-- <div
              class="card-body text-center lg:text-left lg:flex blur-lg lg:blur-none"
            >
              <h1 class="text-5xl font-bold">Login now!</h1>
              <p class="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div> -->
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
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    theme() {
      return this.$store.getters.theme;
    },
  },
  data() {
    return {
      errorMsg: "",
      authen: {
        form: {
          username: "",
          password: "",
        },
      },
    };
  },
  methods: {
    authentication() {
      this.errorMsg = "";
      if (!this.authen.form.username || !this.authen.form.password) {
        this.errorMsg = `Username/Password require`;
        return;
      }
      fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/GLOBAL/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          admin: true,
          username: this.authen.form.username,
          password: this.authen.form.password,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          // console.log(res)
          if (!res.success) {
            localStorage.removeItem("user_token");
            this.errorMsg = res.errorMsg
              ? res.errorMsg
              : `Incorrect username or password, please try again.`;
          } else {
            localStorage.setItem("user_token", res.jwt);

            res.row.image = res.row.image?JSON.parse(res.row.image) : [];

            res.row.access = JSON.parse(res.row.access);
            // user = res.row;
            this.$store.commit("user", res.row);
            localStorage.setItem("userDataTemp", JSON.stringify(res.row));
            // this.$store.commit("user_token", store.getters.user_token);
            // console.error("USER TOKEN")

            this.$router.push({ name: "Dashboard" });
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
    if (localStorage.getItem("user_token")) {
      this.$router.push({ name: "Dashboard" });
    }
    // console.log("DASDas")
  },
};
</script>
