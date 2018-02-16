<template>
  <div class="flex w-screen h-screen">
    <!-- LEFT PANE -->
    <div class="w-32 text-smm text-white pl-3 pr-4 flex flex-col" style="background-color: #000;">
      <div class="flex-1">
        <div class="pt-4">
          <img src="./../assets/icn-ava-company-invert.png" style="width: 40px;" alt="">
        </div>
        <div class="pt-4 mt-2 cursor-pointer" @click="selectedMaster = 'Inspections'">
          <span class="pb-1" :class="{'border-b-2': selectedMaster === 'Inspections'}">
            Inspections
          </span>
        </div>
        <div class="pt-4 mt-2 cursor-pointer" @click="selectedMaster = 'Notifications'">
          <span class="pb-1" :class="{'border-b-2': selectedMaster === 'Notifications'}">
            Notifications
          </span>
        </div>
      </div>
      <div class="pt-4 mt-2 text-grey-dark cursor-pointer" style="height: 64px; min-height: 64px" @click="$router.push('/')">
        <span class="pb-1">
          swtich to Planner app
        </span>
      </div>
    </div>

    <!-- CENTER PANE -->
    <div class="w-72 bg-grey-lightest">
      <div class="flex flex-col"> <!--v-if="selectedMaster === 'companies'"-->
        <div class="text-2xl font-bold pt-4 pb-4 px-6" style="height: 56px;">{{selectedMaster}}</div>
        <div class="overflow-scroll" style="height: calc(100vh - 56px);">
          <!-- INspections -->
          <div v-if="selectedMaster === 'Inspections'">
            <!-- header -->
            <div class="pb-8 pt-6 px-6 flex items-center">
              <div class="p-3 border-black border bg-grey-lighter cursor-pointer">Sorted: by date</div>
              <div @click="filterPressed()" class="p-3 ml-4 border-black border hover:bg-grey-lightest cursor-pointer" :class="{selected: !isCompleteList}">Filter</div>
            </div>
            <!-- list -->
            <div  v-for="(inspection, i) in inspections" @click="selectedDetail = i; selectedTab = 0" :key="i" class="flex items-center my-2 mx-3 px-3 py-4 cursor-pointer hover:bg-grey-lighter" :class="{'bg-grey-lighter': selectedMaster === 'Inspections' && selectedDetail === i}">
              <div class="" style="min-width: 40px; max-width: 40px;">
                <img src="./../assets/icn-ava-company.png" style="width: 40px;" alt="">
              </div>
              <div class="pl-4 flex-1">
                <div class="text-lg font-bold">{{inspection.company}}</div>
                <div class="text-sm pt-1">{{inspection.date}}</div>
              </div>
              <div>
                <span class="icn ion-checkmark-circled text-xl" v-if="inspection.status"></span>
                <span class="icn ion-ios-circle-outline text-xl" v-else></span>
              </div>
            </div>
          </div>
          <!-- Notifications -->
          <div v-if="selectedMaster === 'Notifications'">
            <!-- list -->
            <div  v-for="(notification, i) in notifications"
                  @click="selectedDetail = i"
                  :key="i"
                  class="flex my-2 mx-3 px-3 py-4 cursor-pointer hover:bg-grey-lighter"
                  :class="{'bg-grey-lighter': selectedMaster === 'Notifications' && selectedDetail === i}">
              <div class="" style="min-width: 20px; max-width: 20px;">
                <!-- <img v-if="notification.type === 'completed'" src="./../assets/icn-ava-company.png" style="width: 40px;" alt="">
                <img v-if="notification.type === 'texted'" src="./../assets/icn-ava-company.png" style="width: 40px;" alt=""> -->
                <span v-if="notification.type === 'scheduled'" class="icn ion-android-calendar text-2xl"></span>
                <span v-if="notification.type === 'texted'" class="icn ion-android-textsms text-2xl"></span>
              </div>
              <div class="pl-4">
                <div class="text" v-if="notification.type === 'scheduled'"><span class="font-bold">{{`Trip planner`}}</span>{{` scheduled an inspection for ${notification.company}`}}</div>
                <div class="text" v-if="notification.type === 'texted'"><span class="font-bold">{{`Trip planner`}}</span>{{` send a new message in an inspection for ${notification.company}`}}</div>
                <!-- <div class="text-sm pt-1">Subtitle</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT PANE -->
    <div class="flex-1">
      <!-- INspections -->
      <div v-if="selectedMaster === 'Inspections'">
        <div class="flex flex-col h-screen">
          <!-- main header -->
          <div class="pt-4 pb-4 px-8" style="height: 88px; min-height: 88px;">
            <div class="text-2xl font-bold">
              {{inspections[selectedDetail].company}}
            </div>
            <div class="pt-2">
              {{inspections[selectedDetail].date}}
            </div>
          </div>
          <div class="px-8 overflow-scroll">
            <!-- complete -->
            <div v-if="inspections[selectedDetail].status">yes</div>
            <!-- INcomplete -->
            <div v-if="!inspections[selectedDetail].status">no</div>
          </div>
        </div>
      </div>
      <div v-if="selectedMaster === 'Notifications'">
        <div class="px-6 py-4 h-screen overflow-scroll">
          <!-- header -->
          <div class="flex items-center">
            <div class="flex-1">
              <div class="text-2xl font-bold">
                {{notifications[selectedDetail].company}}
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
  </div>
</template>

<script>
import INSPECTIONS from './_INSPECTIONS.json'

export default {
  data () {
    return {
      inspections: [],
      isCompleteList: true,
      notifications: [],
      messages: [
        {
          name: 'Trip Planner',
          text: 'Is there any proper way to assign a name that is not on the list?'
        },
        {
          name: 'You',
          text: 'Have you tried entering it manually?'
        },
        {
          name: 'Trip Planner',
          text: 'It didn\'t work for me'
        }
      ],
      //
      selectedMaster: 'Inspections',
      selectedDetail: 0
    }
  },
  computed: {
    //
  },
  methods: {
    filterAll () {
      this.inspections = Array.from(INSPECTIONS).filter(item => item.inspector === 'Adrianna Leele')
      this.isCompleteList = true
    },
    filterIncomplete () {
      this.inspections = Array.from(INSPECTIONS).filter(item => item.inspector === 'Adrianna Leele' && !item.status)
      this.isCompleteList = false
    },
    filterPressed () {
      if (this.isCompleteList) {
        this.filterIncomplete()
      } else {
        this.filterAll()
      }
    },
    sendMessage () {
      this.messages.push({name: 'You', text: this.messageText})
      this.messageText = ''
    }
  },
  created () {
    this.filterAll()
    for (let i in this.inspections) {
      if (i < 20) {
        if (Math.random() >= 0.5) {
          this.notifications.push({type: 'scheduled', company: this.inspections[i].company, date: this.inspections[i].date})
        } else {
          this.notifications.push({type: 'texted', company: this.inspections[i].company, date: this.inspections[i].date})
        }
      }
    }
  }
}
</script>

<style>
.selected {
  background-color: black;
  color: white;
}
.selected:hover {
  background-color: black !important;
  color: white;
}
</style>
