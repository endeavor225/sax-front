<template>
    <div>
 <q-tabs
         v-model="tab2"
        align="justify"
        active-color="primary"
        no-caps
        class="q-mt-md text-grey-8"
        style="font-size:1.3rem"
        >
         <q-tab name="liste_sections"> Liste des sections ajoutées</q-tab>
         <q-tab name="form_constructor"> Construteur de formulaire</q-tab>
        </q-tabs>
      
         <q-tab-panels v-model="tab2" animated>
          <q-tab-panel name="liste_sections">
           Liste utilisateurs
             <!-- <liste-sections/> -->
          </q-tab-panel>
        </q-tab-panels>
         <q-tab-panels v-model="tab2" animated>
          <q-tab-panel name="form_constructor">
           <form-draggles/>
          </q-tab-panel>
        </q-tab-panels>    
        </div>
</template>

<script >
import { ref,defineComponent } from 'vue'
import formDraggles from "components/admin/FormDraggle/formulaire.vue";
// import ListeSections from "components/admin/ListeSection/itemListeSection.vue";

export default defineComponent({
    components:{
    formDraggles,
    // ListeSections,
  },
    setup () {
        

        return {
             tab2: ref('form_constructor'),
        }
    }
})
</script>

<style scoped>

</style>