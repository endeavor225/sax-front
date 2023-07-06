<template>
  <div>
     <div>
         <q-tabs
          v-model="tab"
        dense
        align="justify"
        active-color="white"
        class="text-grey-8"
        active-bg-color="green-5"
        style="font-size:2rem"
      >
        <q-tab name="CATEGORIE_GROUPE"> CATEGORIE GROUPES</q-tab>
        <q-tab name="FONCTIONS"> FONCTIONS</q-tab>
        <q-tab name="GROUPES">GROUPES</q-tab>
        <q-tab name="UTILISATEUR">UTILISATEUR</q-tab>
      </q-tabs>
      </div>

      <div>
         <q-card>
             <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="CATEGORIE_GROUPE">
           <categorie-groupe/>
          </q-tab-panel>
        </q-tab-panels>

         <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="FONCTIONS">
          <show-fonction/>
          </q-tab-panel>
        </q-tab-panels> 
         
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="GROUPES">
          <show-groups/>
          </q-tab-panel>
        </q-tab-panels>  

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="UTILISATEUR">
          <show-utilisateur/>
          </q-tab-panel>
        </q-tab-panels>  
         </q-card>
      </div>

  </div>
</template>

<script >
import { ref,defineComponent } from 'vue'
import CategorieGroupe from "components/admin/ShowCategorieGroup/itemshowCategorieGroupe.vue";
import ShowFonction from "components/admin/ShowFonction/itemShowFonction.vue";
import ShowGroups from "components/admin/showGroup/itemShowGroup.vue";
import ShowUtilisateur from "components/admin/ShowUtilisateur/itemShowUtilisateur.vue";
export default defineComponent({
  components:{
    CategorieGroupe,
    ShowFonction,
    ShowGroups,
    ShowUtilisateur,
    
  },
  setup () {
    

    return {
      tab: ref('CATEGORIE_GROUPE'),
      
    }
  }
})
</script>

<style scoped>

</style>