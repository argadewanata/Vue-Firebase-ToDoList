import { createRouter, createWebHistory } from "vue-router";
import ToDoList from '../components/ToDoList.vue'
import MainMenu from '../components/MainMenu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MainMenu",
      component: MainMenu,
    },
    {
      path: "/ToDoList",
      name: "ToDoList",
      component: ToDoList,
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
