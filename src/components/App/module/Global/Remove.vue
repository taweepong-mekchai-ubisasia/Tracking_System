<template>
  <div id="Remove">
    <input
      type="checkbox"
      id="modal-remove"
      class="modal-toggle"
      v-model="modal"
    />
    <div class="modal">
      <div class="modal-box relative">
        <label
          for="modal-remove"
          class="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <h3 class="text-lg font-bold">Remove Item!{{ modal }}</h3>
        <div class="card-body overflow-auto max-h-[60vh]" >
          Are your sure for remove this item?
        </div>

        <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
          <div class="flex-1 form-control mt-6">
            <label for="modal-remove" class="btn btn-danger">Cancel</label>
          </div>
          <div class="flex-1 form-control mt-6">
            <button class="btn btn-primary" @click="confirm_remove()">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Remove",
  props: {
    controll: {
      default: "",
    },
    code: {
      default: "",
    },
    parent: {
      default: 0,
    }
  },
  data() {
    return {
      modal: false,
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
  },
  methods: {
    confirm_remove() {
      if (this.controll == "detail" && this.parent == 0) {
        this.modal = false;
        this.$emit("confirm_remove", {});
        return;
      }

      fetch(`${this.serviceUrl}api/controllers/${this.controll}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: this.code,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            // console.log(res);
            this.modal = false;
            this.$emit("response", {});
            // this[`${this.remove.controll}_search`]();
          }
          // callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          // callback([]);
          console.error("Error:", error);
        });
    },
  },
};
</script>
