<script setup>
import VanillaTilt from 'vanilla-tilt';
const messageRefs = ref([]);
let {data: messages} = await useFetch("/api/messages")

let columns = [[], [], []]

let column = 0
for (let message of messages.value) {
  columns[column].push(message)
  column = (column + 1) % 3
}

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
    <div class="flex flex-column md:flex-row">
      <div class="flex flex-column" v-for="n in 3">
          <nuxt-img v-for="message in columns[n - 1]"
          ref="messageRefs"
          :src="`/superchats/${message['name']}`" 
          quality="100" 
          class="image-item m-3 w-10 align-self-center" 
          format="png"
          loading="lazy"
          />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
