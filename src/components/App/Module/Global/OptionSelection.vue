<template>
  <!-- {{ create }} -->
  <component
    :is="asyncComponent"
    v-if="asyncComponent"
    :base="modal"
    :create="create ? create : [false]"
    @success="
      (res) => {
        this.modal.page = 1;
      }
    "
  />
  <div class="form-control">
    <label class="label" v-if="label">
      <span class="label-text">{{ label }}</span>
      <span
        v-if="base.form.list"
        class="flex flex-row content-end flex-nowrap items-center"
      >
        <div
          class="multiselect__clear btn btn-error btn-xs text-white"
          v-if="base.form.list.length"
          @click="clearAll()"
        >
          Clear
        </div>
      </span>
    </label>

    <VueMultiselect
      v-model="base.form.list"
      :id="options ? options['id'] : 'base'"
      :label="options ? options['label'] : 'name'"
      :track-by="options ? options['track-by'] : 'code'"
      :placeholder="options ? options['placeholder'] : 'Type to search'"
      :open-direction="options ? options['open-direction'] : 'bottom'"
      :options="base.rows"
      :multiple="options ? options['multiple'] : true"
      :searchable="options ? options['searchable'] : true"
      :loading="base.loading"
      :internal-search="options ? options['internal-search'] : false"
      :clear-on-select="options ? options['clear-on-select'] : false"
      :close-on-select="options ? options['close-on-select'] : false"
      :options-limit="options ? options['options-limit'] : 800"
      :limit="options ? options['limit'] : 999"
      :limit-text="limitText"
      :max-height="options ? options['max-height'] : 200"
      :show-no-results="options ? options['show-no-results'] : false"
      :hide-selected="options ? options['hide-selected'] : false"
      @search-change="base_search"
      @open="base_open"
      :taggable="options ? options['taggable'] : true"
      @tag="base_add"
    >
      <!-- v.image.length > 0
                                    ? (imageSrc = `${
                                        v.image[v.master ? v.master : 0].temp
                                          ? `${serviceUrl}tmps/image/`
                                          : v.imageLink
                                          ? `${v.imageLink}employee/${v.code}/`
                                          : `${serviceUrl}tmps/image/`
                                      }${
                                        v.image[v.master ? v.master : 0].file
                                      }`)
                                    : '' -->

      <template #option="props">
        <!-- {{ props.option.isTag }} -->
        <div class="w-auto inline-flex items-center">
          <span v-if="image && props.option.image" class="mr-4">
            <img
              v-if="props.option.image.length > 0"
              :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=employee/${props.option.code}/${props.option.image[0].file}&s=10`"
              alt="Image"
              style="object-fit: contain"
              class="w-14 h-14 option__image" />
            <img
              class="w-14 h-14 object-cover bg-cover option__image"
              v-else
              :src="`https://mexicana.cultura.gob.mx/work/models/repositorio/img/empty.jpg`"
              alt="Image"
          /></span>
          <!-- <img
        class="option__image"
        :src="
          props.option.image.length > 0
            ? (imageSrc = `${
                props.option.image[
                  props.option.master ? props.option.master : 0
                ].temp
                  ? `${serviceUrl}tmps/image/`
                  : props.option.imageLink
                  ? `${props.option.imageLink}employee/${props.option.code}/`
                  : `${serviceUrl}tmps/image/`
              }${
                props.option.image[
                  props.option.master ? props.option.master : 0
                ].file
              }`)
            : ''
        "
        alt="No Man’s Sky"
      /> -->
          <div class="option__desc">
            <span class="option__title">{{
              props.option.isTag
                ? props.option.label
                : props.option[options.label]
            }}</span>
            <!-- <span class="option__small">{{ props.option.branchTitle }}</span> -->
          </div>
        </div>
      </template>
      <!-- <template #afterList>
        <div v-observe-visibility="reachedEndOfList" v-if="base.next">
          Loading...
        </div>
      </template> -->
      <template #singleLabel="props">
        <div class="w-auto inline-flex items-center">
          <span class="option__image mr-2" v-if="image && props.option.image">
            <img
              v-if="props.option.image.length > 0"
              :src="`${
                props.option.image[0].temp
                  ? `${serviceUrl}tmps/image/`
                  : `${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=employee/${props.option.code}/${props.option.image[0].file}&s=10`
              }`"
              alt="Image"
              style="object-fit: contain"
              class="w-10 h-10"
            />
            <img
              class="w-10 h-10 object-cover bg-cover"
              v-else
              :src="`https://mexicana.cultura.gob.mx/work/models/repositorio/img/empty.jpg`"
              alt="Image"
            />
          </span>
          <span class="option__desc">
            <span class="option__title">{{ props.option[options.label] }}</span>
          </span>
        </div>
      </template>
      <template #tag="{ option, remove }">
        <div
          class="w-auto inline-flex border mx-2 items-center mb-2 rounded p-1"
        >
          <span class="option__image" v-if="image && option.image">
            <img
              v-if="option.image.length > 0"
              :src="`${
                option.image[0].temp
                  ? `${serviceUrl}tmps/image/`
                  : `${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=employee/${option.code}/${option.image[0].file}&s=10`
              }`"
              alt="Image"
              style="object-fit: contain"
              class="w-10 h-10 option__image"
            />
            <img
              class="w-10 h-10 object-cover bg-cover option__image"
              v-else
              :src="`https://mexicana.cultura.gob.mx/work/models/repositorio/img/empty.jpg`"
              alt="Image"
            />
          </span>
          <span class="custom__tag p-2 relative">
            <span>{{
              option[options.label] ? option[options.label] : "-"
            }}</span>
            <span
              class="custom__remove absolute top-0 right-0 text-[10px] px-[2px] py-[0px] text-error font-extrabold cursor-pointer"
              @click="remove(option)"
            >
              ✕
            </span>
          </span>
        </div>
      </template>
      <!-- <template #clear="props">
        <span
          v-if="base.form.list"
          class="flex flex-row content-end flex-nowrap items-center mb-2"
        >
          <div
            class="multiselect__clear btn btn-error btn-xs text-white"
            v-if="base.form.list.length"
            @mousedown.prevent.stop="clearAll(props.search)"
          >
            Clear
          </div>
        </span>
      </template> -->

      <!-- <template #selection="value">
        {{ value() }}
        <span
        v-for="(v,i) in value"
          >{{ v }}</span
        >
      </template> -->
      <template #noOptions>
        <span
          >Oops! No elements found. Consider changing the search query.</span
        >
      </template>
    </VueMultiselect>
  </div>
