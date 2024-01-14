<template>
  <div class="Survey" data-theme="winter">
    <AppLayout
      ref="AppLayout"
      @setgame="$emit('setgame')"
      @getgame="$emit('getgame')"
    >
      <template #modal>
        <input
          type="checkbox"
          id="modal-aa"
          v-model="modal"
          class="modal-toggle"
        />

        <div class="modal">
          <div
            class="modal-box relative text-center m-0 p-0 w-12/12 max-w-5xl h-full"
          >
            <div
              class="navbar absolute top-0 left-0 bg-base-100 z-10 shadow-sm"
            >
              <div class="navbar-start"></div>

              <div class="navbar-center">
                <a class="btn btn-ghost normal-case text-xl"
                  >Create survey post</a
                >
              </div>
              <div class="navbar-end">
                <label
                  for="modal-aa"
                  class="btn btn-sm btn-ghost absolute right-2 top-2"
                  >✕</label
                >
              </div>
            </div>

            <div
              class="navbar absolute bottom-0 left-0 bg-base-100 z-10 border px-4 pt-2 pb-4"
            >
              <button
                :disabled="checking"
                @click="create()"
                class="btn btn-block"
              >
                บันทึก
              </button>
            </div>
            <div
              class="card-body text-left overflow-auto h-full gap-0 py-20 px-4"
              style="max-height: inherit"
            >
              <div
                class="p-4 preview border-base-300 bg-base-200 rounded-t-box items-center justify-center gap-2 border"
              >
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">ชื่อแบบสอบถาม</span>
                  </label>
                  <input
                    type="text"
                    min="0"
                    placeholder="ชื่อแบบสอบถาม"
                    class="input input-bordered input-sm w-full"
                    v-model="temp.title"
                  />
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">วันที่สิ้นสุด</span>
                    </label>
                    <datepicker
                      v-model="temp.ended_at"
                      :class="`input input-bordered input-sm w-full lg:w-fit `"
                    />
                  </div>
                  <div class="form-control justify-self-end">
                    <label class="label">
                      <span class="label-text">จำนวนผู้เข้าร่วม</span>
                    </label>
                    <label class="input-group input-group-sm">
                      <span>สูงสุด</span>
                      <input
                        type="number"
                        min="0"
                        placeholder="จำนวนผู้เข้าร่วมสูงสุด"
                        class="input input-bordered input-sm text-right"
                        style="width: inherit"
                        v-model="temp.maximum"
                      />
                      <span>คน</span>
                    </label>
                  </div>
                </div>
              </div>
              <draggable
                class="dragArea list-group w-full"
                :list="temp.lists"
                @change="log"
              >
                <template v-for="(v, i) in temp.lists" :key="i">
                  <div
                    :class="`${i % 2 == 0 ? 'bg-base-300' : 'bg-slate-300'}`"
                    class="card w-full border-base-300 border-b-slate-300 border-t-slate-300 rounded-none border"
                  >
                    <div class="card-body p-3">
                      <div class="form-control">
                        <label class="label">
                          <span class="label-text">คำถามที่ {{ i + 1 }}</span>
                        </label>
                        <input
                          type="text"
                          placeholder="คำถาม..."
                          class="input input-bordered input-sm"
                          v-model="v.question"
                        />
                      </div>
                      <label class="label">
                        <span class="label-text">คำตอบ</span>
                      </label>
                      <draggable
                        class="dragArea list-group w-full"
                        :list="v.answer"
                      >
                        <div
                          class="form-control"
                          v-for="(v2, i2) in v.answer"
                          :key="`${i}${i2}`"
                        >
                          <label class="input-group input-group-sm">
                            <span class="w-10">{{ i2 + 1 }}.</span>
                            <input
                              type="text"
                              v-model="v2.text"
                              :placeholder="`คำตอบลำดับที่ ${i2 + 1}`"
                              class="input input-bordered input-sm w-full"
                            />
                          </label>
                        </div>
                      </draggable>
                      <button
                        @click="temp.lists[i].answer.push({ text: '' })"
                        class="btn btn-block btn-link hover:no-underline btn-sm"
                      >
                        เพิ่มคำตอบ
                      </button>
                    </div>
                  </div>
                </template>
              </draggable>
              <div
                class="preview border-base-300 bg-base-200 rounded-b-box flex flex-wrap items-center justify-center gap-2 border"
              >
                <button
                  @click="temp.lists.push({ question: '', answer: [] })"
                  class="btn btn-link hover:no-underline btn-sm"
                >
                  เพิ่มคำถาม
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #view>
        <div class="grid grid-cols-1 w-full bg-base-200">
          <div class="text-left w-full mt-8">
            <h1 class="text-5xl font-bold text-center text-slate-400">
              My Survey post
            </h1>
          </div>
          <div class="flex flex-wrap">
            <div class="px-4 pb-4 lg:px-10 lg:pb-10 w-full">
              <div
                class="grid grid-cols-1 gap-6 mt-8 xl:grid-cols-3 lg:bg-base-200 rounded-box"
              >
                <div
                  class="card col-span-3 flex-shrink-0 card-bordered border-2 w-full bg-base-100"
                >
                  <div class="card-body w-full">
                    <div class="form-control">
                      <label
                        for="modal-aa"
                        class="btn text-white"
                        :style="{
                          border: 'unset',
                          backgroundImage:
                            'linear-gradient( to right, #5e839f, #19476a )',
                        }"
                        @click="
                          () => {
                            temp = {
                              title: null,
                              data: null,
                              maximum: null,
                              lists: [],
                            };
                          }
                        "
                      >
                        Create
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="grid gap-4 auto-cols-max grid-flow-row-dense grid-cols-4 mt-4"
              >
                <div
                  class="card bg-base-100 shadow-xl card-bordered w-full"
                  v-for="(v, i) in survey.rows"
                  :key="i"
                >
                  <figure class="mt-4">
                    <img :src="require(`@/assets/images/11.png`)" alt="Shoes" />
                  </figure>
                  <div class="card-body pt-0">
                    <div class="divider"></div>
                    <h2 class="card-title">
                      {{ v.title }}
                    </h2>
                    <div class="card-actions justify-end">
                      <div class="badge badge-outline">
                        max : 0 / {{ v.maximum }}
                      </div>
                      <div class="badge badge-outline">
                        ending : {{ dateTime(v.ended_at) }}
                      </div>
                    </div>
                    <button class="btn btn-ghost btn-md absolute top-2 right-2">
                      <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/components/App/layout.vue";
