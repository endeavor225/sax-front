<template>
    <div class="q-ma-none q-pa-none" >
    <q-item class="bg-white q-ml-md q-mr-md q-mb-xs" style="border-radius: 15px;">
      <q-item-section>
        <q-item-label> {{ itemListe.name }} </q-item-label>
      </q-item-section>
     <q-item-section avatar>
        <q-btn icon="img:img/Remove.svg" flat color="negative" @click="onDelete" />
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { defineComponent, ref, inject, provide } from "vue";

export default defineComponent({

  components: {},

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

    var addAccesControlModal = ref(false);

    provide("addAccesControlModal", addAccesControlModal);

   
    var onDelete = () => {
      state.item = props.itemListe;
      addAccesControlModal.value = true;
    };

    return {
      onDelete,
      addAccesControlModal,
    };
  },
});
</script>