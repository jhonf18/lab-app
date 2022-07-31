<template>
  <main>
    <h1>Añadir metabolito a la base de datos</h1>


    <section>
      <h3>Tipo de ...</h3>
      <select v-model="type">
        <option value="extracto-planta">Extracto de planta</option>
        <option value="compuesto">Compuesto / Metabolito</option>
      </select>
    </section>

    <section>
      <h3>Nombre e identificadores</h3>

      <div v-if="type === 'compuesto'">
        <label for="PCID">PubChem ID:</label>
        <input type="text" id="PCID" v-model="metabolito.PCID">
      </div>

      <div>
        <label for="compound_name">
          {{ type === 'compuesto' ? 'Nombre del compuesto' : 'Tipo de extracto' }}:
        </label>
        <input type="text" id="compound_name" v-model="metabolito.CompoundName">
      </div>

      <div>
        <label for="plant_name">Origen de planta:</label>
        <input type="text" id="plant_name" v-model="metabolito.PlantName">
      </div>



    </section>

    <section v-if="type === 'compuesto'">
      <h3>Propiedades ADME</h3>

      <div>
        <label for="h-bond-acceptors">Número de aceptores de enlaces de hidrogeno</label>
        <input type="text" id="h-bond-acceptors" v-model="metabolito.HBondAcceptors">
      </div>

      <div>
        <label for="h-bond-donors">Número de donadores de enlaces de hidrogeno</label>
        <input type="text" id="h-bond-donors" v-model="metabolito.HBondDonors">
      </div>

      <div>
        <label for="molecular-weight">Masa molecular</label>
        <input type="text" id="molecular-weight" v-model="metabolito.MolecularWeight">
      </div>

      <div>
        <label for="i-logp">iLOGP</label>
        <input type="text" id="i-ligp" v-model="metabolito.ILogp">
      </div>

      <div>
        <label for="gastrointestinal-absortion">Absorción Gastrointestinal</label>
        <input type="text" id="gastrointestinal-absortion" v-model="metabolito.GastrointestinalAbsortion">
      </div>

      <div>
        <label for="bioavailability-score">Score de Biodisponibilidades</label>
        <input type="text" id="bioavailability-score" v-model="metabolito.BioavailabilityScore">
      </div>

      <div>
        <label for="tpsa">TPSA</label>
        <input type="text" id="tpsa" v-model="metabolito.tpsa">
      </div>

    </section>

    <section>
      <h3>Literatura</h3>

      <div>
        <label for="biological-activity">Actividad biologica</label>
        <input type="text" id="biological-activity" @keydown.enter="addActivity" v-model="metabolito.BiologicalActivity">
      </div>

      <div>
        <label for="organism-type">Tipo de organismo</label>
        <input type="text" id="organism-type" @keydown.enter="addOrganism" v-model="metabolito.OrganismType">
      </div>

      <div>
        <label for="references">Referencias</label>
        <input type="text" id="references" v-model="metabolito.Reference">
      </div>

      <button @click="addLiterature">Agregar literatura</button>


      <div v-if="literatures.length !== 0">
        <h6>Literaturas agregadas</h6>
        <ul>
          <li v-for="(literature, i) in literatures" :key="i">
            <div>
              <strong>Actividad biologica: </strong> {{ literature.biological_activity }} <br>
              <strong>Tipo de organismo: </strong> {{ literature.organism_type }} <br/>
              <strong>Referencia: </strong> {{ literature.reference }} <br/>
            </div>
            <div>
              <span @click="deleteLiterature(i)">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  width="15px" height="15px" viewBox="0 0 348.333 348.334" style="enable-background:new 0 0 348.333 348.334;"
                  xml:space="preserve">
                <g>
                  <path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85
                    c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563
                    c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85
                    l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554
                    L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/>
                </g>
                </svg>
              </span>
            </div>
          </li>

        </ul>
      </div>

    </section>


  </main>
</template>

<script>

import { getAuth } from '@/plugins/utils/firebase';
export default {
  name:  'AddMetabolitosPage',
  data() {
    return {
      user: '',
      type: 'compuesto',
      literatures: [],
      metabolito: {
        PCID: '',
        CompoundName: '',
        PlantName: '',
        HBondAcceptors: '',
        HBondDonors: '',
        MolecularWeight: '',
        ILogp: '',
        GastrointestinalAbsortion: '',
        BioavailabilityScore: '',
        tpsa: '',
        BiologicalActivity: '',
        OrganismType: '',
        Reference: ''
      }
    }
  },
  mounted() {
    getAuth().onAuthStateChanged(user => {
      if (user)
        this.user = user
    })
  },
  methods: {
    deleteLiterature(index) {
      this.literatures.splice(index, 1);
    },
    addLiterature() {
      let obj = {
        biological_activity: this.metabolito.BiologicalActivity,
        organism_type: this.metabolito.OrganismType,
        reference: this.metabolito.Reference
      }

      this.metabolito.BiologicalActivity = ''
      this.metabolito.OrganismType = ''
      this.metabolito.Reference = ''

      this.literatures.push(obj)

    }
  }
}
</script>

<style scoped>
main {
  max-width: 1140px;
  margin: 0 auto;
}

</style>
