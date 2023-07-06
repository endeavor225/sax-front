<template>
 <div>
    <div style="width: 500px">
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
            <q-btn type="submit" 
            :label="$t('modal.edit')"  
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

    <!-- <q-dialog v-model="addModal">
      <add-role />
    </q-dialog> -->

    <!-- =================================================== Ajout de nouveau role ====================================== -->

    <q-dialog v-model="addModal">
      <div style="width: 700px">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6 text-center" style="width: 90%">
              {{ $t("modal.add_role") }}
            </div>
            <q-space />
            <q-btn icon="close" color="dark" flat round v-close-popup />
          </q-card-section>

          <q-card-section style="width: 90%; margin: auto">
            <q-form @submit="onSubmitRole" ref="eForm">
              <q-input
                outlined
                v-model="formData.name"
                :label="$t('title')"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Le champ titre est obligatoire',
                  (val) =>
                    val.length > 2 ||
                    'ce champ doit contenir au moins 3 caractères',
                ]"
              />
              <q-input
                outlined
                v-model="formData.description"
                :label="$t('description')"
                lazy-rules
                :rules="[
                  (val) => !!val || 'Le champ titre est obligatoire',
                  (val) =>
                    val.length > 2 ||
                    'ce champ doit contenir au moins 3 caractères',
                ]"
              />

              <div class="q-mt-xs q-mb-sm" style="text-align: center">
                <q-btn
                  v-close-popup
                  :label="$t('modal.cancel')"
                  padding="xs xl"
                  style="width: 47%"
                  color="white"
                  text-color="black"
                />
                <q-btn
                  type="submit"
                  :label="$t('modal.add')"
                  padding="xs xl"
                  style="width: 47%"
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
    </q-dialog>

     <!-- =========================================================== Fin ============================================= -->

     <!-- =============================================================================================================== -->
     <q-dialog v-model="permissionModal">
     
      <div style="width: 700px" v-for="itemListe in lastRole" :key="itemListe.id">
        <q-card flat class="bg-secondary">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6 text-center" style="width: 90%">
              {{ $t("modal.recent_add") }}
            </div>
            <q-space />
            <q-btn icon="close" color="dark" flat round v-close-popup />
          </q-card-section>

          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">{{ $t("role") }}</div>
              <div class="text-caption text-grey-6">{{ $t("title") }} :</div>
              <div class="text-h5 text-capitalize q-mt-sm q-mb-xs">
                {{ itemListe.name }}
              </div>
              <div class="text-caption text-grey-6">{{ $t("description") }} :</div>
              <div class="text-h5 text-capitalize q-mt-sm q-mb-xs">
                {{ itemListe.description }}
              </div>
              <div class="text-caption text-grey-6 q-mt-md q-mb-none">
                {{ $t("acces_controle") }}(s) : <span class="text-grey-8">{{itemListe.permissions.length}}</span>
              </div>
            </q-card-section>

            <q-card-section class="absolute-right">
              <q-btn icon="add" padding="xs" color="primary" @click="onAddAC(itemListe)" >
                <q-tooltip class="bg-primary">
                  <b> {{ $t('tooltip.added_role')}} </b>
                </q-tooltip>
              </q-btn>
            </q-card-section>
          </q-card-section>

          <div class="scroll" style="height: 240px">
            <div class="q-ma-none q-pa-none" v-for="item in itemListe.permissions"  :key="item._key">
              <q-item class="bg-white q-ml-md q-mr-md q-mb-xs" style="border-radius: 15px;">
                <q-item-section>
                  <q-item-label> {{ item.controller }}.{{ item.action }} </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div> 
        </q-card>
      </div>
    </q-dialog>

    <q-dialog v-model="addACModal">
      <add-acces-control />
    </q-dialog>

  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, inject, onMounted, provide} from "vue";
