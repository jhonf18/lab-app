<template>
  <form @submit.prevent="searchData" class="search-form">
    <div class="search-container">
      <div class="search-input-container">
        <input type="search"
          :value="search" placeholder="Buscar..."
          @input="onChange" @focus="onFocus">
      </div>
      <div class="search-button-container">
        <button type="submit">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </span>
        </button>
      </div>
      <div class="results" v-show="isOpen && results.length !== 0">
        <ul>
          <li @click="onClickLink" v-for="metabolito in results" :key="metabolito.PCID">
            <nuxt-link
              class="link-results" :to="'/results?PCID=' + metabolito.PCID">
              {{ metabolito.CompoundName }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'InputSearch',
  data(){
    return {
      search: '',
      results: [],
      isOpen: false
    }
  },
  methods: {
    searchData() {
      const data = JSON.parse(localStorage.getItem('metabolitos'))

      const search = this.$normalize(this.search.toLowerCase());
      this.results = data.filter( item => {
        let name = '';
        if (!Number(search)) {
          if (item.literatures) {

            name = this.$normalize(item.literatures[0].organism_type.toLocaleLowerCase());
          } else {
            name = '**--**'
          }
        } else {
          name = this.$normalize(item.PCID.toLocaleLowerCase());
        }
        return name.includes(search);
      })

    },
    onChange(e) {
      this.search = e.target.value

      if (this.search === '') {
        this.isOpen = false
        this.results = []
      } else {
        this.searchData()
        this.isOpen = true
      }
    },
    onFocus() {
      if (this.results.length !== 0) {
        this.isOpen = true
      }
    },
    onClickLink() {
      this.isOpen = false
      this.search = ''
      this.results = []
    }
  }
}
</script>

<style scoped>
.search-form {
  width: 100%;
  padding-top: 5em;
}


.search-container {
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.search-input-container {
  width: calc(100% - 80px);
}

.search-input-container input {
  width: 100%;
  padding: .5em 1em;
  border: none;
  border: 1px solid gray;
  border-top-left-radius: .2em;
  border-bottom-left-radius: .2em;
  font-size: 1.4em;
}

.search-input-container input:active,
.search-input-container input:focus {
  border: 1px solid gray;
  outline: none;
}

.search-button-container {
  width: 80px;
}

.search-button-container button{
  width: 100%;
  padding: 0.5em 1em;
  border: 1px solid gray;
  border-left: none;
  border-top-right-radius: .5em;
  border-bottom-right-radius: .5em;
  margin-left: -1px;
  height: 100%;
  background-color: #4aee0f;
}

.search-button-container button:hover {
  background-color: #44ff00;
}

.search-button-container button span {
  font-size: 1.4em;
}

.results {
  background-color: white;
  position: absolute;
  top: 3.7em;
  border-radius: .25em;
  width: 100%;
}

.results ul {
  list-style: none;
  padding: 0;
  border: 0;
  height: 100%;
  height: 370px;
  overflow-y: scroll;
  scroll-behavior: smooth
}

.results li {
  width: 100%;
}

.results li .link-results {
  display: block;
  padding: .7em 1em;
  cursor: pointer;
  text-decoration: none;
  color: black;
  width: 100%;
}

.results li:hover .link-results {
  background: #caccca;
}
</style>
