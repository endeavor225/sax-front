<template>
  <div>
    <q-item
      clickable
      @click="activeChange"
      :active="isActive"
      active-class="my-menu-link"
    >
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>
          {{ caption }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },
    icon: {
      type: String,
      default: "",
    }
  },
  data(){
    return {
      isActive:false
    }
  },
  mounted(){
    if (this.link === this.$router.currentRoute.value.path) {
        this.$data.isActive = true
    }else{
        this.$data.isActive = false
    }
  },
  setup(props) {
    let instance = getCurrentInstance()

    instance.ctx.$router.beforeEach(function (params) {
      if (instance.ctx.link === params.path) {
        instance.ctx.$data.isActive = true
      }else{
        instance.ctx.$data.isActive = false
      }
    })

    let activeChange = () => {
      instance.ctx.$router.push(instance.ctx.link)
    }

    return {
      activeChange,
    }
  }
})
</script>

<style lang="sass">
.my-menu-link
  color: black
  background: #FFFFFF
  border-radius: 40px 0px 0px 40px
  left: 10px
</style>