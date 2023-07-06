<template>
  <div style="width: 700px">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-center " style="width:90%; ">
          {{ $t('modal.edit_group')}}
        </div>
        <q-space />
        <q-btn icon="close" color="black" flat round v-close-popup />
      </q-card-section>
      
      <q-card-section style="width:90%; margin:auto">
        <q-form @submit="onSubmit" ref="eForm">
          <q-input 
           outlined
            v-model="state.item.title" 
            lazy-rules
            :rules="[ 
            val => !!val || 'Le champ titre est obligatoire', 
            val =>  val.length > 2 || 'ce champ doit contenir au moins 3 caractères' ]"
          />
          <div class="q-lg q-mb-sm row justify-between">
            <q-btn v-close-popup :label="$t('modal.cancel')"  class="text-weight-regular" style='width:45%; border:1px solid #F8F7F7 ;color:black'/>
            <q-btn type="submit" 
            :label="$t('modal.edit')"  
            class="bg-primary text-weight-regular"  
            style="width:45%; color:white"
            :loading="submitting"
            >
              <template v-slot:loading>
                <q-spinner-facebook size="lg" />
              </template>
            </q-btn>

          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, inject} from "vue";
import axios from "axios";
export default defineComponent({

  setup() {
    self = getCurrentInstance();
    let service = inject("service");
    let editModal = inject("editModal")
    let state = inject(service)
    let eForm = ref(null)

    let submitting = inject("traitement");

    let onSubmit = async ()=> {

      let token = self.appContext.app.config.globalProperties.$sdata.value.jwt;
      submitting.value = true
      //formulaire de validation
      state.updateForm.value = eForm.value 
      try {
        let res = await axios({
            url: `http://localhost:1338/${service}/${state.item.id}`,
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        delete res.data.title
        state.item = Object.assign(state.item, res.data)
        //requette de modification
        await state.update()
        //actualisation de la liste
        await state.getItems()
      } catch (error) {
        console.log(error);
      }
      
      submitting.value = false
      editModal.value = false
    }

    return {
      state,
      eForm,
      onSubmit,
      submitting
    };
  }, 
});
</script>
