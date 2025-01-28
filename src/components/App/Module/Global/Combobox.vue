<template>
  <teleport to="#app" v-if="hasPermission">
    <Suspense>
      <template #default>
        <component
          :is="asyncComponent"
          v-if="asyncComponent"
          v-model="compo.data"
          :create-value="base.search[0].value"
          @update:success="fnBase.success"
          ref="baseModal"
        />
      </template>
      <template #fallback>
        <p>Loading component...</p>
      </template>
    </Suspense>
  </teleport>

  <div 
    class="form-control" 
  >
    <label
      class=""
      :class="
        inSearch
          ? 'absolute top-[-0.5rem] left-[0.65rem] text-xs bg-white z-10 font-bold text-opacity-50'
          : 'label'
      "
      v-if="label != 'Description' && label != ''"
    >
      <span class="label-text text-xs sm:text-sm md:text-md">{{ label }}</span>
    </label>
    <div class="relative">
      <div class="relative w-full" ref="dropdownWrapper">
        <div
          :readonly="disabled === true"
          @click="toggleDropdown"
          class="input-bordered border-base-content cursor-pointer flex items-center justify-between space-x-2 input"
          :class="inSearch || label == 'Description' ? 'input-xs sm:input-sm' : 'input-xs sm:input-sm md:input-md'"
        >
          <span class="flex-grow truncate">
            <span class="flex" v-if="selectMode === 'single'">
              <span class="flex item justify-center">
                <span
                  :class="
                    inSearch ? 'input-xs sm:input-sm' : ' input-xs sm:input-sm md:input-md '
                  "
                  class="flex p-1"
                  v-if="list.length > 0 && showImages && image"
                >
                  <div class="avatar">
                    <div class="h-full w-auto rounded mr-2">
                      <img
                        :src="
                          list[0].image[0]
                            ? `${list[0].imageLink}${
                                imagePath ? imagePath : label
                              }/${list[0].code}/${list[0].image[0].file}`
                            : defaultImage
                        "
                        alt="option image"
                      />
                    </div>
                  </div>
                </span>
                <span v-if="list.length > 0" class="flex items-center">
                  {{ list[0][fieldDisplay] }}
                </span>
                <span v-else class="opacity-60">{{ `Select ${label}` }}</span>
              </span>
            </span>

            <span v-else>
              <span v-if="list.length === 0">Select options</span>
              <span v-else class="flex items-center space-x-1">
                <span class="font-bold opacity-70 text-primary"
                  >( {{ list.length }} selected )</span
                >
                <span v-for="(v, i) in list" :key="i" class="truncate text-xs">
                  {{ v[fieldDisplay] }}{{ i < list.length - 1 ? ", " : "" }}
                </span>
              </span>
            </span>
          </span>
          <div class="flex items-center space-x-1">
            <button
              v-if="image"
              @click.stop="toggleShowImages"
              class="text-blue-500 text-xs rounded btn btn-xs btn-link m-0 p-0"
            >
              <span class="block md:hidden">
                {{ showImages ? "Hide Image" : "Show Image" }}
              </span>
              <Icon
                class="hidden md:block h-6 w-6"
                icon="circum:image-on"
                v-if="showImages"
              />
              <Icon
                class="hidden md:block h-6 w-6"
                icon="circum:image-off"
                v-else
              />
            </button>
            <button
              v-if="list.length > 0"
              @click.stop="clearAll"
              class="text-xs rounded btn btn-xs btn-link text-error m-0 p-0"
              :class="disabled === true ? 'hidden' : ''"
            >
              <Icon
                class="block md:hidden h-6 w-6"
                icon="material-symbols:close"
              />
              <span class="hidden md:block">Clear</span>
            </button>
            <button
              class="text-primary pl-1"
              :class="disabled === true ? 'hidden' : ''"
            >
              ▼
            </button>
          </div>
        </div>
        <div
          v-if="showDropdown"
          class="absolute top-full left-0 w-full bg-white border rounded shadow-lg z-50"
        >
          <div class="join w-full border-b">
            <input
              v-model="base.search[0].value"
              @input="fnBase.search"
              @keyup.enter="compo_create"
              type="text"
              placeholder="Search options..."
              class="join-item w-full p-2 outline-none focus:ring focus:ring-blue-200 rounded-none"
              :class="
                inSearch ? 'input-xs sm:input-sm' : 'input-xs sm:input-sm md:input-md'
              "
            />
            <button
              v-if="hasPermission && !inSearch"
              @click="compo_create"
              class="join-item btn btn-link text-primary"
              :class="inSearch ? 'btn-xs sm:btn-sm' : 'btn-xs sm:btn-sm md:btn-md'"
            >
              <Icon icon="typcn:plus" />
            </button>
          </div>
          <div
            v-if="base.data.form.rows.length == 0"
            class="flex flex-row justify-center items-center px-4 py-10 border border-base-300"
          >
            <Icon
              icon="pajamas:review-warning"
              class="w-8 h-8 sm:w-10 sm:h-10 md:w-14 mdh-14 text-warning"
            />
            <span class="font-extrabold opacity-50">Empty Data</span>
          </div>
          <div class="max-h-60 overflow-auto">
            <div
              v-for="(v, i) in base.data.form.rows"
              :key="v.id"
              class="cursor-pointer hover:bg-gray-200 flex items-center justify-between"
              :class="
                inSearch ? 'p-1 text-xs' : 'text-xs sm:text-sm md:text-md'
              "
              @click="handleOptionClick(v)"
            >
              <input type="checkbox" :checked="isSelected(v)" class="hidden" />
              <div class="flex items-center space-x-2">
                <span
                  class="flex p-1"
                  :class="
                    inSearch ? 'input-xs sm:input-sm' : 'input-xs sm:input-sm md:input-md'
                  "
                >
                  <div class="avatar" v-if="showImages && image">
                    <div class="h-full w-auto rounded mr-2">
                      <img
                        :src="
                          v.image[0]
                            ? `${v.imageLink}${imagePath ? imagePath : label}/${
                                v.code
                              }/${v.image[0].file}`
                            : defaultImage
                        "
                        alt="option image"
                        class="w-6 h-6 rounded"
                      />
                    </div>
                  </div>
                  <span class="truncate flex items-center">
                    {{ v[fieldDisplay] }}
                  </span></span
                >
              </div>
              <span v-if="isSelected(v)" class="text-blue-500 text-xs ">
                (Selected)
              </span>
            </div>
            <div
              v-observe-visibility="handleVisibility"
              class="p-2 text-center text-gray-500"
              v-if="base.data.rows.length < base.pagination.total"
            >
              Loading more...
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Query from "@/assets/js/fetch_v2.js";
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";

