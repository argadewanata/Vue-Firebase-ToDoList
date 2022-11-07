import { createRouter, createWebHistory } from "vue-router";
import CreateToDos  from '../components/CreateToDos.vue'
import List from '../components/List.vue'
import EditToDos from '../components/EditToDos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "List",
      component: List,
    },
    {
      path: "/CreateToDos",
      name: "CreateToDos",
      component: CreateToDos,
    },
    {
      path: "/EditToDos/:id",
      name: "EditToDos",
      component: EditToDos,
    },
    // Untuk selain halaman diatas akan diarahkan ke halaman 404
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ],
});

export default router;
