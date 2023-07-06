<template>
  <q-page padding>
    <div class="q-ma-md" style="margin-top:8px">
       <div class="text-h3  q-mb-sm q-mt-md"> {{ $t('profile.info') }} </div>
    </div>

    <div style="margin-top: 40px;">
      <div class="q-pa-md flex justify-center">
        <div style="max-width: 90%; width: 700px;">
          <q-card class="no-shadow bg-grey q-pb-md" style="border-radius: 20px;">

            <div class="q-mt-md" style="text-align: center; padding-top: 20px">
              <q-avatar round size="150px">
                <img :src="image" />
              </q-avatar>
            </div>

            <!-- <div class="absolute-right q-ma-xl">
              <q-btn flat color="primary" no-caps :label="$t('profile.logout_info')" @click="logout" style="font-size: 15px"/>
            </div> -->
            
            <div class="flex justify-center q-mt-lg  q-ml-md q-mr-md">
              <div style="width: 100%; ">

                <q-slide-transition>
                  <div v-show="!expanded">
                    <div class="row">
                      <div class="col q-ma-sm">
                        <q-list>
                          <q-item class="bg-grey-1" style="border-radius: 15px; border:2px solid black;">
                            <q-item-section class="text-black">
                              <!-- {{ user.prenom }} --> {{$sdata.value.user.prenom}}
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                      <div class="col q-ma-sm">
                        <q-list>
                          <q-item class="bg-grey-1" style="border-radius: 15px; border:2px solid black;">
                            <q-item-section class="text-black">
                              <!-- {{ user.nom }} --> {{$sdata.value.user.nom}}
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col q-ma-sm">
                        <q-list>
                          <q-item class="bg-grey-1" style="border-radius: 15px; border:2px solid black;">
                            <q-item-section class="text-black">
                              <!-- {{ user.username }} --> {{$sdata.value.user.username}}
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                      <div class="col q-ma-sm">
                        <q-list>
                          <q-item class="bg-grey-1" style="border-radius: 15px; border:2px solid black;">
                            <q-item-section class="text-black">
                              **********
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                    </div>

                    <!--<div style="text-align: center;">
                      <q-btn
                        style="width: 200px"
                        type="submit"
                        class=" q-mt-lg"
                        :label="$t('modal.edit')"
                        color="primary"
                        @click="onEditprofil"
                      />
                    </div> -->

                    <div style="text-align: center;">
                      <q-btn
                        no-caps
                        color="primary"
                        :label="$t('modal.edit')"
                        @click="expanded = !expanded"
                        style="width: 200px"
                        class=" q-mt-lg"
                      />
                    </div>
                  </div>
                </q-slide-transition>
              </div>
             </div>

             <div class="flex justify-center q-mt-lg  q-ml-md q-mr-md">
              <div style="width: 100%; ">
                
                <q-slide-transition>
                  <div v-show="expanded">
                    <q-form @submit="onSubmit" ref="eForm">
                      <div class="row">
                        <div class="col q-ma-sm">
                          <q-input
                            v-model="user.prenom"
                            outlined
                            :label="$t('form.first_name')"
                            lazy-rules
                            :rules="[
                              (val) => !!val || 'Le champ prenom est obligatoire',
                              (val) => val.length > 2 || 'ce champ doit contenir au moins 3 caractères',
                            ]"
                          />
                        </div>
                        <div class="col q-ma-sm">
                          <q-input
                            v-model="user.nom"
                            outlined
                            :label="$t('form.name')"
                            lazy-rules
                            :rules="[
                              (val) => !!val || 'Le champ nom est obligatoire',
                              (val) => val.length > 2 || 'ce champ doit contenir au moins 3 caractères',
                            ]"
                          />
                        </div>
                      </div>

                      <div class="row">
                        <div class="col q-ma-sm">
                          <q-input
                            v-model="user.username"
                            outlined
                            :label="$t('form.username')"
                            lazy-rules
                            :rules="[
                              (val) => !!val || 'Le champ nom est obligatoire',
                              (val) => val.length > 2 || 'ce champ doit contenir au moins 3 caractères',
                            ]"
                          />
                        </div>
                        <div class="col q-ma-sm">
                          <q-input
                            outlined
                            :type="isPwd1 ? 'password' : 'text'" 
                            v-model="formData.password"
                            :label="$t('profile.enter_newpassword')"
                            counter
                            >
                              <template v-slot:hint>
                                Nombre de caractère minimal (6)
                              </template>
                              <template v-slot:append>
                                <q-icon
                                  :name="isPwd1 ? 'visibility_off' : 'visibility'"
                                  class="cursor-pointer"
                                  @click="isPwd1 = !isPwd1"
                              />
                              </template>
                          
                          </q-input>
                        </div>
                      </div>

                      <!-- <div class="row">
                        <div class="col q-ma-sm">
                          <q-input
                            outlined
                            :type="isPwd2 ? 'password' : 'text'" 
                            v-model="formData.confirmPassword"
                            :label="$t('profile.enter_newpassword')"
                            >

                              <template v-slot:append>
                                <q-icon
                                  :name="isPwd2 ? 'visibility_off' : 'visibility'"
                                  class="cursor-pointer"
                                  @click="isPwd2 = !isPwd2"
                              />
                              </template>
                          
                          </q-input>
                        </div>
                        
                        <div class="col q-ma-sm">
                          <q-input
                            outlined
                            :type="isPwd3 ? 'password' : 'text'" 
                            v-model="formData.confirmPassword"
                            :label="$t('profile.confirmer_password')"
                            >

                              <template v-slot:append>
                                <q-icon
                                  :name="isPwd3 ? 'visibility_off' : 'visibility'"
                                  class="cursor-pointer"
                                  @click="isPwd3 = !isPwd3"
                              />
                              </template>
                          
                          </q-input>
                        </div>
                      </div>  --> 

                      <div style="text-align: center;">
                        <q-btn
                          no-caps
                          color="primary"
                          :label="$t('modal.save')"
                          style="width: 200px"
                          class=" q-mt-lg"
                          type="submit"
                          :loading="submitting"
                        >
                          <template v-slot:loading>
                            <q-spinner-facebook size="lg"/>
                          </template>
                        </q-btn>
                      </div>
                    </q-form>

                  </div>
                </q-slide-transition>

              </div>
             </div>
          </q-card>
            
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'
import { defineComponent, onMounted, ref, provide, inject } from "vue";

