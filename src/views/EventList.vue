<template>
  <div>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{name: 'event-list', query: {page: page - 1}}" rel="prev">Previous Page</router-link>
    </template> 
    <template v-if="hasNextPage"> | </template>
    <router-link v-if="hasNextPage" :to="{name: 'event-list', query: {page: page + 1}}" rel="next">Next Page</router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import {mapState} from 'vuex'
export default {

  components: {
    EventCard: EventCard
  },
  created() {
    this.perPage = 4
    this.$store.dispatch('fetchEvents', {
      perPage: this.perPage,
      page: this.page
    })
  },
  computed: {
    page() {
      // fetches the page you are on
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.eventsTotal > this.page * this.perPage
    },
  ...mapState(['events', 'eventsTotal'])
  } 
}

</script>

<style>

</style>