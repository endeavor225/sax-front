<template>
    <div>
      <q-input
       
        bottom-slots
        v-model="search"
        :label="$t('search')"
        class="q-pa-sm"
        bg-color="secondary"
      >
        <template v-slot:append>
          <q-icon
            v-if="search !== ''"
            name="close"
            @click="search = ''"
            class="cursor-pointer"
          />
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
</template>

<script>
import {
  defineComponent,
  watch,
  ref,
  getCurrentInstance,
  inject,
} from "vue";
export default defineComponent({

  setup() {
    self = getCurrentInstance();
    let service = inject("service");
    let searchParams = inject("searchParams")
    let state = inject(service);
    let eForm = ref(null);

    let search = ref("");

    watch(search, async (newValue, oldValue) => {

      if (newValue.length !== 0) {
        state.filters.value = Object.assign(
          state.filters.value ? state.filters.value : {},
          {
            name_contains: newValue,
            _start: 0
          }
        )

        /*state.params.value = {
          name_contains: newValue
        }*/
      } else {
        state.filters.value = {
          _limit: 10
        }
        state.params.value = {}
      }

      await state.getItems();

    });
    return {
      state,
      eForm,
      search,
    };
  },
});
</script>
