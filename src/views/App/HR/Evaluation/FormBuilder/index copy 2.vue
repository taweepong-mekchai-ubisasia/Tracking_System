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

    <grid-layout
      v-model:layout="layout"
      :col-num="24"
      :row-height="30"
      @noc-resize="handleResize"
      @noc-move="handleMove"
      @noc-move-end="handleMoveEnd"
    
    >
    <template #default="{ gridItemProps }">
      <grid-item
        v-for="item in layout"
        v-bind="gridItemProps"
        :id="item.id"
        :key="item.id"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        @noc-resize="handleResize"
        @noc-move="handleMove"
        @noc-move-end="handleMoveEnd"
        :class="'flex '"
        style="background-color: transparent;  border:1px dashed gray "
      >
 <FormInput :element="item" @remove="remove(item.i)" @addOption="addOption(item.i, $event)" @changeType="changeType(item.i, $event)" />
      </grid-item>
    </template>
    </grid-layout>
  </div>
</template>

<script>
import { ref } from 'vue'
import FormInput from './FormInput.vue'
import '@noction/vue-draggable-grid/styles'
import { GridLayout,GridItem } from '@noction/vue-draggable-grid'

export default {
  components: { FormInput, GridLayout,GridItem },
  data() {
    return {
      layout: [
        { h: 2, id: 0, w: 3, x: 0, y: 0,type: 'text', label: 'Full Name' ,aswer:'fasfasfsa' },
        { h: 2, id: 1, w: 2, x: 2, y: 0,type: 'text', label: 'Full Name' ,aswer:'fasfasfsa' },
        { h: 2, id: 2, w: 2, x: 4, y: 0,type: 'text', label: 'Full Name' ,aswer:'fasfasfsa' },
        { h: 2, id: 3, w: 2, x: 0, y: 2,type: 'text', label: 'Full Name' ,aswer:'fasfasfsa' },
        { h: 2, id: 4, w: 2, x: 2, y: 2,type: 'text', label: 'Full Name' ,aswer:'fasfasfsa' },
        { h: 2, id: 5, w: 2, x: 4, y: 2,type: 'text', label: 'Full Name' ,aswer:'fasfasfsa' },
      ],
      selectedTemplate: 'default',
      templates: {
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
      },
    }
  },
  methods: {
    handleAdd() {
      const newId = this.layout.length + 1
      this.layout.push({ h: 2, id: newId, w: 2, x: 0, y: 0 })
    },
    handleTemplateChange() {
      this.layout = this.templates[this.selectedTemplate].map((item, index) => ({ h: 2, id: index, w: 2, x: 0, y: 0 }))
    },
    remove(index) {
      this.layout.splice(index, 1)
    },
    addOption(index, option) {
      // Implement logic for adding option
    },
    changeType(index, type) {
      // Implement logic for changing type
    },
    handleResize() {
      // Implement logic for resize event
    },
    handleMove() {
      // Implement logic for move event
    },
    handleMoveEnd() {
      // Implement logic for move end event
    },
  },
}
</script>

<style scoped>
.vue-grid-layout {
  background: #eee;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}
</style>