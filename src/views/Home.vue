<template>
  <h1>Stock Market</h1>
  <ul>
    <li v-for="stock in store.state.stock_list" :key="stock">
      <router-link :to="{ name: 'Price', params: { ticker: stock.ticker }}">{{ stock.name }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()

    return { store }
  }

});
</script>
