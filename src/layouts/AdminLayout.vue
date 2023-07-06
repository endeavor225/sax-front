<template>
 <q-layout view="hHh Lpr fFf">
    <q-header class="bg-dark">
      <q-toolbar>

        <q-btn @click="toggleLeftDrawer" size="xs">
          <img
            src="img/WeflyLogo.svg"
            style="width: 60%"
            class="q-ml-md"
          />
        </q-btn>

        <q-toolbar-title></q-toolbar-title>

        <div class="row">
          <q-btn label="EN" flat :color="coloren" @click="anglais" padding="xs" />
          <q-btn label="FR" flat :color="colorfr" @click="francais" padding="xs" class="q-mr-sm"/>
        </div>

      <!--  <div  v-if="this.user.length ==! 0 "> -->
        <div>
          <q-btn-dropdown
            dense
            flat
            style="font-size: 0.9rem"
            color="white"
            round
          >
            <template v-slot:label>
              <div class="row items-center no-wrap">
                <q-icon name="account_circle" size="20px"/>
              </div>
            </template>

            <div class="no-wrap">
              <q-list class="q-pa-none">
                <q-item-section class="q-mt-md q-ml-md">
                   <q-item-label>  {{ user.prenom }} {{ user.nom }} </q-item-label>
                </q-item-section>
               <q-separator color="black" inset class="q-mt-sm" />

                <q-item clickable v-ripple @click="profile" >
                  <q-item-section avatar class="avatar">
                    <q-icon color="primary" name="person" size="20px"/>
                  </q-item-section>

                  <q-item-section style="margin-left:-20px" >
                    <q-item-label> {{ $t("profile.my_profile") }} </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-ripple @click="logout" >
                  <q-item-section avatar class="avatar">
                    <q-icon color="negative" name="logout" size="20px"/>
                  </q-item-section>

                  <q-item-section style="margin-left:-20px" >
                    <q-item-label> {{ $t("profile.logout") }} </q-item-label>
                  </q-item-section>
                </q-item>

              </q-list>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      class="bg-grey-4"
      :width="250"
    >
      <!-- QScrollArea is optional -->
      <!-- <q-list>
        <q-item-label header class="text-grey-8"> </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list> -->
      <q-scroll-area class="fit">
          <q-list padding class="menu-list">

              <a @click="$router.push('/admin/dashboard')" style="text-decoration: none; color: black">
              <q-item clickable v-ripple
                :active="link === 'dashboard'"
                @click="link = 'dashboard'"
                active-class="my-menu-link"
                class="effet-menu-link"
                >
                <q-item-section avatar class="avatar">
                  <q-icon name="speed" />
                  <!-- <q-icon name="engineering" /> -->
                </q-item-section>

                <q-item-section class="text-link">
                 DASHBOARD
                </q-item-section>
              </q-item>
            </a>


            <a @click="$router.push('/admin/acces-control')" style="text-decoration: none; color: black">
              <q-item clickable v-ripple
                :active="link === 'acces-control'"
                @click="link = 'acces-control'"
                active-class="my-menu-link"
                class="effet-menu-link"
                >
                <q-item-section avatar class="avatar">
                  <q-icon name="engineering" />
                </q-item-section>
                <q-item-section class="text-link">
                  PERMISSIONS
                </q-item-section>
              </q-item>
            </a>

            <a @click="$router.push('/admin/categorie-groupe')" style="text-decoration: none; color: black">
              <q-item clickable v-ripple
                :active="link === 'categorie-groupe'"
                @click="link = 'categorie-groupe'"
                active-class="my-menu-link"
                class="effet-menu-link"
                >
                <q-item-section avatar class="avatar">
                  <q-icon name="category" />
                </q-item-section>

                <q-item-section class="text-link">
                  CATÉGORIE-GROUPES
                </q-item-section>
              </q-item>
            </a>

            <a @click="$router.push('/admin/role')" style="text-decoration: none; color: black">
              <q-item clickable v-ripple
                :active="link === 'role'"
                @click="link = 'role'"
                active-class="my-menu-link"
                class="effet-menu-link"
                >
                <q-item-section avatar class="avatar">
                  <!-- <q-icon name="manage_accounts" /> -->
                  <!-- <q-icon name="admin_panel_settings" /> -->
                  <q-icon name="business_center" />
                </q-item-section>

                <q-item-section class="text-link">
                  FONCTIONS
                </q-item-section>
              </q-item>
            </a>

            <a @click="$router.push('/admin/groupe')" style="text-decoration: none; color: black">
              <q-item clickable v-ripple
               :active="link === 'groupe'"
                @click="link = 'groupe'"
                active-class="my-menu-link"
                class="effet-menu-link"
                >
                <q-item-section avatar class="avatar">
                  <!-- <q-icon class="my-menu-icon" name="groups"/> -->
                  <!-- <q-icon name="badge" /> -->
                  <q-icon class="my-menu-icon" name="groups"/>
                </q-item-section>

                <q-item-section class="text-link">
                  GROUPES
                </q-item-section>
              </q-item>
            </a>

            <a @click="$router.push('/admin/user')" style="text-decoration: none; color: black">
              <q-item clickable v-ripple
                :active="link === 'user'"
                @click="link = 'user'"
                active-class="my-menu-link"
                class="effet-menu-link"
                >
                <q-item-section avatar class="avatar">
                  <q-icon name="person" />
                </q-item-section>

                <q-item-section class="text-link">
                  MEMBRES
                </q-item-section>
              </q-item>
            </a>

             <a @click="$router.push('/admin/Formulaire')" style="text-decoration: none; color: black">
              <q-item clickable v-ripple
                :active="link === 'Formulaire'"
                @click="link = 'Formulaire'"
                active-class="my-menu-link"
                class="effet-menu-link"
                >
                <q-item-section avatar class="avatar">
                  <q-icon name="article" />
                </q-item-section>

                <q-item-section class="text-link">
                  FORMULAIRE
                </q-item-section>
              </q-item>
            </a>

            <a @click="$router.push('/admin/profil')" style="text-decoration: none; color: black">
              <q-item clickable v-ripple
                :active="link === 'profil'"
                @click="link = 'profil'"
                active-class="my-menu-link"
                class="effet-menu-link"
                >
                <q-item-section avatar class="avatar">
                  <q-icon name="manage_accounts" />
                </q-item-section>

                <q-item-section class="text-link">
                  PROFIL
                </q-item-section>
              </q-item>
            </a>
          </q-list>
        </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "DASHBOARD",
    //caption: "Acces contrôle",
    icon: "img:img/DDashboard.svg",
    link: "/admin/dashboard",
  },{
    title: "ACCÈS CONTRÔLE",
    //caption: "Acces contrôle",
    icon: "img:img/DAccesControle.svg",
    link: "/admin/acces-control",
  },

  {
    title: "CATÉGORIE GROUPE",
    //caption: "Catégorie groupe",
    icon: "img:img/DCategorieGroupe.svg",
    link: "/admin/categorie-groupe",
  },
  {
    title: "RÔLE",
    //caption: "Rôles",
    icon: "img:img/DRole.svg",
    link: "/admin/role",
  },
  {
    title: "GROUPE",
    //caption: "Groupes",
    icon: "img:img/DGroupe.svg",
    link: "/admin/groupe",
  },
  {
    title: "UTILISATEUR",
    //caption: "Utilisateur",
    icon: "img:img/DUtilisateur.svg",
    link: "/admin/user",
  },
  {
    title: "PROFIL",
    //caption: "profil",
    icon: "img:img/DProfil.svg",
    link: "/admin/profil",
  },
];

