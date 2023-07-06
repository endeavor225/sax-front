<template>
   <div style="width: 700px">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          {{ $t('affectation.add_role')}}
        </div>
        <q-space />
        <q-btn icon="add" round color="secondary" class="q-mr-sm" @click="addModal = true">
          <q-tooltip class="bg-secondary">
            <b> {{ $t('modal.add_role')}} </b>
          </q-tooltip>
        </q-btn>
        <q-btn icon="close" color="negative" flat round v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" ref="eForm">
            <q-select 
              v-model="formData.role"
              use-input
              input-debounce="0"
              :options="options"
              option-label="title"
              option-value="_key" 
              :label="$t('role')"
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

          <div class="q-mt-lg q-mb-sm" style="text-align: center">
            <q-btn type="submit" :label="$t('modal.add')" color="primary" outline/>
            <q-btn v-close-popup :label="$t('modal.cancel')" color="negative" outline class="q-ml-sm"/>
          </div>
        
        </q-form>
      </q-card-section>
    </q-card>

    <q-dialog v-model="addModal">
      <add-role />
    </q-dialog>

  </div>
</template>

<script>
import {defineComponent, ref, getCurrentInstance, onMounted, toRaw, inject, provide} from "vue";
import AddRole from "components/admin/role/Add"
export default {
  // name: 'ComponentName',
  components: {
    AddRole,
  },
  
  setup () {
    self = getCurrentInstance();
    const service = "user-role";
    let add = inject("addRoleModal")
    let state = inject(service)
    let formData = ref({})
    let emptyItem = inject("emptyItem")

    for (const key of Object.keys(emptyItem)) {
      formData.value[key] = emptyItem[key]
    }
    let eForm = ref(null)
    const serviceRole = "roles";
    let stateRoles= inject(serviceRole)
     
    const serviceUser = "users";
    let stateUser = inject(serviceUser)

    let addModal = ref(false);
    provide("addModal", addModal);

    onMounted(async () => {
      stateRoles.filters.value = Object.assign(
        stateRoles.filters.value ? stateRoles.filters.value : {},
        {
          _limit: 10000,
          _start: 0,
        }
      );
      await stateRoles.getItems()
    })


    const options = ref(stateRoles.items.value)

    let filterFn = (val, update) => {
        if (val === '') {
          update(() => {
            options.value = stateRoles.items.value
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          options.value = stateRoles.items.value.filter(v => v.title.toLowerCase().indexOf(needle) > -1)
        })
      }

    let onSubmit= async()=>{
  
      formData.value.user = stateUser.item._key
      formData.value.role = formData.value.role._key
      state.item.value = formData.value
      state.createForm.value = eForm.value
      console.log(state.createForm.value);
      await state.create()

      await stateUser.getItems()
      add.value = false
    }
   
    return {

      formData,
      eForm,
      stateRoles,
      state,
      onSubmit,
      options,
      filterFn,
      addModal
      
    }

  }
}
</script>
