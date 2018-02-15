<template>
  <div>
    <!-- MAIN -->
    <div v-if="!doShowDetails">
      <!-- header -->
      <div class="pb-8 pt-6 flex items-center">
        <div class="p-3 border-black border bg-grey-lighter cursor-pointer">Sorted: by date</div>
        <div class="p-3 ml-4 border-black border hover:bg-grey-lightest cursor-pointer">Filter</div>
        <div class="flex-1"></div>
        <div>
          <select name="three" id="three" class="border-black border w-48 h-10 px-3" style="border-radius: 0">
            <option value="1">Latest week</option>
            <option value="1" selected>Latest 30 days</option>
            <option value="2">Latest 6 months</option>
            <option value="3">Custom...</option>
          </select>
        </div>
      </div>
      <!-- content -->
      <div class="pb-8 pt-2">
        <div class="text-xl font-bold pb-4">This week</div>
        <div  v-for="(inspection, i) in inspectors[selectedDetail].inspections"
              v-if="i < 7"
              :key="i"
              @click="chooseInspection(inspection)"
              class="flex border-black border-b py-3 text-sm hover:bg-grey-lightest cursor-pointer">
          <div class="flex-1">{{inspection.company}}</div>
          <div class="w-32 text-right">{{inspection.date}}</div>
          <div class="w-24 text-right"><span class="icon ion-checkmark-circled" v-if="inspection.status"></span></div>
        </div>
        <div class="text-xl font-bold pt-8 mt-2 pb-4">This month</div>
        <div  v-for="(inspection, i) in inspectors[selectedDetail].inspections"
              v-if="i > 7 && i < 15"
              :key="i"
              @click="chooseInspection(inspection)"
              class="flex border-black border-b py-3 text-sm hover:bg-grey-lightest cursor-pointer">
          <div class="flex-1">{{inspection.company}}</div>
          <div class="w-32 text-right">{{inspection.date}}</div>
          <div class="w-24 text-right"><span class="icon ion-checkmark-circled" v-if="inspection.status"></span></div>
        </div>
        <div class="text-xl font-bold pt-8 mt-2 pb-4">February</div>
        <div  v-for="(inspection, i) in inspectors[selectedDetail].inspections"
              v-if="i > 15"
              :key="i"
              @click="chooseInspection(inspection)"
              class="flex border-black border-b py-3 text-sm hover:bg-grey-lightest cursor-pointer">
          <div class="flex-1">{{inspection.company}}</div>
          <div class="w-32 text-right">{{inspection.date}}</div>
          <div class="w-24 text-right"><span class="icon ion-checkmark-circled" v-if="inspection.status"></span></div>
        </div>
      </div>
    </div>
    <!-- DETAILS -->
    <div v-else>
      <!-- header -->
      <div class="flex items-center">
        <div class="flex-1">
          <div class="text-2xl font-bold">
            {{inspection.inspector}}
          </div>
          <div class="pt-2">
            {{inspection.date}}
          </div>
        </div>
        <div>
          <span class="icon ion-checkmark-circled text-3xl" v-if="inspection.status"></span>
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
</template>

<script>
export default {
  props: [
    'inspectors',
    'selectedDetail',
    'doShowDetails'
  ],
  data () {
    return {
      inspection: [],
      messages: [],
      messageText: ''
    }
  },
  methods: {
    chooseInspection (inspection) {
      this.$emit('enterDetails')
      this.inspection = inspection
      this.messages = [
        {
          name: inspection.inspector,
          text: 'Is there any proper way to assign a name that is not on the list?'
        },
        {
          name: 'You',
          text: 'Have you tried entering it manually?'
        },
        {
          name: inspection.inspector,
          text: 'It didn\'t work for me'
        }
      ]
    },
    sendMessage () {
      this.messages.push({name: 'You', text: this.messageText})
      this.messageText = ''
    }
  },
  beforeDestroy () {
    this.$emit('leaveDetails')
  }
}
</script>

<style>

</style>
