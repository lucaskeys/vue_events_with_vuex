export const namespaced = true;

export const state = {
  notifications: []
}
let nextId = 1; 
export const mutations = {
  'PUSH'(state, notification) {
    console.log(notification)
    state.notifications.push({
      ...notification,
      id: nextId++
      // adding an id to it
    })
  },
  'DELETE'(state, notificationToRemove) {
    console.log(notificationToRemove)
    state.notifications = state.notifications.filter((notification) => {
      notification.id !== notificationToRemove.id
    })
  }
}

export const actions = {
  add({commit}, notification) {
    commit('PUSH', notification)
  },
  remove({commit}, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  }
}