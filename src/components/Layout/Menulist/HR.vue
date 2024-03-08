<template>
  <li>
    <details id="disclosure-components" :open="checkmenu">
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
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg> -->
          <Icon name="mingcute:group-3-line" class="w-5 h-5 text-green-600" />
        </span>
        HR
      </summary>
       <ul>
        <li v-for="(v, i) in menu" :key="i">
          <details v-if="v.menu" id="disclosure-components" :open="checkmenu">
            <summary class="group">Bin Location</summary>
            <ul>
              <li v-for="(vv, ii) in v.menu" :key="ii">
                <NuxtLink
                  :to="vv.link"
                  :class="$route.name == vv.name ? 'active ' : ''"
                >
                  {{ vv.title }}
                </NuxtLink>
              </li>
            </ul>
          </details>
          <NuxtLink
            v-else
            :to="v.link"
            :class="$route.name == v.name ? 'active ' : ''"
          >
            {{ v.title }}
          </NuxtLink>
        </li>

      </ul>
    </details>
  </li>
</template>


<script setup>
const route = useRoute();
const menu = [
{
    title: "Employee",
    name: "HR-Employee",
    link: "/HR/Employee",
  },
  // {
  //   title: "Employee",
  //   menu: [
  //     {
  //       title: "Management",
  //       name: "WH-BinLocation",
  //       link: "/WH/BinLocation",
  //     },
  //     {
  //       title: "Short Code",
  //       name: "WH-BinLocation-Shortcode",
  //       link: "/WH/BinLocation/Shortcode",
  //     },
  //   ],
  // },
  
];
function checkmenu() {
  let check = menu.find((v) => v.name == route.name);
  return check ? true : false;
}

</script>
  
  <style lang="scss" scoped>
</style>