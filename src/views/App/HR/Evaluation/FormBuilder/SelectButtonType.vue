<template>
    <div class="select-button-group">
      <button 
        class="select-button" 
        :class="{ active: selectedType === 'text' }" 
        @click="$emit('changeType', 'text')">Text
      </button>
      <button 
        class="select-button" 
        :class="{ active: selectedType === 'number' }" 
        @click="$emit('changeType', 'number')">Number
      </button>
      <button 
        class="select-button" 
        :class="{ active: selectedType === 'date' }" 
        @click="$emit('changeType', 'date')">Date
      </button>
      <button 
        class="select-button" 
        :class="{ active: selectedType === 'email' }" 
        @click="$emit('changeType', 'email')">Email
      </button>
      <button 
        class="select-button" 
        :class="{ active: selectedType === 'select' }" 
        @click="$emit('changeType', 'select')">Select
      </button>
      <button 
        class="select-button" 
        :class="{ active: selectedType === 'checkbox' }" 
        @click="$emit('changeType', 'checkbox')">Checkbox
      </button>
      <span class="selected-type">{{ selectedType }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedType: String,
    },
    emits: ['changeType'],
  };
  </script>
  
  <style scoped>
  .select-button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .select-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #f4f4f4;
    cursor: pointer;
  }
  
  .select-button:hover {
    background-color: #e4e4e4;
  }
  
  .select-button.active {
    background-color: #007bff;
    color: white;
  }
  
  .selected-type {
    margin-left: 10px;
    font-weight: bold;
  }
  </style>