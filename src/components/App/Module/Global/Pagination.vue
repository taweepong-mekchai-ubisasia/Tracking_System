<template>
  <div class="w-full flex flex-row justify-between items-center">
    <!-- Page Size Dropdown (Left) -->
    <div class="text-left">
      <div class="flex-shrink-0 md:mb-0 join">
        <select
          id="pageSize"
          v-model="base.row"
          class="join-item select select-primary select-bordered select-xs text-center bg-primary text-white"
          @change="updatePageSize"
        >
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
        <button
          for="pageSize"
          class="join-item text-sm font-medium button input input-xs input-bordered"
        >
          <span v-if="isMobileOrTablet">
            <span class="text-xs"
              >Page {{ base.page }} of {{ maxpage }} ( Total :
              {{ base.total }} )</span
            >
          </span>
          <span v-else>
            <span class="text-xs"> / Page</span>
          </span>
        </button>
      </div>
    </div>

    <!-- Pagination Controls for Mobile/Tablet and Desktop (Center) -->
    <div
      :class="
        isMobileOrTablet
          ? 'flex flex-row space-y-2'
          : 'flex items-center space-x-2'
      "
    >
      <!-- Mobile/Tablet Friendly Pagination -->
      <div v-if="isMobileOrTablet" class="flex justify-center space-x-1">
        <button
          class="btn btn-xs btn-primary text-white"
          :disabled="!base.back"
          @click="pageBack"
        >
          « Back
        </button>
        <button
          class="btn btn-xs btn-primary text-white"
          @click="pageNext"
          :disabled="base.page >= maxpage"
        >
          Next »
        </button>
      </div>

      <!-- Desktop Pagination Controls -->
      <!-- น้อยกว่า 7 หน้า -->
      <div v-else-if="maxpage < 7">
        <div class="join hidden md:block">
          <button
            class="join-item btn btn-sm text-primary"
            :disabled="!base.back"
            @click="pageBack"
          >
            «
          </button>
  
          <button
            v-if="base.page > 1"
            class="join-item btn btn-sm text-primary"
            @click="pageIndex(1)"
          >
            1
          </button>
  
          <div
            v-if="base.page > 2"
            v-for="v in base.page - 2" :key="v"
            class="join join-item"
          >
            <button
              :class="`join-item btn btn-sm ${
                v <= base.page - 2 ? 'text-primary' : 'btn-disabled'
              }`"
              @click="pageIndex(base.page - (maxpage - v) + 1 + (maxpage - base.page))"
            >
              {{ base.page - (maxpage - v) + 1 + (maxpage - base.page) }}
            </button>
          </div>
  
          <button
            class="join-item btn btn-sm btn-primary btn-active text-base-100"
          >
          <!-- @click="pageIndex(base.page)" -->
            {{ base.page }}
          </button>
  
          <div
            v-if="maxpage > (base.page + 1)"
            v-for="v in maxpage - (base.page + 1)" :key="v"
            class="join join-item"
          >
            <button
              :class="`join-item btn btn-sm ${
                v <= maxpage - (base.page + 1) ? 'text-primary' : 'btn-disabled'
              }`"
              @click="pageIndex(base.page + v)"
            >
              {{ base.page + v }}
            </button>
          </div>
  
          <button
            v-if="base.page < maxpage"
            class="join-item btn btn-sm text-primary"
            @click="pageIndex(maxpage)"
          >
            {{ maxpage }}
          </button>
  
          <button
            class="join-item btn btn-sm text-primary"
            :disabled="!base.next"
            @click="pageNext"
          >
            »
          </button>
        </div>
      </div>

      <!-- มากว่า 7 หน้า -->
      <div v-else class="join">
        <button
          class="join-item btn btn-sm text-primary"
          :disabled="!base.back"
          @click="pageBack"
        >
          «
        </button>

        <button
          v-if="base.page > 1"
          class="join-item btn btn-sm text-primary"
          @click="pageIndex(1)"
        >
          1
        </button>

        <!-- อันเดิม -->
        <!-- <div
          v-for="v in 3"
          :key="v"
          class="join join-item"
          :class="`${base.page + (v - 4) >= 1 ? '' : 'hidden'}`"
        >
          <button
            :class="`join-item btn btn-sm ${
              v > 1 ? 'text-primary' : 'btn-disabled'
            }`"
            @click="v > 1 ? pageIndex(base.page + (v - 4)) : ''"
          >
            {{ v > 1 ? base.page + (v - 4) : "..." }}
          </button>
        </div> -->

        <!-- <div
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
        </div> -->

        <div
          v-for="v in (5 - (maxpage - base.page))"
          class="join join-item"
          :class="`${base.page + (v - 4) >= 1 ? '' : 'hidden'}`"
          v-if="base.page > maxpage - 3"
        >
          <button
            :class="`join-item btn btn-sm ${
              v > 1 ? 'text-primary' : 'btn-disabled'
            }`"
            @click="v > 1 ? pageIndex(base.page + (v - (6 - (maxpage - base.page)))) : ''"
          >
          {{ v > 1 ? (base.page + v - (6 - (maxpage - base.page))) : "..." }}
          </button>
        </div>

        <div
          v-for="v in 2"
          class="join join-item"
          :class="`${base.page + (v - 4) >= 1 ? '' : 'hidden'}`"
          v-else
        >
          <button
            :class="`join-item btn btn-sm ${
              v > 1 ? 'text-primary' : 'btn-disabled'
            }`"
            @click="v > 1 ? pageIndex(base.page + (v - 3)) : ''"
          >
            {{ v > 1 ? base.page + (v - 3) : "..." }}
          </button>
        </div>

        <button
          class="join-item btn btn-sm btn-primary btn-active text-base-100"
        >
        <!-- @click="pageIndex(base.page)" -->
          {{ base.page }}
        </button>

        <!-- อันเดิม -->
        <!-- <div
          v-for="v in 3"
          :key="v"
          class="join join-item"
          :class="`${base.page + v <= maxpage ? '' : 'hidden'}`"
        >
          <button
            :class="`join-item btn btn-sm ${
              v != 3 ? 'text-primary' : 'btn-disabled'
            }`"
            @click="v != 3 ? pageIndex(base.page + v) : ''"
          >
            {{ v != 3 ? base.page + v : "..." }}
          </button>
        </div> -->

        <div
          v-for="v in (6 - base.page)"
          class="join join-item"
          :class="`${base.page + v <= maxpage ? '' : 'hidden'}`"
          v-if="base.page < 4"
        >
          <button
            :class="`join-item btn btn-sm ${
              v != (6 - base.page) ? 'text-primary' : 'btn-disabled'
            }`"
            @click="v != (6 - base.page) ? pageIndex(base.page + v) : ''"
          >
            {{ v != (6 - base.page) ? base.page + v : "..." }}
          </button>
        </div>

        <div
          v-for="v in 2"
          class="join join-item"
          :class="`${base.page + v < maxpage ? '' : 'hidden'}`"
          v-else
        >
          <button
            :class="`join-item btn btn-sm ${
              v != 2 ? 'text-primary' : 'btn-disabled'
            }`"
            @click="v != 2 ? pageIndex(base.page + v) : ''"
          >
            {{ v != 2 ? base.page + v : "..." }}
          </button>
        </div>

        <button
          v-if="base.page < maxpage"
          class="join-item btn btn-sm text-primary"
          @click="pageIndex(maxpage)"
        >
          {{ maxpage }}
        </button>

        <button
          class="join-item btn btn-sm text-primary"
          :disabled="base.page >= maxpage"
          @click="pageNext"
        >
          »
        </button>
      </div>
    </div>

    <!-- Pagination Info (Right) -->
    <div class="text-xs text-right" v-if="!isMobileOrTablet">
      <p>Total Items: {{ base.total }}</p>
      <p>Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ base.total }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineEmits, defineProps } from "vue";

// Define emits and props for component interaction
const emit = defineEmits(["update:modelValue", "update:page"]);
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ page: 1, total: 0, row: 20, back: false, next: false }),
  },
});

// Base computed property for two-way binding with parent component
const base = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Page size options for rows per page
const pageSizes = [1, 10, 15, 20, 25, 30, 50, 100, 250, 500];

// Calculations for pagination display
const maxpage = computed(() => Math.ceil(base.value.total / base.value.row));
const startIndex = computed(() => (base.value.page - 1) * base.value.row);
const endIndex = computed(() =>
  Math.min(base.value.page * base.value.row, base.value.total)
);

// Watcher to update pagination when total items change
watch(
  () => props.modelValue.total,
  (newTotal) => {
    maxpage.value = Math.ceil(newTotal / base.value.row);
  }
);

// Methods to handle pagination logic
const pageIndex = (index) => {
  if (index >= 1 && index <= maxpage.value) {
    base.value.page = index;
    emit("update:page", index);
  }
};

const pageNext = () => {
  if (base.value.page < maxpage.value) {
    base.value.page += 1;
    emit("update:page", base.value.page);
  }
};

const pageBack = () => {
  if (base.value.page > 1) {
    base.value.page -= 1;
    emit("update:page", base.value.page);
  }
};

const updatePageSize = () => {
  base.value.page = 1; // Reset to the first page when page size is changed
  emit("update:page", base.value.page);
};

// Reactive state to check if device is mobile or tablet
const isMobileOrTablet = ref(window.innerWidth < 768);

// Listener for window resize to update device state
window.addEventListener("resize", () => {
  isMobileOrTablet.value = window.innerWidth < 768;
});
</script>
