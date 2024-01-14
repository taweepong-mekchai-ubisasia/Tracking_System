<template>
  <div class="Dashboard" data-theme="winter">
    <AppLayout
      ref="AppLayout"
      @setgame="$emit('setgame')"
      @getgame="$emit('getgame')"
    >
      <template #modal> </template>
      <template #view>
        <div class="text-left md:w-full">
          <div class="container mx-auto">
            <div class="py-4 lg:py-10">
              <div
                class="grid grid-cols-1 gap-6 lg:p-10 xl:grid-cols-3 lg:bg-base-200 rounded-box"
              >
                <div class="card shadow-lg compact side bg-base-100">
                  <div class="flex-row items-center space-x-4 card-body">
                    <div>
                      <div class="avatar">
                        <div class="rounded-full w-14 h-14 shadow">
                          <img src="https://i.pravatar.cc/500?img=32" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 class="card-title">Janis Johnson</h2>
                      <p class="text-base-content text-opacity-40">
                        Accounts Agent
                      </p>
                    </div>
                  </div>
                </div>
                <div class="card shadow-lg compact side bg-base-100">
                  <div class="flex-row items-center space-x-4 card-body">
                    <div class="flex-1">
                      <h2 class="card-title">Meredith Mayer</h2>
                      <p class="text-base-content text-opacity-40">
                        Data Liaison
                      </p>
                    </div>
                    <div class="flex-0">
                      <button class="btn btn-sm">Follow</button>
                    </div>
                  </div>
                </div>
                <div class="card row-span-2 shadow-lg compact bg-base-100">
                  <figure>
                    <img src="https://picsum.photos/id/1005/600/400" />
                  </figure>
                  <div class="flex-row items-center space-x-4 card-body">
                    <div>
                      <h2 class="card-title">Karolann Collins</h2>
                      <p class="text-base-content text-opacity-40">
                        Direct Interactions Liaison
                      </p>
                    </div>
                  </div>
                </div>
                <div class="card shadow-lg compact side bg-base-100">
                  <div class="flex-row items-center space-x-4 card-body">
                    <div class="flex-1">
                      <h2 class="card-title text-primary">4,600</h2>
                      <p class="text-base-content text-opacity-40">
                        Page views
                      </p>
                    </div>
                    <div class="flex space-x-2 flex-0">
                      <button class="btn btn-sm btn-square">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          class="inline-block w-6 h-6 stroke-current"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                      </button>
                      <button class="btn btn-sm btn-square">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          class="inline-block w-6 h-6 stroke-current"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card shadow-lg compact side bg-base-100">
                  <div class="flex-row items-center space-x-4 card-body">
                    <label class="flex-0"
                      ><input
                        type="checkbox"
                        checked="checked"
                        class="toggle toggle-primary"
                    /></label>
                    <div class="flex-1">
                      <h2 class="card-title">Enable Notifications</h2>
                      <p class="text-base-content text-opacity-40">
                        To get latest updates
                      </p>
                    </div>
                  </div>
                </div>
                <div class="stats shadow col-span-3">
                  <div class="stat">
                    <div class="stat-figure text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="inline-block w-8 h-8 stroke-current"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                      </svg>
                    </div>
                    <div class="stat-title">Total Likes</div>
                    <div class="stat-value text-primary">25.6K</div>
                    <div class="stat-desc">21% more than last month</div>
                  </div>

                  <div class="stat">
                    <div class="stat-figure text-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="inline-block w-8 h-8 stroke-current"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                    </div>
                    <div class="stat-title">Page Views</div>
                    <div class="stat-value text-secondary">2.6M</div>
                    <div class="stat-desc">21% more than last month</div>
                  </div>

                  <div class="stat">
                    <div class="stat-figure text-secondary">
                      <div class="avatar online">
                        <div class="w-16 rounded-full">
                          <img
                            src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="stat-value">86%</div>
                    <div class="stat-title">Tasks done</div>
                    <div class="stat-desc text-secondary">
                      31 tasks remaining
                    </div>
                  </div>
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
  name: "Dashboard",
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