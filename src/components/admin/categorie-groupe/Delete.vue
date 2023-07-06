<template>
  <div style="width: 700px">
    <q-card>
      <q-card-section class="row items-center q-mb-sm q-pb-none">
          <div class="text-h6 text-center" style="width:90%" >Confirmation</div>
          <q-space />
         <q-btn icon="close" color="black" flat round v-close-popup />
      </q-card-section>
      <q-card-section class="q-pt-none text-center "  style="width:90%; margin:auto">
          {{ $t('modal.delete_categorie_groupe')}} <strong class="text-capitalize">{{state.item.title}}</strong> ?
      </q-card-section>

      <q-card-section style="width:90%; margin:auto">
        <q-form
          ref="eForm"
          @submit="onSubmit"
        >
          <q-card-actions align="center" class="q-lg q-mb-sm row justify-between">
            <q-btn v-close-popup :label="$t('modal.cancel')" class="text-weight-regular" style='width:45%; border:1px solid #F8F7F7 ;color:black' />
            <q-btn type="submit" 
            :label="$t('modal.delete')"  
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
</template>

<script>
import { defineComponent, ref, getCurrentInstance, inject} from "vue";
export default defineComponent({

  setup () {
    self = getCurrentInstance();
    let service = inject("service");
    //let deleteForm = inject("deleteForm")
    let deleteModal = inject("deleteModal")

    let state = inject(service)
    let eForm = ref(null)

    let submitting = inject("traitement")

    let onSubmit = async ()=> {
      submitting.value = true
      
      state.deleteForm.value = eForm.value
      await state.remove()
      submitting.value = false
      await state.getItems()
      deleteModal.value = false
    }

    return {
      eForm,
      onSubmit,
      state,
      submitting
    }
  },
  
})
</script>
