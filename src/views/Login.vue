<template>
  <div class="login">
      <h3>lOGIN</h3>
      <input type="text" placeholder="Email"><br>
      <input type="password" placeholder="Password"><br>
      <button>Connection</button>
      <p>You don't have an account ? <router-link to='/signup'> You can create one</router-link></p>
  </div>
</template>

<script>
export default {
    name: 'login',
    data(){
        return {
        };
    },
    methods: {
    }
}
</script>

<style scoped>

</style>