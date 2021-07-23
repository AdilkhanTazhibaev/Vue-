export const state = () => ({
  todo: {}
});

export const mutations = {
  setTodo(state, todo) {
    state.todo = todo;
  }
};

export const actions = {
  async fetch({ commit }, id) {
    console.log(id);
    let todo = await this.$axios.$get(
      "https://jsonplaceholder.typicode.com/todos?id=" + id
    );

    commit("setTodo", todo);
  }
};

export const getters = {
  todo: s => s.todo
};
