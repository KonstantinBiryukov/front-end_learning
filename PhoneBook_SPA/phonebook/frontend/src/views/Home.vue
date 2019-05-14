<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/phonebook-logo.png">
    <HelloWorld msg="Welcome to Phone Book App"/>
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
