<template>
 <div>
    <div style="width: 700px">
      <q-card>

        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-center " style="width:90%; ">
            {{ $t('affectation.edit_role')}}
          </div>
          <q-space />
       
          <q-btn icon="close" color="black" flat round v-close-popup />
        </q-card-section>

        <q-card-section  style="width:90%; margin:auto">
        <q-btn
          icon="add"
          padding="sm"
          :label="$t('modal.add_role')"
          class="bg-primary text-weight-light text-capitalize q-mb-sm" 
          style="color:white"
          @click="addModal = true"
        >
         </q-btn>
          
          <q-form @submit="onSubmit" ref="eForm">
              <q-select 
                v-model="formData.role"
                outlined
                use-input
                input-debounce="0"
                :options="options"
                option-label="name"
                option-value="id" 
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
            <div class="q-lg q-mb-sm row justify-between">
            <q-btn v-close-popup :label="$t('modal.cancel')"  class="text-weight-regular" style='width:45%; border:1px solid #F8F7F7 ;color:black'/>
            <q-btn type="submit" :label="$t('modal.edit')"  
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

    <q-dialog v-model="addModal">
      <add-role />
    </q-dialog>

  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, inject, onMounted, provide} from "vue";
import AddRole from "components/admin/role/Add"
export default defineComponent({

  components: {
    AddRole,
  },

  setup() {
    self = getCurrentInstance();
    const serviceGroupeRole = "groupes";
    let service = inject("service");

    let edit = inject("editRoleModal")
    let submitting = inject("traitement");
    let state = inject(service)
    let stateGroupeRole = inject(serviceGroupeRole)
    let formData = ref({})
    let emptyItem = inject("emptyItem")
    for (const key of Object.keys(emptyItem)) {
      formData.value[key] = emptyItem[key]
    }
    let eForm = ref(null)
    const serviceRole = "users-permissions/roles"
    let stateRoles = inject(serviceRole)

    const serviceGroupe = "groupes";
    let stateGroupe = inject(serviceGroupe)

    let addModal = ref(false);
    provide("addModal", addModal);

    onMounted(async () => {
     
      formData.value.role = state.item.role.name
      await stateRoles.getItems()
    })

    const options = ref(stateRoles.items.value)
 ;

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
      submitting.value = true
      formData.value.id = state.item.id
      stateGroupeRole.item.id = formData.value.id
      stateGroupeRole.item = formData.value
      stateGroupeRole.updateForm.value = eForm.value
      await stateGroupeRole.update()
      submitting.value = false
      await stateGroupe.getItems()
      edit.value = false
    }
   
    return {
      formData,
      eForm,
      stateRoles,
      stateGroupe,
      state,
      onSubmit,
      stateGroupeRole,
      options,
      filterFn,
      addModal,
      submitting
    }
 
  },

});
</script>
