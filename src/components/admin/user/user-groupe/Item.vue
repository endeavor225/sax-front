<template>
  <div class="q-ma-none q-pa-none" >
    <q-item class="bg-white q-ml-md q-mr-md q-mb-xs" style="border-radius: 15px;">
      <q-item-section>
        <q-item-label> {{ itemGroupe.title }} </q-item-label>
      </q-item-section>
     <q-item-section avatar>
        <q-btn icon="img:img/Remove.svg" flat color="negative" @click="onDelete" v-if="actionUpdate === true"/>
      </q-item-section>
    </q-item>
  </div>

  <q-dialog v-model="deleteModal">
       <div style="width: 700px">
      <q-card>
        <q-card-section class="row items-center q-mb-sm  q-pb-none">
          <div class="text-h5 text-center  " style="width:90%" >Confirmation</div>
          <q-space />
         <q-btn icon="close" color="black" flat round v-close-popup />
       </q-card-section>

        <q-card-section class="q-pt-none text-center" style="width:80%; margin:auto">
          {{$t('affectation.remove_user')}}
        </q-card-section>

        <q-card-section>
        <q-form
          ref="eForm"
          @submit="onSubmit"
        >
          <q-card-actions align="center" class="q-lg q-mb-sm row justify-between">
            <q-btn v-close-popup :label="$t('no')" class="text-weight-regular" style='width:45%; border:1px solid #F8F7F7 ;color:black' />
            <q-btn type="submit" :label="$t('yes')" 
              class="bg-primary text-weight-regular"  
              style="width:45%; color:white"
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
import { defineComponent, ref, inject, provide } from "vue";
import DeleteItem from "components/admin/groupe/groupe-user/Delete";
export default defineComponent({

  components: {
    DeleteItem,
  },

  props: {
    itemGroupe: {
      type: Object,
      default() {
        return {};
      },
    },
    itemid:{
      type:String
    }
  },
 
  setup(props) {
    const service = inject("service");
    let state = inject(service);
    var editModal = ref(false);
    var deleteModal = ref(false);
    let eForm = ref(null)
    let formData = ref({})
    let groupes = {}

    provide("editModal", editModal);
    provide("deleteModal", deleteModal);

    let submitting = inject("traitement")

    let actionUpdate = inject("actionUpdate");
  
    var onEdit = () => {
      state.item = props.itemListe;
      editModal.value = true;
      console.log();
    };

    var onDelete = () => {
      state.item = props.itemGroupe;
      deleteModal.value = true;
      groupes = state.item
    };
  

    let onSubmit = async ()=> {      
      console.log(state.items.value);

      for (const key in state.items.value) {
           if (state.items.value[key].id === props.itemid) {
              state.item = state.items.value[key].groupes
              state.items.value[key].groupes.splice(state.items.value[key].groupes.indexOf(groupes),1)
              state.item = state.items.value[key]
           }
      }
  
      state.updateForm.value = eForm.value
      submitting.value = true
      await state.update()
      submitting.value = false
      await state.getItems()
      deleteModal.value = false
    }

    return {
      eForm ,
      onEdit,
      onDelete,
      editModal,
      deleteModal,
      onSubmit,
      formData,
      submitting,
      actionUpdate
    };
  },
});
</script>