<template>
  <!-- <div class="Search" :class="class"> -->
  <input
    type="search"
    placeholder="ค้นหา"
    ref="inputField"
    :class="class"
    @keyup="search"
    v-model="q"
  />
  <!-- </div> -->
</template>
<script>
export default {
  name: "Search",
  components: {},
  props: ["class"],
  data() {
    return {
      q: "",
      timeout: null,
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
  },
  methods: {},
  mounted() {},
  watch: {
    q: function (v) {
      console.log(v);
      this.timeout ? clearTimeout(this.timeout) : "";
      this.timeout = setTimeout(() => {
        this.$emit("search", this.q);
        clearTimeout(this.timeout);
      }, 500);
    },
  },
};
</script>
