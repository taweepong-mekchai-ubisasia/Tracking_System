<template>
  <!-- <div class="Search" :class="class"> -->
  <input
    type="search"
    placeholder="Search"
    ref="inputField"
    :class="class"
    @keydown="search"
    v-model="q"
    />
    <!-- @search="search" -->
  <!-- </div> -->
</template>
<script>
export default {
  name: "Search",
  components: {},
  props: {
    class: {
      default: ""
    }
  },
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
      this.timeout ? clearTimeout(this.timeout) : "";
      this.timeout = setTimeout(() => {
        this.$emit("search", this.q);
        clearTimeout(this.timeout);
      }, 500);
    },
  },
};
</script>
