<template>
  <!-- modal base -->
  <!-- {{ base.modal }} -->
  <slot name="modal">
    <input type="checkbox" class="modal-toggle" v-model="base.modal" />
    <div class="modal" v-if="base.modal">
      <div class="modal-box relative w-11/12 max-w-5xl p-2 lg:p-4 max-h-screen">
        <label
          @click="base.modal = false"
          class="btn btn-sm btn-circle absolute right-2 top-2"
          >✕
        </label>

        <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
          <div class="flex-1 form-control mt-6">
            <label for="modal-base" class="btn btn-danger">Cancel</label>
          </div>
          <div class="flex-1 form-control mt-6" @click="base_save()">
            <button class="btn btn-primary text-white">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </slot>
  <div class="Search w-full">
    <!-- {{ current }} -->
    <div class="relative">
      <!-- <div>
    </div> -->
      <!-- <span class="loading loading-spinner text-primary absolute"></span> -->
      <div class="contents absolute z-10 w-full">
        <!-- {{ current }}
        {{ base.current }} -->
        <!-- {{ base.q }}
        {{ base.current[label] }} -->
        <!-- <div class="join w-full"> -->
          <input
            v-if="base.current"
            type="search"
            :placeholder="placeholder"
            class="input input-bordered border-base-content w-full join-item"
            :class="customClass"
            @focus="base.showlist = true"
            @blur="setBlur"
            @keydown="search"
            @input="onQueryChange"
            v-model="base.current[label]"
            :disabled="disabled"
          />
          <!-- {{ base.current }} ffff {{ label }} -->
          <!-- {{ base.showlist }}{{ base.focuslist }} -->
          <!-- {{ base.current }}
{{ code }}
{{ label }} -->
          <!-- <div class=" join-item"> -->
          <!-- <label
            :for="`modal-base${component_name}`"
            :class="customClass2"
            class="btn btn-primary modal-button text-white join-item"
            @click="base.modal = true"
            >NEW</label
          > -->
          <!-- </div> -->
        <!-- </div> -->
        <ul
          class="absolute menu menu-xs bg-base-100 border w-full shadow-lg max-h-60 overflow-auto block z-10"
          :class="subCustomClass ? subCustomClass : ''"
          v-if="base.showlist || base.focuslist"
          ref="scrollComponent"
          @scroll="handleScroll"
          @mouseover="base.focuslist = true"
          @mouseleave="base.focuslist = false"
        >
          <!-- <li>
            <label
              for="modal-base22222"
              class="bg-primary text-white w-full"
              @click="base.modal = true"
            >
              Create
            </label>
          </li> -->

          <li v-for="(v, i) in base.rows" :key="i" @click="setValue(v)">
            <a
              :class="`${v[code] == current ? 'active' : ''}`"
              @click="() => rets"
            >
              <span v-if="image">
                <img
                  v-if="image && v.image.length > 0"
                  :src="`${
                    // v.image[v.master ? v.master : 0].temp
                    //   ? `${serviceUrl}tmps/image/`
                    //   : `${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=QAIndirectItem/${
                    //       v.code
                    //     }/${v.image[v.master ? v.master : 0].file}&s=10`
                    v.image[v.master ? v.master : 0].temp
                      ? `${serviceUrl}tmps/image/`
                      : v.imageLink
                      ? `${v.imageLink}IndirectItem/${v.code}/`
                      : `${serviceUrl}tmps/image/`
                    }${
                      v.image[v.master ? v.master : 0].file
                  }`"
                  alt="Image"
                  style="object-fit: contain"
                  class="w-5 h-5" />
                <img
                  class="w-5 h-5 object-cover bg-cover"
                  v-else
                  :src="`https://mexicana.cultura.gob.mx/work/models/repositorio/img/empty.jpg`"
                  alt="Image"
              /></span>
              {{ v[label] }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- <Multiselect
      ref="multiselect"
      v-model="current"
      :placeholder="placeholder"
      :filter-results="false"
      :min-chars="minChar ? minChar : 2"
      :resolve-on-load="false"
      :delay="delay ? delay : 100"
      :searchable="true"
      :class="customClass"
      @open="
        (select$) => {
          if (select$.noOptions) {
            select$.resolveOptions();
          }
        }
      "
      :options="getData"
    /> -->
  </div>
</template>
<script>
import Query from "@/assets/js/fetch.js";

export default {
  name: "Search",
  components: {},
  props: {
    component_name:{
      default: "-item",
    },
    placeholder: {
      // type: String,
      default: "Input ...",
    },
    customClass: {
      default: "",
    },
    customClass2: {
      default: "",
    },
    subCustomClass: {
      default: "",
    },
    label: {
      default: "title",
    },
    code: {
      default: "code",
    },
    minChar: {
      default: "minChar",
    },
    delay: {
      default: 0.5,
    },
    limit: {
      default: 10,
    },
    url: {
      default: "",
    },
    current: {
      default: null,
    },
    param: {
      default: "",
    },
    disabled: {
      default: false,
    },
    image: {
      default: false,
    },
  },
  data() {
    return {
      old: 0,
      datas: "",
      first: true,
      base: {
        rows: [],
        total: 0,
        page: 1,
        row: 10,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,

        showlist: false,
        focuslist: false,
        current: {},
        temp: {},
        timeout: null,
        delay: 1000,
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
  },
  methods: {
    onQueryChange(e) {
      // console.log(e.target.value);
      this.base.q = e.target.value
      if (e.target.value.trim() == "") {
        // this.base.current = {  };
        // this.base.temp = {  };
        this.search();
        return;
      }
      if (e.target.value.trim().length === 0) {
        // console.log("SDA");
        this.base.current = {};
        this.base.temp = {};
      }
      // console.log("ds");
    },
    setBlur() {
      this.base.showlist = false;
      if (!this.base.showlist && !this.base.focuslist) {
        this.base.current = { ...this.base.temp };
      }
    },
    setValue(v) {
      this.base.showlist = false;
      this.base.focuslist = false;
      // console.log(v);
      this.base.current = { ...v };
      this.base.temp = { ...v };
    },
    handleScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this.base.page++;
        this.base.next
          ? this.base_search((rows) => {
              this.base.rows = this.base.rows.concat([...rows]);
            })
          : "";
      }
    },
    search() {
      console.log(this.base.current[this.label])
      // console.log(this.minChar)
      if (this.base.current[this.label]) {
        // console.log('เข้า')
        // if (this.base.current[this.label] != "") {
          if (this.base.current[this.label].length <= this.minChar) {
            return;
          }
        // }
      }
      // console.log('label', this.base.current[this.label])

      this.base.q = this.base.current[this.label];
      // clearTimeout(this.base.timeout);
      // this.base.timeout = setTimeout(() => {
      //   this.base.page = 1;
      //   this.base_search((rows) => {
      //     this.base.rows = rows;
      //   });
      //   clearTimeout(this.base.timeout);
      // }, this.base.delay * this.delay);

      this.base.page = 1;
      this.base_search((rows) => {
        this.base.rows = rows;
      });
    },
    base_search(callback) {
      this.base.loading = true;
      this.base_get((res) => {
        this.base.total = res.total;
        this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
        this.base.back = this.base.page > 1 ? true : false;
        this.base.loading = false;
        callback(res.rows);
      });
    },
    base_get(callback) {
      // console.log(this.current);

      // console.log(this.user_token)
      // console.log(this.base.q)
      new Query("base", "get").get(
        this,
        `${this.url}?page=${this.base.page}${
          this.base.row ? `&rows=${this.base.row}` : ""
        }${this.base.q ? `&q=${this.base.q}` : ""}${
          this.current ? `&current=${this.current}` : ""
        }${this.param}`,
        (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            if (this.image) {
              res.rows.forEach((v, i) => {
                res.rows[i].image = v.image ? JSON.parse(v.image) : [];
                res.rows[i].master = 0;
              });
            }
          }
          callback({ ...res });
        }
      );
    },
    // search() {
    //   clearTimeout(this.base.timeout);
    //   this.base.timeout = setTimeout(() => {
    //     console.log("SEARCH");
    //     clearTimeout(this.base.timeout);
    //   }, this.base.delay);
    // },
    // getData(q) {
    //   return this.fetchLanguages(q, (res) =>
    //     res.map((item) => ({
    //       value: item,
    //       label: item[this.label ? this.label : "ItemCode"],
    //     }))
    //   );
    // },
    // async fetchLanguages(q, callback) {
    //   return fetch(
    //     `${this.url}?page=1${this.limit ? `&rows=${this.limit}` : ""}${
    //       q ? `&q=${q}` : ""
    //     }${
    //       this.current[this.label ? this.label : "ItemCode"]
    //         ? `&ItemCode=${this.current[this.label ? this.label : "ItemCode"]}`
    //         : ""
    //     }`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("_jwt")}`,
    //       },
    //     }
    //   )
    //     .then((response) => response.json())
    //     .then((res) => callback(res.success ? res.rows : []))
    //     .catch((error) => {
    //       console.error("Error:", error);
    //       return callback([]);
    //     });
    // },
  },
  mounted() {
    this.$nextTick(() => {
      this.page = this.limit;

      this.base.current = {
        [this.label]: "",
        [this.code]: this.current ? this.current : "",
      };
      // !this.current ? () : "";
      this.base_search((rows) => {
        this.base.rows = rows;
        // console.error(this.current);
        // console.table(this.base.rows);
        let current = this.base.rows.find(
          (v, i) => v[this.code] == this.current
        );
        // console.log(current);
        current ? (this.base.current = current) : "";
        this.first = false;
        // this.base.current ? '' : this.base.current[this.label];
      });
      //
      // this.$refs.multiselect.refreshOptions();
    });
  },
  watch: {
    "base.current": function (val) {
      if (this.first) {
        return;
      }
      this.$emit("updateValue", val);
    },
    "base.showlist": function (val) {
      if (val) {
        return this.search();
      }
    },
  },
};
</script>
<!-- <style >
@import url("@vueform/multiselect/themes/default.css");
.multiselect-option.is-selected {
  background: var(--ms-option-bg-selected, #a7a7a7) !important;
  color: var(--ms-option-color-selected, #fff);
}
.multiselect.is-active {
  box-shadow: unset;
  border-radius: var(--rounded-btn, 0.5rem);
}
</style> -->
