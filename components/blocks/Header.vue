<template>
  <header class="header">
    <b-navbar toggleable="lg" type="dark" class="header-navbar">
    <b-navbar-brand to="/">Logo</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/search">Buscar</b-nav-item>
        <b-nav-item to="/about">Sobre nosotros</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar..."></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" variant="info" type="submit">
            Buscar
          </b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Idioma" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Usuario</em>
          </template>
          <b-dropdown-item href="#">Perfil</b-dropdown-item>
          <b-dropdown-item href="#">Salir</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
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
}

.header-navbar {
  background-color: #299c00;
}
</style>