import AddRole from "components/admin/role/Add"
import AddAccesControl from "components/admin/role/role-acces-control/Add";
import axios from "axios"
import qs from "qs";
import { Notify } from 'quasar'
export default defineComponent({

  components: {
    AddRole,
    AddAccesControl
  },

  setup() {
    self = getCurrentInstance();
    const service = "users";

    let edit = inject("editRoleModal")
    let state = inject(service)
    let formData = ref({})
    let emptyItem = inject("emptyItem")
    let submitting = inject("traitement")

    for (const key of Object.keys(emptyItem)) {
      formData.value[key] = emptyItem[key]
    }
    let eForm = ref(null)

    const serviceRole = "users-permissions/roles";
    let stateRoles = inject(serviceRole);

    let addModal = ref(false);
    provide("addModal", addModal);
    let permissionModal = ref(false);
    let lastRole = ref([]);

    var addACModal = ref(false);
    provide("addModal", addACModal);

    const serviceAcces = "users-permissions/permissions";
    let stateAcces = inject(serviceAcces);


    onMounted(async () => {
      formData.value.role = state.item.role.name
      await stateRoles.getItems();
    });

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

    let token = self.appContext.app.config.globalProperties.$sdata.value.jwt

    let onSubmitRole = async()=>{
      submitting.value = true
      let res = await axios({
        url: `http://localhost:1338/${serviceAcces}`,
        method: "get",
        params: {},
        headers:{ 
          Authorization: `Bearer ${token}`       
        }
      })
      //var tab = res.data

      //Creer un role
      formData.value.permissions = res.data.permissions
      formData.value.creator = self.appContext.app.config.globalProperties.$sdata.value.user.id
      formData.value.niveau = self.appContext.app.config.globalProperties.$sdata.value.user.niveau + 1
      formData.value.created_At = new Date()
      
      try {
        let res1 = await axios({
        url: `http://localhost:1338/${serviceRole}`,
        method: "post",
        data: formData.value,
        headers:{ 
          Authorization: `Bearer ${token}`
        }
      })
      Notify.create({
            message: "Opération effectuée",
            type: "positive",
            position: 'top-right',
            actions: [
                { icon: 'close', color: 'white', }
              ]
        })

        if (res1) {
          let historique = await axios({
            url: `http://localhost:1338/historiques`,
            method: "post",
            data: {
                user: self.appContext.app.config.globalProperties.$sdata.value.user.id,
                title: `Création de permission`,
                message: `Vous avez créez ${formData.value.name}`,
                color: "info"
            },
            headers: {
                Authorization: `Bearer ${token}`
                }
            })
        }
      
      } catch (error) {
        console.log(error);
        Notify.create({
            message: "Opération echouée",
            type: "negative",
            position: 'top-right',
            actions: [
                { icon: 'close', color: 'white', }
              ]
        })
      }
      
       //Recuperer les roles creer par l'utilisateur connecté
      const query = qs.stringify({
        _where: [{ creator: self.appContext.app.config.globalProperties.$sdata.value.user.id}],
        _sort: "created_At:DESC"
      });
     
      let roles = await axios({
        url: `http://localhost:1338/${serviceRole}?${query}`,
        method: "get",
        params: {},
        headers:{ 
          Authorization: `Bearer ${token}` 
        }
      })
      //console.log("roles.data",roles.data.roles);
  
      let item = {}
      item.value = roles.data.roles[0]
  
      var tableau = []
      for (const iterator of item.value.permissions) {
          if (iterator.enabled) {
              tableau.push(iterator)
          }
      }
      item.value.permissions = tableau

      if (lastRole.value.length > 0) {
        lastRole.value.splice(lastRole.value.indexOf(0), 1)
        lastRole.value.push(item.value)
      } else {
        lastRole.value.push(item.value)
      }

      submitting.value = false
      permissionModal.value = true
      await stateRoles.getItems();
      addModal.value = false;
      formData.value.name = null
      formData.value.description = null
      
    }

    let onSubmit = async()=>{
      submitting.value = true
      formData.value.id = state.item.id
      state.item.id = formData.value.id
      state.item = formData.value
      state.updateForm.value = eForm.value 
      await state.update() 
      submitting.value = false
      await state.getItems() 
      edit.value = false 
    }

    let onAddAC = (itemListe) => {
      stateRoles.item = itemListe
      addACModal.value = true;
    };
   
    return {
      formData,
      eForm,
      stateRoles,
      state,
      onSubmit,
      options,
      filterFn,
      addModal,
      submitting,
      onSubmitRole,
      permissionModal,
      lastRole,
      addACModal,
      onAddAC
    }
 
  },

});
</script>
