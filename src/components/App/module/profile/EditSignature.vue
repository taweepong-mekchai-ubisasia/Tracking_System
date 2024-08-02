<template>
  <div
    class="card-body overflow-auto max-h-[inherit]"
    :class="`${tab != 'editsignature' ? 'hidden' : ''}`"
    v-if="temp && tab == 'editsignature'"
  >
    <div class="text-xl font-bold">Edit Signature</div>
    <div class="flex flex-col w-full border-opacity-50">
      <div class="form-control grid">
        <VueSignaturePad
          id="signature"
          width="100%"
          height="200px"
          ref="signaturePad"
          :scaleToDevicePixelRatio="true"
        />
        <!-- <div class="buttons">
        <button @click="undo">Undo</button>
        <button @click="save">Save</button>
      </div> -->
      </div>
    </div>
    <div class="form-control mt-4 grid gap-4 md:grid-cols-2 grid-cols-1">
      <div class="flex-1 form-control">
        <button class="btn btn-danger" @click="undo">Undo</button>
      </div>
      <div class="flex-1 form-control">
        <button class="btn btn-primary text-white" @click="save">Save</button>
      </div>

      <!-- <button ></button>
        <button @click=""></button> -->
      <!-- <button
        class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-black text-white border-black w-full"
        @click="
          !temp.firstname || !temp.lastname || !temp.tel || temp.tel.length < 10
            ? ''
            : update()
        "
      >
        Save
      </button> -->
    </div>
  </div>
</template>
<script>
import UploadModule from "@/components/App/Module/Global/Upload.vue";
export default {
  name: "EditSignature",
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
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user() {
      return this.$store.getters.user;
    },
    user_token() {
      return this.$store.getters.user_token;
    },
  },
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Global/signature`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({
          signature: data,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            //  alert("success")
            this.$emit("changetab", 'profile');
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // acceptNumber() {
    //   var x = this.temp.tel
    //     .replace(/\D/g, "")
    //     .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    //   this.temp.tel = !x[2] ? x[1] : x[1] + x[2] + x[3];
    // },
    // update() {
    //   console.log("UPDATe");
    //   this.$emit("update_profile", this.temp);
    // },
  },
  watch: {
    tab: function (val) {
      if (val == "editsignature") {
        this.temp = { ...this.user };
        // if (this.user.type != "fb" && this.user.type != "gmail") {
        //   this.temp.image = this.temp.image ? JSON.parse(this.temp.image) : [];
        //   this.temp.imageLink =
        //     this.temp.image.length > 0
        //       ? this.temp.image[0].file
        //         ? `${this.serviceUrl}api/upload/user/`
        //         : ""
        //       : "";
        // }
      }
    },
  },
};
</script>
