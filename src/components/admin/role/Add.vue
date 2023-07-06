<template>
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
        <q-form @submit="onSubmit" ref="eForm">
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
                'ce champ doit contenir au moins 3 caractères',]"
          />

            <q-select
            outlined
            v-model="formData.groupe"
            use-input
            input-debounce="0"
            :options="options"
            option-label="title"
            option-value="id"
            :label="$t('group')"
            @filter="filterFn"
            lazy-rules
            :rules="[(val) => !!val || 'Le champ groupe est obligatoire']"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  {{ $t("no_data") }}
                </q-item-section>
              </q-item>
            </template>
          </q-select>
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
</template>

<script>
import { defineComponent, ref, getCurrentInstance, inject,  onMounted } from "vue";
import axios from "axios";
export default defineComponent({
  setup() {
    self = getCurrentInstance();
    const service = "users-permissions/roles";
    const groupeUser= "groupes"
    let stategroupeUser= inject(groupeUser)
    let state = inject(service);
    let add = inject("addModal");
    const serviceAcces = "users-permissions/permissions";
    let stateAcces = inject(serviceAcces);
    let formData = ref({});
    let eForm = ref(null);
    let emptyItem = inject("emptyItem");
    let submitting = inject("traitement")
    let token = self.appContext.app.config.globalProperties.$sdata.value.jwt
    let groupe = ref([])
    const options = ref()
    for (const key of Object.keys(emptyItem)) {
      formData.value[key] = emptyItem[key];
    }
    
    let user = self.appContext.app.config.globalProperties.$sdata.value.user.id 
    onMounted(async () => {
      stategroupeUser.filter =  user 
      await stategroupeUser.getItems()
      console.log('ffff',stategroupeUser.items.value); 
    });

     let filterFn = (val, update) => {
       if (val === '') {
          update(() => {
            options.value = stategroupeUser.items.value
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          options.value = stategroupeUser.items.value.filter(v => v.title.toLowerCase().indexOf(needle) > -1)
        })
    }

    let onSubmit = async () => {
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
      groupe.value.push(formData.value.groupe)
      formData.value.permissions = res.data.permissions
      formData.value.groupes = groupe.value
      state.item.value = formData.value;
      state.createForm.value = eForm.value;
      await state.create();
      submitting.value = false
      await state.getItems();
      add.value = false;
    };

    return {
      formData,
      eForm,
      onSubmit,
      submitting,
      options,
      filterFn 
    };
  },
});
</script>
