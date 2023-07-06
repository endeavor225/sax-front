<template>
  <div class="q-ma-none q-pa-none">
    <q-item class="bg-white q-ml-md q-mr-md q-mb-xs" style="border-radius: 15px;">
      <q-item-section>
        <q-item-label> {{ itemListe.controller }}.{{ itemListe.action }} </q-item-label>
      </q-item-section>
      <q-item-section avatar>
        <q-btn icon="img:img/Remove.svg" flat color="negative" style="font-size:110%" @click="onDelete" v-if="actionUpdate === true"/>
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
    let actionUpdate = inject("actionUpdate");

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
      actionUpdate
    };
  },
});
</script>
