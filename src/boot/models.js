// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async (/* { app, router, ... } */ {app}) => {
  // something to do
  app.config.globalProperties.$models = [
    "categorie-groupes",
    "users-permissions/roles",
    "users-permissions/permissions",
    "users-permissions/permissionss",
    "users",
    "groupes",
    "files",
    "acces-control",
    "groupe-role",
    "user-role",
    "user-groupes",
    "role-acces-control",
    "auth"
  ]
}
