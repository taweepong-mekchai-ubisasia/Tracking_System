<template data-theme="winter">
  <div
    class="hero min-h-screen bg-base-200"
    style="
      background-image: url('https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg');
    "
  >
    <div class="hero-content flex-col lg:flex-row w-full">
      <!-- <div
    class="navbar inset-x-0 top-0 z-50 w-full transition duration-200 ease-in-out border-b border-base-200 bg-base-100 text-base-content sticky"
  > -->
      <div class="navbar lg:absolute top-0 left-0 bg-transparent z-10 hidden">
        <div class="flex-1">
          <a
            class="btn btn-ghost normal-case text-xl hover:bg-transparent px-0 lg:px-3"
          >
            <div class="avatar h-full mr-2">
              <div class="rounded">
                <img
                  src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                />
              </div>
            </div>
            LOGO
          </a>
          <!-- <a class="btn btn-ghost normal-case text-xl">daisyUI</a> -->
        </div>
        <div class="flex-none">
          <button
            class="btn btn-square btn-ghost"
            @click="$route.name != 'Home' ? $router.push({ name: `Home` }) : ''"
          >
            <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-5 h-5 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg> -->
            back
          </button>
        </div>
        <!-- <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
    </div> -->
        <!-- <div class="flex-none">
      <button class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-5 h-5 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          ></path>
        </svg>
      </button>
    </div> -->
      </div>

      <div class="container w-full">
        <div class="grid lg:grid-cols-2 gap-8">
          <div
            class="h-full place-items-center justify-self-start place-self-start hidden lg:grid"
          >
            <div class="flex flex-row">
              <!-- <div > -->
              <!-- <a class="btn btn-ghost normal-case text-xl"> -->
              <div class="avatar h-10 lg:h-full mr-2">
                <div class="rounded-3xl">
                  <img
                    src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                  />
                </div>
              </div>
              <!-- </a> -->
              <!-- </div> -->
              <div>
                <h1
                  class="text-xl lg:text-5xl font-bold grid h-full place-items-center px-4"
                >
                  <!-- <div > -->

                  <!-- </div> -->
                  LOGO
                </h1>
              </div>
              <!-- <div class="basis-1/2">03</div> -->
            </div>
          </div>
          <!-- ... -->

          <div class="lg:justify-self-end lg:place-self-end">
            <div
              class="card flex-shrink-0 w-full lg:w-screen max-w-sm shadow-2xl bg-base-100"
            >
              <div class="navbar absolute top-0 left-0 bg-transparent z-10">
                <div class="flex-1">
                  <!-- <a
                    class="btn btn-ghost normal-case text-xl hover:bg-transparent px-0 lg:px-3"
                  >
                    <div class="avatar h-full mr-2">
                      <div class="rounded">
                        <img
                          src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                        />
                      </div>
                    </div>
                    LOGO
                  </a> -->
                  <!-- <a class="btn btn-ghost normal-case text-xl">daisyUI</a> -->
                </div>
                <div class="flex-none">
                  <button
                    class="btn btn-square btn-ghost"
                    @click="
                      $route.name != 'Home'
                        ? $router.push({ name: `Home` })
                        : ''
                    "
                  >
                    >>
                  </button>
                </div>
              </div>
              <div class="card-body w-full">
                <h1 class="text-2xl font-bold mb-4 text-left">
                  Login to your Account
                </h1>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    class="input input-bordered"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="password"
                    class="input input-bordered"
                  />
                  <!-- <label class="label">
                    <a href="#" class="label-text-alt link link-hover"
                      >Forgot password?</a
                    >
                  </label> -->
                </div>
                <div class="form-control grid mt-4 mb-4">
                  <div class="flex w-full">
                    <div class="rounded-box">
                      <label class="label cursor-pointer">
                        <input type="checkbox" class="checkbox" />
                        <span class="label-text pl-2">Remember me</span>
                      </label>
                    </div>
                    <div class="grid flex-grow rounded-box justify-end">
                      <label class="label">
                        <a
                          href="#"
                          class="label-text-alt link link-hover font-bold"
                        >
                          Forgot password?
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="form-control mt-2">
                  <button
                    class="btn btn-lg btn-primary shadow-lg text-white border-transparent hover:border-transparent rounded-2xl"
                    :style="{
                      border: 'unset',
                      backgroundImage:
                        'linear-gradient( to right, #5e839f, #19476a )',
                    }"
                    @click="login()"
                  >
                    Login
                  </button>
                  <!-- <button class="btn btn-primary">Login</button> -->
                </div>
                <div class="form-control mt-4 mb-6">
                  <div class="flex flex-row gap-2 w-full justify-center">
                    <div>
                      <button
                        class="btn btn-square btn-outline border-slate-200"
                      >
                        <img
                          src="https://sm.ign.com/ign_es/tech/g/google/google_ucdj.png"
                          class="rounded-lg md:w-full lg:w-1/2"
                        />
                        <!-- :src="require(`@/assets/images/aaaa.png`)" -->

                        <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg> -->
                      </button>
                    </div>
                    <div>
                      <button
                        class="btn btn-square btn-outline border-slate-200"
                      >
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREKes2ipksKNOKqd1Ts8KJxoz-4bu1nmfyx-fw4gopgyLO7Nk98PnN--Vf4oNPLT3IJmY&usqp=CAU"
                          class="rounded-lg md:w-full lg:w-1/2"
                        />
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg> -->
                      </button>
                    </div>
                  </div>
                  <!-- <button class="btn btn-square">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
</button> -->

                  <!-- <button
                    class="btn btn-lg btn-primary shadow-lg text-white border-transparent hover:border-transparent rounded-2xl"
                    style="
                      border: unset;
                      background-image: linear-gradient(to right, #5e839f, #19476a);
                    "
                  >
                    Login
                  </button> -->
                  <!-- <button class="btn btn-primary">Login</button> -->
                </div>
                <div class="form-control mt-4">
                  <p class="label-text-alt">
                    Don't have an account?
                    <a href="#" class="label-text-alt link link-hover font-bold"
                    @click="$route.name != 'Signup' ? $router.push({ name: `Signup` }) : ''" >Sign up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="text-center lg:text-left"> -->

      <!-- <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p> -->
      <!-- </div> -->
    </div>
  </div>
</template>


<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    login() {
      this.$store.commit("testLogin", true);
      this.$router.push({ name: `Home` });
    },
  },
  mounted() {},
  beforeDestroy() {},
  watch: {},
};
</script>
