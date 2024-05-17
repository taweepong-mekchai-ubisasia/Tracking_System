<template>
  <div id="ShowImage">
    <input type="checkbox" id="modal_showImage" class="modal-toggle" />
    <div class="modal" role="dialog" v-if="src">
      <div class="modal-box p-0">
        <img v-if="src" :src="`${src}`" alt="Image" class="w-full" />
        <div class="modal-action absolute top-0 right-0 z-10 m-2">
          <label for="modal_showImage" class="btn btn-sm btn-circle bg-white">
            <Icon icon="vaadin:close" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Upload",
  props: {
    src: {
      default: null,
    }
  },
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
  mounted() {},
};
</script>
