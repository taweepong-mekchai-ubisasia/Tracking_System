<template>
  <div class="mt-3">
    <h3 class="text-lg font-bold italic">Scaning </h3>
    <h3 class="loading loading-dots loading-lg"></h3>
  </div>
  <!-- {{ this.detechScan }} -->
</template>

<script>
export default {
  name: "Scanning",
  components: {},
  computed: {
    // detechScan() {
    //   return this.$store.getters.detechScan;
    // },
  },
  data() {
    return {
      interval: null,
      barcode: "",
      // i:0,
    };
  },
  unmounted() {
    document.removeEventListener("keydown", this.DetectScan);
    // console.log("unmountedunmountedunmountedunmounted");
  },
  methods: {
    DetectScan(evt) {
      this.interval ? clearInterval(this.interval) : "";
      if (evt.code == "Enter") {
        this.barcode ? this.handleBarcode(this, this.barcode) : "";
        this.barcode = "";
        return;
      }
      if (evt.key != "Shift") this.barcode += evt.key;
      this.interval = setInterval(() => (this.barcode = ""), 20);
    },
    handleBarcode(vm, scanned_barcode) {
      // console.log(vm.i);
      // vm.i++;
      // console.log(scanned_barcode);
      vm.$emit("response", scanned_barcode);
      // document.querySelector('#last-barcode').innerHTML = scanned_barcode;
    },
  },
  mounted() {
    document.addEventListener("keydown", this.DetectScan);
  },
};
</script>

<style lang="scss" scoped></style>
