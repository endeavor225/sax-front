<template>
  <router-view />
</template>
<script>
import { defineComponent, provide, ref, getCurrentInstance } from 'vue';
import { Ressource } from 'boot/compos/compos-classe'

export default defineComponent({
  setup(props, ctx){
    let self =  getCurrentInstance()

    let models = []

    console.log("self",self);

    for (const service of self.appContext.app.config.globalProperties.$models) {
      let ressource = new Ressource(service)
      let opts = ref({
        items: ref([]),
        item: ref({}),
        service,
        filters:ref({}),
        as_filters: ref(true),
        createForm: ref({}),
        updateForm: ref({}),
        searchForm: ref({}),
        deleteForm: ref({}),
        loginForm: ref({}),
        totalItem: ref(0),
        params: ref({})
      })

      provide(service, ressource)
    }

  },
  name: 'App',
  
})
</script>
