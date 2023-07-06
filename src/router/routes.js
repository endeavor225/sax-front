const routes = [
  {
    path: '/',
    component: () => import('layouts/Connexion.vue'),
    children: [
      { path: '', component: () => import('pages/admin/Login.vue') },
    ]
  },

  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: 'dashboard', name:"dashboard", component: () => import('pages/admin/dashboard/Index.vue') },
      { path: 'categorie-groupe', name:"categorie-groupe", component: () => import('pages/admin/categorie-groupe/Index.vue') },
      { path: 'groupe', component: () => import('pages/admin/groupe/Index.vue') },
      { path: 'acces-control', name:"acces-control" , component: () => import('pages/admin/acces-control/Index.vue') },
      { path: 'role', component: () => import('pages/admin/role/Index.vue') },
      { path: 'user', component: () => import('pages/admin/user/Index.vue') },
      //{ path: 'profil', component: () => import('pages/admin/Profil.vue') },
      { path: 'profil', component: () => import('pages/admin/newPageProfile.vue') },
      { path: 'Formulaire', component: () => import('pages/admin/formulaire/Index') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
