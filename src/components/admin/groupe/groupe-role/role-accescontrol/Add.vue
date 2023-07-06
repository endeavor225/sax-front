<template>
  <div style="width: 600px">
    <q-card><q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          {{ $t('affectation.add_acces_control')}}
        </div>
        <q-space />
        <q-btn icon="close" color="negative" flat round v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" ref="eForm">
           <q-select 
            
            v-model="formData.acces_control"
              :options="options"
              use-input
              input-debounce="0"
              option-label="title"
              option-value="_key" 
              :label="$t('acces_controle')"
              @filter="filterFn"
              lazy-rules
              :rules="[ val => !!val || 'Le champ accès control est obligatoire']"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    {{ $t('no_data')}}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

          <div class="q-mt-lg q-mb-sm" style="text-align: center">
            <q-btn type="submit" :label="$t('modal.add')" color="primary" outline/>
            <q-btn v-close-popup :label="$t('modal.cancel')" color="negative" outline class="q-ml-sm"/>
          </div>
        
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {defineComponent, ref, getCurrentInstance, onMounted, toRaw, inject} from "vue";
export default defineComponent({

  setup() {

    self = getCurrentInstance();
    //const service = inject("service");
    
    const serviceRoleAccesControl = "role-acces-control";
    let service = inject("service");
    let state = inject(service)

    let add = inject("addAccesControlModal")
    let stateRoleAccesControl = inject(serviceRoleAccesControl)
    let formData = ref({})
    let emptyItem = inject("emptyItem")
    for (const key of Object.keys(emptyItem)) {
      formData.value[key] = emptyItem[key]
    }
    let eForm = ref(null)

    const serviceAcces = "acces-control";
    let stateAcces = inject(serviceAcces)

    const serviceRole = "roles"
    let stateRole = inject(serviceRole)


    onMounted(async () => {
      stateAcces.filters.value = Object.assign(
        stateAcces.filters.value ? stateAcces.filters.value : {},
        {
          limit: 10000,
          offset: 0
        }
      )
      
      await stateAcces.getItems()

    })

    const options = ref(stateAcces.items.value)

    let filterFn = (val, update) => {
        if (val === '') {
          update(() => {
            options.value = stateAcces.items.value
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          options.value = stateAcces.items.value.filter(v => v.title.toLowerCase().indexOf(needle) > -1)
        })
      }
    
    let onSubmit = async ()=> {

      formData.value.role = state.item.role[0]._key
      formData.value.acces_control = formData.value.acces_control._key

      stateRoleAccesControl.item.value = formData.value
      stateRoleAccesControl.createForm.value = eForm.value
      await stateRoleAccesControl.create()

      await stateRoleAccesControl.getItems()
      add.value = false
    }

    
    return {
      formData,
      eForm,
      onSubmit,
      stateAcces,
      state,
      filterFn,
      options,
      stateRoleAccesControl
    };
  },
});
</script>
