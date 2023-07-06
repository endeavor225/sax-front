<template>
  <q-page>
     
    <div class="q-pa-md">
        <q-input class="float-right" type="search" label="Search" style="max-width: 200px" >
            <q-icon name="search" size="2.6rem" />
        </q-input>
      <h6>Liste des formulaires</h6>

      <q-form class="q-gutter-md">
          <q-card>
              <q-card-section  class="bg-grey ">
                  <q-item class="text-center">
                  <q-item-section avatar class="bg-grey ">
                       <div class="text-h4" >#</div>  
                  </q-item-section>
                  <q-item-section  class="bg-grey ">
                       <div class="text-h4">Nom de section</div>  
                  </q-item-section>
                  <q-item-section>
                      <div class="text-h4"> Organisation</div>  
                  </q-item-section>
                  <q-item-section >
                      <div class="text-h4">Action</div>  
                  </q-item-section>
              </q-item>
              </q-card-section>
          
                <div v-for="item in listes" :key="item">
                <!-- <div v-for="datasForms in item.form" :key="datasForms">
                    <q-input v-model="form[datasForms.model]" :type="datasForms.type" :label="datasForms.name ? datasForms.name :''" />
                    {{datasForms}}
                    </div> -->

                <q-item class="text-center">
                    <q-item-section avatar >
                       <div class="text-h5" v-if="item > 0 ? count+=1 : count"> {{count}} </div>  
                  </q-item-section>
                    <q-item-section >
                         <div class="text-h5 text-grey-8"> {{ item.nom }} </div>  
                   
                    </q-item-section>
                   <q-item-section  > 
                  </q-item-section>
                  <q-item>
                     <q-item-section>
                      <q-btn  icon="img:img/View.svg" flat color="primary" @click="onSee(item.id)" />
                     </q-item-section>
                     <q-item-section>
                      <q-btn  icon="img:img/Modifier.svg" flat color="primary" @click="onEdit(item.id)" />
                     </q-item-section>
                     <q-item-section>
                      <q-btn  icon="img:img/Delete.svg" flat color="primary" @click="onDelete(item.id)" />
                     </q-item-section>
                  </q-item>
                </q-item>
                </div>
        </q-card>
      </q-form>
    </div>

    <q-dialog v-model="visible">
      <q-card class="my-card q-pa-md" style="width: 500px">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div v-for="item in items.form" :key="item">
            <q-input
              v-model="form[item.model]"
              :label="item.name"
              :type="item.type"
              autofocus
            />
          </div>
          <q-btn label="Modifier" color="primary" @click="onEdit(1)" />
          <q-btn label="Suprimer" type="submit" color="negative" />
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import qs from "qs"
import { ref, getCurrentInstance, onMounted, defineComponent, inject} from "vue";
export default defineComponent({
  name: "custom-clone",
  display: "Custom Clone",
  order: 3,
  components: {},

  props: {
    idTypeFormulaire: {
      //type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    self = getCurrentInstance();

    let listes = ref([]);
    let items = ref({});
    let visible = ref(false);
    let form = ref({});
    let count = ref(0)
    let liste_sections = ref('') 

    onMounted(async () => {
      liste_sections= inject('editActive')
            console.log('liste_section enfant | ', liste_sections)

      let idFormulaire = ""
      const token = self.appContext.app.config.globalProperties.$sdata.value.jwt;


      const query = qs.stringify({
        _where: [{titre: props.idTypeFormulaire}],
      });

      let res = await self.appContext.app.config.globalProperties.$axios({
        url: `http://localhost:1338/type-formulaires?${query}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`
        }
      })

      idFormulaire = Object.values(res.data)[0]

      const params = qs.stringify({
        _where: [{'type_formulaire.id' : idFormulaire.id}],
      });

      try {
        let res = await self.appContext.app.config.globalProperties.$axios({
          url: `http://localhost:1338/formulaires?${params}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
        }
        });
 
        listes.value = res.data;
       
      } catch (error) {
        console.log(error);
      }
    });

    let onFormulaire = () => {
      visible.value = true;
    };

    let onSubmit = async () => {
      console.log("form", form.value);
      try {
        let res = await self.appContext.app.config.globalProperties.$axios({
          url: `http://localhost:1338/${items.value.nom}s`,
          method: "POST",
          data: form.value,
        });

       
      } catch (error) {
        console.log(error);
      }
    };
    

    let onSee = async (id) => {
      try {
        // visible.value = true
        // let res = await self.appContext.app.config.globalProperties.$axios({
        //   url: `http://localhost:1338/formulaires/${id}`,
        //   method: "GET",
        //   params: {}
        // });
        // items.value = res.data
        visible.value = true

      } catch (error) {
        console.log(error);
      }
    }
    let onEdit = async (id) => {
        liste_sections.value= 'form_constructor'
    }
    let onDelete = async (id) =>{
        visible.value = true
    }
    

    return {
      items,
      visible,
      onSubmit,
      onFormulaire,
      onSee,
      onEdit,
      onDelete,
      form,
      listes,
      count,
      liste_sections
    };
  },
});
</script>
<style scoped></style>
