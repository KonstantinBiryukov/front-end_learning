<template>
    <div class="home">
        <HelloWorld msg="Welcome to Phone Book App"/>
        <img alt="Vue logo" src="../assets/phonebook-logo.png">
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'home',
        components: {
            HelloWorld
        }
    }
</script>