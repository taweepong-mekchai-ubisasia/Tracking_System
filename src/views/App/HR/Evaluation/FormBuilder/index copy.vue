<template>
  <div class="container mx-auto p-4 md:p-6 lg:p-8">
    <h1 class="text-2xl font-bold mb-4">Dynamic Form Builder</h1>
    <div class="flex flex-col md:flex-row gap-4 mb-4">
      <button @click="handleAdd" class="btn btn-primary">Add New Element</button>
      <select v-model="selectedTemplate" class="select select-bordered w-full md:w-48" @change="handleTemplateChange">
        <option value="default">Default</option>
        <option value="contact">Contact Form</option>
        <option value="survey">Survey Form</option>
      </select>
    </div>

    <div class="flex justify-between mt-4">
      <div class="flex flex-col gap-2 w-full md:w-300px rounded">
        <TransitionGroup
         ref="draggableContainer"
            type="transition"
      tag="ul"
          name="fade"
          class="sort-target "
        >
          <li
            v-for="(element, index) in formElements"
            :key="element.id"
            class="h-50px rounded flex items-center justify-between px-2 border-2 border-dotted border-base-100"
          >
            <Icon icon="pepicons-pop:grab-handle" class="w-8 h-8 handle cursor-move" />
            <FormInput :element="element" @remove="remove(index)" @addOption="addOption(index, $event)" @changeType="changeType(index, $event)" />
            <Icon icon="material-symbols:close" @click="remove(index)" class="w-8 h-8 cursor-pointer" />
          </li>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useDraggable } from 'vue-draggable-plus'
import FormInput from './FormInput.vue'
import { Icon } from '@iconify/vue'

import '@noction/vue-draggable-grid/styles'
import VueDraggableGrid from '@noction/vue-draggable-grid'
export default {
  components: { VueDraggableGrid,FormInput, Icon },
  setup() {
    const formElements = ref([
      { id: 1, type: 'text', label: 'Full Name' },
      { id: 2, type: 'number', label: 'Age' },
      { id: 3, type: 'date', label: 'Birth Date' },
      { id: 4, type: 'select', label: 'Gender', options: ['Male', 'Female', 'Other'] },
      { id: 5, type: 'checkbox', label: 'Hobbies', options: ['Reading', 'Writing', 'Coding'] },
    ])

    const selectedTemplate = ref('default')

    const templates = {
      default: [
        { id: 1, type: 'text', label: 'Full Name' },
        { id: 2, type: 'number', label: 'Age' },
        { id: 3, type: 'date', label: 'Birth Date' },
        { id: 4, type: 'select', label: 'Gender', options: ['Male', 'Female', 'Other'] },
        { id: 5, type: 'checkbox', label: 'Hobbies', options: ['Reading', 'Writing', 'Coding'] },
      ],
      contact: [
        { id: 1, type: 'text', label: 'Name' },
        { id: 2, type: 'email', label: 'Email' },
        { id: 3, type: 'text', label: 'Message' },
      ],
      survey: [
        { id: 1, type: 'text', label: 'Name' },
        { id: 2, type: 'select', label: 'How did you hear about us?', options: ['Social Media', 'Friend', 'Search Engine'] },
        { id: 3, type: 'checkbox', label: 'What do you like about our product?', options: ['Quality', 'Price', 'Design'] },
      ],
    }

    const draggableContainer = ref()

    // onMounted(() => {
      
      useDraggable(draggableContainer, formElements)
    // })

    const handleAdd = () => {
      const newId = formElements.value.length + 1
      formElements.value.push({ id: newId, type: 'text', label: `New Element ${newId}` })
    }

    const handleTemplateChange = () => {
      formElements.value = templates[selectedTemplate.value]
    }

    const remove = (index) => {
      formElements.value.splice(index, 1)
    }

    const addOption = (index, option) => {
      if (formElements.value[index].type === 'select' || formElements.value[index].type === 'checkbox') {
        formElements.value[index].options.push(option)
      }
    }

    const changeType = (index, type) => {
      formElements.value[index].type = type
      if (type === 'select' || type === 'checkbox') {
        formElements.value[index].options = []
      } else {
        delete formElements.value[index].options
      }
    }

    return { formElements, handleAdd, handleTemplateChange, remove, addOption, changeType, selectedTemplate, draggableContainer }
  },
}
</script>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
.sort-target {
  padding: 0 1rem;
}
</style>