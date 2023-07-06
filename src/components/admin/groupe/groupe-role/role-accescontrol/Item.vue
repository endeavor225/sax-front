<template>
  <div class="" style="width: 600px">
    <q-card><q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          {{ state.item.role[0].title}} 
        </div>
        <q-space />
        <q-btn icon="add" round color="secondary" class="q-mr-sm q-mb-sm" @click="addModal = true">
          <q-tooltip class="bg-secondary">
            <b> {{ $t('modal.add_role')}} </b>
          </q-tooltip>
        </q-btn>
        <q-btn icon="close" color="negative" flat round v-close-popup />
      </q-card-section>

       <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
       </q-card-section>
       

       <q-card-actions align="right">
          <q-btn flat label="Fermer" color="negative" v-close-popup />
        </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import {defineComponent, ref, getCurrentInstance, onMounted, toRaw, inject} from "vue";
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
    self = getCurrentInstance();

    let service = inject("service");
    let state = inject(service)
    console.log(state);
  
    return {
      state,
    };
  },
});
</script>
