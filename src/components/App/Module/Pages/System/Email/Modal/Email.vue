<template>
  <!-- {{ base.modal }} -->
  <input type="checkbox" class="modal-toggle" v-model="base.modal" />
  <div class="modal" v-if="base.modal">
    <div
      class="modal-box relative w-11/12 md:w-6/12 lg:w-6/12 xl:w-6/12 max-w-5xl p-2 lg:p-4 max-h-screen"
    >
      <label
        @click="base.modal = false"
        class="btn btn-sm btn-circle absolute right-2 top-2"
      >
        ✕
      </label>
      <h3 class="text-lg font-bold text-primary">Email</h3>
      <div class="divider my-1"></div>
      <!-- {{ base.form }} -->
      <div class="card-body overflow-auto max-h-[60vh] p-2 lg:p-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text">พนักงาน</span>
          </label>
          <AppModuleGlobalSelectSearch
            :placeholder="'...'"
            :label="'user_for_create_email'"
            :code="'user_for_create_email'"
            :minChar="0"
            :delay="0.5"
            :limit="10"
            :customClass="`join-item input-sm`"
            :current="base.form.user"
            :refresh="refresh.user"
            @updateValue="
              (obj) => {
                base.form.user = obj.user_for_create_email;
                base.form.emp = obj.code;
              }
            "
            @stopRefresh="
              (obj) => {
                refresh.user = obj.value;
              }
            "
            :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/employee`"
            :param="`&total=1`"
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <div class="join">
            <input
              type="text"
              placeholder="Domain Email"
              class="join-item input input-bordered border-base-content xs:input-xs sm:input-sm w-full"
              v-model="base.form.email"
            />
            <button
              class="join-item btn btn-sm"
              :class="
                base.controll == 'create'
                  ? 'disabled:border-base-content disabled:bg-transparent disabled:text-base-content'
                  : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
              "
              disabled
            >
              @ubisasia.com
            </button>
          </div>
        </div>
      </div>
      <div class="backdrop-blur sticky top-0 items-center gap-2 xs:px-0 sm:px-0 px-4 flex">
        <div class="flex-1 form-control mt-6">
          <label @click="base.modal = false" class="btn  btn-xs sm:btn-sm md:btn-md">Cancel</label>
        </div>
        <div class="flex-1 form-control mt-6" @click="base_save()">
          <button class="btn btn-primary text-white btn-xs sm:btn-sm md:btn-md">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import Query from "@/assets/js/fetch.js";
// import AppModuleGlobalOptionSelection from "@/components/App/Module/Global/OptionSelection.vue";
// const AppModuleGlobalOptionSelection = () => import('@/components/App/Module/Global/OptionSelection.vue');
export default {
  name: "Item",
  components: {
    AppModuleGlobalUpload,
    AppModuleGlobalSelectSearch,
  },
  props: {
    base: {
      default: {
        rows: [],
        temp: [],
        total: 0,
        page: 1,
        row: 3,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
          title: "",
          ref: "",
          list: [],
        },
      },
    },
  },
  emits: ["success"], // <--- add this line
  data() {
    return {
      refresh: false,
    };
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      return this.$store.getters.user_token;
    },
  },
  methods: {
    base_create() {
      this.base.current = 0;
      this.base.form = {
        email: "",
        user: "",
        emp: "",
      };
      this.base.controll = "create";
      this.base.modal = true;
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.base.controll = "edit";

      this.base.modal = true;
    },
    base_save() {
      let obj = {
        code: this.base.current,
        rows: [
          {
            ...Object.assign({ ...this.base.form }),
          },
        ],
      };

      obj['rows'][0]['email'] = this.base.form.email + '@ubisasia.com'

      new Query("base", this.base.controll == "create" ? "POST" : "PUT").set(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/Email`,
        obj,
        (res) => {
          if (!res.success) {
          } else {
            this.base.modal = false;
            this.$emit("success", null);
          }
        }
      );
    },
  },
  mounted() {
    this.$nextTick(() => {});
  },
  beforeCreate() {
    // import(`@/components/App/Module/Global/OptionSelection.vue`).then(
    //   (module) => {
    //     this.$options.components.AppModuleGlobalOptionSelection =
    //       module.default;
    //   }
    // );
  },
};
</script>

<style>
tr.disabled {
  pointer-events: none;
  opacity: 0.3;
  text-decoration: line-through;
  text-decoration-color: red;
}
</style>
