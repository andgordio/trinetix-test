<template>
  <div>
    <div class="pb-8 pt-6">
      <div>
        <label for="one" class="block mb-1">Waiter's name</label>
        <input class="border-black border h-10 w-full px-3 mb-4" id="one" name="one" placeholder="Name" type="text">
      </div>
      <div class="mt-6">
        <label for="two" class="block mb-1">Describe quality of their greeting</label>
        <input class="border-black border h-10 w-full px-3 mb-4" id="two" name="two" placeholder="What language did they use? Did you have to wait?" type="text">
      </div>
      <div class="mt-6">
        <label for="three" class="block mb-1">Rate service</label>
        <select name="three" id="three" class="border-black border h-10 w-full px-3 mb-4" style="border-radius: 0">
          <option value="1" disabled>Select an options that better describes your impression</option>
          <option value="1">It wasn't fine</option>
          <option value="2">It was fine</option>
          <option value="3">It was great</option>
        </select>
      </div>
      <div class="mt-6">
        <label for="three" class="block mb-1">Interior</label>
        <div class="flex items-center border-black border w-48 h-48 cursor-pointer hover:bg-grey-lightest">
          <div class="text-center flex-1">
            Upload image...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
