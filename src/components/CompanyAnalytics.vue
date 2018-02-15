<template>
  <div>
    <div class="pb-8 pt-6 flex items-center">
      <div class="p-3 border-black border hover:bg-grey-lightest cursor-pointer">Filter</div>
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
    <div>
      <img src="./../assets/img-analytics.png" style="width: 452px;" alt="">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
