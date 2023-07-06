import { boot } from 'quasar/wrappers'
import { date } from 'quasar'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files

  export default async ({app}) => {

    const dateFormater = (params) => {
      return date.formatDate(params, 'dddd DD MMMM YYYY \r\n à HH:mm:ss')
    }
    app.config.globalProperties.$FormatDate = dateFormater
  }