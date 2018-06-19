import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Main from './components/Main.vue';
import TumblrPosts from './components/TumblrPosts.vue';
import TumblrPost from './components/TumblrPost.vue';


const router = new Router({
 routes: [
 	{
		path: '/',
		name:'Main',
		component: Main,
	},
	{
		path: '/posts',
		name:'TumblrPosts',
		component: TumblrPosts,
	},
	{
		path: '/posts/:id',
		name:'TumblrPost',
		component: TumblrPost,
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