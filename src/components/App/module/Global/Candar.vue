<template>
    <div>
      <div class="bg-white rounded shadow overflow-hidden">
        <div class="flex items-center justify-between py-2 px-6">
          <div>
            <span class="text-lg font-bold text-gray-800">{{ monthNames[month] }}</span>
            <span class="ml-1 text-lg text-gray-600 font-normal">{{ year }}</span>
          </div>
          <div class="border rounded-lg px-1" style="padding-top: 2px;">
            <button type="button" class="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center" :class="{'cursor-not-allowed opacity-25': month == 0 }"
              :disabled="month == 0 ? true : false" @click="month--; getNoOfDays()">
              <svg class="h-6 w-6 text-gray-500 inline-flex leading-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div class="border-r inline-flex h-6"></div>
            <button type="button" class="leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1" :class="{'cursor-not-allowed opacity-25': month == 11 }"
              :disabled="month == 11 ? true : false" @click="month++; getNoOfDays()">
              <svg class="h-6 w-6 text-gray-500 inline-flex leading-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
    
        <div class="-mx-1 -mb-1">
          <div class="grid grid-cols-7">
            <div v-for="(day, index) in dayNames" :key="index" class="col-span-1">
              <div class="px-2 py-2">
                <div class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">{{ day }}</div>
              </div>
            </div>
          </div>
    
          <div class="grid grid-cols-7 border-t border-l">
            <div v-for="blankday in blankDays" class="col-span-1">
              <div class="text-center border-r border-b px-4 pt-2 h-32"></div>
            </div>
            <div v-for="date, index in noOfDays" :key="index" class="col-span-1">
              <div class="px-4 pt-2 border-r border-b relative h-32">
                <div @click="showEventModal(date)" class="inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100"
                  :class="{'bg-blue-500 text-white': isToday(date) == true, 'text-gray-700 hover:bg-blue-200': isToday(date) == false }">{{ date }}</div>
                <div class="overflow-y-auto mt-1">
    
                  <div v-for="event in events.filter(e => new Date(e.eventDate).toDateString() ===  new Date(year, month, date).toDateString())">
                    <div class="px-2 py-1 rounded-lg mt-1 overflow-hidden border" :class="{
                                                    'border-blue-200 text-blue-800 bg-blue-100': event.eventTheme === 'blue',
                                                    'border-red-200 text-red-800 bg-red-100': event.eventTheme === 'red',
                                                    'border-yellow-200 text-yellow-800 bg-yellow-100': event.eventTheme === 'yellow',
                                                    'border-green-200 text-green-800 bg-green-100': event.eventTheme === 'green',
                                                    'border-purple-200 text-purple-800 bg-purple-100': event.eventTheme === 'purple'
                                                }">
                      <p class="text-sm truncate leading-tight">{{ event.eventTitle }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div style=" background-color: rgba(0, 0, 0, 0.8)" class="fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full" v-if="openEventModal">
        <div class="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
          <div class="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer" @click="openEventModal = !openEventModal">
            <svg class="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
            </svg>
          </div>
    
          <div class="shadow w-full rounded-lg bg-white overflow-hidden w-full block p-8">
            <h2 class="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">Add Event Details</h2>
    
            <div class="mb-4">
              <label class="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Event title</label>
              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" x-model="eventTitle">
            </div>
    
            <div class="mb-4">
              <label class="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Event date</label>
              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" x-model="eventDate" readonly>
            </div>
    
            <div class="inline-block w-64 mb-4">
              <label class="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Select a theme</label>
              <div class="relative">
                <select @change="eventTheme = $event.target.value;" x-model="eventTheme"
                  class="block appearance-none w-full bg-gray-200 border-2 border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-gray-700">
                  <div v-for="(theme, index) in themes">
                    <option :value="theme.value">{{ theme.label }}</option>
                  </div>
    
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
    
            <div class="mt-8 text-right">
              <button type="button" class="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm mr-2" @click="openEventModal = !openEventModal">
                Abbrechen
              </button>
              <button type="button" class="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded-lg shadow-sm" @click="addEvent()">
                Speichern
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </template>
    
    <script>
    export default {
      data() {
        return {
          month: '',
          year: '',
          noOfDays: [],
          blankDays: [],
          days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          events: [{
              eventDate: new Date(2020, 3, 1),
              eventTitle: "April Fool's Day",
              eventTheme: 'blue'
            },
            {
              eventDate: new Date(2020, 3, 10),
              eventTitle: "Birthday",
              eventTheme: 'red'
            },
            {
              eventDate: new Date(2020, 3, 16),
              eventTitle: "Upcoming Event",
              eventTheme: 'green'
            }
          ],
          eventTitle: '',
          eventDate: '',
          eventTheme: 'blue',
          themes: [{
              value: "blue",
              label: "Blue Theme"
            },
            {
              value: "red",
              label: "Red Theme"
            },
            {
              value: "yellow",
              label: "Yellow Theme"
            },
            {
              value: "green",
              label: "Green Theme"
            },
            {
              value: "purple",
              label: "Purple Theme"
            }
          ],
          openEventModal: false,
        }
      },
      mounted() {
        let today = new Date()
        this.month = today.getMonth()
        this.year = today.getFullYear()
        this.datepickerValue = new Date(this.year, this.month, today.getDate()).toDateString()
      },
      computed: {
        monthNames() {
          return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        dayNames() {
          return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        }
      },
      methods: {
        isToday(date) {
          const today = new Date()
          const d = new Date(this.year, this.month, date)
          return today.toDateString() === d.toDateString() ? true : false
        },
        showEventModal(date) {
          this.openEventModal = true
          this.eventDate = new Date(this.year, this.month, date).toDateString()
        },
        addEvent() {
          if (this.eventTitle == '') {
            return
          }
          this.events.push({
            eventDate: this.eventDate,
            eventTitle: this.eventTitle,
            eventTheme: this.eventTheme
          })
          this.eventTitle = ''
          this.eventDate = ''
          this.eventTheme = 'blue';
          this.openEventModal = false
        },
        getNoOfDays() {
          let daysInMonth = new Date(this.year, this.month + 1, 0).getDate()
          let dayOfWeek = new Date(this.year, this.month).getDay()
          let blankDaysArray = []
          for (var i = 1; i <= dayOfWeek; i++) {
            blankDaysArray.push(i)
          }
          let daysArray = []
          for (var i = 1; i <= daysInMonth; i++) {
            daysArray.push(i)
          }
          this.blankDays = blankDaysArray
          this.noOfDays = daysArray
        }
      }
    }
    </script>