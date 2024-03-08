<template>
  <div>
    <ul class="menu px-4 py-0">
      <li>
        <span>
          <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-orange-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg> -->
          <Icon
            name="material-symbols:home-outline"
            class="w-5 h-5 text-orange-400"
          />
          <!-- <Icon name="line-md:home-md-twotone-alt" class="w-5 h-5 text-orange-400"/> -->
          <!-- <Icon name="prime:home"   class="w-6 h-5 text-orange-400"/> -->
          <!-- <iconify-icon icon="prime:home"></iconify-icon> -->
          Dashboard
        </span>

        <!-- <details id="disclosure-docs" :open="false">
          <summary class="group">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-orange-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
            </span>
            Dashboard
          </summary>
          <ul>
            <li>
              <a href="#" class="group"> <span>Use</span> </a>
            </li>
          </ul>
        </details> -->
      </li>
      <li>
        <details id="disclosure-docs" :open="false">
          <summary class="group">
            <span>
              <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-orange-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg> -->
              <!-- <Icon name="line-md:chat" class="w-5 h-5 text-orange-400"/> -->
              <Icon
                name="material-symbols:book-outline"
                class="w-5 h-5 text-orange-400"
              />
            </span>
            Docs
          </summary>
          <ul>
            <li>
              <a href="#" class="group"> <span>Use</span> </a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details id="disclosure-components" :open="true">
          <summary class="group">
            <span>
              <!-- <svg
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
              </svg> -->
              <!-- <Icon name="line-md:list-3" class="w-5 h-5 text-green-600"/> -->
              <!-- <Icon name="icon-park-outline:application-menu" class="w-5 h-5 text-green-600"/> -->
              <Icon
                name="icon-park-outline:list-one"
                class="w-5 h-5 text-green-600"
              />
            </span>
            Menu
          </summary>
          <ul>
            <LayoutMenulistHR />
            <LayoutMenulistWH />
            <LayoutMenulistIT />
            <LayoutMenulistAC />
            <LayoutMenulistSystem />
          </ul>
        </details>
      </li>

      <li></li>
      <li>
        <a href="/store/" class="group"
          ><span
            ><svg
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
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>
          </span>
          <span>Store</span>
          <span class="badge badge-sm font-mono badge-primary">new</span>
        </a>
      </li>

      <li></li>

      <li>
        <a
          href="https://opencollective.com/daisyui"
          target="_blank"
          rel="noopener noreferrer"
          class="group"
          ><span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </span>
          <span>Other</span>
          <svg
            width="12"
            height="12"
            class="opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 11H37V29"
              stroke="currentColor"
              stroke-width="4"
              stroke-linecap="butt"
              stroke-linejoin="bevel"
            ></path>
            <path
              d="M11.5439 36.4559L36.9997 11"
              stroke="currentColor"
              stroke-width="4"
              stroke-linecap="butt"
              stroke-linejoin="bevel"
            ></path>
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
