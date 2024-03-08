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
        
      
        <AppModuleProfileVerifyEmail
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
        <AppModuleProfileForgotPassword
          :tab="tab.join"
          @changetab="
            (val) => {
              tab.join = val;
            }
          "
        />
        <AppModuleProfileResetPassword
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

          <AppModuleProfileProfile
            v-if="tab.profile == 'profile'"
            @changetab="
              (val) => {
                tab.profile = val;
              }
            "
            @Logout="Logout"
          />
          <AppModuleProfileEditDetail
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
          <AppModuleProfileEditPassword
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
            <Icon icon="zondicons:exclamation-outline" />
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
          <div class="text-xl font-bold">Privacy Notice</div>
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

    <div class="bg-base-100 drawer xl:drawer-open">
      <input id="drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content bg-base-200">
        <div
          class="bg-primary text-white shadow-sm sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-80 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)]"
        >
          <nav class="navbar w-full">
            <div class="flex flex-1 md:gap-1 lg:gap-2">
              <span
                class="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
                data-tip="Menu"
                ><label
                  aria-label="Open menu"
                  for="drawer"
                  class="btn btn-square btn-ghost drawer-button xl:hidden"
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
                <LayoutLogoLight />
                <LayoutChangelog />
              </div>
              <!-- <div class="hidden w-full max-w-sm lg:flex">
                <label class="searchbox relative mx-3 w-full">
                  <svg
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
                  </svg>
                
                  <div
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
                  </div>
                  <div
                    class="pointer-events-none absolute end-10 top-2.5 gap-1 opacity-50 rtl:flex-row-reverse hidden lg:flex"
                  >
                    <kbd class="kbd kbd-sm">ctrl</kbd>
                    <kbd class="kbd kbd-sm">K</kbd>
                  </div>
                </label>
              </div> -->
            </div>
            <div class="flex-0">
              <div
                title="Change Theme"
                class="dropdown dropdown-end hidden [@supports(color:oklch(0_0_0))]:block"
              >
                <div tabindex="0" role="button" class="btn btn-ghost">
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="h-5 w-5 stroke-current md:hidden"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    ></path>
                  </svg>
                  <span class="hidden font-normal md:inline">Theme</span>
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
                  class="dropdown-content bg-base-200 text-base-content rounded-box top-px h-[28.6rem] h-auto max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5 mt-16"
                >
                  <div class="grid grid-cols-1 gap-3 p-3">
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="ubis"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'ubis'"
                    >
                      <span
                        data-theme="ubis"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">ubis</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <!-- <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="light"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'light'"
                    >
                      <span
                        data-theme="light"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">light</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="dark"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'dark'"
                    >
                      <span
                        data-theme="dark"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">dark</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="cupcake"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'cupcake'"
                    >
                      <span
                        data-theme="cupcake"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">cupcake</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="bumblebee"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'bumblebee'"
                    >
                      <span
                        data-theme="bumblebee"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">bumblebee</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="emerald"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'emerald'"
                    >
                      <span
                        data-theme="emerald"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">emerald</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button> -->
                    <!-- 
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="corporate"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'corporate'"
                    >
                      <span
                        data-theme="corporate"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">corporate</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="synthwave"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'synthwave'"
                    >
                      <span
                        data-theme="synthwave"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">synthwave</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="retro"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'retro'"
                    >
                      <span
                        data-theme="retro"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">retro</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="cyberpunk"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'cyberpunk'"
                    >
                      <span
                        data-theme="cyberpunk"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">cyberpunk</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="valentine"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'valentine'"
                    >
                      <span
                        data-theme="valentine"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">valentine</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="halloween"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'halloween'"
                    >
                      <span
                        data-theme="halloween"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">halloween</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="garden"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'garden'"
                    >
                      <span
                        data-theme="garden"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">garden</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="forest"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'forest'"
                    >
                      <span
                        data-theme="forest"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">forest</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="aqua"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'aqua'"
                    >
                      <span
                        data-theme="aqua"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">aqua</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="lofi"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'lofi'"
                    >
                      <span
                        data-theme="lofi"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">lofi</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="pastel"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'pastel'"
                    >
                      <span
                        data-theme="pastel"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">pastel</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="fantasy"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'fantasy'"
                    >
                      <span
                        data-theme="fantasy"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">fantasy</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="wireframe"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'wireframe'"
                    >
                      <span
                        data-theme="wireframe"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">wireframe</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="black"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'black'"
                    >
                      <span
                        data-theme="black"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">black</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="luxury"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'luxury'"
                    >
                      <span
                        data-theme="luxury"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">luxury</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="dracula"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'dracula'"
                    >
                      <span
                        data-theme="dracula"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">dracula</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="cmyk"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'cmyk'"
                    >
                      <span
                        data-theme="cmyk"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">cmyk</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="autumn"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'autumn'"
                    >
                      <span
                        data-theme="autumn"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">autumn</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="business"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'business'"
                    >
                      <span
                        data-theme="business"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">business</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="acid"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'acid'"
                    >
                      <span
                        data-theme="acid"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">acid</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="lemonade"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'lemonade'"
                    >
                      <span
                        data-theme="lemonade"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">lemonade</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="night"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'night'"
                    >
                      <span
                        data-theme="night"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">night</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="coffee"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'coffee'"
                    >
                      <span
                        data-theme="coffee"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">coffee</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4 [&amp;_svg]:visible"
                      data-set-theme="winter"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'winter'"
                    >
                      <span
                        data-theme="winter"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">winter</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="dim"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'dim'"
                    >
                      <span
                        data-theme="dim"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">dim</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="nord"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'nord'"
                    >
                      <span
                        data-theme="nord"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">nord</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
                    <button
                      class="outline-base-content text-start outline-offset-4"
                      data-set-theme="sunset"
                      data-act-class="[&amp;_svg]:visible"
                      @click="theme = 'sunset'"
                    >
                      <span
                        data-theme="sunset"
                        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
                      >
                        <span class="grid grid-cols-5 grid-rows-3">
                          <span
                            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="invisible h-3 w-3 shrink-0"
                            >
                              <path
                                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                              ></path>
                            </svg>
                            <span class="flex-grow text-sm">sunset</span>
                            <span class="flex h-full shrink-0 flex-wrap gap-1">
                              <span class="bg-primary rounded-badge w-2">
                              </span>
                              <span class="bg-secondary rounded-badge w-2">
                              </span>
                              <span class="bg-accent rounded-badge w-2"> </span>
                              <span class="bg-neutral rounded-badge w-2">
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </button>
            -->
                  </div>
                </div>
              </div>
              <div title="Change Language" class="dropdown dropdown-end">
                <div
                  tabindex="0"
                  role="button"
                  class="btn btn-ghost"
                  aria-label="Language"
                >
                  <svg
                    class="h-5 w-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z"
                    ></path>
                    <path
                      d="M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z"
                    ></path>
                  </svg>
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
                  class="dropdown-content bg-base-200 text-base-content rounded-box top-px mt-16 max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5"
                >
                  <ul class="menu menu-sm gap-1">
                    <li>
                      <button
                        @click="changeLanguage('th')"
                        :class="language == 'th' ? 'active' : ''"
                      >
                        <span
                          class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
                          >TH</span
                        >
                        <span class="font-[sans-serif]">ภาษาไทย</span>
                      </button>
                    </li>
                    <li>
                      <button
                        @click="changeLanguage('en')"
                        :class="language == 'en' ? 'active' : ''"
                      >
                        <span
                          class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
                          >EN</span
                        >
                        <span class="font-[sans-serif]">English</span>
                      </button>
                    </li>
                    <li>
                      <button
                        @click="changeLanguage('zn')"
                        :class="language == 'zn' ? 'active' : ''"
                      >
                        <span
                          class="badge badge-sm badge-outline !pl-1.5 !pr-1 pt-px font-mono !text-[.6rem] font-bold tracking-widest opacity-50"
                          >ZH</span
                        >
                        <span class="font-[sans-serif]">繁體中文</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="flex-0">
              <div
                title="Profile"
                class="dropdown dropdown-end hidden [@supports(color:oklch(0_0_0))]:block"
              >
                <div
                  v-if="user"
                  tabindex="0"
                  role="button"
                  class="btn btn-ghost"
                >
                
                  <Icon icon="ph:user-bold" class="w-3 h-3 stroke-current" />

                  <span class="hidden font-normal md:inline"
                    >{{ user.firstname }} {{ user.lastname }}</span
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
                    <li @click="showProfile()">
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
                      <span class="font-[sans-serif]" @click="Logout()"
                        >Logout</span
                      >
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
        <div class="max-w-[100vw] px-2 pb-2 md:px-6 md:pb-6 xl:pr-2">
          <div class="flex flex-col-reverse justify-between gap-6 xl:flex-row">
            <div class="prose prose-sm md:prose-base w-full flex-grow pt-4">
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
            <LayoutLogo />
            <LayoutChangelog />
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
                <Icon
                  icon="material-symbols:home-outline"
                  class="w-5 h-5 text-orange-400"
                />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <details id="disclosure-docs" :open="false">
                <summary class="group">
                  <span>
                    <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-orange-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg> -->
                    <!-- <Icon name="line-md:chat" class="w-5 h-5 text-orange-400"/> -->
                    <Icon
                      icon="material-symbols:book-outline"
                      class="w-5 h-5 text-orange-400"
                    />
                  </span>
                  Docs
                </summary>
                <ul>
                  <li>
                    <a href="#" class="group"> <span>Use</span> </a>
                  </li>
                </ul>
              </details>
            </li>
            <AppModuleMenu_
              v-if="user"
              :menutype="'menu'"
              :access="user.access"
              @object_access="(obj) => {}"
            />

            <li></li>
            <li>
              <a href="#" class="group">
                <span>
          
                  <Icon icon="mdi:envelope-outline" class="w-5 h-5"/>
                </span>
                <span>News</span>
              </a>
            </li>
            <li></li>
            <li>
              <a href="#" class="group" @click="showProfile()">
              
                <Icon icon="bx:user" class="w-5 h-5 text-green-600" />
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#" class="group" @click="Logout()">
                
                <Icon icon="uil:signout" class="w-5 h-5 text-error" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
          <!-- <div
            class="bg-base-100 pointer-events-none sticky bottom-0 flex h-40 [mask-image:linear-gradient(transparent,#000000)]"
          ></div> -->
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import AppModuleMenu_ from "@/components/App/Module/Menu/_.vue";
import AppModuleProfileVerifyEmail from "@/components/App/Module/Profile/VerifyEmail.vue";
import AppModuleProfileForgotPassword from "@/components/App/Module/Profile/ForgotPassword.vue";
import AppModuleProfileResetPassword from "@/components/App/Module/Profile/ResetPassword.vue";
import AppModuleProfileProfile from "@/components/App/Module/Profile/Profile.vue";
import AppModuleProfileEditDetail from "@/components/App/Module/Profile/EditDetail.vue";
import AppModuleProfileEditPassword from "@/components/App/Module/Profile/EditPassword.vue";
// import PrivacyNoticeVue from "@/components/App/Module/PrivacyNotice.vue";
// import PrivacyNoticeVue from "@/views/App/PrivacyNotice.vue";
// import PrivacyNoticeComponent from "@/components/App/Module/PrivacyNotice.vue";
// import PrivacyNotice from '@/views/App/PrivacyNotice.vue'

