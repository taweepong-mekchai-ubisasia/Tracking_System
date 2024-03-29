<template>
  <div class="card-body overflow-auto" style="max-height: inherit">
    <div class="text-xl font-bold">My profile</div>
    <!-- <div class="text-md">Edit Detail</div> -->
    <!-- <div class="grid flex-grow rounded-box justify-end"> -->
    <div>
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
      <!-- <label class="label float-right">
        <a
          href="#"
          class="label-text-alt link link-hover font-bold"
          @click="$emit('changetab', 'editdetail')"
        >
          Edit Details
        </a>
      </label> -->
    </div>
    <!-- </div> -->
    <!-- {{ user }} -->
    <div class="flex flex-col w-full border-opacity-50" v-if="user">
      <div class="divider mt-0"></div>

      <div
        class="indicator mx-auto items-center justify-center w-full min-h-min border-2 border-gray-300 border-dashed rounded-lg"
        v-if="image.length>0"
      >
        <!-- <div> -->
        <!-- <label
            for="modal_showImage"
            class="btn btn-link p-0"
            @click="imagerow = row"
          > -->
        <div class="grid card-bordered p-1 place-items-center overflow-hidden">
          <!-- {{ user.imageLink }}{{ image[0].file }} -->
          <img
            class="max-h-44 object-cover bg-cover"
            v-if="image.length > 0"
            :src="`${user.imageLink}/employee/${user.code}/${image[0].file}`"
            alt="Image"
          />
          <img
            class="max-h-44 object-cover bg-cover"
            v-else
            :src="`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`"
            alt="Image"
          />
        </div>

        <!-- </label> -->
        <!-- </div> -->
      </div>

      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Code</span>
        </label>
        <input
          disabled
          type="text"
          placeholder="Code"
          class="input input-bordered"
          :value="`${user.code ? user.code : 'empty'}`"
        />
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Company</span>
        </label>
        <input
          disabled
          type="text"
          placeholder="Position"
          class="input input-bordered"
          :value="`${user.companyTitle ? user.companyTitle : 'empty'}`"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <!-- <div> -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Branch</span>
          </label>
          <input
            disabled
            type="text"
            placeholder="Branch"
            class="input input-bordered"
            :value="`${user.branchTitle ? user.branchTitle : 'empty'}`"
          />
        </div>
        <!-- </div>
        <div> -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">UID</span>
          </label>
          <input
            disabled
            type="text"
            placeholder="UID"
            class="input input-bordered"
            :value="`${user.uid ? user.uid : 'empty'}`"
          />
        </div>
        <!-- </div> -->
      </div>

      <!-- <div class="form-control grid">
        <label class="label">
          <span class="label-text">UID</span>
        </label>
        <input
          disabled
          type="text"
          placeholder="UID"
          class="input input-bordered"
          :value="`${user.uid ? user.uid : 'empty'}`"
        />
      </div> -->
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
              class="input input-bordered"
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
              class="input input-bordered"
              :value="`${user.lastname ? user.lastname : 'empty'}`"
            />
          </div>
        </div>
      </div>

      <!-- <div class="form-control grid">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input
          disabled
          type="text"
          placeholder="Email"
          class="input input-bordered"
          :value="`${user.emailTitle ? user.emailTitle : 'empty'}`"
        />
      </div> -->
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Departmant</span>
        </label>
        <input
          disabled
          type="text"
          placeholder="Position"
          class="input input-bordered"
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
          class="input input-bordered"
          :value="`${user.position ? user.position : 'empty'}`"
        />
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Access</span>
        </label>
        <input
          disabled
          type="text"
          placeholder="Position"
          class="input input-bordered"
          :value="`${user.accessTitle ? user.accessTitle : 'empty'}`"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <!-- <div> -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            disabled
            type="text"
            placeholder="Position"
            class="input input-bordered"
            :value="`${user.emailTitle ? user.emailTitle : 'empty'}`"
          />
        </div>
        <!-- </div>
        <div> -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Tel</span>
          </label>
          <input
            disabled
            type="text"
            placeholder="Position"
            class="input input-bordered"
            :value="`${user.tel ? user.tel : 'empty'}`"
          />
        </div>
        <!-- </div> -->
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
              class="input input-bordered"
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
              class="input input-bordered"
              :value="`${user.started_at ? user.started_at : 'empty'}`"
            />
          </div>
        </div>
      </div>

      <!-- <div class="form-control grid">
        <label class="label">
          <span class="label-text">Leaves At</span>
        </label>
        <input disabled type="text" placeholder="Leaves At" class="input input-bordered" :value="`${user.leaves_at ? user.leaves_at : 'empty'}`" />
      </div> -->
      <!-- <div class="form-control grid">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input disabled type="text" placeholder="Email" class="input input-bordered" :value="`${user.password ? user.password : 'empty'}`" />
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input disabled type="text" placeholder="Email" class="input input-bordered" :value="`${user.password ? user.password : 'empty'}`" />
      </div>
       <div class="form-control grid">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input disabled type="text" placeholder="Email" class="input input-bordered" :value="`${user.password ? user.password : 'empty'}`" />
      </div> -->

      <!-- <div class="form-control grid">
        <label class="label">
          <span class="label-text">Mobile No.</span>
        </label>
        <input disabled type="text" placeholder="Mobile" class="input input-bordered" :value="`${user.mobile ? user.mobile : 'empty'}`" />
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Roblox</span>
        </label>
        <input disabled type="text" placeholder="Roblox" class="input input-bordered" :value="`${user.roblox ? user.roblox : 'empty'}`" />
      </div> -->
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
    return { image: [], master: 0, tmpsLink: "" };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    this.$nextTick(() => {
      // this.base_search();
// console.log(this.user)
      this.image = this.user.image ? JSON.parse(this.user.image) : [];
      this.master = 0;
      this.tmpsLink = `${
        window.location.origin == "http://localhost:8081"
          ? `http://localhost:8080/kay/rewrite_demo/services/`
          : `${window.location.origin}/services/`
      }tmps/`;
    });
  },
};
</script>
