<template>
    <div>
        <h1>{{ counter }}</h1>
        <w-flex justify-center align-center >
            <w-button class="ma2 white" bg-color="black" @click="this.increment()">Increment</w-button>
            <w-button class="ma2 white" bg-color="black" @click="this.decrement()">Decrement</w-button>
        </w-flex>
        <p id="warningMessage"></p>
        <w-button id="mint" class="ma3">Mint!</w-button>
    </div>
</template>

<script>
import { mint } from '../Web3Client';

export default {
    name: 'Counter',
    data() {
        return {
            counter: 0
        }
    },

    methods: {
        increment,
        decrement,
        mint
    },

    mounted() {
        document.getElementById('mint').addEventListener('click', async () => {
            if(this.counter != 0) {
                await mint(this.counter);
            } else {
                document.getElementById('warningMessage').innerHTML = 'You must mint at least 1 NFT';
            }
        });
    }
}


function increment() {
    if(this.counter < 5) {
        this.counter++;
    }

    if(this.counter == 5) {
        const warningMessage = document.getElementById('warningMessage');
        warningMessage.innerHTML = 'You can only increment the counter up to 5';
        console.log('You can only increment the counter up to 5');
    }
}

function decrement() {
    const warningMessage = document.getElementById('warningMessage');
    if(this.counter > 0) {
        warningMessage.innerText = '';    
        this.counter--;
    }
}


</script>

