<template>
  <div style="width: 700px">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-center" style="width: 90%">
          {{ $t("modal.add_group") }}
        </div>
        <q-space />
        <q-btn icon="close" color="black" flat round v-close-popup />
      </q-card-section>

      <q-card-section style="width: 90%; margin: auto">
        <q-form @submit="onSubmit" ref="eForm">
          <q-input
            outlined
            v-model="formData.title"
            :label="$t('title')"
            lazy-rules
            :rules="[
              (val) => !!val || 'Le champ titre est obligatoire',
              (val) =>
                val.length > 2 ||
                'ce champ doit contenir au moins 3 caractères',
            ]"
          />

          <q-select
            outlined
            v-model="formData.categorie_groupe"
            use-input
            input-debounce="0"
            :label="$t('categorie_groupe')"
            :options="optionsCategorieGroupe"
            option-label="title"
            option-value="id"
            @filter="filterCategorieGroupe"
            class="q-mb-md"
            lazy-rules
            :rules="[ (val) => !!val || 'Le champ categorie groupe est obligatoire']"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  {{ $t('no_data')}}
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-toggle class="q-mb-sm" v-model="visible" :label="$t('modal.group_sponsored')" />

          <q-slide-transition>
            <div v-show="visible">

              <div class="text-grey-6"> {{$t('modal.choose_group')}} : </div>
              <q-select
                outlined
                v-model="formData.groupe"
                use-input
                input-debounce="0"
                :label="$t('group')"
                :options="options"
                option-label="title"
                option-value="id"
                @filter="filterGrp"
                class="q-mb-md"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      {{ $t('no_data')}}
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </q-slide-transition>

          

          <div class="q-lg q-mb-sm row justify-between">
            <q-btn
              v-close-popup
              :label="$t('modal.cancel')"
              class="text-weight-regular"
              style="width: 45%; border: 1px solid #f8f7f7; color: black"
            />
            <q-btn
              type="submit"
              :label="$t('modal.add')"
              class="bg-primary text-weight-regular"
              style="width: 45%; color: white"
              :loading="submitting"
            >
              <template v-slot:loading>
                <q-spinner-facebook size="lg" />
              </template>
            </q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, inject, onMounted } from "vue";
export default defineComponent({
  setup() {
    const self = getCurrentInstance();
    //const service = inject("service");
    const service = "groupes";
    let state = inject(service);
    let add = inject("addModal");
    let formData = ref({});
    let emptyItem = inject("emptyItem");
    let userGroupeNiveau = ref();
    let eForm = ref(null);
    let submitting = inject("traitement");
    for (const key of Object.keys(emptyItem)) {
      formData.value[key] = emptyItem[key];
    }

    let visible = ref(false)

    const serviceCategorieGroupe = "categorie-groupes";
    let stateCategorieGroupe = inject(serviceCategorieGroupe)

    onMounted(async () => {
      //recuperer la liste des groupes
      await state.getItems()
      //lutilisateur connecté
      let userGroupeNiveau = self.appContext.app.config.globalProperties.$sdata.value.user.groupes[0].niveau;

      //recuperer la liste des categorie-groupes
      await stateCategorieGroupe.getItems()
    });

    const options = ref(state.items.value)
    const optionsCategorieGroupe = ref(stateCategorieGroupe.items.value)
    //fonction de filtre du q-select
    let filterGrp = (val, update) => {
        if (val === '') {
          update(() => {
            options.value = state.items.value
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          options.value = state.items.value.filter(v => v.title.toLowerCase().indexOf(needle) > -1)
        })
      }

      //fonction de filtre du q-select categorie-groupes
    let filterCategorieGroupe = (val, update) => {
        if (val === '') {
          update(() => {
            optionsCategorieGroupe.value = stateCategorieGroupe.items.value
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          optionsCategorieGroupe.value = stateCategorieGroupe.items.value.filter(v => v.title.toLowerCase().indexOf(needle) > -1)
        })
      }

    let onSubmit = async () => {
      submitting.value = true
      
      if (visible.value === true) {
      //ajouter le niveau de lutilisateur au formulaire
      formData.value.niveau = userGroupeNiveau.value + 1;
        //envoyer les données du formulaire
      state.item.value = formData.value;
      //formualire de validation
      state.createForm.value = eForm.value;
      //requete d'ajout dun groupe
      await state.create();
      submitting.value = false
      //mise a jour de la liste
      await state.getItems();
      add.value = false;
      
      } else {
      //envoyer les données du formulaire
      formData.value.niveau = userGroupeNiveau.value + 1;
      formData.value.groupe = null
      state.item.value = formData.value
      //formualire de validation
      state.createForm.value = eForm.value;
      //requete d'ajout dun groupe
      await state.create();

      submitting.value = false
      //mise a jour de la liste
      await state.getItems();
      add.value = false;
      }
    };
    return {
      formData,
      eForm,
      onSubmit,
      filterGrp,
      options,
      submitting,
      visible,
      filterCategorieGroupe,
      optionsCategorieGroupe
    };
  },
});
</script>
