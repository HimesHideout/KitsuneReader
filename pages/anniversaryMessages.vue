<script setup>
import VanillaTilt from 'vanilla-tilt';
const messageRefs = ref([]);
let {data: messages} = await useFetch("/api/messages")
onMounted(()=>{
  for(let reference of messageRefs.value){
    VanillaTilt.init(reference.$el, {
      max: 2,
      scale: 1.15
    });
  }  
})
</script>

<template>
  <div>
    <header>
        <NuxtLink to="/" id="link-back-messages" class="absolute">
            <Button icon="pi pi-angle-left" class="forefront" text></Button>
        </NuxtLink>
        <div class="flex align-items-center justify-content-around">
          <h2>ANNIVERSARY MESSAGES</h2>
        </div>
    </header>
    <div>
      <div class="flex flex-row flex-wrap align-items-center justify-content-evenly gap-1">
       
      <nuxt-img v-for="message in messages"
      ref="messageRefs"
      :src="`/superchats/${message['name']}`" 
      quality="100" 
      class="m-5 w-3 flex-grow-1 flex-shrink-1" 
      format="png"
      loading="lazy"
      />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
