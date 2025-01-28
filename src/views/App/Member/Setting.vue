<template>
  <div class="Setting" data-theme="winter">
    <AppLayout ref="AppLayout">
      <template #modal> </template>
      <template #view>
        <div class="text-left md:w-full">
          <h1 class="text-5xl font-bold text-left">Profile</h1>
          <p class="py-6">Coming soon....</p>
        </div>
      </template>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/components/App/layout.vue";
export default {
  name: "Setting",
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