<template>
  <div class="Search">
    <!-- {{ current }} -->
    <Multiselect
      v-model="example6.value"
      v-bind="example6"
    ></Multiselect>
  </div>
</template>
<script>

import Multiselect from "@vueform/multiselect";


const fetchLanguages = async (query) => {
  // From: https://www.back4app.com/database/paul-datasets/list-of-all-programming-languages/get-started/javascript/rest-api/fetch?objectClassSlug=dataset

  let where = ''

  if (query) {
    where = '&where=' + encodeURIComponent(JSON.stringify({
      "ProgrammingLanguage": {
        "$regex": `${query}|${query.toUpperCase()}|${query[0].toUpperCase() + query.slice(1)}`
      }
    }))
  }

  const response = await fetch(
    'http://localhost/freelance/ubis/api/controllers/department' + where,
    {
      headers: {
        'X-Parse-Application-Id': 'XpRShKqJcxlqE5EQKs4bmSkozac44osKifZvLXCL', // This is the fake app's application id
        'X-Parse-Master-Key': 'Mr2UIBiCImScFbbCLndBv8qPRUKwBAq27plwXVuv', // This is the fake app's readonly master key
      }
    }
  );

  const data = await response.json(); // Here you have the data that you need

  return data.results.map((item) => {
    return { value: item.ProgrammingLanguage, label: item.ProgrammingLanguage }
  })
}
export default {
  name: "Search",
  components: {
    Multiselect,
  },
  props: [
    "placeholder",
    "label",
    "maxChar",
    "delay",
    "customClass",
    "limit",
    "url",
  ],
  data() {
    return {
      current: "",
      example6: {
      value: null,
      placeholder: 'Choose a programming language',
      filterResults: false,
      minChars: 1,
      resolveOnLoad: false,
      delay: 0,
      searchable: true,
      options: async (query) => {
        return await fetchLanguages(query)
      }
    },
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
  },
  methods: {
    create(a,b,c){console.log(a,b,c)},
    getData(q) {
      return this.select(q, (res) =>
        res.map((item) => ({
          value: item,
          label: item[this.label ? this.label : "title"],
        }))
      );
    },
    async select(q, callback) {
      return fetch(
        `${this.url?this.url:'http://localhost/freelance/ubis/api/controllers/department'}?page=1${this.limit ? `&rows=${this.limit}` : ""}${
          q ? `&q=${q}` : ""
        }${
          this.current[this.label ? this.label : "title"]
            ? `&code=${this.current[this.label ? this.label : "code"]}`
            : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("_jwt")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => callback(res.success ? res.rows : []))
        .catch((error) => {
          console.error("Error:", error);
          return callback([]);
        });
    },
  },
  mounted() {},
  watch: {
    current: function (val) {
      console.log(val)
      this.$emit("updateValue", { value: val });
    },
  },
};
</script>
<style >
@import url("@vueform/multiselect/themes/default.css");
.multiselect-option.is-selected {
  background: var(--ms-option-bg-selected, #a7a7a7) !important;
  color: var(--ms-option-color-selected, #fff);
}
.multiselect.is-active {
  box-shadow: unset;
  border-radius: var(--rounded-btn, 0.5rem);
}
</style>