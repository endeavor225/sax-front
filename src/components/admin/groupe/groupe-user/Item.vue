<template>
  <div class="q-ma-none q-pa-none">
    <q-item
      class="bg-white q-ml-md q-mr-md q-mb-xs"
      style="border-radius: 15px"
    >
      <q-item-section>
        <q-item-label>
          {{ itemListe.nom }} {{ itemListe.prenom }} 
        </q-item-label>
      </q-item-section>
     <q-item-section avatar>
        <q-btn icon="img:img/Remove.svg" flat color="negative" @click="onDelete" v-if="actionUpdate === true" />
      </q-item-section>
    </q-item>
  </div>

  <q-dialog v-model="deleteModal">
    <div style="width: 700px">
      <q-card>
        <q-card-section class="row items-center q-mb-sm q-pb-none">
          <div class="text-h5 text-center" style="width: 90%">Confirmation</div>
          <q-space />
          <q-btn icon="close" color="black" flat round v-close-popup />
        </q-card-section>

        <q-card-section
          class="q-pt-none text-center"
          style="width: 80%; margin: auto"
        >
          {{ $t("affectation.remove_user") }}
        </q-card-section>

        <q-card-section>
          <q-form ref="eForm" @submit="onSubmit">
            <q-card-actions
              align="center"
              class="q-lg q-mb-sm row justify-between"
            >
              <q-btn
                v-close-popup
                :label="$t('no')"
                class="text-weight-regular"
                style="width: 45%; border: 1px solid #f8f7f7; color: black"
              />
              <q-btn
                type="submit"
                :label="$t('yes')"
                class="bg-primary text-weight-regular"
                style="width: 45%; color: white"
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
  </q-dialog>
</template>

<script>
import { defineComponent, ref, inject, provide, onMounted } from "vue";
import DeleteItem from "components/admin/groupe/groupe-user/Delete";
import axios from "axios";
export default defineComponent({
  components: {
    DeleteItem,
  },

  props: {
    itemListe: {
      type: Object,
      default() {
        return {};
      },
    },
    itemid: {
      type: String,
    },
  },

  setup(props) {
    const service = inject("service");
    let state = inject(service);
    var editModal = ref(false);
    var deleteModal = ref(false);
    let eForm = ref(null);
    let formData = ref({});
    let users = {};
     
  
    provide("editModal", editModal);
    provide("deleteModal", deleteModal);

    let submitting = inject("traitement");
    let actionUpdate = inject("actionUpdate");

    var onEdit = () => {
      state.item = props.itemListe;
      editModal.value = true;
   
    };

    var onDelete = () => {
      state.item = props.itemListe;
      deleteModal.value = true;
      users = state.item;
 
    };
  
    let onSubmit = async () => {
      //console.log(state.items.value);
      let token = self.appContext.app.config.globalProperties.$sdata.value.jwt;
      for (const key in state.items.value) {
        if (state.items.value[key].id === props.itemid) {

          let res = await axios({
            url: `http://localhost:1338/${service}/${state.items.value[key].id}`,
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          state.items.value[key] = res.data
          //index de l'utilisateur a supprimer dans le tableau users
          let index = state.items.value[key].users.findIndex(x => x.id === users.id);
          state.items.value[key].users.splice(index,1);
          state.item = state.items.value[key];
          
        }
      }

      state.updateForm.value = eForm.value;
      submitting.value = true;
      await state.update();
      submitting.value = false;
      await state.getItems();
      deleteModal.value = false
    };

    return {
      eForm,
      onEdit,
      onDelete,
      editModal,
      deleteModal,
      onSubmit,
      formData,
      submitting,
      actionUpdate,
    };
  },
});
</script>