<template>
  <div class="UBIS" data-theme="wireframe">
    <!-- The button to open modal -->

    <!-- Put this part before </body> tag -->

    <input
      type="checkbox"
      id="modal-tokens-get"
      class="modal-toggle"
      v-model="modal_tokens"
    />

    <div class="modal">
      <div
        class="modal-box w-unset max-w-xl relative text-center bg-transparent rounded-3xl p-0 m-0"
        style="background: #242122; width: unset"
      >
        <div class="navbar absolute top-0 left-0 bg-transparent z-10">
          <div class="flex-1"></div>
          <div class="flex-none">
            <label
              for="modal-tokens-get"
              class="btn btn-sm btn-ghost absolute right-2 top-2 text-white"
              @click="this.$store.commit('game_type', null)"
              >✕</label
            >
          </div>
        </div>
        <div class="card-body p-0" v-if="game_type">
          <div class="flex flex-col w-full border-opacity-50 overflow-hidden">
            <div class="self-center">
              <!-- {
  "code": "202301161655-Cpk801sGlq",
  "game_type": "Candy",
  "game_uid": "1234",
  "created_at": "2023-01-16 16:55:38",
  "id": 33
} -->
              <!-- {{ token_gameplay }} -->
              <img
                :src="require(`@/assets/images/reborn/hero/S_${game_type}.png`)"
                style="max-height: 70vh"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <input type="checkbox" id="modal-tokens" class="modal-toggle" />

    <div class="modal">
      <div
        class="modal-box w-unset max-w-xl relative text-center bg-transparent rounded-3xl p-0 m-0"
        style="background: #242122; width: unset"
      >
        <div class="navbar absolute top-0 left-0 bg-transparent z-10">
          <div class="flex-1"></div>
          <div class="flex-none">
            <label
              for="modal-tokens"
              class="btn btn-sm btn-ghost absolute right-2 top-2 text-white"
              @click="token = {}"
              >✕</label
            >
          </div>
        </div>
        <div class="card-body overflow-auto p-0" v-if="token.image">
          <div class="flex flex-col w-full border-opacity-50 overflow-hidden">
            <div class="self-center">
              <img
                :src="
                  require(`@/assets/images/reborn/hero/${
                    token.active == false ? 'E' : 'G'
                  }_${token.image.active}`)
                "
                style="max-height: 70vh"
              />
            </div>
          </div>

          <!-- <div class="form-control m-6 mt-0">
            <label
              for="modal-tokens"
              class="
                btn btn-sm
                sm:btn-sm
                md:btn-md
                lg:btn-md
                btn-primary
                w-full
                bg-blue-500
                rounded-2xl
              "
              style="font-size: 20px"
              >เริ่มทำภารกิจ</label
            >
          </div> -->
        </div>
      </div>
    </div>

    <input
      type="checkbox"
      v-model="modal_roblox"
      id="modal-roblox"
      class="modal-toggle"
    />

    <div class="modal">
      <div class="modal-box w-100 max-w-xl relative text-center p-0">
        <div class="navbar absolute top-0 left-0 bg-transparent z-10">
          <div class="flex-1"></div>
          <div class="flex-none">
            <label
              for="modal-roblox"
              class="btn btn-sm btn-ghost absolute right-2 top-2"
              >✕</label
            >
          </div>
        </div>
        <div class="card-body overflow-auto p-0" style="max-height: 80vh">
          <!-- <div class="text-xl font-bold">Roblox Reference</div> -->
          <div class="flex flex-col w-full border-opacity-50">
            <!-- <div class="divider mt-0"></div> -->
            <div>
              <!-- <img
                :src="require(`@/assets/images/UUID-01.png`)"
                class="w-full"
                style="object-fit: scale-down"
              /> -->
              <img
                :src="require(`@/assets/images/reborn/popup/How toRoblox.jpg`)"
                class="w-full"
                style="object-fit: scale-down"
              />
            </div>
          </div>
          <div class="form-control m-6 mb-0">
            <label class="label">
              <a
                href="https://www.roblox.com"
                target="_blank"
                class="btn btn-sm sm:btn-sm md:btn-md lg:btn-md btn-link"
                >https://www.roblox.com
              </a>
            </label>
          </div>
          <div class="form-control m-6 mb-0">
            <label class="label">
              <span class="label-text"
                >Roblox UUID <span class="text-red-500">*</span></span
              >
            </label>
            <input
              type="text"
              placeholder="Roblox UUID"
              class="input input-bordered"
              v-model="roblox_uuid"
            />
          </div>
          <div class="form-control m-6 mt-0">
            <button
              class="btn btn-sm sm:btn-sm md:btn-md lg:btn-md btn-primary w-full bg-blue-500 rounded-2xl"
              :disabled="roblox_uuid.length == 0"
              @click="fn_update_roblox()"
              style="font-size: 20px"
            >
              PLAY!
            </button>
          </div>
          <!-- <div class="form-control mt-4 mb-4">
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
              @click="$emit('Logout')"
            >
              Logout
            </button>
          </div> -->
        </div>
        <!-- </div> -->
      </div>
    </div>

    <input
      type="checkbox"
      v-model="modal_zepeto"
      id="modal-zepeto"
      class="modal-toggle"
    />

    <div class="modal">
      <div class="modal-box w-100 max-w-xl relative text-center p-0">
        <div class="navbar absolute top-0 left-0 bg-transparent z-10">
          <div class="flex-1"></div>
          <div class="flex-none">
            <label
              for="modal-zepeto"
              class="btn btn-sm btn-ghost absolute right-2 top-2"
              >✕</label
            >
          </div>
        </div>
        <div class="card-body overflow-auto p-0" style="max-height: 80vh">
          <div class="flex flex-col w-full border-opacity-50">
            <div>
              <img
                :src="require(`@/assets/images/reborn/popup/How to Zepeto.jpg`)"
                class="w-full"
                style="object-fit: scale-down"
              />
            </div>
          </div>
          <div class="form-control m-6 mt-0">
            <button
              class="btn btn-sm sm:btn-sm md:btn-md lg:btn-md btn-primary w-full bg-blue-500 rounded-2xl"
              @click="fn_zepeto()"
              style="font-size: 20px"
            >
              PLAY!
            </button>
          </div>
        </div>
      </div>
    </div>

    <input
      type="checkbox"
      v-model="modal_decentraland"
      id="modal-decentraland"
      class="modal-toggle"
    />

    <div class="modal">
      <div class="modal-box w-100 max-w-xl relative text-center p-0">
        <div class="navbar absolute top-0 left-0 bg-transparent z-10">
          <div class="flex-1"></div>
          <div class="flex-none">
            <label
              for="modal-decentraland"
              class="btn btn-sm btn-ghost absolute right-2 top-2"
              >✕</label
            >
          </div>
        </div>
        <div class="card-body overflow-auto p-0" style="max-height: 80vh">
          <div class="flex flex-col w-full border-opacity-50">
            <div>
              <img
                :src="require(`@/assets/images/reborn/popup/How to Decen.jpg`)"
                class="w-full"
                style="object-fit: scale-down"
              />
            </div>
          </div>
          <div class="form-control m-6 mt-0">
            <button
              class="btn btn-sm sm:btn-sm md:btn-md lg:btn-md btn-primary w-full bg-blue-500 rounded-2xl"
              @click="fn_decentraland()"
              style="font-size: 20px"
            >
              PLAY!
            </button>
          </div>
        </div>
      </div>
    </div>

    <input
      type="checkbox"
      v-model="modal_spatial"
      id="modal-spatial"
      class="modal-toggle"
    />

    <div class="modal">
      <div class="modal-box w-100 max-w-xl relative text-center p-0">
        <div class="navbar absolute top-0 left-0 bg-transparent z-10">
          <div class="flex-1"></div>
          <div class="flex-none">
            <label
              for="modal-spatial"
              class="btn btn-sm btn-ghost absolute right-2 top-2"
              >✕</label
            >
          </div>
        </div>
        <div class="card-body overflow-auto p-0" style="max-height: 80vh">
          <div class="flex flex-col w-full border-opacity-50">
            <div>
              <img
                :src="
                  require(`@/assets/images/reborn/popup/How to Spatial.jpg`)
                "
                class="w-full"
                style="object-fit: scale-down"
              />
            </div>
          </div>
          <div class="form-control m-6 mt-0">
            <button
              class="btn btn-sm sm:btn-sm md:btn-md lg:btn-md btn-primary w-full bg-blue-500 rounded-2xl"
              @click="fn_spatial()"
              style="font-size: 20px"
            >
              PLAY!
            </button>
          </div>
        </div>
      </div>
    </div>

    <AppLayout
      ref="AppLayout"
      @setgame="$emit('setgame')"
      @getgame="$emit('getgame')"
    >
      <template #modal> </template>
      <template #view>
        <img
          :src="require(`@/assets/images/reborn/HEAD WEB V4.png`)"
          class="w-full object-cover"
          style="margin-top: 64px"
        />
        <div class="hero min-auto" ref="home" id="home">
          <div class="carousel w-full h-full">
            <div
              :id="`slide${i}`"
              class="carousel-item relative w-full"
              v-for="(v, i) in slide"
              :key="i"
            >
              <img
                :src="require(`@/assets/images/reborn/Ads test2.png`)"
                class="w-full object-cover object-right"
                style="min-height: 250px"
              />
              <div
                class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 z-20 lg:top-1/2 top-44"
              >
                <a
                  :href="`#slide${i == 0 ? slide.length - 1 : i - 1}`"
                  class="btn btn-ghost text-white text-3xl opacity-40 hover:opacity-80"
                >
                  ❮
                </a>
                <a
                  :href="`#slide${i >= slide.length - 1 ? 0 : i + 1}`"
                  class="btn btn-ghost text-white text-3xl opacity-40 hover:opacity-80"
                >
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div
            class="hero-overlay bg-base-200 bg-opacity-60 lg:bg-opacity-0 z-10"
          ></div>
          <div
            class="hero-content flex-col lg:flex-row-reverse w-full lg:px-20 lg:pt-40 pt-24 pb-20"
            style="z-index: 11; max-width: 100vw"
          >
            <div class="container">
              <div class="text-center lg:text-left">
                <div
                  class="text-4xl lg:text-5xl font-bold text-center lg:text-left"
                >
                  <img
                    :src="
                      require(`@/assets/images/Landing_Page_Edit/ME Verse TEXT.png`)
                    "
                    style="
                      width: 100%;
                      max-width: 650px;
                      object-fit: scale-down;
                      display: inline-grid;
                    "
                  />
                </div>
                <div class="text-4xl lg:text-5xl font-bold lg:ml-3 my-2">
                  Join World Mission!
                </div>
                <div class="text-xl lg:text-xl font-bold lg:max-w-xl lg:ml-3">
                  มาร่วมทำภารกิจพิชิตสุขภาพดีกับกิจกรรม World Mission !
                  พร้อมลุ้นรับ Ring Fit Adventure & Nintendo Switch
                  และของรางวัลเพื่อสุขภาพอีกมากมาย
                </div>
                <!-- <div class="text-sm font-bold">
                  join us in our mission to protect
                </div>
                <div class="text-sm font-bold">
                  our bodles from various disases
                </div> -->

                <div class="text-sm font-bold lg:ml-3" v-if="!isLogin">
                  <label
                    for="modal-joinnows"
                    class="btn btn-md md:btn-md lg:btn-md bg-black text-white border-black mt-4 w-60 modal-button rounded-lg hover:bg-orange-500"
                    style="font-size: 20px"
                  >
                    เริ่มกิจกรรม
                    <!-- {{ showLogin }} -->
                  </label>
                </div>

                <!-- <div class="text-sm font-bold">
                  <button
                    v-if="!isLogin"
                    @click="isLogin = true"
                    class="
                      btn btn-xs
                      bg-black
                      text-white
                      border-black
                      mt-4
                      w-60
                      modal-button
                    "
                  >
                    test login
                  </button>
                  <button
                    v-if="isLogin"
                    @click="isLogin = false"
                    class="
                      btn btn-xs
                      bg-black
                      text-white
                      border-black
                      mt-4
                      w-60
                      modal-button
                    "
                  >
                    test logout
                  </button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-zinc-800 grid grid-col w-full px-4 lg:px-auto hover:shadow-2xl"
          v-if="user"
        >
          <div class="container mx-auto">
            <div class="grid grid-col w-full">
              <div
                class="grid rounded-box place-items-center text-white bg-black bg-opacity-70"
              >
                <div
                  class="grid lg:flex lg:flex-cols w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
                >
                  <div
                    class="grid h-auto flex-grow card rounded-box place-items-center md:border-b-2 lg:border-b-0 border-white border-opacity-25"
                  >
                    <div class="avatar p-8">
                      <div
                        class="lg:w-32 w-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      >
                        <img
                          :src="`${
                            user.type == 'fb' || user.type == 'gmail'
                              ? user.row.image
                              : user.row.image && JSON.parse(user.row.image)[0]
                              ? `${ServiceUrl}upload/user/${user.row.code}/${
                                  JSON.parse(user.row.image)[0].file
                                }`
                              : `https://t3.ftcdn.net/jpg/01/09/00/64/360_F_109006426_388PagqielgjFTAMgW59jRaDmPJvSBUL.jpg`
                          }`"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="grid h-auto flex-grow card rounded-box place-items-center md:col-span-2 lg:border-b-0 md:border-b-2 border-b-2 border-white border-opacity-25"
                  >
                    <div class="card w-full">
                      <!-- <figure class="px-10 pt-10">
                            <img
                              src="https://placeimg.com/400/225/tech6"
                              alt="Shoes"
                              class="rounded-xl"
                            />
                          </figure> -->
                      <div
                        class="card-body items-center lg:items-start md:items-start text-center lg:pl-0 md:py-7 pt-0"
                      >
                        <!-- <h2 class="card-title">Roblox</h2> -->

                        <div class="lg:text-2xl md:text-3xl text-2xl font-bold">
                          {{
                            user.row.firstname ? user.row.firstname : "Unknow"
                          }}
                        </div>
                        <div class="lg:text-sm md:text-xl text-lg font-bold">
                          {{ user.row.lastname ? user.row.lastname : "Unknow" }}
                        </div>
                        <div class="text-sm font-bold">
                          {{ user.row.email }}
                        </div>
                        <div class="text-sm font-bold w-full">
                          <label
                            for="modal-profile"
                            class="btn btn-sm sm:btn-md md:btn-md lg:btn-md bg-black text-white border-black mt-4 w-full modal-button"
                          >
                            Profile
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="grid h-auto flex-grow card rounded-box place-items-center lg:border-l-2 border-white border-opacity-25 md:col-span-3 lg:border-b-0 md:border-b-2 border-b-2"
                  >
                    <div class="card w-full">
                      <!-- <figure class="px-10 pt-10">
                            <img
                              src="https://placeimg.com/400/225/tech6"
                              alt="Shoes"
                              class="rounded-xl"
                            />
                          </figure> -->
                      <div class="card-body items-center text-center py-4">
                        <div class="lg:text-lg md:text-3xl text-2xl font-bold">
                          My Tokens
                        </div>
                        <div
                          class="grid rounded-box place-items-center text-white"
                        >
                          <div class="flex flex-cols w-full">
                            <div
                              class="grid h-auto flex-grow card rounded-box place-items-center"
                              v-for="(v, i) in image"
                              :key="i"
                            >
                              <div
                                class="text-sm font-bold"
                                style="
                                  object-fit: cover;
                                  text-align: -webkit-center;
                                "
                              >
                                <label
                                  for="modal-tokens"
                                  class="modal-button"
                                  style="position: initial"
                                >
                                  <img
                                    style="
                                      position: absolute;
                                      height: 100%;
                                      top: 0;
                                    "
                                    :src="
                                      require(`@/assets/images/reborn/hero/${
                                        v.active == false ? 'HE' : 'HS'
                                      }${v.image.block}`)
                                    "
                                    class="w-40 md:w-40 lg:w-20 opacity-0 hover:opacity-100"
                                    @click="token = v"
                                  />
                                  <img
                                    :src="
                                      require(`@/assets/images/reborn/hero/${
                                        v.active == false
                                          ? v.image.block
                                          : v.image.active
                                      }`)
                                    "
                                    class="w-40 md:w-40 lg:w-20"
                                    @click="token = v"
                                  />

                                  <!-- @click="
                                        v.active =
                                          image[i].active == false
                                            ? true
                                            : false
                                      " -->
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="lg:text-lg md:text-2xl text-xl font-bold">
                          {{
                            parseInt(image[0].active == true ? 1 : 0) +
                            parseInt(image[1].active == true ? 1 : 0) +
                            parseInt(image[2].active == true ? 1 : 0) +
                            parseInt(image[3].active == true ? 1 : 0) +
                            parseInt(image[4].active == true ? 1 : 0) +
                            parseInt(image[5].active == true ? 1 : 0)
                          }}/6
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="grid h-auto flex-grow card rounded-box place-items-center lg:border-l-2 border-white border-opacity-25 md:col-span-3"
                  >
                    <div class="card w-full">
                      <div class="card-body items-center text-center">
                        <div class="lg:text-lg md:text-3xl text-2xl font-bold">
                          My Coins
                        </div>
                        <div
                          class="lg:pt-1 md:pt-2 pt-3 lg:text-5xl md:text-9xl text-8xl font-bold"
                        >
                          {{ coin ? coin : 0 }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid h-auto place-items-left text-left pt-5">
                <!-- <div class="text-sm font-bold"> -->
                <!-- <label
                        for="modal-joinnows"
                        class="
                          btn btn-sm
                          sm:btn-sm
                          md:btn-md
                          lg:btn-md
                          bg-black
                          text-white
                          border-black
                          mt-4
                          w-60
                          modal-button
                        "
                      >
                        JOIN NOW
                      </label> -->
                <div
                  class="grid h-auto place-items-right text-center lg:text-right"
                >
                  <div class="text-sm font-bold text-white">
                    <div class="lg:navbar">
                      <div class="flex-1 hidden lg:block">
                        <a class="btn btn-ghost normal-case text-xl"></a>
                      </div>
                      <div class="flex-none">
                        <div class="grid place-items-center text-white">
                          <div class="grid w-full grid-cols-1 lg:grid-cols-4">
                            <div></div>
                            <div></div>
                            <div
                              class="grid h-auto flex-grow card rounded-box place-items-center md:border-b-2 lg:border-b-0 border-white border-opacity-25 lg:justify-self-end"
                            >
                              <!-- vido เลื่อนซ้ายไม่ได้ 
                            ขยับตัวหนังสือ
                            ซ่อนปุ่มใน video
                            ย้ายไปไว้ตรงกลาง
                            popup ผิด
                            แปะลิงค์
                            uuid ใส่ * สีแดง ล๊อคปุ่ม
                            เริ่มกิจกรรมเปลี่ยนเป็นเริ่มภารกิจ -->
                              <span class="lg:mr-4 text-2xl"
                                >เริ่มทำภารกิจ</span
                              >
                            </div>
                            <div
                              class="grid h-auto flex-grow card rounded-box place-items-center md:border-b-2 lg:border-b-0 border-white border-opacity-25"
                            >
                              <!-- <label
                                class="
                                  btn btn-md
                                  md:btn-md
                                  lg:btn-md
                                  bg-blue-600
                                  text-white
                                  border-blue-600
                                  text-black
                                  modal-button
                                  mb-6
                                  lg:mb-0
                                "
                                @click="
                                  !isLogin
                                    ? ($refs.AppLayout.joinnows.checked = true)
                                    : getLink(`${decentraland}`, 'Decentraland')
                                "
                              >
                                PLAY!
                              </label> -->
                              <a
                                class="btn btn-md md:btn-md lg:btn-md bg-blue-600 border-blue-600 text-black modal-button mb-6 lg:mb-0 rounded-xl w-full"
                                href="#ExploreMultiverse"
                                style="font-size: 20px"
                              >
                                PLAY!
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="grid place-items-center text-white">
                      <div
                        class="
                          grid
                          w-full
                          grid-cols-1
                          md:grid-cols-3
                          lg:grid-cols-4
                        "
                      >
                        <div></div>
                        <div></div>
                        <div
                          class="
                            grid
                            h-auto
                            flex-grow
                            card
                            rounded-box
                            place-items-center
                            md:border-b-2
                            lg:border-b-0
                            border-white border-opacity-25
                            lg:justify-self-end
                          "
                        >
                          <span class="lg:mr-4 text-2xl">เริ่มทำภาระกิจ</span>
                        </div>
                        <div
                          class="
                            grid
                            h-auto
                            flex-grow
                            card
                            rounded-box
                            place-items-center
                            md:border-b-2
                            lg:border-b-0
                            border-white border-opacity-25
                          "
                        >
                          <label
                            class="
                              btn btn-md
                              md:btn-md
                              lg:btn-md
                              bg-blue-600
                              text-white
                              border-blue-600
                              text-black
                              modal-button
                              mb-6
                              lg:mb-0
                            "
                            @click="
                              !isLogin
                                ? ($refs.AppLayout.joinnows.checked = true)
                                : getLink(`${decentraland}`, 'Decentraland')
                            "
                          >
                            PLAY!
                          </label>
                        </div>
                      </div>
                    </div> -->
                    <!-- <span class="mr-4">เริ่มทำภาระกิจ</span>
                    <label
                      class="
                        btn btn-md
                        md:btn-md
                        lg:btn-md
                        bg-blue-600
                        text-white
                        border-blue-600
                        w-60
                        modal-button
                      "
                      @click="
                        !isLogin
                          ? ($refs.AppLayout.joinnows.checked = true)
                          : getLink(`${decentraland}`, 'Decentraland')
                      "
                    >
                      PLAY
                    </label> -->
                  </div>
                </div>
                <div
                  class="grid grid-cols-2 lg:grid-cols-4 gap-4 text-white mb-4"
                >
                  <div
                    class="text-3xl lg:text-3xl font-bold col-span-2 lg:col-span-4"
                  >
                    {{
                      language == "en" ? "Get more coins" : "ร่วมทำแบบสอบถาม"
                    }}
                  </div>

                  <div class="text-sm font-bold">
                    {{ language == "en" ? "Answer survey form" : "แบบสอบถาม" }}
                  </div>
                  <button
                    class="btn btn-xs text-white w-32 lg:col-span-3 lg:justify-self-start justify-self-end"
                    :class="`${
                      survey
                        ? `bg-zinc-300 border-zinc-300`
                        : `bg-black border-black`
                    }`"
                    @click="
                      survey ? '' : ($refs.AppLayout.survey.checked = true)
                    "
                  >
                    {{
                      survey
                        ? language == "en"
                          ? "done"
                          : "สำเร็จ"
                        : language == "en"
                        ? "do it"
                        : "แบบสอบถาม"
                    }}
                  </button>
                  <div class="text-sm font-bold">
                    {{ language == "en" ? "Rate us" : "ให้คะแนนเรา" }}
                  </div>

                  <button
                    class="btn btn-xs text-white w-32 lg:col-span-3 lg:justify-self-start justify-self-end"
                    :class="`${
                      rating
                        ? `bg-zinc-300 border-zinc-300`
                        : `bg-black border-black`
                    }`"
                    @click="
                      rating ? '' : ($refs.AppLayout.rating.checked = true)
                    "
                  >
                    {{
                      rating
                        ? language == "en"
                          ? "Rate us"
                          : "สำเร็จ"
                        : language == "en"
                        ? "Rate us"
                        : "ให้คะแนนเรา"
                    }}
                  </button>
                  <span id="ExploreMultiverse"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container mx-auto pt-10" v-if="user">
          <div class="grid grid-col w-full lg:px-auto">
            <div class="grid h-auto place-items-left">
              <div class="text-2xl lg:text-3xl font-bold">
                ภารกิจเมต้าเวิร์ส
              </div>
            </div>
            <div class="divider"></div>
            <div class="card-body grid rounded-box place-items-center mx-auto">
              <div
                class="grid w-full gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
              >
                <div
                  class="card image-full grid h-auto flex-grow rounded-box object-cover place-items-center lg:place-items-stretch lg:hover:justify-items-center cursor-pointer hover:shadow-lg"
                  @click="
                    !isLogin
                      ? ($refs.AppLayout.joinnows.checked = true)
                      : getLink(`${v.link}`, `${v.type}`)
                  "
                  v-for="(v, i) in explore.rows"
                  :key="i"
                >
                  <!-- {{v.type}} -->
                  <!-- {{v.image[v.master].file}} -->
                  <figure class="h-full">
                    <img
                      v-if="v.image.length > 0"
                      :src="`${v.imageLink}${v.image[v.master].file}`"
                      :alt="`${v.image[v.master].file}`"
                      class="rounded-xl"
                    />
                  </figure>
                  <div
                    class="card-body items-center text-center place-content-center w-full h-full opacity-0 hover:opacity-100"
                  >
                    <!-- <h2 class="card-title" style="text-transform: capitalize">
                      <a
                        class="
                          btn btn-md
                          md:btn-md
                          lg:btn-md
                          bg-orange-500
                          border-orange-500
                          text-white
                          modal-button
                          mb-6
                          lg:mb-0
                          rounded-xl
                          w-full
                        "
                 
                        style="font-size: 20px"
                        @click="
                    !isLogin
                      ? ($refs.AppLayout.joinnows.checked = true)
                      : getLink(`${v.link}`, `${v.type}`)
                  "
                      >
                      เริ่มทำภารกิจ
                      </a>
                    </h2> -->
                    <!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
                    <!-- <div class="card-actions justify-end">
                      <button class="btn btn-primary">Play now</button>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref="about" id="about" class="mb-6"></div>
        <div
          class="lg:bg-base-200 grid grid-col w-full px-4 lg:px-auto hover:shadow-2xl"
        >
          <div class="container mx-auto">
            <div class="card lg:card-side">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 grid-flow-row">
                <div class="col-span-1">
                  <div
                    class="card-body items-center text-center self-center w-full h-full"
                  >
                    <div class="hero bg-transparent h-full">
                      <div class="hero-content text-center">
                        <div class="w-full">
                          <div class="card-title flex flex-col w-full">
                            <div class="text-2xl lg:text-3xl font-bold">
                              ความเป็นมา
                            </div>
                            <div class="divider my-0"></div>
                          </div>
                          <p>
                            <!-- {{ example_text }} -->
                            UBIS
                            เป็นเมตาเวิร์สนำร่องของสำนักงานกองทุนสนับสนุนการสร้างเสริมสุขภาพ
                            (สสส.)
                            เพื่อให้ทุกคนได้เข้ามามีประสบการณ์ร่วมในการสร้างเสริมสุขภาพ
                            ให้ห่างไกลจากกลุ่มโรคไม่ติดต่อเรื้อรัง (NCDs)
                            ที่เป็นสาเหตุการเสียชีวิตอันดับต้นๆของโลก
                            ผ่านเทคโนโลยีเสมือนจริง Virtual reality (VR)
                          </p>
                          <p>
                            UBIS
                            ได้ถูกพัฒนาโดยนำแพลตฟอร์มยอดนิยมที่มีผู้ใช้งานจากทั่วโลก
                            อย่าง Decentraland, Roblox, Spatial และ Zepeto
                            มาประยุกต์ใช้
                            เพื่อให้ผู้เล่นอวตารได้ร่วมทำภารกิจในรูปแบบเกมมิฟิเคชัน
                            ผ่านแต้มสะสม (points) ระดับขั้น (levels)
                            การได้รับรางวัล (rewards)
                            ตลอดจนรองรับการทำกิจกรรมบนโลกเสมือนต่างๆที่จะเกิดขึ้นในอนาคต
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-span-1">
                  <figure class="h-full">
                    <img
                      class="h-full object-cover w-full overflow-hidden"
                      :src="require(`@/assets/images/reborn/About.png`)"
                      alt="Album"
                    />
                    <!-- :src="`./img/PIC/about.png`" -->
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container mx-auto pt-10" v-if="!user">
          <div class="grid grid-col w-full px-4 lg:px-auto">
            <div class="grid h-auto place-items-left">
              <div class="card w-full bg-transparent">
                <div class="card-body pb-0 mb-0">
                  <div class="card-title flex flex-col w-full">
                    <div class="text-2xl lg:text-3xl font-bold">
                      ความเป็นมาของเมตาเวิร์ส
                    </div>
                    <div class="divider my-0"></div>
                  </div>
                  <p class="text-lg p-0 lg:px-20">
                    <!-- {{ example_text }} -->
                    เมตาเวิร์ส คือ
                    สภาพแวดล้อมของโลกเสมือนจริงของผู้คนผ่านทางอินเทอร์เน็ต
                    เป็นพื้นที่ดิจิทัลที่ถูกสร้างขึ้นให้เหมือนจริง
                    เหมือนเราอยู่อีกโลกนึง
                    และใช้ชีวิตคล้ายกับอยู่บนโลกความเป็นจริง
                    โดยการใช้เทคโนโลยีโลกเสมือนผสานโลกแห่งความจริง (AR/VR)
                  </p>
                  <!-- <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div> -->
                </div>
              </div>
              <!-- <div class="text-2xl lg:text-3xl font-bold">
                
              </div> -->
              <!-- <div class="card-title flex flex-col w-full">
                      <div class="text-2xl lg:text-3xl font-bold">ความเป็นมาของเมตาเวิร์ส</div>
                      <div class="divider my-0"></div>
                    </div> -->
            </div>
            <!-- <div class="divider"></div> -->
            <div
              class="card-body grid rounded-box place-items-center mx-auto mt-0 pt-0 px-0"
            >
              <div class="flex justify-center ...">
                <!-- <div> -->
                <div
                  class="card image-full grid h-auto flex-grow rounded-box object-cover place-items-center cursor-pointer"
                >
                  <div class="avatar m-4">
                    <div class="w-full lg:w-32">
                      <img
                        :src="
                          require(`@/assets/images/reborn/logo_game/decentraland.png`)
                        "
                        :alt="`decentraland`"
                      />
                    </div>
                  </div>
                  <!-- <figure class="h-full">
                      <img
                        :src="
                          require(`@/assets/images/reborn/logo_game/decentraland.png`)
                        "
                        :alt="`decentraland`"
                        class="rounded-xl"
                      />
                    </figure>
                    <div
                      class="
                        card-body
                        items-center
                        text-center
                        place-content-center
                      "
                    ></div> -->
                </div>
                <div
                  class="card image-full grid h-auto flex-grow rounded-box object-cover place-items-center cursor-pointer"
                >
                  <div class="avatar m-4">
                    <div class="w-full lg:w-32">
                      <img
                        :src="
                          require(`@/assets/images/reborn/logo_game/roblox.png`)
                        "
                        :alt="`roblox`"
                      />
                    </div>
                  </div>
                  <!-- <figure class="h-full">
                      <img
                        :src="
                          require(`@/assets/images/reborn/logo_game/roblox.png`)
                        "
                        :alt="`roblox`"
                        class="rounded-xl"
                      />
                    </figure> -->
                  <!-- <div
                      class="
                        card-body
                        items-center
                        text-center
                        place-content-center
                      "
                    ></div> -->
                </div>
                <div
                  class="card image-full grid h-auto flex-grow rounded-box object-cover place-items-center cursor-pointer"
                >
                  <div class="avatar m-4">
                    <div class="w-full lg:w-32">
                      <img
                        :src="
                          require(`@/assets/images/reborn/logo_game/spatial.png`)
                        "
                        :alt="`spatial`"
                      />
                    </div>
                  </div>
                  <!-- <figure class="h-full">
                      <img
                        :src="
                          require(`@/assets/images/reborn/logo_game/spatial.png`)
                        "
                        :alt="`spatial`"
                        class="rounded-xl"
                      />
                    </figure>
                    <div
                      class="
                        card-body
                        items-center
                        text-center
                        place-content-center
                      "
                    ></div> -->
                </div>
                <div
                  class="card image-full grid h-auto flex-grow rounded-box object-cover place-items-center cursor-pointer"
                >
                  <div class="avatar m-4">
                    <div class="w-full lg:w-32">
                      <img
                        :src="
                          require(`@/assets/images/reborn/logo_game/zepeto.png`)
                        "
                        :alt="`zepeto`"
                      />
                    </div>
                  </div>
                  <!-- <figure class="h-full">
                      <img
                        :src="
                          require(`@/assets/images/reborn/logo_game/zepeto.png`)
                        "
                        :alt="`zepeto`"
                        class="rounded-xl"
                      />
                    </figure>
                    <div
                      class="
                        card-body
                        items-center
                        text-center
                        place-content-center
                      "
                    ></div> -->
                </div>
                <!-- </div> -->
                <!-- <div>02</div>
                <div>03</div>
                <div>03</div> -->
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-col w-full lg:px-auto mt-4">
          <div
            class="card-body grid rounded-box place-items-center p-0"
            style="    display: block !important;    width: 100vw;    overflow: hidden;
"
          >
            <div
              class="grid w-full grid-cols-1"
              style="
                /* overflow-x: scroll; */
                scroll-snap-type: x mandatory;
                scroll-behavior: smooth;
                -ms-overflow-style: none;
                scrollbar-width: none;
                position: relative;
                text-align: center;
                box-sizing: border-box;
                display: -webkit-inline-box !important;
              "
            >
              <div
                class="flex flex-col md:flex-col lg:flex-row"
                :style="{
                  transitionDuration: '1s',
                  transform: `translateX(${
                    carousel == 1
                      ? '-100%'
                      : carousel == 2
                      ? '-200%'
                      : carousel == 3
                      ? '-300%'
                      : '0%'
                  })`,
                }"
              >
                <div class="basis-1/2 bg-orange-500" @mouseup="mouseup(e)" @touchmove="touchmove(e)">
                  <video
                    autoplay
                    loop
                    muted="true"
                    preload
                    class="h-full video-0"
                    @contextmenu="(e) => e.preventDefault()"
                    @click="loadVideo(0)"
                  >
                    <!-- <source
                          :src="
                            require(`@/assets/images/reborn/video/Decentraland - Made with Clipchamp.mp4`)
                          "
                          type="video/mp4"
                        /> -->
                    <source
                      :src="`https://invirtualevent.com/posting_backup/video/Decentraland%20-%20Made%20with%20Clipchamp.mp4`"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <!-- <video  :src="require(`@/assets/images/reborn/video/Decentraland - Made with Clipchamp.mp4`)" ></video> -->
                  <!-- <img
                        :src="require(`@/assets/images/reborn/mockup.jpg`)"
                        class="w-full object-cover"
                        style="min-height: 350px"
                      /> -->
                </div>
                <div class="basis-1/2 bg-orange-500">
                  <div
                    class="card-body items-center text-center self-center w-full h-full"
                  >
                    <div class="hero bg-transparent h-full">
                      <div class="hero-content text-center">
                        <div class="w-full">
                          <div class="card-title flex flex-col w-full">
                            <div class="text-2xl lg:text-3xl font-bold">
                              <div class="block lg:flex items-center space-x-2">
                                <div class="avatar">
                                  <div class="w-20 lg:w-16">
                                    <img
                                      :src="
                                        require(`@/assets/images/reborn/logo/decentraland.png`)
                                      "
                                      :alt="`decentraland`"
                                    />
                                  </div>
                                </div>
                                <div
                                  class="text-2xl lg:text-3xl font-extrabold"
                                >
                                  Decentraland
                                </div>
                              </div>
                            </div>
                            <div class="divider my-0"></div>
                          </div>
                          <p class="text-lg md:text-lg lg:text-2xl">
                            พบกับภารกิจเพื่อสุขภาพทั้ง 3 ด่านบน Decentraland
                          </p>
                          <div style="text-align: -webkit-center">
                            <ul
                              style="list-style-type: disc; width: fit-content"
                            >
                              <li
                                class="text-md md:text-lg lg:text-xl"
                                style="text-align: left"
                              >
                                เกมขจัดสิ่งอุดตันในหลอดเลือด
                              </li>

                              <li
                                class="text-md md:text-lg lg:text-xl"
                                style="text-align: left"
                              >
                                เกมลด ละ เลิกสุราและของมึนเมา
                              </li>

                              <li
                                class="text-md md:text-lg lg:text-xl"
                                style="text-align: left"
                              >
                                เกมพิชิตปอดที่สดใส
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex flex-col md:flex-col lg:flex-row"
                :style="{
                  transitionDuration: '1s',
                  transform: `translateX(${
                    carousel == 1
                      ? '-100%'
                      : carousel == 2
                      ? '-200%'
                      : carousel == 3
                      ? '-300%'
                      : '0%'
                  })`,
                }"
              >
                <div class="basis-1/2 bg-orange-500">
                  <video
                    autoplay
                    loop
                    
                    muted="true"
                    preload
                    class="h-full video-1"
                    @contextmenu="(e) => e.preventDefault()"
                    @click="loadVideo(1)"
                  >
                    <!-- <source
                          :src="
                            require(`@/assets/images/reborn/video/Roblox - Made with Clipchamp.mp4`)
                          "
                          type="video/mp4"
                        /> -->
                    <source
                      :src="`https://invirtualevent.com/posting_backup/video/Roblox%20-%20Made%20with%20Clipchamp.mp4`"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <!-- <video  :src="require(`@/assets/images/reborn/video/Decentraland - Made with Clipchamp.mp4`)" ></video> -->
                  <!-- <img
                        :src="require(`@/assets/images/reborn/mockup.jpg`)"
                        class="w-full object-cover"
                        style="min-height: 350px"
                      /> -->
                </div>
                <div class="basis-1/2 bg-orange-500">
                  <div
                    class="card-body items-center text-center self-center w-full h-full"
                  >
                    <div class="hero bg-transparent h-full">
                      <div class="hero-content text-center">
                        <div class="w-full">
                          <div class="card-title flex flex-col w-full">
                            <div class="text-2xl lg:text-3xl font-bold">
                              <div class="block lg:flex items-center space-x-2">
                                <div class="avatar">
                                  <div class="w-20 lg:w-16">
                                    <img
                                      :src="
                                        require(`@/assets/images/reborn/logo/roblox.png`)
                                      "
                                      :alt="`roblox`"
                                    />
                                  </div>
                                </div>
                                <div
                                  class="text-2xl lg:text-3xl font-extrabold"
                                >
                                  Roblox
                                </div>
                              </div>
                            </div>
                            <div class="divider my-0"></div>
                          </div>
                          <p class="text-lg md:text-lg lg:text-2xl">
                            พบกับภารกิจเพื่อสุขภาพทั้ง 3 ด่านบน ROBLOX
                          </p>
                          <div style="text-align: -webkit-center">
                            <ul
                              style="list-style-type: disc; width: fit-content"
                            >
                              <li
                                class="text-md md:text-lg lg:text-xl"
                                style="text-align: left"
                              >
                                เกมหลีกเลี่ยงอาหารที่ไม่ดีต่อสุขภาพ
                              </li>

                              <li
                                class="text-md md:text-lg lg:text-xl"
                                style="text-align: left"
                              >
                                เกมเลือกกินและออกกำลังกายแบบพอดี
                              </li>

                              <li
                                class="text-md md:text-lg lg:text-xl"
                                style="text-align: left"
                              >
                                เกมปัดเป่าสิ่งไม่ดีออกไปจากร่างกาย
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex flex-col md:flex-col lg:flex-row"
                :style="{
                  transitionDuration: '1s',
                  transform: `translateX(${
                    carousel == 1
                      ? '-100%'
                      : carousel == 2
                      ? '-200%'
                      : carousel == 3
                      ? '-300%'
                      : '0%'
                  })`,
                }"
              >
                <div class="basis-1/2 bg-orange-500">
                  <video
                    autoplay
                    loop
                    preload
                    
                    muted="true"
                    class="h-full video-2"
                    @contextmenu="(e) => e.preventDefault()"
                    @click="loadVideo(2)"
                  >
                    <!-- <source
                          :src="
                            require(`@/assets/images/reborn/video/Zepeto Video.mp4`)
                          "
                          type="video/mp4"
                        /> -->
                    <source
                      :src="`https://invirtualevent.com/posting_backup/video/Zepeto%20Video.mp4`"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <!-- <video  :src="require(`@/assets/images/reborn/video/Decentraland - Made with Clipchamp.mp4`)" ></video> -->
                  <!-- <img
                        :src="require(`@/assets/images/reborn/mockup.jpg`)"
                        class="w-full object-cover"
                        style="min-height: 350px"
                      /> -->
                </div>
                <div class="basis-1/2 bg-orange-500">
                  <div
                    class="card-body items-center text-center self-center w-full h-full"
                  >
                    <div class="hero bg-transparent h-full">
                      <div class="hero-content text-center">
                        <div class="w-full">
                          <div class="card-title flex flex-col w-full">
                            <div class="text-2xl lg:text-3xl font-bold">
                              <div class="block lg:flex items-center space-x-2">
                                <div class="avatar">
                                  <div class="w-20 lg:w-16">
                                    <img
                                      :src="
                                        require(`@/assets/images/reborn/logo/zepeto.png`)
                                      "
                                      :alt="`zepeto`"
                                    />
                                  </div>
                                </div>
                                <div
                                  class="text-2xl lg:text-3xl font-extrabold"
                                >
                                  Zepeto
                                </div>
                              </div>
                            </div>
                            <div class="divider my-0"></div>
                          </div>
                          <p class="text-lg md:text-lg lg:text-2xl">
                            Hall of frame<br />
                            ศูนย์รวมเหล่าฮีโร่ผู้พิชิตภารกิจเพื่อสุขภาพได้สำเร็จ
                          </p>
                          <!-- <div style="text-align: -webkit-center">
                                <ul
                                  style="
                                    list-style-type: disc;
                                    width: fit-content;
                                  "
                                >
                                  <li
                                    class="text-md md:text-lg lg:text-xl"
                                    style="text-align: left"
                                  >
                                    เกมขจัดสิ่งอุดตันในหลอดเลือด
                                  </li>

                                  <li
                                    class="text-md md:text-lg lg:text-xl"
                                    style="text-align: left"
                                  >
                                    เกม ลด ละ เลิกสุราและของมึนเมา
                                  </li>

                                  <li
                                    class="text-md md:text-lg lg:text-xl"
                                    style="text-align: left"
                                  >
                                    เกมพิชิตปอดที่สดใส
                                  </li>
                                </ul>
                              </div> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex flex-col md:flex-col lg:flex-row"
                :style="{
                  transitionDuration: '1s',
                  transform: `translateX(${
                    carousel == 1
                      ? '-100%'
                      : carousel == 2
                      ? '-200%'
                      : carousel == 3
                      ? '-300%'
                      : '0%'
                  })`,
                }"
              >
                <div class="basis-1/2 bg-orange-500">
                  <video
                    autoplay
                    loop
                    preload
                    
                    muted="true"
                    class="h-full video-3"
                    @contextmenu="(e) => e.preventDefault()"
                    @click="loadVideo(3)"
                  >
                    <!-- <source
                          :src="
                            require(`@/assets/images/reborn/video/Spatial Video.mp4`)
                          "
                          type="video/mp4"
                        /> -->
                    <source
                      :src="`https://invirtualevent.com/_backup/video/Spatial%20Video.mp4`"
                      type="video/mp4"
                    />

                    Your browser does not support the video tag.
                  </video>
                  <!-- <video  :src="require(`@/assets/images/reborn/video/Decentraland - Made with Clipchamp.mp4`)" ></video> -->
                  <!-- <img
                        :src="require(`@/assets/images/reborn/mockup.jpg`)"
                        class="w-full object-cover"
                        style="min-height: 350px"
                      /> -->
                </div>
                <div class="basis-1/2 bg-orange-500">
                  <div
                    class="card-body items-center text-center self-center w-full h-full"
                  >
                    <div class="hero bg-transparent h-full">
                      <div class="hero-content text-center">
                        <div class="w-full">
                          <div class="card-title flex flex-col w-full">
                            <div class="text-2xl lg:text-3xl font-bold">
                              <div class="block lg:flex items-center space-x-2">
                                <div class="avatar">
                                  <div class="w-20 lg:w-16">
                                    <img
                                      :src="
                                        require(`@/assets/images/reborn/logo/spatial.png`)
                                      "
                                      :alt="`spatial`"
                                    />
                                  </div>
                                </div>
                                <div
                                  class="text-2xl lg:text-3xl font-extrabold"
                                >
                                  Spatial
                                </div>
                              </div>
                            </div>
                            <div class="divider my-0"></div>
                          </div>
                          <p class="text-lg md:text-lg lg:text-2xl">
                            ZEPETO เป็นหมู่บ้านของเหล่าน้องม่อน
                            <br />
                            ที่คอยช่วยให้เราดูแลสุภาพที่ดีห่างไกลจากโรค NCDs
                            <br />
                            ผู้เล่นสามารถเดินเข้าไปพูดคุยกับน้องม่อนเพื่อรับคำแนะนำในการดูแลสุขภาพ
                            <br />
                            พร้อมกับซื้อไอเทมและถ่ายภาพเซลฟี่กับเหล่าน้องม่อนได้
                          </p>
                          <!-- <div style="text-align: -webkit-center">
                                <ul
                                  style="
                                    list-style-type: disc;
                                    width: fit-content;
                                  "
                                >
                                  <li
                                    class="text-md md:text-lg lg:text-xl"
                                    style="text-align: left"
                                  >
                                    เกมขจัดสิ่งอุดตันในหลอดเลือด
                                  </li>

                                  <li
                                    class="text-md md:text-lg lg:text-xl"
                                    style="text-align: left"
                                  >
                                    เกม ลด ละ เลิกสุราและของมึนเมา
                                  </li>

                                  <li
                                    class="text-md md:text-lg lg:text-xl"
                                    style="text-align: left"
                                  >
                                    เกมพิชิตปอดที่สดใส
                                  </li>
                                </ul>
                              </div> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="p-0 flex absolute cursor-pointer mx-2 right-0 top-1/2 w-10 h-10 text-center text-3xl justify-center -translate-y-1/2 text-white"
                @click="next()"
              >
                <font-awesome-icon icon="fa-solid fa-angle-right" />
              </div>
              <div
                class="p-0 flex absolute cursor-pointer mx-2 left-0 top-1/2 w-10 h-10 text-center text-3xl justify-center -translate-y-1/2 text-white"
                @click="back()"
              >
                <font-awesome-icon icon="fa-solid fa-angle-left" />
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="grid grid-col w-full lg:px-auto mt-4">
          <div class="card-body grid rounded-box place-items-center p-0">
            <div class="grid w-full gap-4 grid-cols-1">
              <carousel :autoplay="10000" :wrap-around="true">
                <slide :key="0">
                  <div class="flex flex-col md:flex-col lg:flex-row">
                    <div class="basis-1/2 bg-orange-500">
                      <video
                        autoplay
                        loop
                        preload
                        class="h-full video-0"
                        @contextmenu="(e) => e.preventDefault()"
                        @click="loadVideo(0)"
                      >
                        <source
                          :src="`https://invirtualevent.com/posting_backup/video/Decentraland%20-%20Made%20with%20Clipchamp.mp4`"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div class="basis-1/2 bg-orange-500">
                      <div
                        class="card-body items-center text-center self-center w-full h-full"
                      >
                        <div class="hero bg-transparent h-full">
                          <div class="hero-content text-center">
                            <div class="w-full">
                              <div class="card-title flex flex-col w-full">
                                <div class="text-2xl lg:text-3xl font-bold">
                                  <div
                                    class="block lg:flex items-center space-x-2"
                                  >
                                    <div class="avatar">
                                      <div class="w-20 lg:w-16">
                                        <img
                                          :src="
                                            require(`@/assets/images/reborn/logo/decentraland.png`)
                                          "
                                          :alt="`decentraland`"
                                        />
                                      </div>
                                    </div>
                                    <div
                                      class="text-2xl lg:text-3xl font-extrabold"
                                    >
                                      Decentraland
                                    </div>
                                  </div>
                                </div>
                                <div class="divider my-0"></div>
                              </div>
                              <p class="text-lg md:text-lg lg:text-2xl">
                                พบกับภารกิจเพื่อสุขภาพทั้ง 3 ด่านบน Decentraland
                              </p>
                              <div style="text-align: -webkit-center">
                                <ul
                                  style="
                                    list-style-type: disc;
                                    width: fit-content;
                                  "
                                >
                                  <li
                                    class="text-md md:text-lg lg:text-xl"
                                    style="text-align: left"
                                  >
                                    เกมขจัดสิ่งอุดตันในหลอดเลือด
                                  </li>

                                  <li
                                    class="text-md md:text-lg lg:text-xl"
                                    style="text-align: left"
                                  >
                                    เกมลด ละ เลิกสุราและของมึนเมา
                                  </li>

                                  <li
                                    class="text-md md:text-lg lg:text-xl"
                                    style="text-align: left"
                                  >
                                    เกมพิชิตปอดที่สดใส
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </slide>
                <slide :key="1">
                  <div class="flex flex-col md:flex-col lg:flex-row">
                    <div class="basis-1/2 bg-orange-500">
                      <video
                        autoplay
                        loop
                        preload
                        class="h-full video-1"
                        @contextmenu="(e) => e.preventDefault()"
                        @click="loadVideo(1)"
                      >
                        <source
                          :src="`https://invirtualevent.com/posting_backup/video/Roblox%20-%20Made%20with%20Clipchamp.mp4`"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div class="basis-1/2 bg-orange-500">
                      <div
                        class="card-body items-center text-center self-center w-full h-full"
                      >
                        <div class="hero bg-transparent h-full">
                          <div class="hero-content text-center">
                            <div class="w-full">
                              <div class="card-title flex flex-col w-full">
                                <div class="text-2xl lg:text-3xl font-bold">
                                  <div
                                    class="block lg:flex items-center space-x-2"
                                  >
                                    <div class="avatar">
                                      <div class="w-20 lg:w-16">
                                        <img
                                          :src="
                                            require(`@/assets/images/reborn/logo/roblox.png`)
                                          "
                                          :alt="`roblox`"
                                        />
                                      </div>
                                    </div>
                                    <div
                                      class="text-2xl lg:text-3xl font-extrabold"
                                    >
                                      Roblox
                                    </div>
                                  </div>
                                </div>
                                <div class="divider my-0"></div>
                              </div>
                              <p class="text-lg md:text-lg lg:text-2xl">
                                พบกับภารกิจเพื่อสุขภาพทั้ง 3 ด่านบน ROBLOX
                              </p>
                              <div style="text-align: -webkit-center">
                                <ul
                                  style="
                                    list-style-type: disc;
                                    width: fit-content;
                                  "
                                >
                                  <li
                                    class="text-md md:text-lg lg:text-xl"
                                    style="text-align: left"
                                  >
                                    เกมหลีกเลี่ยงอาหารที่ไม่ดีต่อสุขภาพ
                                  </li>

                                  <li
                                    class="text-md md:text-lg lg:text-xl"
                                    style="text-align: left"
                                  >
                                    เกมเลือกกินและออกกำลังกายแบบพอดี
                                  </li>

                                  <li
                                    class="text-md md:text-lg lg:text-xl"
                                    style="text-align: left"
                                  >
                                    เกมปัดเป่าสิ่งไม่ดีออกไปจากร่างกาย
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </slide>

                <slide :key="2">
                  <div class="flex flex-col md:flex-col lg:flex-row">
                    <div class="basis-1/2 bg-orange-500">
                      <video
                        autoplay
                        loop
                        preload
                        class="h-full video-2"
                        @contextmenu="(e) => e.preventDefault()"
                        @click="loadVideo(2)"
                      >
                        <source
                          :src="`https://invirtualevent.com/posting_backup/video/Zepeto%20Video.mp4`"
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div class="basis-1/2 bg-orange-500">
                      <div
                        class="card-body items-center text-center self-center w-full h-full"
                      >
                        <div class="hero bg-transparent h-full">
                          <div class="hero-content text-center">
                            <div class="w-full">
                              <div class="card-title flex flex-col w-full">
                                <div class="text-2xl lg:text-3xl font-bold">
                                  <div
                                    class="block lg:flex items-center space-x-2"
                                  >
                                    <div class="avatar">
                                      <div class="w-20 lg:w-16">
                                        <img
                                          :src="
                                            require(`@/assets/images/reborn/logo/zepeto.png`)
                                          "
                                          :alt="`zepeto`"
                                        />
                                      </div>
                                    </div>
                                    <div
                                      class="text-2xl lg:text-3xl font-extrabold"
                                    >
                                      Zepeto
                                    </div>
                                  </div>
                                </div>
                                <div class="divider my-0"></div>
                              </div>
                              <p class="text-lg md:text-lg lg:text-2xl">
                                Hall of frame<br />
                                ศูนย์รวมเหล่าฮีโร่ผู้พิชิตภารกิจเพื่อสุขภาพได้สำเร็จ
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </slide>
                <slide :key="3">
                  <div class="flex flex-col md:flex-col lg:flex-row">
                    <div class="basis-1/2 bg-orange-500">
                      <video
                        autoplay
                        loop
                        preload
                        class="h-full video-3"
                        @contextmenu="(e) => e.preventDefault()"
                        @click="loadVideo(3)"
                      >
                        <source
                          :src="`https://invirtualevent.com/posting_backup/video/Spatial%20Video.mp4`"
                          type="video/mp4"
                        />

                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <div class="basis-1/2 bg-orange-500">
                      <div
                        class="card-body items-center text-center self-center w-full h-full"
                      >
                        <div class="hero bg-transparent h-full">
                          <div class="hero-content text-center">
                            <div class="w-full">
                              <div class="card-title flex flex-col w-full">
                                <div class="text-2xl lg:text-3xl font-bold">
                                  <div
                                    class="block lg:flex items-center space-x-2"
                                  >
                                    <div class="avatar">
                                      <div class="w-20 lg:w-16">
                                        <img
                                          :src="
                                            require(`@/assets/images/reborn/logo/spatial.png`)
                                          "
                                          :alt="`spatial`"
                                        />
                                      </div>
                                    </div>
                                    <div
                                      class="text-2xl lg:text-3xl font-extrabold"
                                    >
                                      Spatial
                                    </div>
                                  </div>
                                </div>
                                <div class="divider my-0"></div>
                              </div>
                              <p class="text-lg md:text-lg lg:text-2xl">
                                ZEPETO เป็นหมู่บ้านของเหล่าน้องม่อน
                                <br />
                                ที่คอยช่วยให้เราดูแลสุภาพที่ดีห่างไกลจากโรค NCDs
                                <br />
                                ผู้เล่นสามารถเดินเข้าไปพูดคุยกับน้องม่อนเพื่อรับคำแนะนำในการดูแลสุขภาพ
                                <br />
                                พร้อมกับซื้อไอเทมและถ่ายภาพเซลฟี่กับเหล่าน้องม่อนได้
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </slide>
                <template #addons>
                  <navigation />
                  <pagination />
                </template>
              </carousel>
            </div>
          </div>
        </div> -->

        <div class="lg:bg-base-100 lg:px-auto mt-4" ref="events" id="events">
          <!-- <div class="container mx-auto py-10 bg-base-100"> -->
          <div class="card">
            <!-- <div class="card-body items-center text-center self-center"> -->
            <!-- <div class="card-title flex flex-col w-full">
                  <div class="text-2xl lg:text-3xl font-bold">Event</div>
                  <div class="divider"></div>
                </div> -->
            <!-- <div class="text-xl lg:text-xl font-bold">
                  “ME Verse Opening Day”
                </div> -->

            <!-- <p>
                  สำนักงานกองทุนสนับสนุนการสร้างเสริมสุขภาพ (สสส.) จัดงานเปิดตัว
                  “Me Verse จักรวาลของคนสุขภาพดี” กับมิชชั่นแรกบนแพลตฟอร์ม
                  Decentraland
                  เชิญเข้ามาร่วมทำมิชชั่นเพื่อสุขภาพพร้อมลุ้นรับของรางวัล
                  ในวันศุกร์ที่ 11 พฤศจิกายน 2565 เวลา 13:00 - 14:30 น.
                </p> -->
            <!-- </div> -->
            <figure class="w-full">
              <img
                :src="
                  require(`@/assets/images/Landing_Page_Edit/EventLANDING_PAGE-01.png`)
                "
                alt="Events"
                class="w-full object-cover"
              />
              <!-- :src="`./img/HEADLANDINGPAGE-01.jpg`" -->
            </figure>
          </div>
          <!-- </div> -->
        </div>
        <div
          class="bg-primary-content text-base-100"
          ref="contact"
          id="contact"
        >
          <div class="container mx-auto">
            <div class="card lg:card-side">
              <div class="card-body items-left text-left self-left max-w-full">
                <div class="grid grid-cols-1 lg:grid-cols-6 lg:gap-6">
                  <div class="lg:col-span-1 max-w-xs justify-self-center">
                    <img
                      class="w-auto"
                      :src="
                        require(`@/assets/images/Landing_Page_Edit/ADDRESS.png`)
                      "
                      alt="map"
                    />
                    <!-- <img
                  class=" w-full h-full object-cover"
                  style="min-width:35vw"
                  :src="`./img/PIC/about.png`"
                  alt="Album"
                /> -->
                  </div>
                  <!-- ... -->
                  <div
                    class="mt-4 col-span-5 text-center lg:text-left pb-32 lg:pb-0"
                  >
                    <div
                      class="lg:card-title w-full text-sm text-2xl lg:text-2xl font-bold"
                    >
                      สำนักงานกองทุนสนับสนุนการสร้างเสริมสุขภาพ (สสส.)
                    </div>
                    <div class="text-sm lg:text-2xl font-bold">
                      อาคารศูนย์เรียนรู้สุขภาวะ
                    </div>
                    <p class="text-base-100">
                      เลขที่ 99/8 ซอยงามดูพลี แขวงทุ่งมหาเมฆ<br />
                      เขตสาทร กรุงเทพฯ 10120
                    </p>
                    <!-- <font-awesome-icon icon="fa-brands fa-facebook-f" class="fa-2x" /> -->
                    <p class="text-white">
                      ( UBIS :
                      <a
                        :href="`${
                          $router.resolve({ name: 'privacyPolicy' }).href
                        }`"
                        target="_blank"
                        class="label-text-alt link link-hover font-bold text-white"
                      >
                        Privacy Policy
                      </a>
                      <!-- <a
                        href="#"
                        class="
                          label-text-alt
                          link link-hover
                          font-bold
                          text-white
                        "
                        @click="openweb(`https://pdpa.thaihealth.or.th/content/policy`)"
                      >
                        Privacy Policy
                      </a> -->
                      |
                      <a
                        :href="`${
                          $router.resolve({ name: 'TermsConditions' }).href
                        }`"
                        target="_blank"
                        class="label-text-alt link link-hover font-bold text-white"
                      >
                        Terms & Conditions
                      </a>
                      )
                      <br />
                      <a
                        :href="`https://pdpa.thaihealth.or.th/content/policy`"
                        target="_blank"
                        class="label-text-alt link link-hover font-bold text-white"
                      >
                        Privacy Policy
                      </a>
                      |
                      <!-- <a
                        href="#"
                        class="
                          label-text-alt
                          link link-hover
                          font-bold
                          text-white
                        "
                        @click="showPopup('cookiePolicy')"
                      >
                        Cookie Policy
                      </a> -->
                      <a
                        :href="`https://pdpa.thaihealth.or.th/content/cookiepolicy`"
                        target="_blank"
                        class="label-text-alt link link-hover font-bold text-white"
                      >
                        Cookie Policy
                      </a>
                    </p>
                    <a
                      target="_blank"
                      href="https://www.facebook.com/thaihealth"
                      class="btn btn-ghost mt-2"
                    >
                      <font-awesome-icon
                        icon="fa-brands fa-square-facebook"
                        class="fa-2x"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <!-- <div class="card-body items-left text-left self-left">
             
                
             
              </div> -->
            </div>
          </div>
        </div>
      </template>
    </AppLayout>
  </div>