</template>

<script>
import VueMultiselect from "vue-multiselect";
import Query from "@/assets/js/fetch.js";
// import AppModulePagesTRRVisitorModalItem from "@/components/App/Module/Pages/TRR/Visitor/Modal/Item.vue";
// import viewsAppHREmployee from "@/views/App/HR/Employee.vue";
import { defineAsyncComponent, shallowRef } from "vue";
import { genComponentStyleHook } from "ant-design-vue/es/theme/internal";
export default {
  name: "OptionSelection",
  components: {
    VueMultiselect,
    // viewsAppHREmployee
    // AppModulePagesTRRVisitorModalItem,
  },
  props: {
    options: {
      default: {},
    },
    row: {
      default: 6,
    },
    url: {
      default: null,
    },
    image: {
      default: false,
    },
    label: {
      default: null,
    },
    component: {
      default: null,
    },
    create: {
      default: [false],
    }
  },
  data() {
    return {
      asyncComponent: shallowRef(null),
      // title:'name',
      // asyncComponent: false,
      base: {
        rows: [],
        temp: [],
        total: 0,
        page: 1,
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
      modal: {
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
    };
  },
  //   setup() {
  //     return {};
  //   },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      return this.$store.getters.user_token;
    },
  },
  methods: {
    base_add(v) {
      const tag = {
        code: null,
        // [title]: v,
        image: [],
      };
      tag[this.options.label] = v;

      this.modal.current = 0;
      this.modal.controll = "create";
      this.modal.modal = true;
      this.modal.form = tag;
    },
    reachedEndOfList(reached) {
      if (!reached) return;
      this.base.page++;
      this.base.loading = true;
      this.base.next
        ? this.asyncFind((res) => {
            this.base.rows = this.base.rows.concat([...res.rows]);
            this.base.next = this.base.page * this.row >= this.base.total ? false : true;
            this.base.loading = false;
          })
        : "";
    },
    limitText(count) {
      return `and ${count} other countries`;
    },
    base_open(ele) {
      this.base_search("");
    },
    base_search(query) {
      this.base.rows = [];
      this.base.page = 1;
      this.base.loading = true;

      this.base.q = query;

      this.asyncFind((res) => {
        this.base.rows = res.rows;
        this.base.total = res.total;
        this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
        this.base.back = this.base.page > 1 ? true : false;
        this.base.loading = false;
      });
    },
    asyncFind(callback) {
      new Query("base", "get").get(
        this,
        `${this.url}?total=1&page=${this.base.page}
        ${this.base.q ? `&q=${this.base.q}` : ""}&ubis=1`,
        // ${this.row ? `&rows=${this.row}` : ""}
        (res) => {
          if (!res.success) {
          } else {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });
          }
          callback({ ...res });
        }
      );
    },
    clearAll() {
      this.base.form.list = [];
    },
  },
  setup(props) {
    const asyncComponent = shallowRef(null);

    if (props.component && props.create[0]) {
      props.create = props.create.shift();
      asyncComponent.value = defineAsyncComponent(() =>
        import(`@/components/${props.component}.vue`)
      );
    }

    return { asyncComponent };
  },
  watch: {
    "base.form.list": function (v) {
      this.$emit("lists", v);
    }
  }
};
</script>

<style lang="scss" scoped></style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
