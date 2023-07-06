import { Notify } from 'quasar'
import { ref, getCurrentInstance } from 'vue'
import axios from 'axios'
import qs from "qs";
import lodash from 'lodash'

/**
 * cette class represente un crud , qui a des fonctions et variables qui seront accessibles dans tout le code
 * variables de la class:
 *   this.service pour enregistrer le service sur lequel on travail
 *   this.items pour stocker les listes des données du service
 *   this.item pour stocker les données venant du formulaire
 *   this.filters pour stocker les filtres a ajouter dans la requette axios
 *   this.createForm ,this.updateForm ,this.searchForm ,this.deleteForm ,this.loginForm sont des variable qui stockera les
 *   eform pour la validation des formulaires
 *   this.totalItem  
 *   this.params , variable pour ajouter des parametres a la requette axios
 */

export class Ressource {

    limit = 10
    start = 0
    loading = false
    data = {
        data: {}
    }
    self = getCurrentInstance()
    constructor(service) {
        this.service = service
        this.items = ref([])
        this.item = ref({})
        this.filters = ref({})
        this.as_filters = ref(true)
        this.createForm = ref({})
        this.updateForm = ref({})
        this.searchForm = ref({})
        this.deleteForm = ref({})
        this.loginForm = ref({})
        this.totalItem = ref(0)
        this.params = ref({})

    }

