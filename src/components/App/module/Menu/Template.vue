<template>
  <!-- {{ havemenu }} -->
  <li v-if="havemenu || menutype == 'access'">
    <details
      id="disclosure-components"
      :open="checkmenu || menutype == 'access'"
    >
      <summary class="group">
        <span>
          <Icon :icon="icon" class="w-5 h-5 text-green-600" />
        </span>
        {{ head }}
      </summary>
      <ul>
        <li v-for="(v, i) in menu" :key="i" class="bg-transparent m-0">
          <details
            v-if="
              v.menu &&
              (menutype == 'access' ||
                (menutype == 'menu' && v.access && v.access != 'none'))
            "
            id="disclosure-components"
            :open="
              menutype == 'access' ? true : checkmenu ? checkmenu[i] : false
            "
          >
            <summary class="group">{{ v.title }}</summary>
            <ul>
              <li
                v-for="(vv, ii) in v.menu"
                :key="ii"
                class="bg-transparent m-0"
              >
                <a
                  v-if="
                    menutype == 'access' ||
                    (menutype == 'menu' && vv.access && vv.access != 'none')
                  "
                  href="#"
                  class="flex gap-4 group hover:no-underline"
                  :class="
                    menutype == 'menu' && $route.name == vv.name ? 'active' : ''
                  "
                  @click="this.menutype == 'access' ? '' : changepage(vv.name)"
                >
                  <span class="flex-1 text-1xl">
                    {{ vv.title }}
                    <select
                      class="select select-bordered select-xs w-32 float-end max-w-xs"
                      v-model="menuArray[vv.name]"
                      v-if="menutype == 'access'"
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
              menutype == 'access' ||
              (menutype == 'menu' && v.access && v.access != 'none')
            "
            href="#"
            class="flex gap-4 group hover:no-underline"
            :class="
              menutype != 'access' && $route.name == v.name ? 'active' : ''
            "
            @click="this.menutype == 'access' ? '' : changepage(v.name)"
          >
            <span class="flex-1 text-1xl">
              {{ v.title }}

              <select
                class="select select-bordered select-xs w-32 float-end max-w-xs"
                v-model="menuArray[v.name]"
                v-if="menutype == 'access'"
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
  data() {
    return {
      menuArray: {},
      menu: null,
      havemenu: false,
      lastindex: 0,
    };
  },
  props: ["menutype", "access", "head", "icon"],
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
      return this.$store.getters[this.head];
    },
    language() {
      return this.$store.getters.language;
    },
  },
  created() {
    this.menu = this.menus;
  },
  mounted() {
    this.$nextTick(() => {
      // console.log("AAAAAAAAAAAAAAAAAAA")
      this.menuArray = { ...this.access };
      this.menutype == "access" ? this.settingFormat() : this.menuAccess();
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
      function lv2(vm, vv, value, key) {
        vv.menu.forEach((v, i) => {
          // console.error(v.name,key,v.access)
          if (v.name == key  && value && value != 'none') {
            
          // console.log(value)
            v.access = value;
            vv.access = value;
            // console.error(v.name,key,v.access,v.access != "none",v.name == key,v.name == key && v.access != "none" && v.access)
            // console.log("HAVE ME NU")
            // vm.havemenu == false ? (vm.havemenu = value && value != 'none' ? true : false) : "";
            vm.havemenu == false ? vm.havemenu = true : "";
            return;
          }
        });
      }
      // console.error(this.menuArray)
      for (let key in this.menuArray) {
        let value = this.menuArray[key];
        this.menu.forEach((v, i) => {
          // console.log(value)
          if (v.menu) {
            lv2(this, v, value, key);
          } else {
            // console.log(v.access)
            // console.log(v.name,v.access != "none",v.access,v.access != "false")
            if (v.name == key && value && value != 'none') {
              // console.log(v.name ,key)
              // console.log(value)
              v.access = value;
              this.havemenu == false ? this.havemenu = true : "";
            }
          }
        });
      }
    },
    loopmenu(menu) {
      let obj = menu.find((v, i) => v.name == this.$route.name);
      return obj ? obj : null;
    },
    changepage(page) {
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
