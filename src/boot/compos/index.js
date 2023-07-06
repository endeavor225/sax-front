// import something here
import * as composition from "./compos";
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async (/* { app, router, ... } */ {app}) => {
    // something to do
    for (const key of Object.keys(composition)) {
        app.config.globalProperties[key] = composition[key]    
    }
    
}
  