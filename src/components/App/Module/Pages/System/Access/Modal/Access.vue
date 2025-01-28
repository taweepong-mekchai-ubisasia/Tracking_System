<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.form.modal" />
    <div class="modal" v-if="base.form.modal">
      <div
        class="modal-box relative w-11/12 max-w-lg p-2 lg:p-4 max-h-screen"
      >
        <button
          @click="base.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">ACCESS</h3>
        <div class="divider my-1"></div>

        <div class="card-body overflow-auto max-h-[75vh] p-2 lg:p-4">
					<div class="form-control">
						<label class="label">
							<span class="label-text">Access Title</span>
						</label>
						<input
							type="text"
							placeholder="Access Title"
							class="input input-xs sm:input-sm md:input-md input-bordered border-base-content"
							v-model="base.form.object.title"
						/>
					</div>
					<div class="form-control">
						<div
							class="collapse collapse-arrow bg-primary text-white min-h-[auto]"
						>
							<input type="checkbox" class="min-h-[auto]" />
							<div
								class="collapse-title text-sm font-medium min-h-[auto] p-4"
								style="width: inherit"
							>
								Guide
							</div>
							<div
								class="collapse-content bg-base-100 text-black w-full overflow-auto"
							>
								<div class="overflow-x-auto">
									<table
										class="table table-xs table-pin-rows table-pin-cols"
									>
										<tbody>
											<tr>
												<th>None</th>
												<td>
													<div class="badge">No permission</div>
												</td>
											</tr>
											<tr>
												<th>User</th>
												<td>
													<div class="badge">Read</div>
												</td>
											</tr>
											<tr>
												<th>Super User</th>
												<td>
													<div class="badge">Read</div>
													<div class="badge">Request</div>
												</td>
											</tr>
											<tr>
												<th>Admin</th>
												<td>
													<div class="badge">Read</div>
													<div class="badge">Request</div>
													<div class="badge">Approve</div>
												</td>
											</tr>
											<tr>
												<th>Super Admin</th>
												<td>
													<div class="badge">Read</div>
													<div class="badge">Request</div>
													<div class="badge">Approve</div>
													<div class="badge">Spacial</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
          <div class="divider">Menu List</div>
          <ul class="menu px-4 py-0">
            <AppModuleMenu_
              v-if="base.form.modal"
              :menutype="'Access'"
              :access="base.form.object.access"
              @object_access="
                (obj) => {
                  base.form.object.access = obj;
                }
              "
              :color="[`text-blue-600`, `text-blue-600`]"
              :icon="`icon-park-outline:list-one`"
            />
          </ul>
        </div>
        <div
          class="backdrop-blur sticky top-0 items-center gap-2 xs:px-0 sm:px-0 px-4 flex"
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
import AppModuleMenu_ from "@/components/App/Module/Menu/_.vue";

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
  name: "Access",
  components: {
    AppModuleMenu_
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

    const fnBase = {
      create: () => {
        base.value.form.current = 0;
        base.value.form.object = {
          title: "",
          access: {},
        };
        base.value.form.method = "POST";
        base.value.form.modal = true;
      },
      edit: (code, index) => {
        base.value.form.object = { ...base.value.rows[index] };
        base.value.form.object.access = JSON.parse(base.value.form.object.access);
        base.value.form.current = code;
        base.value.form.method = "PUT";

        base.value.form.modal = true;
      },
      save: async () => {
        if (base.value.form.loading) return;
        base.value.form.loading = true;
        try {
          // const obj = {
          //   base: base.value,
          // };

          const queryBody = {
            code: base.value.form.current,
            rows: [
              {
                ...base.value.form.object,
              },
            ],
          };

          // const path = `api/controllers/MYSQL/INTERNAL/System/branch`;
          // const saveMethod = base.value.method === "create" ? "POST" : "PUT";
          // const saveResult = await Query.fetch(obj, saveMethod, path, queryBodyData);

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/System/access"
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

          // base.value.page = 1;
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          base.value.form.modal = false;
          base.value.form.loading = false;
          emit("update:success", null);
        }
      },
    };

    return { base, fnBase };
  },
});
</script>
