
<script>
import { defineComponent, ref, h, getCurrentInstance, reactive } from 'vue';
import { QInput } from 'quasar'

import PageLayout from "src/generators/page-layout"

export default defineComponent({
  name: 'PageEssai',
  emits: ['update:modelValue'],
  components: {
    PageLayout
  },
  setup(){
    
  },
  data(){
    return {
      nom:"vérification simple"
    }
  },
  render(){
    
    let value = reactive({name: ""})
    let attrs = {
      "v-model": value.name 
    }
    return h(QInput, attrs)
  }
})
</script>