import LayoutLogo from "@/components/Layout/Logo.vue";
import LayoutLogoLight from "@/components/Layout/LogoLight.vue";
import LayoutChangelog from "@/components/Layout/Changelog.vue";
// import { Icon } from '@iconify/vue';
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
  name: "AppLayout",
  components: {
    AppModuleProfileVerifyEmail,
    AppModuleProfileForgotPassword,
    AppModuleProfileResetPassword,
    AppModuleProfileProfile,
    AppModuleProfileEditDetail,
    AppModuleProfileEditPassword,
    AppModuleMenu_,
    LayoutLogo,
    LayoutLogoLight,
    LayoutChangelog,
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
      // language: "th",
      // veridated:false
      obj: {
        batch: "810544",
        bay: "1",
        column24: null,
        comments: "\n Add: 1x21 = 21.00 kg",
        createDate: "2024-01-15",
        docNum: "24019825",
        itemCode: "S431H-PF",
        itemName: null,
        level: "1",
        ownerAdd: "สาธิต ดวงแจ่มใส",
        ownerIssue: null,
        packSize: "21",
        pallet: "1",
        quantitys: "21.00",
        rack: "D",
        recId: "97e4ac2a8916b6b6c9fcffb42b0410c1",
        sourceDatabase: "UBP",
        systemDate: "2024-01-15 10:56:47",
        tableName: "shelfs",
        transRef: "I",
        transRefComments: "",
        unit: "1",
        uomCode: "kg",
        warehouse: "wh1",
      },
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
    // admin_isLogin() {
    //   return this.$store.getters.admin_isLogin;
    // },
    // scrollTop() {
    //   return this.$store.getters.scrollTop;
    // },
    user_token() {
      return this.$store.getters.user_token;
    },
    user() {
      return this.$store.getters.user;
    },
    language() {
      return this.$store.getters.language;
    },
    // rating() {
    //   return this.$store.getters.rating;
    // },
    // veridated() {
    //   return this.$store.getters.veridated;
    // },
    // testLogin() {
    //   return this.$store.getters.testLogin;
    // },
    // testPosting() {
    //   return this.$store.getters.testPosting;
    // },
    // Vue3GoogleOauth() {
    //   return this.$store.getters.Vue3GoogleOauth;
    // },
    // gAuth() {
    //   return this.$store.getters.gAuth;
    // },
  },
  methods: {
    changeLanguage(v) {
      this.$store.commit("language", v);
      localStorage.setItem("language", v);
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
        tel: this.profileUpdate.temp.tel,
        image: [image],
      };
      if (this.user.type == "email") {
        obj.image = [image];
      }
      fetch(
        `${this.$store.state.serviceUrl}controllers/MYSQL/INTERNAL/user`,

        // `${this.ServiceUrl}controllers/user`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },

          body: JSON.stringify(obj),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          console.log(res.row);
          if (res.success) {
            // alert("SUCCESS");
            if (localStorage.getItem("user_token")) {
              localStorage.setItem("user_token", res.jwt);
            }
            // this.$store.commit("user_token", localStorage.getItem("user_token"));
            // user_token
            // this.comfirm = false;
            this.$store.commit("user", res.row);
            this.$store.commit(
              "user_token",
              localStorage.getItem("user_token")
            );
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
      console.log("sad");
      this.$store.commit("isLogin", false);
      this.$store.commit("user_token", false);
      localStorage.removeItem("user_token");
    },
    authentication() {
      let vm = this;
      vm.$store.commit("user", null);
      fetch(`${this.ServiceUrl}controllers/MYSQL/INTERNAL/authentication`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (res.success) {
            vm.$store.commit("isLogin", true);
            console.log(res.row);
            res.row.access = JSON.parse(res.row.access);
            console.log(res.row);
            vm.$store.commit("user", res.row);
            // console.log(this.user)
            vm.$store.commit("user_token", vm.user_token);
            // if (vm.$route.query.gp_code) {
            //   vm.$emit("setgame");
            // } else {
            //   vm.$emit("getgame");
            // }
          } else {
            vm.goLoginPage(vm);
          }
        })
        .catch((error) => {
          vm.goLoginPage(vm);
        });
    },
    goLoginPage(vm) {
      // console.log("DASdsa");
      vm.$store.commit("isLogin", false);
      vm.$store.commit("user_token", false);
      localStorage.removeItem("user_token");
      vm.$router.push({ name: "AppLogin" });
    },
    showProfile() {
      // console.log(this.user)
      this.tab.profile = "profile";
      this.$refs.profile.checked = true;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.commit(
        "language",
        localStorage.getItem("language")
          ? localStorage.getItem("language")
          : "th"
      );
      // this.language = localStorage.getItem("language")
      //   ? localStorage.getItem("language")
      //   : "th";
      // this.$store.commit("scrollTop", this.$refs.msgContainer.scrollTop);
      // if (
      //   this.$route.query.token &&
      //   !this.user_token &&
      //   this.$route.query.type == "verify"
      // ) {
      //   this.$refs.joinnows.checked = true;
      //   //   // tab.join
      //   //   console.log(this.tab);
      //   //   // this.tab.join = "verify-email";
      //   //   // this.$refs.joinnows.checked = true;
      //   //   // this.tab.profile = "editpassword";
      //   //   // this.$refs.profile.checked = true;
      // }
      // if (this.$route.query.token && this.$route.query.type == "forgot") {
      //   // this.$refs.joinnows.checked = /true;
      //   // this.$refs.joinnows.checked = true;
      //   this.tab.join = "resetpassword";
      //   this.$refs.joinnows.checked = true;
      // }
      // // this.scrollTop = this.$refs.msgContainer.scrollTop;
      // if (this.$route.matched[0].props.default.type == "default") {
      //   return;
      // }
      // if (
      //   this.$route.matched[0].props.default.type == "member" &&
      //   !this.testLogin
      // ) {
      //   this.changepage("Home");
      // }
      // if (
      //   this.$route.matched[0].props.default.type == "poster" &&
      //   !this.testPosting
      // ) {
      //   this.changepage("Home");
      // }
      // if(!this.testLogin){
      //   this && !this.testPosting
      //   if(){
      //     this.$route.name = 'PosterDashboard' PosterSurvey PosterAdvertising
      //   }
      // }
      // this.$route;
      // if (this.$route.query.hash) {
      // }
    });
    // this.$store.user_token = null
    // console.log(localStorage.getItem("user_token"));
    // console.log("A")
    // console.log(localStorage.getItem("user_token"))
    this.$store.commit("user_token", localStorage.getItem("user_token"));
    // console.log(this.user_token)
    // console.log("B")
    // this.$store.commit("_a", localStorage.getItem("_a"));
  },
  created() {
    // setTimeout(()=>{
    //   console.log(FB)
    // console.log(googleUser)
    // },5000)
  },
  watch: {
    user_token: function (val) {
      if (val) {
        this.authentication();
      } else {
        this.goLoginPage(this);
      }
      // console.log(val);
    },
    user: function (val) {
      console.log(val);
      if (!val) {
        return;
      }
      // if (!this.user.row.veridated_at) {
      //   this.tab.join = "verify-email";
      //   this.$refs.joinnows.checked = true;
      //   this.$store.commit("isLogin", false);
      //   return;
      // }
      // this.$store.commit("veridated", false);
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
// * {
//   font-family: cursive !important;
// }
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
span {
  line-break: anywhere;
}
</style>
