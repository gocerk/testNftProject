<template>
    <w-card :image="nft.image">
        {{ nft.name }}
        <div class="spacer"></div>
        {{ nft.description }}
    </w-card>
</template>


<script>
export default {
    name: 'NftCard',

    props: {
        nft: {
            type: Array,
            required: true
        }
    }
}
</script>