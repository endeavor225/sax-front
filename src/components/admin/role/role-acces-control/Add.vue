<template>
  <div style="width: 700px">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-center" style="width: 90%">
          {{ $t("affectation.add_acces_control") }}
        </div>
        <q-space />
        <q-btn icon="close" color="dark" flat round v-close-popup />
      </q-card-section>

      <q-card-section style="width: 90%; margin: auto">
        <q-form @submit="onSubmit" ref="eForm">
          <q-select
            outlined
            v-model="formData.permissions"
            multiple
            :options="options"
            use-input
            input-debounce="0"
            :option-label="(item) => item === null ? 'Null value' : item.controller + ' ' + item.action"
            option-value="id"
            :label="$t('acces_controle')"
            @filter="filterFn"
            lazy-rules
            :rules="[
              (val) => !!val || 'Le champ accès control est obligatoire',
            ]"
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
import {
  defineComponent,
  ref,
  getCurrentInstance,
  onMounted,
  inject,
} from "vue";
import axios from "axios";
export default defineComponent({
  setup() {
    self = getCurrentInstance();
    const service = "users-permissions/roles";

    let add = inject("addModal");
    let state = inject(service);
    let formData = ref({});
    let emptyItem = inject("emptyItem");
    let submitting = inject("traitement")
    let token = self.appContext.app.config.globalProperties.$sdata.value.jwt

    for (const key of Object.keys(emptyItem)) {
      formData.value[key] = emptyItem[key];
    }

    let eForm = ref(null);

    const serviceAcces = "users-permissions/permissionss";
    let stateAcces = inject(serviceAcces);

    const serviceRole = "users-permissions/roles";
    let stateRole = inject(serviceRole);

    onMounted(async () => {
      stateAcces.filters.value = Object.assign(
        stateAcces.filters.value ? stateAcces.filters.value : {},
        {
          _limit: 10000,
          _start: 0,
          "role.type": "public"
        }
      );

      await stateAcces.getItems();
    });

    const options = ref(stateAcces.items.value)

    let filterFn = (val, update) => {
      if (val === "") {
        update(() => {
          options.value = stateAcces.items.value;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        options.value = stateAcces.items.value.filter(
          (v) => v.controller.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    let onSubmit = async () => {
      submitting.value = true

      let res = await axios({
        url: `http://localhost:1338/${service}/${state.item.id}`,
        method: "get",
        params: {},
        headers:{ 
          Authorization: `Bearer ${token}`       
        }
      })
      var tab = res.data

      for (const key in formData.value.permissions) {
        formData.value.permissions[key].role = state.item.id
        state.item.permissions = formData.value.permissions
        var action = state.item.permissions[key].action
        var controller = state.item.permissions[key].controller
        var type = state.item.permissions[key].type
        tab.role.permissions[type].controllers[controller][action].enabled = true
      }

      state.item = tab.role

      state.updateForm.value = eForm.value
      await state.update()
      submitting.value = false
      await state.getItems()
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
      submitting
    };
  },
});
</script>
