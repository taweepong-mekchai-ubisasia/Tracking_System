<template>
  <li>
    <details id="disclosure-components" open="">
      <summary class="group">
        <span>
          <Icon
            icon="icon-park-outline:list-one"
            class="w-5 h-5 text-green-600"
          />
        </span>
        Menu
      </summary>
      <ul v-if="menuArray">
        <AppModuleMenuTemplate
          :menutype="menutype"
          @object_access="objectAccess"
          :access="menuArray['SuperData']"
          :head="'SuperData'"
          :icon="'icon-park-outline:data'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          @object_access="objectAccess"
          :access="menuArray['HR']"
          :head="'HR'"
          :icon="'grommet-icons:group'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          @object_access="objectAccess"
          :access="menuArray['WH']"
          :head="'WH'"
          :icon="'bx:store-alt'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          @object_access="objectAccess"
          :access="menuArray['QC']"
          :head="'QC'"
          :icon="'mdi:progress-check'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          @object_access="objectAccess"
          :access="menuArray['PUR']"
          :head="'PUR'"
          :icon="'bx:purchase-tag-alt'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          @object_access="objectAccess"
          :access="menuArray['PD']"
          :head="'PD'"
          :icon="'fluent-mdl2:product-variant'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          @object_access="objectAccess"
          :access="menuArray['AC']"
          :head="'AC'"
          :icon="'ph:calculator'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          @object_access="objectAccess"
          :access="menuArray['RD']"
          :head="'RD'"
          :icon="'material-symbols:lab-research-outline'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          @object_access="objectAccess"
          :access="menuArray['System']"
          :head="'System'"
          :icon="'ph:gear'"
        />
      </ul>
    </details>
  </li>
</template>

<script>
import AppModuleMenuTemplate from "@/components/App/Module/Menu/Template.vue";
export default {
  components: {
    AppModuleMenuTemplate,
  },
  props: ["menutype", "access"],
  data() {
    return {
      menuArray: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.menuArray = this.access
        ? { ...this.access }
        : {
            SuperData: {},
            HR: {},
            WH: {},
            QC: {},
            PUR: {},
            PD: {},
            AC: {},
            RD: {},
            System: {},
          };
    });
  },
  methods: {
    objectAccess(obj) {
      this.menuArray[obj.key] = obj.array;
      this.$emit("object_access", this.menuArray);
    },
  },
};
</script>
