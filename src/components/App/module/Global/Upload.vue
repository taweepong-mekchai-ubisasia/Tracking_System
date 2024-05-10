<template>
  <div id="Upload" class="border-2 border-dashed rounded-lg">
    <div class="flex items-center justify-center w-full">
      <!-- {{ type }} -->
      <label
        :class="!image.length > 0 || multiple ? '' : 'hidden'"
        :for="`dropzone-file-${id}`"
        class="flex flex-col items-center justify-center w-full min-h-min cursor-pointer bg-base-100 dark:hover:bg-base-200 dark:bg-base-100 hover:bg-gray-100 dark:border-base-200 dark:hover:border-base-100"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
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
            PNG, JPG or GIF
          </p>
        </div>
        <input
          :id="`dropzone-file-${id}`"
          type="file"
          class="hidden"
          @change="change()"
          :ref="`uploadimage-${id}`"
          :multiple="multiple"
          :accept="type == 'image' ? `image/*` : 'application/pdf'"
        />
      </label>

      <div
        :class="!image.length > 0 || multiple ? 'hidden' : ''"
        class="indicator mx-auto items-center justify-center w-full min-h-min"
      >
        <span
          class="indicator-item badge cursor-pointer py-3"
          @click="removeimage(0)"
          >x</span
        >
        <div
          class="grid card-bordered p-1 place-items-center cursor-pointer overflow-hidden"
        >
          <img
            width="auto"
            height="auto"
            class="max-h-44 object-cover bg-cover"
            v-if="image.length > 0"
            :src="`${image[0].temp ? `${serviceUrl}tmps/image/` : imageLink}${
              image[0].file
            }`"
            :alt="`${image[0].file}`"
          />
        </div>
      </div>
    </div>

    <div class="overflow-x-auto" v-if="multiple && type == 'pdf'">
      <table class="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>#</th>
            <td>Name</td>
            <!-- <td>Upload</td> -->
            <td>Loading</td>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="(v, i) in image" :key="i">
          <tr>
            <th>1</th>
            <td>{{ v.file }}</td>
            <!-- <td>{{ v.upload }} {{ v.loading}}  {{ v.error}}</td> -->
            <td>
              <progress
                class="progress w-56"
                :class="
                  v.error
                    ? ' progress-error'
                    : !v.loading || v.loading >= 100
                    ? 'progress-success'
                    : 'progress-info'
                "
                :value="v.loading"
                max="100"
              ></progress>
            </td>
            <th class="text-right">
              <span class="btn btn-sm w-24" v-if="v.error" @click="again(v)"
                >TRY AGAIN</span
              >
              <span class="btn btn-sm w-24" v-else @click="again(v)"
                >DELETE</span
              >
            </th>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="multiple && type == 'image' && image.length > 0"
      class="grid md:gap-6 gap-6 md:grid-rows-1 grid-rows-2 p-4 mx-auto border-t-[1px] bg-white"
      :class="`
        md:grid-cols-${
          image.length < 5
            ? image.length
            : Math.ceil(image.length / 2) < 5
            ? Math.ceil(image.length / 2)
            : 5
        }
        grid-cols-${
          image.length < 5
            ? image.length
            : Math.ceil(image.length / 2) < 5
            ? Math.ceil(image.length / 2)
            : 5
        }
      `"
    >
      <!-- <div class="flex-0 w-full aspect-video mx-auto"> -->
      <div v-for="(v, i) in image" :key="index" class="indicator mx-auto">
        <span
          class="indicator-item badge cursor-pointer py-3"
          @click="removeimage(i)"
          >x</span
        >
        <!-- <span class="indicator-item indicator-start badge badge-secondary"></span> -->
        <span
          class="indicator-item indicator-center indicator-middle badge badge-secondary"
          v-if="v.master"
        >
          main
        </span>
        <div
          class="grid w-16 h-16 card-bordered p-1 place-items-center cursor-pointer overflow-hidden"
          @click="setMaster(i)"
        >
          <img
            width="auto"
            height="auto"
            class="max-h-44 object-cover bg-cover"
            v-if="v.file"
            :src="`${v.temp ? `${serviceUrl}tmps/image/` : imageLink}${v.file}`"
            :alt="`${v.file}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Upload",
  props: {
    imageLink: {
      // type: String,
      default: null,
    },
    image: {
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
        image: obj,
      });

      const formData = new FormData();

      // let file = file;
      formData.append("image[" + 0 + "]", v.f);
      // formData.append("userid", "1");
      formData.append("type", this.type);
      this.upload(formData, obj.r);
    },
    change() {
      const fileField = this.$refs[`uploadimage-${this.id}`];
      for (let i = 0; i < fileField.files.length; i++) {
        const formData = new FormData();

        let file = fileField.files[i];
        formData.append("image[" + 0 + "]", file);
        // formData.append("userid", "1");
        formData.append("type", this.type);
        let obj = {
          r: (Math.random() + 1).toString(36).substring(2),
          upload: true,
          file: file.name,
          f: file,
          master: false,
          error: false,
          temp: true,
          loading: 0,
        };
        this.$emit("respone", {
          image: [obj],
        });
        this.upload(formData, obj.r);
        // console.log(file);
      }
    },
    async upload(formData, r) {
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
          console.log((parseFloat(bytesReceived) / parseFloat(total)) * 100);
          // vm.$emit("stream", {
          //   loading: (parseFloat(bytesReceived) / parseFloat(total)) * 100,
          //   r: r,
          // });
          if (result.done) {
            return JSON.parse(chunks.join(""));
          }
          bytesReceived += result.value.length;
          console.log(result.value.length);
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
        this.$refs[`uploadimage-${this.id}`].value = "";
        res.forEach((v, i) => {
          console.error(v);
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
            // console.log(image);
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
        //   // image.push({
        //   //   file: `${v.log.row.current_file}.${v.log.row.ext}`,
        //   //   master: false,
        //   //   temp: true,
        //   // });
        //   // console.log(image);
        // } else {
        //   this.$emit("error", {
        //     r: r,
        //   });
        //   // console.log("nnnnnn");
        //   console.log("Error:", res);
        // }
      } catch (err) {
        console.log(err);
        this.$emit("error", {
          r: r,
        });
      }

      // fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/GLOBAL/upload`, {
      //   method: "POST",
      //   body: formData,
      // })
      //   .then((response) => response.json())
      //   .then((result) => {
      //     this.$refs[`uploadimage-${this.id}`].value = "";
      //     // let image = [];
      //     result.forEach((v, i) => {
      //       if (v.upload.success) {
      //         // console.log(this.tempImage)
      //         // let index = this.tempImage.findIndex((vv)=>vv.r == r)
      //         // console.log(this.tempImage[index])
      //         // console.log(index)
      //         // this.tempImage[index].upload = false;

      //         this.$emit("uploaded", {
      //           r: r,
      //         });
      //         // console.log("AAAA");
      //         // image.push({
      //         //   file: `${v.log.row.current_file}.${v.log.row.ext}`,
      //         //   master: false,
      //         //   temp: true,
      //         // });
      //         // console.log(image);
      //       } else {
      //         // console.log("nnnnnn");
      //         console.log("Error:", v);
      //       }
      //     });

      //     // console.log(image);
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });
    },
    removeimage(index) {
      // console.log(index)
      let image = [...this.image];
      image.splice(index, 1);
      this.$emit("resetdata", {
        image: image,
        // imageLink: this.imageLink,
      });
    },
    setMaster(index) {
      // console.log(index)
      let image = [...this.image];
      // image.splice(index, 1);
      image.forEach((v, i) => {
        v.master = i == index ? true : false;
      });
      // image[index].master = true
      this.$emit("resetdata", {
        image: image,
        // imageLink: this.imageLink,
      });
    },
  },
  mounted() {},
};
</script>
