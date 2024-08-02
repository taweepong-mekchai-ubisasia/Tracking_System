<template>
  <!-- {{ havemenu }} -->
  <li v-if="havemenu && (head == 'System' || head == 'Event')"></li>
  <li v-if="havemenu || menutype == 'Access'">
    <details
      id="disclosure-components"
      :open="
        ((checkmenu || menutype == 'Access') && !prefix) ||
        ($route.meta.parent == 'Doc' &&
          prefix == 'Doc' &&
          $route.meta.sub == head)
      "
    >
      <summary class="group">
        <span>
          <Icon :icon="icon" class="w-5 h-5" :class="`${color}`" />
        </span>
        {{ head }}
      </summary>
      <ul>
        <li
          v-for="(v, i) in menu"
          :key="i + `${'aa'}`"
          class="bg-transparent m-0"
          v-if="prefix == 'Doc'"
        >
          <a
            href="#"
            class="flex gap-4 group hover:no-underline"
            :class="$route.name == `${prefix}${v.title}` ? 'active' : ''"
            @click="
              this.menutype == 'Access' ? '' : changepage(`${prefix}${v.title}`)
            "
          >
            <span class="flex-1 text-1xl">
              {{ v.title }}
            </span>
          </a>
        </li>

        <li
          v-for="(v, i) in menu"
          :key="i"
          class="bg-transparent m-0"
          v-else
          :class="menutype == 'Access' ? `  pointer-events-none` : ''"
        >
          <details
            v-if="
              v.menu &&
              (menutype == 'Access' ||
                (menutype == 'Menu' && v.access && v.access != 'none'))
            "
            id="disclosure-components"
            :open="
              menutype == 'Access' ? true : checkmenu ? checkmenu[i] : false
            "
          >
            <summary class="group">{{ v.title }}</summary>
            <ul>
              <li
                v-for="(vv, ii) in v.menu"
                :key="ii"
                class="bg-transparent m-0"
                :class="menutype == 'Access' ? `  pointer-events-none` : ''"
              >
                <a
                  v-if="
                    menutype == 'Access' ||
                    (menutype == 'Menu' && vv.access && vv.access != 'none')
                  "
                  href="#"
                  class="flex gap-4 group hover:no-underline"
                  :class="
                    menutype == 'Menu' &&
                    $route.name == `${prefix ? prefix : ''}${vv.name}`
                      ? 'active'
                      : ''
                  "
                  @click="this.menutype == 'Access' ? '' : changepage(vv.name)"
                >
                  <span class="flex-1 text-1xl">
                    {{ vv.title }}
                    <select
                      class="select select-bordered border-base-content select-xs w-32 float-end max-w-xs pointer-events-auto"
                      v-model="menuArray[vv.name]"
                      v-if="menutype == 'Access'"
                    >
                      <option selected value="none">None</option>
                      <option selected value="user">User</option>
                      <option selected value="superuser">Super User</option>
                      <option selected value="admin">Admin</option>
                      <option selected value="superadmin">Super Admin</option>
                    </select>
                  </span>
                </a>
              </li>
            </ul>
          </details>
          <a
            v-else-if="
              menutype == 'Access' ||
              (menutype == 'Menu' && v.access && v.access != 'none')
            "
            href="#"
            class="flex gap-4 group hover:no-underline"
            :class="
              menutype != 'Access' && $route.name == v.name ? 'active' : ''
            "
            @click="this.menutype == 'Access' ? '' : changepage(v.name)"
          >
            <span class="flex-1 text-1xl">
              {{ v.title }}

              <select
                class="select select-bordered border-base-content select-xs w-32 float-end max-w-xs pointer-events-auto"
                v-model="menuArray[v.name]"
                v-if="menutype == 'Access'"
              >
                <option selected value="none">None</option>
                <option selected value="user">User</option>
                <option selected value="superuser">Super User</option>
                <option selected value="admin">Admin</option>
                <option selected value="superadmin">Super Admin</option>
              </select>
            </span>
          </a>
        </li>
      </ul>
    </details>
  </li>
