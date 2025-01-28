<template>
    <div class="max-w-xl mx-auto p-4">
      <h2 class="text-2xl font-semibold mb-4">{{ formTitle }}</h2>
      <form @submit.prevent="submitEvaluation">
        <div v-for="(question, index) in questions" :key="index" class="mb-4">
          <label class="block text-lg mb-1">{{ question.text }}</label>
          <input
            v-if="question.type === 'text'"
            type="text"
            class="input input-bordered w-full"
            v-model="answers[index]"
          />
          <input
            v-else-if="question.type === 'number'"
            type="number"
            class="input input-bordered w-full"
            v-model="answers[index]"
          />
          <select
            v-else-if="question.type === 'rating'"
            class="select select-bordered w-full"
            v-model="answers[index]"
          >
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary w-full">บันทึกการประเมิน</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      formTitle: {
        type: String,
        default: 'แบบประเมิน',
      },
      questions: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      return this.$store.getters.user_token;
    },
    Evaluation(){
        return this.$store.getters.Evaluation;
    }
  },
    data() {
      return {
        answers: [],
      };
    },
    methods: {
      submitEvaluation() {
        // ส่งคำตอบไปยัง Backend เพื่อบันทึกการประเมิน
        console.log('Evaluation submitted:', this.answers);
      },
    },
    watch:{
        Evaluation:function(v){
            console.log(v)
            this.questions = v
        }
    }
  };
  </script>
  
  <style scoped>
  /* สไตล์เพิ่มเติม */
  </style>
  