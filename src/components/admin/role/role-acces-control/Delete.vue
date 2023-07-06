<template>
  <div>
    <div style="width: 700px">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-center" text-color="dark">Confirmation</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center" style="width:80%; margin:auto">
          {{ $t('affectation.remove_acces_control')}}
        </q-card-section>

        <q-card-section class="q-pt-none">
        <q-form
          ref="eForm"
          @submit="onSubmit"
        >
          <q-card-actions align="center">
            <q-btn :label="$t('no')" v-close-popup color="white" text-color="black" padding="xs xl" style="width:45%" />
            <q-btn :label="$t('yes')" 
            type="submit" color="primary" 
            class="q-ml-lg" padding="xs xl" 
            style="width:45%"
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
  
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, inject} from "vue";
import axios from "axios";
export default defineComponent({

  setup () {
     self = getCurrentInstance();
     const serviceAccesRole = "users-permissions/roles";
     let service = inject("service");
     let deleteModal = inject("deleteModal")
     let submitting = inject("traitement")
     let state = inject(service)
     let stateAccesRole = inject(serviceAccesRole)
     let token = self.appContext.app.config.globalProperties.$sdata.value.jwt

    let eForm = ref(null)

    let onSubmit = async ()=> {
        submitting.value = true
        stateAccesRole.item = stateAccesRole.item
        stateAccesRole.item.id = stateAccesRole.item.role
        let res = await axios({
        url: `http://localhost:1338/${service}/${stateAccesRole.item.id}`,
        method: "get",
        params: {},
         headers:{ 
              Authorization: `Bearer ${token}`       
          } 
        
        })
        let tab = res.data
        tab.role.permissions.application.controllers[stateAccesRole.item.controller][stateAccesRole.item.action].enabled = false
        stateAccesRole.item =tab.role

        stateAccesRole.updateForm.value = eForm.value
        await stateAccesRole.update()
        await state.getItems()
        submitting.value = false
        deleteModal.value = false
    }

    return {
      eForm,
      onSubmit,
      submitting
    }
  },
  
})
</script>
