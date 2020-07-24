<template>
  <div>
    <h1>Events for {{user.user.name}}</h1>
    <!-- user.user = module name and then the state name -->
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <!-- event.events references module event we are importing and the events state from that import -->
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
    this.perPage =6
    this.$store.dispatch('event/fetchEvents', {
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
      return this.event.eventsTotal > this.page * this.perPage
    },
    // event and user are the modules name you are importing
  ...mapState(['event', 'user'])
  // mapstate all import event and need to access the object inside
  } 
}

</script>

<style>

</style>