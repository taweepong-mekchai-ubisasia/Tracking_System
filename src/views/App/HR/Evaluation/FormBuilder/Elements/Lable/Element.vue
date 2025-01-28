<template>
     <input
        type="text"
        :value="value"
        class="input input-xs sm:input-sm md:input-md input-bordered w-full bg-transparent border-dashed"
      />
  </template>
  
  <script>
  import { vDraggable } from "vue-draggable-plus";
  export default {
    directives: {
      draggable: vDraggable,
    },
    props: {
      value: {
        type: String,
        required: true,
      },
    },
    emits: ["remove", "addOption", "changeType", "changeType"],
    data() {
      return {
        newOption: "",
        type: "",
      };
    },
    methods: {
      addOption() {
        this.$emit("addOption", { newOption: this.newOption, type: this.type });
        this.newOption = "";
        this.type = "";
      },
    },
  };
  </script>
  
  <style scoped>
  /* .div{
      height:100px;
      width:100%;
      border:1px solid ;
  } */
  
  .textInBlockRight {
    width: 100%;
    margin-top: -10px;
    margin-left: 0px;
    background: transparent;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  }
  </style>
  