<template>
  <div
    class="card-body overflow-auto p-4 max-h-[inherit]"
    v-if="user"
  >
    <div class="text-xl font-bold">My profile : {{ user.code }}</div>
    <!-- <div class="text-md">Edit Detail</div> -->
    <!-- <div class="grid flex-grow rounded-box justify-end"> -->
    <div>
      <label class="label float-start">
        <a
          href="#"
          class="label-text-alt link link-hover font-bold"
          @click="$emit('changetab', 'editsignature')"
        >
          Edit Signature
        </a>
      </label>
      <label class="label float-right">
        <a
          href="#"
          class="label-text-alt link link-hover font-bold"
          @click="$emit('changetab', 'editpassword')"
        >
          <!-- <Icon icon="solar:pen-outline" />  -->
          Edit Password
        </a>
      </label>
    </div>
    <!-- </div> -->
    <!-- {{ user }} -->
    <div class="flex flex-col w-full border-opacity-50">
      <div class="divider mt-0"></div>
      <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
        <div
          class="grid gap-4 md:grid-cols-1 grid-cols-1 content-stretch justify-center justify-items-center items-start"
        >
          <div>
            <div
              class="indicator mx-auto items-center justify-center w-full min-h-min border-2 border-gray-300 border-dashed rounded-lg"
             
            >
              <div
                class="grid card-bordered p-1 place-items-center overflow-hidden"
              >
                <img
                width="auto"
            height="auto"
                  class="max-h-44 object-cover bg-cover"
                  v-if="image.length > 0"
                  :src="`${user.imageLink}/employee/${user.code}/${image[0].file}`"
                  alt="Image"
                />
                <img
                width="auto"
            height="auto"
                  class="max-h-44 object-cover bg-cover"
                  v-else
                  :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyProfile.png&s=10`"
                  alt="Image"
                />
              </div>
            </div>
            <div class="form-control grid">
              <label class="label">
                <span class="label-text">Signature</span>
              </label>
              <div
                class="bg-cover border-2 self-center w-full h-full"
                :class="`${loadimage ? '' : 'hidden'} `"
                style="text-align: -webkit-center"
              >
                <img
                  :class="`h-[inherit]`"
                  :src="`${user.imageLink}signature/${user.uid}.signature.png`"
                  alt="Image"
                  @error="error"
                  @load="loaded"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="grid gap-4 md:grid-cols-1 grid-cols-1 max-h-[50vh] overflow-auto pr-4 pb-4"
        >
          <!-- <div class="form-control grid">
            <label class="label">
              <span class="label-text">Code</span>
            </label>
            <input
              disabled
              type="text"
              placeholder="Code"
              class="input input-bordered border-base-content"
              :value="`${user.code ? user.code : 'empty'}`"
            />
          </div> -->
          <div class="form-control">
            <div class="overflow-x-auto">
              <table class="table table-sm table-pin-rows table-pin-cols">
                <tbody>
                  <tr>
                    <th>UID</th>
                    <td>{{ `${user.uid ? user.uid : "empty"}` }}</td>
                  </tr>
                  <tr>
                    <th>Fullname</th>
                    <td>
                      {{ `${user.firstname ? user.firstname : ""}` }}
                      {{ `${user.lastname ? user.lastname : ""}` }}
                    </td>
                  </tr>
                  <tr>
                    <th>Company</th>
                    <td>
                      {{ `${user.companyTitle ? user.companyTitle : "empty"}` }}
                    </td>
                  </tr>

                  <tr>
                    <th>Branch</th>
                    <td>
                      {{ `${user.branchTitle ? user.branchTitle : "empty"}` }}
                    </td>
                  </tr>
                  <tr>
                    <th>Position</th>
                    <td>
                      {{ `${user.position ? user.position : "empty"}` }}
                    </td>
                  </tr>
                  <tr>
                    <th>Departmant</th>
                    <td>
                      {{ `${user.depTitle ? user.depTitle : "empty"}` }}
                    </td>
                  </tr>
                  <tr>
                    <th>Access</th>
                    <td>
                      {{ `${user.accessTitle ? user.accessTitle : "empty"}` }}
                    </td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>
                      {{ `${user.emailTitle ? user.emailTitle : "empty"}` }}
                    </td>
                  </tr>
                  <tr>
                    <th>Tel</th>
                    <td>
                      {{ `${user.tel ? user.tel : "empty"}` }}
                    </td>
                  </tr>
                  <tr>
                    <th>Birthdate</th>
                    <td>
                      {{ `${user.birthdate ? user.birthdate : "empty"}` }}
                    </td>
                  </tr>
                  <tr>
                    <th>Started</th>
                    <td>
                      {{ `${user.started_at ? user.started_at : "empty"}` }}
                    </td>
                  </tr>

                  <tr>
                    <!-- <th>Started</th> -->
                    <th colspan="2">
                      <button
                        class="btn btn-xs bg-black text-white border-black w-full"
                        @click="$emit('Logout')"
                      >
                        Logout
                      </button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- <div class="grid grid-cols-4 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">UID</span>
              </label>
              <input
                disabled
                type="text"
                placeholder="UID"
                class="input input-bordered border-base-content"
                :value="`${user.uid ? user.uid : 'empty'}`"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Access</span>
              </label>
              <input
                disabled
                type="text"
                placeholder="Position"
                class="input input-bordered border-base-content"
                :value="`${user.accessTitle ? user.accessTitle : 'empty'}`"
              />
            </div>
            <div class="form-control col-span-2">
              <label class="label">
                <span class="label-text">Branch</span>
              </label>
              <input
                disabled
                type="text"
                placeholder="Branch"
                class="input input-bordered border-base-content"
                :value="`${user.branchTitle ? user.branchTitle : 'empty'}`"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="form-control grid">
              <label class="label">
                <span class="label-text">Departmant</span>
              </label>
              <input
                disabled
                type="text"
                placeholder="Position"
                class="input input-bordered border-base-content"
                :value="`${user.depTitle ? user.depTitle : 'empty'}`"
              />
            </div>
            <div class="form-control grid">
              <label class="label">
                <span class="label-text">Position</span>
              </label>
              <input
                disabled
                type="text"
                placeholder="Position"
                class="input input-bordered border-base-content"
                :value="`${user.position ? user.position : 'empty'}`"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Firstname</span>
                </label>
                <input
                  disabled
                  type="text"
                  placeholder="Firstname"
                  class="input input-bordered border-base-content"
                  :value="`${user.firstname ? user.firstname : 'empty'}`"
                />
              </div>
            </div>
            <div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Lastname</span>
                </label>
                <input
                  disabled
                  type="text"
                  placeholder="Lastname"
                  class="input input-bordered border-base-content"
                  :value="`${user.lastname ? user.lastname : 'empty'}`"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                disabled
                type="text"
                placeholder="Position"
                class="input input-bordered border-base-content"
                :value="`${user.emailTitle ? user.emailTitle : 'empty'}`"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Tel</span>
              </label>
              <input
                disabled
                type="text"
                placeholder="Position"
                class="input input-bordered border-base-content"
                :value="`${user.tel ? user.tel : 'empty'}`"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Birth Date</span>
                </label>
                <input
                  disabled
                  type="text"
                  placeholder="Birth Date"
                  class="input input-bordered border-base-content"
                  :value="`${user.birthdate ? user.birthdate : 'empty'}`"
                />
              </div>
            </div>
            <div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Started At</span>
                </label>
                <input
                  disabled
                  type="text"
                  placeholder="Started At"
                  class="input input-bordered border-base-content"
                  :value="`${user.started_at ? user.started_at : 'empty'}`"
                />
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- <div class="form-control mt-4">
      <button
        class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary w-full"
        @click="$emit('changetab', 'editpassword')"
      >
        Change password
      </button>
    </div> -->
    <!-- <div class="form-control mt-4">
      <button
        class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-black text-white border-black w-full"
        @click="$emit('Logout')"
      >
        Logout
      </button>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "Profile",
  props: ["tab"],
  data() {
    return { image: [], master: 0,  loadimage: false };
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    this.$nextTick(() => {
      // this.base_search();
      // console.log(this.user)
      // this.image = this.user.image ? JSON.parse(this.user.image) : [];
      this.image = this.user.image?this.user.image:[]
      this.master = 0;
      
    });
  },
  methods: {
    error() {
      this.loadimage = false;
    },
    loaded() {
      this.loadimage = true;
    },
  },
};
</script>
