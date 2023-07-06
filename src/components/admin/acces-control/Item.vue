<template>
    <div v-if="$q.screen.xs">
      <q-item>
        <q-item-section>
          <q-item-label > {{ itemListe.title }} </q-item-label>
          <q-item-label class="text-caption text-grey"> {{ itemListe.value }} </q-item-label>
        </q-item-section>

      </q-item>
    </div>

    <div v-else class="col-md-4 col-sm-6 col-lg-3 q-pa-sm">
      <q-card flat  class="bg-green-1" style="height:220px">
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline"> {{$t('acces_controle') }}</div>
            <div class="text-caption text-grey-5"> {{ $t('title') }} :</div>
             <div class="text-h6 text-weight-medium q-mt-sm q-mb-xs"> {{ itemListe.controller}}</div>
            <div class="text-caption text-grey-5"> {{ $t('value') }} :</div>
            <div class="text-subtitle1 q-mt-sm q-mb-xs">{{ itemListe.action }}</div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
</template>

<script>
import {
  defineComponent,
  ref,
  inject,
  provide,
  onMounted
} from "vue";
export default defineComponent({


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

    onMounted(async () => {


    });

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
<style>


</style>
