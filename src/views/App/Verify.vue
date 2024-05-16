<template class="Verify" data-theme="winter">
  <div
    class="hero min-h-screen bg-base-200 overflow-auto"
    style="
      background-image: url('https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg');
    "
  >
    <div class="hero-content flex-col lg:flex-row w-full">
      <div class="navbar lg:absolute top-0 left-0 bg-transparent z-10 hidden">
        <div class="flex-1">
          <a
            class="btn btn-ghost normal-case text-xl hover:bg-transparent px-0 lg:px-3"
          >
            <div class="avatar h-full mr-2">
              <div class="rounded">
                <img
                alt="Image"
                  src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                />
              </div>
            </div>
            LOGO
          </a>
        </div>
        <div class="flex-none">
          <button
            class="btn btn-square btn-ghost"
            @click="$route.name != 'Home' ? $router.push({ name: `Home` }) : ''"
          >
            back
          </button>
        </div>
      </div>
      <div class="container w-full">
        <div class="flip-container lg:justify-self-end lg:place-self-end">
          <div
            class="flipper"
            id="flipper"
            :class="`${from == 'signin' ? '' : 'flip'}`"
          >
            <div class="front card bg-base-100">
              <div class="navbar absolute top-0 left-0 bg-transparent z-10">
                <div class="flex-1"></div>
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
                    class="input input-bordered border-base-content"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="password"
                    class="input input-bordered border-base-content"
                  />
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
                </div>
                <div class="form-control mt-4 mb-6">
                  <div class="flex flex-row gap-2 w-full justify-center">
                    <div>
                      <button
                        class="btn btn-square btn-outline border-slate-200"
                      >
                        <img  alt="Image"
                          src="https://sm.ign.com/ign_es/tech/g/google/google_ucdj.png"
                          class="rounded-lg md:w-full lg:w-1/2"
                        />
                      </button>
                    </div>
                    <div>
                      <button
                        class="btn btn-square btn-outline border-slate-200"
                      >
                        <img  alt="Image"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREKes2ipksKNOKqd1Ts8KJxoz-4bu1nmfyx-fw4gopgyLO7Nk98PnN--Vf4oNPLT3IJmY&usqp=CAU"
                          class="rounded-lg md:w-full lg:w-1/2"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="form-control mt-4">
                  <p class="label-text-alt">
                    Don't have an account?
                    <a
                      href="#"
                      class="label-text-alt link link-hover font-bold"
                      @click="from = 'signup'"
                      >Sign up
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div class="back card bg-base-100">
              <div class="navbar absolute top-0 left-0 bg-transparent z-10">
                <div class="flex-1">
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
                  Register to your Account
                </h1>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    class="input input-bordered border-base-content"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="password"
                    class="input input-bordered border-base-content"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Confirm password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="password"
                    class="input input-bordered border-base-content"
                  />
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
                    Register
                  </button>
                </div>

                <div class="form-control mt-4">
                  <p class="label-text-alt">
                    Don't have an account?
                    <a
                      href="#"
                      class="label-text-alt link link-hover font-bold"
                      @click="from = 'signin'"
                      >Sign in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Verify",
  components: {},
  data() {
    return {
      from: "signin",
    };
  },
  computed: {},
  methods: {
    login() {
      // this.$store.commit("testLogin", true);
      this.$router.push({ name: `Home` });
    },
  },
  mounted() {},
  beforeDestroy() {},
  watch: {},
};
</script>
<style scoped>
.flip-container {
  perspective: 1000;
  text-align: -webkit-center;
}
.flipper {
  padding: 30px;
  width: 100%;
  max-width: 400px;
  height: 70vh;
  position: relative;
  /* background: #f5f5f5; */
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  /* border-radius: 20px; */

  transition: 0.6s;
  transform-style: preserve-3d;
}
@media screen(sm) {
  .flipper {
    height: 90vh;
  }
}
@media screen(md) {
  .flipper {
    height: 60vh;
  }
}
@media screen(lg) {
  .flipper {
    height: 80vh;
  }
}
@media screen(xl) {
  .flipper {
    height: 60vh;
  }
}

.front,
.back {
  /*background-color: rgba(0,0,0,.3);*/
  position: absolute;
  /* padding: 10px 30px; */
  top: 0;
  left: 0;
  right: 0;

  backface-visibility: hidden;
}

.front {
  z-index: 2;
  /* for firefox 31 */
  transform: rotateY(0deg);
}

.back {
  transform: rotateY(180deg);
}
.flip {
  transform: rotateY(180deg);
}
/* input {
  width: 100%;
  margin-bottom: 15px;
  height: 40px;
  box-sizing: border-box;
  padding: 10px;
} */

/* .title {
  text-align: center;
} */
.flipbutton {
  color: #4096ee;
  text-decoration: none;
  text-align: left !important;
}

/* Alignment styles */
</style>