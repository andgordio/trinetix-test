<template>
  <div class="flex w-screen h-screen">
    <!-- LEFT PANE -->
    <div class="w-32 text-smm text-white pl-3 pr-4 flex flex-col" style="background-color: #000;">
      <div class="flex-1">
        <div class="pt-4">
          <img src="./../assets/icn-ava-company-invert.png" style="width: 40px;" alt="">
        </div>
        <div class="pt-8 mt-2 cursor-pointer" @click="selectedMaster = 'Companies'">
          <span class="pb-1" :class="{'border-b-2': selectedMaster === 'Companies'}">
            Companies
          </span>
        </div>
        <div class="pt-4 mt-2 cursor-pointer" @click="selectedMaster = 'Inspectors'">
          <span class="pb-1" :class="{'border-b-2': selectedMaster === 'Inspectors'}">
            Inspectors
          </span>
        </div>
        <div class="pt-4 mt-2 cursor-pointer" @click="selectedMaster = 'Notifications'">
          <span class="pb-1" :class="{'border-b-2': selectedMaster === 'Notifications'}">
            Notifications
          </span>
        </div>
      </div>
      <div class="pt-4 mt-2 text-grey-dark cursor-pointer" style="height: 64px; min-height: 64px" @click="$router.push('/homeinspector')">
        <span class="pb-1">
          swtich to Inspector app
        </span>
      </div>
    </div>

    <!-- CENTER PANE -->
    <div class="w-72 bg-grey-lightest">
      <div class="flex flex-col"> <!--v-if="selectedMaster === 'companies'"-->
        <div class="text-2xl font-bold pt-4 pb-4 px-6" style="height: 56px;">{{selectedMaster}}</div>
        <div class="overflow-scroll" style="height: calc(100vh - 56px);">
          <div v-if="selectedMaster === 'Companies'"  v-for="(company, i) in companies" @click="selectedDetail = i; selectedTab = 0" :key="i" class="flex items-center my-2 mx-3 px-3 py-4 cursor-pointer hover:bg-grey-lighter" :class="{'bg-grey-lighter': selectedMaster === 'Companies' && selectedDetail === i}">
            <div class="">
              <img src="./../assets/icn-ava-company.png" style="width: 40px;" alt="">
            </div>
            <div class="pl-4">
              <div class="text-lg font-bold">{{company.name}}</div>
              <div class="text-sm pt-1">{{company.inspections.length}} inspections</div>
            </div>
          </div>
          <div v-if="selectedMaster === 'Inspectors'"  v-for="(inspector, i) in inspectors" @click="selectedDetail = i; selectedTab = 0" :key="i" class="flex items-center my-2 mx-3 px-3 py-4 cursor-pointer hover:bg-grey-lighter"  :class="{'bg-grey-lighter': selectedMaster === 'Inspectors' && selectedDetail === i}">
            <div class="">
              <img src="./../assets/icn-ava-person.png" style="width: 40px;" alt="">
            </div>
            <div class="pl-4">
              <div class="text-lg">{{inspector.name}}</div>
              <div class="text-sm pt-1">{{inspector.inspections.length}} inspections</div>
            </div>
          </div>
          <div  v-if="selectedMaster === 'Notifications'"
                v-for="(notification, i) in notifications"
                @click="selectedDetail = i"
                :key="i"
                class="flex my-2 mx-3 px-3 py-4 cursor-pointer hover:bg-grey-lighter"
                :class="{'bg-grey-lighter': selectedMaster === 'Notifications' && selectedDetail === i}">
            <div class="" style="min-width: 20px; max-width: 20px;">
              <!-- <img v-if="notification.type === 'completed'" src="./../assets/icn-ava-company.png" style="width: 40px;" alt="">
              <img v-if="notification.type === 'texted'" src="./../assets/icn-ava-company.png" style="width: 40px;" alt=""> -->
              <span v-if="notification.type === 'completed'" class="icn ion-checkmark-circled text-2xl"></span>
              <span v-if="notification.type === 'texted'" class="icn ion-android-textsms text-2xl"></span>
            </div>
            <div class="pl-4">
              <div class="text" v-if="notification.type === 'completed'"><span class="font-bold">{{`${notification.inspector}`}}</span>{{` completed an inspection for ${notification.company}`}}</div>
              <div class="text" v-if="notification.type === 'texted'"><span class="font-bold">{{`${notification.inspector}`}}</span>{{` send a new message in an inspection for ${notification.company}`}}</div>
              <!-- <div class="text-sm pt-1">Subtitle</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT PANE -->
    <div class="flex-1">
      <div v-if="selectedMaster === 'Companies'">
        <div class="flex flex-col h-screen">
          <!-- main header -->
          <div class="pt-4 pb-4 px-8" style="height: 88px;" v-if="!doShowDetails">
            <div class="text-2xl font-bold">
              {{companies[selectedDetail].name}}
            </div>
            <div class="flex text-lg pt-6 border-black border-b" style="">
              <div class="mr-4 pb-1 border-black cursor-pointer" @click="selectedTab = 0" :class="{'border-b-2': selectedMaster === 'Companies' && selectedTab === 0}">
                Analytics
              </div>
              <div class="mr-4 pb-1 border-black cursor-pointer" @click="selectedTab = 1" :class="{'border-b-2': selectedMaster === 'Companies' && selectedTab === 1}">
                Inspections
              </div>
              <div class="mr-4 pb-1 border-black cursor-pointer" @click="selectedTab = 2" :class="{'border-b-2': selectedMaster === 'Companies' && selectedTab === 2}">
                Form
              </div>
            </div>
          </div>
          <!-- detail header -->
          <div v-else class="pt-4 pb-4 px-8 flex items-center" style="">
            <div class="cusor-pointer" @click="doShowDetails = false">
              <span class="icn ion-android-arrow-back text-2xl"></span>
            </div>
            <div class="text-lg font-bold pl-6">Details</div>
          </div>
          <div class="pt-4 px-8 overflow-scroll">
            <CompanyAnalytics   v-if="selectedTab === 0"/>
            <CompanyInspections v-if="selectedTab === 1"
                                @enterDetails="doShowDetails = true"
                                @leaveDetails="doShowDetails = false"
                                :doShowDetails="doShowDetails"
                                :companies="companies"
                                :selectedDetail="selectedDetail"/>
            <CompanyForm        v-if="selectedTab === 2"/>
          </div>
        </div>
      </div>
      <div v-if="selectedMaster === 'Inspectors'">
        <div class="flex flex-col h-screen">
          <!-- main header -->
          <div class="pt-4 pb-4 px-8" style="height: 56px; min-height: 56px;" v-if="!doShowDetails">
            <div class="text-2xl font-bold">
              {{inspectors[selectedDetail].name}}
            </div>
          </div>
          <!-- detail header -->
          <div v-else class="pt-4 pb-4 px-8 flex items-center" style="">
            <div class="cusor-pointer" @click="doShowDetails = false">
              <span class="icn ion-android-arrow-back text-2xl"></span>
            </div>
            <div class="text-lg font-bold pl-6">Details</div>
          </div>
          <!-- content -->
          <div class=" px-8 overflow-scroll">
            <InspectorInspections
                                @enterDetails="doShowDetails = true"
                                @leaveDetails="doShowDetails = false"
                                :doShowDetails="doShowDetails"
                                :inspectors="inspectors"
                                :selectedDetail="selectedDetail"/>
          </div>
        </div>
      </div>
      <div v-if="selectedMaster === 'Notifications'">
        <!-- <div class="flex flex-col">
          <div class="text-2xl font-bold pt-4 pb-4 px-6" style="height: 56px;">{{notifications[selectedDetail]}}</div>
        </div> -->
        <div class="px-6 py-4 h-screen overflow-scroll">
          <!-- header -->
          <div class="flex items-center">
            <div class="flex-1">
              <div class="text-2xl font-bold">
                {{notifications[selectedDetail].inspector}}
              </div>
              <div class="pt-2">
                {{notifications[selectedDetail].date}}
              </div>
            </div>
            <div>
              <span class="icon ion-checkmark-circled text-3xl" v-if="notifications[selectedDetail].status"></span>
              <span class="icon ion-ios-circle-outline text-3xl" v-else></span>
            </div>
          </div>
          <!-- content: answers -->
          <div>
            <div class="pt-8">
              <div class="font-bold">
                Waiter's name
              </div>
              <div class="pt-1">
                Paul Allen
              </div>
            </div>
            <div class="pt-8">
              <div class="font-bold">
                Describe quality of their greeting
              </div>
              <div class="pt-1">
                They were really nice, in time, showed me the variaty of available seats to choose from
              </div>
            </div>
            <div class="pt-8">
              <div class="font-bold">
                Rate service
              </div>
              <div class="pt-1">
                It was great
              </div>
            </div>
            <div class="pt-8">
              <div class="font-bold">
                Interior
              </div>
              <div class="pt-1">
                <img src="./../assets/icn-ava-company-big.png" style="width: 120px;" alt="">
              </div>
            </div>
          </div>
          <!-- content: discussion -->
          <div>
            <div class="text-lg font-bold pt-6 mt-8 border-black border-t">
              Discussion
            </div>
            <div class="flex pt-4" v-for="(message, mi) in messages" :key="mi">
              <div class="pr-4">
                <img src="./../assets/icn-ava-person.png" style="width: 40px;" alt="">
              </div>
              <div>
                <div class="font-bold">{{message.name}}</div>
                <div class="pt-1">{{message.text}}</div>
              </div>
            </div>
            <div class="flex pt-8 items-center pb-8">
              <div class="pr-4">
                <img src="./../assets/icn-ava-person.png" style="width: 40px;" alt="">
              </div>
              <div>
                <input @keyup.enter="sendMessage()" class="border-black border h-10 w-72 px-3" id="two" name="two" placeholder="Your message" type="text" v-model="messageText">
              </div>
              <div class="text-right pl-4" @click="sendMessage()">
                Send
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAB OVERLAY -->
    <div v-if="doShowFabOverlay">
      <div class="absolute pin-t pin-l w-screen h-screen" style="background-color: rgba(0,0,0,0.4)" @click="doShowFabOverlay = false"></div>
      <div class="absolute bg-white pin-r pin-b mr-8" style="margin-bottom: 100px;">
        <div v-if="this.selectedMaster === 'Companies' && this.selectedTab === 1">
          <div @click="doShowModal = true; modalMode = 'createManual'; doShowFabOverlay = false" class="px-4 py-4 cursor-pointer border-black border-b hover:bg-grey-lightest">
            <span class="icon ion-android-person-add text-xl pr-3"></span> Manually create new inspection
          </div>
          <div @click="doShowModal = true; modalMode = 'createWizard'; doShowFabOverlay = false" class="px-4 py-4 cursor-pointer hover:bg-grey-lightest">
            <span class="icon ion-wand text-xl pr-3"></span> Auto-create new inspections with Schedule Wizard
          </div>
        </div>
      </div>
    </div>

    <!-- FAB -->
    <div @click="fabClicked()" v-if="selectedMaster === 'Companies' && (selectedTab === 1 && !doShowDetails || selectedTab === 2)" class="absolute pin-r pin-b mr-8 mb-8 h-12 w-12 bg-black text-white flex items-center text-center rounded-full cursor-pointer">
      <div class="flex-1 text-center">
        <span v-if="selectedMaster === 'Companies' && selectedTab === 1" class="icon ion-plus text-2xl"></span>
        <span v-if="selectedMaster === 'Companies' && selectedTab === 2" class="icon ion-edit text-2xl"></span>
      </div>
    </div>

    <!-- MODAL -->
    <ModalView  v-if="doShowModal"
                :mode="modalMode"
                :inspectors="inspectors"
                @exit="doShowModal = false"/>
  </div>
