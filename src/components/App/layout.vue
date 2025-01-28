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
          <nav class="navbar w-full" ref="navbar" >
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
              <!-- <GoogleTranslateSelect
                default-language-code="en"
                default-page-language-code="en"
                :fetch-browser-language="true"
                trigger="click"
                @select="handleGoogleTranslateSelect"
                :languages="[
                  {
                    code: 'en',
                    // name: 'English',
                    // cname: '英语',
                    // ename: 'English',
                  },
                  // {
                  //   code: 'af',
                  //   name: 'Afrikaans',
                  //   cname: '南非语',
                  //   ename: 'Afrikaans',
                  // },
                  // {
                  //   code: 'sq',
                  //   name: 'Gjuha shqipe',
                  //   cname: '阿尔巴尼亚语',
                  //   ename: 'Albanian',
                  // },
                  // {
                  //   code: 'ar',
                  //   name: 'العربية',
                  //   cname: '阿拉伯语',
                  //   ename: 'Arabic',
                  // },
                  // {
                  //   code: 'hy',
                  //   name: 'Հայերեն',
                  //   cname: '亚美尼亚语',
                  //   ename: 'Armenian',
                  // },
                  // {
                  //   code: 'az',
                  //   name: 'Азәрбајҹан дили',
                  //   cname: '阿塞拜疆语',
                  //   ename: 'Azerbaijani',
                  // },
                  // {
                  //   code: 'eu',
                  //   name: 'Euskara',
                  //   cname: '巴斯克语',
                  //   ename: 'Basque',
                  // },
                  // {
                  //   code: 'be',
                  //   name: 'беларуская мова',
                  //   cname: '白俄罗斯语',
                  //   ename: 'Belarusian',
                  // },
                  // {
                  //   code: 'bg',
                  //   name: 'български език',
                  //   cname: '保加利亚语',
                  //   ename: 'Bulgarian',
                  // },
                  // {
                  //   code: 'ca',
                  //   name: 'Català',
                  //   cname: '加泰罗尼亚语',
                  //   ename: 'Catalan',
                  // },
                  {
                    code: 'zh-CN',
                    // name: 'Chinese (Simplified)',
                    // cname: '中文 (简体)',
                    // ename: 'Chinese (Simplified)',
                  },
                  {
                    code: 'zh-TW',
                    // name: 'Chinese (Traditional)',
                    // cname: '中文 (繁体)',
                    // ename: 'Chinese (Traditional)',
                  },
                  // {
                  //   code: 'hr',
                  //   name: 'Српскохрватски језик',
                  //   cname: '克罗地亚语',
                  //   ename: 'Croatian',
                  // },
                  // {
                  //   code: 'cs',
                  //   name: 'čeština',
                  //   cname: '捷克语',
                  //   ename: 'Czech',
                  // },
                  // {
                  //   code: 'da',
                  //   name: 'Danmark',
                  //   cname: '丹麦语',
                  //   ename: 'Danish',
                  // },
                  // {
                  //   code: 'nl',
                  //   name: 'Nederlands',
                  //   cname: '荷兰语',
                  //   ename: 'Dutch',
                  // },
                  // {
                  //   code: 'et',
                  //   name: 'eesti keel',
                  //   cname: '爱沙尼亚语',
                  //   ename: 'Estonian',
                  // },
                  // {
                  //   code: 'tl',
                  //   name: 'Filipino',
                  //   cname: '菲律宾语',
                  //   ename: 'Filipino',
                  // },
                  // {
                  //   code: 'fi',
                  //   name: 'Finnish',
                  //   cname: '芬兰语',
                  //   ename: 'Finnish',
                  // },
                  // {
                  //   code: 'fr',
                  //   name: 'Français',
                  //   cname: '法语',
                  //   ename: 'French',
                  // },
                  // {
                  //   code: 'de',
                  //   name: 'Deutsch',
                  //   cname: '德语',
                  //   ename: 'German',
                  // },
                  // {
                  //   code: 'el',
                  //   name: 'Ελληνικά',
                  //   cname: '希腊语',
                  //   ename: 'Greek',
                  // },
                  // {
                  //   code: 'hu',
                  //   name: 'magyar',
                  //   cname: '匈牙利语',
                  //   ename: 'Hungarian',
                  // },
                  // {
                  //   code: 'id',
                  //   name: 'Indonesia',
                  //   cname: '印度尼西亚语',
                  //   ename: 'Indonesian',
                  // },
                  // {
                  //   code: 'ga',
                  //   name: 'Irish',
                  //   cname: '爱尔兰语',
                  //   ename: 'Irish',
                  // },
                  // {
                  //   code: 'it',
                  //   name: 'Italiano',
                  //   cname: '意大利语',
                  //   ename: 'Italian',
                  // },
                  {
                    code: 'ja',
                    // name: 'にほんご',
                    // cname: '日语',
                    // ename: 'Japanese',
                  },
                  {
                    code: 'ko',
                    // name: '한국어',
                    // cname: '韩语',
                    // ename: 'Korean',
                  },
                  // {
                  //   code: 'lt',
                  //   name: 'lietuvių kalba',
                  //   cname: '立陶宛语',
                  //   ename: 'Lithuanian',
                  // },
                  // {
                  //   code: 'ms',
                  //   name: 'Malay',
                  //   cname: '马来西亚语',
                  //   ename: 'Malay',
                  // },
                  // {
                  //   code: 'no',
                  //   name: 'norsk',
                  //   cname: '挪威语',
                  //   ename: 'Norwegian',
                  // },
                  // {
                  //   code: 'pl',
                  //   name: 'Polski',
                  //   cname: '波兰语',
                  //   ename: 'Polish',
                  // },
                  // {
                  //   code: 'pt',
                  //   name: 'Português',
                  //   cname: '葡萄牙语',
                  //   ename: 'Portuguese',
                  // },
                  // {
                  //   code: 'ro',
                  //   name: 'limba română',
                  //   cname: '罗马尼亚语',
                  //   ename: 'Romanian',
                  // },
                  // {
                  //   code: 'ru',
                  //   name: 'Русский',
                  //   cname: '俄语',
                  //   ename: 'Russian',
                  // },
                  // {
                  //   code: 'es',
                  //   name: 'Español',
                  //   cname: '西班牙语',
                  //   ename: 'Spanish',
                  // },
                  // {
                  //   code: 'sv',
                  //   name: 'Swedish',
                  //   cname: '瑞典语',
                  //   ename: 'Swedish',
                  // },
                  {
                    code: 'th',
                    // name: 'ภาษาไทย',
                    // cname: '泰语',
                    // ename: 'Thai',
                  },
                  // {
                  //   code: 'tr',
                  //   name: 'Turkish',
                  //   cname: '土耳其语',
                  //   ename: 'Turkish',
                  // },
                  // {
                  //   code: 'uk',
                  //   name: 'українська мова',
                  //   cname: '乌克兰语',
                  //   ename: 'Ukrainian',
                  // },
                ]"
                :dropdownClassName="` 
                mt-6
                dropdown-content bg-base-200 text-base-content  max-h-[calc(100vh-10rem)] 
                w-auto overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5 `"
              /> -->
              <button
                class="btn btn-link no-underline hover:no-underline text-white font-black"
                @click="requestNotificationPermission()"
                v-if="!noti"
              >
                <Icon icon="mdi:bell-off-outline" class="w-5 h-5" />
              </button>

              <LayoutNoti v-if="noti" />

              <!-- <div title="Change Language" class="dropdown dropdown-end">
                <div
                  tabindex="0"
                  role="button"
                  class="btn btn-ghost"
                  aria-label="Language"
                >
                  <Icon
                    icon="material-symbols:language"
                    class="h-5 w-5 fill-current"
                  />
                  <Icon
                    icon="ph:caret-down-bold"
                    class="hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
                  />
                </div>

                <div
                  tabindex="0"
                  class="dropdown-content bg-base-200 text-base-content rounded-box top-px mt-16 max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5 h-[50vh]"
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
              </div> -->
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
                class="btn btn-link no-underline hover:no-underline text-white font-black"
                @click="showProfile()"
              >
                <Icon icon="pajamas:profile" class="w-5 h-5" />
                <span class="hidden font-normal md:inline notranslate">
                  {{ user.firstname }} {{ user.lastname }}
                </span>
                <!-- <iconify-icon icon="mage:shut-down-fill"></iconify-icon> -->
              </button>
              <button
                class="btn btn-link no-underline hover:no-underline text-white opacity-50"
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
              <div class="text-sm breadcrumbs" ref="breadcrumbs" >
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
        <aside class="bg-base-100 min-h-screen w-full xl:w-72">
          <div
            class="bg-base-100 sticky top-0 z-20 items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur flex"
          >
            <div class="w-full">
              <!-- <div class=""> -->
                <LayoutLogo />
                <!-- <div class=""> -->
                <LayoutChangelog />
                <!-- </div> -->
              <!-- </div> -->
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
import LayoutNoti from "@/components/Layout/Noti.vue";

import LayoutLogo from "@/components/Layout/Logo.vue";
import LayoutLogoLight from "@/components/Layout/LogoLight.vue";
import LayoutChangelog from "@/components/Layout/Changelog.vue";
import Query from "@/assets/js/fetch.js";

import GoogleTranslateSelect from "@google-translate-select/vue3";

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
    LayoutNoti,
    LayoutLogo,
    LayoutLogoLight,
    LayoutChangelog,
    GoogleTranslateSelect,
  },
  name: "Layout",
  data() {
    return {
      navbarHeight: 0,
      breadcrumbsHeight: 0,
      // contentHeight: '100svh',

      noti: false,
      broadcast: new BroadcastChannel("noti-channel"),
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
    handleGoogleTranslateSelect(language) {
      console.log(language);
    },
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

      new Query("base", "put").set(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/user`,
        obj,
        (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
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
        }
      );
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

    async requestNotificationPermission() {
      const permission = await Notification.requestPermission();
      console.log(permission);
      if (permission !== "granted") {
        throw new Error("Notification permission not granted");
      }
      this.broadcast.postMessage({
        type: "notification",
        user: JSON.stringify(this.user),
      });
    },
    updateContentHeight() {
      console.log("updateContentHeight")
      this.navbarHeight = this.$refs.navbar ? this.$refs.navbar.offsetHeight : 0;
      this.breadcrumbsHeight = this.$refs.breadcrumbs ? this.$refs.breadcrumbs.offsetHeight : 0;

      // this.contentHeight = `calc(100vh - ${navbarHeight + breadcrumbsHeight}px)`;
    }
  },
  beforeUnmount() {

    window.removeEventListener('resize', this.updateContentHeight);
  },
  unmounted(){
    // console.log("NOITO")
    this.broadcast.close()

  
  },
  mounted() {
    this.$nextTick(() => {
      // this.noti = localStorage.getItem("notification");

      // const saveSubscription = async (subscription) => {
      // Set up channel with same name as in app.js

      this.broadcast.onmessage = (event) => {
        if (event.data.type != "subscription") {
          return;
        }
        // console.log(event.data.payload);
        // localStorage.setItem("notification", event.data.payload);
        this.noti = event.data.payload;
      };

      // this.$store.commit(
      //   "language",
      //   localStorage.getItem("language")
      //     ? localStorage.getItem("language")
      //     : "th"
      // );
    });
    // this.$store.commit("user_token", localStorage.getItem("user_token"));
    this.updateContentHeight();
    window.addEventListener('resize', this.updateContentHeight);
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
    user: function (val) {
      // console.log(val);
      if (!val) {
        return;
      }
      this.broadcast.postMessage({
        type: "checknoti",
        user: JSON.stringify(this.user),
      });
    },
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
.google-translate-select-language {
  margin-right: 5px;
}
.google-translate-select-flag {
  margin-right: 0px;
}
.google-translate-select-dropdown__menu__item {
  padding: 4px 20px !important;
  display: flex;
}

tr.disabled {
  pointer-events: none;
  opacity: 0.3;
  text-decoration: line-through;
  text-decoration-color: red;
}
</style>
