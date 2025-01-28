<template>
  <div class="p-4 bg-base-100">
    <h1 class="text-2xl font-bold mb-4">Form Builder</h1>
    <div class="text-left">
      <pre>{{ nestedList }}</pre>
    </div>
    <div class="relative pt-12">
      <button
        class="btn btn-link"
        @click="addItem()"
        style="position: absolute; right: 0; top: 0"
      >
        <Icon icon="tabler:plus" />
      </button>
      <!-- ส่งข้อมูล nestedList ไปที่ NestedItem.vue ผ่าน v-model -->
      <NestedItem v-model="nestedList" @updateList="handleUpdateList" />
      <!-- Debugging Output -->
    </div>
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
      // {
      //   id: 1,
      //   type: 'label',
      //   labels:['Disciplinary & Time Attendance (A) (10 คะแนน)'],
      //   children: [
      //     { id: 4, name: 'Child 1-1',type: 'text', labels:['111','222'],children:[] },
      //     { id: 5, name: 'Child 1-2',type: 'number', labels:['',''],children:[] },
      //     { id: 5, name: 'Child 1-2',type: 'date', labels:['',''],children:[] },
      //     { id: 5, name: 'Child 1-2',type: 'select', labels:['',''],options: ['Male', 'Female', 'Other'],children:[] },
      //     { id: 5, name: 'Child 1-2',type: 'checkbox', labels:['',''],options: ['Reading', 'Writing', 'Coding'],children:[] },

      //   ],
      // },
      // {
      //   id: 2,
      //   name: 'Parent 2',
      //   children: [],
      // },
    ]);

    const addItem = () => {
      const item = nestedList.value
      console.log(item)
      if (!item) {
        item = []
      }
      const newChild = { name: `Child ${item.length + 1}`, children: [] }
      item.push(newChild)
      // Update list with modified item
      console.log(list)
      const updatedList = [...list.value]
      console.log(item)
      updatedList = item
      list.value = updatedList
    }

    const removeItem = (index) => {
      const updatedList = list.value.filter((_, i) => i !== index)
      list.value = updatedList
    }

    // ฟังก์ชันเพื่ออัพเดตข้อมูลเมื่อมีการเปลี่ยนแปลงจาก NestingFunction.vue
    const handleUpdateList = (updatedList) => {
      nestedList.value = updatedList;
    };

    return {
      nestedList,
      handleUpdateList,
      nestedList,
      addItem, 
      removeItem
    };
  },
};
</script>

<style scoped>
/* เพิ่มสไตล์เพิ่มเติมตามความต้องการ */
</style>
