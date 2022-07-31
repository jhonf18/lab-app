<template>
  <main>
    <form @submit.prevent="onLogin" v-if="false">
      <div>
        <label for="email">Email</label>
        <input
          placeholder="example@uis.edu.co"
          type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input placeholder="********" type="password" required v-model="password" id="password">
      </div>
      <div>
        <button type="submit">Iniciar sesión</button>
      </div>
    </form>
    <h2>Inicia sesión con Google</h2>
    <section id="firebaseui-auth-container"></section>
  </main>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider } from '@/plugins/utils/firebase';
import "firebaseui/dist/firebaseui.css";

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  mounted(){
    const firebaseui = require('firebaseui')

    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
        ui = new firebaseui.auth.AuthUI(getAuth());
    }
    let uiConfig = {
        signInSuccessUrl: "/add-metabolitos",
        signInOptions: [GoogleAuthProvider.PROVIDER_ID]
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  },
  methods: {
    onLogin(){
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..

          console.log(error)
        });
    },
  }
}
</script>

<style scoped>
main {
  min-height: 70vh;
  max-width: 1140px;
  width: 100%;
  margin: 0 auto;
  padding-top: 3em;
}

form {
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

form div {
  width: 100%;
  margin-bottom: 1.5em;
}

form div input,
form div button {
  width: 100%;
  padding: .5em 1em;
  border-radius: .15em;
  border: 1px solid gray;
  outline: none;
}

form div button {
  background-color: #4aee0f;
  border: 1px solid #4aee0f;
  font-weight: bold;
  color: #5c5c5c;
  transition: all 1s easy;
}

form div button:hover {
  background-color: #36c203;
  color: #ebe7e7;
}


h2 {
  text-align: center;
  margin-bottom: 2em;
}


</style>
