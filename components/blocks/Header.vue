<template>
  <header class="header">
    <div>
      <nuxt-link to="/">
        <img src="~/static/logos/logo-gibim.jpg" alt="Logo" class="logo" id="logo-gibim">
      </nuxt-link>
    </div>

    <h1 class="title">Grupo de investigación en Bioquimica y Microbiología</h1>

    <a href="https://www.uis.edu.co/webUIS/es/index.jsp" target="_blank" >
      <img src="~/static/logos/logo-uis.png" alt="Logo de la universidad industrial de santander" class="logo">
    </a>
  </header>
</template>

<script>
export default {
  name: 'HeaderApp'
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #299c00;
}

.logo {
  width: 10em;
}

.title {
  font-size: 2em;
}

#logo-gibim {
  margin-left: 1em;
}
</style>
