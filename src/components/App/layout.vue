<template>
  <div data-theme="emerald">
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
        
      
        <AppModuleProfileVerifyEmail
          :tab="tab.join"
          @changetab="
            (val) => {
              tab.join = val;
            }
          "
          @Logout="
            () => {
              tab.join = 'login';
              // this.$refs.joinnows.checked = true;
              Logout();
            }
          "
        />
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

    <template v-if="isLogin">
      <input
        type="checkbox"
        id="modal-profile"
        class="modal-toggle"
        ref="profile"
      />
      <div class="modal">
        <div
          class="modal-box relative text-center m-0 p-0"
          :class="`${tab.profile == 'orderhistory' ? 'w-11/12 max-w-6xl' : ''}`"
        >
          <div class="navbar absolute top-0 left-0 bg-transparent z-10">
            <div class="flex-1">
              <button
                v-if="
                  tab.profile == 'editdetail' ||
                  tab.profile == 'editpassword' ||
                  tab.profile == 'orderhistory' ||
                  tab.profile == 'reward'
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
          <AppModuleProfileEditDetail
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
      <div class="drawer-content bg-base-200">
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
              <div class="flex items-center gap-2 lg:hidden">
                <LayoutLogoLight />
                <LayoutChangelog />
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
              <div
                title="Change Theme"
                class="dropdown dropdown-end hidden [@supports(color:oklch(0_0_0))]:block"
              >
                <div tabindex="0" role="button" class="btn btn-ghost">
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="h-5 w-5 stroke-current md:hidden"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    ></path>
                  </svg>
                  <span class="hidden font-normal md:inline">Theme</span>
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
                  class="dropdown-content bg-base-200 text-base-content rounded-box top-px h-[28.6rem] h-auto max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5 mt-16"
                >
                  <div class="grid grid-cols-1 gap-3 p-3">
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="ubis"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'ubis'"
                    >
                      <span
                        data-theme="ubis"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">ubis</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <!-- <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="light"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'light'"
                    >
                      <span
                        data-theme="light"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">light</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="dark"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'dark'"
                    >
                      <span
                        data-theme="dark"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">dark</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="cupcake"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'cupcake'"
                    >
                      <span
                        data-theme="cupcake"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">cupcake</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="bumblebee"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'bumblebee'"
                    >
                      <span
                        data-theme="bumblebee"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">bumblebee</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="emerald"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'emerald'"
                    >
                      <span
                        data-theme="emerald"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">emerald</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button> -->
                    <!-- 
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="corporate"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'corporate'"
                    >
                      <span
                        data-theme="corporate"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">corporate</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="synthwave"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'synthwave'"
                    >
                      <span
                        data-theme="synthwave"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">synthwave</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="retro"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'retro'"
                    >
                      <span
                        data-theme="retro"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">retro</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="cyberpunk"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'cyberpunk'"
                    >
                      <span
                        data-theme="cyberpunk"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">cyberpunk</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="valentine"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'valentine'"
                    >
                      <span
                        data-theme="valentine"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">valentine</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="halloween"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'halloween'"
                    >
                      <span
                        data-theme="halloween"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">halloween</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="garden"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'garden'"
                    >
                      <span
                        data-theme="garden"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">garden</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="forest"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'forest'"
                    >
                      <span
                        data-theme="forest"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">forest</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="aqua"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'aqua'"
                    >
                      <span
                        data-theme="aqua"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">aqua</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="lofi"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'lofi'"
                    >
                      <span
                        data-theme="lofi"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">lofi</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="pastel"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'pastel'"
                    >
                      <span
                        data-theme="pastel"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">pastel</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="fantasy"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'fantasy'"
                    >
                      <span
                        data-theme="fantasy"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">fantasy</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="wireframe"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'wireframe'"
                    >
                      <span
                        data-theme="wireframe"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">wireframe</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="black"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'black'"
                    >
                      <span
                        data-theme="black"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">black</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="luxury"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'luxury'"
                    >
                      <span
                        data-theme="luxury"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">luxury</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="dracula"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'dracula'"
                    >
                      <span
                        data-theme="dracula"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">dracula</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="cmyk"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'cmyk'"
                    >
                      <span
                        data-theme="cmyk"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">cmyk</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="autumn"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'autumn'"
                    >
                      <span
                        data-theme="autumn"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">autumn</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="business"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'business'"
                    >
                      <span
                        data-theme="business"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">business</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="acid"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'acid'"
                    >
                      <span
                        data-theme="acid"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">acid</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="lemonade"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'lemonade'"
                    >
                      <span
                        data-theme="lemonade"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">lemonade</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="night"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'night'"
                    >
                      <span
                        data-theme="night"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">night</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="coffee"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'coffee'"
                    >
                      <span
                        data-theme="coffee"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">coffee</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4 [&amp;_svg]:visible"
                      data-set-theme="winter"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'winter'"
                    >
                      <span
                        data-theme="winter"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">winter</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="dim"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'dim'"
                    >
                      <span
                        data-theme="dim"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">dim</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="nord"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'nord'"
                    >
                      <span
                        data-theme="nord"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">nord</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="sunset"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'sunset'"
                    >
                      <span
                        data-theme="sunset"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">sunset</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
            -->
                  </div>
                </div>
              </div>
              <div title="Change Language" class="dropdown dropdown-end">
                <div
                  tabindex="0"
                  role="button"
                  class="btn btn-ghost"
                  aria-label="Language"
                >
                  <svg
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
                  </svg>
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
            <div class="flex-0">
              <div
                title="Profile"
                class="dropdown dropdown-end hidden [@supports(color:oklch(0_0_0))]:block"
              >
                <div
                  v-if="user"
                  tabindex="0"
                  role="button"
                  class="btn btn-ghost"
                >
                
                  <Icon icon="ph:user-bold" class="w-3 h-3 stroke-current" />

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
                  <!-- h-[28.6rem]  -->
                  <ul class="menu menu-sm gap-1">
                    <li @click="showProfile()">
                      <!-- <button> -->
                      <!-- <span
                          class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
                          >Profile</span
                        > -->
                      <span class="font-[sans-serif]">Profile</span>
                      <!-- <span class="badge badge-sm badge-ghost">beta</span> -->
                      <!-- </button> -->
                    </li>
                    <li>
                      <!-- <button> -->
                      <!-- <span
                          class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
                          >Profile</span
                        > -->
                      <span class="font-[sans-serif]" @click="Logout()"
                        >Logout</span
                      >
                      <!-- <span class="badge badge-sm badge-ghost">beta</span> -->
                      <!-- </button> -->
                    </li>
                    <!-- <li>
                      <button class="active">
                        <span
                          class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
                          >EN</span
                        >
                        <span class="font-[sans-serif]">English</span>
                      </button>
                    </li> -->
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div class="max-w-[100vw] px-2 pb-2 md:px-6 md:pb-6 xl:pr-2">
          <div class="flex flex-col-reverse justify-between gap-6 xl:flex-row">
            <div class="prose prose-sm md:prose-base w-full flex-grow pt-4">
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
        <aside class="bg-base-100 min-h-screen w-80">
          <div
            data-sveltekit-preload-data=""
            class="bg-base-100 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex"
          >
            <LayoutLogo />
            <LayoutChangelog />
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
            <li>
              <details id="disclosure-docs" :open="false">
                <summary class="group">
                  <span>
                    <Icon
                      icon="material-symbols:book-outline"
                      class="w-5 h-5 text-orange-400"
                    />
                  </span>
                  Docs
                </summary>
                <ul>
                  <li>
                    <a href="#" class="group"> <span>Use</span> </a>
                  </li>
                </ul>
              </details>
            </li>
            <AppModuleMenu_
              v-if="user"
              :menutype="'menu'"
              :access="user.access"
              @object_access="(obj) => {}"
            />

            <li></li>
            <li>
              <a href="#" class="group">
                <span>
          
                  <Icon icon="mdi:envelope-outline" class="w-5 h-5"/>
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
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import AppModuleMenu_ from "@/components/App/Module/Menu/_.vue";
import AppModuleProfileVerifyEmail from "@/components/App/Module/Profile/VerifyEmail.vue";
import AppModuleProfileForgotPassword from "@/components/App/Module/Profile/ForgotPassword.vue";
import AppModuleProfileResetPassword from "@/components/App/Module/Profile/ResetPassword.vue";
import AppModuleProfileProfile from "@/components/App/Module/Profile/Profile.vue";
import AppModuleProfileEditDetail from "@/components/App/Module/Profile/EditDetail.vue";
import AppModuleProfileEditPassword from "@/components/App/Module/Profile/EditPassword.vue";

