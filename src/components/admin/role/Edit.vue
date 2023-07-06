<template>
  <div style="width: 700px">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-center" style="width:90%; ">
         {{ $t('modal.edit_role')}}
        </div>
        <q-space />
        <q-btn icon="close" color="dark" flat round v-close-popup />
      </q-card-section>

      <q-card-section style="width:90%; margin:auto">
        <q-form @submit="onSubmit" ref="eForm">
          <q-input v-model="state.item.name"
          outlined
          :label="$t('title')"  
          lazy-rules
          :rules="[ 
          val => !!val || 'Le champ titre est obligatoire', 
          val =>  val.length > 2 || 'ce champ doit contenir au moins 3 caractères' ]"
        />
        <q-input v-model="state.item.description"
          outlined
          :label="$t('description')"  
          lazy-rules
          :rules="[ 
          val => !!val || 'Le champ titre est obligatoire', 
          val =>  val.length > 2 || 'ce champ doit contenir au moins 3 caractères' ]"
        />

          <div class="q-mt-xs q-mb-sm" style="text-align: center">
            <q-btn v-close-popup :label="$t('modal.cancel')" padding="xs xl" style="width:47%" color="white" text-color="black"/>
            <q-btn type="submit" 
            :label="$t('modal.edit')" 
            padding="xs xl" 
            style="width:47%" 
            color="primary" 
            class="q-ml-md"
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
import {
  defineComponent,
  ref,
  getCurrentInstance,
  inject,
} from "vue";

export default defineComponent({

  setup() {
    self = getCurrentInstance()
    let service = inject("service")
    let editModal = inject("editModal")
    let state = inject(service)
    let eForm = ref(null)
    let submitting = inject("traitement")

    let onSubmit = async ()=> {
      submitting.value = true

      state.updateForm.value = eForm.value
      delete state.item.permissions
      await state.update()
      submitting.value = false
      await state.getItems()
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
