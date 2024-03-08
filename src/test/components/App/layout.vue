<template>
  <div data-theme="emerald">
    <input
      type="checkbox"
      id="modal-joinnows"
      ref="joinnows"
      class="modal-toggle"
    />
    <div class="modal">
      <div class="modal-box relative text-center m-0 p-0">
        <div class="navbar absolute top-0 left-0 bg-transparent z-10">
          <div class="flex-1">
            <button
              v-if="tab.join == 'register' || tab.join == 'forgot-password'"
              for="modal-joinnows"
              class="btn btn-sm btn-ghost absolute left-2 top-2"
              @click="tab.join = 'login'"
            >
              ←
            </button>
          </div>
          <div class="flex-none">
            <label
              for="modal-joinnows"
              class="btn btn-sm btn-ghost absolute right-2 top-2"
              @click="
                tab.join == 'verify-email' ? Logout() : (tab.join = 'login')
              "
              >✕</label
            >
          </div>
        </div>
        <LoginComponent
          v-if="tab.join == 'login'"
          :tab="tab.join"
          ref="LoginComponent"
          @setJoinnows="$refs.joinnows.checked = false"
          @changetab="
            (val) => {
              tab.join = val;
            }
          "
          :re_password="re_password"
        />
        <RegisterComponent
          :tab="tab.join"
          @changetab="
            (val) => {
              tab.join = val;
            }
          "
          @changePrivacyNotice="(val) => (PrivacyNotice = val)"
        />
        <VerifyEmailComponent
          :tab="tab.join"
          @changetab="
            (val) => {
              tab.join = val;
            }
          "
          @Logout="
            () => {
              tab.join = 'login';
              // this.$refs.joinnows.checked = true;
              Logout();
            }
          "
        />
        <ForgotPasswordComponent
          :tab="tab.join"
          @changetab="
            (val) => {
              tab.join = val;
            }
          "
        />
        <ResetPasswordComponent
          :tab="tab.join"
          @changetab="
            (val) => {
              tab.join = val;
            }
          "
          @resetpassword="
            (val) => {
              re_password = val;
            }
          "
        />
      </div>
    </div>

    <template v-if="isLogin">
      <input
        type="checkbox"
        id="modal-profile"
        class="modal-toggle"
        ref="profile"
      />
      <div class="modal">
        <div
          class="modal-box relative text-center m-0 p-0"
          :class="`${tab.profile == 'orderhistory' ? 'w-11/12 max-w-6xl' : ''}`"
        >
          <div class="navbar absolute top-0 left-0 bg-transparent z-10">
            <div class="flex-1">
              <button
                v-if="
                  tab.profile == 'editdetail' ||
                  tab.profile == 'editpassword' ||
                  tab.profile == 'orderhistory' ||
                  tab.profile == 'reward'
                "
                for="modal-profile"
                class="btn btn-sm btn-ghost absolute left-2 top-2"
                @click="tab.profile = 'profile'"
              >
                ←
              </button>
            </div>
            <div class="flex-none">
              <label
                for="modal-profile"
                class="btn btn-sm btn-ghost absolute right-2 top-2"
                @click="tab.profile = 'profile'"
                >✕</label
              >
            </div>
          </div>

          <ProfileComponent
            v-if="tab.profile == 'profile'"
            @changetab="
              (val) => {
                tab.profile = val;
              }
            "
            @Logout="Logout"
          />
          <EditDetailComponent
            :tab="tab.profile"
            @changetab="
              (val) => {
                tab.profile = val;
              }
            "
            @update_profile="
              (val) => {
                profileUpdate.temp = val;
                confirm = true;
              }
            "
          />
          <EditPasswordComponent
            :tab="tab.profile"
            @changetab="
              (val) => {
                tab.profile = val;
              }
            "
          />
          <!-- <RewardComponent
            :tab="tab.profile"
            @changetab="
              (val) => {
                tab.profile = val;
              }
            "
          />
          <OrderHistoryComponent
            :tab="tab.profile"
            @changetab="
              (val) => {
                tab.profile = val;
              }
            "
          /> -->
        </div>
      </div>
    </template>

    <input
      type="checkbox"
      id="modal-confirm"
      ref="confirm"
      class="modal-toggle"
      v-model="confirm"
    />
    <div class="modal">
      <div class="modal-box relative text-center m-0 p-0">
        <div class="navbar absolute top-0 left-0 bg-transparent z-10">
          <div class="flex-1"></div>
          <div class="flex-none">
            <label
              for="modal-confirm"
              class="btn btn-sm btn-ghost absolute right-2 top-2"
              >✕</label
            >
          </div>
        </div>

        <div class="card-body pb-2">
          <div class="text-xl font-bold">
            <font-awesome-icon
              icon="fa-solid fa-circle-exclamation"
              class="fa-4x"
            />
          </div>
          <div class="text-xl font-bold">Confirm Change</div>

          <!-- <div class="text-md">Log in with social</div> -->
          <!-- <div class="flex flex-col w-full border-opacity-50">
            <div class="text-md">ENTER YOUR MEMBERS CREDENTIALS</div>
       
            <div class="form-control grid mt-4">
              <label class="label">
                <span class="label-text">Email Address*</span>
              </label>
              <input
                type="text"
                placeholder="Email Address*"
                class="input input-bordered"
             
             
              />
            </div>
           
          </div> -->

          <div class="form-control mt-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <button
                  class="btn btn-sm md:btn-md lg:btn-lg bg-black text-white border-black w-full"
                  @click="confirm = !confirm"
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  class="btn btn-sm md:btn-md lg:btn-lg bg-black text-white border-black w-full"
                  @click="update()"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <input
      type="checkbox"
      id="modal-rating"
      ref="rating"
      class="modal-toggle"
    />
    <div class="modal">
      <div class="modal-box relative text-center m-0 p-0">
        <div class="navbar absolute top-0 left-0 bg-transparent z-10">
          <div class="flex-1"></div>
          <div class="flex-none">
            <label
              for="modal-rating"
              class="btn btn-sm btn-ghost absolute right-2 top-2"
              >✕</label
            >
          </div>
        </div>

        <div class="card-body pb-2">
          <div class="text-xl font-bold">Rate Us!</div>
          <p>How would you love this event</p>

          <div class="form-control items-center my-4">
            <div class="rating rating-lg rating-half">
              <input
                type="radio"
                name="rating-10"
                class="rating-hidden"
                :checked="rating_score == 0 ? true : false"
                @click="rating_score = 0"
              />
              <input
                type="radio"
                name="rating-10"
                class="bg-black mask mask-star-2 mask-half-1"
                :checked="rating_score == 0.5 ? true : false"
                @click="rating_score = 0.5"
              />
              <input
                type="radio"
                name="rating-10"
                class="bg-black mask mask-star-2 mask-half-2"
                :checked="rating_score == 1 ? true : false"
                @click="rating_score = 1"
              />
              <input
                type="radio"
                name="rating-10"
                class="bg-black mask mask-star-2 mask-half-1"
                :checked="rating_score == 1.5 ? true : false"
                @click="rating_score = 1.5"
              />
              <input
                type="radio"
                name="rating-10"
                class="bg-black mask mask-star-2 mask-half-2"
                :checked="rating_score == 2 ? true : false"
                @click="rating_score = 2"
              />
              <input
                type="radio"
                name="rating-10"
                class="bg-black mask mask-star-2 mask-half-1"
                :checked="rating_score == 2.5 ? true : false"
                @click="rating_score = 2.5"
              />
              <input
                type="radio"
                name="rating-10"
                class="bg-black mask mask-star-2 mask-half-2"
                :checked="rating_score == 3 ? true : false"
                @click="rating_score = 3"
              />
              <input
                type="radio"
                name="rating-10"
                class="bg-black mask mask-star-2 mask-half-1"
                :checked="rating_score == 3.5 ? true : false"
                @click="rating_score = 3.5"
              />
              <input
                type="radio"
                name="rating-10"
                class="bg-black mask mask-star-2 mask-half-2"
                :checked="rating_score == 4 ? true : false"
                @click="rating_score = 4"
              />
              <input
                type="radio"
                name="rating-10"
                class="bg-black mask mask-star-2 mask-half-1"
                :checked="rating_score == 4.5 ? true : false"
                @click="rating_score = 4.5"
              />
              <input
                type="radio"
                name="rating-10"
                class="bg-black mask mask-star-2 mask-half-2"
                :checked="rating_score == 5 ? true : false"
                @click="rating_score = 5"
              />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Comment & Feedback</span>
            </label>
            <textarea
              class="textarea textarea-bordered"
              placeholder="Description"
              v-model="comment_feedback"
              cols="5"
              rows="5"
            ></textarea>
          </div>

          <div class="form-control mt-4">
            <button
              class="btn btn-sm md:btn-md lg:btn-lg bg-black text-white border-black w-full"
              :disabled="rating_setting ? false : true"
              @click="rating_setting ? setRating() : ''"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>

    <input
      type="checkbox"
      id="modal-survey"
      ref="survey"
      class="modal-toggle"
    />
    <div class="modal">
      <div class="modal-box relative text-center m-0 p-0">
        <div class="navbar absolute top-0 left-0 bg-transparent z-10">
          <div class="flex-1"></div>
          <div class="flex-none">
            <label
              for="modal-survey"
              class="btn btn-sm btn-ghost absolute right-2 top-2"
              >✕</label
            >
          </div>
        </div>
        <div class="card-body pb-2">
          <div class="text-xl font-bold">Survey!</div>
          <p>How would you love this event</p>

          <!-- <div class="form-control">
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
            </label>
          </div> -->

          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text">ความพึงพอใจในการใช้งานระบบ</span>
            </label>
            <!-- <textarea
              class="textarea textarea-bordered"
              placeholder="Description"
              v-model="comment_feedback"
              cols="5"
              rows="5"
            ></textarea> -->
            <select
              class="select w-full select-bordered"
              @focus="survey_data.check.contentment = true"
              v-model="survey_data.temp.contentment"
              :class="
                survey_data.check.contentment &&
                survey_data.errorMsg.contentment
                  ? 'select-error'
                  : ''
              "
              @change="
                survey_data.errorMsg.contentment = !survey_data.temp.contentment
                  ? true
                  : false
              "
            >
              <!-- contentment:'',
        experience:'',
        feedback:'', -->
              <option value="" disabled selected>เลือกรายการ</option>
              <option value="มากที่สุด">มากที่สุด</option>
              <option value="มาก">มาก</option>
              <option value="ปานกลาง">ปานกลาง</option>
              <option value="น้อย">น้อย</option>
              <option value="น้อยที่สุด">น้อยที่สุด</option>
            </select>
            <label
              class="label"
              :class="
                survey_data.check.contentment &&
                survey_data.errorMsg.contentment
                  ? ''
                  : 'hidden'
              "
            >
              <span class="label-text-alt text-error">กรุณาเลือกรายการ</span>
              <!-- <span class="label-text-alt">Alt label</span> -->
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text"
                >ประสบการณ์โดยรวมที่ได้รับจากการเข้าร่วม Me Verse</span
              >
            </label>
            <select
              class="select w-full select-bordered"
              v-model="survey_data.temp.experience"
              @focus="survey_data.check.experience = true"
              @change="
                survey_data.errorMsg.experience = !survey_data.temp.experience
                  ? true
                  : false
              "
              :class="
                survey_data.check.experience && survey_data.errorMsg.experience
                  ? 'select-error'
                  : ''
              "
            >
              <option value="" disabled selected>เลือกรายการ</option>
              <option value="มากที่สุด">มากที่สุด</option>
              <option value="มาก">มาก</option>
              <option value="ปานกลาง">ปานกลาง</option>
              <option value="น้อย">น้อย</option>
              <option value="น้อยที่สุด">น้อยที่สุด</option>
            </select>
            <label
              class="label"
              :class="
                survey_data.check.experience && survey_data.errorMsg.experience
                  ? ''
                  : 'hidden'
              "
            >
              <span class="label-text-alt text-error">กรุณาเลือกรายการ</span>
              <!-- <span class="label-text-alt">Alt label</span> -->
            </label>
            <!-- <textarea
              class="textarea textarea-bordered"
              placeholder="Description"
              v-model="comment_feedback"
              cols="5"
              rows="5"
            ></textarea> -->
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text"
                >ข้อเสนอแนะในการปรับปรุงระบบจากผู้ใช้งาน</span
              >
            </label>
            <!-- <select class="select w-full select-bordered">
              <option disabled selected>Pick your favorite Simpson</option>
              <option>Homer</option>
              <option>Marge</option>
              <option>Bart</option>
              <option>Lisa</option>
              <option>Maggie</option>
            </select> -->
            <textarea
              class="textarea textarea-bordered"
              placeholder="Description"
              v-model="survey_data.temp.feedback"
              cols="5"
              rows="5"
            ></textarea>
          </div>
          <div class="form-control mt-4">
            <button
              class="btn btn-sm md:btn-md lg:btn-lg bg-black text-white border-black w-full"
              :disabled="
                survey_data.errorMsg.contentment ||
                survey_data.errorMsg.experience ||
                survey_data.errorMsg.feedback
              "
              @click="
                survey_data.errorMsg.contentment ||
                survey_data.errorMsg.experience ||
                survey_data.errorMsg.feedback
                  ? ''
                  : setSurvey()
              "
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>

    <input
      type="checkbox"
      id="modal-PrivacyNotice"
      ref="PrivacyNotice"
      class="modal-toggle"
      v-model="PrivacyNotice"
    />
    <div class="modal">
      <div class="modal-box relative text-center m-0 p-0">
        <div class="navbar absolute top-0 left-0 bg-transparent z-10">
          <div class="flex-1"></div>
          <div class="flex-none">
            <label
              for="modal-PrivacyNotice"
              class="btn btn-sm btn-ghost absolute right-2 top-2"
              >✕</label
            >
          </div>
        </div>

        <div class="card-body overflow-auto" style="max-height: inherit">
          <!-- <div class="text-xl font-bold">
            <font-awesome-icon
              icon="fa-solid fa-circle-exclamation"
              class="fa-4x"
            />
          </div> -->
          <div class="text-xl font-bold">Privacy Notice</div>
          <!-- <PrivacyNoticeVue /> -->
          <!-- <div class="container"> -->
          <div class="text-center lg:text-center">
            <div class="text-4xl lg:text-5xl font-bold mt-6" ref="text">
              Privacy Notice
            </div>
            <div class="divider text-orange-500">
              ประกาศเกี่ยวกับความเป็นส่วนตัว (Me Verse)
            </div>
            <div class="container">
              <span class="text-orange-500 my-5">
                เรื่อง นโยบายการคุ้มครองข้อมูลส่วนบุคคล
              </span>

              <div>
                <section class="container text-left text-sm">
                  <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                      <!-- <h2 class="card-title text-sm">1. วัตถุประสงค์</h2> -->
                      <p>
                        ประกาศเกี่ยวกับความเป็นส่วนตัวฉบับนี้จึงจัดทำขึ้นเพื่อให้ท่านในฐานะ
                        ผู้สมัครสมาชิกของเว็บไซต์ สสส.
                        (ซึ่งต่อไปในประกาศนี้เรียกว่า "เจ้าของข้อมูลส่วนบุคคล")
                        ได้ทราบและเข้าใจรูปแบบ วิธีการ
                        และวัตถุประสงค์และความจำเป็นของกองทุนสนับสนุนการสร้างเสริมสุขภาพ
                        ("สสส.") ในฐานะผู้ควบคุมข้อมูลส่วนบุคคล
                        ที่ต้องดำเนินการเก็บรวบรวม ใช้
                        หรือเปิดเผยข้อมูลส่วนบุคคลจากท่าน
                        รวมทั้งทราบถึงนโยบายการคุ้มครองข้อมูลส่วนบุคคล
                        มาตรการในการรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคล
                        ตลอดจนสิทธิตามกฎหมายของท่านในฐานะเจ้าของข้อมูลส่วนบุคคล
                        ซึ่งมีรายละเอียดดังต่อไปนี้
                      </p>

                      <div class="divider"></div>
                      <b>1. ฐานกฎหมายในการเก็บรวบรวมข้อมูลส่วนบุคคล</b>
                      <p>
                        สสส.
                        จำเป็นต้องดำเนินการเก็บรวบรวมข้อมูลส่วนบุคคลของท่านภายใต้ฐานกฎหมาย
                        โดยมีรายละเอียด ดังต่อไปนี้
                      </p>
                      <ul class="menu bg-base-100">
                        <li class="disabled">
                          <!-- <a href="#"> -->
                          <p class="text-left" style="color: grey">
                            (1)
                            ดำเนินการเก็บรวบรวมข้อมูลส่วนบุคคลเพื่อการปฏิบัติตามสัญญา
                            (Contract)
                            โดยนำข้อมูลส่วนบุคคลของท่านไปใช้ประโยชน์ในประชาสัมพันธ์กิจกรรมและข้อมูลข่าวสารของ
                            สสส. ให้กับท่านทราบ
                            ตลอดจนเชิญท่านเข้าร่วมกิจกรรมต่าง ๆ ของ สสส. หาก
                            สสส. ไม่ได้รับข้อมูลส่วนบุคคลดังกล่าวจะทำให้ สสส.
                            ไม่สามารถดำเนินงานให้เป็นไปตามวัตถุประสงค์ได้
                          </p>
                          <!-- </a> -->
                        </li>
                        <li class="disabled">
                          <!-- <a href="#"> -->
                          <p class="text-left" style="color: grey">
                            (2)
                            ดำเนินการเก็บรวบรวมข้อมูลส่วนบุคคลเพื่อประโยชน์ชอบด้วยกฎหมาย
                            (Legitimate Interest)
                            โดยนำข้อมูลส่วนบุคคลของท่านไปใช้ประโยชน์ในการวิเคราะห์สังเคราะห์
                            เพื่อนำมาปรับปรุง วางแผนการดำเนินกิจกรรมต่าง ๆ
                            และการประชาสัมพันธ์ และการใช้งานภายใน สสส.
                          </p>
                          <!-- </a> -->
                        </li>
                      </ul>
                      <div class="divider"></div>
                      <b>2. วัตถุประสงค์ในการเก็บรวบรวมข้อมูลส่วนบุคคล</b>
                      <p>
                        สสส.
                        ดำเนินการเก็บรวบรวมข้อมูลส่วนบุคคลของท่านเพื่อใช้ประโยชน์ในประชาสัมพันธ์กิจกรรมและข้อมูลข่าวสารของ
                        สสส. ให้กับท่านทราบ ตลอดจนเชิญท่านเข้าร่วมกิจกรรมต่าง ๆ
                        ของ สสส.
                      </p>
                      <div class="divider"></div>
                      <b>3. แหล่งข้อมูลและรายการข้อมูลส่วนบุคคลที่เก็บรวบรวม</b>
                      <p>
                        สสส.
                        ดำเนินการเก็บรวบรวมข้อมูลส่วนบุคคลของท่านจากแหล่งข้อมูลและรายการข้อมูล
                        ดังต่อไปนี้
                      </p>
                      <div class="overflow-x-auto">
                        <table class="table table-compact w-full">
                          <thead>
                            <tr>
                              <th>แหล่งข้อมูล/วิธีการเก็บรวบรวม</th>
                              <th>รายการข้อมูลส่วนบุคคล</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>
                                เก็บข้อมูลจากท่านโดยตรงผ่านหน้าเว็บไซต์ สสส.
                                ในส่วนของการสมัครสมาชิกเว็บไซต์
                              </th>
                              <td>
                                ชื่อ นามสกุล อีเมล ชื่อเล่น รวมถึงข้อมูลอื่น ๆ
                                ที่ท่านได้กรอกผ่านหน้าเว็บไซต์ สสส.
                                ในส่วนของการสมัครสมาชิกเว็บไซต์
                                ซึ่งสามารถเชื่อมโยงไปถึงเจ้าของข้อมูลส่วนบุคคล
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="divider"></div>
                      <b>4. ระยะเวลาในการเก็บรวบรวมข้อมูลส่วนบุคคล</b>
                      <!-- <p>สสส. จำเป็นต้องดำเนินการเก็บรวบรวมข้อมูลส่วนบุคคลของท่านภายใต้ฐานกฎหมาย โดยมีรายละเอียด ดังต่อไปนี้</p> -->
                      <ul class="menu bg-base-100">
                        <li class="disabled">
                          <!-- <a href="#"> -->
                          <p class="text-left" style="color: grey">
                            4.1 สสส. ดำเนินการเก็บรวบรวมข้อมูลส่วนบุคคลของท่าน
                            เป็นระยะเวลาไม่เกิน 5 ปี
                            นับแต่นับแต่วันที่ที่ท่านได้สมัครเป็นสมาชิกเว็บไซต์
                            สสส. ยกเว้นจะมีกฎหมายไว้เป็นอย่างอื่น
                          </p>
                          <!-- </a> -->
                        </li>
                        <li class="disabled">
                          <!-- <a href="#"> -->
                          <p class="text-left" style="color: grey">
                            4.2 เมื่อครบกำหนดระยะเวลาตามข้อ 4.1
                            หรือเมื่อข้อมูลส่วนบุคคลของท่านไม่สามารถใช้ประโยชน์ได้ตามวัตถุประสงค์ที่กำหนดไว้ในข้อ
                            2. สสส.
                            จะลบหรือทำลายหรือทำให้ข้อมูลส่วนบุคคลของท่านเป็นข้อมูลที่ไม่สามารถระบุตัวตนของเจ้าของข้อมูลส่วนบุคคลได้อีก
                          </p>
                          <!-- </a> -->
                        </li>
                      </ul>
                      <div class="divider"></div>
                      <b>5. มาตรการรักษาความมั่นคงปลอดภัยข้อมูลส่วนบุคคล</b>
                      <!-- <p>สสส. จำเป็นต้องดำเนินการเก็บรวบรวมข้อมูลส่วนบุคคลของท่านภายใต้ฐานกฎหมาย โดยมีรายละเอียด ดังต่อไปนี้</p> -->
                      <ul class="menu bg-base-100">
                        <li class="disabled">
                          <!-- <a href="#"> -->
                          <p class="text-left" style="color: grey">
                            5.1 สสส.
                            มีมาตรการในการรักษาความมั่นคงปลอดภัยข้อมูลส่วนบุคคลของท่านอย่างเหมาะสม
                            ทั้งในเชิงเทคนิคและการบริหารจัดการ
                            เพื่อป้องกันมิให้ข้อมูลสูญหาย หรือมีการเข้าถึง ทำลาย
                            ใช้ เปลี่ยนแปลง แก้ไข
                            หรือเปิดเผยข้อมูลส่วนบุคคลโดยไม่ได้รับอนุญาต
                            ซึ่งสอดคล้องกับนโยบายและแนวปฏิบัติด้านความมั่นคงปลอดภัยสารสนเทศ
                            (Information Security Policy) ของ สสส.
                          </p>
                          <!-- </a> -->
                        </li>
                        <li class="disabled">
                          <!-- <a href="#"> -->
                          <p class="text-left" style="color: grey">
                            5.2 สสส.
                            ได้กำหนดนโยบายการคุ้มครองข้อมูลส่วนบุคคลที่ประกาศให้ทราบโดยทั่วกันทั้งองค์กร
                            พร้อมทั้งกำหนดแนวทางปฏิบัติเพื่อให้เกิดความมั่นคงปลอดภัยในการเก็บรวบรวม
                            ใช้ และเปิดเผยข้อมูลส่วนบุคคล
                            โดยธำรงไว้ซึ่งความเป็นความลับ (Confidentiality)
                            ความถูกต้องครบถ้วน (Integrity) และสภาพพร้อมใช้งาน
                            (Availability) ของข้อมูลส่วนบุคคล
                          </p>
                          <!-- </a> -->
                        </li>
                      </ul>

                      <div class="divider"></div>
                      <b>6. สิทธิของเจ้าของข้อมูลส่วนบุคคล</b>
                      <p>
                        เพื่อให้ข้อมูลส่วนบุคคลของท่านยังคงอยู่ในความควบคุมของท่านได้มากขึ้น
                        ท่านสามารถใช้สิทธิเกี่ยวกับข้อมูลส่วนบุคคลของท่านได้ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล
                        พ.ศ. 2562 ดังต่อไปนี้
                      </p>
                      <ul class="menu bg-base-100">
                        <li class="disabled">
                          <!-- <a href="#"> -->
                          <p class="text-left" style="color: grey">
                            (1) สิทธิในการเข้าถึง ขอสำเนา
                            หรือขอรับข้อมูลส่วนบุคคลที่เก็บรวบรวมไว้
                            รวมถึงขอให้เปิดเผยถึง
                            การได้มาซึ่งข้อมูลส่วนบุคคลที่เจ้าของข้อมูลส่วนบุคคลไม่ได้ให้ความยินยอม
                            เว้นแต่กรณีที่ สสส.
                            มีสิทธิปฏิเสธคำขอของท่านได้ตามกฎหมาย
                          </p>
                          <!-- </a> -->
                        </li>
                        <li class="disabled">
                          <!-- <a href="#"> -->
                          <p class="text-left" style="color: grey">
                            (2)
                            สิทธิขอรับหรือขอให้ส่งหรือโอนข้อมูลส่วนบุคคลที่มีการจัดทำให้อยู่ในรูปแบบที่สามารถอ่านหรือใช้งานได้ด้วยเครื่องมือหรืออุปกรณ์ที่ทำงานได้โดยอัตโนมัติและสามารถใช้หรือเปิดเผยข้อมูลส่วนบุคคลได้ด้วยวิธีอัตโนมัติ
                            เว้นแต่กรณีที่ สสส.
                            มีสิทธิปฏิเสธคำขอของท่านได้ตามกฎหมาย
                          </p>
                          <!-- </a> -->
                        </li>
                        <li class="disabled">
                          <!-- <a href="#"> -->
                          <p class="text-left" style="color: grey">
                            (3) สิทธิในการคัดค้านหรือขอให้ระงับการเก็บรวบรวม ใช้
                            หรือเปิดเผยข้อมูลส่วนบุคคลตามเงื่อนไขที่กฎหมายกำหนด
                          </p>
                          <!-- </a> -->
                        </li>
                        <li class="disabled">
                          <!-- <a href="#"> -->
                          <p class="text-left" style="color: grey">
                            (4) สิทธิในการขอให้ลบ ทำลาย
                            หรือทำให้ข้อมูลส่วนบุคคลเป็นข้อมูลที่ไม่สามารถระบุตัวบุคคลของเจ้าของข้อมูลส่วนบุคคลได้ตามเงื่อนไขที่กฎหมายกำหนด
                            เว้นแต่กรณีที่ สสส.
                            มีสิทธิปฏิเสธคำขอของท่านได้ตามกฎหมาย
                          </p>
                          <!-- </a> -->
                        </li>
                        <li class="disabled">
                          <!-- <a href="#"> -->
                          <p class="text-left" style="color: grey">
                            (5)
                            สิทธิในการขอให้ดำเนินการให้ข้อมูลส่วนบุคคลถูกต้อง
                            เป็นปัจจุบัน สมบูรณ์ และไม่ก่อให้เกิดความเข้าใจผิด
                          </p>
                          <!-- </a> -->
                        </li>
                        <li class="disabled">
                          <!-- <a href="#"> -->
                          <p class="text-left" style="color: grey">
                            (6) สิทธิในการเพิกถอนความยินยอมในการเก็บรวบรวม ใช้
                            หรือเปิดเผยข้อมูลส่วนบุคคล
                            เว้นแต่ในกรณีที่มีกฎหมายหรือข้อตกลงกำหนดไว้เป็นอย่างอื่น
                          </p>
                          <!-- </a> -->
                        </li>
                      </ul>
                      <p>
                        ทั้งนี้ ท่านสามารถยื่นคำร้องขอให้ สสส.
                        ดำเนินการตามสิทธิได้โดยวิธีการหรือช่องทางดังนี้
                        แบบคำร้องขอใช้สิทธิของเจ้าของข้อมูลส่วนบุคคล ที่ สสส.
                        ได้จัดเตรียมไว้ให้ หรือ
                        <a href="https://pdpa.thaihealth.or.th"
                          >https://pdpa.thaihealth.or.th</a
                        >
                      </p>
                      <div class="divider"></div>
                      <b>7. การติดต่อ สสส.</b>
                      <p>
                        ท่านสามารถติดต่อสอบถามรายละเอียดในประกาศเกี่ยวกับความเป็นส่วนตัวนี้ได้ตามช่องทาง
                        ดังต่อไปนี้
                      </p>
                      <ul class="menu bg-base-100">
                        <li class="disabled">
                          <!-- <a href="#"> -->
                          <p class="text-left" style="color: grey">
                            7.1 ผู้ควบคุมข้อมูลส่วนบุคคล
                            <br />
                            กองทุนสนับสนุนการสร้างเสริมสุขภาพ (สสส.)
                            <br />
                            เลขที่ 99/8 ซอยงามดูพลี แขวงทุ่งมหาเมฆ เขตสาทร
                            กรุงเทพมหานคร 10120
                            <br />
                            โทร. 0 2343 1500 / อีเมล : dpo@thaihealth.or.th
                          </p>
                          <!-- </a> -->
                        </li>
                        <li class="disabled">
                          <!-- <a href="#"> -->
                          <p class="text-left" style="color: grey">
                            7.2 เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล
                            <br />
                            นายวิเชียร ทิพย์ชุมภู
                            <br />
                            เลขที่ 99/8 ซอยงามดูพลี แขวงทุ่งมหาเมฆ เขตสาทร
                            กรุงเทพมหานคร 10120
                            <br />
                            โทร. 0 2343 1500 / อีเมล : dpo@thaihealth.or.th
                          </p>
                          <!-- </a> -->
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="form-control mt-4"> -->
        <!-- <div class="grid grid-cols-2 gap-4">
              <div>
                <button
                  class="
                    btn btn-sm
                    md:btn-md
                    lg:btn-lg
                    bg-black
                    text-white
                    border-black
                    w-full
                  "
                  @click="PrivacyNotice = !PrivacyNotice"
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  class="
                    btn btn-sm
                    md:btn-md
                    lg:btn-lg
                    bg-black
                    text-white
                    border-black
                    w-full
                  "
                  @click="update()"
                >
                  Confirm
                </button>
              </div>
            </div> -->

        <!-- </div> -->
        <!-- </div> -->
      </div>
    </div>

    <slot name="modal"></slot>

    <div class="bg-base-100 drawer lg:drawer-open">
      <input id="drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <div
          class="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)]"
        >
          <nav class="navbar w-full">
            <div class="flex flex-1 md:gap-1 lg:gap-2">
              <span
                class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
                data-tip="Menu"
                ><label
                  aria-label="Open menu"
                  for="drawer"
                  class="btn btn-square btn-ghost drawer-button lg:hidden"
                  ><svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </span>
              <div class="flex items-center gap-2 lg:hidden">
                <!-- <a
                  data-sveltekit-preload-data=""
                  href="/"
                  aria-current="page"
                  aria-label="daisyUI"
                  class="flex-0 btn btn-ghost gap-1 px-2 md:gap-2"
                  data-svelte-h="svelte-dlyygu"
                >
                  <span
                    class="font-title text-base-content text-lg md:text-2xl"
                  >
                    UbisAsia
                  </span>
                </a> -->
                <LayoutLogoLight />
                <LayoutChangelog />
              </div>
              <div class="hidden w-full max-w-sm lg:flex">
                <label class="searchbox relative mx-3 w-full">
                  <!-- <svg
                    class="pointer-events-none absolute z-10 my-3.5 ms-4 stroke-current opacity-60 text-base-content"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg> -->
                  
                  <!-- <div
                    data-svelte-typeahead=""
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-controls="typeahead-0.tqt3y630zm-listbox"
                    aria-expanded="false"
                    id="typeahead-0.tqt3y630zm-typeahead"
                    class="svelte-4tg1b1"
                  >
                    <form
                      data-svelte-search=""
                      abineguid="8024A01691384EC6B1FF8D9197797FF5"
                    >
                      <label
                        id="typeahead-0.tqt3y630zm-label"
                        for="typeahead-0.tqt3y630zm"
                        class="svelte-wqugyy"
                        >Search</label
                      >
                      <input
                        name="search"
                        type="search"
                        placeholder="Search…"
                        autocomplete="off"
                        spellcheck="false"
                        aria-autocomplete="list"
                        aria-controls="typeahead-0.tqt3y630zm-listbox"
                        aria-labelledby="typeahead-0.tqt3y630zm-label"
                        id="typeahead-0.tqt3y630zm"
                        class="svelte-wqugyy"
                      />
                    </form>
                    <ul
                      role="listbox"
                      aria-labelledby="typeahead-0.tqt3y630zm-label"
                      id="typeahead-0.tqt3y630zm-listbox"
                      class="svelte-4tg1b1 svelte-typeahead-list"
                    ></ul>
                  </div> -->
                  <!-- <div
                    class="pointer-events-none absolute end-10 top-2.5 gap-1 opacity-50 rtl:flex-row-reverse hidden lg:flex"
                  >
                    <kbd class="kbd kbd-sm">ctrl</kbd>
                    <kbd class="kbd kbd-sm">K</kbd>
                  </div> -->
                </label>
              </div>
            </div>
            <div class="flex-0">
              <div
                title="Profile"
                class="dropdown dropdown-end hidden [@supports(color:oklch(0_0_0))]:block"
              >
                <div tabindex="0" role="button" class="btn btn-ghost">
                  <font-awesome-icon
                    :icon="['fas', 'user']"
                    class="w-3 h-3 stroke-current"
                  />

                  <span class="hidden font-normal md:inline"
                    >taweepong mekchai</span
                  >
                  <svg
                    width="12px"
                    height="12px"
                    class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                  >
                    <path
                      d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
                    ></path>
                  </svg>
                </div>
                <div
                  tabindex="0"
                  class="dropdown-content bg-base-100 text-base-content rounded-box top-px h-auto max-h-[calc(100vh-10rem)] w-48 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5 mt-16"
                >
                  <!-- h-[28.6rem]  -->
                  <ul class="menu menu-sm gap-1">
                    <li>
                      <!-- <button> -->
                      <!-- <span
                          class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
                          >Profile</span
                        > -->
                      <span class="font-[sans-serif]">Profile</span>
                      <!-- <span class="badge badge-sm badge-ghost">beta</span> -->
                      <!-- </button> -->
                    </li>
                    <li>
                      <!-- <button> -->
                      <!-- <span
                          class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
                          >Profile</span
                        > -->
                      <span class="font-[sans-serif]">Logout</span>
                      <!-- <span class="badge badge-sm badge-ghost">beta</span> -->
                      <!-- </button> -->
                    </li>
                    <!-- <li>
                      <button class="active">
                        <span
                          class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
                          >EN</span
                        >
                        <span class="font-[sans-serif]">English</span>
                      </button>
                    </li> -->
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div class="max-w-[100vw] px-6 pb-6 xl:pr-2">
          <div class="flex flex-col-reverse justify-between gap-6 xl:flex-row">
            <div class="prose prose-sm md:prose-base w-full flex-grow pt-10">
              <slot name="view"></slot>
              <div class="not-prose flex justify-center xl:hidden"></div>
            </div>
          </div>
        </div>
        <div
          class="toast toast-center z-10 [@supports(color:oklch(0_0_0))]:hidden"
          data-svelte-h="svelte-lnqxzy"
        >
          <div class="alert alert-warning grid-cols-[auto] py-2 text-xs">
            <span
              ><a
                class="link"
                rel="nofollow, noreferrer"
                target="_blank"
                href="https://www.wikihow.com/Update-Your-Browser"
                >Please upgrade your browser</a
              ></span
            >
          </div>
        </div>
      </div>
      <div
        class="drawer-side z-40"
        style="scroll-behavior: smooth; scroll-padding-top: 5rem"
      >
        <label
          for="drawer"
          class="drawer-overlay"
          aria-label="Close menu"
        ></label>
        <aside class="bg-base-100 min-h-screen w-80">
          <div
            data-sveltekit-preload-data=""
            class="bg-base-100 sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex"
          >
          <LayoutLogoLight />
                <LayoutChangelog />
            <a
              href="/"
              aria-current="page"
              aria-label="Homepage"
              class="flex-0 btn btn-ghost px-2"
              data-svelte-h="svelte-nce89e"
            >
              <div class="font-title inline-flex text-lg md:text-2xl">
                UbisAsiadsadas
              </div>
              </a>
          </div>
          <div class="h-4"></div>
          <ul class="menu px-4 py-0">
            <li>
              <a
                href="#"
                class="group"
                :class="$route.name == 'Dashboard' ? 'active' : ''"
                @click="changepage('Dashboard')"
              >
                <span>
                  <font-awesome-icon :icon="['fas', 'house']" class="w-5 h-5" />
                </span>
                <span>Dashboard</span>
                
              </a>
            </li>
            <!-- <li>
              <details id="disclosure-docs" open="">
                <summary class="group">
                  Coming soon
                </summary>
                <ul>
                  <li>
                    <a href="#" class="flex gap-4" @click="menu = false">
                      <span class="flex-1 text-1xl">Coming Soon</span>
                    </a>
                  </li>
                </ul>
              </details>
            </li> -->
            <li>
              <details id="disclosure-components" open="">
                <summary class="group">Menu</summary>
                <ul>
                  <li>
                    <details id="disclosure-components">
                      <summary class="group">
                        <span class="text-base-content">new</span>
                        <h2 class="flex items-center gap-4 px-1.5">
                          PO
                        </h2>
                      </summary>
                      <ul>
                        <li>
                          <a href="#" class="flex gap-4" @click="menu = false">
                            <span class="flex-1 text-1xl">WH</span>
                            <span class="badge badge-sm font-mono undefined"
                              >Develop</span
                            >
                          </a>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details id="disclosure-components">
                      <summary class="group">
                        <span class="text-base-content">new</span>
                        <h2 class="flex items-center gap-4 px-1.5">
                          QC
                        </h2>
                      </summary>
                      <ul>
                        <li>
                          <a href="#" class="flex gap-4" @click="menu = false">
                            <span class="flex-1 text-1xl">WH</span>
                            <span class="badge badge-sm font-mono undefined"
                              >Develop</span
                            >
                          </a>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details id="disclosure-components">
                      <summary class="group">
                        <span class="text-base-content">new</span>
                        <h2 class="flex items-center gap-4 px-1.5">
                          RD
                        </h2>
                      </summary>
                      <ul>
                        <li>
                          <a href="#" class="flex gap-4" @click="menu = false">
                            <span class="flex-1 text-1xl">WH</span>
                            <span class="badge badge-sm font-mono undefined"
                              >Develop</span
                            >
                          </a>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details id="disclosure-components" open>
                      <summary class="group">
                        <span class="text-base-content">new</span>
                        <h2 class="flex items-center gap-4 px-1.5">
                          WH
                        </h2>
                      </summary>
                      <ul>
                        <li>
                          <a
                            href="#"
                            class="flex gap-4 group"
                            :class="$route.name == 'Tracking' ? 'active' : ''"
                            @click="changepage('Tracking')"
                          >
                            <span class="flex-1 text-1xl"
                              >Tracking</span
                            >
                            <span class="badge badge-sm font-mono undefined"
                              >Develop
                            </span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            class="flex gap-4 group"
                            :class="$route.name == 'Tracking2' ? 'active' : ''"
                            @click="changepage('WH')"
                          >
                            <span class="flex-1 text-1xl">WH</span>
                            <span class="badge badge-sm font-mono undefined"
                              >Develop</span
                            >
                          </a>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
            <li></li>
            <li>
              <a href="#" class="group">
                <span>
                  <font-awesome-icon
                    :icon="['fas', 'envelope-circle-check']"
                    class="w-5 h-5"
                  />
                </span>
                <span>News</span>
                
              </a>
            </li>
            <li></li>
            <li>
              <a href="#" class="group">
                <span>
                  <font-awesome-icon :icon="['fas', 'user']" class="w-5 h-5" />
                </span>
                <span>Profile</span>
                
              </a>
            </li>
            <li>
              <a href="#" class="group">
                <span>
                  <font-awesome-icon
                    :icon="['fas', 'arrow-right-from-bracket']"
                    class="w-5 h-5"
                  />
                </span>
                <span>Logout</span>
              </a>
            </li>
          </ul>
          <div
            class="bg-base-100 pointer-events-none sticky bottom-0 flex h-40 [mask-image:linear-gradient(transparent,#000000)]"
          ></div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterComponent from "@/components/App/Module/Profile/Register.vue";
