<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/horarios">Horário Busão</router-link> | 
      <router-link to="/opcao">Opção</router-link>
    </div>
    <div data-app>
       <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #202122;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #202122;

    &.router-link-exact-active {
      color: #e6b01b;
    }
  }
}
</style>
