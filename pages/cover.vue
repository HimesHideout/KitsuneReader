<script setup></script>

<template>
  <NuxtLink to="/" id="link-back-cover">
      <Button icon="pi pi-angle-left" class="forefront" text></Button>
  </NuxtLink>
  <div class="flex align-items-center justify-content-around h-screen">
      <NuxtLink to="/reader/1"><Button label="Start Reading" /></NuxtLink>
      <NuxtLink to="/chapters"><Button label="Chapters list" /></NuxtLink>
  </div>
</template>

<style scoped></style>