import LoginComponent from "@/components/App/Module/Profile/Login.vue";
import VerifyEmailComponent from "@/components/App/Module/Profile/VerifyEmail.vue";
import ForgotPasswordComponent from "@/components/App/Module/Profile/ForgotPassword.vue";
import ResetPasswordComponent from "@/components/App/Module/Profile/ResetPassword.vue";
import ProfileComponent from "@/components/App/Module/Profile/Profile.vue";
import EditDetailComponent from "@/components/App/Module/Profile/EditDetail.vue";
import EditPasswordComponent from "@/components/App/Module/Profile/EditPassword.vue";

import LayoutLogo from "@/components/Layout/Logo";
import LayoutLogoLight from "@/components/Layout/LogoLight";
import LayoutChangelog from "@/components/Layout/Changelog.vue";

// import PrivacyNoticeVue from "@/components/App/Module/PrivacyNotice.vue";
// import PrivacyNoticeVue from "@/views/App/PrivacyNotice.vue";
// import PrivacyNoticeComponent from "@/components/App/Module/PrivacyNotice.vue";
// import PrivacyNotice from '@/views/App/PrivacyNotice.vue'

import { ref, onMounted } from "vue";
export default {
  setup() {
    const joinnows = ref(null);
    const profile = ref(null);
    const rating = ref(null);
    const survey = ref(null);
    onMounted(() => {
      console.log(joinnows.value);
    });

    return { joinnows, profile, rating, survey };
  },
  name: "hotel",
  components: {
    RegisterComponent,
    LoginComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    EditDetailComponent,
    EditPasswordComponent,
  },
  name: "Layout",
  data() {
    return {
      // test: {
      //   login: false,
      // },
      tab: {
        join: "login",
        profile: "profile",
      },
      menu: false,
      re_password: null,
      confirm: false,
      PrivacyNotice: false,
      rating_score: 0,
      rating_setting: true,
      survey_data: {
        temp: {
          contentment: "",
          experience: "",
          feedback: "",
        },
        errorMsg: {
          contentment: true,
          experience: true,
          feedback: false,
        },
        check: {
          contentment: false,
          experience: false,
          feedback: false,
        },
      },
      // surveyErrorMsg:{
      //   contentment:true,
      //   experience:true,
      //   feedback:true,
      // },
      // surveyCheck
      comment_feedback: "",
      profileUpdate: {
        temp: null,
        success: "",
      },
      language: "th",
      // veridated:false
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
    admin_isLogin() {
      return this.$store.getters.admin_isLogin;
    },
    // scrollTop() {
    //   return this.$store.getters.scrollTop;
    // },
    jwt() {
      return this.$store.getters.jwt;
    },
    user() {
      return this.$store.getters.user;
    },
    // rating() {
    //   return this.$store.getters.rating;
    // },
    veridated() {
      return this.$store.getters.veridated;
    },
    testLogin() {
      return this.$store.getters.testLogin;
    },
    testPosting() {
      return this.$store.getters.testPosting;
    },
    // Vue3GoogleOauth() {
    //   return this.$store.getters.Vue3GoogleOauth;
    // },
    // gAuth() {
    //   return this.$store.getters.gAuth;
    // },
  },
  methods: {
    getCoin() {
      fetch(`${this.ServiceUrl}controllers/coin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.jwt}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            // console.log("GET RATITGFDHGFDHFDGHFD")
            // console.log(res)
            let total = 0;
            console.log(res);
            res.rows.forEach((v) => {
              // console.log(v)
              total += parseInt(v.coin);
            });
            this.$store.commit("coin", total);
            return;
          }
          // alert(res.errorMsg);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    getRating() {
      fetch(`${this.ServiceUrl}controllers/rating`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.jwt}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            // console.log("GET RATITGFDHGFDHFDGHFD")
            // console.log(res)
            this.$store.commit("rating", res.rows.length > 0 ? res.rows : null);
            return;
          }
          // alert(res.errorMsg);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    setRating() {
      this.rating_setting = false;
      let obj = {
        rating: this.rating_score,
        comment_feedback: this.comment_feedback,
      };
      fetch(`${this.ServiceUrl}controllers/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.jwt}`,
        },
        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((res) => {
          this.rating_setting = true;
          console.log(res.row);
          if (res.success) {
            this.rating_score = 0;

            this.comment_feedback = "";
            this.$refs.rating.checked = false;
            this.getCoin();
            return this.getRating();
          }
          alert(res.errorMsg);
        })
        .catch((error) => {
          this.rating_setting = true;
          console.error("Error:", error);
        });
    },
    getSurvey() {
      fetch(`${this.ServiceUrl}controllers/survey`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.jwt}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            // console.log("GET RATITGFDHGFDHFDGHFD")
            // console.log(res)
            this.$store.commit("survey", res.rows.length > 0 ? res.rows : null);
            return;
          }
          // alert(res.errorMsg);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    setSurvey() {
      this.survey_setting = false;
      let obj = {
        contentment: this.survey_data.temp.contentment,
        experience: this.survey_data.temp.experience,
        feedback: this.survey_data.temp.feedback,
      };
      fetch(`${this.ServiceUrl}controllers/survey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.jwt}`,
        },
        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((res) => {
          this.survey_setting = true;
          console.log(res.row);
          if (res.success) {
            this.survey_data = {
              temp: {
                contentment: "",
                experience: "",
                feedback: "",
              },
              errorMsg: {
                contentment: true,
                experience: true,
                feedback: false,
              },
              check: {
                contentment: false,
                experience: false,
                feedback: false,
              },
            };
            this.$refs.survey.checked = false;
            this.getCoin();
            return this.getSurvey();
          }
          alert(res.errorMsg);
        })
        .catch((error) => {
          this.rating_setting = true;
          console.error("Error:", error);
        });
    },

    update() {
      // this.$emit("update_profile",this.profileUpdate.temp)
      console.log(this.profileUpdate.temp);
      let image = { ...this.profileUpdate.temp.image[0] };
      delete image.temp;
      let obj = {
        // image: this.profileUpdate.temp.image,
        firstname: this.profileUpdate.temp.firstname,
        lastname: this.profileUpdate.temp.lastname,
        mobile: this.profileUpdate.temp.mobile,
        roblox: this.profileUpdate.temp.roblox,
        rating: this.profileUpdate.temp.rating,
        coin: this.profileUpdate.temp.coin,
        type: this.profileUpdate.temp.type,
        comment_feedback: this.profileUpdate.temp.comment_feedback,

        image: [image],
      };
      if (this.user.type == "email") {
        obj.image = [image];
      }
      fetch(`${this.ServiceUrl}controllers/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.jwt}`,
        },

        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res.row);
          if (res.success) {
            // alert("SUCCESS");
            if (localStorage.getItem("jwt")) {
              localStorage.setItem("jwt", res.jwt);
            }
            // this.$store.commit("jwt", localStorage.getItem("jwt"));
            // jwt
            // this.comfirm = false;
            this.$store.commit("user", res.row);
            this.$store.commit("jwt", localStorage.getItem("jwt"));
            // this.$store.commit("user", res.row);
            this.tab.profile = "profile";
            // console.log(this.confirm)
            this.confirm = false;
            // console.log(this.confirm)
            this.profileUpdate.success = "Update profile is successfully.";
            // this.$emit("changetab", "profile");
            return callback();
          }
          alert(res.errorMsg);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    changepage(page) {
      console.log(page);
      this.$router.push({ name: `${page}` });
    },
    Logout() {
      console.log("LOGOIT");
      this.$refs.LoginComponent ? this.$refs.LoginComponent.Logout() : "";
      this.$refs.joinnows ? (this.$refs.joinnows.checked = true) : "";
      this.$refs.profile ? (this.$refs.profile.checked = false) : "";
    },
    // scrolling() {
    //   this.$store.commit("scrollTop", this.$refs.msgContainer.scrollTop);
    // },
    authentication() {
      let vm = this;
      vm.$store.commit("user", null);
      fetch(`${this.ServiceUrl}controllers/authentication`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.jwt}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (res.success) {
            vm.$store.commit("isLogin", true);
            vm.$store.commit("user", res.user);
            vm.$store.commit("jwt", vm.jwt);
            // console.log(vm.$route.query);

            if (vm.$route.query.gp_code) {
              // console.log(
              //   "vm.$route.query.gp_codevm.$route.query.gp_codevm.$route.query.gp_codevm.$route.query.gp_codevm.$route.query.gp_codevm.$route.query.gp_code"
              // );
              vm.$emit("setgame");
            } else {
              vm.$emit("getgame");
            }
            vm.getSurvey();
            vm.getRating();
            vm.getCoin();
          } else {
            vm.$store.commit("isLogin", false);
            vm.$store.commit("jwt", false);
            localStorage.removeItem("jwt");
            // if (FB) {
            //   FB.logout(function (response) {});
            // }
            // if (this.Vue3GoogleOauth.isAuthorized) {
            //   this.handleClickSignOut();
            // }
          }
        })
        .catch((error) => {
          vm.$store.commit("isLogin", false);
          vm.$store.commit("jwt", false);
          localStorage.removeItem("jwt");
          console.error("Error:", error);
        });
    },
    // async handleClickSignOut() {
    //   try {
    //     await this.gAuth.signOut();
    //     // console.log("isAuthorized", this.Vue3GoogleOauth.isAuthorized);
    //     // this.user = "";
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    verifyEmail() {
      console.log(this.$route.query.token);

      let vm = this;
      let token = vm.$route.query.token;
      vm.$router.push({ query: {} });

      fetch(`${this.ServiceUrl}controllers/verify-email`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.jwt}`,
        },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (res.success) {
            // vm.$store.commit("isLogin", true);
            // vm.$store.commit("user", res.user);
            // vm.$store.commit("jwt", vm.jwt);
            // console.log(vm.$route.query);
            // if (vm.$route.query.gp_code) {
            //   // console.log("vm.$route.query.gp_codevm.$route.query.gp_codevm.$route.query.gp_codevm.$route.query.gp_codevm.$route.query.gp_codevm.$route.query.gp_code")
            //   vm.$emit("setgame");
            // } else {
            //   vm.$emit("getgame");
            // }

            vm.tab.join = "login";
            vm.$refs.joinnows.checked = false;

            if (localStorage.getItem("jwt")) {
              localStorage.setItem("jwt", res.jwt);
            }
            // this.$store.commit("jwt", localStorage.getItem("jwt"));
            // jwt
            // this.comfirm = false;
            vm.$store.commit("user", res.row);
            console.log(this.jwt);
            vm.$store.commit("jwt", res.jwt);
            console.log(this.jwt);
            // this.$store.commit("user", res.row);
            vm.$emit("changetab", "profile");

            // vm.authentication();
          } else {
            // vm.$store.commit("isLogin", false);
            // vm.$store.commit("jwt", false);
            // localStorage.removeItem("jwt");
            this.tab.join = "verify-email";
            this.$refs.joinnows.checked = true;
            this.$store.commit("isLogin", false);
          }
        })
        .catch((error) => {
          // vm.$store.commit("isLogin", false);
          // vm.$store.commit("jwt", false);
          // localStorage.removeItem("jwt");
          console.error("Error:", error);
          this.tab.join = "verify-email";
          this.$refs.joinnows.checked = true;
          this.$store.commit("isLogin", false);
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.language = localStorage.getItem("language")
        ? localStorage.getItem("language")
        : "th";
      // this.$store.commit("scrollTop", this.$refs.msgContainer.scrollTop);
      if (
        this.$route.query.token &&
        !this.jwt &&
        this.$route.query.type == "verify"
      ) {
        this.$refs.joinnows.checked = true;
        //   // tab.join
        //   console.log(this.tab);
        //   // this.tab.join = "verify-email";
        //   // this.$refs.joinnows.checked = true;
        //   // this.tab.profile = "editpassword";
        //   // this.$refs.profile.checked = true;
      }
      if (this.$route.query.token && this.$route.query.type == "forgot") {
        // this.$refs.joinnows.checked = /true;
        // this.$refs.joinnows.checked = true;
        this.tab.join = "resetpassword";
        this.$refs.joinnows.checked = true;
      }
      // this.scrollTop = this.$refs.msgContainer.scrollTop;
      if (this.$route.matched[0].props.default.type == "default") {
        return;
      }
      if (
        this.$route.matched[0].props.default.type == "member" &&
        !this.testLogin
      ) {
        this.changepage("Home");
      }
      if (
        this.$route.matched[0].props.default.type == "poster" &&
        !this.testPosting
      ) {
        this.changepage("Home");
      }

      // if(!this.testLogin){
      //   this && !this.testPosting
      //   if(){
      //     this.$route.name = 'PosterDashboard' PosterSurvey PosterAdvertising
      //   }
      // }
      this.$route;
    });
    // this.$store.jwt = null
    // console.log(localStorage.getItem("jwt"));
    this.$store.commit("jwt", localStorage.getItem("jwt"));
    // this.$store.commit("_a", localStorage.getItem("_a"));
  },
  created() {
    // setTimeout(()=>{
    //   console.log(FB)
    // console.log(googleUser)
    // },5000)
  },
  watch: {
    jwt: function (val) {
      if (val) {
        if (this.$route.query.token && this.$route.query.type == "verify") {
          // tab.join
          // console.log(this.tab);
          this.verifyEmail();
          return;
          // this.tab.join = "verify-email";
          // this.$refs.joinnows.checked = true;
          // this.tab.profile = "editpassword";
          // this.$refs.profile.checked = true;
        }
        this.authentication();
      } else {
        this.$store.commit("isLogin", false);
        localStorage.removeItem("jwt");
      }
      // console.log(val);
    },
    user: function (val) {
      // console.log("valvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalvalval");
      // console.log(val);
      if (!val) {
        return;
      }
      if (!this.user.row.veridated_at) {
        this.tab.join = "verify-email";
        this.$refs.joinnows.checked = true;
        this.$store.commit("isLogin", false);
        return;
      }
      this.$store.commit("veridated", false);
    },
    "tab.profile": function (val) {
      console.log(val);
      if (val == "profile") {
        this.profileUpdate = {
          temp: null,
          success: "",
        };
      }
    },
  },
};
</script>

<style lang="scss">
* {
  font-family: cursive !important;
}
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
