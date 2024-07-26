 <template>
  <div>
    <div class="dropdown">
      <div
        tabindex="0"
        role="button"
        class="link link-hover inline-block font-mono text-xs"
      >
        <!-- 0.0.1 -->
        <!-- 0.0.2 -->
        <!-- 0.0.3 -->
        <!-- 0.0.4 -->
         0.0.5
      </div>
      <ul
        tabindex="0"
        class="dropdown-content menu menu-sm bg-base-200 rounded-box mt-7 w-36 border border-white/5 p-2 shadow-2xl outline outline-1 outline-black/5"
      >
        <li>
          <a href="#"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            Changelog
          </a>
        </li>
        <li>
          <a href="/roadmap/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
              />
            </svg>
            Roadmap
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>