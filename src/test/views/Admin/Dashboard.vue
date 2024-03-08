<template>
  <div class="Dashboard">
    <AdminLayout>
      <template #modal>
        <input type="checkbox" id="modal-logs" class="modal-toggle" />
        <div class="modal">
          <div class="modal-box relative">
            <label
              for="modal-logs"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕</label
            >
            <h3 class="text-lg font-bold">Add new logs!</h3>
            <div class="card-body">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">logs title</span>
                </label>
                <input
                  type="text"
                  placeholder="Title or name"
                  class="input input-bordered"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Description</span>
                </label>
                <input
                  type="text"
                  placeholder="Description"
                  class="input input-bordered"
                />
              </div>
              <div class="form-control">
                <div class="overflow-x-auto w-full">
                  <table class="table table-compact w-full">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th class="text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="hover" v-for="index in 3" :key="index">
                        <th>
                          <div class="flex items-center space-x-3">
                            <div class="avatar">
                              <div class="mask mask-squircle w-12 h-12">
                                <!-- <img
                                  src="../assets/logo.png"
                                  alt="Avatar Tailwind CSS Component"
                                /> -->
                              </div>
                            </div>
                            <!-- <div>
                              <div class="font-bold">Hart Hagerty</div>
                              <div class="text-sm opacity-50">
                                United States
                              </div>
                            </div> -->
                          </div>
                        </th>
                        <td>
                          <div class="flex items-center space-x-3">
                            <!-- <div class="avatar">
                              <div class="mask mask-squircle w-12 h-12">
                                <img
                                  src="../assets/logo.png"
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div> -->
                            <div>
                              <div class="font-bold">Hart Hagerty</div>
                              <div class="text-sm opacity-50">
                                United States
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          Zemlak, Daniel and Leannon
                          <br />
                          <span class="badge badge-ghost badge-sm"
                            >Desktop Support Technician</span
                          >
                        </td>
                        <td>Purple</td>
                        <th class="text-right">
                          <button class="btn btn-ghost btn-xs">edit</button> |
                          <button class="btn btn-ghost btn-xs">remove</button>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="form-control mt-6">
                <button class="btn btn-primary">Confirm</button>
              </div>
              <div class="form-control mt-6">
                <button class="btn btn-danger">Cancle</button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #view>
        <div class="p-4 lg:p-10" v-if="admin">
          <div
            class="
              grid grid-cols-1
              gap-6
              lg:p-10
              xl:grid-cols-3
              lg:bg-base-200
              bg-base-300
              rounded-box
              shadow-2xl
            "
          >
            <div class="hero min-auto xl:col-span-3">
              <div class="hero-overlay bg-dark bg-opacity-0 z-10"></div>
              <div class="hero-content flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Content Management System
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="
                navbar
                col-span-1
                shadow-lg
                xl:col-span-3
                bg-neutral-focus
                text-neutral-content
                rounded-box
                lg:flex
                hidden
              "
            >
              <div class="flex justify-center flex-1 px-2 mx-2">
                <div class="items-stretch hidden lg:flex">
                  <a
                    class="btn btn-ghost btn-sm rounded-btn"
                    @click="$router.push({ name: `admin_gameplay` })"
                  >
                    Gameplay
                  </a>
                  <a
                    class="btn btn-ghost btn-sm rounded-btn"
                    @click="$router.push({ name: `admin_coin` })"
                  >
                    Coin
                  </a>
                  <a
                    class="btn btn-ghost btn-sm rounded-btn"
                    @click="$router.push({ name: `admin_member` })"
                  >
                    Member
                  </a>
                  <a
                    class="btn btn-ghost btn-sm rounded-btn"
                    @click="$router.push({ name: `admin_admin` })"
                  >
                    Admin
                  </a>
                </div>
              </div>
            </div>

            <div class="card shadow-lg compact side bg-base-100">
              <div class="flex-row items-center space-x-4 card-body">
                <div>
                  <div class="avatar">
                    <div class="rounded-full w-14 h-14 shadow">
                      <img
                        src="https://www.lansweeper.com/wp-content/uploads/2018/05/ASSET-USER-ADMIN.png"
                      />
                    </div>
                  </div>
                </div>
                <div class="text-left">
                  <h2 class="card-title text-sm">{{ admin.row.code }}</h2>
                  <p class="text-base-content text-opacity-40">
                    {{ admin.row.firstname }} {{ admin.row.lastname }}
                  </p>
                </div>
              </div>
            </div>
            <div
              class="card shadow-lg compact side bg-base-100"
              v-if="dashboard.rows"
            >
              <!-- <div class="flex-row items-center space-x-4 card-body"> -->
              <!-- <div class="flex-1"> -->
              <div class="stats shadow h-full">
                <div class="stat">
                  <div class="stat-title">Average scores of all scorers</div>
                  <div class="stat-value  "
                  :class="
                  `${dashboard.rows.rating.total<=1?`text-red-500`:`${dashboard.rows.rating.total<=1.5?`text-orange-400`:`${dashboard.rows.rating.total<=2.5?`text-sky-600`:`${dashboard.rows.rating.total<=4?`text-teal-600`:`text-emerald-400`}`}`}`}`
  
                  ">
                    {{ formatPrice(dashboard.rows.rating.total,1) }}
                  </div>
                  <!-- <div class="stat-desc">see item details</div> -->
                </div>
              </div>
              <!-- <h2 class="card-title text-primary">4,600</h2>
                  <p class="text-base-content text-opacity-40 text-left">today records</p> -->
              <!-- </div> -->

              <!-- </div> -->
            </div>
            <div
              class="card row-span-2 shadow-lg compact bg-base-100"
              v-if="dashboard.rows"
            >
              <div class="stats shadow h-full">
                <div class="stat">
                  <div class="stat-title self-center">
                    Today Gameplay Recorded
                  </div>
                  <div class="stat-value self-center">
                    {{ formatPrice(dashboard.rows.gameplay_today.total,0) }}
                  </div>
                  <div class="stat-desc self-center">
                    <a
                      class="btn btn-ghost btn-link btn-sm rounded-btn"
                      @click="$router.push({ name: `admin_gameplay` })"
                    >
                      see item details
                    </a>
                  </div>
                </div>
              </div>
              <!-- <figure>
                <img src="https://picsum.photos/id/1005/600/400" />
              </figure>
              <div class="flex-row items-center space-x-4 card-body">
                <div>
                  <h2 class="card-title">Karolann Collins</h2>
                  <p class="text-base-content text-opacity-40">
                    Direct Interactions Liaison
                  </p>
                </div>
              </div> -->
            </div>
            <div
              class="card shadow-lg compact side bg-base-100"
              v-if="dashboard.rows"
            >
              <!-- <div class="flex-row items-center space-x-4 card-body"> -->
              <!-- <div class="flex-1"> -->
              <div class="stats shadow h-full">
                <div class="stat">
                  <div class="stat-title">Today Gameplay Recorded</div>
                  <div class="stat-value">
                    {{ formatPrice(dashboard.rows.gameplay.total,0) }}
                  </div>
                  <!-- <div class="stat-desc">see item details</div> -->
                </div>
              </div>
              <!-- <h2 class="card-title text-primary">4,600</h2>
                  <p class="text-base-content text-opacity-40 text-left">today records</p> -->
              <!-- </div> -->

              <!-- </div> -->
            </div>
            <div
              class="card shadow-lg compact side bg-base-100"
              v-if="dashboard.rows"
            >
              <!-- <div class="flex-row items-center space-x-4 card-body"> -->
              <!-- <label class="flex-0"
                  ><input
                    type="checkbox"
                    checked="checked"
                    class="toggle toggle-primary"
                /></label>
                <div class="flex-1">
                  <h2 class="card-title">Enable Notifications</h2>
                  <p class="text-base-content text-opacity-40">
                    To get latest updates
                  </p>
                </div> -->
              <div class="stats shadow h-full">
                <div class="stat">
                  <div class="stat-title">Total Users</div>
                  <div class="stat-value">
                    {{ formatPrice(dashboard.rows.user.total,0) }}
                  </div>
                  <!-- <div class="stat-desc">see item details</div> -->
                </div>
              </div>
              <!-- </div> -->
            </div>
            <div
              class="
                card
                col-span-1
                row-span-3
                shadow-lg
                xl:col-span-3
                bg-base-100
              "
            >
              <div class="card-body">
                <h2 class="my-4 text-4xl font-bold card-title">
                  Last 10 games played
                </h2>
                <div class="mb-4 space-x-2 card-actions">
                  <div
                    class="btn btn-xs btn-primary"
                    :class="!decentraland ? `btn-outline` : ''"
                    @click="decentraland = !decentraland"
                  >
                    Decentraland
                  </div>
                  <div
                    class="btn btn-xs btn-primary"
                    :class="!roblox ? `btn-outline` : ''"
                    @click="roblox = !roblox"
                  >
                    Roblox
                  </div>
                  <div
                    class="btn btn-xs btn-primary"
                    :class="!zepeto ? `btn-outline` : ''"
                    @click="zepeto = !zepeto"
                  >
                    Zepeto
                  </div>
                  <div
                    class="btn btn-xs btn-primary"
                    :class="!spatial ? `btn-outline` : ''"
                    @click="spatial = !spatial"
                  >
                    Spatial
                  </div>
                </div>
                <!-- <p>
                  Rerum reiciendis beatae tenetur excepturi aut pariatur est
                  eos. Sit sit necessitatibus veritatis sed molestiae voluptates
                  incidunt iure sapiente.
                </p> -->
                <div class="overflow-x-auto">
                  <table class="table table-compact w-full mb-4">
                    <thead>
                      <tr>
                        <th>รหัส / ผู้ใช้งาน</th>
                        <th>เกมส์</th>
                        <th>วันที่เล่น</th>
                        <th>ผู้เล่น</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(v, i) in gameplay.rows" :key="i">
                        <th>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="text-sm font-bold">
                                {{ v.code }}
                              </div>
                              <div class="text-sm opacity-50">
                                {{ v.firstname }} {{ v.lastname }}
                              </div>
                            </div>
                          </div>
                        </th>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="text-sm font-bold">
                                {{ v.game_type }}
                              </div>
                              <div class="text-sm opacity-50">
                                uuid : {{ v.game_uid }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="text-sm opacity-50">
                            วันที่สร้าง : {{ v.created_at }}
                          </div>
                          <div class="text-sm opacity-50">
                            วันที่ยืนยัน :
                            {{
                              v.updated_at ? v.updated_at : "ยังไม่ได้ยืนยัน"
                            }}
                          </div>
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="font-bold">{{ v.type }}</div>
                              <div
                                class="text-sm opacity-50"
                                v-if="v.type == 'facebook'"
                              >
                                {{ v.facebook }}
                              </div>
                              <div class="text-sm opacity-50" v-else>
                                {{ v.email }}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- <table class="table table-compact w-full">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>company</th>
                        <th>location</th>
                        <th>Last Login</th>
                        <th>Favorite Color</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Littel, Schaden and Vandervort</td>
                        <td>Canada</td>
                        <td>12/16/2020</td>
                        <td>Blue</td>
                      </tr>
                      <tr>
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Zemlak, Daniel and Leannon</td>
                        <td>United States</td>
                        <td>12/5/2020</td>
                        <td>Purple</td>
                      </tr>
                      <tr>
                        <th>3</th>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Carroll Group</td>
                        <td>China</td>
                        <td>8/15/2020</td>
                        <td>Red</td>
                      </tr>
                      <tr>
                        <th>4</th>
                        <td>Marjy Ferencz</td>
                        <td>Office Assistant I</td>
                        <td>Rowe-Schoen</td>
                        <td>Russia</td>
                        <td>3/25/2021</td>
                        <td>Crimson</td>
                      </tr>
                      <tr>
                        <th>5</th>
                        <td>Yancy Tear</td>
                        <td>Community Outreach Specialist</td>
                        <td>Wyman-Ledner</td>
                        <td>Brazil</td>
                        <td>5/22/2020</td>
                        <td>Indigo</td>
                      </tr>
                      <tr>
                        <th>6</th>
                        <td>Irma Vasilik</td>
                        <td>Editor</td>
                        <td>Wiza, Bins and Emard</td>
                        <td>Venezuela</td>
                        <td>12/8/2020</td>
                        <td>Purple</td>
                      </tr>
                      <tr>
                        <th>7</th>
                        <td>Meghann Durtnal</td>
                        <td>Staff Accountant IV</td>
                        <td>Schuster-Schimmel</td>
                        <td>Philippines</td>
                        <td>2/17/2021</td>
                        <td>Yellow</td>
                      </tr>
                      <tr>
                        <th>8</th>
                        <td>Sammy Seston</td>
                        <td>Accountant I</td>
                        <td>O'Hara, Welch and Keebler</td>
                        <td>Indonesia</td>
                        <td>5/23/2020</td>
                        <td>Crimson</td>
                      </tr>
                      <tr>
                        <th>9</th>
                        <td>Lesya Tinham</td>
                        <td>Safety Technician IV</td>
                        <td>Turner-Kuhlman</td>
                        <td>Philippines</td>
                        <td>2/21/2021</td>
                        <td>Maroon</td>
                      </tr>
                      <tr>
                        <th>10</th>
                        <td>Zaneta Tewkesbury</td>
                        <td>VP Marketing</td>
                        <td>Sauer LLC</td>
                        <td>Chad</td>
                        <td>6/23/2020</td>
                        <td>Green</td>
                      </tr>
                    </tbody>
                  </table> -->
                </div>
                <!-- <div class="justify-end space-x-2 card-actions">
                  <button class="btn btn-primary">Login</button>
                  <button class="btn">Register</button>
                </div> -->
              </div>
            </div>
            <!-- <div class="card shadow-lg compact side bg-base-100">
              <div class="flex-row items-center space-x-4 card-body">
                <div class="flex-1">
                  <h2 class="flex card-title">
                    <button
                      class="btn btn-ghost btn-sm btn-circle loading"
                    ></button>
                    Downloading...
                  </h2>
                  <progress
                    value="70"
                    max="100"
                    class="progress progress-secondary"
                  ></progress>
                </div>
                <div class="flex-0">
                  <button class="btn btn-circle">
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
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="card shadow-lg compact side bg-base-100">
              <div class="flex-row items-center space-x-4 card-body">
                <label class="cursor-pointer label"
                  ><input
                    type="checkbox"
                    checked="checked"
                    class="checkbox checkbox-accent"
                  />
                  <span class="mx-4 label-text">Enable Autosave</span></label
                >
              </div>
            </div> -->
          </div>
        </div>

        <!-- <div class="hero min-auto" ref="home" id="home">
          <div
            class="hero-overlay bg-dark bg-opacity-0 z-10"
            style="min-height: 80vh"
          ></div>
          <div class="hero-content flex-col lg:flex-row-reverse w-full">
            <div class="container">
              <div class="text-center lg:text-center">
                <div class="text-3xl lg:text-5xl font-bold" ref="text">
                  Wellcome Admin
                </div>
                <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                  Content Management System
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </template>
    </AdminLayout>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminLayout from "@/components/Admin/layout.vue";

export default {
  name: "Dashboard",
  components: {
    AdminLayout,
  },
  data() {
    return {
      decentraland: false,
      roblox: false,
      zepeto: false,
      spatial: false,
      gameplay: {
        rows: [],
        total: 0,
        page: 1,
        row: 10,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
          name: "",
          number: "",
          size: "",
          description: "",
          category_id: "0",
          store_id: "0",
          recommend: "",
          room: "",
          imageLink: "",
          image: [],
        },
      },
      // rating:{rows:null},
      dashboard: {
        rows: null,
      },
      remove: {
        current: 0,
        model: false,
        controll: "",
      },
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    admin() {
      return this.$store.getters.admin;
    },
  },
  methods: {
    formatPrice(value,digit) {
        let val = (value/1).toFixed(digit).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },

    gameplay_next() {
      this.gameplay.page++;
      this.gameplay_search();
    },
    gameplay_back() {
      this.gameplay.page--;
      this.gameplay_search();
    },
    logs_search() {
      this.logs.loading = true;
      this.logs_get((res) => {
        // console.log(res.rows);
        let length = res.rows.length;
        for (let i = 0; i < length; i++) {
          res.rows[i].memo = res.rows[i].memo
            ? JSON.parse(res.rows[i].memo)
            : {};
        }

        // res.rows.map(v=>v?JSON.parse(v.memo):{})
        //   console.log(res.rows)
        // logs_code":"1111","logs_title":"ขอบสีน้ำตาลฟ้า"

        this.logs.rows = res.rows;
        this.logs.total = res.total;
        // console.log(this.logs.page*this.logs.row)

        // console.log(this.logs.total)
        this.logs.next =
          this.logs.page * this.logs.row > this.logs.total ? false : true;
        this.logs.back = this.logs.page > 1 ? true : false;

        this.logs.loading = false;
      });
    },
    gameplay_search() {
      this.gameplay.loading = true;
      this.gameplay_get((res) => {
        this.gameplay.rows = res.rows;
        this.gameplay.total = res.total;
        this.gameplay.next =
          this.gameplay.page * this.gameplay.row >= this.gameplay.total
            ? false
            : true;
        this.gameplay.back = this.gameplay.page > 1 ? true : false;

        this.gameplay.loading = false;
      });
    },
    gameplay_get(callback) {
      fetch(
        `${this.ServiceUrl}controllers/admin/gameplay?page=${
          this.gameplay.page
        }${this.gameplay.row ? `&rows=${this.gameplay.row}` : ""}${
          this.gameplay.q ? `&q=${this.gameplay.q}` : ""
        }${this.decentraland?`&decentraland=${this.decentraland}`:``}${this.roblox?`&roblox=${this.roblox}`:``}${this.zepeto?`&zepeto=${this.zepeto}`:``}${this.spatial?`&spatial=${this.spatial}`:``}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${localStorage.getItem("_jwt")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          callback(
            res.success
              ? { rows: res.rows, total: res.total }
              : { rows: [], total: 0 }
          );
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },

    dashboard_search() {
      this.dashboard_get((res) => {
        this.dashboard.rows = res;
      });
    },
    dashboard_get(callback) {
      fetch(
        `${this.ServiceUrl}controllers/admin/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${localStorage.getItem("_jwt")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          callback(
            res
          );
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },
   
  },
  mounted() {
    this.gameplay_search();
    this.dashboard_search();
  },
  watch: {
    decentraland: function (val) {
      console.log(val);
      this.gameplay_search();
    },
    roblox: function (val) {
      console.log(val);
      this.gameplay_search();
    },
    zepeto: function (val) {
      console.log(val);
      this.gameplay_search();
    },
    spatial: function (val) {
      console.log(val);
      this.gameplay_search();
    },
  },
};
</script>
