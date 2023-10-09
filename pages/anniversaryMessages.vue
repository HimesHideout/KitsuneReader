<script setup>
let {data: messages} = await useFetch("/api/anniversary")

let columns = [[], [], []]

let column = 0
for (let message of messages.value) {
  columns[column].push(message)
  column = (column + 1) % 3
}
</script>

<template>
  <div
    class="bg-image"
    style="background-image: url('/images/effects/Dark_Starry_Sky.svg');
    background-size: cover;
    background-attachment: fixed;"
  >
    <header>
        <NuxtLink to="/" id="link-back-messages" class="absolute">
            <Button icon="pi pi-angle-left" class="forefront" text></Button>
        </NuxtLink>
        <div class="flex align-items-center justify-content-around">
          <h2>ANNIVERSARY MESSAGES</h2>
        </div>
    </header>
    <div class="flex flex-column md:flex-row justify-content-evenly gap-3">
      <div class="flex flex-column" v-for="n in 3">
        <!-- Yes, we're using 2 nested image components to take advantage of
        PrimeVue's preview feature. -->
        <!-- The rotate & zoom buttons on preview are hidden since 
          they require more work to work with the custom preview elements. -->
          <Image v-for="message in columns[n - 1]"
              class="flex flex-column"
              preview
              :pt="{
              rotateRightButton: {class: 'hidden'},
              rotateLeftButton: {class: 'hidden'},
              zoomInButton: {class: 'hidden'},
              zoomOutButton: {class: 'hidden'}
              }"
          >
            <template #image>
              <nuxt-img
              :src="`/anniversary/${message['name']}`" 
              quality="100" 
              class="my-3 w-12 align-self-center" 
              format="png"
              loading="lazy"
              />
            </template>
            <template #preview>
              <div class="flex flex-column">
                <nuxt-img
                :src="`/anniversary/${message['name']}`" 
                quality="100" 
                class="h-full max-w-full align-self-center"
                format="png"
                loading="lazy"
                @click="onPreviewImageClick"
                />
              </div>
            </template>
          </Image>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
