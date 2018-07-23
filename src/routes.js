import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Main from './components/Main.vue';
import HSESummerSchool2018PythonCourse from './components/HSESummerSchool2018PythonCourse.vue';
import Inliberty2018 from './components/Inliberty2018.vue';
import Post from './components/Post.vue';


const router = new Router({
routes: [
	{
		path: '/',
		name:'Main',
		component: Main,
	},
	{
		path: '/courses/HSE_school_2018_python',
		name:'HSESummerSchool2018PythonCourse',
		component: HSESummerSchool2018PythonCourse,
	},
	{
		path: '/courses/SummerSchoolDubna2018',
		name:'SummerSchoolDubna2018',
		component: SummerSchoolDubna2018,
	},
	{
		path: '/courses/Inliberty2018',
		name:'Inliberty2018',
		component: Inliberty2018,
	},
	{
		path: '/post/:post_id',
		name:'Post',
		component: Post,
	},
 ],
  mode: 'hash'
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