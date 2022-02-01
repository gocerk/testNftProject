<template>
  <div>
    <h1>Hello World !</h1>
    <button @click="mint(1)">Mint</button>
  </div>
</template>

<script>
import { initialize, mint, getTokensOfAccount, getTotalSupply, balanceOf } from './Web3Client2';

export default {
  name: 'App',
  
  async mounted() {
    await initialize();
    await getTokensOfAccount();
    await getTotalSupply();
    await balanceOf();
  },


  methods: {
    mint,
    getTokensOfAccount,
    getTotalSupply
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
