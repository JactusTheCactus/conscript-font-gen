import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import AbR from '../views/AbR.vue';
import AbR_IPA from '../views/AbR/IPA.vue';
import AbR_IvlivsCaesar from '../views/AbR/IvlivsCaesar.vue';
import AlD from '../views/AlD.vue';
import AlD_IPA from '../views/AlD/IPA.vue';
import AlD_IvlivsCaesar from '../views/AlD/IvlivsCaesar.vue';
const divider = " | ";
const routes = [
	{
		path: '/',
		name: 'HomePage',
		component: Home
	},
	{
		path: '/AbR',
		name: 'AbR',
		component: AbR,
		meta: {
			title: [
				"AbR",
				"Home"
			].join(divider)
		}
	},
	{
		path: '/AbR/IPA',
		name: 'AbR_IPA',
		component: AbR_IPA,
		meta: {
			title: [
				"AbR",
				"IPA"
			].join(divider)
		}
	},
	{
		path: '/AbR/IvlivsCaesar',
		name: 'AbR_IvlivsCaesar',
		component: AbR_IvlivsCaesar,
		meta: {
			title: [
				"AbR",
				"Example Text"
			].join(divider)
		}
	},
	{
		path: '/AlD',
		name: 'AlD',
		component: AlD,
		meta: {
			title: [
				"AlD",
				"Home"
			].join(divider)
		}
	},
	{
		path: '/AlD/IPA',
		name: 'AlD_IPA',
		component: AlD_IPA,
		meta: {
			title: [
				"AlD",
				"IPA"
			].join(divider)
		}
	},
	{
		path: '/AlD/IvlivsCaesar',
		name: 'AlD_IvlivsCaesar',
		component: AlD_IvlivsCaesar,
		meta: {
			title: [
				"AlD",
				"Example Text"
			].join(divider)
		}
	}
];
const router = createRouter({
	history: createWebHistory(),
	routes
});
export default router