import { VueDraggableNext } from "vue-draggable-next";
import Datepicker from "vue3-datepicker";
import moment from "moment";
// import { remove } from 'firebase/database';
export default {
  name: "Survey",
  components: {
    AppLayout,
    draggable: VueDraggableNext,
    Datepicker,
  },
  props: [],
  data() {
    return {
      survey: {
        rows: [
          {
            title: "ตัวอย่าง title",
            ended_at: "2022-12-01",
            maximum: 50,
            lists: [],
          },
        ],
        total: 0,
        page: 1,
        row: 20,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
          title: "",
          link: "",
          type: "",
          imageLink_empty: "",
          image_empty: [],
          imageLink_active: "",
          image_active: [],
          imageLink: "",
          image: [],
        },
      },
      modal: false,
      temp: {
        title: null,
        ended_at: null,
        maximum: null,
        lists: [],
      },
    };
  },
  computed: {
    checking() {
      let notReady = true;
      if (this.temp.lists.length > 0) {
        notReady = false;
        let f = this.temp.lists.find((v) => v.question == "");
        f ? (notReady = true) : "";
      }
      return notReady;
    },
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
  },
  methods: {
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    search() {
      this.survey.loading = true;
      console.log("DSADAS")
      this.survey_get((res) => {
        this.survey.rows = res.rows;
        this.survey.total = res.total;
        this.survey.next =
          this.survey.page * this.survey.row >= this.survey.total
            ? false
            : true;
        this.survey.back = this.survey.page > 1 ? true : false;
        this.survey.loading = false;
      });
    },
    survey_get(callback) {
      fetch(
        `${this.ServiceUrl}controllers/survey?page=${this.survey.page}${
          this.survey.row ? `&rows=${this.survey.row}` : ""
        }${this.survey.q ? `&q=${this.survey.q}` : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("_jwt")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.rows.length > 0) {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });
          }
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
    insert() {},
    update() {},
    remove() {},
    create() {
      this.survey.rows.push(this.temp);
      this.modal = false;
    },
    log(e) {
      console.log(this.temp.lists);
    },
  },
  mounted() {
    this.search();
    //  mounted() {
    // this.tmpsLink = this.tmpsLink = `${this.ServiceUrl}tmps/`;
  },
  updated() {},
  beforeDestroy() {},
  watch: {},
};
</script>