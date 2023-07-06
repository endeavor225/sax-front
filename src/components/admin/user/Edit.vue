<template>
  <div style="width: 700px">
    <q-card >
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-center" style="width:90%; ">
         {{ $t('modal.edit_user')}}
        </div>
        <q-space />
        <q-btn icon="close" color="dark" flat round v-close-popup />
      </q-card-section>

      <q-card-section style="width:90%; margin:auto">
        <q-form @submit="onSubmit" ref="eForm">
          <q-input outlined v-model="state.item.nom" 
            :label="$t('form.name')"  
            lazy-rules
            :rules="[ 
            val => !!val || 'Le champloading nom est obligatoire', 
            val =>  val.length > 2 || 'ce champ doit contenir au moins 3 caractères' ]"
          />

          <q-input outlined v-model="state.item.prenom" 
            :label="$t('form.first_name')"  
            lazy-rules
            :rules="[ 
            val => !!val || 'Le champ  prenom est obligatoire', 
            val =>  val.length > 2 || 'ce champ doit contenir au moins 3 caractères' ]"
          />

          <q-input outlined v-model="state.item.username" 
            :label="$t('form.username')"  
            lazy-rules
            :rules="[ 
            val => !!val || 'Le champ nom d\'utilisateur est obligatoire', 
            val =>  val.length > 2 || 'ce champ doit contenir au moins 3 caractères' ]"
          />

          <q-input outlined v-model="state.item.email" 
            label="Email"  
            lazy-rules
            :rules="[ 
            val => !!val || 'Le champ email est obligatoire', 
            val =>  val.length > 2 || 'ce champ doit contenir au moins 10 caractères' ]"
          />

          <div class="q-mt-xs q-mb-sm" style="text-align: center">
            <q-btn v-close-popup :label="$t('modal.cancel')" padding="xs xl" style="width:47%" color="white" text-color="black" />
            <q-btn type="submit"
              :label="$t('modal.edit')" 
              :loading="submitting" 
              padding="xs xl" 
              style="width:47%" 
              color="primary" 
              class="q-ml-md"
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
    self = getCurrentInstance();
    let service = inject("service");
    let editModal = inject("editModal")
    let state = inject(service)
    let eForm = ref(null)
    let submitting = inject("traitement")

    let onSubmit = async ()=> {
      submitting.value = true
      //eform pour la validation du formulaire
      state.updateForm.value = eForm.value
      //requete pour la modification
      await state.update()
      submitting.value = false
      editModal.value = false
    }

    return {
      state,
      eForm,
      onSubmit,
      submitting
    }
  }
})
</script>
