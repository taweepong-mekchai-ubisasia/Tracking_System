<template>
  <div
 class="card-body overflow-auto" style="max-height: inherit;" 
    :class="`${tab != 'editdetail' ? 'hidden' : ''}`"
    v-if="temp"
  >
    <div class="text-xl font-bold">Edit Detail</div>
    <!-- <div class="text-md">Please enter your details.</div> -->
    <div class="flex flex-col w-full border-opacity-50">
      <!-- {{temp}} -->
      <div class="form-control grid">
        <!-- <label class="label">
          <span class="label-text">Firstname</span>
        </label> -->
        <UploadModule
          v-if="
            tab == 'editdetail' && user.type != 'fb' && user.type != 'gmail'
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
            <img :src="`${user.row.image}`" />
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
      <!-- <div class="form-control grid">
        <label class="label">
          <span class="label-text">Mobile No.</span>
        </label>
        <input
          type="text"
          placeholder="Mobile"
          class="input input-bordered"
          v-model="temp.mobile"
        />
      </div> -->

      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Mobile No*</span>
        </label>
        <input
          type="tel"
          placeholder="Mobile No."
          class="input input-bordered"
          v-model="temp.mobile"
          @input="acceptNumber"
        />
        <label
          class="label"
          :class="
            temp.mobile ? (temp.mobile.length < 10 ? '' : 'hidden') : 'hidden'
          "
        >
          <span class="label-text-alt text-error">{{
            temp.mobile
              ? temp.mobile.length < 10
                ? "Mobile require min 10 characters."
                : ""
              : ""
          }}</span>
          <!-- <span class="label-text-alt">Alt label</span> -->
        </label>
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Roblox</span>
        </label>
        <input
          type="text"
          placeholder="Roblox"
          class="input input-bordered"
          v-model="temp.roblox"
        />
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
          !temp.mobile ||
          temp.mobile.length < 10
        "
        @click="
          !temp.firstname ||
          !temp.lastname ||
          !temp.mobile ||
          temp.mobile.length < 10
            ? ''
            : update()
        "
      >
        <!-- <label for="modal-confirm" class="w-full">  -->
        Save
        <!-- </label> -->
      </button>
    </div>
  </div>
</template>
<script>
import UploadModule from "@/components/App/Module/Upload.vue";
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
      var x = this.temp.mobile
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.temp.mobile = !x[2] ? x[1] : x[1] + x[2] + x[3];
    },
    update() {
      console.log("UPDATe");
      this.$emit("update_profile", this.temp);
      // console.log(this.temp);
      // let image = { ...this.temp.image[0] };
      // delete image.temp;
      // fetch(`${this.ServiceUrl}controllers/user`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${this.jwt}`,
      //   },

      //   body: JSON.stringify({
      //     image: this.temp.image,
      //     firstname: this.temp.firstname,
      //     lastname: this.temp.lastname,
      //     mobile: this.temp.mobile,
      //     image: [image],
      //   }),
      // })
      //   .then((response) => response.json())
      //   .then((res) => {
      //     console.log(res.row);
      //     if (res.success) {

      //       // alert("SUCCESS");
      //       if(localStorage.getItem("jwt")){
      //         localStorage.setItem("jwt", res.jwt);
      //       }
      //       // this.$store.commit("jwt", localStorage.getItem("jwt"));
      //       // jwt
      //       this.comfirm = false;
      //       this.$store.commit("user", res.row);
      //       this.$store.commit("jwt", localStorage.getItem("jwt"));
      //       // this.$store.commit("user", res.row);
      //       this.$emit("changetab", "profile");
      //       return;
      //     }
      //     alert(res.errorMsg);
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });
    },
  },
  watch: {
    tab: function (val) {
      if (val == "editdetail") {
        this.temp = { ...this.user.row };
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