    /**
     * la fonction getItems permet d'obtenir une liste  en fonction du service et des filtres
     */
    async getItems(append) {
        try {
            const data = {
                data: {}
            }
            // console.log("filtre", this.filters.value)
            // console.log("params", this.params.value)
            //recuperer le token de l'utilisateur connecté
            const token = this.self.appContext.app.config.globalProperties.$sdata.value.jwt;
            if (this.service === "users-permissions/permissions") {
                //ici on ajoute au filtre que les permissions de type application et users-permussions qui sont activités
                this.filters.value = Object.assign(this.filters.value, {
                    type: ["application", "users-permissions"],
                    //enabled: true,
                })
            }
            
            //requette axios pour recuperer la liste des données du service
            let res = await axios({
                url: `http://localhost:1338/${this.service}?${qs.stringify(this.filters.value)}`,
                method: "get",
                data: this.params.value,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
       
            //actualisation de la liste 
            if (res && res.data && this.items) {
                if (append) {
                    let not_in = true
                    for (const element of res.data) {
                        for (const item of this.items.value) {
                            if (element.id === item.id) {
                                not_in = false
                                break
                            }
                        }
                        if (not_in) {
                            this.items.value.push(element)
                        }
                        else {
                            not_in = true
                        }
                    }

                } else {
                    if (Array.isArray(res.data)) {
                        this.items.value = res.data
                    } else {
                        if (this.service === "users-permissions/roles") {
                            var tab = []

                            for (const item of Object.values(res.data)[0]) {
                                var tableau = []
                                for (const iterator of item.permissions) {
                                    if (iterator.enabled) {
                                        tableau.push(iterator)
                                    }
                                }
                                item.permissions = tableau
                                tab.push(item)
                            }
                            this.items.value = tab
                        }
                        else {
                            this.items.value = Object.values(res.data)[0]
                        }
                    }

                    var nb = 10
                    if (this.service === "users-permissions/roles" || this.service === "users-permissions/permissionss") {

                        let res = await axios({
                            url: `http://localhost:1338/${this.service}/count?${qs.stringify(this.filters.value)}`,
                            method: "get",
                            data: this.params.value,
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        nb = res.data
                    } else {
                        res = await axios({
                            url: `http://localhost:1338/${this.service}/count?${qs.stringify(this.filters.value)}`,
                            method: "get",
                            params: {},
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        nb = res.data
                    }

                    this.totalItem.value = Math.ceil(nb / this.limit)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * la fonction create est utilisé  pour un enregistrement , 
     * sa requette axios doit contenir le service ainsi que les données du formulaire (this.item.value)
     */
    async create() {
        const token = this.self.appContext.app.config.globalProperties.$sdata.value.jwt;

        const data = {
            data: this.item.value
        }
        //requette axios enregistrer une donnée dans le service
        if (this.createForm.value.validate()) {
            try {
                this.item.value.niveau = this.self.appContext.app.config.globalProperties.$sdata.value.user.niveau + 1
                this.item.value.creator = this.self.appContext.app.config.globalProperties.$sdata.value.user.id

                if (this.service === "users-permissions/roles") {

                    this.item.value.created_At = new Date()

                    let res = await axios({
                        url: `http://localhost:1338/${this.service}`,
                        method: "post",
                        data: this.item.value,
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })


                    if (res) {
                        let historique = await axios({
                            url: `http://localhost:1338/historiques`,
                            method: "post",
                            data: {
                                user: this.self.appContext.app.config.globalProperties.$sdata.value.user.id,
                                title: `Création de permission`,
                                message: `Vous avez créez ${this.item.value.name}`,
                                color: "info",
                                msg_admin: `${this.self.appContext.app.config.globalProperties.$sdata.value.user.nom} ${this.self.appContext.app.config.globalProperties.$sdata.value.user.prenom} a crée la fonction ${this.item.value.name}`
                            },
                            headers: {
                                Authorization: `Bearer ${token}`
                                }
                            })
                    }

                    
    
                    Notify.create({
                        message: "Opération effectuée",
                        type: "positive",
                        position: 'top-right',
                        actions: [
                            { icon: 'close', color: 'white', handler: () => { /* ... */ } }
                          ]
                    })

                } else {

                    let res = await axios({
                    url: `http://localhost:1338/${this.service}`,
                    method: "post",
                    data: this.item.value,
                    headers: {
                        Authorization: `Bearer ${token}`
                        }
                    })

                    if (res && res.data) {
                        let historique = await axios({
                            url: `http://localhost:1338/historiques`,
                            method: "post",
                            data: {
                                user: this.self.appContext.app.config.globalProperties.$sdata.value.user.id,
                                title: `Création de ${this.service}`,
                                message: `Vous avez créez ${res.data.title}`,
                                color: "info",
                                msg_admin: `${this.self.appContext.app.config.globalProperties.$sdata.value.user.nom} ${this.self.appContext.app.config.globalProperties.$sdata.value.user.prenom} a crée ${this.item.value.title}`
                            },
                            headers: {
                                Authorization: `Bearer ${token}`
                                }
                            })
                    }

                    Notify.create({
                        message: "Opération effectuée",
                        type: "positive",
                        position: 'top-right',
                        actions: [
                            { icon: 'close', color: 'white', handler: () => { /* ... */ } }
                        ]
                    })

            }
                
            } catch (error) {
                Notify.create({
                    message: "Opération echouée",
                    type: "negative",
                    position: 'top-right',
                    actions: [
                        { icon: 'close', color: 'white', handler: () => { /* ... */ } }
                      ]
                })
                console.log(error);
            }
        }
    }


    /**
     * la fonction update est utilisé pour une modification , 
     * sa requette axios  recoit comme parametre le service ainsi que l'id de la donnée du service qu'on veut modifier
     */
    async update() {
        const token = this.self.appContext.app.config.globalProperties.$sdata.value.jwt;

        if (this.updateForm.value.validate()) {

            try {
                let res = await axios({
                    url: `http://localhost:1338/${this.service}/${this.item.id}`,
                    method: "put",
                    data: this.item,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                // actualisation de la liste this.items
                if (res && res.data) {
                    let compteur = 0
                    for (const iterator of this.items.value) {
                        if (iterator.id === this.item.id) {
                            this.items.value.splice(
                                compteur,
                                1,
                                this.item
                            )
                        }
                        compteur++
                    }

                    //console.log(this.item.title);
            
                    if (this.service === "categorie-groupes" || this.service === "groupes") {
                        let historique = await axios({
                            url: `http://localhost:1338/historiques`,
                            method: "post",
                            data: {
                                user: this.self.appContext.app.config.globalProperties.$sdata.value.user.id,
                                title: `Modification de ${this.service}`,
                                message: `Vous avez effectué une modification sur ${res.data.title}`,
                                color: "positive",
                                msg_admin: `${this.self.appContext.app.config.globalProperties.$sdata.value.user.nom} ${this.self.appContext.app.config.globalProperties.$sdata.value.user.prenom} a effectué une modification sur ${this.item.title}`
                            },
                            headers: {
                                Authorization: `Bearer ${token}`
                                }
                            })
                    }

                    if (this.service === "users-permissions/roles") {
                        let historique = await axios({
                            url: `http://localhost:1338/historiques`,
                            method: "post",
                            data: {
                                user: this.self.appContext.app.config.globalProperties.$sdata.value.user.id,
                                title: `Modification de fonction`,
                                message: `Vous avez effectué une modification sur ${this.item.name}`,
                                color: "positive",
                                msg_admin: `${this.self.appContext.app.config.globalProperties.$sdata.value.user.nom} ${this.self.appContext.app.config.globalProperties.$sdata.value.user.prenom} a effectué une modification sur ${this.item.name}`
                            },
                            headers: {
                                Authorization: `Bearer ${token}`
                                }
                            })
                    }

                    if (this.service === "users") {
                        if (this.item.id === this.self.appContext.app.config.globalProperties.$sdata.value.user.id) {
                            let historique = await axios({
                                url: `http://localhost:1338/historiques`,
                                method: "post",
                                data: {
                                    user: this.self.appContext.app.config.globalProperties.$sdata.value.user.id,
                                    title: `Modification de profil`,
                                    message: `Vous avez modifié vos informations personnelles`,
                                    color: "positive",
                                    msg_admin: `${this.self.appContext.app.config.globalProperties.$sdata.value.user.nom} ${this.self.appContext.app.config.globalProperties.$sdata.value.user.prenom} a modifié ses informations personnelles`
                                },
                                headers: {
                                    Authorization: `Bearer ${token}`
                                    }
                                })
                        } else {
                            let historique = await axios({
                                url: `http://localhost:1338/historiques`,
                                method: "post",
                                data: {
                                    user: this.self.appContext.app.config.globalProperties.$sdata.value.user.id,
                                    title: `Modification d'un membre`,
                                    message: `Vous avez effectué une modification sur ${this.item.nom} ${this.item.prenom}`,
                                    color: "positive",
                                    msg_admin: `${this.self.appContext.app.config.globalProperties.$sdata.value.user.nom} ${this.self.appContext.app.config.globalProperties.$sdata.value.user.prenom} a effectué une modification sur ${this.item.nom} ${this.item.prenom}`
                                },
                                headers: {
                                    Authorization: `Bearer ${token}`
                                    }
                                })
                        }
                    }
                 

                    Notify.create({
                        message: "Modification effectuée",
                        type: "positive",
                        position: 'top-right',
                        actions: [
                            { icon: 'close', color: 'white', handler: () => { /* ... */ } }
                          ]
                    })
                }

            } catch (error) {
                Notify.create({
                    message: "Modification echouée",
                    type: "negative",
                    position: 'top-right',
                    actions: [
                        { icon: 'close', color: 'white', handler: () => { /* ... */ } }
                      ]
                })
                console.log(error);
            }
        }

    }

    /**
      * la fonction remove est utilisé pour une suppression , 
      * sa requette axios  recoit comme parametre le service ainsi que l'id de la donnée du service
     */
    async remove() {
        const token = this.self.appContext.app.config.globalProperties.$sdata.value.jwt
        if (this.deleteForm.value.validate()) {
            try {
                let res = {}
                //requette axios pour la suppression d'une donnée
                res = await axios({
                    url: `http://localhost:1338/${this.service}/${this.item.id}`,
                    method: "delete",
                    data: {},
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                let compteur = 0
                // actualisation de la liste this.items
                for (const iterator of this.items.value) {
                    if (iterator.id === this.item.id) {
                        this.items.value.splice(
                            compteur,
                            1
                        )
                    }
                    compteur++
                }

                if (res && res.data) {
                    if (this.service === "users-permissions/roles") {
                        let historique = await axios({
                            url: `http://localhost:1338/historiques`,
                            method: "post",
                            data: {
                                user: this.self.appContext.app.config.globalProperties.$sdata.value.user.id,
                                title: `Suppression d'une fonction`,
                                message: `Vous avez supprimer ${this.item.name}`,
                                color: "negative",
                                msg_admin: `${this.self.appContext.app.config.globalProperties.$sdata.value.user.nom} ${this.self.appContext.app.config.globalProperties.$sdata.value.user.prenom} a supprimé ${this.item.name}`
                            },
                            headers: {
                                Authorization: `Bearer ${token}`
                                }
                            })
                        }

                    if (this.service === "users") {
                        let historique = await axios({
                            url: `http://localhost:1338/historiques`,
                            method: "post",
                            data: {
                                user: this.self.appContext.app.config.globalProperties.$sdata.value.user.id,
                                title: `Suppression d'un membre`,
                                message: `Vous avez supprimer ${this.item.nom} ${this.item.prenom}`,
                                color: "negative",
                                msg_admin: `${this.self.appContext.app.config.globalProperties.$sdata.value.user.nom} ${this.self.appContext.app.config.globalProperties.$sdata.value.user.prenom} a supprimé ${this.item.nom} ${this.item.prenom}`
                            },
                            headers: {
                                Authorization: `Bearer ${token}`
                                }
                            })
                        }

                    if (this.service === "categorie-groupes" || this.service === "groupes") {
                        let historique = await axios({
                            url: `http://localhost:1338/historiques`,
                            method: "post",
                            data: {
                                user: this.self.appContext.app.config.globalProperties.$sdata.value.user.id,
                                title: `Suppression de ${this.service}`,
                                message: `Vous avez supprimer ${this.item.title}`,
                                color: "negative",
                                msg_admin: `${this.self.appContext.app.config.globalProperties.$sdata.value.user.nom} ${this.self.appContext.app.config.globalProperties.$sdata.value.user.prenom} a supprimé ${this.item.title}`
                            },
                            headers: {
                                Authorization: `Bearer ${token}`
                                }
                            })
                        }
                                              
                }

                Notify.create({
                    message: "Supression effectuée",
                    type: "positive",
                    position: 'top-right',
                    actions: [
                        { icon: 'close', color: 'white', handler: () => { /* ... */ } }
                      ]
                })
            } catch (error) {
                console.log(error);
                Notify.create({
                    message: "Supression echouée",
                    type: "negative",
                    position: 'top-right',
                    actions: [
                        { icon: 'close', color: 'white', handler: () => { /* ... */ } }
                      ]
                })
            }
        }
    }

    /**
     * la fonction register permet d'enregistrer un utlisateur.
     */
    async register() {
        const token = this.self.appContext.app.config.globalProperties.$sdata.value.jwt;
        const data = {
            data: this.item.value
        }

        if (this.createForm.value.validate()) {
            try {
                //requette axios pour creer un nouveau utilisateur
                let res = await axios({
                    url: "http://localhost:1338/auth/local/register",
                    method: "post",
                    data: {
                        nom: this.item.value.nom,
                        email: this.item.value.email,
                        prenom: this.item.value.prenom,
                        username: this.item.value.username,
                        niveau: this.self.appContext.app.config.globalProperties.$sdata.value.user.niveau + 1,
                        creator: this.self.appContext.app.config.globalProperties.$sdata.value.user.id,
                        password: this.item.value.password,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                

                if (res.data) {
                    //enregistrement de l'image du nouveau utilisateur
                    const formData = new FormData();
                    formData.append('files', this.item.value.image)
                    formData.append('ref', 'user')
                    formData.append('refId', res.data.user.id)
                    formData.append('field', 'image')
                    formData.append('source', 'users-permissions')

                    let uploader = await axios({
                        url: "http://localhost:1338/upload",
                        method: "post",
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`
                        },
                        data: formData,
                    })

                    //Historique
                    let historique = await axios({
                        url: `http://localhost:1338/historiques`,
                        method: "post",
                        data: {
                            user: this.self.appContext.app.config.globalProperties.$sdata.value.user.id,
                            title: `Création d'un membre`,
                            message: `Vous avez créez ${res.data.user.nom} ${res.data.user.prenom}`,
                            color: "info",
                            msg_admin: `${this.self.appContext.app.config.globalProperties.$sdata.value.user.nom} ${this.self.appContext.app.config.globalProperties.$sdata.value.user.prenom} a crée ${res.data.user.nom} ${res.data.user.prenom}`
                        },
                        headers: {
                            Authorization: `Bearer ${token}`
                            }
                        })
                }

                Notify.create({
                    message: "Opération effectuée",
                    type: "positive",
                    position: 'top-right',
                    actions: [
                        { icon: 'close', color: 'white', handler: () => { /* ... */ } }
                      ]
                })
            } catch (error) {
                Notify.create({
                    message: "Opération echouée",
                    type: "negative",
                    position: 'top-right',
                    actions: [
                        { icon: 'close', color: 'white', handler: () => { /* ... */ } }
                      ]
                })
                console.log(error);
            }
        }
    }
    /**
     * fonction auth  pour authentifier un utilisateur pendant la connexion.
     */
    async auth(form) {
        try {
            if (this.loginForm.value.validate()) {
                //requette axios pour l'authentification d'un utlisateur
                let res = await axios({
                    url: `http://localhost:1338/auth/local`,
                    method: "post",
                    data: form,

                })

                if (res.data) {
                    this.loginForm.value.$router.push({ name: "dashboard" })
                    Notify.create({
                        message: "Connexion reussie",
                        type: "positive",
                        position: 'top-right',
                        actions: [
                            { icon: 'close', color: 'white', handler: () => { /* ... */ } }
                          ]
                    })
                    //stocker les informations et le token de lutilisateur connecter
                    this.loginForm.value.$sdata.value.user = res.data.user
                    this.loginForm.value.$sdata.value.jwt = res.data.jwt
                } else {
                    /** échec d'authentification */
                    Notify.create({
                        message: "Username ou Password incorrect",
                        type: "negative",
                        position: 'top-right',
                        actions: [
                            { icon: 'close', color: 'white', handler: () => { /* ... */ } }
                          ]
                    })
                }

            }

        } catch (error) {
            console.log(error);
            Notify.create({
                message: "Username ou Password incorrect",
                type: "negative",
                position: 'top-right',
                actions: [
                    { icon: 'close', color: 'white', handler: () => { /* ... */ } }
                  ]
            })
        }
    }

    async autorisation(action) {
        try {
            const user = this.self.appContext.app.config.globalProperties.$sdata.value.user
            const token = this.self.appContext.app.config.globalProperties.$sdata.value.jwt
            let res = await axios({
                url: `http://localhost:1338/customize`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    user: user,
                    service: this.service,
                    action: action
                }
            })
            var trouv = res.data

            if (trouv) {
                return true
            }
            else {
                return false
            }

        } catch (error) {
            console.log(error);
        }
    }

}
