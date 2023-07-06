import {Notify} from 'quasar'
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
  app.config.globalProperties.$notify =  (message, type) =>  {
    Notify.create({
      message,
      type,
      position: 'top-right'
    } )
  }
})

