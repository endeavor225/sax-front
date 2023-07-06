<template>
  <q-page padding>
    <div v-if="$q.screen.xs">
      <div class="col-12">
          <search />
      </div>
      <q-infinite-scroll @load="onLoad" :offset="20">
        <q-list separator>
          <liste-item
            v-for="item in state.items.value"
            :key="item.id"
            :itemListe="item"
          />
        </q-list>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>

    <div v-else>
      <div class="text-h3 text-dark q-pa-sm q-mb-sm q-mt-sm" style="margin-top: 20px"> {{ $t('list.group') }}</div>

      <div class="row q-ml-sm" style="margin-top: 10px">
        <div class="col-8">
          <q-btn
            icon="add"
            :label="$t('add')"
            color="primary"
            @click="addModal = true"
            style="margin-top:20px"
            v-if="actionCreate ===true"
          />
        </div>

        <div class="col-4 ">
            <!--component de recherche -->
          <search /> 
        </div>
      </div>

      <div class="row">
         <!-- component  de la liste des groupes -->
        <liste-item
          v-for="item in state.items.value"
          :key="item.id"
          :itemListe="item"
        />
      </div>
      <div class="q-pa-lg flex justify-end">
        <q-pagination
         v-model="current"
            color="black"
            :max="state.totalItem.value"
            boundary-links
            active-color="primary">
        </q-pagination>
      </div>
    </div>
    <q-dialog v-model="addModal">
      <add-item />
    </q-dialog>
    <div v-if="$q.screen.xs">
      <q-btn
        icon="add"
        class="fixed-bottom-right q-mb-sm q-mr-sm"
        round
        color="primary"
        @click="addModal = true"
      />
    </div>
  </q-page>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  getCurrentInstance,
  inject,
  provide,
  watch,
} from "vue";
import qs from "qs";
import ListeItem from "components/admin/groupe/Item";
import AddItem from "components/admin/groupe/Add";
import Search from "components/admin/groupe/Search";
export default defineComponent({
  components: {
    ListeItem,
    AddItem,
    Search,
  },

  setup() {
    self = getCurrentInstance();
    const service = "groupes";
    var addModal = ref(false);
    var searchModal = ref(false);
    var current = ref(1);
    let submitting = ref(false)
    provide("traitement", submitting);
    provide("addModal", addModal);
    provide("service", service);
    let state = inject(service);

    //=============Autorisations
    let actionCreate = ref(false)
    let actionDelete = ref(false);
    let actionUpdate = ref(false);
    provide("actionDelete", actionDelete);
    provide("actionUpdate", actionUpdate);

    provide("emptyItem", {
      //title="",
    });

    let searchParams = (val) => {
      return {
        title: { $like: val },
      };
    };
  
    var start = 0;
    var limit = 10;
    var loading = false
    provide("searchParams", searchParams);

    onMounted(async () => {
      //Autorisations
      actionCreate.value = await state.autorisation("create")
      actionDelete.value = await state.autorisation("delete")
      actionUpdate.value = await state.autorisation("update") 
      //ajout d'un filtre 
      state.filters.value = {
        _start: start,
        _limit: limit,
      }
      //requete pour recuperer la liste des groupes
      await state.getItems();
    });
     //a chaque watch on ajoute un filtre a la requete de la liste des groupe
    watch(current, async (newValue, oldValue) => {
      state.filters.value = {
        _start: (newValue - 1) * limit,
        _limit: limit,
      }
      await state.getItems();
    });

    let onLoad = async (index, done) => {
      if (loading) {
        done();
      } else {
        if (index) {
          loading = true;

          state.filters.value = Object.assign(
            state.filters.value ? state.filters.value : {},
            {
              _limit: limit,
              _start: start,
            }
          );

          await state.getItems(true);
          let res = state.items.value;

          loading = false;

          if (res.length === 0) {
            done();
          } else {
            start = res.length;
            done(true);
          }
        } else {
          loading = true;

          await state.getItems(true);

          let res = state.items.value;
          loading = false;
          start += res.length;
          done ? done() : "";
        }
      }
    };

    return {
      state,
      addModal,
      searchModal,
      current,
      onLoad,
      actionCreate
    };
  },
});
</script>
