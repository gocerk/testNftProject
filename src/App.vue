<template>
  <w-app>
    <h1>Hello World !</h1>
    <counter/>
    <br>

    <!-- <div :v-for="nft in this.accountsNFT" :key="nft">
        <NftCard :nft="nft"/>
    </div> -->
  </w-app>
</template>

<script>
import { initialize, mint, getTokensOfAccount, getTotalSupply, balanceOf } from './Web3Client';
import counter from './components/counter.vue';
import { getImageWithMetadata } from './generateNFT';
// import NftCard from './components/NftCard.vue';

export default {  
  name: 'App',
  
  components: {
    counter,
    // NftCard
  },

  data() {
    return {
      nftCount: 0,
      accountsNFT: []
    }
  },

  async mounted() {
    await initialize();
  },
  
  async computed() {
    const tokens = await getTokensOfAccount();
    
      for(let x = 0; x<tokens.length; x++) {
        const nft = await getImageWithMetadata(tokens[x]);
        this.accountsNFT.push(nft);
      }

      console.log(this.accountsNFT);
  },

  methods: {
    mint,
    getTokensOfAccount,
    getTotalSupply,
    getImageWithMetadata
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
