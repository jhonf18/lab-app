<template>
  <main>
    <InputSearch></InputSearch>
    <h6>Resumen metabolito</h6>
    <h1>{{ metabolito.CompoundName }} </h1>
    <ul>
      <li v-for="(item, key, i) in metabolito" :key="i">
        <span v-if="item && key">
          <svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="okIconTitle" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"> <title id="okIconTitle">Ok</title> <polyline points="4 13 9 18 20 7"/> </svg>
        </span>
        <span v-if="item && key" style="font-weight: 600">
          {{ key }}:
        </span>
        <span>
          {{ item }}
        </span>
      </li>
      <li v-if="literatures.length !== 0">
        <span>
          <svg width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="okIconTitle" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"> <title id="okIconTitle">Ok</title> <polyline points="4 13 9 18 20 7"/> </svg>
        </span>
          <span style="font-weight: 600">
            Literatura:
          </span>
          <ul>
            <li v-for="(literature, keyLiterature, i) in literatures" :key="i">
              <ul>
                <li v-for="(item, key , j) in literature" :key="j + literature.organism_type">

                  <span v-if="item && key" style="font-weight: 600">
                    {{ key }}:
                  </span>
                  <span v-if="item && key !== 'reference'">
                    {{ item }}
                  </span>
                  <a v-if="item && key == 'reference'" :href="item" target="_blank">
                    {{ item }}
                  </a>
                </li>
              </ul>
              <hr>
            </li>
          </ul>
        </li>
    </ul>
  </main>
</template>

<script>
export default {
  name: 'ResultsPage',
  data(){
    return {
      isFound: true,
      metabolito: {
        literatures: [],
        BiologicalActivity: '',
        OrganismType: '',
        Reference: ''
      },
      literatures: []
    }
  },
  created() {
    if (process.client){
      this.findMetabolito()
    }
  },
  methods: {
    findMetabolito() {
      const PCID = this.$route.query.PCID
      const data = JSON.parse(localStorage.getItem('metabolitos'))
      for(let i = 0; i < data.length; i++) {
        if(data[i].PCID == PCID) {
          this.metabolito = data[i]
          this.literatures = this.metabolito.literatures;
          delete this.metabolito.literatures;
          break
        }
      }

      if (!this.metabolito || this.metabolito == {})
        isFound = false
    }
  },
  watch: {
    $route(to, from) {
      this.findMetabolito();
    }
  }
}
</script>

<style scoped>
main {
  max-width: 1140px;
  margin: 0 auto;
  padding-top: 1em;
  margin-bottom: 3em;
}

h6 {
  margin-top: 2.5em;
  margin-bottom: 1.5em;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  margin-left: 1em;
  margin-top: 1em;
}
ul li span,
ul li a {
  font-size: 1.4em;
}
</style>
