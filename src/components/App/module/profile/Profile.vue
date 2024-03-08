<template>
  <div class="card-body overflow-auto" style="max-height: inherit">
    <div class="text-xl font-bold">My profile</div>
    <!-- <div class="text-md">Edit Detail</div> -->
    <!-- <div class="grid flex-grow rounded-box justify-end"> -->
      <div>
      <label class="label float-left">
        <a
          href="#"
          class="label-text-alt link link-hover font-bold"
          @click="$emit('changetab', 'editpassword')"
        >
        <Icon icon="solar:pen-outline" /> Edit Password
        </a>
      </label>
      <label class="label float-right">
        <a
          href="#"
          class="label-text-alt link link-hover font-bold "
          @click="$emit('changetab', 'editdetail')"
        >
        <Icon icon="solar:pen-outline" /> Edit Details
        </a>
      </label></div>
    <!-- </div> -->
    <!-- {{ user }} -->
    <div class="flex flex-col w-full border-opacity-50" v-if="user">
      <div class="divider mt-0"></div>

      <div class="form-control grid hidden">
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
      <div class="form-control grid hidden">
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

      <div class="form-control grid">
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
      </div> <div class="form-control grid">
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

      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Departmant</span>
            </label>
            <input
              disabled
              type="text"
              placeholder="Departmant"
              class="input input-bordered"
              :value="`${user.depTitle ? user.depTitle : 'empty'}`"
            />
          </div>
        </div>
        <div>
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
    return {};
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
};
</script>
