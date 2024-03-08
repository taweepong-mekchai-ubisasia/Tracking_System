<template>
  <div class="Advertising" data-theme="winter">
    <AppLayout ref="AppLayout">
      <template #modal> </template>
      <template #view>
        <div class="grid grid-cols-1 w-full bg-base-200">
          <div class="text-left w-full mt-8">
            <h1 class="text-5xl font-bold text-center text-slate-400">
              Create an advertising post
            </h1>
          </div>
          <div class="flex flex-wrap">
            <div class="px-4 pb-4 lg:px-10 lg:pb-10 w-full">
              <div
                class="grid grid-cols-1 gap-6 mt-8 lg:p-10 xl:grid-cols-3 lg:bg-base-100 rounded-box mb-4"
              >
                <div class="card shadow-lg compact bg-base-100">
                  <figure class="h-full object-cover">
                    <img
                      src="https://picsum.photos/id/1005/600/400"
                      class="h-full object-cover"
                    />
                  </figure>
                </div>
                <div
                  class="card col-span-2 flex-shrink-0 card-bordered border-2 w-full bg-base-100"
                >
                  <div class="card-body w-full">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Title</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Title"
                        class="input input-bordered"
                        v-model="temp.title"
                      />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Description</span>
                      </label>
                      <textarea
                        class="textarea textarea-bordered"
                        placeholder="Description"
                        v-model="temp.description"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="col-span-3 form-control mt-2">
                  <button
                    class="btn btn-lg btn-primary shadow-lg text-white border-transparent hover:border-transparent rounded-2xl self-center"
                    :style="{
                      border: 'unset',
                      backgroundImage:
                        'linear-gradient( to right, #5e839f, #19476a )',
                    }"
                    @click="create()"
                  >
                    Create
                  </button>
                </div>
              </div>
              <div
                class="grid gap-4 auto-cols-max grid-flow-row-dense grid-cols-4"
              >
                <div
                  class="card bg-base-100 shadow-xl card-bordered w-full"
                  v-for="(v, i) in rows"
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
                    <p class="text-sm break-words">
                      {{ v.description }}
                    </p>
                    <div class="card-actions justify-start mt-2">
                      <div class="badge badge-outline">
                        {{ dateTime(v.date) }}
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
import moment from "moment";
export default {
  name: "Advertising",
  components: {
    AppLayout,
  },
  props: [],
  data() {
    return {
      temp: {
        title: null,
        description: null,
        date: null,
      },
      rows: [
        {
          title: "ทดสอบ advertising",
          description:
            "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
          date: "2022-02-02",
        },
      ],
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    create() {
      this.temp.date = new Date();
      this.rows.push(this.temp);
      this.temp = {
        title: null,
        description: null,
        date: null,
      };
    },
  },
  mounted() {},
  updated() {},
  beforeDestroy() {},
  watch: {},
};
</script>
