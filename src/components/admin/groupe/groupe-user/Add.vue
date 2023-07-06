<template>
  <div style="width: 700px">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h5 text-center text-weight-regular" style="width: 90%">
          {{ $t("affectation.add_user") }}
        </div>
        <q-space />
        <q-btn icon="close" color="black" flat round v-close-popup />
      </q-card-section>
      <q-card-section style="width: 90%; margin: auto">
        <q-btn
          icon="add"
          padding="sm"
          :label="$t('modal.add_user')"
          class="bg-primary text-weight-light text-capitalize q-mb-sm"
          style="color: white"
          @click="addModal = true"
        >
        </q-btn>
        <q-form @submit="onSubmit" ref="eForm">
          <q-select
            outlined
            v-model="formData.user"
            use-input
            input-debounce="0"
            :options="options"
            option-label="prenom"
            option-value="id"
            :label="$t('user')"
            @filter="filterFn"
            lazy-rules
            :rules="[(val) => !!val || 'Le champ utilisateur est obligatoire']"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  {{ $t("no_data") }}
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <div class="q-lg q-mb-sm row justify-between">
            <q-btn
              v-close-popup
              :label="$t('modal.cancel')"
              class="text-weight-regular"
              style="width: 45%; border: 1px solid #f8f7f7; color: black"
            />

            <q-btn
              type="submit"
              :label="$t('modal.add')"
              class="bg-primary text-weight-regular"
              style="width: 45%; color: white"
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
    <q-dialog v-model="addModal">
      <add-user />
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { Notify } from "quasar";
import {
  defineComponent,
  ref,
  getCurrentInstance,
  onMounted,
  toRaw,
  inject,
  provide,
} from "vue";
import AddUser from "components/admin/user/Add";
export default defineComponent({
  components: {
    AddUser,
  },

  props: {
    groupeId: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  setup(props) {
    self = getCurrentInstance();
    //const service = inject("service");
    const service = "groupes";

    let add = inject("addUserModal");
    let state = inject(service);
    let formData = ref({});
    let emptyItem = inject("emptyItem");

    for (const key of Object.keys(emptyItem)) {
      formData.value[key] = emptyItem[key];
    }
    let eForm = ref(null);
    let submitting = inject("traitement");

    const serviceUser = "users";
    let stateUsers = inject(serviceUser);

    var addModal = ref(false);
    provide("addModal", addModal);

    onMounted(async () => {
      stateUsers.filters.value = Object.assign(
        stateUsers.filters.value ? stateUsers.filters.value : {},
        {
          _limit: 10000,
          _start: 0,
        }
      );

      await stateUsers.getItems();
    });

    const options = ref(stateUsers.items.value);

    let filterFn = (val, update) => {
      if (val === "") {
        update(() => {
          options.value = stateUsers.items.value;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        options.value = stateUsers.items.value.filter(
          (v) => v.prenom.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    let onSubmit = async () => {
      submitting.value = true;

      let token = self.appContext.app.config.globalProperties.$sdata.value.jwt;

      /*========================  On verifie si le l'utilisateur est dans le groupe  ============================*/
      //Recupretion du goupre grace au props groupeId pour fait un filtre sur les groupes

      let res = await axios({
        url: `http://localhost:1338/${service}/${props.groupeId.id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      state.item = res.data

      // On parcour les groupe pour voir l'utilisateur selectionné existe déjà
      let user_trouve = [];
      let user = [];
      for (const item of res.data.users) {
        if (item.id === formData.value.user.id) {
          user_trouve.push(item);
        }
      }

      // Convertir le taleau 'user_trouve' en objet
      user = Object.values(user_trouve)[0];
      //console.log(user)
      // Si l'utilisateur existe on fait çà
      if (user) {
        Notify.create({
          message: `${formData.value.user.nom} ${formData.value.user.prenom} existe déjà dans ce groupe`,
          type: "info",
          position: "top-right",
          progress: true,
          timeout: 3500,
          actions: [
            {
              icon: "close",
              color: "white",
              handler: () => {
                /* ... */
              },
            },
          ],
        });

        submitting.value = false;
        // Sinon çà
      } else {
        //ajouter lutilisateur selectionné a la liste item
        state.item.users.push(formData.value.user);
        //formulaire de validation
        state.updateForm.value = eForm.value;
        //mise a jour du service groupes
        await state.update();
        submitting.value = false;
        //mise a jour de la liste
        await state.getItems();
        add.value = false;
      }
    };
    return {
      formData,
      eForm,
      onSubmit,
      stateUsers,
      state,
      options,
      filterFn,
      addModal,
      submitting,
    };
  },
});
</script>
