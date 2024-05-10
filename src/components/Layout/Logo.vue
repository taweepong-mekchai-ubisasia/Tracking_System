<template>
  <a
    href="#"
    aria-current="page"
    aria-label="Homepage"
    class="flex-0 btn btn-ghost px-2"
    data-svelte-h="svelte-nce89e"
  >
    <img
      alt="UBIS Logo"
      :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/ubis-logo.png&s=50`"
      class="h-full py-2 px-4"
    />
  </a>
</template>

<script>
export default {
  name: "Employee",
  components: {},
  data() {
    return {};
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
  },
};
</script>

<style lang="scss" scoped></style>
