<template>
  <q-card style="width: 700px; max-width: 80vw;">

    <q-card>
      <q-card-section class="row items-center q-pb-md">
        <div class="text-h6 ">Details</div>
        <q-space />
        <q-btn icon="close" color="negative" flat round dense v-close-popup />
      </q-card-section>

      <q-separator/>

      <q-card-section style="max-height: 70vh" class="scroll bg-secondary">
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-caption text-grey-6"> {{ $t('title')}} : </div>
            <div class="text-subtitle1 text-capitalize text-h5 q-mt-xs q-mb-lg"> {{ state.item.title }} </div>
            <div class="text-caption text-grey-6"> {{ $t('level')}} : </div>
            <div class="text-subtitle1 text-h5 q-mt-xs q-mb-lg"> {{ state.item.niveau }} </div>
            <div class="text-caption text-grey-6"> {{ $t('role')}} : </div>
            <div v-if="state.item.role" class="text-subtitle1 text-capitalize text-h5  q-mb-lg"> {{ state.item.role.name}} </div>
            <div class="text-subtitle1 text-capitalize text-h5 q-mb-lg" v-else>{{ $t('no_role')}}</div>


            <div v-if="state.item.creator">
              <div  class="text-caption text-grey-6"> {{ $t('created_by')}} : </div>
              <div class="text-subtitle1 text-capitalize text-h5 q-mb-lg"> {{ state.item.creator.nom}} {{ state.item.creator.prenom}}</div>
            </div>

            <div v-if="state.item.groupe">
              <div  class="text-caption text-grey-6"> {{ $t('faire_partir')}} : </div>
              <div class="text-subtitle1 text-capitalize text-h5 q-mb-xs"> {{ state.item.groupe.title}} </div>
            </div>
            
          </q-card-section>
        </q-card-section>  

        <div v-if="state.item.users.length > 0" > 
          <div class="text-caption text-grey-6 q-ml-md q-mt-xs"> {{ $t('user')}}(s) : </div>
          <div class="q-mt-sm">
            <div class="scroll" style="max-height: 115px;">
              <q-list v-for="item in state.item.users" :key="item.id" >
                <q-item class="bg-white q-ml-md q-mr-md q-mb-xs" style="border-radius: 15px;">
                  <q-item-section>
                    <q-item-label> {{ item.nom }} {{ item.prenom }} </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>

        </q-card-section>

    </q-card>

  </q-card>
</template>

<script>
import { defineComponent, ref, getCurrentInstance,onMounted, inject} from "vue";
export default defineComponent({
  // name: 'ComponentName',
  
  setup () {
    self = getCurrentInstance();
    let service = inject("service");
    let state = inject(service)

    return {
      state
    }
  }
})
</script>
