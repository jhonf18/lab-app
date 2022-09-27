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

    <hr>

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
      <hr>

      <h3>Propiedades ADME</h3>

      <div>
        <label for="h-bond-acceptors">Número de aceptores de enlaces de hidrogeno: </label>
        <input type="text" id="h-bond-acceptors" v-model="metabolito.HBondAcceptors">
      </div>

      <div>
        <label for="h-bond-donors">Número de donadores de enlaces de hidrogeno: </label>
        <input type="text" id="h-bond-donors" v-model="metabolito.HBondDonors">
      </div>

      <div>
        <label for="molecular-weight">Masa molecular: </label>
        <input type="text" id="molecular-weight" v-model="metabolito.MolecularWeight">
      </div>

      <div>
        <label for="i-logp">iLOGP: </label>
        <input type="text" id="i-ligp" v-model="metabolito.ILogp">
      </div>

      <div>
        <label for="gastrointestinal-absortion">Absorción Gastrointestinal: </label>
        <input type="text" id="gastrointestinal-absortion" v-model="metabolito.GastrointestinalAbsortion">
      </div>

      <div>
        <label for="bioavailability-score">Score de Biodisponibilidades: </label>
        <input type="text" id="bioavailability-score" v-model="metabolito.BioavailabilityScore">
      </div>

      <div>
        <label for="tpsa">TPSA: </label>
        <input type="text" id="tpsa" v-model="metabolito.tpsa">
      </div>

    </section>

    <hr>

    <section>
      <h3>Literatura</h3>

      <div>
        <label for="biological-activity">Actividad biologica: </label>
        <input type="text" id="biological-activity" v-model="metabolito.BiologicalActivity">
      </div>

      <div>
        <label for="organism-type">Tipo de organismo: </label>
        <input type="text" id="organism-type" v-model="metabolito.OrganismType">
      </div>

      <div>
        <label for="references">Referencias: </label>
        <input type="text" id="references" v-model="metabolito.Reference">
      </div>

      <b-button size="sm" variant="primary" @click="addLiterature">Agregar literatura</b-button>


      <div v-if="literatures.length !== 0" style="margin-top: 1em">
        <h5>Literaturas agregadas</h5>
        <ul>
          <li v-for="(literature, i) in literatures" :key="i" class="li-literature">
            <div class="list-literatures">
              <div>
                <strong>Actividad biologica: </strong> {{ literature.biological_activity }} <br>
                <strong>Tipo de organismo: </strong> {{ literature.organism_type }} <br/>
                <strong>Referencia: </strong> {{ literature.reference }} <br/>
              </div>
              <div style="margin-left: 1.5em; cursor: pointer">
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
            </div>
          </li>

        </ul>
      </div>

    </section>

    <hr>

    <section class="section-buttons">
      <b-button variant="info" class="buttons" @click="save">Guardar</b-button>
      <b-button variant="warning" class="buttons" @click="search">Buscar</b-button>
      <b-button variant="danger" class="buttons" @click="deleteMetabolito">Eliminar</b-button>
    </section>


  </main>
</template>

<script>

import { getAuth, set, database, ref, getDatabase, child, get } from '@/plugins/utils/firebase';
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
        Reference: '',
        literatures: []
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

      if (
        this.metabolito.BiologicalActivity.length === 0 &&
        this.metabolito.OrganismType.length === 0 &&
        this.metabolito.Reference.length === 0) {
          alert('Debes llenar los campos de literatura para poder crearla')
      } else {
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

    },
    save() {
      if (this.metabolito.PCID.length === 0) {
        alert('Se debe ingresar el ID')
      } else {
        const db = getDatabase()
        set(ref(db, 'Metabolitos/' + this.metabolito.PCID), {
          PCID: this.metabolito.PCID,
          CompoundName: this.metabolito.CompoundName,
          PlantName: this.metabolito.PlantName,
          HBondAcceptors: this.metabolito.HBondAcceptors,
          HBondDonors: this.metabolito.HBondDonors,
          MolecularWeight: this.metabolito.MolecularWeight,
          ILogp: this.metabolito.ILogp,
          GastrointestinalAbsortion: this.metabolito.GastrointestinalAbsortion,
          BioavailabilityScore: this.metabolito.BioavailabilityScore,
          tpsa: this.metabolito.tpsa,
          literatures: this.literatures
        })
        .then (() => {
          alert('Los datos fueron guardados')
          for(const key in this.metabolito ) {
            this.metabolito[key] = ''
          }
          this.literatures = [];
        })
        .catch((error)=> {
          alert('Hubo un error inesperado...');
          console.log(error);
        })
      }
    },
    search() {
      if (this.metabolito.PCID.length === 0) {
        alert('Se debe ingresar el ID')
      } else {
        const dbRef = ref(database);
        get(child(dbRef, `Metabolitos/${this.metabolito.PCID}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();

            for(let key in this.metabolito) {
              this.metabolito[key] = data[key]
            }

            if (this.metabolito.literatures) {
              this.literatures = this.metabolito.literatures
            }

          } else {
            alert('Metabolito no encontrado')
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    },
    deleteMetabolito(){
      const db = getDatabase()
      if (this.metabolito.PCID.length === 0) {
        alert('Se debe ingresar el ID')
      } else {
        set(ref(db, 'Metabolitos/' + this.metabolito.PCID), {
          PCID: null,
          CompoundName: null,
          PlantName: null,
          HBondAcceptors: null,
          HBondDonors: null,
          MolecularWeight: null,
          ILogp: null,
          GastrointestinalAbsortion: null,
          BioavailabilityScore: null,
          tpsa: null,
          literatures: null
        })
        .then (() => {
          alert('Los datos fueron borrados')
          for(const key in this.metabolito ) {
            this.metabolito[key] = ''
          }
          this.literatures = [];
        })
        .catch((error)=> {
          alert('Hubo un error inesperado...');
          console.log(error);
        })
      }
    }
  }
}
</script>

<style scoped>
main {
  max-width: 1140px;
  margin: 0 auto;
  padding-top: 2em;
}

h1 {
  margin-bottom: 1em;
}

section {
  margin-bottom: 1.2em;
}

section div {
  margin-bottom: .5em
}

.li-literature {
  margin-bottom: .5em;
}

.list-literatures {
  display: flex;
  align-items: center;
}

.section-buttons {
  margin-top: 2em;
}

.buttons {
  margin-right: .5em;
}
</style>
