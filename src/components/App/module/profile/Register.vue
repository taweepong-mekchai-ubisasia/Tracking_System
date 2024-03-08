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

          <Icon icon="heroicons-outline:eye"      
              @click="showpassword = !showpassword"
              :class="{ hidden: !showpassword, block: showpassword }"/>
          
              <Icon icon="heroicons-outline:eye-off"
            
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
          <Icon icon="heroicons-outline:eye"      
          @click="showconfirm_password = !showconfirm_password"
              :class="{
                hidden: !showconfirm_password,
                block: showconfirm_password,
              }"/>
          
              <Icon icon="heroicons-outline:eye-off"
            
              @click="showconfirm_password = !showconfirm_password"
              :class="{
                block: !showconfirm_password,
                hidden: showconfirm_password,
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
import UploadModule from "@/components/App/Module/Global/Upload.vue";
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