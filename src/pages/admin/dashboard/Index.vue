<template>
<div class="container_dashboard" style="height:16.5rem;background:url('img/wefly.svg'); background-repeat:no-repeat;background-position-x: 104% ;background-size: 30%;z-index:1">

<div class="text-h3 text-dark q-ma-lg q-pa-sm q-mb-sm q-mt-sm" style="margin-top: 20px"> Bienvenue sur SAX ! </div>
  
  <div class="row justify-evenly image_w">
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 flex">
      <div class="tasks_detail">
        <span class="text_action">Actions rapide</span>

        <div class="row fonctionaity justify-around flex">
          <a @click="$router.push('/admin/categorie-groupe')" >
            <q-btn class="cat_group"  color="negative"  flat >
              <q-icon size="2rem" name="img:img/Groupe 27.svg" />
              <q-badge class="badge" rounded floating color="negative">+</q-badge>
              <q-tooltip class="bg-negative">
                <b> {{ $t('tooltip.add_categorie_groupe')}} </b>
              </q-tooltip>
            </q-btn>
          </a>

          <a @click="$router.push('/admin/role')" >
            <q-btn class="fonct" color="positive" flat >
              <q-icon size="2rem" name="business_center" />
              <q-badge class="badge" rounded floating color="positive">+</q-badge>
              <q-tooltip class="bg-positive">
                <b> {{ $t('tooltip.add_function')}} </b>
              </q-tooltip>
            </q-btn>
          </a>
            
          <a @click="$router.push('/admin/categorie-groupe')" > 
            <q-btn class="groups" color="info"  flat >
              <q-icon size="2rem" name="groups" />
              <q-badge class="badge" rounded floating color="info">+</q-badge>
              <q-tooltip class="bg-info">
                <b> {{ $t('tooltip.add_group')}} </b>
              </q-tooltip>
            </q-btn>
          </a>
           
           <a @click="$router.push('/admin/user')"> 
            <q-btn class="user" color="amber"  flat >
              <q-icon size="2rem" name="person" />
              <q-badge class="badge" rounded floating color="amber">+</q-badge>
              <q-tooltip class="bg-amber">
                <b> {{ $t('tooltip.add_user')}} </b>
              </q-tooltip>
             </q-btn>
            </a>
        </div>

  
        <div class="row justify-around  details_description ">
           <q-card class=" col-sm-5 col-md-5 col-lg-5 col-xl-5 card_description">
            <span class="title">Utilisateurs</span><br />
            <span class="text-weight-bold number"> {{resusers}} </span><br />

            <q-icon size="3rem" class="icon_description" color="warning" name="person" />
          </q-card>

          <q-card class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5  card_description">
            <span class="title">Catégorie Groupe</span><br />
            <span class="text-weight-bold number"> {{rescatgroupe}} </span><br />

            <q-icon size="3rem" color="negative" class="icon_description" name="img:img/Groupe 27.svg"/>

          </q-card>
         
        </div>

        <div class="row  justify-around details_description">

          <q-card class="col-xs-5 col-sm-6 col-md-5 col-lg-5 col-xl-5 card_description">
            <span class="title">Groupes</span><br />
            <span class="text-weight-bold number"> {{resgroupe}} </span><br /><br />
            <span class="q-ma-md text_parrain">Groupes parrainés<span class="float-right on-left text-weight-bolder parain_number"> {{nbgroupe_parraine}} </span></span> <br />
          </q-card>
          <q-card class="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 card_description">
            <span class="title">Fonctions</span><br />
            <span class="text-weight-bold  number"> {{resfonction}} </span><br/>
            <q-icon size="3rem" class="icon_description" color="positive" name="business_center" />
          </q-card>

        </div>

        
      </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5" style="z-index: -1;">
      <q-card>
        <div class="text-h4 q-pa-md text-grey-9" style="text-align: center;">Activités récentes</div>


        <div style="text-align: center;">
          <q-spinner-dots
            color="primary"
            size="3em"
            :thickness="10"
            v-if="chargement === true"
          />
        </div>
        
        <div v-if="historiques.length === 0" style="text-align: center;">
          <div class="text-h5 q-pa-md text-grey-6" style="text-align: center;">Vous n'avez aucune activité récente</div>
        </div>

        <div v-else class="q-pa-md q-mt-xl">
          <q-timeline layout="comfortable" v-for="historique in historiques" :key="historique.id" class="q-pa-none q-ma-none" style="margin-top: -40px">

            <q-timeline-entry
              :title="historique.title"
              :subtitle="$FormatDate(historique.createdAt)"
              :color="historique.color"
              icon="history"
            >
              <div class="text-subtitle2 text-grey-6 q-mb-none" style="margin-top: -10px" v-if="trouver === true">
                <div v-if="historique.user.id === user.id">
                  {{historique.message}}
                </div>
                <div v-else>
                  {{historique.msg_admin}}
                </div>
              </div>
              <div class="text-subtitle2 text-grey-6 q-mb-none" style="margin-top: -10px" v-else>
                {{historique.message}}
              </div>
            </q-timeline-entry>

            <q-timeline-entry color="white"> 
            </q-timeline-entry>
          </q-timeline>
        </div>
      </q-card>
    </div>

  </div>
  </div>
