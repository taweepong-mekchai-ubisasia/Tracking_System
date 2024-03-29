<template>
  <div id="ShowImage">
    <input type="checkbox" id="modal_showImage" class="modal-toggle" />
    <div class="modal" role="dialog" v-if="src">
      <div class="modal-box p-0">
        <img
          v-if="src"
          :src="`${src}`"
          alt="Image"
          class="w-full"
        />
        <div class="modal-action absolute top-0 right-0 z-10 m-2 ">
         
          <label for="modal_showImage" class="btn btn-sm btn-circle  bg-white ">
            <Icon icon="vaadin:close"  />
          
          </label>
         
        </div>
      </div>
    </div>
    
    <!-- <div class="avatar w-auto">
      <label
        for="modal_showImage"
        class="btn btn-link"
        @click="
          setImage(
            `${
              row.image[row.master ? row.master : 0].temp
                ? tmpsLink
                : row.imageLink
                ? row.imageLink
                : tmpsLink
            }${row.image[row.master ? row.master : 0].file}`
          )
        "
      >
        <img
          v-if="row.image.length > 0"
          :src="`${
            row.image[row.master ? row.master : 0].temp
              ? tmpsLink
              : row.imageLink
              ? row.imageLink
              : tmpsLink
          }${row.image[row.master ? row.master : 0].file}`"
          alt="Image"
        />
      </label>
    </div> -->

  </div>
</template>

<script>
export default {
  name: "Upload",
  props: ["src"],
  data() {
    return {
      image: "",
    };
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    serviceImage() {
      return this.$store.getters.serviceImage;
    },
  },
  methods: {
    setImage(image) {},
  },
  mounted() {
    this.tmpsLink = `${this.serviceImage}tmps/`;
  },
};
</script>
