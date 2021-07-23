<template>
  <div>
    <div
      v-for="todoItem in todo"
      :key="todoItem.id"
      class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
    >
      <div class="md:flex">
        <div class="p-8">
          <div
            class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
          >
            Author {{ todoItem.userId }}
          </div>
          <p class="block mt-1 text-lg leading-tight font-medium text-black">
            {{ todoItem.title }}
          </p>

          <button
            @click.prevent="back"
            class="py-2 my-5 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          >
            Назад
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch({ store, params }) {
    await store.dispatch("todo/fetch", params.id);
  },
  computed: {
    todo() {
      return this.$store.getters["todo/todo"];
    }
  },
  methods: {
    back() {
      this.$router.push("/todos/");
    }
  }
};
</script>
