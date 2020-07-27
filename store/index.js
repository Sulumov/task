const state = () => ({
  modals: {
    ad: false,
    modal: false,
    addTask: false
  }
});

const mutations = {
  toggleModal: (state, data = {
    name: "",
    state: false
  }) => {
    state.modals[data.name] = data.state
  }
}

export default {
  state,
  mutations
}
