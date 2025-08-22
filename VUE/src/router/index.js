import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import AbR from '../views/AbR.vue';
import AbR_IPA from '../views/AbR/IPA.vue';
import AbR_IvlivsCaesar from '../views/AbR/IvlivsCaesar.vue';
import AlD from '../views/AlD.vue';
import AlD_IPA from '../views/AlD/IPA.vue';
import AlD_IvlivsCaesar from '../views/AlD/IvlivsCaesar.vue';
const routes = [
	{
		path: '/',
		name: 'HomePage',
		component: Home
	},
	{
		path: '/AbR',
		name: 'AbR',
		component: AbR
	},
	{
		path: '/AbR/IPA',
		name: 'AbR_IPA',
		component: AbR_IPA
	},
	{
		path: '/AbR/IvlivsCaesar',
		name: 'AbR_IvlivsCaesar',
		component: AbR_IvlivsCaesar
	},
	{
		path: '/AlD',
		name: 'AlD',
		component: AlD
	},
	{
		path: '/AlD/IPA',
		name: 'AlD_IPA',
		component: AlD_IPA
	},
	{
		path: '/AlD/IvlivsCaesar',
		name: 'AlD_IvlivsCaesar',
		component: AlD_IvlivsCaesar
	}
];
const router = createRouter({
	history: createWebHistory(),
	routes
});
export default router