const state = () => ({
  modals: {
    ad: false,
    simple: false
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