<!-- </q-page> -->
</template>

<script>
import { defineComponent, onMounted, ref, getCurrentInstance, inject, provide} from "vue";
import axios from "axios";
import qs from "qs";
import { useQuasar } from 'quasar'
export default defineComponent( {
  components: { },
  setup() {
    let self = getCurrentInstance();
    let user = ref({})
    let service_groupe= "groupes"
    let service_users="users"
    let serviceCategorie_groupe="categorie-groupes"
    let service_fonction = "users-permissions/roles"
    user.value = self.appContext.app.config.globalProperties.$sdata.value.user
    
    let stategroupe = inject(service_groupe)
    let stateusers = inject(service_users)
    let stateCategrie_groupe = inject(serviceCategorie_groupe)
    let statefonction = inject(service_fonction)

    let resgroupe = ref()
    let resusers = ref()
    let resfonction = ref()
    let rescatgroupe= ref()
    let nbgroupe_parraine= ref(0)
    let groupes = {}
    let historiques = ref({})
    let chargement = ref()
    let trouver = ref(false)

    onMounted(async () => {
      chargement.value = true
      await stategroupe.getItems()
      resgroupe.value = stategroupe.items.value.length
    
      groupes = stategroupe.items.value
      for (const key in  groupes) {
        if (groupes[key].groupe) {
          nbgroupe_parraine.value = nbgroupe_parraine.value +1
        }
      }
      await stateusers.getItems()
      resusers.value = stateusers.items.value.length

      await stateCategrie_groupe.getItems()
      rescatgroupe.value = stateCategrie_groupe.items.value.length
      
      await statefonction.getItems()
      resfonction.value = statefonction.items.value.length

      let user = self.appContext.app.config.globalProperties.$sdata.value.user

      for (const item of user.groupes) {
          if (item.title === "Wefly Agri") {
            trouver.value = true
          }
        }


      // verifier si le groupe de l'utilisateur connecter
      if (trouver.value) {

        const query = qs.stringify({
          _limit: 5,
          _sort: "createdAt:DESC"
        });

        let token = self.appContext.app.config.globalProperties.$sdata.value.jwt
        let hist = await axios({
          url: `http://localhost:1338/historiques?${query}`,
          method: "get",
          headers: {
              Authorization: `Bearer ${token}`
              }
          })

          historiques.value = hist.data
          chargement.value = false

      } else {

        const query = qs.stringify({
          _where: [{user: self.appContext.app.config.globalProperties.$sdata.value.user.id }],
          _limit: 5,
          _sort: "createdAt:DESC"
        });

        let token = self.appContext.app.config.globalProperties.$sdata.value.jwt
        let hist = await axios({
          url: `http://localhost:1338/historiques?${query}`,
          method: "get",
          headers: {
              Authorization: `Bearer ${token}`
              }
          })

          historiques.value = hist.data
          chargement.value = false
      }
    });

    return {
      user,
      resgroupe,
      resusers,
      resfonction,
      rescatgroupe,
      nbgroupe_parraine,
      historiques,
      chargement,
      trouver
    };
  },
});
</script>

<style lang="sass" scoped>

.my-menu-link
  color: #058B46
  background: #FFFFFF
  border-radius: 40px 0px 0px 40px
  left: 20px
  
.image_w
  background:url("~img/wefly.svg")


.tasks
  width:50rem


.tasks_detail
  width:100%


.text_action
  margin-left: 1.2em
  font-size: 1.4em

.fonctionaity
  margin: 2rem 0


.fonctionaity .cat_group 
  width: 4.4rem
  background:#ffe0e4
  font-size: 1.8em
  padding-top: 1rem
   

.fonctionaity .fonct 
  width: 4.4rem
  background:#def7d2
  font-size: 1.8em


.fonctionaity .groups 
  width: 4.4rem
  background:#e0eff3
  font-size: 1.8em
  padding-top: 1rem
 

.fonctionaity .user 
  width: 4.4rem
  background:#f5f1ce
  font-size: 1.8em
   
.fonctionaity .badge
    font-size: 20px
    padding: 8px
    border: 3px solid #fff
    position: absolute
    top: -16px
    right: -12px


.details_description
  margin: 1rem 0

.card_description
    width: 44%
    height: 7rem
    margin: 0 1%
    padding: 1.6px
   



.card_description .title
  font-size:1.5em
  margin: 16px 20px


.card_description .number
  font-size:3em
  margin: 0 20px


.card_description .parain_number
  padding:0 1em
  background: #058b46
  border-radius:5px
  color: #fff

.card_description .text_parrain
  position: relative
  top: -30px
  
.card_description .icon_description
  padding:0px 10px
  width: min-content
  float: right
  top: -40px


.detail_user .avatar_user
  font-size: 8.8rem
  border-radius: 100%


.detail_user .Libele_user
  color: gray

.text_header
  float: left
  margin: 0.3rem 1.8rem
  font-size: 1.5rem
  color:#656565

.text_timeline
    color:#777
</style>
