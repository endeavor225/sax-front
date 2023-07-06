<template>
  <div style="width: 700px">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-center" style="width: 90%">
          {{ $t("modal.add_user") }}
        </div>
        <q-space />
        <q-btn icon="close" color="dark" flat round v-close-popup />
      </q-card-section>

      <q-card-section style="width: 90%; margin: auto">
        <q-form @submit="onSubmit" ref="eForm">
          <q-input
            outlined
            v-model="formData.nom"
            :label="$t('form.name')"
            lazy-rules
            :rules="[
              (val) => !!val || 'Le champ nom est obligatoire',
              (val) =>
                val.length > 2 ||
                'ce champ doit contenir au moins 3 caractères',
            ]"
          />

          <q-input
            outlined
            v-model="formData.prenom"
            :label="$t('form.first_name')"
            lazy-rules
            :rules="[
              (val) => !!val || 'Le champ prenom est obligatoire',
              (val) =>
                val.length > 2 ||
                'ce champ doit contenir au moins 3 caractères',
            ]"
          />

          <q-input
            outlined
            v-model="formData.username"
            :label="$t('form.username')"
            lazy-rules
            :rules="[
              (val) => !!val || 'Le champ nom d\'utilisateur est obligatoire',
              (val) =>
                val.length > 2 ||
                'ce champ doit contenir au moins 3 caractères',
            ]"
          />

          <q-input
            outlined
            type="email"
            v-model="formData.email"
            label="Email"
            lazy-rules
            :rules="[
              (val) => !!val || 'Le champ prenom est obligatoire',
              (val) =>
                val.length > 2 ||
                'ce champ doit contenir au moins 3 caractères',
            ]"
          />

          <q-input
            outlined
            :type="isPwd ? 'password' : 'text'"
            v-model="formData.password"
            :label="$t('form.password')"
            :rules="[
              (val) => !!val || 'Le champ mot de passe est obligatoire',
              (val) => val.length > 3 || 'ce champ doit contenir au moins 4 caractères', ]"
          >

            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
            />
            </template>

          </q-input>

          <q-file
            v-model="formData.image"
            label="Image"
            outlined
            counter
            :rules="[ (val) => !!val || 'Le champ image est obligatoire', ]"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>

          <div class="q-mt-xs q-mb-sm" style="text-align: center">
            <q-btn
              v-close-popup
              :label="$t('modal.cancel')"
              padding="xs xl"
              style="width: 47%"
              color="white"
              text-color="black"
            />
            <q-btn
              type="submit"
              :label="$t('modal.add')"
              padding="xs xl"
              style="width: 47%"
              color="primary"
              class="q-ml-md"
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
    /**
     * component pour ajout d'un utilisateur
     * service utilisé users
     */
    
    self = getCurrentInstance();
    const service = "users";
    let add = inject("addModal");
    let state = inject(service);

    let formData = ref({});
    let formDataFile = ref({});

    let emptyItem = inject("emptyItem");

    for (const key of Object.keys(emptyItem)) {
      formData.value[key] = emptyItem[key];
    }

    let eForm = ref(null);
    let isPwd = ref(true);
    let user = ref({});
    let submitting = inject("traitement")


    onMounted(async () => {
      //recuperer l'utilisateur connecté
      user.value = await self.appContext.app.config.globalProperties.$sdata.value.user
   
    });

    let onSubmit = async () => {
      submitting.value = true
      //ajouter les données du formulaire a item
      formData.value.niveau =  user.value.niveau + 1
      state.item.value = formData.value;
      state.createForm.value = eForm.value;

      //enregistrer lutilisateur en appellant la fonction register de compos-classe
      await state.register();
      submitting.value = false
      await state.getItems();
      add.value = false;
    };

    return {
      eForm,
      onSubmit,
      formData,
      formDataFile,
      isPwd,
      user,
      submitting
    };
  },
});
</script>