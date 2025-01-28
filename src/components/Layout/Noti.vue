<template>

  <div
    title="Notification"
    class="dropdown dropdown-end hidden [@supports(color:oklch(0_0_0))]:block"
  >
    <div
      tabindex="0"
      role="button"
      class="btn btn-link no-underline hover:no-underline text-white gap-0"
      @click="viewNoti()"
    >
      <!-- {{dbList.noti.read}} -->
      <div class="indicator">
        <span
          v-if="dbList.noti.read ? dbList.noti.read[0] ? dbList.noti.read[0].status : false : false"
          class="indicator-item indicator-top indicator-start badge badge-error p-1 border border-white w-1 h-1"
        ></span>
        <button
          class="btn btn-link btn-xs no-underline hover:no-underline text-white font-black"
        >
          <Icon icon="ooui:bell-outline" class="w-5 h-5" />
        </button>
      </div>
      <!-- <Icon icon="ooui:bell-outline" class="w-5 h-5" /> -->
      <Icon
        icon="ph:caret-down-bold"
        class="hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
      />
    </div>
    <div
      tabindex="0"
      class="dropdown-content bg-base-200 text-base-content rounded-box top-px w-64 border border-white/5 shadow-2xl outline outline-1 outline-black/5 mt-16"
    >
      <div class="grid grid-cols-1 gap-2 p-3 border-b-2 border-black/5">
        <button
          class="btn btn-error btn-xs text-center text-white"
          @click="unsetNotificationPermission()"
        >
          Disabled Notification
        </button>
        <button
          class="btn btn-outline btn-xs text-center"
          v-if="dbList.newlist.rows.length > 0"
          @click="clearValue(`${user.code}-noti`)"
        >
          Clear all
        </button>
      </div>
      <div
        class="grid grid-cols-1 gap-3 p-3 h-auto max-h-[calc(100vh-30rem)] overflow-y-auto pt-2"
      >
        <!-- {{ newlist }} -->
        <div
          v-for="(v, i) in dbList.newlist.rows"
          :key="i"
          v-if="dbList.newlist.rows.length > 0"
        >
          <!-- <div> -->
          <!-- <div> -->
          <!-- <div
            class="bg-base-100 text-base-content block text-start outline-offset-4 join-item w-full p-2 pl-3"
          > -->

          <!-- {{ $moment(v.dt).format("YYYY-MM-DD")}} -->
          <div class="divider text-xs mt-0" v-if="i == 0">
            {{ $moment(v.dt).format("DD-MM-YYYY") }}
          </div>
          <div
            class="divider text-xs"
            v-else-if="
              $moment(dbList.newlist.rows[i - 1].dt).format('DD-MM-YYYY') !=
              $moment(v.dt).format('DD-MM-YYYY')
            "
          >
            {{ $moment(v.dt).format("DD-MM-YYYY") }}
          </div>
          <!-- <span class="text-xs" v-if="i == 0">{{ v.dt }}</span>
            <span
              class="text-xs"
             
              >
       
              {{ v.dt }}</span
            > -->
          <!-- </div> -->
          <div class="join w-full" :class="v.class">
            <button
              class=" relative bg-base-100 text-base-content block text-start outline-offset-4 join-item w-full p-2 pl-3"
              @click="changepage(`${user.code}-noti`, `${v._id}`, v.id, i)"
            >
              <!-- <div class="rounded-btn"> -->
              <!-- <span
                    class="bg-base-100 text-base-content block w-full cursor-pointer p-2"
                  > -->
              <!-- <span class="grid grid-cols-5 grid-rows-3"> -->
              <!-- <span
                        class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                      > -->
              <span
                class="absolute right-0 top-0 flex-grow text-xs w-full text-right float-right"
                >Time : {{ $moment(v.dt).format("HH:mm:ss") }}
                <button
                  class="btn btn-link  btn-sm h-auto text-error  no-underline hover:no-underline active:no-underline focus:no-underline "
                  @click="deleteValue(`${user.code}-noti`, v.id, i)"
                >
                  x
                </button>
              </span>

              <br />
              <span class="flex-grow text-xs font-semibold  text-base-content">{{ v.body }}</span>
              <!-- </span> -->
              <!-- </span> -->
              <!-- </span> -->
              <!-- <span
                    class="btn bg-base-100 text-base-content block w-full cursor-pointer font-sans"
                  >
                    <span class="grid grid-cols-5 grid-rows-3">
                      <span
                        class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                      >
                        <span class="flex-grow text-sm">fgh</span>
                      </span>
                    </span>
                  </span> -->
              <!-- </div> -->
            </button>
            <!-- </div> -->
            <!-- </div> -->
            <!-- <select class="select select-bordered join-item">
            <option disabled selected>Filter</option>
            <option>Sci-fi</option>
            <option>Drama</option>
            <option>Action</option>
          </select> -->
            <!-- <div class="indicator"> -->
            <!-- <span class="indicator-item badge badge-secondary">new</span> -->
            <!-- <button
              class="btn join-item btn-ghost text-error btn-xs h-auto border border-red-500"
              @click="deleteValue(`${user.code}-noti`, v.id, i)"
            >
              X
            </button> -->
            <!-- </div> -->
          </div>
        </div>
        <div v-else class="text-xs">Empty Data</div>
        <!-- <button
          v-for="(v, i) in newlist"
          :key="i"
          @click="changepage(`${v._id}`)"
          class="outline-base-content text-start outline-offset-4"
        >
          <div class="rounded-btn">
            <span
              class="bg-base-100 text-base-content block w-full cursor-pointer font-sans"
            >
              <span class="grid grid-cols-5 grid-rows-3">
                <span
                  class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                >
                  <span class="flex-grow text-sm">{{ v.body }}</span>
                </span>
              </span>
            </span>
            <span
              class="btn bg-base-100 text-base-content block w-full cursor-pointer font-sans"
            >
              <span class="grid grid-cols-5 grid-rows-3">
                <span
                  class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                >
                  <span class="flex-grow text-sm">{{ v.body }}</span>
                </span>
              </span>
            </span>
          </div>
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Noti",
  components: {},
  data() {
    return {
      broadcast: new BroadcastChannel("noti-channel"),
      // newnoti: new BroadcastChannel("newnoti-channel"),
      // noti: false,
      // newlist: [],
      db: null,
      dbList: {
        newlist: {
          rows: [],
        },
        noti: {
          read: [{ status: false }],
        },
      },
      // ready: false,
      // addDisabled: false,
      // newlist:[]
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    changepage(name, page, id, i) {
      // this.deleteValue(id, i);
      this.dbList['newlist'].rows[i].class = "zoom";
      setTimeout(async () => {
        await this.deleteValueFromDb(name, id);
        this.dbList.newlist.rows = await this.getValuesFromDb(
          `${this.user.code}-noti`
        );
        console.log(this.dbList.newlist.rows)
        this.$router.push({ name: `${page}` });
      }, 500);
    },
    unsetNotificationPermission() {
      // this.dbList.noti.read = false;
      // localStorage.setItem("notification", false);
      this.broadcast.postMessage({
        type: "unnotification",
        user: JSON.stringify(this.user),
      });
    },
    async getDb(name, rows) {
      return new Promise((resolve, reject) => {
        let request = window.indexedDB.open(name, 1);

        request.onerror = (e) => {
          console.log("Error opening db", e);
          reject("Error");
        };

        request.onsuccess = (e) => {
          resolve(e.target.result);
        };
        // console.log("DASDASDSA")
        request.onupgradeneeded = (e) => {
          console.log("onupgradeneeded");
          let db = e.target.result;
          // console.log(db)
          // console.log(db)
          rows.forEach((v, i) => {
            let objectStore = db.createObjectStore(v, {
              autoIncrement: true,
              keyPath: "id",
            });
          });
        };
      });
    },
    async addValue(name, obj) {
      // this.addDisabled = true;
      // random cat for now
      // let cat = {
      //   name: "Value" + Math.floor(Math.random() * 100),
      //   age: Math.floor(Math.random() * 10) + 1,
      // };
      console.log("about to add " + JSON.stringify(obj));
      await this.addValueToDb(name, obj);
      this.dbList.newlist.rows = await this.getValuesFromDb(name);
      // this.addDisabled = false;
    },

    async deleteValue(name, id, i) {
      this.dbList.newlist.rows[i].class = "mover";
      // console.log(id)
      setTimeout(async () => {
        await this.deleteValueFromDb(name, id);
        this.dbList.newlist.rows = await this.getValuesFromDb(
          `${this.user.code}-noti`
        );
      }, 500);
    },
    async addValueToDb(name, obj) {
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction([name], "readwrite");
        trans.oncomplete = (e) => {
          resolve();
        };

        let store = trans.objectStore(name);
        store.add(obj);
      });
    },
    async deleteValueFromDb(name, id) {
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction([name], "readwrite");
        trans.oncomplete = (e) => {
          resolve();
        };

        let store = trans.objectStore(name);
        store.delete(id);
      });
    },
    async clearValue(name) {
      if (name == `${this.user.code}-noti`) {
        this.dbList.newlist.rows.map((v) => {
          v.class = "mover";
        });
      }

      // console.log(id)
      setTimeout(async () => {
        await this.clearValueFromDb(name);
        // this.dbList.newlist.rows = await this.getValuesFromDb(name);
        this.dbList.newlist.rows = await this.getValuesFromDb(
          `${this.user.code}-noti`
        );
        this.dbList.noti.read = await this.getValuesFromDb(
          `${this.user.code}-news`
        );
      }, 500);
    },
    async clearValueFromDb(name) {
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction([name], "readwrite");
        trans.oncomplete = (e) => {
          resolve();
        };

        let store = trans.objectStore(name);
        store.clear();
      });
    },
    async getValuesFromDb(name) {
      return new Promise((resolve, reject) => {
        let trans = this.db.transaction([name], "readonly");
        trans.oncomplete = (e) => {
          resolve(newlist);
        };

        let store = trans.objectStore(name);
        let newlist = [];

        store.openCursor(null, "prev").onsuccess = (e) => {
          let cursor = e.target.result;
          if (cursor) {
            newlist.push(cursor.value);
            cursor.continue();
          }
        };
      });
    },

    // async getTable(name) {
    //   return new Promise((resolve, reject) => {
    //     console.log(name);
    //     this.db.createObjectStore(name, {
    //       autoIncrement: true,
    //       keyPath: "id",
    //     });
    //   });
    // },
    async viewNoti() {
      await this.clearValueFromDb(`${this.user.code}-news`);
      // await this.addValue(`${this.user.code}-news`, { status: true });
      await this.addValueToDb(`${this.user.code}-news`, { status: false });
      // this.dbList.newlist.rows = await this.getValuesFromDb(name);
      this.dbList.noti.read = await this.getValuesFromDb(
        `${this.user.code}-news`
      );
    },
  },
  unmounted() {
    console.log("NOITO");
    this.broadcast.close();
  },
  async mounted() {
    console.log("NOITO");

    this.$nextTick(async () => {
      // console.error(this.user);
      // console.log(
      //   "EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"
      // );
      let interval = setInterval(async () => {
        if (!this.user) return;
        // console.log("DASDSADASDSA" + this.user.code);
        this.db = await this.getDb("UBIS", [
          `${this.user.code}-noti`,
          `${this.user.code}-news`,
        ]);
        // console.log(this.db)
        // this.table = await this.getTable();
        // this.dbList.newlist.rows = await this.getValuesFromDb("newlist");
        // this.dbList.newlist.db = await this.getDb("noti");
        this.dbList.newlist.rows = await this.getValuesFromDb(
          `${this.user.code}-noti`
        );
        // console.log(this.dbList.newlist.rows)
        this.dbList.noti.read = await this.getValuesFromDb(
          `${this.user.code}-news`
        );
        clearInterval(interval);
        // this.ready = true;
      }, 1000);

      this.broadcast.onmessage = async (event) => {
        // console.log("USER USER USR USR USER")

        // let text = e.data.text();

        // console.log(event);
        if (event.data.type != "new") {
          return;
        }
        // let obj = JSON.parse(event.data.payload);
        // this.dbList.newlist.rows.push(obj);
        // this.addValue("newlist", obj);

        this.dbList.newlist.rows = await this.getValuesFromDb(
          `${this.user.code}-noti`
        );

        await this.clearValueFromDb(`${this.user.code}-news`);
        // await this.addValue(`${this.user.code}-news`, { status: true });
        await this.addValueToDb(`${this.user.code}-news`, { status: true });
        // this.dbList.newlist.rows = await this.getValuesFromDb(name);
        this.dbList.noti.read = await this.getValuesFromDb(
          `${this.user.code}-news`
        );

        // this.db = await this.getDb("UBIS", [`${this.user.code}-noti`,`${this.user.code}-news`]);
        // console.log(event.data.payload);
      };
    });
  },
};
</script>

<style lang="scss" scoped>
@keyframes moveright {
  0% {
    transform: translateX(0px);
    opacity: 100;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
  // 0%   {background-color:red; left:0px; top:0px;}
  // 25%  {background-color:yellow; left:200px; top:0px;}
  // 50%  {background-color:blue; left:200px; top:200px;}
  // 75%  {background-color:green; left:0px; top:200px;}
  // 100% {background-color:red; left:0px; top:0px;}
}
.mover {
  // width: 100px;
  // height: 100px;
  // position: relative;
  // background-color: red;
  animation-name: moveright;
  animation-duration: 0.5s;
}
@keyframes zoomed {
  0% {
    transform: scale(1);
    opacity: 100;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
  // 0%   {background-color:red; left:0px; top:0px;}
  // 25%  {background-color:yellow; left:200px; top:0px;}
  // 50%  {background-color:blue; left:200px; top:200px;}
  // 75%  {background-color:green; left:0px; top:200px;}
  // 100% {background-color:red; left:0px; top:0px;}
}
.zoom {
  // width: 100px;
  // height: 100px;
  // position: relative;
  // background-color: red;
  animation-name: zoomed;
  animation-duration: 0.5s;
}
</style>
