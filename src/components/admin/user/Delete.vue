<template>
  <div style="width: 700px">
    <q-card>
      <q-card-section>
          <div class="text-h6 text-center" text-color="dark">Confirmation</div>
        </q-card-section>
      <q-card-section class="q-pt-none text-center" style="width:80%; margin:auto">
          {{ $t('modal.delete_user')}} <strong class="text-capitalize">{{state.item.username}}</strong> ?
        </q-card-section>
      <q-card-section>
        <q-form
          ref="eForm"
          @submit="onSubmit"
        >
          <q-card-actions align="center">
            <q-btn :label="$t('no')" v-close-popup color="white" text-color="black" padding="xs xl" style="width:45%"/>
            <q-btn type="submit" 
              :label="$t('yes')" 
              :loading="submitting"
              color="primary" 
              class="q-ml-lg" 
              padding="xs xl" 
              style="width:45%"
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
    let deleteModal = inject("deleteModal")
    let state = inject(service)
    let eForm = ref(null);
    let submitting = inject("traitement")

    let onSubmit = async ()=> {
      submitting.value = true
       
      state.deleteForm.value = eForm.value
      //requete pour la suppression
      await state.remove()

      submitting.value = false
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
