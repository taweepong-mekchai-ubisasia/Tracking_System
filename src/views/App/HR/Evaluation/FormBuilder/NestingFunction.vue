<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Form Builder</h1>
    <!-- ส่งข้อมูล nestedList ไปที่ NestedItem.vue ผ่าน v-model -->
    <NestedItem v-model="nestedList" />

    <!-- Debugging Output -->fasfas
    <pre>{{ nestedList }}</pre>
  </div>
</template>

<script>
import { ref } from 'vue';
import NestedItem from './NestedItem.vue'; // นำเข้า NestedItem.vue

export default {
  name: 'FormBuilder',
  components: {
    NestedItem,
  },
  setup() {
    // กำหนดค่าเริ่มต้นของ list ที่จะส่งไปที่ NestedItem.vue
    const nestedList = ref([
      {
        id: 1,
        name: 'Parent 1',
        children: [
          { id: 4, name: 'Child 1-1' },
          { id: 5, name: 'Child 1-2' },
        ],
      },
      {
        id: 2,
        name: 'Parent 2',
        children: [],
      },
      {
        id: 3,
        name: 'Parent 3',
        children: [
          { id: 6, name: 'Child 3-1' },
        ],
      },
    ]);

    return {
      nestedList,
    };
  },
};
</script>

<style scoped>
/* เพิ่มสไตล์เพิ่มเติมตามความต้องการ */
</style>
