<template>
  <div
 class="card-body overflow-auto" style="max-height: inherit;" 
    :class="`${tab != 'editdetail' ? 'hidden' : ''}`"
    v-if="temp"
  >
    <div class="text-xl font-bold">Edit Detail</div>
    <div class="flex flex-col w-full border-opacity-50">
      <div class="form-control grid">
        <UploadModule
          v-if="
            tab == 'editdetail' 
          "
          :imageLink="temp.imageLink"
          :image="temp.image"
          :id="'image'"
          :multiple="false"
          @respone="
            (res) => {
              temp.image = temp.image.concat(res.image);
            }
          "
          @resetdata="
            (res) => {
              temp.image = [...res.image];
            }
          "
        />
        <div
          class="avatar p-8 justify-center"
          v-if="user && (user.type == 'fb' || user.type == 'gmail')"
        >
          <div
            class="
              lg:w-32
              w-52
              rounded-full
              ring ring-primary ring-offset-base-100 ring-offset-2
            "
          >
            <img :src="`${user.image}`" />
          </div>
        </div>
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Firstname</span>
        </label>
        <input
          type="text"
          placeholder="Firstname"
          class="input input-bordered"
          v-model="temp.firstname"
        />
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Lastname</span>
        </label>
        <input
          type="text"
          placeholder="Lastname"
          class="input input-bordered"
          v-model="temp.lastname"
        />
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Tel No*</span>
        </label>
        <input
          type="tel"
          placeholder="Tel No."
          class="input input-bordered"
          v-model="temp.tel"
          @input="acceptNumber"
        />
        <label
          class="label"
          :class="
            temp.tel ? (temp.tel.length < 10 ? '' : 'hidden') : 'hidden'
          "
        >
          <span class="label-text-alt text-error">{{
            temp.tel
              ? temp.tel.length < 10
                ? "Tel require min 10 characters."
                : ""
              : ""
          }}</span>
        </label>
      </div>
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
        :disabled="
          !temp.firstname ||
          !temp.lastname ||
          !temp.tel ||
          temp.tel.length < 10
        "
        @click="
          !temp.firstname ||
          !temp.lastname ||
          !temp.tel ||
          temp.tel.length < 10
            ? ''
            : update()
        "
      >
        Save
      </button>
    </div>
  </div>
</template>
<script>
import UploadModule from "@/components/App/Module/Global/Upload.vue";
export default {
  name: "EditDetail",
  data() {
    return {
      temp: null,
      comfirm: false,
    };
  },
  components: {
    UploadModule,
  },
  props: ["tab"],
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
    jwt() {
      return this.$store.getters.jwt;
    },
  },
  methods: {
    acceptNumber() {
      var x = this.temp.tel
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.temp.tel = !x[2] ? x[1] : x[1] + x[2] + x[3];
    },
    update() {
      console.log("UPDATe");
      this.$emit("update_profile", this.temp);
    },
  },
  watch: {
    tab: function (val) {
      if (val == "editdetail") {
        this.temp = { ...this.user };
        if (this.user.type != "fb" && this.user.type != "gmail") {
          this.temp.image = this.temp.image ? JSON.parse(this.temp.image) : [];
          this.temp.imageLink =
            this.temp.image.length > 0
              ? this.temp.image[0].file
                ? `${this.ServiceUrl}upload/user/`
                : ""
              : "";
        }
      }
    },
  },
};
</script>