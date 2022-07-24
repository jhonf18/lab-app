<template>
  <div>
    <b-form-input v-model="search" placeholder="Enter your name"></b-form-input>
    <b-button variant="success" @click="searchData">Button</b-button>
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
