<template>
  <div
    class="card-body overflow-auto max-h-[inherit]"
    :class="`${tab != 'editpassword' ? 'hidden' : ''}`"
  >
    <div class="form-control" :class="errorMsg ? '' : 'hidden'">
      <div class="alert alert-error shadow-lg">
        <div>
          <span>{{ errorMsg }}</span>
        </div>
      </div>
    </div>
    <div class="text-xl font-bold">Change Password</div>
    <div class="text-md">
      Your new password must be different from previously used passwords.
    </div>

    <div class="flex flex-col w-full border-opacity-50 mb-4">
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Current password</span>
        </label>
        <div class="relative">
          <input
            placeholder="Current password*"
            :type="showcurrentpassword ? 'password' : 'text'"
            class="input input-bordered border-base-content text-md w-full"
            v-model="temp.current_password"
          />
          <div
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            <Icon
              icon="heroicons-outline:eye-off"
              @click="showcurrentpassword = !showcurrentpassword"
              :class="{
                hidden: !showcurrentpassword,
                block: showcurrentpassword,
              }"
            />

            <Icon
              icon="heroicons-outline:eye"
              @click="showcurrentpassword = !showcurrentpassword"
              :class="{
                block: !showcurrentpassword,
                hidden: showcurrentpassword,
              }"
            />
          </div>
        </div>
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">New password</span>
        </label>
        <div class="relative">
          <input
            placeholder="Password*"
            :type="showpassword ? 'password' : 'text'"
            class="input input-bordered border-base-content text-md w-full"
            :class="
              temp.password &&
              (temp.password.length < 4 ||
                (temp.confirm_password &&
                  temp.password != temp.confirm_password))
                ? 'input-error'
                : ''
            "
            v-model="temp.password"
          />
          <div
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            <Icon
              icon="heroicons-outline:eye-off"
              @click="showpassword = !showpassword"
              :class="{ hidden: !showpassword, block: showpassword }"
            />

            <Icon
              icon="heroicons-outline:eye"
              @click="showpassword = !showpassword"
              :class="{ block: !showpassword, hidden: showpassword }"
            />
          </div>
        </div>
        <label
          class="label"
          :class="
            temp.password &&
            (temp.password.length < 4 ||
              (temp.confirm_password && temp.password != temp.confirm_password))
              ? ''
              : 'hidden'
          "
        >
          <span class="label-text-alt text-error">{{
            temp.password.length < 4
              ? "Password require min 4 characters."
              : temp.password != temp.confirm_password
              ? "Password not match."
              : ""
          }}</span>
        </label>
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Confirm new password</span>
        </label>
        <div class="relative">
          <input
            placeholder="Confirm Password*"
            :type="showconfirmpassword ? 'password' : 'text'"
            class="input input-bordered border-base-content text-md w-full"
            :class="
              temp.password &&
              temp.confirm_password &&
              (temp.password.length < 4 ||
                temp.password != temp.confirm_password)
                ? 'input-error'
                : ''
            "
            v-model="temp.confirm_password"
          />
          <div
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            <Icon
              icon="heroicons-outline:eye-off"
              @click="showconfirmpassword = !showconfirmpassword"
              :class="{
                hidden: !showconfirmpassword,
                block: showconfirmpassword,
              }"
            />

            <Icon
              icon="heroicons-outline:eye"
              @click="showconfirmpassword = !showconfirmpassword"
              :class="{
                block: !showconfirmpassword,
                hidden: showconfirmpassword,
              }"
            />
          </div>
        </div>
        <label
          class="label"
          :class="
            temp.password &&
            temp.confirm_password &&
            (temp.password.length < 4 ||
              (temp.confirm_password && temp.password != temp.confirm_password))
              ? ''
              : 'hidden'
          "
        >
          <span class="label-text-alt text-error">{{
            temp.password.length < 4
              ? "Password require min 4 characters."
              : temp.password != temp.confirm_password
              ? "Password not match."
              : ""
          }}</span>
        </label>
      </div>
    </div>

    <div class="form-control">
      <button
        class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-black text-white border-black w-full"
        @click="
          !temp.current_password ||
          !temp.password ||
          temp.password.length < 4 ||
          temp.confirm_password.length < 4 ||
          !temp.confirm_password ||
          temp.password != temp.confirm_password
            ? ''
            : update()
        "
        :disabled="
          !temp.current_password ||
          !temp.password ||
          temp.password.length < 4 ||
          temp.confirm_password.length < 4 ||
          !temp.confirm_password ||
          temp.password != temp.confirm_password
        "
      >
        Save
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "EditPassword",
  data() {
    return {
      showcurrentpassword: true,
      showpassword: true,
      showconfirmpassword: true,
      temp: {
        current_password: "",
        password: "",
        confirm_password: "",
      },
      comfirm: false,
      errorMsg: "",
    };
  },
  props: ["tab"],
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    jwt() {
      return this.$store.getters.jwt;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    update() {
      alert("ระบบยังไม่เปิดใช้งาน กรุณาติดต่อเจ้าหน้าที่แผนก IT")
      return
      if (this.temp.password != this.temp.confirm_password) {
        this.errorMsg = "password not match.";
        return;
      }

      fetch(`${this.serviceUrl}api/controllers/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.jwt}`,
        },

        body: JSON.stringify({
          current_password: this.temp.current_password,
          password: this.temp.password,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            if (localStorage.getItem("jwt")) {
              localStorage.setItem("jwt", res.jwt);
            }
            this.comfirm = false;
            this.$store.commit("user", res.row);
            this.$store.commit("jwt", localStorage.getItem("jwt"));
            this.$emit("changetab", "profile");
            return;
          }
          this.errorMsg = res.errorMsg;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  watch: {
    tab: function (val) {
      if (val == "editpassword") {
        this.errorMsg = "";
        this.temp = {
          password: "",
          confirm_password: "",
        };
      }
    },
  },
};
</script>
