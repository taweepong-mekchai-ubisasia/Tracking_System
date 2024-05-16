<template>
  <div :data-theme="theme">
    <input
      type="checkbox"
      id="modal-joinnows"
      ref="joinnows"
      class="modal-toggle"
    />
    <div class="modal">
      <div class="modal-box relative text-center m-0 p-0">
        <div class="navbar absolute top-0 left-0 bg-transparent z-10">
          <div class="flex-1">
            <button
              v-if="tab.join == 'register' || tab.join == 'forgot-password'"
              for="modal-joinnows"
              class="btn btn-sm btn-ghost absolute left-2 top-2"
              @click="tab.join = 'login'"
            >
              ←
            </button>
          </div>
          <div class="flex-none">
            <label
              for="modal-joinnows"
              class="btn btn-sm btn-ghost absolute right-2 top-2"
              @click="
                tab.join == 'verify-email' ? Logout() : (tab.join = 'login')
              "
              >✕</label
            >
          </div>
        </div>

        <!-- <AppModuleProfileVerifyEmail
          :tab="tab.join"
          @changetab="
            (val) => {
              tab.join = val;
            }
          "
          @Logout="
            () => {
              tab.join = 'login';
              Logout();
            }
          "
        /> -->
        <AppModuleProfileForgotPassword
          :tab="tab.join"
          @changetab="
            (val) => {
              tab.join = val;
            }
          "
        />
        <AppModuleProfileResetPassword
          :tab="tab.join"
          @changetab="
            (val) => {
              tab.join = val;
            }
          "
          @resetpassword="
            (val) => {
              re_password = val;
            }
          "
        />
      </div>
    </div>

    <template v-if="user">
      <input
        type="checkbox"
        id="modal-profile"
        class="modal-toggle"
        ref="profile"
      />
      <div class="modal">
        <div
          class="modal-box relative text-center m-0 p-0"
          :class="`${tab.profile == 'profile' ? 'w-11/12 max-w-6xl' : ''}`"
        >
          <div class="navbar absolute top-0 left-0 bg-transparent z-10">
            <div class="flex-1">
              <button
                v-if="
                  tab.profile == 'editsignature' ||
                  tab.profile == 'editpassword'
                "
                for="modal-profile"
                class="btn btn-sm btn-ghost absolute left-2 top-2"
                @click="tab.profile = 'profile'"
              >
                ←
              </button>
            </div>
            <div class="flex-none">
              <label
                for="modal-profile"
                class="btn btn-sm btn-ghost absolute right-2 top-2"
                @click="tab.profile = 'profile'"
                >✕</label
              >
            </div>
          </div>

          <AppModuleProfileProfile
            v-if="tab.profile == 'profile'"
            @changetab="
              (val) => {
                tab.profile = val;
              }
            "
            @Logout="Logout"
          />
          <!-- <AppModuleProfileEditDetail
            :tab="tab.profile"
            @changetab="
              (val) => {
                tab.profile = val;
              }
            "
            @update_profile="
              (val) => {
                profileUpdate.temp = val;
                confirm = true;
              }
            "
          /> -->
          <AppModuleProfileEditSignature
            :tab="tab.profile"
            @changetab="
              (val) => {
                tab.profile = val;
              }
            "
          />
          <AppModuleProfileEditPassword
            :tab="tab.profile"
            @changetab="
              (val) => {
                tab.profile = val;
              }
            "
          />
          <!-- <RewardComponent
            :tab="tab.profile"
            @changetab="
              (val) => {
                tab.profile = val;
              }
            "
          />
          <OrderHistoryComponent
            :tab="tab.profile"
            @changetab="
              (val) => {
                tab.profile = val;
              }
            "
          /> -->
        </div>
      </div>
    </template>

    <input
      type="checkbox"
      id="modal-confirm"
      ref="confirm"
      class="modal-toggle"
      v-model="confirm"
    />
    <div class="modal">
      <div class="modal-box relative text-center m-0 p-0">
        <div class="navbar absolute top-0 left-0 bg-transparent z-10">
          <div class="flex-1"></div>
          <div class="flex-none">
            <label
              for="modal-confirm"
              class="btn btn-sm btn-ghost absolute right-2 top-2"
              >✕</label
            >
          </div>
        </div>

        <div class="card-body pb-2">
          <div class="text-xl font-bold">
            <Icon icon="zondicons:exclamation-outline" />
          </div>
          <div class="text-xl font-bold">Confirm Change</div>
          <div class="form-control mt-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <button
                  class="btn btn-sm md:btn-md lg:btn-lg bg-black text-white border-black w-full"
                  @click="confirm = !confirm"
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  class="btn btn-sm md:btn-md lg:btn-lg bg-black text-white border-black w-full"
                  @click="update()"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <slot name="modal"></slot>

    <div class="bg-base-100 drawer xl:drawer-open">
      <input id="drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content bg-base-200 min-h-screen">
        <div
          class="bg-primary text-white shadow-sm sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-80 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)]"
        >
          <nav class="navbar w-full">
            <div class="flex flex-1 md:gap-1 lg:gap-2">
              <span
                class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
                data-tip="Menu"
                ><label
                  aria-label="Open menu"
                  for="drawer"
                  class="btn btn-square btn-ghost drawer-button xl:hidden"
                  ><svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </span>
              <div class="flex items-center gap-2 xl:hidden">
                <LayoutLogoLight />
                <!-- <LayoutChangelog /> -->
              </div>
              <!-- <div class="hidden w-full max-w-sm lg:flex">
                <label class="searchbox relative mx-3 w-full">
                  <svg
                    class="pointer-events-none absolute z-10 my-3.5 ms-4 stroke-current opacity-60 text-base-content"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                
                  <div
                    data-svelte-typeahead=""
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-controls="typeahead-0.tqt3y630zm-listbox"
                    aria-expanded="false"
                    id="typeahead-0.tqt3y630zm-typeahead"
                    class="svelte-4tg1b1"
                  >
                    <form
                      data-svelte-search=""
                      abineguid="8024A01691384EC6B1FF8D9197797FF5"
                    >
                      <label
                        id="typeahead-0.tqt3y630zm-label"
                        for="typeahead-0.tqt3y630zm"
                        class="svelte-wqugyy"
                        >Search</label
                      >
                      <input
                        name="search"
                        type="search"
                        placeholder="Search…"
                        autocomplete="off"
                        spellcheck="false"
                        aria-autocomplete="list"
                        aria-controls="typeahead-0.tqt3y630zm-listbox"
                        aria-labelledby="typeahead-0.tqt3y630zm-label"
                        id="typeahead-0.tqt3y630zm"
                        class="svelte-wqugyy"
                      />
                    </form>
                    <ul
                      role="listbox"
                      aria-labelledby="typeahead-0.tqt3y630zm-label"
                      id="typeahead-0.tqt3y630zm-listbox"
                      class="svelte-4tg1b1 svelte-typeahead-list"
                    ></ul>
                  </div>
                  <div
                    class="pointer-events-none absolute end-10 top-2.5 gap-1 opacity-50 rtl:flex-row-reverse hidden lg:flex"
                  >
                    <kbd class="kbd kbd-sm">ctrl</kbd>
                    <kbd class="kbd kbd-sm">K</kbd>
                  </div>
                </label>
              </div> -->
            </div>
            <div class="flex-0">
              <LayoutTheme />
              <div title="Change Language" class="dropdown dropdown-end">
                <div
                  tabindex="0"
                  role="button"
                  class="btn btn-ghost"
                  aria-label="Language"
                >
                  <!-- <svg
                    class="h-5 w-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z"
                    ></path>
                    <path
                      d="M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z"
                    ></path>
                  </svg>
                  <svg
                    width="12px"
                    height="12px"
                    class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                  >
                    <path
                      d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
                    ></path>
                  </svg> -->
                  <Icon icon="material-symbols:language"    class="h-5 w-5 fill-current" />
                  <Icon icon="ph:caret-down-bold"    class="hidden h-3 w-3 fill-current opacity-60 sm:inline-block" />
                  <!-- <iconify-icon icon="ri:arrow-drop-down-line"></iconify-icon> -->
                </div>
                <div
                  tabindex="0"
                  class="dropdown-content bg-base-200 text-base-content rounded-box top-px mt-16 max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5"
                >
                  <ul class="menu menu-sm gap-1">
                    <li>
                      <button
                        @click="changeLanguage('th')"
                        :class="language == 'th' ? 'active' : ''"
                      >
                        <span
                          class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
                          >TH</span
                        >
                        <span class="font-[sans-serif]">ภาษาไทย</span>
                      </button>
                    </li>
                    <li>
                      <button
                        @click="changeLanguage('en')"
                        :class="language == 'en' ? 'active' : ''"
                      >
                        <span
                          class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
                          >EN</span
                        >
                        <span class="font-[sans-serif]">English</span>
                      </button>
                    </li>
                    <li>
                      <button
                        @click="changeLanguage('zn')"
                        :class="language == 'zn' ? 'active' : ''"
                      >
                        <span
                          class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
                          >ZH</span
                        >
                        <span class="font-[sans-serif]">繁體中文</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="flex-0" v-if="user">
              <!-- <div
                title="Profile"
                class="dropdown dropdown-end hidden [@supports(color:oklch(0_0_0))]:block"
              >
                <div
                  v-if="user"
                  tabindex="0"
                  role="button"
                  class="btn btn-ghost"
                >
                  <Icon
                    icon="ph:user-bold"
                    class="w-4 lg:w-3 h-4 lg:h-3 stroke-current"
                  />

                  <span class="hidden font-normal md:inline"
                    >{{ user.firstname }} {{ user.lastname }}</span
                  >
                  <svg
                    width="12px"
                    height="12px"
                    class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                  >
                    <path
                      d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
                    ></path>
                  </svg>
                </div>
                <div
                  tabindex="0"
                  class="dropdown-content bg-base-100 text-base-content rounded-box top-px h-auto max-h-[calc(100vh-10rem)] w-48 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5 mt-16"
                >
                  <ul class="menu menu-sm gap-1">
                    <li @click="showProfile()">
                      <span class="font-[sans-serif]">Profile</span>
                    </li>
                    <li>
                      <span class="font-[sans-serif]" @click="Logout()"
                        >Logout</span
                      >
                    </li>
                  </ul>
                </div>
              </div> -->
              <button
                class="btn btn-ghost text-white font-black"
                @click="showProfile()"
              >
                <Icon icon="pajamas:profile" class="w-5 h-5" />
                <span class="hidden font-normal md:inline">
                  {{ user.firstname }} {{ user.lastname }}
                </span>
                <!-- <iconify-icon icon="mage:shut-down-fill"></iconify-icon> -->
              </button>
              <button
                class="btn btn-ghost text-white opacity-50"
                aria-label="Logout"
                @click="Logout()"
              >
                <Icon icon="wpf:shutdown" class="w-4 h-4 stroke-current" />
                <!-- <iconify-icon icon="mage:shut-down-fill"></iconify-icon> -->
              </button>
            </div>
          </nav>
        </div>
        <div class="max-w-[100vw] px-2 pb-2 md:px-6 md:pb-6">
          <div class="flex flex-col-reverse justify-between gap-6 xl:flex-row">
            <div
              class="prose prose-sm md:prose-base w-full flex-grow pt-0 md:pt-4"
            >
              <div class="text-sm breadcrumbs">
                <ul>
                  <!-- <li v-if="$route.name != 'Dashboard'" class="font-bold">Home</li> -->
                  <li v-if="$route.name != 'Dashboard'">
                    <a href="#" @click="changepage('Dashboard')">Home</a>
                  </li>
                  <!-- <li v-if="$route.name != 'Dashboard'"><a>Documents</a></li> -->
                  <li
                    v-for="(v, i) in $route.path.split('/')"
                    v-if="$route.path != 'Dashboard'"
                    :style="
                      !v
                        ? {
                            display: 'none',
                          }
                        : ''
                    "
                    :class="
                      i == $route.path.split('/').length - 1 ? `font-bold` : ''
                    "
                  >
                    {{ v }}
                  </li>

                  <!-- {{ $route.matched[0].meta }} -->
                  <!-- {{ $route }} -->
                </ul>
              </div>
              <slot name="view"></slot>
              <div class="not-prose flex justify-center xl:hidden"></div>
            </div>
          </div>
        </div>
        <div
          class="toast toast-center z-10 [@supports(color:oklch(0_0_0))]:hidden"
          data-svelte-h="svelte-lnqxzy"
        >
          <div class="alert alert-warning grid-cols-[auto] py-2 text-xs">
            <span
              ><a
                class="link"
                rel="nofollow, noreferrer"
                target="_blank"
                href="https://www.wikihow.com/Update-Your-Browser"
                >Please upgrade your browser</a
              ></span
            >
          </div>
        </div>
      </div>
      <div
        class="drawer-side z-40"
        style="scroll-behavior: smooth; scroll-padding-top: 5rem"
      >
        <label
          for="drawer"
          class="drawer-overlay"
          aria-label="Close menu"
        ></label>
        <aside class="bg-base-100 min-h-screen w-full xl:w-80">
          <div
            class="bg-base-100 sticky top-0 z-20 items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur flex"
          >
            <div class="flex flex-1 md:gap-1 lg:gap-2">
              <div class="flex items-center gap-2">
                <LayoutLogo />
                <LayoutChangelog />
              </div>
            </div>
            <div class="flex-0 xl:hidden absolute right-0">
              <label
                for="drawer"
                class="drawer-overlay btn btn-link btn-primary"
                aria-label="Close menu"
              >
                <Icon
                  icon="mingcute:left-fill"
                  class="w-6 h-6 text-base-content opacity-90"
              /></label>
            </div>
          </div>
          <div class="h-4"></div>
          <ul class="menu px-4 py-0">
            <li>
              <a
                href="#"
                class="group"
                :class="$route.name == 'Dashboard' ? 'active' : ''"
                @click="changepage('Dashboard')"
              >
                <Icon
                  icon="material-symbols:home-outline"
                  class="w-5 h-5 text-orange-400"
                />
                <span>Dashboard</span>
              </a>
            </li>
            <AppModuleMenu_
              v-if="user"
              :menutype="'Menu'"
              :access="user.access"
              @object_access="(obj) => {}"
              :icon="`material-symbols:book-outline`"
              :color="[`text-orange-400`, `text-orange-400 hidden`]"
              :prefix="'Doc'"
            />
            <AppModuleMenu_
              v-if="user"
              :menutype="'Menu'"
              :access="user.access"
              @object_access="(obj) => {}"
              :icon="`icon-park-outline:list-one`"
              :color="[`text-green-600`, `text-green-600`]"
            />

            <li></li>
            <li>
              <a href="#" class="group" @click="changepage('News')">
                <span>
                  <Icon icon="mdi:envelope-outline" class="w-5 h-5" />
                </span>
                <span>News</span>
              </a>
            </li>
            <li></li>
            <li>
              <a href="#" class="group" @click="showProfile()">
                <Icon icon="bx:user" class="w-5 h-5 text-green-600" />
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#" class="group" @click="Logout()">
                <Icon icon="uil:signout" class="w-5 h-5 text-error" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
          <div class="h-4"></div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import AppModuleMenu_ from "@/components/App/Module/Menu/_.vue";