import LayoutLogo from "@/components/Layout/Logo.vue";
import LayoutLogoLight from "@/components/Layout/LogoLight.vue";
import LayoutChangelog from "@/components/Layout/Changelog.vue";
// import { Icon } from '@iconify/vue';
import { ref, onMounted } from "vue";
export default {
  setup() {
    const joinnows = ref(null);
    const profile = ref(null);
    const rating = ref(null);
    const survey = ref(null);
    onMounted(() => {
      // console.log(joinnows.value);
    });

    return { joinnows, profile, rating, survey };
  },
  name: "AppLayout",
  components: {
    AppModuleProfileVerifyEmail,
    AppModuleProfileForgotPassword,
    AppModuleProfileResetPassword,
    AppModuleProfileProfile,
    AppModuleProfileEditDetail,
    AppModuleProfileEditPassword,
    AppModuleMenu_,
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
      rating_score: 0,
      rating_setting: true,
      survey_data: {
        temp: {
          contentment: "",
          experience: "",
          feedback: "",
        },
        errorMsg: {
          contentment: true,
          experience: true,
          feedback: false,
        },
        check: {
          contentment: false,
          experience: false,
          feedback: false,
        },
      },
      // surveyErrorMsg:{
      //   contentment:true,
      //   experience:true,
      //   feedback:true,
      // },
      // surveyCheck
      comment_feedback: "",
      profileUpdate: {
        temp: null,
        success: "",
      },
      // language: "th",
      // veridated:false
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
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    isLogin() {
      return this.$store.getters.isLogin;
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
  },
  methods: {
    changeLanguage(v) {
      this.$store.commit("language", v);
      localStorage.setItem("language", v);
    },
    update() {
      // this.$emit("update_profile",this.profileUpdate.temp)
      console.log(this.profileUpdate.temp);
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
        `${this.$store.state.serviceUrl}controllers/MYSQL/INTERNAL/user`,

        // `${this.ServiceUrl}controllers/user`,
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
          if (res.success) {
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
      this.$store.commit("isLogin", false);
      this.$store.commit("user_token", false);
      localStorage.removeItem("user_token");
      this.changepage('Login')
    },
    // authentication() {
    //   let vm = this;
    //   vm.$store.commit("user", null);
    //   fetch(`${this.ServiceUrl}controllers/MYSQL/INTERNAL/GLOBAL/auth`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${this.user_token}`,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((res) => {
    //       if (res.success) {
    //         vm.$store.commit("isLogin", true);
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
    //   vm.$store.commit("isLogin", false);
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
    // this.$nextTick(() => {
    //   this.$store.commit(
    //     "language",
    //     localStorage.getItem("language")
    //       ? localStorage.getItem("language")
    //       : "th"
    //   );
    // });
    // this.$store.commit("user_token", localStorage.getItem("user_token"));
  },
  created() {
  },
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
      console.log(val);
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
