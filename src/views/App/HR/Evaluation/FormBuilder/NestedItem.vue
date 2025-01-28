<template>
  <ul
    v-if="modelValue.length > 0"
    v-draggable="[list, { group: 'g1' }]"
    class="p-1"
  >
    <li
      v-for="(v, i) in modelValue"
      :key="v.name"
      class="p-1 relative border border-base-300 border-dashed"
    >
      <!-- <p>{{ v.name }}----{{ i }}</p> -->
      <!-- <button class="btn" @click="addChild(index)">Add Child</button> -->
      <div class="flex flex-row flex-nowrap items-center justify-between">
        <!-- </div>
      <div >  -->
        <FormInput
          :element="v"
          @remove="remove(index)"
          @addOption="addOption(i, $event)"
          @changeType="changeType(i, $event)"
          @changeFontSize="changeFontSize(i, $event)"
          />
          <!-- @changeLabel="changeLabel(i, $event)" -->
        <button
          class="btn btn-sm btn-link text-error p-1"
          @click="removeItem(i)"
        >
          <Icon icon="pajamas:remove" />
        </button>
        <button class="btn btn-sm btn-link p-1" @click="addItem(i)">
          <Icon icon="tabler:plus" />
        </button>
      </div>
      <NestedItem v-if="v.children" v-model="v.children" />
    </li>
  </ul>
  <!-- {{ level }} -->
  <!-- <button class="btn" v-if="level==0" @click="addItem(null)">Add Item</button> -->
</template>

<script>
// import { vDraggable } from 'vue-draggable-plus'
import { computed } from "vue";
import { defineComponent, ref, watch } from "vue";
import { vDraggable } from "vue-draggable-plus";
import FormInput from "./FormInput.vue";
export default defineComponent({
  components: { FormInput },
  directives: {
    draggable: vDraggable,
  },
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const list = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    // console.log(props.level)
    const addItem = (index = null) => {
      // if (index === null) {
      //   console.log(props.modelValue)
      //   // Add new item at the top level
      //   const newItem = { name: `Item ${props.modelValue.length + 1}`, children: [] }
      //   const updatedList = [...list.value, newItem]
      //   list.value = updatedList
      // } else {
      // Add new child item to the specified index
      // console.log(list.value)
      // console.log(index)
      //   const item = list.value
      //   // console.log(item)
      //   // console.log(index)
      //   // if (index < 0 || index >= list.value.length) return

      //   console.log(item)
      //   if (!item) {
      //     item = []
      //   }
      //   const newChild = { name: `Child ${item.length + 1}`, children: [] }
      //   item.push(newChild)
      //   // Update list with modified item
      //   const updatedList = [...list.value]
      //   console.log(item)
      //   updatedList = item
      //   list.value = updatedList
      // // }

      const item = list.value;
      console.log(item[index]);
      console.log(index);
      // if (index < 0 || index >= list.value.length) return
      //  if(index)
      // console.log(item)
      if (!item[index].children) {
        item[index].children = [];
      }
      const newChild = {
        id: item[index].children.length + 1,
        name: `Child ${item[index].children.length + 1}`,
        type: "label",
        label: "Title",
        labels: [],
        children: [],
      };
      item[index].children.push(newChild);
      // Update list with modified item
      const updatedList = [...list.value];
      // updatedList = item;
      list.value = updatedList;
      // }
    };
    const removeItem = (index) => {
      const updatedList = list.value.filter((_, i) => i !== index);
      list.value = updatedList;
    };

    const addOption = (index, option) => {
      console.log(index, option);
      // if (
      //   list.value[index].type === "select" ||
      //   list.value[index].type === "checkbox" ||
      //   list.value[index].type === "radio"
      // ) {
        list.value[index].options
          ? list.value[index].options.push(option)
          : (list.value[index].options = [option]);
      // }
    };

    const changeFontSize = (index, type) => {
      list.value[index].fontSize = list.value[index].fontSize
        ? list.value[index].fontSize
        : 1;
      list.value[index].fontSize =
        type == "up"
          ? list.value[index].fontSize + 0.1
          : list.value[index].fontSize - 0.1;
      // if (type === 'select' || type === 'checkbox') {
      //   list.value[index].options = []
      // } else {
      //   delete list.value[index].options
      // }
    };

    const changeType = (index, type) => {
      list.value[index].type = type;
      if (type === "select" || type === "checkbox") {
        list.value[index].options = [];
      } else if (type === 'label' || type === 'text') {
        list.value[index].labels = [""];
      } else {
        delete list.value[index].options;
      }
    };

    // const changeLabel = (index, text) => {
    //   // console.log(text)
    //   // list.value[index].labels[0] = text;
    // };

    return { list, addItem, removeItem, changeType, addOption, changeFontSize };
  },
});
</script>

<style scoped>
.drag-area {
  /* min-height: 50px; */
  outline: 1px dashed;
}
</style>