</template>

<script>
export default {
  emits: ["object_access"],
  setup(props, ctx) {
    // ctx.emit('submit')
  },
  data() {
    return {
      menuArray: {},
      menu: null,
      havemenu: false,
      lastindex: 0,
    };
  },
  props: ["menutype", "access", "head", "icon", "prefix", "color"],
  computed: {
    checkmenu() {
      let obj = null;
      let lastindex = 0;
      let check = this.menu.find((v, i) => {
        let sub = v.menu ? this.loopmenu(v.menu, i) : null;
        obj = sub ? sub : v.name == this.$route.name ? v : null;
        lastindex = i;
        return sub || v.name == this.$route.name;
      });
      return obj ? { [`${lastindex}`]: obj } : null;
    },
    menus() {
      return this.$store.getters.menu(this.head);
    },
    language() {
      return this.$store.getters.language;
    },
  },
  created() {
    // console.log(this.menus)
    this.menu = JSON.parse(JSON.stringify(this.menus));
  },
  mounted() {
    this.$nextTick(() => {
      // console.error(this.$store.getters["WH"])
      // let tmp =  JSON.stringify(this.menus)

      // this.$store.getters[this.head] = JSON.parse(tmp)
      // this.$store.commit(this.head, JSON.parse(tmp));
      // console.log("AAAAAAAAAAAAAAAAAAA")
      this.menuArray = { ...this.access };
      // console.log(this.menuArray)
      // console.error(this.menu)
      this.menutype == "Access" ? this.settingFormat() : this.menuAccess();
    });
  },
  methods: {
    settingFormat() {
      function lv2(vv, vm) {
        vv.menu.forEach((v, i) => {
          vm.menuArray[v.name] ? "" : (vm.menuArray[v.name] = "none");
        });
      }
      this.menus.forEach((v, i) => {
        v.menu
          ? lv2(v, this)
          : this.menuArray[v.name]
          ? ""
          : (this.menuArray[v.name] = "none");
      });
    },
    menuAccess() {
      // console.log("dddddddddddddddd")
      // console.log(this.menu)
      function lv2(vm, vv, value, key) {
        vv.menu.forEach((v, i) => {
          // v.access = false
          // console.error(v.name,key,v.access)
          if (v.name == key && value && value != "none") {
            // console.log(value)
            v.access = value;
            vv.access = value;
            // console.error(v.name,key,v.access,v.access != "none",v.name == key,v.name == key && v.access != "none" && v.access)
            // console.log("HAVE ME NU")
            // vm.havemenu == false ? (vm.havemenu = value && value != 'none' ? true : false) : "";
            vm.havemenu == false ? (vm.havemenu = true) : "";
            return;
          }
        });
      }
      // console.error(this.menuArray)
      for (let key in this.menuArray) {
        let value = this.menuArray[key];
        // console.log(value)
        // console.log(this.menuArray)
        // console.log(key)
        this.menu.forEach((v, i) => {
          // v.access = false
          // console.error(v.menu)
          if (v.menu) {
            lv2(this, v, value, key);
          } else {
            // console.log(v.access)
            // console.log(v.name,v.access != "none",v.access,v.access != "false")
            if (v.name == key && value && value != "none") {
              // console.log(v.name ,key)
              // console.log(value)
              v.access = value;
              this.havemenu == false ? (this.havemenu = true) : "";
            }
          }
        });
      }
      // console.log(this.menu)
    },
    loopmenu(menu) {
      let obj = menu.find((v, i) => v.name == this.$route.name);
      return obj ? obj : null;
    },
    changepage(page) {
      if (page == "HRRegistering") {
        const routeData = this.$router.resolve({
          name: "HRRegistering" /*query: {data: "someData"}*/,
        });
        return window.open(routeData.href, "_blank");
      }
      this.$router.push({ name: `${page}` });
    },
  },
  watch: {
    menuArray: {
      handler(val) {
        // console.log(val)
        this.$emit("object_access", { key: this.head, array: this.menuArray });
      },
      deep: true,
    },
  },
};
</script>
