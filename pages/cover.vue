<script setup></script>

<template>
  <header>
      <NuxtLink to="/" id="link-back-cover">
          <Button icon="pi pi-angle-left" class="forefront" text></Button>
      </NuxtLink>
    </header>
    <div class="main_card">
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
    <div class="flex align-items-center justify-content-around low_buttons">
        <NuxtLink to="/reader/1"><Button label="Reader page" /></NuxtLink>
        <NuxtLink to="/chapters"><Button label="Chapters list" /></NuxtLink>
    </div>
  </div>
</template>

<style scoped>
header {
  height: 20%;
}

.main_card {
  height: 70%;
}

.low_buttons {
  height: 10%;
}
</style>