import { defineComponent, getCurrentInstance, onMounted, ref, watch, inject } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: {
    EssentialLink,
  },
  setup() {
    self = getCurrentInstance();
    const leftDrawerOpen = ref(false);
    const user = ref({});

    onMounted(async () => {
      user.value = await self.appContext.app.config.globalProperties.$sdata.value.user
    });

    const { locale } = useI18n({ useScope: "global" });
    const lang = ref(locale);

    watch(lang, (val) => {
      console.log("val", val);
      locale.value = val;
    });

    let colorfr = ref("white")
    let coloren = ref("grey-7")

    let francais = async () => {
      locale.value = "fr";
      colorfr.value = "white"
      coloren.value = "grey-7"
    };

    let anglais = async () => {
      locale.value = "en-us";
      coloren.value = "white"
      colorfr.value = "grey-7"
    };

    return {
      colorfr,
      coloren,
      anglais,
      francais,
      leftDrawerOpen,
      essentialLinks: linksList,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      user,
      link: ref('dashboard')
    };
  },

  methods: {
    async logout() {
      try {
        //let res = await this.$broker.call("auth.logout", {});
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },

    async profile() {
      try {
        this.$router.push("/admin/profil");
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style lang="sass" scoped>
.my-menu-link
  color: #058B46
  background: #FFFFFF
  border-radius: 40px 0px 0px 40px
  left: 20px
  font-weight: bold


.effet-menu-link:hover
  color:  #058B46
  background: #FFFFFF
  border-radius: 40px 0px 0px 40px
  left: 20px
  font-weight: bold

  .text-link:hover
    color: #058B46

.avatar
  align-items: center
  padding-right: 10px




</style>
