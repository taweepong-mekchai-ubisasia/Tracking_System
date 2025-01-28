<template>
  <div class="relative z-10 w-full max-w-md mx-auto" ref="datePickerWrapper">
    <!-- Always render the Date Input Field -->
    <input
      type="text"
      v-model="formattedDate"
      @click="toggleCalendar"
      readonly
      class="border rounded p-2 cursor-pointer flex items-center justify-between space-x-2 bg-white shadow-md w-full"
      placeholder="Select a date range"
    />

    <!-- Calendar Dropdown -->
    <div
      ref="calendarPopup"
      class="absolute bg-white border rounded shadow-lg z-30 overflow-hidden w-full"
      :style="calendarStyles"
      v-show="alwaysShowDropdown || showCalendar"
    >
      <!-- Calendar Header -->
      <div class="flex items-center justify-between p-2 border-b">
        <button
          @click="goToPrevMonth"
          class="text-gray-500 hover:text-gray-700"
        >
          &lt;
        </button>
        <span class="font-semibold">{{ monthYear }}</span>
        <button
          @click="goToNextMonth"
          class="text-gray-500 hover:text-gray-700"
        >
          &gt;
        </button>
      </div>

      <!-- Day Labels -->
      <div
        class="grid grid-cols-7 gap-1 text-center font-semibold text-sm p-2 border-b"
      >
        <span v-for="day in days" :key="day">{{ day }}</span>
      </div>

      <!-- Dates Grid -->
      <div class="grid grid-cols-7 gap-1 text-center p-2">
        <span
          v-for="(day, index) in paddedDays"
          :key="index"
          @click="selectDate(day)"
          :class="getDayClasses(day)"
        >
          {{ day.date }}
        </span>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-between p-2">
        <button
          :class="['text-sm px-3 py-1 rounded', clearButtonClass]"
          @click="clearDate"
        >
          Clear Date
        </button>
        <button
          :class="['text-sm px-3 py-1 rounded', todayButtonClass]"
          @click="selectToday"
        >
          Today
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
} from "date-fns";

// Define computed properties and methods inside setup function
export default {
  props: {
    inputClass: {
      type: String,
      default: "",
    },
    clearButtonClass: {
      type: String,
      default: "bg-gray-200 hover:bg-gray-300",
    },
    todayButtonClass: {
      type: String,
      default: "bg-blue-500 text-white hover:bg-blue-600",
    },
    alwaysShowDropdown: {
      type: Boolean,
      default: false,
    },
    selectionMode: {
      type: String,
      default: "single", // Can be 'single', 'range', or 'multiple'
    },
  },
  setup(props) {
    const showCalendar = ref(false);
    const selectedDates = ref([]);
    const currentMonth = ref(new Date());
    const calendarStyles = ref({
      right: "0px",
      bottom: "auto",
      position: "absolute",
      zIndex: 9999,
    });
    const datePickerWrapper = ref(null);
    const calendarPopup = ref(null);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const formattedDate = computed(() => {
      if (props.selectionMode === "range" && selectedDates.value.length === 2) {
        return `${format(selectedDates.value[0], "dd-MM-yyyy")} - ${format(
          selectedDates.value[1],
          "dd-MM-yyyy"
        )}`;
      } else if (
        props.selectionMode === "multiple" &&
        selectedDates.value.length > 0
      ) {
        return selectedDates.value
          .map((date) => format(date, "dd-MM-yyyy"))
          .join(", ");
      } else if (selectedDates.value.length === 1) {
        return format(selectedDates.value[0], "dd-MM-yyyy");
      }
      return "";
    });

    const monthYear = computed(() => format(currentMonth.value, "MMMM yyyy"));

    const paddedDays = computed(() => {
      const start = startOfMonth(currentMonth.value);
      const end = endOfMonth(currentMonth.value);
      const days = eachDayOfInterval({ start, end });
      const firstDayIndex = start.getDay();
      const lastDayIndex = end.getDay();
      const paddingStart = Array.from({ length: firstDayIndex }).map(() => ({
        date: "",
      }));
      const paddingEnd = Array.from({ length: 6 - lastDayIndex }).map(() => ({
        date: "",
      }));
      return [
        ...paddingStart,
        ...days.map((date) => ({ date: date.getDate(), fullDate: date })),
        ...paddingEnd,
      ];
    });

    const getDayClasses = (day) => {
      if (!day.fullDate) return "text-gray-400 cursor-default";
      const isSelected = selectedDates.value.some(
        (date) =>
          format(date, "yyyy-MM-dd") === format(day.fullDate, "yyyy-MM-dd")
      );
      return [
        "p-2 cursor-pointer rounded hover:bg-blue-200",
        isSelected ? "bg-blue-500 text-white" : "",
      ];
    };

    const toggleCalendar = () => {
      if (!props.alwaysShowDropdown) {
        showCalendar.value = !showCalendar.value;
      }
    };

    const adjustCalendarPosition = () => {
      if (!datePickerWrapper.value || !calendarPopup.value) return;

      calendarStyles.value = {
        right: "0px",
        bottom: "auto",
        position: "absolute",
        zIndex: 9999,
      };
    };

    const handleClickOutside = (event) => {
      if (
        !props.alwaysShowDropdown &&
        datePickerWrapper.value &&
        !datePickerWrapper.value.contains(event.target) &&
        calendarPopup.value &&
        !calendarPopup.value.contains(event.target)
      ) {
        showCalendar.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
      window.addEventListener("resize", adjustCalendarPosition);
      nextTick(adjustCalendarPosition);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", adjustCalendarPosition);
    });

    const selectDate = (day) => {
      if (!day.fullDate) return;

      const date = day.fullDate;
      if (props.selectionMode === "single") {
        selectedDates.value = [date];
      } else if (props.selectionMode === "range") {
        if (selectedDates.value.length === 2) {
          selectedDates.value = [date];
        } else if (selectedDates.value.length === 1) {
          selectedDates.value.push(date);
          if (selectedDates.value[0] > selectedDates.value[1]) {
            selectedDates.value.reverse();
          }
        } else {
          selectedDates.value.push(date);
        }
      } else if (props.selectionMode === "multiple") {
        if (
          selectedDates.value.some(
            (d) => format(d, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
          )
        ) {
          selectedDates.value = selectedDates.value.filter(
            (d) => format(d, "yyyy-MM-dd") !== format(date, "yyyy-MM-dd")
          );
        } else {
          selectedDates.value.push(date);
        }
      }
    };

    const goToPrevMonth = () => {
      currentMonth.value = subMonths(currentMonth.value, 1);
    };

    const goToNextMonth = () => {
      currentMonth.value = addMonths(currentMonth.value, 1);
    };

    const clearDate = () => {
      selectedDates.value = [];
    };

    const selectToday = () => {
      const today = new Date();
      selectedDates.value = [today];
    };

    return {
      showCalendar,
      selectedDates,
      currentMonth,
      calendarStyles,
      datePickerWrapper,
      calendarPopup,
      days,
      formattedDate,
      monthYear,
      paddedDays,
      selectDate,
      goToPrevMonth,
      goToNextMonth,
      clearDate,
      selectToday,
      getDayClasses,
      toggleCalendar,
    };
  },
};
</script>

<style scoped>
/* Additional custom styles can go here */
</style>
