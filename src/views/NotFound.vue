<template>
  <div class="container">
    <h1>Ooops!</h1>
    <h3>The {{resource}} you're looking for is not here!</h3>
    <router-link :to="{name: 'event-list'}">Go Back</router-link>
  </div>
</template>

<script>
export default {
  props: ['resource']
}
</script>

<style>

</style>