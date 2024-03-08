<template>
  <div id="Pageination" v-if="total > row">
    <div class="join hidden md:block">
      <button
        class="join-item btn text-secondary"
        :disabled="!back || loading"
        @click="category_back()"
      >
        «
      </button>
      <button
        v-if="page > 3"
        class="join-item btn text-secondary"
        @click="category_index(1)"
      >
        {{ 1 }}
      </button>
      <div v-for="v in 3" :key="v" class="join join-item">
        <button
          v-if="page + (v - 4) >= 1"
          :class="`join-item btn ${v > 1 ? 'text-secondary' : 'btn-disabled'}`"
          @click="v > 1 ? category_index(page + (v - 4)) : ''"
        >
          {{ v > 1 ? page + (v - 4) : "..." }}
        </button>
      </div>
      <button
        class="join-item btn btn-secondary btn-active text-white"
        @click="category_index(page)"
      >
        {{ page }}
      </button>
      <div v-for="v in 3" :key="v" class="join join-item">
        <button
          v-if="page + v <= maxpage"
          :class="`join-item btn ${v != 3 ? 'text-secondary' : 'btn-disabled'}`"
          @click="v != 3 ? category_index(page + v) : ''"
        >
          {{ v != 3 ? page + v : "..." }}
        </button>
      </div>

      <button
        v-if="page < maxpage - 2"
        class="join-item btn text-secondary"
        @click="category_index(Math.ceil(total / row))"
      >
        {{ maxpage }}
      </button>
      <button
        class="join-item btn text-secondary"
        :disabled="!next || loading"
        @click="category_next()"
      >
        »
      </button>
    </div>
    <select class="select select-bordered select-xs w-full max-w-xs block  md:hidden">
  <option disabled selected>Tiny</option>
  <option>Tiny Apple</option>
  <option>Tiny Orange</option>
  <option>Tiny Tomato</option>
</select>
  </div>
</template>

<script>
export default {
  name: "Pageination",
  props: ["page", "total", "row", "back", "next", "loading"],
  data() {
    return {
      maxpage: 0,
    };
  },
  created() {
    this.maxpage = Math.ceil(this.total / this.row);
  },
  methods: {
    category_index(index) {
      this.$emit("search", {
        page: index,
      });
    },
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
  watch: {
    total: function (val) {
      this.maxpage = Math.ceil(this.total / this.row);
    },
  },
};
</script>
