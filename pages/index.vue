<template>
  <div>
    <div class="index-search">
      <h2 class="title-search">Explore Chemistry</h2>
      <InputSearch></InputSearch>
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
      results: [],
      isOpen: false
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
  },
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
.title-search {
  text-align: center;
  font-size: 4em;
  color: aliceblue;
}
</style>
