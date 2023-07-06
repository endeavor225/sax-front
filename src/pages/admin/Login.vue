<template>
  <q-page
    padding
    style="
      background-image: url(ConnexionId.svg);
      background-repeat: no-repeat;
      background-size: contain;
    "
  >
    <!-- content -->
    <div style="margin-top: 20px">
      <div style="text-align: center" class="text-primary">
        <img src="LogoWefly.svg" alt="Logo" />
      </div>

      <div class="q-pa-md flex justify-center">
        <div style="max-width: 90%; width: 450px">
          <q-card class="shadow-20 q-pb-md">
            <div style="text-align: center; padding-top: 10px">
              <h5 class="text-accent q-mb-xs">
                <span style="font-size: 40px"> CONNEXION </span>
              </h5>
            </div>

            <q-card-section>
              <q-form @submit="onSubmit" ref="eForm" class="q-ml-lg q-mr-lg">
                Nom d'utilisateur
                <q-input
                  outlined
                  label="Username"
                  lazy-rules
                  :rules="[
                    (val) => !!val || 'Le champ titre est obligatoire',
                    (val) =>
                      val.length > 2 ||
                      'ce champ doit contenir au moins 3 caractères',
                  ]"
                  v-model="form.identifier"
                />

                Mot de passe
                <q-input
                  outlined
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  :rules="[
                    (val) => !!val || 'Le champ titre est obligatoire',
                    (val) =>
                      val.length > 2 ||
                      'ce champ doit contenir au moins 3 caractères',
                  ]"
                  label="Password"
                  v-model="form.password"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>

                <div style="text-align: center">
                  <q-btn
                    type="submit"
                    class="q-mt-xs full-width"
                    label="Se Connecter"
                    color="primary"
                    :loading="submitting"
                  >

                    <template v-slot:loading>
                      <q-spinner-facebook size="lg" />
                    </template>
                  </q-btn>
                </div>

                <div class="q-gutter-sm q-mt-xs">
                  <q-checkbox v-model="session" label="Rester connecter" />
                </div>
              </q-form>

              <div style="text-align: right" class="q-mr-lg">
                <a
                  style="text-decoration: none; font-size: 18px"
                  class="text-accent"
                  href="#"
                  >Mot de passe oublié ?
                </a>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, inject } from "vue";
export default defineComponent({
  setup() {
    let form = ref({});
    let session = ref(false);
    let isPwd = ref(true);
    let submitting = ref(false)

    //self = getCurrentInstance();
    const service = "auth";

    let state = inject(service);

    let eForm = ref(null);

    let onSubmit = async () => {
      state.loginForm.value = eForm.value;

      submitting.value = true
      await state.auth(form.value);
      submitting.value = false
    };

    return {
      eForm,
      form,
      session,
      isPwd,
      onSubmit,
      submitting
    };
  },
});
</script>
