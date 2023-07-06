<template>
   <div style="width: 700px">
  

  

  </div>
</template>

<script>
import {defineComponent, ref, getCurrentInstance, onMounted, toRaw, inject, provide} from "vue";
export default {
  // name: 'ComponentName',
  components: {
    AddRole,
  },
  
  setup () {
    self = getCurrentInstance();
    const service = "user-role";
    let add = inject("addRoleModal")
    let state = inject(service)
    let formData = ref({})
    let emptyItem = inject("emptyItem")

    for (const key of Object.keys(emptyItem)) {
      formData.value[key] = emptyItem[key]
    }
    let eForm = ref(null)
    const serviceRole = "roles";
    let stateRoles= inject(serviceRole)
     
    const serviceUser = "users";
    let stateUser = inject(serviceUser)

    let addModal = ref(false);
    provide("addModal", addModal);

    onMounted(async () => {
      stateRoles.filters.value = Object.assign(
        stateRoles.filters.value ? stateRoles.filters.value : {},
        {
          _limit: 10000,
          _start: 0,
        }
      );
      await stateRoles.getItems()
    })


    const options = ref(stateRoles.items.value)

    let filterFn = (val, update) => {
        if (val === '') {
          update(() => {
            options.value = stateRoles.items.value
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          options.value = stateRoles.items.value.filter(v => v.title.toLowerCase().indexOf(needle) > -1)
        })
      }

    let onSubmit= async()=>{
  
      formData.value.user = stateUser.item._key
      formData.value.role = formData.value.role._key
      state.item.value = formData.value
      state.createForm.value = eForm.value
      console.log(state.createForm.value);
      await state.create()

      await stateUser.getItems()
      add.value = false
    }
   
    return {

      formData,
      eForm,
      stateRoles,
      state,
      onSubmit,
      options,
      filterFn,
      addModal
      
    }

  }
}
</script>
