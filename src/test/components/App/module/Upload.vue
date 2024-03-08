<template>
  <div id="Upload">
    <div class="flex items-center justify-center w-full">
      <label
        :class="!image.length>0 || multiple ? '' : 'hidden'"
        :for="`dropzone-file-${id}`"
        class="
          flex flex-col
          items-center
          justify-center
          w-full
          min-h-min
          border-2 border-dashed
          rounded-lg
          cursor-pointer
          bg-base-100
          dark:hover:bg-base-200 dark:bg-base-100
          hover:bg-gray-100
          dark:border-base-200 dark:hover:border-base-100
        "
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
          accept="image/*"
        />
      </label>

     <div :class="!image.length>0 || multiple ? 'hidden' : ''" class="indicator mx-auto items-center
          justify-center
          w-full
          min-h-min
          border-2 border-gray-300 border-dashed
          rounded-lg">
        <span
          class="indicator-item badge cursor-pointer py-3"

          @click="removeimage(0)"
          >x</span
        >
        <div
          class="
            grid
            
            card-bordered
            p-1
            place-items-center
            cursor-pointer
             overflow-hidden
          "
        >
          <img v-if="image.length>0" :src="`${image[0].temp?tmpsLink:imageLink}${image[0].file}`" :alt="`${image[0].file}`" />
        </div>
        
      </div>
    </div>

    <div
      v-if="multiple"
      class="
        grid
        md:gap-6
        gap-6
        
        
        md:grid-rows-1
        grid-rows-2
        mt-6
        mx-auto
      "
      :class="`
        md:grid-cols-${image.length<5?image.length:Math.ceil(image.length/2)<5?Math.ceil(image.length/2):5}
        grid-cols-${image.length<5?image.length:Math.ceil(image.length/2)<5?Math.ceil(image.length/2):5}
      `"
    >
      <!-- <div class="flex-0 w-full aspect-video mx-auto"> -->
      <div v-for="(row, index) in image" :key="index" class="indicator mx-auto">
        <span
          class="indicator-item badge cursor-pointer py-3"
          @click="removeimage(index)"
          >x</span
        >
        <!-- <span class="indicator-item indicator-start badge badge-secondary"></span> -->
        <span
          class="
            indicator-item indicator-center indicator-middle
            badge badge-secondary
          "
          v-if="row.master"
        >
          main
        </span>
        <div
          class="
            grid
            w-16
            h-16
            card-bordered
            p-1
            place-items-center
            cursor-pointer
             overflow-hidden
          "
          @click="setMaster(index)"
        >
          <img
            v-if="row.file"
            :src="
            `${row.temp?tmpsLink:imageLink}${row.file}`"
            :alt="`${row.file}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Upload",
  props: ["imageLink", "image", "multiple","id"],
  data() {
    return {
      tmpsLink:''
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
  },
  methods: {
    change() {
      const formData = new FormData();
      const fileField = this.$refs[`uploadimage-${this.id}`];
      for (let i = 0; i < fileField.files.length; i++) {
        let file = fileField.files[i];
        formData.append("image[" + i + "]", file);
        console.log(file);
      }
      formData.append("userid", "1");
      fetch(`${this.$store.state.serviceUrl}controllers/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          this.$refs[`uploadimage-${this.id}`].value = "";
          let image = [];
          result.forEach((v, i) => {
            console.error(v);
            if (v.upload.success) {
              // console.log("AAAA")
              image.push({
                file: `${v.log.row.current_file}.${v.log.row.ext}`,
                master: false,
                temp: true
              });
              // console.log(image)
            } else {
              // console.log("nnnnnn")
              console.log("Error:", v);
            }
          });

          console.log(image)
          this.$emit("respone", {
            image: image,
            
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
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
  mounted() {
    this.tmpsLink = `${this.ServiceUrl}tmps/`
  },
};
</script>
