<template>
  <div style="width: 700px">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-center" style="width:90%; ">
         {{ $t('modal.add_categorie_groupe')}}
        </div>
        <q-space />
        <q-btn icon="close" color="black" flat round v-close-popup />
      </q-card-section>

      <q-card-section style="width:90%; margin:auto">
        <q-form @submit="onSubmit" ref="eForm">
          <q-input v-model="formData.title"
            outlined
            :label="$t('title')" 
            lazy-rules
            :rules="[ 
            val => !!val || 'Le champ titre est obligatoire', 
            val =>  val.length > 3 || 'ce champ doit contenir au moins 4 caractères' ]"
          />

         <div class="q-lg q-mb-sm row justify-between">
            <q-btn v-close-popup :label="$t('modal.cancel')" class="text-weight-regular" style='width:45%; border:1px solid #F8F7F7 ;color:black' />
            <q-btn type="submit" 
              :label="$t('modal.add')"  
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
import {defineComponent, ref, getCurrentInstance, onMounted, toRef, toRaw, inject, markRaw, readonly} from "vue";
export default defineComponent({

  setup() {

    self = getCurrentInstance();
    const service = inject("service");

    let add = inject("addModal")
    let state = inject(service)
    let formData = ref({})
    let emptyItem = inject("emptyItem")
    let submitting = inject("traitement")

    for (const key of Object.keys(emptyItem)) {
      formData.value[key] = emptyItem[key]
    }

    let eForm = ref(null)

  
    let onSubmit = async ()=> {
      submitting.value = true
      
      state.item.value = formData.value
      state.createForm.value = eForm.value
      await state.create()
      submitting.value = false
      await state.getItems()
      add.value = false

    }
   
    return {
      eForm,
      onSubmit,
      formData,
      submitting
    };
  },
});
</script>
