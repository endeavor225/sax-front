<template>
  <div>
    <div style="width: 700px">
      <q-card>
        <q-card-section class="row items-center q-mb-sm  q-pb-none">
          <div class="text-h5 text-center  " style="width:90%" >Confirmation</div>
          <q-space />
         <q-btn icon="close" color="black" flat round v-close-popup />
       </q-card-section>

        <q-card-section class="q-pt-none text-center" style="width:80%; margin:auto">
          {{$t('affectation.remove_user')}}
        </q-card-section>

        <q-card-section>
        <q-form
          ref="eForm"
          @submit="onSubmit"
        >
          <q-card-actions align="center" class="q-lg q-mb-sm row justify-between">
            <q-btn v-close-popup :label="$t('no')" class="text-weight-regular" style='width:45%; border:1px solid #F8F7F7 ;color:black' />
            <q-btn type="submit" 
              :label="$t('yes')"  
              class="bg-primary text-weight-regular" 
              style="width:45%; color:white"
              :loading="submitting"
            >
              <template v-slot:loading>
                <q-spinner-facebook size="lg" />
              </template>
            </q-btn>
          </q-card-actions>
        </q-form>

      </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, inject} from "vue";
import { Notify } from 'quasar'
export default defineComponent({

  setup () {
    self = getCurrentInstance();
    const serviceUserGroupe = "groupes";
    let service = inject("service");
    let deleteModal = inject("deleteModal")
    let state = inject(service)
    let stateUserGroupe = inject(serviceUserGroupe)
    let eForm = ref(null)
    let submitting = inject("traitement");
   
    let onSubmit = async ()=> {
      submitting.value = true
      stateUserGroupe.deleteForm.value = eForm.value
      stateUserGroupe.item.id = state.item.id
      await stateUserGroupe.remove()
      submitting.value = false
      await state.getItems()
      deleteModal.value = false
    }

    return {
      eForm,
      onSubmit,
      submitting
    }
  },
  
})
</script>