</template>

<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";

export default {
  name: "UBIS",
  components: {
    AppLayout,
  },
  props: ["showLogin", "showtokens", "token_gameplay"],
  data() {
    return {
      modal_roblox: false,
      roblox_uuid: "",
      link_roblox: null,
      decentraland: null,
      modal_zepeto: false,
      link_zepeto: null,

      modal_decentraland: false,
      link_decentraland: null,

      modal_spatial: false,
      link_spatial: null,
      image: [
        {
          title: "Candy",
          active: false,
          image: {
            block: "_Candy.png",
            active: "Candy.png",
          },
        },
        {
          title: "Fire",
          active: false,
          image: {
            block: "_Fire.png",
            active: "Fire.png",
          },
        },
        {
          title: "Force",
          active: false,
          image: {
            block: "_Force.png",
            active: "Force.png",
          },
        },
        {
          title: "GP_Suit",
          active: false,
          image: {
            block: "_GP_Suit.png",
            active: "GP_Suit.png",
          },
        },
        {
          title: "Kinght",
          active: false,
          image: {
            block: "_Kinght.png",
            active: "Kinght.png",
          },
        },
        {
          title: "MSMK_Suit",
          active: false,
          image: {
            block: "_MSMK_Suit.png",
            active: "MSMK_Suit.png",
          },
        },
      ],
      explore: {
        // decentraland: {
        //   image:
        //     "https://nftevening.com/wp-content/uploads/2021/08/featuredddddd.jpg",
        // },
        // roblox: {
        //   image:
        //     "https://media.wired.com/photos/604be13a1d09b7f18fe49d6c/125:94/w_1436,h_1080,c_limit/Gear-Roblox-jailbreak_1920x1080.jpg",
        // },
        // zepeto: {
        //   image:
        //     "https://assets.moguravr.com/uploads/2021/12/202112081801837000.jpg",
        // },
        // spatial: {
        //   image:
        //     "https://dd2cgqlmnwvp5.cloudfront.net/spatial.io/vid/1080/posters/park-no-avatars.jpg",
        // },
      },
      slide: [
        // "./img/Visual_01_shadow.png",
        "@/assets/images/Landing_Page_Edit/Head Page_No text.png",
        // "https://s3-ap-northeast-1.amazonaws.com/psh-ex-ftnikkei-3937bb4/images/2/4/4/9/39219442-1-eng-GB/photo_SXM2022021500001571.png",
        // "https://venturebeat.com/wp-content/uploads/2021/03/article23-1.jpg?w=1200&strip=all",
        // "https://beaconvcfund.sgp1.cdn.digitaloceanspaces.com/2022/06/metaverse-cover-1288x724-1.jpeg",
      ],
      example_text: `test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test`,
      token: {},
      // game_type : null,
      modal_tokens: false,
      // tab: {
      //   join: "login",
      //   profile: "profile",
      // },
      language: "th",
      carousel: 0,
      interval: null,
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
    user() {
      return this.$store.getters.user;
    },
    rating() {
      return this.$store.getters.rating;
    },
    survey() {
      return this.$store.getters.survey;
    },

    coin() {
      return this.$store.getters.coin;
    },
    gamelist() {
      return this.$store.getters.gamelist;
    },
    jwt() {
      return this.$store.getters.jwt;
    },
    game_type() {
      return this.$store.getters.game_type;
    },
  },
  methods: {
    mouseup(e){
      console.log(e)
    },
    touchmove(e){
      
      console.log(e)
    },
    next() {
      if (this.carousel >= 3) {
        this.carousel = 0;
      } else {
        this.carousel++;
      }
    },
    back() {
      if (this.carousel <= 0) {
        this.carousel = 3;
      } else {
        this.carousel--;
      }
    },
    fn_decentraland() {
      window.open(this.link_decentraland, `_blank_zepeto`).focus();
    },

    fn_spatial() {
      window.open(this.link_spatial, `_blank_zepeto`).focus();
    },
    fn_zepeto() {
      // let route = this.$router.resolve({ name: name });
      // window.open(`${route.href}`, `_popup_${name}`, "width=600,height=600");
      // return false;
      window.open(this.link_zepeto, `_blank_zepeto`).focus();
    },
    fn_update_roblox() {
      // console.log("UPDATe");
      // this.$emit("update_profile", {roblox:roblox_uuid});
      // this.$emit("update_profile",this.profileUpdate.temp)
      // console.log(this.profileUpdate.temp);
      // let image = { ...this.profileUpdate.temp.image[0] };
      // delete image.temp;
      let obj = {
        // image: this.profileUpdate.temp.image,
        roblox: this.roblox_uuid,
        // lastname: this.profileUpdate.temp.lastname,
        // mobile: this.profileUpdate.temp.mobile,
        // roblox: this.profileUpdate.temp.roblox,
        // rating: this.profileUpdate.temp.rating,
        // coin: this.profileUpdate.temp.coin,
        // type: this.profileUpdate.temp.type,
        // comment_feedback: this.profileUpdate.temp.comment_feedback,

        // image: [image],
      };
      if (this.user.type == "email") {
        obj.image = [image];
      }
      fetch(`${this.ServiceUrl}api/controllers/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.jwt}`,
        },

        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res.row);
          if (res.success) {
            // alert("SUCCESS");
            if (localStorage.getItem("jwt")) {
              localStorage.setItem("jwt", res.jwt);
            }
            this.$store.commit("user", res.row);
            this.$store.commit("jwt", localStorage.getItem("jwt"));
            this.modal_roblox = false;
            this.getLink(`${this.link_roblox}`, "Roblox");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // openweb(url) {
    //   // let route = this.$router.resolve({ name: name });
    //   window.open(`${url}`, `_popup_${url}`, "width=600,height=600");
    //   return false;
    // },
    // showPopup(name) {
    //   let route = this.$router.resolve({ name: name });
    //   window.open(`${route.href}`, `_popup_${name}`, "width=600,height=600");
    //   return false;
    // },
    getgamelist() {
      let vm = this;
      fetch(`${this.ServiceUrl}api/controllers/game`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          res.rows.forEach((v, i) => {
            console.log(v.image ? true : false);
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            if (v.type == "decentraland") {
              console.log(v.link);
              this.decentraland = v.link;
            }
            console.log();
            res.rows[i].master = 0;
          });
          this.explore = res;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    getLink(web, type) {
      console.log(web, type);
      // return
      if (type.toLowerCase() == "decentraland") {
        this.modal_decentraland = true;
        this.link_decentraland = web;
        return;
        // <label for="my-modal-5" class="btn">open modal</label>
      }
      if (type.toLowerCase() == "spatial") {
        this.modal_spatial = true;
        this.link_spatial = web;
        return;
        // <label for="my-modal-5" class="btn">open modal</label>
      }

      if (type.toLowerCase() == "roblox" && !this.user.row.roblox) {
        this.modal_roblox = true;
        this.link_roblox = web;
        this.roblox_uuid = "";

        return;
        // <label for="my-modal-5" class="btn">open modal</label>
      }
      if (type.toLowerCase() == "zepeto") {
        this.modal_zepeto = true;
        this.link_zepeto = web;
        return;
        // <label for="my-modal-5" class="btn">open modal</label>
      }

      return window.open(web, "_blank").focus();
    },
    Logout() {
      this.$refs.LoginComponent.Logout();
      this.$refs.AppLayout.joinnows.checked = true;
      this.$refs.AppLayout.profile.checked = false;
    },
    // removeStorage(){
    //   localStorage.removeItem('game_type')
    // }
    loadVideo(id) {
      let video = document.getElementsByClassName(`video-${id}`);
      // let video1 = document.getElementsByClassName("video-1");
      // let video2 = document.getElementsByClassName("video-2");
      // let video3 = document.getElementsByClassName("video-3");
      // console.log(video0)
      if (!video.paused) {
        return;
      }
      for (let key in video) {
        let vi = video[key];
        if (vi.classList) {
          vi.currentTime > 0 && !vi.paused && !vi.ended && vi.readyState > 2
            ? ""
            : vi.play();
        }
      }
      // for (let key in video1) {
      //   let vi = video1[key];
      //   if (vi.classList) {
      //     vi.currentTime > 0 && !vi.paused && !vi.ended && vi.readyState > 2
      //     ? ""
      //     : vi.play();
      //   }

      // }
      // for (let key in video2) {
      //   let vi = video2[key];
      //   if (vi.classList) {
      //     vi.currentTime > 0 && !vi.paused && !vi.ended && vi.readyState > 2
      //     ? ""
      //     : vi.play();
      //   }

      // }

      // for (let key in video3) {
      //   let vi = video3[key];
      //   if (vi.classList) {
      //     vi.currentTime > 0 && !vi.paused && !vi.ended && vi.readyState > 2
      //     ? ""
      //     : vi.play();
      //   }

      // }
    },
  },
  mounted() {
    this.interval ? clearInterval(this.interval) : "";

    let ready = setInterval(() => {
      let video0 = document.getElementsByClassName(`video-0`)[0];
      if(video0.currentTime > 0 &&
      !video0.paused &&
      !video0.ended &&
      video0.readyState > 2){
        video0 = true
      } else {
        try { video0.play() }
        catch(e){}
      }
      let video1 = document.getElementsByClassName(`video-0`)[0];
      if(video1.currentTime > 0 &&
      !video1.paused &&
      !video1.ended &&
      video1.readyState > 2){
        video1 = true
      } else {
        try { video1.play() }
        catch(e){}
      }
      let video2 = document.getElementsByClassName(`video-0`)[0];
      if(video2.currentTime > 0 &&
      !video2.paused &&
      !video2.ended &&
      video2.readyState > 2){
        video2 = true
      } else {
        try { video2.play() }
        catch(e){}
      }
      let video3 = document.getElementsByClassName(`video-0`)[0];
      if(video3.currentTime > 0 &&
      !video3.paused &&
      !video3.ended &&
      video3.readyState > 2){
        video3 = true
      } else {
        try { video3.play() }
        catch(e){}
      }
      
        if(video0 === true && video1=== true &&video2=== true &&video3=== true ){
          clearInterval(ready)
        }
        // console.log(video0,video1,video2,video3)
    }, 1000);

    // this.interval = setInterval(() => {
    //   this.next();
    // }, 10000);
    this.language = localStorage.getItem("language")
      ? localStorage.getItem("language")
      : "th";
    // new Vue({
    //     el: "#app",
    // });

    // video.src = "http://iandevlin.github.io/mdn/video-player/video/tears-of-steel-battle-clip-medium.mp4";
    // video.play();
    // this.game_type = localStorage.getItem('game_type')?localStorage.getItem('game_type'):null
    // localStorage.removeItem('game_type')
    // console.log("game_type"+this.game_type)
    this.getgamelist();
  },
  //   updated(){
  //     console.log('updated')
  //     this.interval?clearInterval(this.interval):''
  // this.interval = setInterval(()=>{
  //   this.carousel++
  // },1000)
  //   },
  beforeDestroy() {},
  watch: {
    // ready: function (val) {
    //   if (val == true) {
    //     this.loadVideo(0);
    //     this.loadVideo(1);
    //     this.loadVideo(2);
    //     this.loadVideo(3);
    //   }
    // },
    showLogin: function (val) {
      this.$emit("response", false);
      this.$refs.AppLayout.joinnows.checked = true;
    },
    showtokens: function (val) {
      console.log(
        "showtokensshowtokensshowtokensshowtokensshowtokensshowtokensshowtokensshowtokens"
      );
      console.log(this.showtokens);
      console.log(this.game_type);
      if (this.showtokens && this.game_type) {
        this.modal_tokens = val;
        // this.$store.commit("game_type", null);
      }
    },
    gamelist: function (val) {
      this.image.forEach((v, i) => {
        this.image[i].active = false;
      });

      if (val.total == 0) {
        return;
      }
      // console.log(this.image)
      // console.log(val)
      val.rows.forEach((v, i) => {
        let index = this.image.findIndex((va) => va.title == v.game_type);

        if (index >= 0) {
          // console.log(v,index);
          this.image[index].active = true;
        }
      });
    },
  },
};
</script>

<style>
img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}
p,
div {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 1em;
}
button:disabled {
  background: #fff;
  color: #ddd;
  cursor: not-allowed;
}
</style>

<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  /* border: 5px solid white; */
  color: whitesmoke;
  width: 100px;
  height: 100px;
}

.carousel__icon {
  width: 75px;
  height: 75px;
}

.carousel__pagination {
  position: absolute;
  bottom: 40px;
  z-index: 1;
  width: 100%;
  place-content: center;
}

.carousel__pagination-button::after {
  width: 20px;
  height: 20px;
  border-radius: 100px;
  /* color: whitesmoke; */
  background: rgba(255, 255, 255, 0.35);
}
.carousel__pagination-button:hover::after,
.carousel__pagination-button--active::after {
  background-color: whitesmoke;
}
</style>