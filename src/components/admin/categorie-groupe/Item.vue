<template>
    <div v-if="$q.screen.xs">
      <q-item>
        <q-item-section>
          <q-item-label> {{ itemListe.title }} </q-item-label>
          <q-item-label> {{ itemListe.niveau }} </q-item-label>
        </q-item-section>
        <q-item-section></q-item-section>
        <q-item-section avatar>
          <q-btn icon="edit" flat color="primary" @click="onEdit" />
        </q-item-section>
        <q-item-section avatar>
          <q-btn icon="delete" flat color="negative" @click="onDelete" />
        </q-item-section>
      </q-item>
    </div>

    <div v-else class="col-md-4 col-sm-6 col-lg-3 q-pa-sm">
      <q-card flat class="bg-green-1">
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline"> {{ $t('categorie_groupe')}} </div>
            <div class="text-caption text-grey-6"> {{ $t('title')}} : </div>
            <div class="text-h5 text-capitalize q-mt-sm q-mb-xs">{{ itemListe.title }}</div>
          </q-card-section>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn icon="img:img/Modifier.svg" flat color="primary" @click="onEdit" v-if="actionUpdate === true">
            <q-tooltip class="bg-primary">
             <b> {{ $t('tooltip.edit_categorie_groupe')}} </b>
            </q-tooltip>
          </q-btn>

          <q-btn icon="img:img/Delete.svg" flat color="negative" @click="onDelete" v-if="actionDelete === true">
          <q-tooltip class="bg-negative">
             <b> {{ $t('tooltip.delete_categorie_groupe')}} </b>
            </q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <q-dialog v-model="editModal">
      <edit-item />
    </q-dialog>

    <q-dialog v-model="deleteModal">
      <delete-item />
    </q-dialog>
</template>

<script>
import {
  defineComponent,
  ref,
  inject,
  provide,
} from "vue";
import EditItem from "components/admin/categorie-groupe/Edit";
import DeleteItem from "components/admin/categorie-groupe/Delete";
export default defineComponent({

  components: {
    EditItem,
    DeleteItem,
  },

  props: {
    itemListe: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  setup(props) {
    const service = inject("service");
    let state = inject(service);

    var editModal = ref(false);
    var deleteModal = ref(false);

    provide("editModal", editModal);
    provide("deleteModal", deleteModal);

    let actionUpdate = inject("actionUpdate");
    let actionDelete = inject("actionDelete");

    var onEdit = () => {
      state.item = props.itemListe;
      editModal.value = true;
    };

    var onDelete = () => {
      state.item = props.itemListe;
      deleteModal.value = true;
    };

    return {
      onEdit,
      onDelete,
      editModal,
      deleteModal,
      actionUpdate,
      actionDelete
    };
  },
});
</script>
