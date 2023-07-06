<template>
    <div>
      <q-tabs
        v-model="liste_sections"
        align="justify"
        active-color="primary"
        no-caps
        class="q-mt-md text-grey-8"
        style="font-size:1.3rem"
      >
        <q-tab name="liste_sections"> Liste des sections ajoutées </q-tab>
        <q-tab name="form_constructor"> Construteur de formulaire</q-tab>

      </q-tabs>
      
      <q-tab-panels v-model="liste_sections" animated>
        <q-tab-panel name="liste_sections">
          <liste-sections :idTypeFormulaire="typeFormulaire"/>
        </q-tab-panel>
      </q-tab-panels>

      <q-tab-panels v-model="liste_sections" animated>
        <q-tab-panel name="form_constructor">
          <form-draggles :idTypeFormulaire="typeFormulaire"/>
      </q-tab-panel>
    </q-tab-panels>    
  </div>
</template>

<script >
import { ref,defineComponent, onMounted, provide} from 'vue'
import formDraggles from "components/admin/form-draggle/Form.vue";
import ListeSections from "components/admin/form-draggle/List.vue";

export default defineComponent({
    components:{
    formDraggles,
    ListeSections,
  },
    props: {
    typeFormulaire: {
      //type: Object,
      default() {
        return {};
      },
    },
  },
    setup (props) {
      let liste_sections = ref('liste_sections')
      provide('editActive', liste_sections)
    console.log('liste_section parent | ', liste_sections)
      return {
        liste_sections
      }
    }
})
</script>

<style scoped>

</style>