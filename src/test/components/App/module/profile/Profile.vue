<template>
    <div class="card-body overflow-auto" style="max-height: inherit;" >
    <div class="text-xl font-bold">My profile</div>
    <!-- <div class="text-md">Edit Detail</div> -->
    <div class="grid flex-grow rounded-box justify-end">
      <label class="label">
        <a
          href="#"
          class="label-text-alt link link-hover font-bold"
          @click="$emit('changetab', 'editdetail')"
        >
          <font-awesome-icon icon="fa-solid fa-pen" /> Edit Details
        </a>
      </label>
    </div>
    <div class="flex flex-col w-full border-opacity-50" v-if="user">
      <div class="divider mt-0"></div>

      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Firstname</span>
        </label>
        <input disabled type="text" placeholder="Firstname" class="input input-bordered" :value="`${user.row.firstname ? user.row.firstname : 'empty'}`" />
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Lastname</span>
        </label>
        <input disabled type="text" placeholder="Lastname" class="input input-bordered" :value="`${user.row.lastname ? user.row.lastname : 'empty'}`" />
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Mobile No.</span>
        </label>
        <input disabled type="text" placeholder="Mobile" class="input input-bordered" :value="`${user.row.mobile ? user.row.mobile : 'empty'}`" />
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Roblox</span>
        </label>
        <input disabled type="text" placeholder="Roblox" class="input input-bordered" :value="`${user.row.roblox ? user.row.roblox : 'empty'}`" />
      </div>
    </div>
    <div class="form-control mt-4">
      <button
        class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary w-full"
        @click="$emit('changetab', 'editpassword')"
      >
        Change password
      </button>
    </div>
    <div class="form-control mt-4">
      <button
        class="
          btn btn-xs
          sm:btn-sm
          md:btn-md
          lg:btn-lg
          bg-black
          text-white
          border-black
          w-full
        "
        @click="$emit('Logout')"
      >
        Logout
      </button>
    </div>
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
