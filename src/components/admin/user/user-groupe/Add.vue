<template>
   <div style="width: 700px">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-center" style="width:90%;">
          {{ $t('affectation.add_group')}}
        </div>
        <q-space/>
        <q-btn icon="close" color="dark" flat round v-close-popup />
      </q-card-section>

      <q-card-section style="width:90%; margin:auto">
        <q-btn icon="add" :label="$t('modal.add_group')" no-caps padding="xs xs" color="primary" class="q-mb-sm" @click="addModal = true">
          <q-tooltip class="bg-primary">
            <b> {{ $t('modal.add_group')}} </b>
          </q-tooltip>
        </q-btn>
        <q-form @submit="onSubmit" ref="eForm">

            <q-select
              outlined
              v-model="formData.groupe"
              use-input
              input-debounce="0"
              :label="$t('group')"
              :options="options"
              option-label="title"
              option-value="id"
              @filter="filterFn"
              lazy-rules
              :rules="[ val => !!val || 'Le champ role est obligatoire']"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    {{ $t('no_data')}}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

          <div class="q-mt-xs q-mb-sm" style="text-align: center">
            <q-btn v-close-popup :label="$t('modal.cancel')" padding="xs xl" style="width:47%" color="white" text-color="black"/>
            <q-btn type="submit" 
            :label="$t('modal.add')" 
            padding="xs xl" 
            style="width:47%" 
            color="primary" 
            class="q-ml-md"
            :loading="submitting"
            >
              <template v-slot:loading>
                <q-spinner-facebook size="lg"/>
              </template>
            </q-btn>
          </div>
        
        </q-form>
      </q-card-section>
    </q-card>

    <q-dialog v-model="addModal">
      <add-group />
    </q-dialog>

  </div>
</template>

<script>
import {defineComponent, ref, getCurrentInstance, onMounted, toRaw, inject, provide} from "vue";
import AddGroup from "components/admin/groupe/Add"
export default {
  // name: 'ComponentName',
  components: {
    AddGroup,
  },

  setup () {
    self = getCurrentInstance();
    const service = "users";

    let add = inject("addGroupeModal")
    let state = inject(service)
    let formData = ref({})
    let emptyItem = inject("emptyItem")

    for (const key of Object.keys(emptyItem)) {
      formData.value[key] = emptyItem[key]
    }
    let eForm = ref(null)
    let submitting = inject("traitement")

    const serviceGroupe = "groupes";
    let stateGroupe = inject(serviceGroupe)

    let addModal = ref(false);
    provide("addModal", addModal);

     onMounted(async () => {
       stateGroupe.filters.value = Object.assign(
        stateGroupe.filters.value ? stateGroupe.filters.value : {},
        {
          _limit: 10000,
          _start: 0,
        }
      );
      await stateGroupe.getItems()
    })

    const options = ref(stateGroupe.items.value)

    let filterFn = (val, update) => {
        if (val === '') {
          update(() => {
            options.value = stateGroupe.items.value
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          options.value = stateGroupe.items.value.filter(v => v.title.toLowerCase().indexOf(needle) > -1)
        })
      }
      

    let onSubmit= async()=>{
      submitting.value = true
      state.item.groupes.push(formData.value.groupe)
      //formData.value = state.item
      //state.item = formData.value
      state.updateForm.value = eForm.value
      await state.update()
      submitting.value = false
      await state.getItems()
      add.value = false
    }
   
    return {
      formData,
      eForm,
      stateGroupe,
      state,
      onSubmit,
      filterFn,
      options,
      addModal,
      submitting
    }

  }
}
</script>