import {
  defineComponent,
  ref,
  watch,
  onBeforeUnmount,
  onUnmounted,
  onMounted,
  computed,
  shallowRef,
  defineAsyncComponent,
} from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: {},
  props: {
    url: {
      type: String,
      required: true,
      default: null,
    },
    label: {
      type: String,
      default: "Title",
    },
    selectMode: {
      type: String,
      default: "single", // ['single','multi']
    },
    image: {
      type: Boolean,
      default: false,
    },
    fieldDisplay: {
      type: String,
      required: true,
      default: "fullname",
    },
    imagePath: {
      type: String,
      default: null,
    },
    modelValue: {
      type: [String, Array],
      default: [],
    },
    lastDisplay: {
      type: String,
      default: "",
    },
    lastFile: {
      type: null,
      default: "",
    },
    component: {
      type: String,
      default: null,
    },
    objectData: {
      type: [String, Array],
      default: "fully", // ['fully',[...]]
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inSearch: {
      type: Boolean,
      default: false,
    },
    param: {
      type: [String, Array],
      default: [],
    },
  },
  // methods: {
  //   // ฟังก์ชันสำหรับการ map ค่า fieldDisplay
  //   getFieldDisplay(item) {
  //     const foundItem = this.base.form.rows.find((v) => v.code === item);

  //     // ถ้าเจอรายการที่ตรงกัน ให้คืนค่า title ถ้าไม่เจอให้คืนค่า undefined หรือข้อความ default
  //     return foundItem ? foundItem.title : "Not Found";
  //     return;
  //   },

  //   // ฟังก์ชันสำหรับดึงภาพ image
  //   getImage(item) {
  //     if (
  //       typeof item === "object" &&
  //       item !== null &&
  //       item.image &&
  //       item.image[0]
  //     ) {
  //       return `${item.imageLink}${this.imagePath}/${item.code}/${item.image[0].file}`; // คืนค่า image path
  //     }
  //     return this.defaultImage; // คืนค่า defaultImage หากไม่พบรูป
  //   },

  //   // ฟังก์ชันตรวจสอบว่า object นี้ถูกเลือกแล้วหรือยัง
  //   isSelected(item) {
  //     return this.modelValue.some((val) => {
  //       if (typeof val === "string") {
  //         return val === item[this.fieldDisplay]; // เปรียบเทียบ string กับ fieldDisplay
  //       } else if (typeof val === "object" && val !== null) {
  //         return val[this.fieldDisplay] === item[this.fieldDisplay]; // เปรียบเทียบ object fieldDisplay
  //       }
  //       return false;
  //     });
  //   },
  // },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const store = useStore();
    configureQuery(store);

    const serviceUrl = computed(() => store.getters.serviceUrl);

    // const user_token = computed(() => {
    //   return store.getters.user_token;
    // });

    const user = computed(() => store.getters.user);
    // console.error("user",user.value.access)

    const dropdownWrapper = ref(null);
    // const disabled = ref(props.disabled);

    const list = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const base = ref({
      rows: [],
      pagination: {
        page: 1,
        row: 20,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            title: "",
          },
        },
      },
      search: [
        {
          type: "search",
          id: "q",
          placeholder: "Search",
          label: "Search",
          value: "",
        },
      ],
    });

    // const base = ref({
    //   rows: [],
    //   total: 0,
    //   page: 1,
    //   row: 20,
    //   q: "",
    //   next: false,
    //   back: false,
    //   loading: false,
    //   modal: false,
    //   form: {
    //     rows: [],
    //   },
    // });

    // const compo = ref({
    //   rows: [],
    //   total: 0,
    //   page: 1,
    //   row: 20,
    //   q: "",
    //   next: false,
    //   back: false,
    //   loading: false,
    //   modal: false,
    //   form: {
    //     rows: [],
    //   },
    // });

    const compo = ref({
      pagination: {
        page: 1,
        row: 20,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {},
        },
      },
      search: [
        {
          type: "search",
          id: "q",
          placeholder: "Search",
          label: "Search",
          value: "",
        },
      ],
    });

    const showDropdown = ref(false);
    const allSelected = ref(false);
    const showImages = ref(true); // Toggle for showing images
    // const searchQuery = ref(""); // Search query
    const defaultImage = ref(
      `${serviceUrl.value}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyImage.jpg&s=25`
    ); // Default image URL

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
      // console.log(dropdownWrapper.value);

      fnBase.get(); // Initial fetch
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    const formatObjectData = (option) => {
      let temp = {
        code: option["code"],
        [props.fieldDisplay]: option[props.fieldDisplay],
      };
      // console.log(temp)
      if (props.objectData == "fully") {
        return (temp = option);
      }
      props.objectData.forEach((v) => {
        if (v == "file" || v == "image") {
          option["file"]
            ? (temp["image"] = option["file"])
            : option["image"]
            ? (temp["image"] = option["image"])
            : "";
        } else {
          option[v] ? (temp[v] = option[v]) : "";
        }
      });
      return temp;
    };

    const toggleDropdown = () => {
      if (props.disabled === true) {
        return;
      }
      showDropdown.value = !showDropdown.value;
    };

    const handleOptionClick = (option) => {
      toggleOption(option);
      if (props.selectMode === "single") {
        showDropdown.value = false;
      }
    };

    const toggleOption = (option) => {
      let temp = formatObjectData(option);
      if (props.selectMode === "single") {
        list.value = [temp];
      } else {
        // console.log(props.selectMode)
        const index = list.value.findIndex((o) => o.code === temp.code);
        if (index > -1) {
          list.value.splice(index, 1);
        } else {
          list.value.push(temp);
        }
      }
      checkIfAllSelected();
    };
    // const toggleSelectAll = () => {
    //   if (allSelected.value) {
    //     list.value = [];
    //   } else {
    //     let temp = formatObjectData(base.value.data.rows);
    //     // let tmp = {
    //     //   code: base.value.data.rows["code"],
    //     //   text: base.value.data.rows[props.fieldDisplay],
    //     //   image: base.value.data.rows[props.image],
    //     // };

    //     list.value = [...temp];
    //   }
    //   allSelected.value = !allSelected.value;

    //   // if (allSelected.value) {
    //   //   list.value = [];
    //   // } else {
    //   //   list.value = base.value.data.rows.map((v) => v[props.fieldStorage]);
    //   // }
    //   // allSelected.value = !allSelected.value;
    // };
    const clearAll = () => {
      list.value = [];
      allSelected.value = false;
    };

    const toggleShowImages = () => {
      showImages.value = !showImages.value;
    };

    const isSelected = (option) => {
      return list.value.some((o) => option.code ? o.code === option.code : false || option.Dscription ? o.Dscription === option.Dscription : false );
      // return list.value.includes(option[props.fieldStorage]);
    };

    const checkIfAllSelected = () => {
      allSelected.value = list.value.length === base.value.data.rows.length;
    };

    // base
    const fnBase = {
      search: async () => {
        try {
          // base.value.page = 1;
          // const res = await fnBase.get();

          base.value.pagination.page = 1;
          await fnBase.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (base.value.pagination.loading) return;
        base.value.pagination.loading = true;
        try {
          // console.log(props.param)

          const queryParams = {
            page: base.value.pagination.page,
            row: base.value.pagination.row,
            search: base.value.search,
            getTotal: true,
          };
          if (props.param.length) {
            for (const [key, value] of Object.entries(props.param[0])) {
              queryParams[key] = value;
            }
          } 
          const path = buildPath(queryParams, props.url);
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            // console.log(res.rows)
            // base.value.data.rows = res.rows;
            // base.value.pagination.total = res.total;
            // base.value.pagination.next =
            //   base.value.pagination.page * base.value.pagination.row <
            //   base.value.pagination.total;
            // base.value.pagination.back = base.value.pagination.page > 1;

            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });

            if (base.value.pagination.page === 1) {
              base.value.data.rows = res.rows || [];
              base.value.data.form.rows = base.value.data.rows;
            } else {
              base.value.data.rows = [
                ...base.value.data.rows,
                ...(res.rows || []),
              ];
              base.value.data.form.rows = base.value.data.rows;
            }

            base.value.pagination.total = parseInt(res.total, 10) || 0;
            base.value.pagination.page++;
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          base.value.pagination.loading = false;
        }
      },
      success() {
        // console.log("SADASDSA");
        base.value.pagination.page = 1;
        base.value.search[0].value = "";
        compo.value.data.form.object = {};
        fnBase.search();
      },

      // search: async () => {
      //   base.value.page = 1;
      //   const res = await fnBase.get();
      // },
      // get: async () => {
      //   try {
      //     if (base.value.loading) return;
      //     base.value.loading = true;

      //     const obj = {
      //       base: base.value,
      //     };

      //     const path = `${props.url}?total=1&page=${base.value.page}&rows=${
      //       base.value.row
      //     }&q=${encodeURIComponent(base.value.q)}`;

      //     const res = await Query.fetch(obj, "GET", path);
      //     // try {
      //     // const response = await fetch(url);
      //     // const data = await response.json();

      //     res.rows.forEach((v, i) => {
      //       res.rows[i].image = v.image ? JSON.parse(v.image) : [];
      //       res.rows[i].master = 0;
      //     });

      //     if (base.value.page === 1) {
      //       base.value.data.rows = res.rows || [];
      //       base.value.form.rows = base.value.data.rows;
      //     } else {
      //       base.value.data.rows = [...base.value.data.rows, ...(res.rows || [])];
      //       base.value.form.rows = base.value.data.rows;
      //     }

      //     base.value.total = parseInt(res.total, 10) || 0;
      //     base.value.page++;

      //     // console.log( res)
      //     return res;
      //   } catch (error) {
      //     console.error("Error fetching data:", error);
      //     return { success: false, errorMsg: error.message };
      //   } finally {
      //     base.value.loading = false;
      //   }
      // },
    };

    const handleVisibility = (isVisible) => {
      // console.log(isVisible)
      if (
        isVisible &&
        base.value.data.rows.length < base.value.pagination.total &&
        !base.value.pagination.loading
      ) {
        fnBase.get();
      }
    };
    // const handleClickOutside = (event) => {
    //   const dropdownWrapper = dropdownWrapper.value;
    //   if (dropdownWrapper && !dropdownWrapper.contains(event.target)) {
    //     showDropdown.value = false;
    //   }
    // };
    const handleClickOutside = (event) => {
      if (
        dropdownWrapper.value &&
        !dropdownWrapper.value.contains(event.target)
      ) {
        showDropdown.value = false;
      }
    };
    // },

    const compo_create = () => {
      compo.value.data.form.modal = true;
      compo.value.data.form.controll = "create";
      // compo.value.data.form.object = {}
      toggleDropdown();

      // compo.value.data.form.object.name = base.value.q;
    };

    // เข้าถึงข้อมูลของเส้นทางปัจจุบัน
    const route = useRoute();
    const router = useRouter();

    // เช็คสิทธิ์การเข้าถึง
    const hasPermission = computed(() => {
      // console.log(user.value.access)
      // console.log(route.name )
      return (
        user.value 
        && user.value.access && props.component
        // && user.value.access.TRR[route.name] === "superadmin"
      );
      // หรือถ้าคุณต้องการเช็คหลาย role
      // return user.value && user.value.access && (user.value.access.admin || user.value.access.editor);
    });

    const asyncComponent = shallowRef(null);
    // console.log(hasPermission.value);
    if (hasPermission.value && props.component) {
      asyncComponent.value = defineAsyncComponent(() =>
        import(`@/components/${props.component}.vue`)
      );
    }

    const formatData = () => {
      if (props.selectMode === "single") {
        // console.log(list.value)
        list.value =
          list.value.length > 0
            ? [
                {
                  code: list.value[0].code,
                  [props.fieldDisplay]: props.lastDisplay,
                  image: props.lastFile,
                },
              ]
            : [];
      } else {
        list.value = list.value.length > 0 ? JSON.parse(list.value) : [];
      }
    };

    formatData();

    // return { asyncComponent, local_create };
    return {
      list,
      handleVisibility,
      fnBase,
      isSelected,
      toggleShowImages,
      clearAll,
      // toggleSelectAll,
      toggleDropdown,
      handleOptionClick,
      base,
      showDropdown,
      allSelected,
      showImages,
      // searchQuery,
      defaultImage,
      dropdownWrapper,
      asyncComponent,
      compo_create,
      compo,
      hasPermission,
    };
  },
});
</script>

<style scoped>
/* Tailwind CSS handles responsiveness and minimalistic design */
</style>
