import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Main from './components/Main.vue';


const router = new Router({
 routes: [
 	{
		path: '/',
		name:'Main',
		component: Main,
	},
 ],
  mode: 'history'
})

router.beforeResolve((to, from, next) => {
	if (to.name) {
		NProgress.start()
	}
	next()
})

router.afterEach((to, from) => {
	NProgress.done()
})

export default router;