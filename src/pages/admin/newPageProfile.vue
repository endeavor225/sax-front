<template>
  <q-page padding>
    <div class="container" style="margin: auto 2rem">
      <div class="shadow-3 header" style="height: 41vh">
        <div class="row">
          <img
            src="img/Groupe 38.png"
            alt="header_image"
            style="width: 100%; object-fit: cover"
          />
        </div>

        <div class="row justify-between q-mt-lg q-mx-lg">
          <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8 ">
            <div class="avatar" style="width: 13%; position:absolute; top:9%">
              <q-img :src="image" width="100%"  style="border-radius:100%" /> 
            </div>

            <div  style="margin-left:30%">
              <div class="name_user  text-h4" >
                {{ user.prenom }} {{ user.nom }}
              </div>
              <div class="email_user" style="color: gray">
                @{{ user.username }}
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-2 col-md-4 col-lg-4">
            <q-btn
              v-if="modifier === true"
              outline
              color="green-8"
              :label="$t('modal.save')"
             
              padding="2.5% 13%"
              style="float: right"
              @click="onSubmit"
              :loading="submitting"
            >
              <template v-slot:loading>
                <q-spinner-facebook size="lg" />
              </template>
            </q-btn>
            <q-btn
              v-else
              color="green-8"
              @click="onEdit"
             
              padding="2.5% 13%"
              label="Modifier"
              style="float: right"
            />
          </div>
        </div>
      </div>

      <div class="row justify-between" style="margin-top: 3rem">
        <q-card
          class="col-xs-12 col-sm-4 col-md-4 col-lg-4"
          style="
            height: 400px;
            background: url('img/Trace64.png');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position-y: bottom;
            margin-bottom: 3rem;
          "
        >
          <q-card-section style="padding: 5rem 0rem 0rem 1.6rem">
            <q-item>
              <q-item-section avatar class="avatar">
                <q-icon color="grey-8" name="groups" size="35px" />
              </q-item-section>

              <q-item-section v-if="$sdata.value.user.groupes.length < 0">
                <q-item-label style="vertical-align: super; font-size: 22px">
                  Aucun groupe
                </q-item-label>
              </q-item-section>

              <q-item-section
                v-else-if="$sdata.value.user.groupes.length === 1"
              >
                <q-item-label style="vertical-align: super; font-size: 22px">
                  {{ $sdata.value.user.groupes[0].title }}
                </q-item-label>
              </q-item-section>

              <q-item-section
                v-else
                v-for="groupe in $sdata.value.user.groupes"
                :key="groupe.id"
              >
                <!-- <q-item-label class="text-subtitle2"> {{groupe.title}}, </q-item-label> -->
                <span class="text-subtitle2"> {{ groupe.title }}, </span>
              </q-item-section>
            </q-item>
          </q-card-section>

          <q-card-section style="padding: 2rem 0rem 0rem 1.6rem">
            <q-item>
              <q-item-section avatar class="avatar">
                <q-icon color="grey-8" name="business_center" size="35px" />
              </q-item-section>

              <q-item-section>
                <q-item-label
                  style="vertical-align: super; font-size: 22px"
                  v-if="user.role"
                >
                  {{ user.role.name }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>

          <!-- <br>
          <q-card-section style="text-align: center; padding:45px 0px" >
            <q-btn  size="0.88rem" padding="0.6rem 3.4rem"  color="primary"  label="Modifier" />
          </q-card-section> -->
        </q-card>

        <q-card
          v-if="modifier === false"
          class="col-sm-7 col-md-7 col-lg-7"
          style="
            height: 400px;
            background: url('img/Trace65.png');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position-y: bottom;
          "
        >
         <transition
            appear
            enter-active-class="animated slideInRight"
            leave-active-class="animated slideOutRight"
          >
          <q-card-section style="padding-left: 10% ; padding-top: 2rem">
            <q-list>
              <q-item class="q-mb-md">
                <q-item-section>
                  <span class="text-h6 text-weight-bold">Nom :</span>
                </q-item-section>
                <q-item-section class="text-weight-medium"> {{ user.nom }} </q-item-section>
              </q-item>
              <q-item class="q-mb-md">
                <q-item-section>
                  <span class="text-h6 text-weight-bold">Prenom :</span>
                </q-item-section>
                <q-item-section class="text-weight-medium"> {{ user.prenom }} </q-item-section>
              </q-item>
              <q-item class="q-mb-md">
                <q-item-section>
                  <span class="text-h6 text-weight-bold"
                    >Nom d'utilisateur :</span
                  >
                </q-item-section>
                <q-item-section class="text-weight-medium"> {{ user.username }} </q-item-section>
              </q-item>
              <q-item class="q-mb-md">
                <q-item-section>
                  <span class="text-h6 text-weight-bold">Email :</span>
                </q-item-section>
                <q-item-section class="text-weight-medium"> {{ user.email }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          </transition>
        </q-card>
  
        <q-card
          v-else
          class="col-sm-7 col-md-7 col-lg-7"
          style="
            height: 400px;
            background: url('img/Trace65.png');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position-y: bottom;
          "
        >
          <transition
            appear
            enter-active-class="animated slideInRight  "
            leave-active-class="animated slideOutRight"
          >
            <q-card-section
              style="padding-left: 3rem; padding-top: 3rem; padding-right: 10vw"
            >
              <q-form ref="eForm">
                <q-input
                  label="Nom "
                  v-model="formData.nom"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Entrer quleques choses',
                  ]"
                />

                <q-input
                  label="Prénoms"
                  v-model="formData.prenom"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Entrer quleques choses',
                  ]"
                />

                <q-input
                  label="Nom d'utilisateur"
                  v-model="formData.username"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Entrer quleques choses',
                  ]"
                />

                <q-input
                  label="Email"
                  type="email"
                  v-model="formData.email"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Entrer quleques choses',
                  ]"
                />

                <div style="text-align: center; display: none">
                  <q-btn @click="onSubmit" />
                </div>
              </q-form>
            </q-card-section>
          </transition>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { Notify } from "quasar";
