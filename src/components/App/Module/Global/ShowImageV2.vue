<template>
  <teleport to="#app">
    <div id="ShowImage">
      <input type="checkbox" v-model="modalOpen" class="modal-toggle" />
      <div class="modal" role="dialog" v-if="modalImage">
        <div class="modal-box p-0">
          <img :src="modalImage" alt="Image" class="w-full" />
          <div class="modal-action absolute top-0 right-0 z-10 m-2">
            <label
              @click="modalOpen = false"
              class="btn btn-sm btn-circle bg-white"
            >
              <Icon icon="vaadin:close" />
            </label>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { useStore } from "vuex";
import {
  ref,
  reactive,
  computed,
  onMounted,
  defineComponent,
  watch,
  nextTick,
} from "vue";

export default defineComponent({
  components: {},
  props: {},
  emits: [],
  setup(props, { emit }) {
    const store = useStore();

    const user = computed(() => store.getters.user);
    const serviceUrl = computed(() => store.getters.serviceUrl);

    const modalOpen = ref(false);
    const modalImage = ref("");

    const imagerow = ref(null);

    function openModal(node) {
      imagerow.value = node;
      modalImage.value = imageUrl(node);
      modalOpen.value = true;
    }

    function imageUrl(node) {
      if (node.image && node.image.length > 0) {
        return `${node.imageLink}/employee/${node.code}/${node.image[0].file}`;
      }
      return `${serviceUrl.value}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyImageWhite.jpg&s=50`;
    }

    return {
      modalOpen,
      modalImage,
      openModal,
      imageUrl,
    };
  },
});
</script>
