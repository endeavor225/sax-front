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
      <div class="text-h3 q-ml-sm q-mt-md">{{ $t("list.group") }}</div>

      <div class="row q-ml-sm">
        <div class="col-8">
          <q-btn
            icon="add"
            :label="$t('add')"
            color="primary"
            @click="addModal = true"
            style="margin-top: 25px"
          />
        </div>

        <div class="col-4">
          <search />
        </div>
      </div>

      <div class="row">
        <liste-item
          v-for="item in state.items.value"
          :key="item._id"
          :itemListe="item"
        />
      </div>
      <div class="q-pa-lg flex justify-end">
        <q-pagination
          v-model="current"
          color="black"
          :max="state.totalItem.value"
          boundary-links
          active-color="primary"
          :min="1"
          :max-pages="4"
        />
      </div>
    </div>

    <q-dialog v-model="addModal">
      <add-item/>
    </q-dialog>

    <div v-if="$q.screen.xs">
      <q-btn
        icon="add"
        class="fixed-bottom-right q-mb-sm q-mr-sm"
        round
        color="secondary"
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

    provide("addModal", addModal);
    provide("service", service);

    let state = inject(service);

    provide("emptyItem", {
      //title: "",
    });

    let searchParams = (val) => {
      return {
        title: { $like: val },
      };
    };

    var start = 0;
    var limit = 10;
    var loading = false;

    provide("searchParams", searchParams);

    onMounted(async () => {

      //let req = await state.auth()
      state.filters.value = {
        _start: start,
        _limit: limit,
      };
      await state.getItems();
    });

    watch(current, async (newValue, oldValue) => {
      state.filters.value = {
        _start: (newValue - 1) * limit,
        _limit: limit,
      };

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
              _start: start,
              _limit: limit,
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
    };
  },
});
</script>
