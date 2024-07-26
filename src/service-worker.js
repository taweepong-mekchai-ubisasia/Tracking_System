/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
    let registry = {};
  
    // Used for `eval` and `importScripts` where we can't get script URL by other means.
    // In both cases, it's safe to use a global var because those functions are synchronous.
    let nextDefineUri;
  
    const singleRequire = (uri, parentUri) => {
      uri = new URL(uri + ".js", parentUri).href;
      return registry[uri] || (
        
          new Promise(resolve => {
            if ("document" in self) {
              const script = document.createElement("script");
              script.src = uri;
              script.onload = resolve;
              document.head.appendChild(script);
            } else {
              nextDefineUri = uri;
              importScripts(uri);
              resolve();
            }
          })
        
        .then(() => {
          let promise = registry[uri];
          if (!promise) {
            throw new Error(`Module ${uri} didn’t register its module`);
          }
          return promise;
        })
      );
    };
  
    self.define = (depsNames, factory) => {
      const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
      if (registry[uri]) {
        // Module is already loading or loaded.
        return;
      }
      let exports = {};
      const require = depUri => singleRequire(depUri, uri);
      const specialDeps = {
        module: { uri },
        exports,
        require
      };
      registry[uri] = Promise.all(depsNames.map(
        depName => specialDeps[depName] || require(depName)
      )).then(deps => {
        factory(...deps);
        return exports;
      });
    };
  }
  
  
  const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
  
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
  
    return outputArray;
  }
  const broadcast = new BroadcastChannel('count-channel');
  const saveSubscription = async (subscription) => {
    // Set up channel with same name as in app.js
    
    broadcast.onmessage = (event) => {
    if (event.data && event.data.type === 'INCREASE_COUNT') {
        broadcast.postMessage({ payload: ++count });
    }
    };
    
    // const response = await fetch('http://localhost:3000/save-subscription', {
    const response = await fetch('https://good-enormous-albertosaurus.glitch.me/save-subscription', {
        method: 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(subscription)
    })
  
    return response.json()
  }
  
  self.addEventListener("activate", async (e) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BDZKJky-3pJOnE7czwQGiFiHJrH6mOkr1uQ80rk1zyQ5cw1HwzWB20bgi8oI0EeDLJ7YeRVHLklxyYx4bwEnJ38")
    })
  
    const response = await saveSubscription(subscription)
    console.log(response)
  })
  
  self.addEventListener("push", e => {
    self.registration.showNotification("UBIS WEB APPLICATION", { body: e.data.text() })
  })
  
  
  define(['./workbox-7fa1dbe4'], (function (workbox) { 'use strict';
  
    /**
    * Welcome to your Workbox-powered service worker!
    *
    * You'll need to register this file in your web app.
    * See https://goo.gl/nhQhGp
    *
    * The rest of the code is auto-generated. Please don't update this file
    * directly; instead, make changes to your Workbox build configuration
    * and re-run your build process.
    * See https://goo.gl/2aRDsh
    */
  
    workbox.setCacheNameDetails({
      prefix: "UBIS"
    });
    self.addEventListener('message', event => {
      if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
      }
    });
    /**
     * The precacheAndRoute() method efficiently caches and responds to
     * requests for URLs in the manifest.
     * See https://goo.gl/S9QRab
     */
  
    workbox.precacheAndRoute([{
      "url": "/404.html",
      "revision": "a4e2271d19eb1f6f93a15e1b7a4e74dd"
    }, {
      "url": "/Dockerfile",
      "revision": "48ba1cef625db71e62d885bc8f1b91d8"
    }, {
      "url": "/appstore.png",
      "revision": "f0d0380b95145ba94af9b7b16b034a26"
    }, {
      "url": "/css/app-src_A.aab3cb40.css",
      "revision": null
    }, {
      "url": "/css/vendors-node_modules_draggable-resizable-vue3_src_components_draggable-resizable-vue3_Draggab-75e9c6.909f3940.css",
      "revision": null
    }, {
      "url": "/css/vendors-node_modules_v-calendar_dist_style_css-node_modules_vue-leaflet_vue-leaflet_dist_vue--393be8.c672e7d0.css",
      "revision": null
    }, {
      "url": "/css/vendors-node_modules_vueup_vue-quill_dist_vue-quill_snow_css-node_modules_vue_shared_dist_sha-2ce19b.c9db68fd.css",
      "revision": null
    }, {
      "url": "/docker-compose.yml",
      "revision": "ada7a3cd48c4739ea577fa1aac11d7b9"
    }, {
      "url": "/favicon.ico",
      "revision": "af97dc4cadb41dda3a34e39cbe917b9f"
    }, {
      "url": "/favicon2.ico",
      "revision": "1ba2ae710d927f13d483fd5d1e548c9b"
    }, {
      "url": "/fonts/sukhumvit-set/SukhumvitSet-Bold.ttf",
      "revision": "cf83ce0aa5e75930d38e0bff88d9426c"
    }, {
      "url": "/fonts/sukhumvit-set/SukhumvitSet-Light.ttf",
      "revision": "1c2625bbb3f5af12c941c712183f9708"
    }, {
      "url": "/fonts/sukhumvit-set/SukhumvitSet-Medium.ttf",
      "revision": "e54f4b9d0df88a9af7636bee55ac9bc1"
    }, {
      "url": "/fonts/sukhumvit-set/SukhumvitSet-SemiBold.ttf",
      "revision": "d55ff127a3c864c5d185b86c3d28f0e9"
    }, {
      "url": "/fonts/sukhumvit-set/SukhumvitSet-Text.ttf",
      "revision": "69fc4f0f2a8869feeec71379c2cf824c"
    }, {
      "url": "/fonts/sukhumvit-set/SukhumvitSet-Thin.ttf",
      "revision": "e80083d09b84fbd00e556151e4118c62"
    }, {
      "url": "/img/desktop.png",
      "revision": "96ae8d1f6c19a96c71a5f4ea7d994877"
    }, {
      "url": "/img/icons copy/android-chrome-192x192.png",
      "revision": "f130a0b70e386170cf6f011c0ca8c4f4"
    }, {
      "url": "/img/icons copy/android-chrome-512x512.png",
      "revision": "0ff1bc4d14e5c9abcacba7c600d97814"
    }, {
      "url": "/img/icons copy/android-chrome-maskable-192x192.png",
      "revision": "845a39478d0e2d4d5d32a092de2de250"
    }, {
      "url": "/img/icons copy/android-chrome-maskable-512x512.png",
      "revision": "2695f5feb66cdb0c6f09d0e415824cf9"
    }, {
      "url": "/img/icons copy/apple-touch-icon-120x120.png",
      "revision": "936d6e411cabd71f0e627011c3f18fe2"
    }, {
      "url": "/img/icons copy/apple-touch-icon-152x152.png",
      "revision": "1a034e64d80905128113e5272a5ab95e"
    }, {
      "url": "/img/icons copy/apple-touch-icon-180x180.png",
      "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
    }, {
      "url": "/img/icons copy/apple-touch-icon-60x60.png",
      "revision": "9a2b5c0f19de617685b7b5b42464e7db"
    }, {
      "url": "/img/icons copy/apple-touch-icon-76x76.png",
      "revision": "af28d69d59284dd202aa55e57227b11b"
    }, {
      "url": "/img/icons copy/apple-touch-icon.png",
      "revision": "66830ea6be8e7e94fb55df9f7b778f2e"
    }, {
      "url": "/img/icons copy/favicon-16x16.png",
      "revision": "4bb1a55479d61843b89a2fdafa7849b3"
    }, {
      "url": "/img/icons copy/favicon-32x32.png",
      "revision": "98b614336d9a12cb3f7bedb001da6fca"
    }, {
      "url": "/img/icons copy/msapplication-icon-144x144.png",
      "revision": "b89032a4a5a1879f30ba05a13947f26f"
    }, {
      "url": "/img/icons copy/mstile-150x150.png",
      "revision": "058a3335d15a3eb84e7ae3707ba09620"
    }, {
      "url": "/img/icons copy/safari-pinned-tab.svg",
      "revision": "6de16254d1b4193353e7015f9177535d"
    }, {
      "url": "/img/icons/Screenshot 2024-03-21 155840.png",
      "revision": "6e5516e484f19d01ff001876699ddb39"
    }, {
      "url": "/img/icons/Screenshot 2024-03-22 134702.png",
      "revision": "a0ad435fe538d567781761b139ae4267"
    }, {
      "url": "/img/icons/android-chrome-144x144.png",
      "revision": "f212fed9ec8ca975bc49372c111768e3"
    }, {
      "url": "/img/icons/android-chrome-192x192.png",
      "revision": "eab988bc5842401e1ced690bcca2db91"
    }, {
      "url": "/img/icons/android-chrome-512x512.png",
      "revision": "68fcb387a3c72b0a11fb73e4d30c0149"
    }, {
      "url": "/img/icons/android-chrome-maskable-192x192.png",
      "revision": "845a39478d0e2d4d5d32a092de2de250"
    }, {
      "url": "/img/icons/android-chrome-maskable-512x512.png",
      "revision": "2695f5feb66cdb0c6f09d0e415824cf9"
    }, {
      "url": "/img/icons/apple-touch-icon-120x120.png",
      "revision": "936d6e411cabd71f0e627011c3f18fe2"
    }, {
      "url": "/img/icons/apple-touch-icon-152x152.png",
      "revision": "1a034e64d80905128113e5272a5ab95e"
    }, {
      "url": "/img/icons/apple-touch-icon-180x180.png",
      "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
    }, {
      "url": "/img/icons/apple-touch-icon-60x60.png",
      "revision": "9a2b5c0f19de617685b7b5b42464e7db"
    }, {
      "url": "/img/icons/apple-touch-icon-76x76.png",
      "revision": "af28d69d59284dd202aa55e57227b11b"
    }, {
      "url": "/img/icons/apple-touch-icon.png",
      "revision": "d57fb1f97cbf067d8216b9b75e367811"
    }, {
      "url": "/img/icons/favicon-16x16.png",
      "revision": "81aa14eb160444ec5a222fc834eda0e3"
    }, {
      "url": "/img/icons/favicon-32x32.png",
      "revision": "b9900491817ac1539963cca7986e6f20"
    }, {
      "url": "/img/icons/favicon.ico",
      "revision": "af97dc4cadb41dda3a34e39cbe917b9f"
    }, {
      "url": "/img/icons/icon-128x128.png",
      "revision": "a28c8f08b12e8ac9166efae75f274672"
    }, {
      "url": "/img/icons/icon-144x144.png",
      "revision": "cc067be51b7e5915bc1644942837c97d"
    }, {
      "url": "/img/icons/icon-152x152.png",
      "revision": "2b821f3baed6d097104def869cbaae95"
    }, {
      "url": "/img/icons/icon-192x192.png",
      "revision": "eab988bc5842401e1ced690bcca2db91"
    }, {
      "url": "/img/icons/icon-196x196.png",
      "revision": "3aaa12a194102f571e95c88748590b09"
    }, {
      "url": "/img/icons/icon-384x384.png",
      "revision": "2db7d7ab0e2ae5c593b1917f34c3e23c"
    }, {
      "url": "/img/icons/icon-512x512.png",
      "revision": "68fcb387a3c72b0a11fb73e4d30c0149"
    }, {
      "url": "/img/icons/icon-60x60.png",
      "revision": "9a2b5c0f19de617685b7b5b42464e7db"
    }, {
      "url": "/img/icons/icon-72x72 - Copy.png",
      "revision": "b9900491817ac1539963cca7986e6f20"
    }, {
      "url": "/img/icons/icon-72x72.png",
      "revision": "cf412701d03e0f32941e70f34e9f7573"
    }, {
      "url": "/img/icons/icon-96x96.png",
      "revision": "f51f23b5151f31387555e8f796d7411c"
    }, {
      "url": "/img/icons/msapplication-icon-144x144.png",
      "revision": "b89032a4a5a1879f30ba05a13947f26f"
    }, {
      "url": "/img/icons/mstile-150x150.png",
      "revision": "058a3335d15a3eb84e7ae3707ba09620"
    }, {
      "url": "/img/icons/safari-pinned-tab.svg",
      "revision": "4e857233cbd3bb2d2db4f78bed62a52f"
    }, {
      "url": "/img/mobile-.png",
      "revision": "a0ad435fe538d567781761b139ae4267"
    }, {
      "url": "/img/mobile-resize.png",
      "revision": "577889497ea0ad1d57f06f7384e17967"
    }, {
      "url": "/index.html",
      "revision": "5bd94cbc4fcdd0d1e8e8d8160e8c2b03"
    }, {
      "url": "/js/app-n.cb202c61.js",
      "revision": null
    }, {
      "url": "/js/app-src_components_App_Module_Pages_Q.6ed62295.js",
      "revision": null
    }, {
      "url": "/js/app-src_components_App_Module_Pages_T.738abcfa.js",
      "revision": null
    }, {
      "url": "/js/app-src_components_App_Module_Profile_E.2469bbc6.js",
      "revision": null
    }, {
      "url": "/js/app-src_components_App_layout_vue-2.1e7bfaf7.js",
      "revision": null
    }, {
      "url": "/js/app-src_components_Layout_C.359bd0a4.js",
      "revision": null
    }, {
      "url": "/js/app-src_m.198c1856.js",
      "revision": null
    }, {
      "url": "/js/app-src_store_i.b24ac4cb.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_A.a3aef53c.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_AC_BudgetG.bc5ca0cc.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_AC_BudgetGroup_vue-4.66b73ed7.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_AC_CostCalculate_C.f47bb9a8.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_DocumentAlert_Management_vue-1.c5af5b2f.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_Event_Coupon_vue-1.f5f64459.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_HR_Employee_vue-0.69661cb9.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_Index_vue-1.4a7d8e75.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_L.777a80c5.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_LM_M.4eb412ee.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_LM_Vita_P.79363b66.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_PD_a.f586e1c9.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_PUR_PO.e0f6b5c9.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_PUR_a.2facc44e.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_PUR_r.551c575e.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_QA_WHIndirect_A.9b7697dd.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_QC_Inspec_F.d982e05b.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_QC_Pickup_A.a780e56a.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_QC_WHRetain_M.d656d84b.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_RD_QCInspec_vue-2.0d08a8d3.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_Su.6f0e3e78.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_T.e3c756d2.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_WH_I.12bfb1b0.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_WMS_Ubis_Default1.5b3e1f65.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_WMS_Ubis_Default3.8dc540f1.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_WMS_Ubis_R.965fd86b.js",
      "revision": null
    }, {
      "url": "/js/app-src_views_App_WMS_Vita_D.f0d85e82.js",
      "revision": null
    }, {
      "url": "/js/node_modules_leaflet_dist_images_marker-icon-2x_png.f8aaff9f.js",
      "revision": null
    }, {
      "url": "/js/node_modules_leaflet_dist_images_marker-icon_png.1de4091b.js",
      "revision": null
    }, {
      "url": "/js/node_modules_leaflet_dist_images_marker-shadow_png.608f1b3b.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_chenfengyuan_vue-barcode_dist_vue-barcode_esm_js-node_modules_core-js_mo-4c702b.d60c5548.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_draggable-resizable-vue3_src_components_draggable-resizable-vue3_utils_d-f6303f.434ca739.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_google-translate-select_vue3_dist_es_index_mjs-node_modules_iconify_vue_-e5b82a.126fcf0e.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_leaflet_dist_leaflet-src_esm_js.5665a15b.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_leaflet_dist_leaflet-src_js.a71613d1.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_leaflet_dist_leaflet_css-node_modules_jsbarcode_bin_JsBarcode_js.18e67098.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_lodash_clonedeep_index_js-node_modules_lodash_isequal_index_js-node_modu-1c02fc.a3b20e93.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_mini-css-extract-plugin_dist_loader_js_clonedRuleSet-12_use_0_node_modul-db7338.6f7b6612.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_moment-timezone_data_packed_latest_json.9a48f187.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_moment-timezone_index_js.2a9aa45c.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_moment_locale_af_js-node_modules_moment_locale_ar-dz_js-node_modules_mom-9ef962.cbe6420d.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_moment_locale_fo_js-node_modules_moment_locale_fr-ca_js-node_modules_mom-046e05.f104ad95.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_moment_locale_gu_js-node_modules_moment_locale_he_js-node_modules_moment-904c4f.16404ac0.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_moment_locale_id_js-node_modules_moment_locale_is_js-node_modules_moment-f91bcc.5eeee733.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_moment_locale_yo_js-node_modules_moment_locale_zh-cn_js-node_modules_mom-733f91.ea23be79.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_moment_moment_js.77375d05.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_pdf-viewer-vue_dist_vue3-pdf-viewer_js.5e67a949.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_popperjs_core_lib_popper_js-node_modules_qrcode-js-package_qrcode_js-nod-c8b338.5451170d.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_quill_dist_quill_js.f2767c5c.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_register-service-worker_index_js-node_modules_signature_pad_dist_signatu-0d3036.2ea7cf60.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_v-calendar_dist_es_index_js.151a9de7.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_v-calendar_dist_style_css-node_modules_vue-leaflet_vue-leaflet_dist_vue--393be8.deef78c2.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_vue-signature-pad_dist_vue-signature-pad_esm_js-node_modules_vue-router_-ba55ea.41970100.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_vue3-apexcharts_dist_vue3-apexcharts_js.3709f57b.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_vue_devtools-api_lib_esm_index_js-node_modules_vue_reactivity_dist_react-930c42.f5932290.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_vue_runtime-core_dist_runtime-core_esm-bundler_js.865ebc18.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_vue_runtime-dom_dist_runtime-dom_esm-bundler_js.034621e0.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_vueup_vue-quill_dist_vue-quill_snow_css-node_modules_vue_shared_dist_sha-2ce19b.37a4f8bb.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_vueuse_core_index_mjs.aca5f8ff.js",
      "revision": null
    }, {
      "url": "/js/vendors-node_modules_vuex_dist_vuex_esm-bundler_js-node_modules_vueuse_shared_index_mjs.a73fd651.js",
      "revision": null
    }, {
      "url": "/manifest.json",
      "revision": "3bc889ad027fc055856d31b255fbb97e"
    }, {
      "url": "/manifest2.json",
      "revision": "8bb29ea8ea8d1ddb2bdde4f2e51c8208"
    }, {
      "url": "/playstore.png",
      "revision": "4ad63df93a132e5d0e8aa973a762b37b"
    }, {
      "url": "/robots.txt",
      "revision": "b6216d61c03e6ce0c9aea6ca7808f7ca"
    }, {
      "url": "/sw.js",
      "revision": "ef16e09be2b5c71f456c1f725e74b437"
    }], {});
  
  }));
  