  <template>
    <li>
        <details id="disclosure-components" :open="false">
          <summary class="group">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-green-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                />
              </svg>
            </span>
            Components
          </summary>
          <ul>
            <li>
              <h2 class="flex items-center gap-4 px-1.5">
                <span class="text-base-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
                    />
                  </svg>
                </span>
                Actions
              </h2>
              <ul>
                <li>
                  <a href="/components/button/" class="group">
                    <span>Button</span>
                    <span class="badge badge-sm font-mono undefined"
                      >updated</span
                    >
                  </a>
                </li>
                <li>
                  <a href="/components/dropdown/" class="group">
                    <span>Dropdown</span>
                    <span class="badge badge-sm font-mono undefined"
                      >updated</span
                    >
                  </a>
                </li>
                <li>
                  <a href="/components/modal/" class="group">
                    <span>Modal</span>
                  </a>
                </li>
                <li>
                  <a href="/components/swap/" class="group">
                    <span>Swap</span>
                  </a>
                </li>
                <li>
                  <a href="/components/theme-controller/" class="group">
                    <span>Theme Controller</span>
                    <span class="badge badge-sm font-mono undefined">new</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </details>
      </li>
  </template>
  
  <script setup>
  
  </script>
  
  <style lang="scss" scoped>
  
  </style>