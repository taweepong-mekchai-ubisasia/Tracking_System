<template>
  <div id="Upload" class="">
    <div class="flex items-center justify-center w-full">
      <label
        :class="!(file.length > 0) || multiple ? '' : 'hidden'"
        :for="`dropzone-file-${id}`"
        class="flex flex-col items-center justify-center w-full min-h-min cursor-pointer bg-base-100 dark:hover:bg-base-200 dark:bg-base-100 hover:bg-gray-100 dark:border-base-200 dark:hover:border-base-100"
      >
        <!-- <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            class="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{type == 'image'?'PNG, JPG or GIF':'PDF, PNG, JPG or GIF'}}
          </p>
        </div> -->
        <input
          :id="`dropzone-file-${id}`"
          type="file"
          class="file-input file-input-xs file-input-bordered w-60 bg-gray-200"
          @change="change()"
          :ref="`uploadfile-${id}`"
          :multiple="multiple"
          :accept="type == 'image' ? `image/*` : 'image/*,application/pdf'"
        />
      </label>
      <div
        v-if="(file.length > 0)"
        :class="!(file.length > 0) ? 'hidden' : ''"
        class="indicator mx-auto items-center justify-center w-fit min-h-min"
      >
        <span
          v-if="edit"
          class="indicator-item badge badge-sm cursor-pointer pb-1"
          @click="removefile(0)"
          >x</span
        >
        <div
          class="card-bordered px-2 rounded-lg bg-gray-200 border-gray-300 w-60"
        >
          <!-- {{ file }} -->
          <a class="text-xs font-semibold" :href="!file[0].temp ? `${fileLink}${file[0].file}` : `${serviceUrl}tmps/pdf/${file[0].file}`" target="_blank">{{ (file[0]?.name).slice(0, 30)+'...' }}</a>
          <!-- {{ (file[0]?.name) }} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Upload",
  props: {
    fileLink: {
      // type: String,
      default: null,
    },
    file: {
      default: null,
    },
    multiple: {
      default: false,
    },
    type: {
      default: "image",
    },
    id: {
      default: 0,
    },
    edit: {
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    serviceImage() {
      return this.$store.getters.serviceImage;
    },
    user_token() {
      return this.$store.getters.user_token;
    },
  },
  methods: {
    preview(v) {
      // console.log(v)
      // console.log(`${this.fileLink}/${v.file}`);
      // this.$emit("preview", `${this.fileLink}/${v.file}`);
     
      v.temp ? window.open(`${this.serviceUrl}tmps/pdf/${v.file}`,'_blank') : window.open(`${this.fileLink}/${v.file}`,'_blank')
    },
    again(v) {
      let obj = {
        r: v.r,
        upload: true,
        file: v.f.name,
        f: v.f,
        master: false,
        error: false,
        temp: true,
        loading: 0,
      };
      this.$emit("again", {
        file: obj,
      });
 
      const formData = new FormData();
 
      // let file = file;
      formData.append("file[" + 0 + "]", v.f);
      // formData.append("userid", "1");
      formData.append("type", this.type);
      this.upload(formData, obj.r);
    },
    change() {
      const fileField = this.$refs[`uploadfile-${this.id}`];
      for (let i = 0; i < fileField.files.length; i++) {
        const formData = new FormData();
 
        let file = fileField.files[i];
        formData.append("file[" + 0 + "]", file);
        // formData.append("userid", "1");
        formData.append("type", this.type);
        let obj = {
          r: (Math.random() + 1).toString(36).substring(2),
          upload: true,
          file: file.name,
          name: file.name,
          f: file,
          master: false,
          error: false,
          temp: true,
          loading: 0,
        };
        this.$emit("respone", {
          file: [obj],
        });
        this.upload(formData, obj.r);
        // console.log(file);
      }
    },
    async upload(formData, r) {
      // console.log(r)
      let vm = this;
      try {
        const resp = await fetch(
          `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/GLOBAL/upload`,
          {
            method: "POST",
            body: formData,
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Bearer ${this.user_token}`,
            },
          }
        );
        let total = resp.headers.get("content-length");
        let reader = await resp.body.getReader();
        const decoder = new TextDecoder();
        let bytesReceived = 0;
        const chunks = [];
        let res = await reader.read().then(function processResult(result) {
          // console.log((parseFloat(bytesReceived) / parseFloat(total)) * 100);
          // vm.$emit("stream", {
          //   loading: (parseFloat(bytesReceived) / parseFloat(total)) * 100,
          //   r: r,
          // });
          if (result.done) {
            return JSON.parse(chunks.join(""));
          }
          bytesReceived += result.value.length;
          // console.log(result.value.length);
          console.error(
            `${total} : Received ${bytesReceived} bytes of data so far`
          );
          const chunk = decoder.decode(result.value, { stream: true });
          chunks.push(chunk);
          // console.log((parseFloat(bytesReceived) / parseFloat(total)) * 100)
          vm.$emit("stream", {
            loading: (parseFloat(bytesReceived) / parseFloat(total)) * 100,
            r: r,
          });
          return reader.read().then(processResult);
        });
        this.$refs[`uploadfile-${this.id}`].value = "";
        res.forEach((v, i) => {
          // console.error(v);
          if (v.upload.success) {
            // console.log("AAAA");
            this.$emit("uploaded", {
              r: r,
              row: {
                file: `${v.log.row.current_file}.${v.log.row.ext}`,
                master: false,
                temp: true,
              },
            });
            // console.log(file);
          } else {
            // console.log("nnnnnn");
            this.$emit("error", {
              r: r,
            });
            // console.log("nnnnnn");
            console.log("Error:", res);
          }
        });
        // if (res[0].upload.success) {
        //   // console.log(this.tempImage)
        //   // let index = this.tempImage.findIndex((vv)=>vv.r == r)
        //   // console.log(this.tempImage[index])
        //   // console.log(index)
        //   // this.tempImage[index].upload = false;
 
        //   // console.log("AAAA");
        //   // file.push({
        //   //   file: `${v.log.row.current_file}.${v.log.row.ext}`,
        //   //   master: false,
        //   //   temp: true,
        //   // });
        //   // console.log(file);
        // } else {
        //   this.$emit("error", {
        //     r: r,
        //   });
        //   // console.log("nnnnnn");
        //   console.log("Error:", res);
        // }
      } catch (err) {
        console.log(err);
        // console.log("EEEEEEEEEEEEEEEEERRRRRRRRRRRRRRORRRRRRRRR")
        // console.log(r)
        this.$emit("error", {
          r: r,
        });
      }
    },
    removefile(index) {
      // console.log(index)
      let file = [...this.file];
      file.splice(index, 1);
      this.$emit("resetdata", {
        file: file,
        // fileLink: this.fileLink,
      });
    },
    setMaster(index) {
      // console.log(index)
      let file = [...this.file];
      // file.splice(index, 1);
      file.forEach((v, i) => {
        v.master = i == index ? true : false;
      });
      // file[index].master = true
      this.$emit("resetdata", {
        file: file,
        // fileLink: this.fileLink,
      });
    },
  },
  mounted() {},
};
</script>
