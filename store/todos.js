export const state = () => ({
  todos: [],
  userIdTodo: null
});

export const mutations = {
  setTodos(state, todos) {
    state.todos = todos;
  },
  setUserName(state, name) {
    state.userIdTodo = name;
  }
};

export const actions = {
  async fetch({ commit }) {
    const todos = await this.$axios.$get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    commit("setTodos", todos);
  },

  addUser({ commit }, name) {
    commit("setUserName", { name });
  }
};

export const getters = {
  todos: s => s.todos,
  name: s => s.userIdTodo
};
