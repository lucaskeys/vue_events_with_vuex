<template>
  <div>
    <h1>Uh-Oh!</h1>
    <h3>It looks like you're experiencing some network issues, please try again</h3>
    <router-link :to="{name: 'event-list'}">or go back to the home page</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>