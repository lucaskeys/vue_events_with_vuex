import EventService from '@/services/EventService.js'

// this eleminiates naming collisions - so the module name is in front of where the actions are called in our components
export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},

}

export const mutations = {
  'ADD_EVENT': (state, event) => {
    state.events.push(event)
  },
  'SET_EVENTS': (state, events) => {
    state.events = events
  },
  'SET_EVENTS_TOTAL': (state, eventsTotal) => {
    state.eventsTotal = eventsTotal
  },
  'SET_EVENT': (state, event) => {
    state.event = event
  }
}
export const actions = {
fetchEvents({commit, dispatch}, {perPage, page})  {
  EventService.getEvents(perPage, page).then(response => {
    console.log('Totel Events are:' + response.headers['x-total-count'])
    commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
    commit('SET_EVENTS', response.data)
  }).catch(error => {
    const notification = {
      type: 'error',
      message: 'There was a problem fetching events: ' + error.message
    }
    dispatch('notification/add', notification, {root: true})
    // allows you to go to the root store, and run the add action
  })
},
createEvent({commit, dispatch}, payload) {
  return EventService.postEvent(payload).then(() => {
    commit('ADD_EVENT', payload)
    const notification = {
      type: 'success',
      message: 'Your event has been created!'
    }
    dispatch('notification/add', notification, {root: true})
    // allows you to go to the root store, and run the add action
  }).catch(error => {
    const notification = {
      type: 'error',
      message: 'There was a problem creating the event: ' + error.message
    }
    dispatch('notification/add', notification, {root: true})
    throw error
  })
},
fetchEvent({commit, dispatch, getters}, id) {
  let event = getters.getEventById(id)
  if(event) {
    commit('SET_EVENT', event)
    return event
    // returns event from action so that it can be passed in as a prop in the actions thats called in route guard
  } else {
    return EventService.getEvent(id)
    .then(response => {
      commit('SET_EVENT', response.data)
      return response.data
          // returns response from action so that it can be passed in as a prop in the actions thats called in route guard
    }).catch(error => {
      const notification = {
        type: 'error',
        message: 'There was a problem fetching event: ' + error.message
      }
      dispatch('notification/add', notification, {root: true})
      // allows you to go to the root store, and run the add action
    })
  }
}
}
export const getters = {

getEventById: state => id => {
  return state.events.find(event => event.id === id)
}
}