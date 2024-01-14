<template>
  <div class="About" data-theme="winter">
    <AppLayout
      ref="AppLayout"
      @setgame="$emit('setgame')"
      @getgame="$emit('getgame')"
    >
      <template #modal> </template>
      <template #view>
        <div class="text-left md:w-full">
          <h1 class="text-5xl font-bold text-left">About Page</h1>
          <p class="py-6">Coming soon....</p>
        </div>
      </template>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/components/App/layout.vue";
export default {
  name: "About",
  components: {
    AppLayout,
  },
  props: [],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
  updated() {},
  beforeDestroy() {},
  watch: {},
};
</script>