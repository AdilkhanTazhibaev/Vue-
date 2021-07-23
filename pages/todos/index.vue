<template>
  <div>
    <div
      class="md:flex flex-col md:flex-row md:min-h-screen w-full justify-center"
    >
      <div
        class="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0"
        x-data="{ open: false }"
      >
        <div
          class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between"
        >
          <a
            href="#"
            class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
            >Todos</a
          >

          <button
            class="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline"
          >
            <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
              <path
                x-show="!open"
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
              <path
                x-show="open"
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <nav class="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
          <div>
            <a
              v-for="(res, id) in userTodos"
              :key="`${id}${res.id}`"
              @click.prevent="addName(res.userId)"
              class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              href="#"
            >
              User {{ res.userId }}</a
            >
            <button
              @click.prevent="home"
              class="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            >
              Домой
            </button>
          </div>
        </nav>
      </div>
      <div v-if="$store.getters['todos/name'] !== null" class="">
        <div
          v-for="(todo, id) in todos"
          :key="`${id}+${todo.id}`"
          class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-3"
          v-show="todo.userId === $store.getters['todos/name'].name"
        >
          <div class="md:flex ">
            <div class="p-8">
              <div
                class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
              >
                Author {{ todo.userId }}
              </div>
              <p href="#" class=" block mt-1 text-lg  font-medium text-black">
                {{ todo.title }}
              </p>
              <p class="mt-2 text-gray-500">
                <button
                  @click.prevent="openTodos(todo)"
                  class="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                >
                  Посмотреть
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          v-for="(todo, id) in todos"
          :key="`${id}+${todo.id}`"
          class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-3"
        >
          <div class="md:flex ">
            <div class="p-8">
              <div
                class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
              >
                Author {{ todo.userId }}
              </div>
              <p href="#" class=" block mt-1 text-lg  font-medium text-black">
                {{ todo.title }}
              </p>
              <p class="mt-2 text-gray-500">
                <button
                  @click.prevent="openTodos(todo)"
                  class="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                >
                  Посмотреть
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      v-for="(res, id) in userTodos"
      :key="`${id}${res.id}`"
      @click.prevent="addName(res.userId)"
    >
      {{ res.userId }}
    </button>
  </div>
</template>

<script>
export default {
  async fetch({ store }) {
    if (store.getters["todos/todos"].length === 0) {
      await store.dispatch("todos/fetch");
    }
  },
  computed: {
    todos() {
      return this.$store.getters["todos/todos"];
    },
    userTodos() {
      let data = this.$store.getters["todos/todos"];
      let resArr = [];
      data.filter(function(item) {
        let i = resArr.findIndex((x) => x.userId == item.userId);
        if (i <= -1) {
          resArr.push(item);
        }
        return null;
      });
      return resArr;
    },
  },
  methods: {
    openTodos(todo) {
      this.$router.push("/todos/" + todo.id);
    },
    addName(name) {
      this.$store.dispatch("todos/addUser", name);
    },
    home() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>
