<template>
  <div data-theme="winter" :class="`${admin_isLogin?'':'hidden'}`">
    <slot name="modal"></slot>
    <div class="shadow bg-base-100 drawer drawer-mobile h-100">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="flex flex-col items-center justify-center drawer-content">
        <div class="drawer">
          <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content flex flex-col">
            <div
              class="
                w-full
                navbar
                bg-base-100
                z-20
                sticky
                top-0
                shadow
                gap-2
                px-4
                py-2
                flex
              "
            >
              <div class="flex-none lg:hidden">
                <label for="my-drawer-2" class="btn btn-square btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div class="flex-1 px-2 mx-2 flex">
                <span class="text-lg font-bold text-neutral">
                  <span class="text-base-content uppercase hidden lg:contents"
                    >Management >
                  </span>
                  <span
                    class="text-base-content uppercase contents lg:contents"
                    >{{ $route.name.substring(6, 100) }}</span
                  >
                </span>
              </div>
              <div class="flex-1 lg:flex-none"></div>
              <div class="flex-none">
                <div class="dropdown dropdown-end">
                  <label
                    tabindex="0"
                    class="btn btn-ghost btn-circle avatar"
                    @click="logout()"
                  >
                    <a class="text-error">
                      <Icon icon="fluent-emoji-high-contrast:right-arrow" />
                  
                    </a>
                  </label>
                </div>
              </div>
            </div>
            <slot name="view"></slot>
          </div>
        </div>
      </div>
      <div class="drawer-side w-100">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <div class="bg-base-200 w-80">
          <div
            class="
              z-20
              bg-base-200 bg-opacity-90
              backdrop-blur
              sticky
              top-0
              items-center
              gap-2
              px-4
              py-2
              flex
            "
          >
            <a
              href="#"
              aria-current="page"
              aria-label="Homepage"
              class="flex-0 btn btn-ghost px-2 hover:bg-transparent hover:no-underline"
            >
              <div
                class="
                  font-title
                  text-primary
                  inline-flex
                  text-lg
                  transition-all
                  duration-200
                  md:text-3xl
              
                "
              >
                <span class="lowercase">admin</span>
                <span class="text-base-content uppercase">UI</span>
              </div>
            </a>
            <a
              href="#"
              class="
                flex-1
                link link-hover
                font-mono
                text-xs text-opacity-50 text-right
              "
            >
            </a>
          </div>

          <ul class="card menu menu-compact flex flex-col p-0 px-4">
            <li></li>
            <li class="menu-title"><span>Management</span></li>
            <li>
              <a
                href="#"
                id="Gallery"
                class="flex gap-4"
                @click="changepage('admin_dashboard')"
                :class="$route.name == 'admin_dashboard' ? 'active' : ''"
              >
                <span class="flex-1">Dashboard</span>
              </a>
            </li>
            <li></li>
            <li class="menu-title"><span>History logs</span></li>
            <li>
              <a
                href="#"
                id="Gameplay"
                class="flex gap-4"
                @click="changepage('admin_gameplay')"
                :class="$route.name == 'admin_gameplay' ? 'active' : ''"
              >
                <span class="flex-1">Gameplay</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                id="Coin"
                class="flex gap-4"
                @click="changepage('admin_coin')"
                :class="$route.name == 'admin_coin' ? 'active' : ''"
              >
                <span class="flex-1">Coin</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                id="Rating"
                class="flex gap-4"
                @click="changepage('admin_rating')"
                :class="$route.name == 'admin_rating' ? 'active' : ''"
              >
                <span class="flex-1">Rating</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                id="Survey"
                class="flex gap-4"
                @click="changepage('admin_survey')"
                :class="$route.name == 'admin_survey' ? 'active' : ''"
              >
                <span class="flex-1">Survey</span>
              </a>
            </li>
            <li></li>
            <li class="menu-title"><span>Setting</span></li>
            <li>
              <a
                href="#"
                id="Game"
                class="flex gap-4"
                @click="changepage('admin_game')"
                :class="$route.name == 'admin_game' ? 'active' : ''"
              >
                <span class="flex-1">Game</span>
              </a>
            </li>
            <li></li>
            <li class="menu-title"><span>User</span></li>
            <li>
              <a
                href="#"
                id="Member"
                class="flex gap-4"
                @click="changepage('admin_member')"
                :class="$route.name == 'admin_member' ? 'active' : ''"
              >
                <span class="flex-1">Member</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                id="Admin"
                class="flex gap-4"
                @click="changepage('admin_admin')"
                :class="$route.name == 'admin_admin' ? 'active' : ''"
              >
                <span class="flex-1">Admin</span>
              </a>
            </li>
          </ul>
          <ul class="card menu menu-compact flex flex-col p-0 px-4">
            <li></li>
            <li class="menu-title"><span>Visit</span></li>
            <li>
              <a
                href="#"
                id="Gallery"
                class="flex gap-4"
                @click="changepage('Home')"
              >
                <span class="flex-1">UBIS</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>

<script>
export default {
  name: "app",
  data() {
    return {
      menu:false
      //   version: "0.00.1",
      // routeList: [],
      // currentPath: window.location.hash
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    admin_isLogin() {
      return this.$store.getters.admin_isLogin;
    },
    admin() {
      return this.$store.getters.admin;
    },
  },
  methods: {
    changepage(page) {
      // console.log(page);
      //  this.$router.push({name:`${page}`, params:{}});
      this.$router.push({ name: `${page}` });
      // this.$route.name = page
      // $vm.proxy.$router.push({name:'product'})
      // return routes[this.currentPath.slice(1) || '/'] || NotFound
    },
    logout() {
      localStorage.removeItem("_jwt");
      this.$store.commit("admin_isLogin", false);
      this.$router.push({ name: "admin_login" });
    },
    authentication() {
      // this.$store.commit('isLogin',true)
      let JWT = localStorage.getItem("_jwt");
      // console.log(JWT)
      if (JWT) {
        this.$store.commit("admin_isLogin", false);
      }
      fetch(`${this.$store.state.serviceUrl}controllers/authentication`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          // console.log(res);

          if (res.success) {
            // console.log("SUCCESS")
            this.$store.commit("admin_isLogin", true);
            // admin
            this.$store.commit("admin", res.user);

            // console.log("success")
            // localStorage.setItem('jwt',res.jwt)
            // this.category.modal = false;
            // console.log(this.category.current);
            // this.category_search();
            // this.$route
            // this.$router.push({ name: 'dashboard' })
          } else {
            this.$store.commit("admin_isLogin", false);
            this.$store.commit("admin", null);
            localStorage.removeItem("_jwt");
            this.$router.push({ name: "admin_login" });
          }
        })
        .catch((error) => {
          this.$store.commit("admin_isLogin", false);
          this.$store.commit("admin", null);
          localStorage.removeItem("_jwt");
          this.$router.push({ name: "admin_login" });
          console.error("Error:", error);
        });
    },
  },
  mounted() {
    console.log("DASDASDASDSADASDSA");
    console.log(this.$route.name);
    if (this.admin_isLogin) {
      return;
    }
    if (this.$route.name == "admin_login") {
    } else {
      this.authentication();
    }
  },
};
</script>
