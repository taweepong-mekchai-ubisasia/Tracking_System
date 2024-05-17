<template>
  <div
    class="grid min-h-[50vh] w-full h-full content-center justify-center items-center"
  >
    <section>
      <div
        class="prevent-select pointer-events-none font-extrabold text-primary"
        :class="class"
      >
        <span>Empty Data</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "EmptyData",
  props: {
    class: {
      default: "",
    }
  }
};
</script>
