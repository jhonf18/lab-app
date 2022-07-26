<template>
  <div class="index-search">
    <h2 class="title-search">Explore Chemistry</h2>
    <form @submit.prevent="searchData" class="search-form">
      <div class="search-container">
        <div class="search-input-container">
          <input type="text" v-model="search" placeholder="Buscar...">
          <div>

          </div>
        </div>
        <div class="search-button-container">
          <button type="submit">Buscar</button>
        </div>
      </div>
    </form>
    <div v-for="metabolito in results" :key="metabolito.PCID">
      <div class="mt-2 mb-2">
        {{ metabolito.Compound_Name }}
      </div>
    </div>
  </div>
</template>

<script>
import { database, ref, child, get } from '@/plugins/utils/firebase';

export default {
  name: 'IndexPage',
  data(){
    return {
      search: '',
      results: []
    }
  },
  created() {
    const dbRef = ref(database);
    get(child(dbRef, `Metabolitos/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let arrayData = []
        for(let key in data) {
          let obj = data[key];
          arrayData.push(obj);
        }
        localStorage.setItem('metabolitos', JSON.stringify(arrayData))
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    let num = '12323ped'
    console.log(!Number(num) ? 'yes' : 'no')
  },
  methods: {
    searchData() {
      const data = JSON.parse(localStorage.getItem('metabolitos'))

      const search = this.$normalize(this.search.toLowerCase());
      this.results = data.filter( item => {
        let searchBy;
        console.log(Number(search))
        if (!Number(search)) {
          searchBy = 'Organism'
        } else {
          searchBy = 'PCID'
        }
        const name = this.$normalize(item[searchBy].toLocaleLowerCase());
        return name.includes(search);
      })

    }
  }
}
</script>

<style scoped>
.index-search {
  background-image: url('~/static/assets/background.jpg');
  background-attachment: scroll;
  background-size: cover;
  background-repeat: no-repeat;
  filter: hue-rotate(316deg);
  min-height: 80vh;
  background-blend-mode: saturation;
  padding-top: 4em;
}

.search-form {
  width: 100%;
  padding-top: 5em;
}

.title-search {
  text-align: center;
  font-size: 4em;
  color: aliceblue;
}

.search-container {
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.search-input-container {
  width: 70%;
}

.search-input-container input {
  width: 100%;
  padding: .5em 1em;
  border: none;
  border: 1px solid gray;
  border-radius: .2em;
  font-size: 1.4em;
}

.search-input-container input:active,
.search-input-container input:focus {
  border: 1px solid gray;
  outline: none;
}

.search-button-container {
  width: 25%;
}

.search-button-container button{
  padding: 0.5em 1em;
  border: 1px solid gray;
  border-radius: .5em;
}
</style>
