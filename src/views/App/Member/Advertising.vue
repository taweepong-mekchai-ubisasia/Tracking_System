<template>
  <div class="Advertising" data-theme="winter">
    <AppLayout ref="AppLayout">
      <template #modal> </template>
      <template #view>
        <div class="grid grid-cols-1 gap-8 w-full">
          <div class="text-left w-full mb-4 pt-4">
            <h1 class="text-5xl font-bold text-center">Advertising List</h1>
          </div>
          <div
            class="grid gap-4 auto-cols-max grid-flow-row-dense grid-cols-5 grid-rows-3"
          >
            <div
              class="card bg-base-100 shadow-xl card-bordered w-full"
              v-for="i in 20"
              :key="i"
            >
              <figure class="mt-4">
                <img :src="require(`@/assets/images/11.png`)" alt="Shoes" />
              </figure>
              <div class="card-body pt-0">
                <div class="divider"></div>
                <h2 class="card-title">Advertising Post</h2>
                <div class="card-actions justify-start">
                  <div class="badge badge-outline">11/11/11</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/components/App/layout.vue";
export default {
  name: "Advertising",
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
  beforeDestroy() {},
  watch: {},
};
</script>
