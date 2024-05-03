<template>
  <AppLayout>
    <template #modal> </template>
    <template #view>
      <div class="grid grid-cols-1 gap-6">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-2 lg:p-4 text-left">
            <div
              class="relative right-0 top-0 grid justify-items-stretch items-center justify-end content-center"
              v-if="user"
            >
              <div v-if="user.access">
                <div v-if="user.access.System && user.access.System.SystemNews">
                  <button
                    class="btn btn-warning btn-xs text-white"
                    v-if="!edit"
                    @click="edit = true"
                  >
                    <Icon icon="tabler:edit" />
                  </button>
                  <button
                    class="btn btn-error btn-xs text-white"
                    v-else
                    @click="edit = false"
                  >
                    <Icon icon="mingcute:close-fill" />
                  </button>
                </div>
              </div>
            </div>
            <div
              class="ql-editor"
              ref="content"
              :class="`${!edit ? '' : 'hidden'}`"
            ></div>
            <div
              class="overflow-x-auto w-full max-h-[65vh] min-h-[65vh] my-4"
              :class="`${!edit ? 'hidden' : ''}`"
            >
              <QuillEditor
                ref="quill"
                theme="snow"
                toolbar="full"
                :class="`max-h-[55vh] min-h-[55vh]`"
              />
              <div class="absolute right-0 p-4 px-6">[ CTRL + S ] to SAVE</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  name: "Timestamp",
  components: {
    AppLayout,
    QuillEditor,
  },
  data() {
    return {
      isCtrl: false,
      edit: false,
      content: "",
      save: false,
    };
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      return this.$store.getters.user_token;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    keyup(e) {
      e.preventDefault();
      if (e.key == "Control") this.isCtrl = false;
    },
    keydown(e) {
      if (e.key == "Control") this.isCtrl = true;
      if (
        (e.key == "S" || e.key == "s" || e.key == "ห" || e.key == "ฆ") &&
        this.isCtrl == true
      ) {
        e.preventDefault();
        this.saveTemplate();
        return false;
      }
    },
    getTemplate() {
      fetch(
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/GLOBAL/template`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            this.content = res.html;
            this.$refs.content.innerHTML = this.content;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    saveTemplate() {
      fetch(
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/GLOBAL/template`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
          body: JSON.stringify({ html: this.$refs.quill.getHTML() }),
        }
      )
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            // alert("success");
            this.edit = false;
            this.getTemplate();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  unmounted() {
    document.removeEventListener("keyup", this.keyup);
    document.removeEventListener("keydown", this.keydown);
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener("keyup", this.keyup);
      document.addEventListener("keydown", this.keydown);
      this.getTemplate();
    });
  },
  watch: {
    edit: function (v) {
      if (v) {
        this.$refs.quill.setHTML(this.content);
      }
    },
  },
};
</script>
