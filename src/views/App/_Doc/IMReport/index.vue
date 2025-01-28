<template>
  <AppLayout ref="AppLayoutComponent">
    <template #view>
      <div class="grid grid-cols-1">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-2 lg:p-4">
            <div>
              <div
                v-if="base.pagination.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div :class="`${base.pagination.loading ? 'blur-sm' : ''}`">
                <div ref="titleZone">
                  <div
                    class="gap-2 sm:gap-4 flex-row flex w-full justify-start items-center relative overflow-x-auto py-1"
                  >
                    <!-- <button
                      class="btn btn-xs disabled:bg-primary disabled:text-white"
                      @click="file = 'คู่มือการใช้งาน_Warehouse_Indirect'"
                      :disabled="file == 'คู่มือการใช้งาน_Warehouse_Indirect'"
                    >
                      คู่มือการใช้งาน Warehouse Indirect System
                    </button>
                    |
                    <button
                      class="btn btn-xs bg-orange-200 border-orange-200 disabled:bg-orange-600 disabled:border-orange-600 disabled:text-white"
                      @click="file = 'WH_Indirect_V2'"
                      :disabled="file == 'WH_Indirect_V2'"
                    >
                      <Icon icon="icon-park-twotone:tree-diagram" />
                      Diagram Simple
                    </button>
                    | -->
                    <button
                      class="btn btn-xs btn-neutral"
                      @click="exportExcel('Inventory_Status_Req')"
                    >
                      <Icon icon="file-icons:microsoft-excel" />
                      Inventory Status Requirement
                    </button>
                    <button
                      class="btn btn-xs btn-neutral"
                      @click="exportExcel('Expiry_Date_Inspection_Req_Custom')"
                    >
                      <Icon icon="file-icons:microsoft-excel" />
                      Expiry Date Inspection Requirement
                    </button>
                    <button
                      class="btn btn-xs btn-neutral"
                      @click="exportExcel('Expiry_Date_Inspection_Req')"
                    >
                      <Icon icon="file-icons:microsoft-excel" />
                      Expiry Date Inspection Template
                    </button>
                  </div>
                  <div class="divider my-1"></div>
                </div>
                <div
                  class="overflow-x-auto w-full my-2"
                  :style="{
                    maxHeight: contentHeight,
                    minHeight: contentHeight,
                  }"
                >
                  <!-- <div style="height: 74vh" v-if="file">
                    <iframe
                      v-if="file == 'WH_Indirect_V2'"
                      frameborder="0"
                      style="width: 100%; height: 100%"
                      src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=WH-indirect-V2.drawio#R%3Cmxfile%3E%3Cdiagram%20id%3D%22kgpKYQtTHZ0yAKxKKP6v%22%20name%3D%22Page-1%22%3E7V1bk5s4Fv41fuwpxN2PdncnMzXJTDaZ3UzmZYs2tE0WgwfjtHt%2B%2FQpbEiAJEJiLcLsqVQEBalk69%2FPpaKbdb4%2FvY2e3%2BRi5XjBTFfc40x5mqgp0TYf%2FpS2v5xbLVs4N69h3z025hi%2F%2BPx76ErcefNfbo7ZzUxJFQeLvio2rKAy9VVJoc%2BI4eim%2B9hwFbqFh56w9puHLygnY1q%2B%2Bm2zOrbahZO0%2Fe%2F56g%2F8yUNCTrYNfRg37jeNGL7km7XGm3cdRlJyvtsd7L0gnrzgv70qekoHFXpiIfPBp63%2B7S57X%2F%2Fr5v3989x7%2F%2Bt3%2Fx78zVTS45BX%2FYs%2BFE4BuozjZROsodILHrHUZR4fQ9dJuFXiXvfMhinawEcDG716SvKLVdA5JBJs2yTZAT%2BGI49c%2F0%2B9%2FMvDtN9Td6ebhWLh7RXfsT0azsI8O8QqNXwsPy3fHeL56%2FaDswt%2B%2F%2FqE67%2B8w6Tjx2ksq5kNDi5VOQu4voBl970VbDw4IvhB7gZP4P4pU4iBiW5P3svWAF2hJ%2BMtTNewfTnBAf2n2qMyW9myxwBfa6WI%2Bs%2BeoZYnfsS346S%2BJt4X%2FfXT2iRfDC%2FyMdPSQvY060lDLfI5bAG65Lz6y00c0%2FUA636WXifN0opbVxg%2FcD85rdEhwK75b7uGCJIhM9HSFV1EQOLu9f%2Fr0tOaxtzrEezjTn739%2BcUTXRx3Togp8NkPgvsoiGJ4H0Zh%2BkefozDBRMzhFDyvXpx4x8p1PmKGP3%2BBpBgWYi%2BZSDBx2yYnDlTT%2BskyeiIOjSGOhbv1w%2BoF%2BZyKoOUmiv1%2F4BQ5AZrC%2FYu%2FDZwQyjLHpZqWkYv5Lznxd3oVeM8JunyKkiTa4tVCv71kWXaRHyaneTCW8B%2BcsftUBBhwmPfwHmT38F%2F6epzcR%2BE%2BiR3%2FtHQeJOMXb98h6RTohCdhKvmynn4QweiiBKPaPVGLXipKsARYqIwEAVgCYLkxf8Tv6PiRjT8HmbihRclimb1EPmPoFBGcMDkine9kK84huVHpRBOmk2MpnQBNbUgnqPfP6dyEazjmFv05AdQXoZPA%2BYbKfs%2BQHxl6e4o0GYr8kq4VQxeZuZHO%2FMvGT7wvO%2Bek7l%2Bg0Vk0LZx4hRbb4FsMlcwhvE7YqEPsbbLLNudwN17dzpnbZpn7xl3sqgFLZdZJs8xO2Uusv27Z6%2Bsn1%2FkV%2FPnRWEf2%2B%2BQ%2FmvOg%2FHbHWmYjWvbkmbBlX0XneXNfv%2Ftr%2Ff348MevS%2BtfX77ffX2NIg1TRt7c5%2BtxbSxzv2rYHB2NFekSG95zOGVmkBpCrv8DXq7TS6y2sXOwtBgl%2FYA%2FgwPMf1naWfanVdpOWBj4kULbCcSoWBr0V3O96RCIs7Ik1gOZBnJh0D91qTX%2Bqctir%2Fl5s7KfUdJridUNadoJAi%2BI1rGzTW1aL%2FYhtXgx%2FexT9qBOyT37Rw%2FHShrIS6wlhOWlVtRyQONZJxw9Z%2Fel50Aph8wXRRrJkwZeu6VZtGsriZu8s8wxYblpotSvWl%2BrpBpyGSNWqRQTC1pc0dKMtzJc%2FWLIZBI0D%2FaJmgRVVJk3Cap0sCwBwNII4DACjwoALgyacRfWzdPgMb5uc1TllTrygI0tPcIZH8GPB40Du5hzJZHQeCrHEtEFAZ3J68tENFbOtUkaYbdNl0pIj6JWO557U3DqrbFmns8urHZE3tkGFFbE%2FPuQ5lmXW%2Fj7%2FPDulMhYwDeU3fHsEqLn2J2j0mbE40u7LXH4oMBJikvEE3ERFE3PwSkPvPFd1wsZWmAX9tJsFS%2BobBj9SDVuVhVaJpM2PDlZZu7vFM0ym6MZmVXDLg075YMqlJ%2FG2oYkGpS3Q7XLzE%2BFsXn1N5Z%2F1ouOpG0ChqUti2OoaGpfPK0yRPPvfSoqq1bjlnxu6IxUsuslyWcusXQSt%2BPDakolTKPkM4%2F9qRBxD3iWSbuzlbzbfVq6ioLaeLN0f916s9zJMRhaHSItXck2E0hLc8dfGglm41EZ31IsnY81EWFBbAXyiPXBbnzLT3jrpt0p44r1NwDj6nOW3KRwzKt4o96nEHUqVEMup6Lcq8BpVhK5JtlVLs%2FLkJousWrHSe5WylpxXaEVdAXg6XhlSG1hXCf%2F2oL8a6hy8S8HU9Yu89SGf0ujAXVBCTH%2BvTA53A0DAluv5cBBzTWcrb4uBsR6sZYB9dFi25XjLuD7XTlJGScdESUTP2QsStYFALHTo2ROjqbS9JKEkFmc96jxYRkZZmxH3ZCDX7pDD1%2FEZzoHK1RpI0nCaDobb%2FFPecxSYK1NM%2BA8h%2BshLW%2FHJwLWvFaRDesUmVdpk2Ffp94pGg3pUTluDuDgCTPG74dkd0hyTPMkgDzvQ%2B%2BJgt9R037nhDMeZuLJWf1vfaKgu9U5GJoiJ%2FzQT%2Fw0hcdBT%2BwTJznsZynz4Edu7DwnhTfx6M5%2FtziWtyBqzKKowYCMvKRROZLG6M0G4CTppk7bHELceaHrh2suKV47zWkaFfPTRic61sm9BvWmi6o3uYBARukm8c5ifvy9G51roM48zIv0lBSupqbL5WsCTpi%2Fp3hA9jmb6infi5THpDBa4JZUVk0uGqQpnqgODSLS3wBJZZX1v%2Frf21DNN23RIKPnF0bZ29CMC%2BpVu6BmN%2BVS7JwY7KjxvdmF%2B0wuW0POPpNK5pdkFdVyD%2B3C7Q4fnTCtg4fr90xsuwMFjtZ529TNQYN2UtXe6G%2B%2FA57o%2BkC5VHykcWKqdECcuDkM1LjgHfDr6zUHHdMGMFPNotHe%2Baxghkm%2FzNmK8xY2TOgWKxP4GPjehILGAuJu9foG8nEIx3e%2FZ0LpjV44uQbWQaVFALtpgiAhsSQj6OmqTRNUoVBW3Ny2UWQc3f0%2BiiqqarOPgu5vAM9ZY63V8TZSNA5ySLaTQiuNzN62UgzEu%2BJ7Kdozr1h%2FQzDvpPIymDvqHRZRCJ0mFxZUK8XQNYPwiGRnbT1raVtAb8E6SyptWWTV9oiFYk83F6s1LiFLAwDGT8Zq5ZXbiKFpMVRGFWfk%2BbUsiL9xPrHUZugus9Z8CTWtmFobPcKusVW1px%2FWFZfuc1HpLld0Ho97BKR%2Fc5pXJSN5vTSY18v2wCmsydjOij7x8PdlUkgXDYpjtpdECuml8aZbqUmpHVNxPMYlUSWR%2FobY5M9GlUbCYxB%2BmS4eY%2BLFJiv5p95aFN3lo8sF0tQlKTd54eyLYjAw9csy%2BzwkTScYjM%2Fe34c0VTZx9IWNe6gLY%2FQHMNXH8YKPfpIzP%2BHdt9yTTKilN1imDQ%2FZMEX5jmxzk4TxTFbxO7tdDEl8pjIhxcz2tDK3Lh3p9%2FSMUJXFB9%2FKUTbieepcA0A2luTT5QbPZOytxKDJZshu8IqBfBZTvFBdBbyCSy%2F9YfQ4GS46FKQV%2Bbt42CGVvCBxI3pnQd5tZh%2F1KHiuzzc2G0fGhAEXVXTWBnBB9zeAa2yOc6BiNXdNFXBh3mpXjs27XMCFzgNItGdesf4GYF5M3NMAXJiiO2Et0f0ytlylVKwS62C6WSVz6jWKOPM0%2FWilOCOJRittudx2q0SP1gGBUMt9hY6UDwTUnMcAjSCxOCCgQQsO2TxFdFEZEHkqg7SpF4JjRtMvF9JCA5g0dXLcqUEhavNRrKKeoQXCSsAWrSVsyQVfnbNK4LeIu5AfnCcvoBzQwF%2BH8HoFJ%2FHEHSn9%2BisnWKAHW991z%2Buc%2Biw5F6gYXnsQXxBMZQynqErR0Zoht7WUg5SfUFfCE426%2BpSOPeO8O6AWP4men%2FdewqxMF54Ie5buG7KzxFmsc%2FQOtfLkdOeiDKYD6OeBoo96oAa2Mug3by8z75bFohvz7h1h3tdCN20XtH%2FWtdnFIjky2sXcRNsnaOqM514CirAN1rbgbdo3%2BzItMENfU%2F27YWo7Ehq72uqOl5vOo5d3tEvPYGuTwroV2WpIQI2j3yav9DAXhXlJ6kqkvwGi3zabvB8J1WmLp7JLUJ1jn31gy4wPNEVR9KboTk1LrmOv5qPMft%2Fek%2BiqYRuqPkrdeV3v06eLOHZecy8gL6LUuTLmReZFztU7wdcxgrvsfVOvfB9enAfcrcdmjkOBLvwtJ6hp9ONkOsKWd35AoyPxdY4%2BS9GRXVNn96mRZmRS57NfSr0ACZ9eycvmJHS6AUAviBsxLQA0DYZU5ywYEoBBEdA4Y1RaL4B3elrmlpbVBWp7ZBu3rhn83UX8buPNX9eIrKU1hq2w5uTAJ70D5Va5bLzD3gkrT%2Bi4d6CoDMUwokCrlxuthdUbiChkXHkZGFZvSBh1EQWR%2FgaIKABFovJjGT9MFQ4LlFsBstH5F1g6QwU6DpR0dpq7SH9DMDAuj3BVUA%2FCR%2FXnRivCx32qSLpIEgIjI78e8Gwm%2FqaKngVK5%2BlNeTKebXB9qyDa81OWE8tNtqBNDXOoLMlJEiF7q8Iei%2FB6YS9Z7TIy8pxc%2BWW%2FP3AQJ1LK5dGLsICxq2X1kjFqQPrCNVmBZEVZwcVVWUWiHNepgfBRNtKcswx0dqqHZEMwOhsKH3revbvRKvulgqIRg4%2F46TX7BXR2Y6DUUHZQWqasDR7WUlREJvKCYMFVljXrhZM1uTbdAk5xLbnB5oTWOuEuxaJKguNzsy7EI%2BCDF6leB2DF8oriQqkdnQ4ozBcMMXQNZG9hzAC7qIlUwFozg0LZgT7yHp6iOw2GF4Giu3hIWEwWEaixWziYsFijI7i7P1S7qyO05YwPaHhtK1yTYQMEoE04vXWglY69sxB%2BcsogczZhVier6rjBWy5v9sYO0QaAtQPGOkWbcNNkU%2FFglPKmTVlBIMEpXopUspi3ziKMrsHDFF85UZg%2FYXxZVo4AMjtHL6Okx8SwyzTc1OJIN7sb6QZv4yidskyzwB%2B6%2BRi5qSP%2F%2BH8%3D%3C%2Fdiagram%3E%3C%2Fmxfile%3E"
                    ></iframe>
                    <PDFViewer
                      v-else
                      :source="`${serviceUrl}/api/controllers/MYSQL/INTERNAL/Global/doc?file=${file}.pdf&path=IMReport`"
                      :loading-text="'กำลังโหลด'"
                      :rendering-text="'กำลังโหลด'"
                      style="height: 100%; width: 100%"
                      @download="download"
                    />
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import { useContentHeight } from "@/composables/useContentHeightDynamic";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref } from "vue";
import PDFViewer from "pdf-viewer-vue";

import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModulePagesSystemBranchModalBranch from "@/components/App/Module/Pages/System/Branch/Modal/Branch";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";

export default {
  name: "Doc",
  components: {
    AppLayout,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModulePagesSystemBranchModalBranch,
    AppModuleGlobalRemove,
    PDFViewer,
  },
  setup() {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);
    const serviceUrl = computed(() => store.getters.serviceUrl);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    const { contentHeight } = useContentHeight(
      AppLayoutComponent,
      titleZone,
      0
    );

    const file = ref("");

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
        },
      },
    });

    // const download = (source, filename) => {
    //   const link = document.createElement("a");
    //   link.href = `${serviceUrl.value}/upload/_Doc/IMReport/${file.value}.pdf`;
    //   link.target = "_blank";
    //   link.download = `${file.value}.pdf`;

    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // };

    const exportExcel = (file) => {
      return window.open(
        `${serviceUrl.value}upload/_Doc/IMReport/${file}.xlsx`
      );
    };

    return {
      base,
      titleZone,
      contentHeight,
      AppLayoutComponent,
      user,
      serviceUrl,
      PDFViewer,
      // download,
      exportExcel,
      file,
    };
  },
};
</script>
