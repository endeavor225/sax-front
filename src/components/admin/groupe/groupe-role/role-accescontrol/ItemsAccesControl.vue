<template>
  <div>
    <q-item>
      <q-item-section style="margin: 0px; padding: 0px">
        <q-item-label> {{ itemListe.title }} </q-item-label>
      </q-item-section>
      <q-item-section avatar>
        <q-btn icon="logout" flat color="negative" @click="onDelete" />
      </q-item-section>
    </q-item>
  </div>

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
import DeleteItem from "components/admin/role/role-acces-control/Delete";
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
  },

  setup(props) {
    const service = inject("service");
    let state = inject(service);

    var editModal = ref(false);
    var deleteModal = ref(false);

    provide("editModal", editModal);
    provide("deleteModal", deleteModal);

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
    };
  },
});
</script>
