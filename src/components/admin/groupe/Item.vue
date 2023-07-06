<template>
  <div class="col-md-4 col-sm-6 col-lg-3 q-pa-sm">
    <!-- {{itemListe}} -->
    <q-card flat class="bg-green-1" v-if="itemListe.categorie_groupe">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline"> {{ $t('group') }} </div> 
          <div class="text-caption text-grey-6 text-capitalize"> {{ itemListe.categorie_groupe.title }} : </div>
          <div class="text-subtitle1 text-capitalize text-h5 q-mt-xs q-mb-lg"> {{ itemListe.title }} </div>
       

          <div v-if="itemListe.groupe" class="q-mb-xs q-mt-lg">
            <div class="text-caption text-grey-6"> {{ $t('faire_partir')}} : </div>
            <div class="text-subtitle1 text-capitalize text-h5 q-mb-xs"> {{ itemListe.groupe.title}} </div>
          </div>
          <div v-else class="q-mb-xs q-mt-lg">
            <div class="text-caption text-grey-6"> {{ $t('faire_partir')}} : </div>
            <div class="text-subtitle1 text-capitalize text-h5 q-mb-xs"> Pas parrainé </div>
          </div>

          
        </q-card-section>

        <q-card-section class="absolute-right">
           
          <q-btn icon="person_add" style="padding:5px; font-size:15px;" flat color="primary" @click="onAddUser" v-if="actionUpdate === true" padding="xs" class="q-mr-sm">
              <q-tooltip class="bg-primary">
                <b> {{ $t('tooltip.add_user')}} </b>
              </q-tooltip>
          </q-btn>
      </q-card-section>
      </q-card-section>  
            
          <div v-if='itemListe.users' class="text-caption text-grey-6 q-ml-md q-mt-xs"> {{ $t('user')}}(s) : <span class="text-grey-8">{{itemListe.users.length}}</span> </div>
          <div class="text-caption text-grey-6 q-ml-md" v-else>{{ $t('no_user')}}</div>
          <div class="q-mt-sm"> 
            <q-list class="scroll" style="height: 115px;">
              <liste-users
                v-for="item in itemListe.users"
                :key="item.id"
                :itemListe="item"
                :itemid ="itemListe.id"
              />
            </q-list>
          </div>
      <q-card-actions align="right" style="">
         
        <q-btn icon="img:img/Modifier.svg" flat color="primary" @click="onEdit" v-if="actionUpdate === true" >
            <q-tooltip class="bg-primary">
             <b> {{ $t('tooltip.edit_group')}} </b>
            </q-tooltip>
        </q-btn>
        
        <q-btn icon="img:img/Delete.svg" flat color="negative" @click="onDelete" v-if="actionDelete === true" >
           <q-tooltip class="bg-negative">
             <b> {{ $t('tooltip.delete_group')}} </b>
            </q-tooltip>
        </q-btn>
        
      </q-card-actions>
    </q-card>


    <q-dialog v-model="editModal">
    <edit-item />
  </q-dialog>

  <q-dialog v-model="deleteModal">
    <delete-item />
  </q-dialog>

  <q-dialog v-model="addUserModal">
    <add-user :groupeId="itemListe"/>
  </q-dialog>

  <q-dialog v-model="addRoleModal">
    <add-role />
  </q-dialog>

  <q-dialog v-model="editRoleModal">
    <edit-role />
  </q-dialog>

  <q-dialog v-model="addAccesControlModal">
    <add-access-control />
  </q-dialog>

  <q-dialog v-model="itemAccesControlModal">
    <item-access-control />
  </q-dialog>

  <q-dialog v-model="showGroupModal">
    <show-group/>
  </q-dialog>

  </div>
</template>

<script>
import { defineComponent, ref, inject, provide, onMounted } from "vue";
import EditItem from "components/admin/groupe/Edit";
import DeleteItem from "components/admin/groupe/Delete";
import AddUser from "components/admin/groupe/groupe-user/Add"
import AddRole from "components/admin/groupe/groupe-role/Add";
import EditRole from "components/admin/groupe/groupe-role/Edit";
import ListeUsers from "components/admin/groupe/groupe-user/Item";
import AddAccessControl from "components/admin/groupe/groupe-role/role-accescontrol/Add"
import ItemAccessControl from "components/admin/groupe/groupe-role/role-accescontrol/Item"
import ListeRole from "components/admin/groupe/groupe-role/Item";
import ShowGroup from "components/admin/groupe/Show"
export default defineComponent({
  components: {
    EditItem,
    DeleteItem,
    AddUser,
    AddRole,
    ListeUsers,
    EditRole,
    AddAccessControl,
    ItemAccessControl,
    ListeRole,
    ShowGroup
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
    //service utilisé est groupes
    const service = "groupes";
    var state = inject(service); 
    var editModal = ref(false);
    var deleteModal = ref(false);
    var addUserModal = ref(false);
    var addRoleModal = ref(false);
    var editRoleModal = ref(false);
    var addAccesControlModal = ref(false);
    var itemAccesControlModal = ref(false);
    let showGroupModal = ref(false);


    provide("editModal", editModal);
    provide("deleteModal", deleteModal);
    provide("addUserModal", addUserModal);
    provide("addRoleModal", addRoleModal);
    provide("editRoleModal", editRoleModal);
    provide("addAccesControlModal", addAccesControlModal);
    provide("itemAccesControlModal", itemAccesControlModal)
     
    let actionDelete = inject("actionDelete");
    let actionUpdate = inject("actionUpdate"); 
    
    onMounted( async () =>{
       
        state.item = props.itemListe
        console.log(state.item)
    })   
    var onEdit = () => {
      state.item = props.itemListe;
      editModal.value = true;
    };

    var onDelete = () => {
      state.item = props.itemListe;
      deleteModal.value = true;
    };

    var onShow = () => {
      state.item = props.itemListe;
      showGroupModal.value = true;
    };

    var onAddUser = () => {
      state.item = props.itemListe;
      addUserModal.value = true;
    };

    var onAddRole = () => {
      state.item = props.itemListe;
      addRoleModal.value = true;
  
    };
    
    var onEditRole = () => {
      state.item = props.itemListe;
      editRoleModal.value = true;
  
    };

    var onAddAccesControl = () => {
      state.item = props.itemListe;
      addAccesControlModal.value = true;
    
    };

    var onItemRole = () => {
      state.item = props.itemListe;
      itemAccesControlModal.value = true;
   
    };

    return {
      onEdit,
      onDelete,
      editModal,
      deleteModal,
      onAddUser,
      onAddRole,
      addUserModal,
      addRoleModal,
      onEditRole,
      editRoleModal,
      onAddAccesControl,
      addAccesControlModal,
      itemAccesControlModal,
      onItemRole,
      onShow,
      showGroupModal,
       actionDelete,
       actionUpdate
    };
  },
});
</script>
