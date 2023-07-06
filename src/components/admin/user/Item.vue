<template>
    <div v-if="$q.screen.xs">
      <q-item>
        <q-item-section>
          <q-item-label> {{ itemListe.nom }} {{ itemListe.prenom }}</q-item-label>
          <q-item-label class="text-caption text-grey"> {{ itemListe.username }} </q-item-label>
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
      <q-card flat class="bg-green-1" > 
        <q-card-section horizontal> 
          <q-card-section class="q-pt-xs"> 
            <div class="text-overline"> {{ $t('user')}} </div> 
            <div class="text-caption text-grey-6"> {{ $t('full_name')}} </div> 
            <div class="text-h5 q-mt-xs q-mb-lg">{{ itemListe.nom }} {{ itemListe.prenom }}</div>
            <div class="text-caption text-grey-6"> {{ $t('role')}} : </div>
            <div class="text-subtitle1 q-mt-xs q-mb-xs" v-if="itemListe.role">{{ itemListe.role.name}}</div>
            <div class="text-subtitle1 q-mt-xs q-mb-xs" v-else>{{ $t('no_role')}}</div>
          </q-card-section>
        </q-card-section> 

        <div class="text-caption text-grey-6 q-ml-md q-mt-xs"> {{ $t('group')}}(s) : <span class="text-grey-8">{{itemListe.groupes.length}}</span></div>
        <div class="q-mt-sm">
          <q-list class="scroll" style="height: 115px; ">

            <liste-groupes
              v-for="item in itemListe.groupes"
              :key="item.id"
              :itemGroupe="item"
              :itemid ="itemListe.id"
            />
          </q-list>
        </div>
        <!-- <div class="text-subtitle1 q-ml-md q-mt-xs"  style="height: 122px;" v-if="itemListe.groupes.length === 0">{{ $t('no_group')}}</div> -->


        <q-card-actions align="right">

          <q-btn icon="manage_accounts" style="padding:5px; font-size:15px;" color="primary" @click="onEditRole" flat size="10px" v-if="actionUpdate === true">
           <q-tooltip class="bg-primary">
             <b> {{ $t('tooltip.edit_role')}} </b>
            </q-tooltip>
          </q-btn>

          <q-btn icon="group_add" style=" font-size:18px;" padding="xs" flat color="primary"  @click="onAddGroupe" v-if="actionUpdate === true">
            <q-tooltip class="bg-primary">
             <b> {{ $t('tooltip.assign_group')}} </b>
            </q-tooltip>
          </q-btn>
         
          <q-btn icon="img:img/Modifier.svg" flat color="primary" @click="onEdit" v-if="actionUpdate === true"> 
            <q-tooltip class="bg-primary"> 
             <b> {{ $t('tooltip.edit_user')}} </b> 
            </q-tooltip> 
          </q-btn> 

          <q-btn icon="img:img/Delete.svg" flat color="negative" @click="onDelete" v-if="actionDelete === true"> 
            <q-tooltip class="bg-negative"> 
             <b> {{ $t('tooltip.delete_user')}} </b> 
            </q-tooltip> 
          </q-btn>  
        </q-card-actions> 
      </q-card> 
    </div> 

    <q-dialog v-model="addRoleModal">
      <add-role />
    </q-dialog>

    <q-dialog v-model="editRoleModal">
      <edit-role />
    </q-dialog>

     <q-dialog v-model="addGroupeModal">
         <add-groupe-modal/>
    </q-dialog>

     <q-dialog v-model="editGroupeModal">
      <edit-groupe />
    </q-dialog>

    <q-dialog v-model="editModal">
      <edit-item />
    </q-dialog>

    <q-dialog v-model="deleteModal">
      <delete-item />
    </q-dialog>
    
</template>

<script>
import { defineComponent, ref, inject, provide, onMounted} from "vue";

import EditItem from "components/admin/user/Edit";
import DeleteItem from "components/admin/user/Delete";
import AddRole from "components/admin/user/user-role/Add";
import EditRole from "components/admin/user/user-role/Edit"
import addGroupeModal from "components/admin/user/user-groupe/Add"
import editGroupe from "components/admin/user/user-groupe/Edit"
import ListeGroupes from "components/admin/user/user-groupe/Item";
export default defineComponent({

  components: {
    EditItem,
    DeleteItem,
    AddRole,
    EditRole,
    addGroupeModal,
    editGroupe,
    ListeGroupes
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
    var addRoleModal = ref(false);
    var editRoleModal = ref(false);
    var addGroupeModal = ref(false);
    var editGroupeModal = ref(false);

    provide("editModal", editModal);
    provide("deleteModal", deleteModal);
    provide("addRoleModal", addRoleModal);
    provide("editRoleModal", editRoleModal);
    provide("addGroupeModal", addGroupeModal);
    provide("editGroupeModal", editGroupeModal);

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

    var onAddRole =()=>{
      state.item = props.itemListe;
      addRoleModal.value = true;
    }

    var onEditRole =()=>{
      state.item = props.itemListe;
      editRoleModal.value = true;
    }

    var onAddGroupe=()=>{
      state.item = props.itemListe;
      addGroupeModal.value = true;
    }

    var onEditGroupe=()=>{
      state.item = props.itemListe;
      editGroupeModal.value = true
    }

    return {
      onEdit,
      onDelete,
      editModal,
      deleteModal,
      onAddRole,
      onEditRole,
      addRoleModal,
      editRoleModal,
      onAddGroupe,
      onEditGroupe,
      addGroupeModal,
      editGroupeModal,
      actionDelete,
      actionUpdate
      
    };
  },
});
</script>
