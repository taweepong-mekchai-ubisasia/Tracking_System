<template>
  <div v-if="total > row" class="w-full justify-center md:text-right">
    <!-- น้อยกว่า 7 หน้า -->
    <div v-if="maxpage < 7">
      <div class="join hidden md:block">
        <button
          class="join-item btn btn-sm text-primary"
          :disabled="!back"
          @click="category_back()"
        >
          «
        </button>

        <button
          v-if="page > 1"
          class="join-item btn btn-sm text-primary"
          @click="category_index(1)"
        >
          {{ 1 }}
        </button>

        <div
          v-if="page > 2"
          v-for="v in page - 2" :key="v"
          class="join join-item"
        >
          <button
            :class="`join-item btn btn-sm ${
              v <= page - 2 ? 'text-primary' : 'btn-disabled'
            }`"
            @click="category_index(page - (maxpage - v) + 1 + (maxpage - page))"
          >
            {{ page - (maxpage - v) + 1 + (maxpage - page) }}
          </button>
        </div>

        <button
          class="join-item btn btn-sm btn-primary btn-active text-base-100"
          @click="category_index(page)"
        >
          {{ page }}
        </button>

        <div
          v-if="maxpage > (page + 1)"
          v-for="v in maxpage - (page + 1)" :key="v"
          class="join join-item"
        >
          <button
            :class="`join-item btn btn-sm ${
              v <= maxpage - (page + 1) ? 'text-primary' : 'btn-disabled'
            }`"
            @click="category_index(page + v)"
            >
            {{ page + v }}
          </button>
        </div>

        <button
          v-if="page < maxpage"
          class="join-item btn btn-sm text-primary"
          @click="category_index(Math.ceil(total / row))"
        >
          {{ maxpage }}
        </button>

        <button
          class="join-item btn btn-sm text-primary"
          :disabled="!next"
          @click="category_next()"
        >
          »
        </button>
      </div>

      <div class="block md:hidden">
        <select
          v-model="current"
          class="select select-primary select-bordered select-sm w-full text-center bg-primary text-white"
          @change="category_index(current)"
        >
          <option selected v-for="v in maxpage" :value="v" class="text-center">
            {{ v }}
          </option>
        </select>
      </div>
    </div>

    <!-- มากว่า 7 หน้า -->
    <div v-else>
      <div class="join hidden md:block">
        <button
          class="join-item btn btn-sm text-primary"
          :disabled="!back"
          @click="category_back()"
        >
          «
        </button>

        <button
          v-if="page > 1"
          class="join-item btn btn-sm text-primary"
          @click="category_index(1)"
        >
          {{ 1 }}
        </button>

        <div
          v-for="v in (5 - (maxpage - page))"
          class="join join-item"
          :class="`${page + (v - 4) >= 1 ? '' : 'hidden'}`"
          v-if="page > maxpage - 3"
          >
          <button
            :class="`join-item btn btn-sm ${
              v > 1 ? 'text-primary' : 'btn-disabled'
            }`"
            @click="v > 1 ? category_index(page + (v - (6 - (maxpage - page)))) : ''"
          >
            {{ v > 1 ? (page + v - (6 - (maxpage - page))) : "..." }}
          </button>
        </div>

        <div
          v-for="v in 2"
          class="join join-item"
          :class="`${page + (v - 4) >= 1 ? '' : 'hidden'}`"
          v-else
          >
          <button
            :class="`join-item btn btn-sm ${
              v > 1 ? 'text-primary' : 'btn-disabled'
            }`"
            @click="v > 1 ? category_index(page + (v - 3)) : ''"
          >
            {{ v > 1 ? page + (v - 3) : "..." }}
          </button>
        </div>

        <button
          class="join-item btn btn-sm btn-primary btn-active text-base-100"
          @click="category_index(page)"
        >
          {{ page }}
        </button>

        <div
          v-for="v in (6 - page)"
          class="join join-item"
          :class="`${page + v <= maxpage ? '' : 'hidden'}`"
          v-if="page < 4"
        >
          <button
            :class="`join-item btn btn-sm ${
              v != (6 - page) ? 'text-primary' : 'btn-disabled'
            }`"
            @click="v != (6 - page) ? category_index(page + v) : ''"
          >
            {{ v != (6 - page) ? page + v : "..." }}
          </button>
        </div>

        <div
          v-for="v in 2"
          class="join join-item"
          :class="`${page + v < maxpage ? '' : 'hidden'}`"
          v-else
        >
          <button
            :class="`join-item btn btn-sm ${
              v != 2 ? 'text-primary' : 'btn-disabled'
            }`"
            @click="v != 2 ? category_index(page + v) : ''"
          >
            {{ v != 2 ? page + v : "..." }}
          </button>
        </div>

        <button
          v-if="page < maxpage"
          class="join-item btn btn-sm text-primary"
          @click="category_index(Math.ceil(total / row))"
        >
          {{ maxpage }}
        </button>

        <button
          class="join-item btn btn-sm text-primary"
          :disabled="!next"
          @click="category_next()"
        >
          »
        </button>
      </div>

      <div class="block md:hidden">
        <select
          v-model="current"
          class="select select-primary select-bordered select-sm w-full text-center bg-primary text-white"
          @change="category_index(current)"
        >
          <option selected v-for="v in maxpage" :value="v" class="text-center">
            {{ v }}
          </option>
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
    row: function (val) {
      this.maxpage = Math.ceil(this.total / this.row);
    },
  },
};
</script>