export default defineComponent({
  components: {

  },

  setup() {
    const service = "users";
    let state = inject(service);

    let user = ref({});
    let image = ref({});
    let groupes = ref({});
    let visible= ref(true);

  
    let formData = ref({});
    let eForm = ref(null);
    let isPwd1 = ref(true);
    let isPwd2 = ref(true);
    let isPwd3 = ref(true);
    let expanded = ref(false);
    let submitting = ref(false);

    onMounted(async () => {

      user.value = await self.appContext.app.config.globalProperties.$sdata.value.user


      image.value = await "http://localhost:1338"+self.appContext.app.config.globalProperties.$sdata.value.user.image.url
      //console.log(image.value );
    });

    let  logout = async () =>  {
      console.log("Deconnexion");
      $router.push("/");
    }


    let onSubmit = async () => {
      submitting.value = true

      if (formData.value.password) {
        //console.log("Existe")

        if (formData.value.password.length >= 5 ) {
            //console.log("ddddddd");
          }
        try {
          formData.value.nom = user.value.nom;
          formData.value.prenom = user.value.prenom;
          formData.value.username = user.value.username;
          //formData.value.password = user.value.password;
          formData.value.id = user.value.id;

          state.item = formData.value
          state.updateForm.value = eForm.value

          console.log(state.item);
          await state.update();
          submitting.value = false
          await state.getItems();
          expanded.value = false;
  
        } catch (error) {
          console.log(error)
          Notify.create({
                    message: "Opération échouée",
                    type: "negative",
                    position: 'top-right'
                })
        }

        /*if (formData.value.newPassword === formData.value.confirmPassword) {
          console.log("Existe encore");
        } else {
          console.log("mal");
        }*/
      } else {
          submitting.value = true
          //console.log("Pas de mot de passe");
          formData.value = user.value
          state.item = formData.value
          state.updateForm.value = eForm.value
          //console.log(state.item);
          await state.update();
          submitting.value = false
          await state.getItems();
          expanded.value = false;
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
      submitting
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