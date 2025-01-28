<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.form.modal" />
    <div class="modal" v-if="base.form.modal">
      <div class="modal-box relative max-w-sm p-2 lg:p-4 max-h-screen">
        <button
          @click="base.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">Item Master</h3>
        <div class="divider my-1"></div>

        <div class="card-body overflow-auto max-h-[80vh] p-2 lg:p-4">
          <AppModuleGlobalUpload
            :fileLink="`${base.form.object.imageLink}IndirectItem/${base.form.object.code}/`"
            :code="base.form.object.code"
            :file="base.form.object.image"
            :id="'base'"
            :multiple="false"
            @respone="
              (res) => {
                console.log(res);
                base.form.object.image = base.form.object.image.concat(
                  res.file
                );
              }
            "
            @uploaded="
              (res) => {
                let index = base.form.object.image.findIndex(
                  (v) => v.r == res.r
                );
                base.form.object.image[index].upload = false;
                base.form.object.image[index].file = res.row.file;
              }
            "
            @stream="
              (res) => {
                let index = base.form.object.image.findIndex(
                  (v) => v.r == res.r
                );
                base.form.object.image[index].loading = res.loading;
              }
            "
            @error="
              (res) => {
                let index = base.form.object.image.findIndex(
                  (v) => v.r == res.r
                );
                base.form.object.image[index].error = true;
              }
            "
            @again="
              (res) => {
                let index = base.form.object.image.findIndex(
                  (v) => v.r == res.file.r
                );
                base.form.object.image[index] = res.file;
              }
            "
            @resetdata="
              (res) => {
                base.form.object.image = [...res.file];
              }
            "
          />
          <div class="form-control">
            <label class="label">
              <span class="label-text text-xs sm:text-sm md:text-md">คลัง</span
              ><span class="text-xs text-error">{{ msg.wh }}</span>
            </label>
            <select
              class="select select-xs sm:select-sm md:select-md select-bordered w-full shadow"
              v-model="base.form.object.owner"
            >
              <option value="" disabled selected>เลือก</option>
              <option
                v-if="base.owner.length"
                v-for="v in base.owner"
                :value="v.wh"
              >
                {{ v.wh_title }}
              </option>
              <option v-else v-for="v in base.dept" :value="v.owner">
                {{ v.title }}
              </option>
            </select>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-xs sm:text-sm md:text-md">ชื่อ</span
              ><span class="text-xs text-error">{{ msg.name }}</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              class="input input-xs sm:input-sm md:input-md input-bordered border-gray-300 w-full shadow"
              v-model="base.form.object.title"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-xs sm:text-sm md:text-md"
                >รายละเอียด</span
              >
            </label>
            <textarea
              class="textarea textarea-bordered border-gray-300 w-full h-20 shadow"
              placeholder="Description"
              v-model="base.form.object.description"
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md"
                  >จำนวนขั้นต่ำ</span
                ><span class="text-xs text-error">{{ msg.min }}</span>
              </label>
              <input
                type="number"
                placeholder="Min"
                class="input input-xs sm:input-sm input-bordered border-gray-300 w-full shadow"
                v-model="base.form.object.min"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md"
                  >หน่วย</span
                ><span class="text-xs text-error">{{ msg.unit }}</span>
              </label>
              <input
                type="text"
                placeholder="Unit"
                class="input input-xs sm:input-sm input-bordered border-gray-300 w-full shadow"
                v-model="base.form.object.unit"
              />
            </div>
          </div>
        </div>
        <div
          class="backdrop-blur sticky top-0 items-center lg:gap-4 gap-2 px-0 flex"
        >
          <div class="flex-1 form-control mt-6">
            <button
              @click="base.form.modal = false"
              class="btn btn-xs sm:btn-sm md:btn-md"
              :disabled="base.form.loading"
            >
              Cancel
            </button>
          </div>
          <div class="flex-1 form-control mt-6" @click="fnBase.save()">
            <button
              class="btn btn-primary text-white btn-xs sm:btn-sm md:btn-md"
              :disabled="base.form.loading"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";

import {
  defineAsyncComponent,
  shallowRef,
  computed,
  defineComponent,
  ref,
  watch,
  getCurrentInstance,
} from "vue";

export default defineComponent({
  inheritAttrs: false,
  name: "ItemMaster",
  components: {
    AppModuleGlobalUpload,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    createValue: {
      type: String,
      required: "",
    },
  },
  emits: ["update:modelValue", "update:success"],
  setup(props, { emit }) {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const msg = ref({
      name: "",
      min: "",
      unit: "",
    });

    const fnBase = {
      create: () => {
        msg.value.name = "";
        msg.value.min = "";
        msg.value.unit = "";

        base.value.form.current = 0;
        base.value.form.object = {
          code: "",
          owner: "",
          title: "",
          description: "",
          min: "",
          unit: "",
          imageLink: "",
          image: [],
        };
        base.value.form.method = "POST";
        base.value.form.modal = true;
      },
      edit: (code, index) => {
        msg.value.name = "";
        msg.value.min = "";
        msg.value.unit = "";

        base.value.form.object = { ...base.value.rows[index] };
        base.value.form.current = code;
        base.value.form.method = "PUT";

        base.value.form.modal = true;
      },
      save: async () => {
        if (base.value.form.loading) return;

        if (
          !base.value.form.object.owner ||
          !base.value.form.object.title ||
          !base.value.form.object.min ||
          !base.value.form.object.unit
        ) {
          if (!base.value.form.object.owner) msg.value.wh = "*กรอกข้อมูล*";
          else msg.value.wh = "";
          if (!base.value.form.object.title) msg.value.name = "*กรอกข้อมูล*";
          else msg.value.name = "";
          if (!base.value.form.object.min) msg.value.min = "*กรอกข้อมูล*";
          else msg.value.min = "";
          if (!base.value.form.object.unit) msg.value.unit = "*กรอกข้อมูล*";
          else msg.value.unit = "";
          return;
        } else {
          msg.value.wh = "";
          msg.value.name = "";
          msg.value.min = "";
          msg.value.unit = "";
        }

        base.value.form.loading = true;
        try {
          let image = base.value.form.object.image[0]
            ? { ...base.value.form.object.image[0] }
            : null;
          image ? delete image.temp : "";

          const queryBody = {
            code: base.value.form.current,
            rows: [
              {
                ...Object.assign(
                  { ...base.value.form.object },
                  {
                    image: image ? [image] : [],
                  }
                ),
              },
            ],
          };

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/WHI/item"
          );
          const method = base.value.form.method || "POST";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
          }

          if (base.value.form.current === 0) {
            base.value.form.current = res.rows[0].code;
          }
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          base.value.form.modal = false;
          base.value.form.loading = false;
          emit("update:success", null);
        }
      },
    };

    return { base, fnBase, msg };
  },
});
</script>