// import AppModuleProfileVerifyEmail from "@/components/App/Module/Profile/VerifyEmail.vue";
import AppModuleProfileForgotPassword from "@/components/App/Module/Profile/ForgotPassword.vue";
import AppModuleProfileResetPassword from "@/components/App/Module/Profile/ResetPassword.vue";
import AppModuleProfileProfile from "@/components/App/Module/Profile/Profile.vue";
import AppModuleProfileEditDetail from "@/components/App/Module/Profile/EditDetail.vue";
import AppModuleProfileEditPassword from "@/components/App/Module/Profile/EditPassword.vue";
import AppModuleProfileEditSignature from "@/components/App/Module/Profile/EditSignature.vue";

import LayoutTheme from "@/components/Layout/Theme.vue";

import LayoutLogo from "@/components/Layout/Logo.vue";
import LayoutLogoLight from "@/components/Layout/LogoLight.vue";
import LayoutChangelog from "@/components/Layout/Changelog.vue";
// import { Icon } from '@iconify/vue';
import { ref, onMounted } from "vue";
export default {
  setup() {
    const joinnows = ref(null);
    const profile = ref(null);
    onMounted(() => {
      // console.log(joinnows.value);
    });

    return { joinnows, profile };
  },
  name: "AppLayout",
  components: {
    // AppModuleProfileVerifyEmail,
    AppModuleProfileForgotPassword,
    AppModuleProfileResetPassword,
    AppModuleProfileProfile,
    // AppModuleProfileEditDetail,
    AppModuleProfileEditPassword,
    AppModuleProfileEditSignature,
    AppModuleMenu_,
    LayoutTheme,
    LayoutLogo,
    LayoutLogoLight,
    LayoutChangelog,
  },
  name: "Layout",
  data() {
    return {
      // test: {
      //   login: false,
      // },
      tab: {
        join: "login",
        profile: "profile",
      },
      menu: false,

      re_password: null,
      confirm: false,
      PrivacyNotice: false,

      comment_feedback: "",
      profileUpdate: {
        temp: null,
        success: "",
      },
      // language: "th",
      obj: {
        batch: "810544",
        bay: "1",
        column24: null,
        comments: "\n Add: 1x21 = 21.00 kg",
        createDate: "2024-01-15",
        docNum: "24019825",
        itemCode: "S431H-PF",
        itemName: null,
        level: "1",
        ownerAdd: "สาธิต ดวงแจ่มใส",
        ownerIssue: null,
        packSize: "21",
        pallet: "1",
        quantitys: "21.00",
        rack: "D",
        recId: "97e4ac2a8916b6b6c9fcffb42b0410c1",
        sourceDatabase: "UBP",
        systemDate: "2024-01-15 10:56:47",
        tableName: "shelfs",
        transRef: "I",
        transRefComments: "",
        unit: "1",
        uomCode: "kg",
        warehouse: "wh1",
      },
    };
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      return this.$store.getters.user_token;
    },
    user() {
      return this.$store.getters.user;
    },
    language() {
      return this.$store.getters.language;
    },
    theme() {
      return this.$store.getters.theme;
    },
  },
  methods: {
    changeLanguage(v) {
      this.$store.commit("language", v);
      localStorage.setItem("language", v);
    },
    update() {
      // this.$emit("update_profile",this.profileUpdate.temp)
      // console.log(this.profileUpdate.temp);
      let image = { ...this.profileUpdate.temp.image[0] };
      delete image.temp;
      let obj = {
        // image: this.profileUpdate.temp.image,
        firstname: this.profileUpdate.temp.firstname,
        lastname: this.profileUpdate.temp.lastname,
        tel: this.profileUpdate.temp.tel,
        image: [image],
      };
      if (this.user.type == "email") {
        obj.image = [image];
      }
      fetch(
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/user`,

        // `${this.serviceUrl}api/controllers/user`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },

          body: JSON.stringify(obj),
        }
      )
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            if (localStorage.getItem("user_token")) {
              localStorage.setItem("user_token", res.jwt);
            }
            this.$store.commit("user", res.row);
            this.$store.commit(
              "user_token",
              localStorage.getItem("user_token")
            );
            this.tab.profile = "profile";
            this.confirm = false;
            this.profileUpdate.success = "Update profile is successfully.";
            return callback();
          }
          alert(res.errorMsg);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    changepage(page) {
      this.$router.push({ name: `${page}` });
    },
    Logout() {
      this.$store.commit("user_token", false);
      localStorage.removeItem("user_token");
      this.changepage("Login");
    },
    // authentication() {
    //   let vm = this;
    //   vm.$store.commit("user", null);
    //   fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/GLOBAL/auth`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${this.user_token}`,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((res) => {
    //                if (!res.success) {
          //   localStorage.removeItem("user_token");
          //   this.$router.push({ name: `Login` });
          // } else {
    //         res.row.access = JSON.parse(res.row.access);
    //         vm.$store.commit("user", res.row);
    //         vm.$store.commit("user_token", vm.user_token);
    //       } else {
    //         vm.goLoginPage(vm);
    //       }
    //     })
    //     .catch((error) => {
    //       vm.goLoginPage(vm);
    //     });
    // },
    // goLoginPage(vm) {
    //   vm.$store.commit("user_token", false);
    //   localStorage.removeItem("user_token");
    //   vm.$router.push({ name: "Login" });
    // },
    showProfile() {
      this.tab.profile = "profile";
      this.$refs.profile.checked = true;
    },
  },
  mounted() {
    this.$nextTick(() => {
      // this.$store.commit(
      //   "language",
      //   localStorage.getItem("language")
      //     ? localStorage.getItem("language")
      //     : "th"
      // );

    });
    // this.$store.commit("user_token", localStorage.getItem("user_token"));
  },
  created() {},
  watch: {
    // user_token: function (val) {
    //   if (val) {
    //     this.authentication();
    //   } else {
    //     this.goLoginPage(this);
    //   }
    // },
    // user: function (val) {
    //   console.log(val);
    //   if (!val) {
    //     return;
    //   }
    // },
    "tab.profile": function (val) {
      // console.log(val);
      if (val == "profile") {
        this.profileUpdate = {
          temp: null,
          success: "",
        };
      }
    },
  },
};
</script>

<style lang="scss">
#app {
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
span {
  line-break: anywhere;
}
</style>
