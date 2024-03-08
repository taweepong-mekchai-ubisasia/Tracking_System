<template>
    <div class="card-body overflow-auto" style="max-height: inherit;"  :class="`${tab != 'register' ? 'hidden' : ''}`">
    <div class="text-xl font-bold">CREATE AN ACCOUNT</div>
    <div class="text-md">Please enter your details.</div>
    <div class="flex flex-col w-full border-opacity-50">
      <div class="form-control grid">
        <UploadModule
          v-if="tab == 'register'"
          :imageLink="temp.imageLink"
          :image="temp.image"
          :id="'image'"
          :multiple="false"
          @respone="
            (res) => {
              temp.image = temp.image.concat(res.image);
            }
          "
          @resetdata="
            (res) => {
              temp.image = [...res.image];
            }
          "
        />
      </div>
      <div class="form-control grid">
        <label class="label">
          <span class="label-text">Email Address*</span>
        </label>
        <input
          type="email"
          placeholder="Email Address*"
          class="input input-bordered"
          v-model="temp.email"
          :class="errorMsgemail ? 'input-error' : ''"
        />
        <label class="label" :class="errorMsgemail ? '' : 'hidden'">
          <span class="label-text-alt text-error">{{ errorMsgemail }}</span>
          <!-- <span class="label-text-alt">Alt label</span> -->
        </label>
      </div>
      <div class="form-control grid mt-4">
        <label class="label">
          <span class="label-text">Password*</span>
        </label>
        <!-- <input
          type="password"
          placeholder="Password*"
          class="input input-bordered"
          :class="
            temp.password &&
            (temp.password.length < 8 ||
              (temp.confirm_password && temp.password != temp.confirm_password))
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
            <!-- <i class="fa-solid fa-eye"></i> -->
            <font-awesome-icon
              icon="fa-solid fa-eye"
              @click="showpassword = !showpassword"
              :class="{ hidden: !showpassword, block: showpassword }"
            />
            <!-- <svg class="h-6 text-gray-700" fill="none" @click="show = !show"
                      :class="{'hidden': !show, 'block':show }" xmlns="http://www.w3.org/2000/svg"
                      viewbox="0 0 576 512">
                      <path fill="currentColor"
                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                      </path>
                    </svg> -->
            <!-- <i class="fa-solid fa-eye"></i> -->
            <font-awesome-icon
              icon="fa-sharp fa-solid fa-eye-slash"
              @click="showpassword = !showpassword"
              :class="{ block: !showpassword, hidden: showpassword }"
            />
            <!-- <svg class="h-6 text-gray-700" fill="none" @click="show = !show"
                      :class="{'block': !show, 'hidden':show }" xmlns="http://www.w3.org/2000/svg"
                      viewbox="0 0 640 512">
                      <path fill="currentColor"
                        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                      </path>
                    </svg> -->
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
      <div class="form-control grid mt-4">
        <label class="label">
          <span class="label-text">confirm_password*</span>
        </label>
        <!-- <input
          type="password"
          placeholder="Confirm Password*"
          class="input input-bordered"
          :class="
            temp.password &&
            temp.confirm_password &&
            (temp.password.length < 8 || temp.password != temp.confirm_password)
              ? 'input-error'
              : ''
          "
          v-model="temp.confirm_password"
        /> -->
        <div class="relative">
          <input
            placeholder="Confirm Password*"
            :type="showconfirm_password ? 'password' : 'text'"
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
            <!-- <i class="fa-solid fa-eye"></i> -->
            <font-awesome-icon
              icon="fa-solid fa-eye"
              @click="showconfirm_password = !showconfirm_password"
              :class="{
                hidden: !showconfirm_password,
                block: showconfirm_password,
              }"
            />
            <!-- <svg class="h-6 text-gray-700" fill="none" @click="show = !show"
                      :class="{'hidden': !show, 'block':show }" xmlns="http://www.w3.org/2000/svg"
                      viewbox="0 0 576 512">
                      <path fill="currentColor"
                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                      </path>
                    </svg> -->
            <!-- <i class="fa-solid fa-eye"></i> -->
            <font-awesome-icon
              icon="fa-sharp fa-solid fa-eye-slash"
              @click="showconfirm_password = !showconfirm_password"
              :class="{
                block: !showconfirm_password,
                hidden: showconfirm_password,
              }"
            />
            <!-- <svg class="h-6 text-gray-700" fill="none" @click="show = !show"
                      :class="{'block': !show, 'hidden':show }" xmlns="http://www.w3.org/2000/svg"
                      viewbox="0 0 640 512">
                      <path fill="currentColor"
                        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                      </path>
                    </svg> -->
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
          <!-- <span class="label-text-alt">Alt label</span> -->
        </label>
      </div>
      <div class="form-control grid mt-4">
        <label class="label">
          <span class="label-text">Firstname*</span>
        </label>
        <input
          type="text"
          placeholder="Firstname*"
          class="input input-bordered"
          v-model="temp.firstname"
        />
      </div>
      <div class="form-control grid mt-4">
        <label class="label">
          <span class="label-text">Lastname*</span>
        </label>
        <input
          type="text"
          placeholder="Lastname*"
          class="input input-bordered"
          v-model="temp.lastname"
        />
      </div>
      <div class="form-control grid mt-4">
        <label class="label">
          <span class="label-text">Mobile No*</span>
        </label>
        <input
          type="tel"
          placeholder="Mobile No."
          class="input input-bordered"
          v-model="temp.mobile"
          @input="acceptNumber"
        />
        <label
          class="label"
          :class="temp.mobile && temp.mobile.length < 10 ? '' : 'hidden'"
        >
          <span class="label-text-alt text-error">{{
            temp.mobile.length < 10 ? "Mobile require min 10 characters." : ""
          }}</span>
          <!-- <span class="label-text-alt">Alt label</span> -->
        </label>
      </div>
      <div class="form-control grid mt-4 mb-4">
        <div class="rounded-box">
          <label class="label cursor-pointer">
            <input
              type="checkbox"
              checked="checked"
              class="checkbox"
              v-model="temp.agree"
            />
            <span class="label-text text-xs pl-2 text-left w-full"
              >
              ประกาศความเป็นส่วนตัว <a
                href="#"
                class="label-text-alt link link-hover font-bold"
                @click="$emit('changePrivacyNotice',true)"
              >
                Privacy Notice
              </a>
              
              <!-- by signing in, I agree to the
              <a
                href="#"
                class="label-text-alt link link-hover font-bold"
                @click="showPopup('privacyPolicy')"
              >
                Privacy Policy
              </a>
              |
              <a
                href="#"
                class="label-text-alt link link-hover font-bold"
                @click="showPopup('TermsConditions')"
              >
                terms & Confitions.
              </a> -->
            </span>
          </label>
        </div>
        <!-- <div class="flex w-full"> -->

        <!-- <div class="divider divider-horizontal">OR</div> -->
        <!-- <div class="grid flex-grow rounded-box justify-end">
                      <label class="label">
                        <a
                          href="#"
                          class="label-text-alt link link-hover font-bold"
                          >Forgot password?</a
                        >
                      </label>
                    </div> -->
        <!-- </div> -->
      </div>
    </div>
    <div class="form-control" :class="errorMsg ? '' : 'hidden'">
      <div class="alert alert-error shadow-lg">
        <div>
          <span>{{ errorMsg }}</span>
        </div>
      </div>
    </div>
    <div class="form-control mb-2">
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
          errorMsgemail ||
          !temp.email ||
          !temp.password ||
          temp.password.length < 8 ||
          temp.confirm_password.length < 8 ||
          !temp.mobile ||
          temp.mobile.length < 10 ||
          !temp.confirm_password ||
          !temp.firstname ||
          !temp.lastname ||
          !temp.mobile ||
          !temp.agree ||
          temp.password != temp.confirm_password ||
          loading
            ? ''
            : register()
        "
        :disabled="
          // temp.password && temp.confirm_password && ( temp.password.length < 8 || (temp.password != temp.confirm_password) )
          errorMsgemail ||
          !temp.email ||
          !temp.password ||
          temp.password.length < 8 ||
          temp.confirm_password.length < 8 ||
          !temp.mobile ||
          temp.mobile.length < 10 ||
          !temp.confirm_password ||
          !temp.firstname ||
          !temp.lastname ||
          !temp.mobile ||
          !temp.agree ||
          temp.password != temp.confirm_password ||
          loading
        "
      >
        Submit
      </button>
    </div>

    <div class="form-control absolute bottom-0 w-full p-2 left-0 bg-black ">
      <p class="label-text-alt text-white">
        Already have an account?
        <a
          href="#"
          class="label-text-alt link link-hover font-bold text-white"
          @click="$emit('changetab', 'login')"
          >Login now!
        </a>
      </p>
    </div>
  </div>
