<template>
  <li>
    <details
      id="disclosure-components"
      :open="($route.meta.parent == 'Doc' && prefix == 'Doc') || !prefix"
    >
      <summary class="group">
        <span>
          <Icon
            :icon="icon"
            class="w-5 h-5"
            :class="`${color[0]}`"
          />
        </span>
        {{ prefix ? prefix : menutype }}
        
      </summary>
      <ul v-if="menuArray">
        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
          @object_access="objectAccess"
          :access="menuArray['DocumentAlert']"
          :head="'DocumentAlert'"
          :icon="'grommet-icons:document-time'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
          @object_access="objectAccess"
          :access="menuArray['WHM']"
          :head="'WHM'"
          :icon="'ph:calculator'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
          @object_access="objectAccess"
          :access="menuArray['AC']"
          :head="'AC'"
          :icon="'ph:calculator'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
          @object_access="objectAccess"
          :access="menuArray['HR']"
          :head="'HR'"
          :icon="'grommet-icons:group'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
          @object_access="objectAccess"
          :access="menuArray['LM']"
          :head="'LM'"
          :icon="'la:shipping-fast'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
          @object_access="objectAccess"
          :access="menuArray['WMS']"
          :head="'WMS'"
          :icon="'game-icons:cargo-ship'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
          @object_access="objectAccess"
          :access="menuArray['PD']"
          :head="'PD'"
          :icon="'fluent-mdl2:product-variant'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
          @object_access="objectAccess"
          :access="menuArray['QA']"
          :head="'QA'"
          :icon="'octicon:shield-check-16'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
          @object_access="objectAccess"
          :access="menuArray['QC']"
          :head="'QC'"
          :icon="'mdi:progress-check'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
          @object_access="objectAccess"
          :access="menuArray['RD']"
          :head="'RD'"
          :icon="'material-symbols:lab-research-outline'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
          @object_access="objectAccess"
          :access="menuArray['PUR']"
          :head="'PUR'"
          :icon="'bx:purchase-tag-alt'"
        />

        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
          @object_access="objectAccess"
          :access="menuArray['SuperData']"
          :head="'SuperData'"
          :icon="'icon-park-outline:data'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
          @object_access="objectAccess"
          :access="menuArray['TRR']"
          :head="'TRR'"
          :icon="'ci:building-04'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
          @object_access="objectAccess"
          :access="menuArray['WH']"
          :head="'WH'"
          :icon="'bx:store-alt'"
        />

        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
          @object_access="objectAccess"
          :access="menuArray['Event']"
          :head="'Event'"
          :icon="'fluent-emoji-high-contrast:star-struck'"
        />
        <AppModuleMenuTemplate
          :menutype="menutype"
          :prefix="prefix"
          :color="color[1]"
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
  props: ["menutype", "access", "prefix", "color","icon"],
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  data() {
    return {
      menuArray: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.menuArray = { ...this.access };
    });
  },
  methods: {
    objectAccess(obj) {
      // console.log(this.user)
      this.menuArray[obj.key] = obj.array;
      this.$emit("object_access", this.menuArray);
    },
  },
};
</script>