</template>

<script>
import INSPECTIONS from './_INSPECTIONS.json'

import CompanyAnalytics from './CompanyAnalytics'
import CompanyInspections from './CompanyInspections'
import CompanyForm from './CompanyForm'
import InspectorInspections from './InspectorInspections'
import ModalView from './ModalView'

export default {
  name: 'HelloWorld',
  components: {
    CompanyAnalytics,
    CompanyInspections,
    CompanyForm,
    InspectorInspections,
    ModalView
  },
  data () {
    return {
      inspections: [],
      companies: [],
      inspectors: [],
      notifications: [],
      //
      selectedMaster: 'Companies',
      selectedDetail: 0,
      selectedTab: 0,
      doShowFabOverlay: false,
      doShowDetails: false,
      doShowModal: false,
      modalMode: 'createManual',
      //
      messageText: ''
    }
  },
  computed: {
    messages () {
      return [
        {
          name: this.notifications[this.selectedDetail].inspector,
          text: 'Is there any proper way to assign a name that is not on the list?'
        },
        {
          name: 'You',
          text: 'Have you tried entering it manually?'
        },
        {
          name: this.notifications[this.selectedDetail].inspector,
          text: 'It didn\'t work for me'
        }
      ]
    }
  },
  methods: {
    fabClicked () {
      if (this.selectedMaster === 'Companies' && this.selectedTab === 1) {
        this.doShowFabOverlay = !this.doShowFabOverlay
        console.log(`let's show some creation options`)
      } else if (this.selectedMaster === 'Companies' && this.selectedTab === 2) {
        console.log(`let's show some editing options`)
      }
    },
    sendMessage () {
      this.messages.push({name: 'You', text: this.messageText})
      this.messageText = ''
    }
  },
  created () {
    this.inspections = Array.from(INSPECTIONS)
    //
    let companiesNames = []
    let inspectorsNames = []
    for (let i in this.inspections) {
      companiesNames.push(this.inspections[i].company)
      inspectorsNames.push(this.inspections[i].inspector)
      // notifications
      if (i < 50) {
        if (Math.random() >= 0.5) {
          this.notifications.push({type: 'completed', company: this.inspections[i].company, inspector: this.inspections[i].inspector})
        } else {
          this.notifications.push({type: 'texted', company: this.inspections[i].company, inspector: this.inspections[i].inspector})
        }
      }
    }
    companiesNames = companiesNames.filter((item, pos) => companiesNames.indexOf(item) === pos)
    inspectorsNames = inspectorsNames.filter((item, pos) => inspectorsNames.indexOf(item) === pos)
    // let companies = []
    // let inspectors = []
    for (let i in companiesNames) {
      let company = {name: companiesNames[i], inspections: []}
      for (let j in this.inspections) {
        if (this.inspections[j].company === companiesNames[i]) {
          company.inspections.push({inspector: this.inspections[j].inspector, date: this.inspections[j].date, status: this.inspections[j].status})
        }
      }
      this.companies.push(company)
    }
    for (let i in inspectorsNames) {
      let inspector = {name: inspectorsNames[i], inspections: []}
      for (let j in this.inspections) {
        if (this.inspections[j].inspector === inspectorsNames[i]) {
          inspector.inspections.push({company: this.inspections[j].company, date: this.inspections[j].date, status: this.inspections[j].status})
        }
      }
      this.inspectors.push(inspector)
    }
    //
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// .selected {
//   background
// }
</style>
