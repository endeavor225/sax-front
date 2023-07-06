<template>
  <div>
    <div style="width: 700px">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6 text-center" style="width:90%;">
            {{ $t('affectation.edit_group')}}
          </div>
          <q-space />
          <q-btn icon="close" color="dark" flat round v-close-popup />
        </q-card-section>

        <q-card-section style="width:80%; margin:auto">
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
                :options="options"
                option-label="title"
                option-value="_key" 
                :label="$t('group')"
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

    <q-dialog v-model="addModal">
      <add-group />
    </q-dialog>

  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  getCurrentInstance,
  inject,
  onMounted,
  provide
} from "vue";
import AddGroup from "components/admin/groupe/Add"
export default defineComponent({

  components: {
    AddGroup,
  },

  setup() {
    self = getCurrentInstance();
    const serviceUserGroupe = "user-groupes";
    const service = inject('service')

    let edit = inject("editGroupeModal")
    let state = inject(service)
    let stateUserGroupe = inject(serviceUserGroupe)

    let formData = ref({})
    let emptyItem = inject("emptyItem")

    for (const key of Object.keys(emptyItem)) {
      formData.value[key] = emptyItem[key]
    }
    let eForm = ref(null)
    let submitting = ref(false)

    const serviceGroupe = "groupes";
    let stateGroupe = inject(serviceGroupe)

    const serviceUser = "users";
    let stateUser = inject(serviceUser)

    let addModal = ref(false);
    provide("addModal", addModal);

    onMounted(async () => {
      formData.value.groupe = state.item.groupes[0].title
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
      formData.value.groupe = formData.value.groupe._key
      formData.value.user = stateUser.item._key

      stateUserGroupe.item.value = state.item.groupes[0].userGroupe
      stateUserGroupe.item = Object.assign(stateUserGroupe.item.value, formData.value)
      stateUserGroupe.updateForm.value = eForm.value

      await stateUserGroupe.update()
      submitting.value = false
      await stateUser.getItems()
      edit.value = false
    }
   
    return {
      formData,
      eForm,
      stateGroupe,
      stateUser,
      state,
      onSubmit,
      options,
      filterFn,
      addModal,
      submitting
    }
 
  },

});
</script>
