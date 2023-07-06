<template>
  <div v-if="$q.screen.xs">
    <q-item>
      <q-item-section>
        <q-item-label> {{ itemListe.title }} </q-item-label>
      </q-item-section>
      <q-item-section></q-item-section>
      <q-item-section avatar>
        <q-btn icon="edit" flat color="primary" @click="onEdit" v-if="actionUpdate === true"/>
      </q-item-section>
      <q-item-section avatar>
        <q-btn icon="delete" flat color="negative" @click="onDelete" v-if="actionDelete === true"/>
      </q-item-section>
    </q-item>
  </div>

  <div v-else class="col-md-4 col-sm-6 col-lg-3 q-pa-sm">
    <q-card flat class="bg-green-1">
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
           <div v-if='itemListe.groupe' class="text-caption text-grey-6 "> {{ $t("group") }}  </div>
           <div  class="text-caption text-grey-6" v-else>{{ $t("no_group") }}</div>
            <div v-if='itemListe.groupe'>
             {{ itemListe.groupe.title }}
            </div> 
          <div class="text-caption text-grey-6 q-mt-md q-mb-none">
            <!-- {{ $t("acces_controle") }}(s) : <span class="text-grey-8">{{itemListe.permissions.length}}</span> -->
          </div>
        </q-card-section>

        <!-- ======================= Boutton ======================= -->
        <q-card-section class="absolute-right">
          <q-btn icon="add" padding="xs" color="primary" @click="onAddAC" v-if="actionUpdate === true">
            <q-tooltip class="bg-primary">
              <b> {{ $t('tooltip.added_role')}} </b>
            </q-tooltip>
          </q-btn>
        </q-card-section>
      </q-card-section>
      

      <div v-if='itemListe.permissions' class="text-caption text-grey-6 q-ml-md q-mt-xs"> {{ $t('acces_controle')}}(s) : <span class="text-grey-8">{{itemListe.permissions.length}}</span> </div>
      <div class="text-caption text-grey-6 q-ml-md" v-else>{{ $t('no_permission')}}</div>
      <div>
        <q-list class="scroll" style="height: 300px">
          <liste-acces-control
            v-for="item in itemListe.permissions"
            :key="item._key"
            :itemListe="item"
          />
        </q-list>
      </div>  

      <q-card-actions align="right">
        <q-btn icon="img:img/Modifier.svg" flat color="primary" @click="onEdit" v-if="actionUpdate === true">
          <q-tooltip class="bg-primary">
            <b> {{ $t('tooltip.edit_role')}} </b>
          </q-tooltip>
        </q-btn>

        <q-btn icon="img:img/Delete.svg" flat color="negative" @click="onDelete" v-if="actionDelete === true">
          <q-tooltip class="bg-negative">
            <b> {{ $t('tooltip.delete_role')}} </b>
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

  <q-dialog v-model="addACModal">
    <add-acces-control />
  </q-dialog>
</template>

<script>
import { defineComponent, ref, inject, provide, onMounted } from "vue";
import EditItem from "components/admin/role/Edit";
import DeleteItem from "components/admin/role/Delete";
import ListeAccesControl from "components/admin/role/role-acces-control/Item";
import AddAccesControl from "components/admin/role/role-acces-control/Add";
export default defineComponent({
  components: {
    EditItem,
    DeleteItem,
    ListeAccesControl,
    AddAccesControl,
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

    var addACModal = ref(false);

    provide("editModal", editModal);
    provide("deleteModal", deleteModal);
    provide("addModal", addACModal);

    let actionDelete = inject("actionDelete");
    let actionUpdate = inject("actionUpdate");

    var onEdit = () => {
      state.item = props.itemListe;
      editModal.value = true;
    };

    var onDelete = () => {
      state.item = props.itemListe;
      deleteModal.value = true;
    };

    var onAddAC = () => {
      state.item = props.itemListe;
      addACModal.value = true;
    };

    return {
      onEdit,
      onDelete,
      editModal,
      deleteModal,
      addACModal,
      onAddAC,
      actionDelete,
      actionUpdate
    };
  },
});
</script>