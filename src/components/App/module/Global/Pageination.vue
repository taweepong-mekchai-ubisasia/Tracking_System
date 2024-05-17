<template>
  <div v-if="total > row" class="w-full justify-center md:text-right">

    <div>
      <div class="join hidden md:block">
        <button
          class="join-item btn text-primary"
          :disabled="!back"
          @click="category_back()"
        >
          «
        </button>
        <button
          v-if="page > 3"
          class="join-item btn text-primary"
          @click="category_index(1)"
        >
          {{ 1 }}
        </button>
        <div
          v-for="v in 3"
          :key="v"
          class="join join-item"
          :class="`${page + (v - 4) >= 1 ? '' : 'hidden'}`"
        >
          <button
            :class="`join-item btn ${
              v > 1 ? 'text-primary' : 'btn-disabled'
            }`"
            @click="v > 1 ? category_index(page + (v - 4)) : ''"
          >
            {{ v > 1 ? page + (v - 4) : "..." }}
          </button>
        </div>
        <button
          class="join-item btn btn-primary  btn-active  text-base-100"
          @click="category_index(page)"
        >
          {{ page }}
        </button>
        <div
          v-for="v in 3"
          :key="v"
          class="join join-item"
          :class="`${page + v <= maxpage ? '' : 'hidden'}`"
        >
          <button
            :class="`join-item btn ${
              v != 3 ? 'text-primary' : 'btn-disabled'
            }`"
            @click="v != 3 ? category_index(page + v) : ''"
          >
            {{ v != 3 ? page + v : "..." }}
          </button>
        </div>

        <button
          v-if="page < maxpage - 2"
          class="join-item btn text-primary"
          @click="category_index(Math.ceil(total / row))"
        >
          {{ maxpage }}
        </button>
        <button
          class="join-item btn text-primary"
          :disabled="!next"
          @click="category_next()"
        >
          »
        </button>
      </div>

      <div>
        <select
          v-model="current"
          class="select select-primary select-bordered select-sm w-full block md:hidden text-center bg-primary text-white"
          @change="category_index(current)"
        >
          <option selected v-for="v in maxpage" :value="v" class="text-center">
            {{ v }}
          </option>
          <!-- <option>Tiny Apple</option>
  <option>Tiny Orange</option>
  <option>Tiny Tomato</option> -->
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pageination",
  props: {
    page: {
      default: 1,
    },
    total: {
      default: 0,
    },
    row: {
      default: 20,
    },
    back: {
      default: false,
    },
    next: {
      default: false,
    },
    loading: {
      default: false,
    }
  },
  data() {
    return {
      current: 1,
      maxpage: 0,
    };
  },
  components: {
  },
  created() {
    this.current = this.page;
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
