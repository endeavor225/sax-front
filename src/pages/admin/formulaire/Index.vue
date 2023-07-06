<template>
  <div>

  
      <q-tabs
        v-model="tab"
        dense
        align="justify"
        active-color="primary"
        class="bg-grey  text-dark"
        active-bg-color="white"
        indicator-color="white"
        style="font-size:1.6rem"
      >
    
        <div class="col-3" v-for="item in type_formulaires" :key="item" :itemFormulaire="item">
          <q-tab :name="item.titre" @click="show(item)"> {{item.titre}} </q-tab>
        </div>
      </q-tabs>

    <div>
      <q-card class="no-shadow">
        <q-tab-panels v-model="tab" animated >
          <q-tab-panel :name="itemForm">
            <item-form :typeFormulaire="itemForm"/>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>

  </div>
</template>

<script >
import { ref, defineComponent, onMounted } from 'vue'
import axios from "axios";
import ItemForm from "components/admin/form-draggle/Item.vue"


export default defineComponent({
  components:{
    ItemForm 
  },
  
  setup () {

    let type_formulaires = ref()
    let tab = ref()
    let itemForm =ref()

    onMounted(async ()=>{
      const token = self.appContext.app.config.globalProperties.$sdata.value.jwt;

      let  res = await axios({
        url: "http://localhost:1338/type-formulaires",
        method: "get",
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      type_formulaires.value = res.data
      console.log('res.data | ', res.data)
      console.log('type_formulaire |', type_formulaires.value.length)
      if (type_formulaires.value.length !== 0) {
      tab.value = type_formulaires.value[0].titre
      itemForm.value = type_formulaires.value[0].titre
        
      }
    })


    let show = (item)=> {
      itemForm.value = item.titre
    }

    return {
      tab,
      type_formulaires,
      show,
      itemForm
    }
  }
})
</script>

<style scoped>

</style>