</template>
<script>
import UploadModule from "@/components/App/Module/Upload.vue";
export default {
  name: "Register",
  components: {
    UploadModule,
  },
  props: ["tab"],
  data() {
    return {
      loading: false,
      showpassword: true,
      showconfirm_password: true,
      errorMsg: "",
      errorMsgemail: "",
      temp: {
        email: "",
        password: "",
        confirm_password: "",
        firstname: "",
        lastname: "",
        mobile: "",
        imageLink: "",
        image: [],
        agree: false,
      },
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
  },
  methods: {
    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.errorMsgemail = "";
      } else {
        this.errorMsgemail = "Invalid Email Address";
      }
    },
    acceptNumber() {
      var x = this.temp.mobile
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.temp.mobile = !x[2] ? x[1] : x[1] + x[2] + x[3];
    },
    showPopup(name) {
      let route = this.$router.resolve({ name: name });
      window.open(`${route.href}`, `_popup`, "width=600,height=600");
      return false;
    },
    register() {
      this.loading = true;
      if (this.temp.password != this.temp.confirm_password) {
        return;
      }
      if (!this.temp.agree) {
        return;
      }
      let vm = this;

      let image = { ...this.temp.image[0] };
      delete image.temp;

      fetch(`${this.ServiceUrl}controllers/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.temp.email,
          username: this.temp.username,
          password: this.temp.password,
          confirm_password: this.temp.confirm_password,
          firstname: this.temp.firstname,
          lastname: this.temp.lastname,
          mobile: this.temp.mobile,
          image: [image],
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          this.loading = false;
          console.log(res);
          if (res.success) {
            // alert("SUCCESS");
            this.$emit("changetab", "verify-email");
            // this.$emit("changetab", "login");
            return;
          }
          this.errorMsg = res.errorMsg;
          // alert(res.errorMsg);
        })
        .catch((error) => {
          this.loading = false;
          console.error("Error:", error);
        });
    },
    // register() {
    //   this.$emit("changetab", "verify-email");
    // },
  },
  mounted() {},
  beforeDestroy() {},
  watch: {
    tab: function (val) {
      if (val == "register") {
        this.errorMsg = "";
        this.temp = {
          email: "",
          password: "",
          confirm_password: "",
          firstname: "",
          lastname: "",
          mobile: "",
          imageLink: "",
          image: [],
          agree: false,
        };
      }
    },
    "temp.email"(value) {
      // binding this to the data value in the email input
      this.temp.email = value;
      this.validateEmail(value);
    },
  },
};
</script>