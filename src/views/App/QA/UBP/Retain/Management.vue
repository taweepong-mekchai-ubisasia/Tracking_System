<template>
  <AppLayout ref="AppLayoutComponent">
    <template #modal>
      <AppModulePagesQARetainModalRack
        :wh="'ubp'"
        v-model="base"
        @update:success="fnBase.success"
        ref="baseModal"
      />
      <AppModulePagesQARetainModalRackAction
        :wh="'ubp'"
        v-model="base.data"
        @update:success="fnBase.success"
        ref="detailModal"
      />
      <AppModulePagesQARetainModalClearRack
        :wh="'ubp'"
        v-model="base.data"
        @update:success="fnBase.success"
        ref="expireModal"
      />
    </template>
    <template #view>
      <div role="tablist" class="tabs tabs-lifted">
        <input
          type="radio"
          role="tab"
          class="tab"
          name="WH"
          aria-label="Report"
          @change="fnSetup.setCheckbox('reportDashboard')"
          :checked="wh.tab == 'reportDashboard' ? true : false"
        />
        <div
          role="tabpanel"
          class="tab-content bg-base-100 border-base-300"
          v-if="wh.tab == 'reportDashboard'"
        >
          <AppModuleQARetainReport 
            :wh="'ubp'"
          />
        </div>
        <input
          type="radio"
          role="tab"
          class="tab"
          name="WH"
          aria-label="WHLocation"
          :checked="wh.tab == 'factory' ? true : false"
          @change="fnSetup.setCheckbox('factory')"
        />
        <div
          role="tabpanel"
          class="tab-content bg-base-100 border-base-300"
          v-if="wh.tab == 'factory'"
        >
        <AppModuleQARetainLayout
          :wh="'ubp'"
          @clickRack="$refs.baseModal.fnBase.edit"
          @addItem="$refs.detailModal.fnBase.create"
          @clearItem="$refs.expireModal.fnBase.edit"
          :parentX="0"
          :parentY="0"
          :scale="0.6"
          :refresh="layout.ubp"
          @stopRefresh="
            (obj) => {
              layout.ubp = obj.value;
            }
            "
          ref="baseLayout"
        />
        </div>
        <input
          type="radio"
          role="tab"
          class="tab"
          name="WH"
          aria-label="OnHand"
          @change="fnSetup.setCheckbox('stockOnHand')"
          :checked="wh.tab == 'stockOnHand' ? true : false"
        />
        <div
          role="tabpanel"
          class="tab-content"
          v-if="wh.tab == 'stockOnHand'"
        >
          <AppModuleWHStockOnHand 
            :wh="'ubp'"
          />
        </div>
        <input
          type="radio"
          role="tab"
          class="tab"
          name="WH"
          aria-label="Transaction"
          @change="fnSetup.setCheckbox('Transaction')"
          :checked="wh.tab == 'Transaction' ? true : false"
        />
        <div
          role="tabpanel"
          class="tab-content bg-base-100 border-base-300"
          v-if="wh.tab == 'Transaction'"
        >
          <AppModuleWHTransaction 
            :wh="'ubp'"
          />
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import { useContentHeight } from "@/composables/useContentHeight";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref } from "vue";
import moment from 'moment'

import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModuleQARetainReport from "@/components/App/Module/Pages/QA/Retain/ReportDashboard.vue";
import AppModuleQARetainLayout from "@/components/App/Module/Pages/QA/Retain/ShelfLayout.vue";
import AppModuleWHStockOnHand from "@/components/App/Module/Pages/QA/Retain/StockOnHand.vue";
import AppModuleWHTransaction from "@/components/App/Module/Pages/QA/Retain/Transaction.vue";

import AppModulePagesQARetainModalRack from "@/components/App/Module/Pages/QA/Retain/Modal/Rack.vue";
import AppModulePagesQARetainModalRackAction from "@/components/App/Module/Pages/QA/Retain/Modal/RackAction.vue";
import AppModulePagesQARetainModalClearRack from "@/components/App/Module/Pages/QA/Retain/Modal/ClearRack.vue";

export default {
  name: "Management",
  components: {
    AppLayout,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModuleQARetainReport,
    AppModuleQARetainLayout,
    AppModuleWHStockOnHand,
    AppModuleWHTransaction,
    AppModulePagesQARetainModalRack,
    AppModulePagesQARetainModalRackAction,
    AppModulePagesQARetainModalClearRack
  },
  created: function () {
    this.moment = moment;
  },
  setup() {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);
    const serviceUrl = computed(() => store.getters.serviceUrl);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone);

    const wh = ref({ tab: "reportDashboard" })

    const base = ref({
      pagination: {
        page: 1,
        row: 20,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            title: "",
          },
          temp: {
            title: ''
          },
          remain: 99999
        },
      },
    });

    const detail = ref({
      pagination: {
        page: 1,
        row: 20,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            title: "",
          },
          temp: {
            title: "",
          },
        },
      },
    });

    const rack = ref({
      pagination: {
        page: 1,
        row: null,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            title: "",
          },
          temp: {
            title: "",
          },
        },
      },
    });

    const remove = ref({
      current: 0,
      model: false,
      path: "",
      loading: false,
    });

    const fnBase = {
      success: async () => {
        await baseLayout.value.fnBase.success();
      },
    };

    const fnRemove = {
      item: (code, path) => {
        remove.value.modal = true;
        remove.value.code = code;
        remove.value.path = path;
      },
      success: () => {
        base.value.pagination.page = 1;
        fnBase.search();
      },
    };

    const layout = ref({
      ubp: false,
      uba: false,
    });

    const fnSetup = {
      setCheckbox : (tab) => {
        wh.value.tab = tab
      },
    }

    const baseModal = ref(null)
    const detailModal = ref(null)
    const expireModal = ref(null)
    const baseLayout = ref(null)

    return {
      base,
      detail,
      rack,
      remove,
      fnBase,
      fnRemove,
      baseModal,
      detailModal,
      expireModal,
      baseLayout,
      titleZone,
      contentHeight,
      AppLayoutComponent,
      wh,
      fnSetup,
      user,
      layout,
    };
  },
};
</script>
