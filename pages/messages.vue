<script setup>
let messages = ["Message 1", "Message 2", "Message 3"]
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
        <Skeleton v-for="message in messages" width="50%" height="15rem" class="m-5"/>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