import { defineComponent, onMounted, ref, provide, inject } from "vue";
import qs from "qs";
import axios from "axios";
export default defineComponent({
  components: {},

  setup() {
    const service = "users";
    let state = inject(service);

    let user = ref({});
    let image = ref();
    let groupes = ref({});
    let visible = ref(true);

    let formData = ref({});
    let eForm = ref(null);
    let isPwd1 = ref(true);
    let isPwd2 = ref(true);
    let isPwd3 = ref(true);
    let expanded = ref(false);
    let submitting = ref(false);
    let modifier = ref(false);

    onMounted(async () => {
      let token = self.appContext.app.config.globalProperties.$sdata.value.jwt;
      let res = await axios({
        url: `http://localhost:1338/users/me`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      user.value = res.data;

      formData.value = user.value;

      image.value = (await "http://localhost:1338") + res.data.image.url;
      //image.value = await "http://localhost:1338"+self.appContext.app.config.globalProperties.$sdata.value.user.image.url
    });

    let logout = async () => {
      $router.push("/");
    };

    let onEdit = () => {
      modifier.value = true;
    };

    let onSubmit = async () => {
      submitting.value = true;

      if (formData.value.password) {
        
        try {
          formData.value.nom = user.value.nom;
          formData.value.prenom = user.value.prenom;
          formData.value.username = user.value.username;
          //formData.value.password = user.value.password;
          formData.value.id = user.value.id;

          state.item = formData.value;
          state.updateForm.value = eForm.value;

          await state.update();
          submitting.value = false;
          await state.getItems();
          expanded.value = false;
        } catch (error) {
          console.log(error);
          Notify.create({
            message: "Opération échouée",
            type: "negative",
            position: "top-right",
          });
        }

        /*if (formData.value.newPassword === formData.value.confirmPassword) {
          console.log("Existe encore");
        } else {
          console.log("mal");
        }*/
      } else {
        submitting.value = true;
        //console.log("Pas de mot de passe");
        formData.value = user.value;
        state.item = formData.value;
        state.updateForm.value = eForm.value;
        //console.log(state.item);
        await state.update();
        submitting.value = false;
        await state.getItems();
        modifier.value = false;
      }
    };

    return {
      state,
      user,
      image,
      groupes,
      visible,
      expanded,
      onSubmit,
      formData,
      isPwd1,
      isPwd2,
      isPwd3,
      eForm,
      logout,
      submitting,
      modifier,
      onEdit,
    };
  },

  // methods: {
  //   async logout() {
  //     try {
  //       let res = await this.$broker.call("auth.logout", {});
  //       this.$router.push("/admin/login");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // },
});
</script>