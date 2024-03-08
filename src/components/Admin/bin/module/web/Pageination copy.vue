<template>
  <div id="Pageination" class="col-span-4 row-span-4" v-if="total > row">
      <div class="col-span-2">
        <div class="btn-group grid grid-cols-2">
          <button
            class="btn btn-outline"
            :disabled="!back || loading"
            @click="category_back()"
          >
            Previous page
          </button>
          <button
            class="btn btn-outline"
            :disabled="!next || loading"
            @click="category_next()"
          >
            Next
          </button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Pageination",
  props: ["page",'total','row','back','next','loading'],
  data() {
    return { };
  },
 
  methods: {
    category_next() {
      this.$emit("search", {
        page: this.page + 1,
      });
    },
    category_back() {
      this.$emit("search", {
        page: this.page - 1,
      });
    },
  },
};
</script>
