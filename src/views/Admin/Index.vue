<template>
  <div class="Dashboard">
    <AdminLayout>
      <template #modal>
        <input type="checkbox" id="modal-logs" class="modal-toggle" />
        <div class="modal">
          <div class="modal-box relative">
            <label
              for="modal-logs"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕</label
            >
            <h3 class="text-lg font-bold">Add new logs!</h3>
            <div class="card-body">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">logs title</span>
                </label>
                <input
                  type="text"
                  placeholder="Title or name"
                  class="input input-bordered"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Description</span>
                </label>
                <input
                  type="text"
                  placeholder="Description"
                  class="input input-bordered"
                />
              </div>
              <div class="form-control">
                <div class="overflow-x-auto w-full">
                  <!-- <table class="table table-compact w-full">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th class="text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="hover" v-for="index in 3" :key="index">
                        <th>
                          <div class="flex items-center space-x-3">
                            <div class="avatar">
                              <div class="mask mask-squircle w-12 h-12">
                              </div>
                            </div>
                          </div>
                        </th>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="font-bold">Hart Hagerty</div>
                              <div class="text-sm opacity-50">
                                United States
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          Zemlak, Daniel and Leannon
                          <br />
                          <span class="badge badge-ghost badge-sm"
                            >Desktop Support Technician</span
                          >
                        </td>
                        <td>Purple</td>
                        <th class="text-right">
                          <button class="btn btn-ghost btn-xs">edit</button> |
                          <button class="btn btn-ghost btn-xs">remove</button>
                        </th>
                      </tr>
                    </tbody>
                  </table> -->
                </div>
              </div>
              <div class="form-control mt-6">
                <button class="btn btn-primary">Confirm</button>
              </div>
              <div class="form-control mt-6">
                <button class="btn btn-danger">Cancle</button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #view>
        <!-- <div class=""> -->
          <div
            class="
              grid grid-cols-1
              gap-6
              lg:p-10
              xl:grid-cols-3
             
              shadow-2xl
            "
          >
            <div class="min-auto xl:col-span-3">
              <div class="bg-opacity-0 z-10"></div>
              <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Content Management System
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>    <div class="flex-col lg:flex-row-reverse w-full">
                <div class="container">
                  <div class="text-center lg:text-center">
                    <div class="text-3xl lg:text-5xl font-bold" ref="text">
                      Wellcome Admin
                    </div>
                    <div class="text-lg lg:text-3xl font-bold mt-2" ref="text">
                      Wellcome Admin
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div
              class="
                navbar
                col-span-1
                shadow-lg
                xl:col-span-3
                bg-neutral-focus
                text-neutral-content
                rounded-box
                lg:flex
                hidden
              "
            >
              <div class="flex justify-center flex-1 px-2 mx-2">
                <div class="items-stretch hidden lg:flex">
                  <a
                    class="btn btn-ghost btn-sm rounded-btn"
                    @click="$router.push({ name: `gameplay` })"
                  >
                    Gameplay
                  </a>
                  <a
                    class="btn btn-ghost btn-sm rounded-btn"
                    @click="$router.push({ name: `coin` })"
                  >
                    Coin
                  </a>
                  <a
                    class="btn btn-ghost btn-sm rounded-btn"
                    @click="$router.push({ name: `member` })"
                  >
                    Member
                  </a>
                  <a
                    class="btn btn-ghost btn-sm rounded-btn"
                    @click="$router.push({ name: `admin` })"
                  >
                    Admin
                  </a>
                </div>
              </div>
            </div> -->

            <!-- <div class="card shadow-lg compact side bg-base-100">
              <div class="flex-row items-center space-x-4 card-body">
                <div>
                  <div class="avatar">
                    <div class="rounded-full w-14 h-14 shadow">
                      <img
                        src="https://www.lansweeper.com/wp-content/uploads/2018/05/ASSET-USER-ADMIN.png"
                      />
                    </div>
                  </div>
                </div>
                <div class="text-left">
                  <h2 class="card-title text-sm">{{ admin.row.code }}</h2>
                  <p class="text-base-content text-opacity-40">
                    {{ admin.row.firstname }} {{ admin.row.lastname }}
                  </p>
                </div>
              </div>
            </div> -->
            <!-- <div
              class="card shadow-lg compact side bg-base-100"
              v-if="dashboard.rows"
            >
              <div class="stats shadow h-full">
                <div class="stat">
                  <div class="stat-title">Average scores of all scorers</div>
                  <div class="stat-value  "
                  :class="
                  `${dashboard.rows.rating.total<=1?`text-red-500`:`${dashboard.rows.rating.total<=1.5?`text-orange-400`:`${dashboard.rows.rating.total<=2.5?`text-sky-600`:`${dashboard.rows.rating.total<=4?`text-teal-600`:`text-emerald-400`}`}`}`}`
  
                  ">
                    {{ formatPrice(dashboard.rows.rating.total,1) }}
                  </div>
                </div>
              </div>
            </div> -->
            <!-- <div
              class="card row-span-2 shadow-lg compact bg-base-100"
              v-if="dashboard.rows"
            >
              <div class="stats shadow h-full">
                <div class="stat">
                  <div class="stat-title self-center">
                    Today Gameplay Recorded
                  </div>
                  <div class="stat-value self-center">
                    {{ formatPrice(dashboard.rows.gameplay_today.total,0) }}
                  </div>
                  <div class="stat-desc self-center">
                    <a
                      class="btn btn-ghost btn-link btn-sm rounded-btn"
                      @click="$router.push({ name: `gameplay` })"
                    >
                      see item details
                    </a>
                  </div>
                </div>
              </div>
            </div> -->
            <!-- <div
              class="card shadow-lg compact side bg-base-100"
              v-if="dashboard.rows"
            >
              <div class="stats shadow h-full">
                <div class="stat">
                  <div class="stat-title">Today Gameplay Recorded</div>
                  <div class="stat-value">
                    {{ formatPrice(dashboard.rows.gameplay.total,0) }}
                  </div>
                </div>
              </div>
            </div> -->
            <!-- <div
              class="card shadow-lg compact side bg-base-100"
              v-if="dashboard.rows"
            >
              <div class="stats shadow h-full">
                <div class="stat">
                  <div class="stat-title">Total Users</div>
                  <div class="stat-value">
                    {{ formatPrice(dashboard.rows.user.total,0) }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="
                card
                col-span-1
                row-span-3
                shadow-lg
                xl:col-span-3
                bg-base-100
                text-white
              "
            >
              <div class="card-body">
                <h2 class="my-4 text-4xl font-bold card-title text-white">
                  Last 10 games played
                </h2>
                <div class="mb-4 space-x-2 card-actions">
                  <div
                    class="btn btn-xs btn-primary"
                    :class="!decentraland ? `btn-outline` : ''"
                    @click="decentraland = !decentraland"
                  >
                    Decentraland
                  </div>
                  <div
                    class="btn btn-xs btn-primary"
                    :class="!roblox ? `btn-outline` : ''"
                    @click="roblox = !roblox"
                  >
                    Roblox
                  </div>
                  <div
                    class="btn btn-xs btn-primary"
                    :class="!zepeto ? `btn-outline` : ''"
                    @click="zepeto = !zepeto"
                  >
                    Zepeto
                  </div>
                  <div
                    class="btn btn-xs btn-primary"
                    :class="!spatial ? `btn-outline` : ''"
                    @click="spatial = !spatial"
                  >
                    Spatial
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="table table-compact w-full mb-4">
                    <thead>
                      <tr>
                        <th>รหัส / ผู้ใช้งาน</th>
                        <th>เกมส์</th>
                        <th>วันที่เล่น</th>
                        <th>ผู้เล่น</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(v, i) in gameplay.rows" :key="i">
                        <th>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="text-sm font-bold">
                                {{ v.code }}
                              </div>
                              <div class="text-sm opacity-50">
                                {{ v.firstname }} {{ v.lastname }}
                              </div>
                            </div>
                          </div>
                        </th>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="text-sm font-bold">
                                {{ v.game_type }}
                              </div>
                              <div class="text-sm opacity-50">
                                uuid : {{ v.game_uid }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="text-sm opacity-50">
                            วันที่สร้าง : {{ v.created_at }}
                          </div>
                          <div class="text-sm opacity-50">
                            วันที่ยืนยัน :
                            {{
                              v.updated_at ? v.updated_at : "ยังไม่ได้ยืนยัน"
                            }}
                          </div>
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="font-bold">{{ v.type }}</div>
                              <div
                                class="text-sm opacity-50"
                                v-if="v.type == 'facebook'"
                              >
                                {{ v.facebook }}
                              </div>
                              <div class="text-sm opacity-50" v-else>
                                {{ v.email }}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div> -->
          </div>
        <!-- </div> -->
      </template>
    </AdminLayout>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminLayout from "@/components/App/layout.vue";
const firebase = require('../../firebaseConfig.js');
import {
    getDatabase,
    ref,
    set,
    onValue,
    push,
    query,
    orderByChild,
    limitToLast,
    equalTo,
    onDisconnect,
    onChildAdded,
    onChildChanged,
    onChildRemoved,
  } from "firebase/database";
export default {
  name: "Dashboard",
  components: {
    AdminLayout,
  },
  data() {
    return {
      decentraland: false,
      roblox: false,
      zepeto: false,
      spatial: false,
      gameplay: {
        rows: [],
        total: 0,
        page: 1,
        row: 10,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
          name: "",
          number: "",
          size: "",
          description: "",
          category_id: "0",
          store_id: "0",
          recommend: "",
          room: "",
          imageLink: "",
          image: [],
        },
      },
      // rating:{rows:null},
      dashboard: {
        rows: null,
      },
      remove: {
        current: 0,
        model: false,
        controll: "",
      },
      ref:null
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    admin() {
      return this.$store.getters.admin;
    },
  },
  methods: {
    formatPrice(value,digit) {
        let val = (value/1).toFixed(digit).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    gameplay_next() {
      this.gameplay.page++;
      this.gameplay_search();
    },
    gameplay_back() {
      this.gameplay.page--;
      this.gameplay_search();
    },
    logs_search() {
      this.logs.loading = true;
      this.logs_get((res) => {
        // console.log(res.rows);
        let length = res.rows.length;
        for (let i = 0; i < length; i++) {
          res.rows[i].memo = res.rows[i].memo
            ? JSON.parse(res.rows[i].memo)
            : {};
        }

        // res.rows.map(v=>v?JSON.parse(v.memo):{})
        //   console.log(res.rows)
        // logs_code":"1111","logs_title":"ขอบสีน้ำตาลฟ้า"

        this.logs.rows = res.rows;
        this.logs.total = res.total;
        // console.log(this.logs.page*this.logs.row)

        // console.log(this.logs.total)
        this.logs.next =
          this.logs.page * this.logs.row > this.logs.total ? false : true;
        this.logs.back = this.logs.page > 1 ? true : false;

        this.logs.loading = false;
      });
    },
    gameplay_search() {
      this.gameplay.loading = true;
      this.gameplay_get((res) => {
        this.gameplay.rows = res.rows;
        this.gameplay.total = res.total;
        this.gameplay.next =
          this.gameplay.page * this.gameplay.row >= this.gameplay.total
            ? false
            : true;
        this.gameplay.back = this.gameplay.page > 1 ? true : false;

        this.gameplay.loading = false;
      });
    },
    gameplay_get(callback) {
      fetch(
        `${this.ServiceUrl}controllers/app/gameplay?page=${
          this.gameplay.page
        }${this.gameplay.row ? `&rows=${this.gameplay.row}` : ""}${
          this.gameplay.q ? `&q=${this.gameplay.q}` : ""
        }${this.decentraland?`&decentraland=${this.decentraland}`:``}${this.roblox?`&roblox=${this.roblox}`:``}${this.zepeto?`&zepeto=${this.zepeto}`:``}${this.spatial?`&spatial=${this.spatial}`:``}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          callback(
            res.success
              ? { rows: res.rows, total: res.total }
              : { rows: [], total: 0 }
          );
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },

    dashboard_search() {
      this.dashboard_get((res) => {
        this.dashboard.rows = res;
      });
    },
    dashboard_get(callback) {
      // console.log(firebase)
      // this.ref = ref(firebase, `suggestion`);
    const _query = query(
      ref(firebase.db, `suggestion/`),
      // orderByChild("approve"),
      // equalTo(true),
      // limitToLast(1)
    );
    // console.log(mostViewedPosts)
    onValue(_query, (snapshot) => {
      // console.log(snapshot.ref.key)
      // console.log(this.index)
      // if (parseInt(snapshot.ref.key) !== this.index) {
      //   return;
      // }
      const data = snapshot.val();
      console.log(data);
      // this.clear();
      // this.render(data);
      // updateStarCount(postElement, data);
    });
      // fetch(
      //   `${this.ServiceUrl}controllers/app/dashboard`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",

      //       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      //     },
      //   }
      // )
      //   .then((response) => response.json())
      //   .then((res) => {
      //     callback(
      //       res
      //     );
      //   })
      //   .catch((error) => {
      //     callback([]);
      //     console.error("Error:", error);
      //   });
    },
   
  },
  mounted() {
    this.gameplay_search();
    this.dashboard_search();
  },
  watch: {
    decentraland: function (val) {
      console.log(val);
      this.gameplay_search();
    },
    roblox: function (val) {
      console.log(val);
      this.gameplay_search();
    },
    zepeto: function (val) {
      console.log(val);
      this.gameplay_search();
    },
    spatial: function (val) {
      console.log(val);
      this.gameplay_search();
    },
  },
};
</script>
