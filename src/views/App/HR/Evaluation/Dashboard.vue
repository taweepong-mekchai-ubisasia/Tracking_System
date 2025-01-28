<template>
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-4">Dashboard การประเมิน</h2>
      <div v-if="evaluations.length === 0">
        <p>ยังไม่มีการประเมิน</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(evaluation, index) in evaluations"
          :key="index"
          class="card bg-base-100 shadow-md p-4"
        >
          <h3 class="text-xl font-semibold">{{ evaluation.employeeName }}</h3>
          <p>คะแนน: {{ evaluation.rating }}</p>
          <p>ความคิดเห็น: {{ evaluation.comments }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        evaluations: [],
      };
    },
    created() {
      // ดึงข้อมูลการประเมินจาก Backend
      this.fetchEvaluations();
    },
    methods: {
      fetchEvaluations() {
        // ดึงข้อมูลการประเมินจาก Backend
        this.evaluations = [
          { employeeName: 'พนักงาน A', rating: 4, comments: 'ทำงานดี' },
          { employeeName: 'พนักงาน B', rating: 3, comments: 'ต้องปรับปรุง' },
        ];
      },
    },
  };
  </script>
  
  <style scoped>
  /* สไตล์เพิ่มเติม */
  </style>
  