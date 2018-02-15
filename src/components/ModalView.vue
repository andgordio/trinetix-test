<template>
  <div class="absolute w-screen pin-t pin-l h-screen" style="background-color: rgba(0,0,0,0.75)">
    <div class="py-6 h-screen max-w-sm mx-auto">
      <div class="bg-white rounded-t border-b border-black flex items-center px-4" style="height: 56px;">
        <div class="w-12 cursor-pointer" @click="$emit('exit')">
          Cancel
        </div>
        <div class="flex-1 text-center text-lg">
          {{mode === 'createManual' ? 'Schedule inspection manually' : 'Inspection wizard'}}
        </div>
        <div class="w-12 text-right cursor-pointer" @click="$emit('exit')">
          Create
        </div>
      </div>
      <div class="bg-white rounded-b px-4 py-6 overflow-scroll" style="height: calc(100% - 56px);">
        <div v-if="mode === 'createManual'">
          <div class="mt-4">
            <label for="three" class="block mb-1 font-bold">Choose inspector</label>
            <select @input="selectInspector()" v-model="chosenInspector" name="three" id="three" class="border-black border h-10 w-full px-3 mb-4" style="border-radius: 0">
              <option v-for="(inspector, i) in inspectors" :value="i" :key="i">{{inspector.name}}</option>
            </select>
          </div>
          <div class="mt-4">
            <label for="three" class="block font-bold">Choose date</label>
            <label for="" class="block mb-1">Busiest days are in grey</label>
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); grid-gap: 20px;">
              <div  v-for="(day, i) in month"
                    :key="i" class="py-4 px-2 cursor-pointer"
                    :class="{ 'hover:bg-grey-light': day !== '',
                              'selectedDay': i === selectedDay,
                              'busyDay': i === busyDay1 || i === busyDay2 || i === busyDay3 || i === busyDay4 || i === busyDay5}"
                              @click="selectTheDay(i)">{{day}}</div>
            </div>
          </div>
          <div class="mt-6" v-if="selectedDay !== null">
            <label for="three" class="block mb-1 font-bold">Already scheduled for the day:</label>
            <div v-for="(company, i) in companiesForTheDay" :key="i">{{company}}</div>
          </div>
        </div>
        <!-- <input class="border-black border h-10 w-full px-3 mb-4" placeholder="First name" type="text" v-model="selectedItem.first_name">
        <input class="border-black border h-10 w-full px-3 mb-4" placeholder="Last name" type="text" v-model="selectedItem.last_name">
        <input class="border-black border h-10 w-full px-3 mb-4" placeholder="Company name" type="text" v-model="selectedItem.company_name">
        <input class="border-black border h-10 w-full px-3 mb-4" placeholder="Email address" type="email" v-model="selectedItem.email"> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'mode',
    'inspectors'
  ],
  data () {
    return {
      selectedDay: null,
      busyDay1: null,
      busyDay2: null,
      busyDay3: null,
      busyDay4: null,
      busyDay5: null,
      chosenInspector: 0,
      companiesForTheDay: []
    }
  },
  computed: {
    month () {
      let monthTemp = ['', '', '', '']
      for (let i = 1; i < 32; i++) {
        monthTemp.push(i)
      }
      return monthTemp
    }
    // companiesForTheDay () {
    //   let companies = []
    //   let busyDay1 = Math.floor(Math.random() * 5) + 0
    //   let busyDay2 = Math.floor(Math.random() * 12) + 0
    //   let busyDay3 = Math.floor(Math.random() * 20) + 0
    //   let busyDay4 = Math.floor(Math.random() * 20) + 0
    //   let busyDay5 = Math.floor(Math.random() * 25) + 0
    //   for (let i in this.inspectors[this.chosenInspector].inspections) {
    //     if (i === busyDay1 || i === busyDay2 || i === busyDay3 || i === busyDay4 || i === busyDay5) {
    //       companies.push(this.inspectors[this.chosenInspector].inspections[i].company)
    //     }
    //   }
    //   return companies
    // }
  },
  methods: {
    selectInspector () {
      this.busyDay1 = Math.floor(Math.random() * 30) + 5
      this.busyDay2 = Math.floor(Math.random() * 30) + 5
      this.busyDay3 = Math.floor(Math.random() * 30) + 5
      this.busyDay4 = Math.floor(Math.random() * 30) + 5
      this.busyDay5 = Math.floor(Math.random() * 30) + 5
    },
    selectTheDay (index) {
      this.selectedDay = index
      this.selectCompaniesForTheDay()
    },
    selectCompaniesForTheDay () {
      this.companiesForTheDay = []
      for (let i = 1; i < 5; i++) {
        let indexio = Math.floor(Math.random() * 10)
        this.companiesForTheDay.push(this.inspectors[this.chosenInspector].inspections[indexio].company)
      }
    }
  },
  created () {
    this.selectInspector()
  }
}
</script>

<style>
.selectedDay {
  background-color: black !important;
  color: white !important;
}

.busyDay {
  background-color: lightgrey;
}
</style>
