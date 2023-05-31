<script setup>
import VanillaTilt from 'vanilla-tilt';
let {data: messages} = await useFetch("/api/messages")

</script>

<template>
  <div>
    <header>
        <NuxtLink to="/" id="link-back-messages" class="absolute">
            <Button icon="pi pi-angle-left" class="forefront" text></Button>
        </NuxtLink>
        <div class="flex align-items-center justify-content-around">
          <h2>BIRTHDAY MESSAGES</h2>
        </div>
    </header>
    <div>
      <!-- Need to connect to database -->
      <div class="flex flex-column align-items-center justify-content-around">
<!--         <Skeleton v-for="message in messages" width="50%" height="15rem" class="m-5" data-tilt data-tilt-max="15" data-tilt-scale="1.2"/>
 -->        
      <nuxt-img v-for="message in messages"
      :src="`/superchats/${message['name']}`" 
      quality="100" 
      class="m-5 w-9 sm:w-6" 
      format="png"
      loading="lazy"
      data-tilt 
      data-tilt-max="15" 
      data-tilt-scale="1.2" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
