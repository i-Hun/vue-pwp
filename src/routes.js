import Router from 'vue-router';
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';

import Main from './components/Main.vue';
import HSESummerSchool2018PythonCourse from './components/HSESummerSchool2018PythonCourse.vue';
import Inliberty2018 from './components/Inliberty2018.vue';
import SummerSchoolDubna2018 from './components/SummerSchoolDubna2018.vue';
import DataAnalysisInSpecialEnviroments2018_2019 from './components/DataAnalysisInSpecialEnviroments2018_2019.vue';
import intro2Python_2018 from './components/intro2Python_2018.vue';
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
		path: '/courses/DA-2018',
		name:'DataAnalysisInSpecialEnviroments2018_2019',
		component: DataAnalysisInSpecialEnviroments2018_2019,
	},
	{
		path: '/courses/intro2Python-2018',
		name:'intro2Python_2018',
		component: intro2Python_2018,
	},
	{
		path: '/post/:post_id',
		name:'Post',
		component: Post,
	},
 ],
  mode: 'hash'
})

// router.beforeResolve((to, from, next) => {
// 	if (to.name) {
// 		NProgress.start()
// 	}
// 	next()
// })

// router.afterEach((to, from) => {
// 	NProgress.done()
// })

export default router;