<template>
  <div
  class="card-body overflow-auto" style="max-height: inherit;" 
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
        <!-- <input
          type="password"
          placeholder="Current password"
          class="input input-bordered"
          v-model="temp.current_password"
        /> -->
        <div class="relative">
          <input
            placeholder="Current password*"
            :type="showcurrentpassword ? 'password' : 'text'"
            class="input input-bordered text-md w-full"
            v-model="temp.current_password"
          />
          <div
            class="
              absolute
              inset-y-0
              right-0
              pr-3
              flex
              items-center
              text-sm
              leading-5
            "
          >
            <font-awesome-icon
              icon="fa-solid fa-eye"
              @click="showcurrentpassword = !showcurrentpassword"
              :class="{ hidden: !showcurrentpassword, block: showcurrentpassword }"
            />
            <font-awesome-icon
              icon="fa-sharp fa-solid fa-eye-slash"
              @click="showcurrentpassword = !showcurrentpassword"
              :class="{ block: !showcurrentpassword, hidden: showcurrentpassword }"
            />
          </div>
        </div>
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">New password</span>
        </label>
        <!-- <input
          type="password"
          placeholder="New password"
          class="input input-bordered"
          :class="
            temp.password &&
            temp.confirm_password &&
            temp.password != temp.confirm_password
              ? 'input-error'
              : ''
          "
          v-model="temp.password"
        /> -->
        <div class="relative">
          <input
            placeholder="Password*"
            :type="showpassword ? 'password' : 'text'"
            class="input input-bordered text-md w-full"
           :class="
              temp.password &&
              (temp.password.length < 8 ||
                (temp.confirm_password &&
                  temp.password != temp.confirm_password))
                ? 'input-error'
                : ''
            "
          v-model="temp.password"
   
          />
          <div
            class="
              absolute
              inset-y-0
              right-0
              pr-3
              flex
              items-center
              text-sm
              leading-5
            "
          >
            <font-awesome-icon
              icon="fa-solid fa-eye"
              @click="showpassword = !showpassword"
              :class="{ hidden: !showpassword, block: showpassword }"
            />
            <font-awesome-icon
              icon="fa-sharp fa-solid fa-eye-slash"
              @click="showpassword = !showpassword"
              :class="{ block: !showpassword, hidden: showpassword }"
            />
          </div>

        </div>
        <label
          class="label"
          :class="
            temp.password &&
            (temp.password.length < 8 ||
              (temp.confirm_password && temp.password != temp.confirm_password))
              ? ''
              : 'hidden'
          "
        >
          <span class="label-text-alt text-error">{{
            temp.password.length < 8
              ? "Password require min 8 characters."
              : temp.password != temp.confirm_password
              ? "Password not match."
              : ""
          }}</span>
          <!-- <span class="label-text-alt">Alt label</span> -->
        </label>
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Confirm new password</span>
        </label>
        <!-- <input
          type="password"
          placeholder="Confirm new Password"
          class="input input-bordered"
          :class="
            temp.password &&
            temp.confirm_password &&
            temp.password != temp.confirm_password
              ? 'input-error'
              : ''
          "
          v-model="temp.confirm_password"
        /> -->
        <div class="relative">
          <input
            placeholder="Confirm Password*"
            :type="showconfirmpassword ? 'password' : 'text'"
            class="input input-bordered text-md w-full"
            :class="
              temp.password &&
              temp.confirm_password &&
              (temp.password.length < 8 ||
                temp.password != temp.confirm_password)
                ? 'input-error'
                : ''
            "
            v-model="temp.confirm_password"
          />
          <div
            class="
              absolute
              inset-y-0
              right-0
              pr-3
              flex
              items-center
              text-sm
              leading-5
            "
          >
            <font-awesome-icon
              icon="fa-solid fa-eye"
              @click="showconfirmpassword = !showconfirmpassword"
              :class="{
                hidden: !showconfirmpassword,
                block: showconfirmpassword,
              }"
            />
            <font-awesome-icon
              icon="fa-sharp fa-solid fa-eye-slash"
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
            (temp.password.length < 8 ||
              (temp.confirm_password && temp.password != temp.confirm_password))
              ? ''
              : 'hidden'
          "
        >
          <span class="label-text-alt text-error">{{
            temp.password.length < 8
              ? "Password require min 8 characters."
              : temp.password != temp.confirm_password
              ? "Password not match."
              : ""
          }}</span>
        </label>
      </div>
    </div>

    <div class="form-control">
      <button
        class="
          btn btn-xs
          sm:btn-sm
          md:btn-md
          lg:btn-lg
          bg-black
          text-white
          border-black
          w-full
        "
        @click="
          !temp.current_password ||
          !temp.password ||
          temp.password.length < 8 ||
          temp.confirm_password.length < 8 ||
          !temp.confirm_password ||
          temp.password != temp.confirm_password
            ? ''
            : update()
        "
        :disabled="
          !temp.current_password ||
          !temp.password ||
          temp.password.length < 8 ||
          temp.confirm_password.length < 8 ||
          !temp.confirm_password ||
          temp.password != temp.confirm_password
        "
      >
        Save
      </button>
      <!-- <label
        for="modal-confirm"
        class="
          btn btn-xs
          sm:btn-sm
          md:btn-md
          lg:btn-lg
          bg-black
          text-white
          border-black
          w-full
        "
      >
        Save
      </label> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "EditPassword",
  data() {
    return {
      showcurrentpassword:true,
      showpassword:true,
      showconfirmpassword:true,
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
    isLogin() {
      return this.$store.getters.isLogin;
    },
    scrollTop() {
      return this.$store.getters.scrollTop;
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
      // console.log(this.temp);
      if (this.temp.password != this.temp.confirm_password) {
        // alert("PASSWORD NOT MATCH");
        this.errorMsg = "password not match.";
        return;
      }

      fetch(`${this.ServiceUrl}controllers/user`, {
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
          // console.log(res);
          if (res.success) {
            // alert("SUCCESS");

            // jwt
            // this.comfirm = false;
            // localStorage.setItem("u-jwt", res.jwt);
            // this.$store.commit("jwt", localStorage.getItem("u-jwt"));
            // this.$store.commit("user", res.row);
            // this.$emit("changetab", "profile");
            // return;

            if (localStorage.getItem("jwt")) {
              localStorage.setItem("jwt", res.jwt);
            }
            // this.$store.commit("jwt", localStorage.getItem("jwt"));
            // jwt
            this.comfirm = false;
            this.$store.commit("user", res.row);
            this.$store.commit("jwt", localStorage.getItem("jwt"));
            // this.$store.commit("user", res.row);
            this.$emit("changetab", "profile");
            return;
          }
          // alert(res.errorMsg);
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
        // this.temp = { ...this.user };
        this.errorMsg = "";
        this.temp = {
          password: "",
          confirm_password: "",
        };
      }

      // console.log(val)
    },
  },
};
</script>