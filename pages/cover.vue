<script setup></script>

<template>
  <div class="h-screen">
    <header>
      <NuxtLink to="/" id="link-back-cover" class="absolute">
          <Button icon="pi pi-angle-left" class="forefront" text></Button>
      </NuxtLink>
      <div class="flex align-items-center justify-content-around">
        <h2>ZERO CARDS, OVER</h2>
      </div>
    </header>
    <div class="flex flex-column justify-content-around content">
      <div class="main_card flex align-items-center mx-8 my-4">
        <Card>
          <template #title>
            <p>Happy Birthday Hime!</p>
          </template>
          <template #content>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam incidunt architecto voluptates inventore, dignissimos eveniet soluta debitis sunt neque minima porro cumque alias sequi asperiores tempora laborum, harum dolore ab.
            </p>
          </template>
        </Card>
      </div>
      <div class="flex flex-wrap align-items-center justify-content-around low_buttons">
          <NuxtLink to="/reader/1" class="low_button"><Button label="Reader page" /></NuxtLink>
          <NuxtLink to="/chapters" class="low_button my-2 sm:my-0"><Button label="Chapters list" /></NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
header {
  height: 20%;
}

.main_card {
  height: 60%;
}

.content {
  height: 80%;
}

.low_buttons {
  height: 10%;
}

.low_button {
  min-width: 7em;
}
</style>
