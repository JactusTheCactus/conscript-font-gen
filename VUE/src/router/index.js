import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import AbR from '../views/AbR.vue';
import AbR_IPA from '../views/AbR/IPA.vue';
import AbR_IvlivsCaesar from '../views/AbR/IvlivsCaesar.vue';
import Cas from '../views/Cas.vue';
import Cas_IPA from '../views/Cas/IPA.vue';
import Cas_IvlivsCaesar from '../views/Cas/IvlivsCaesar.vue';
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
		path: '/Cas',
		name: 'Cas',
		component: Cas,
		meta: {
			title: [
				"Cas",
				"Home"
			].join(divider)
		}
	},
	{
		path: '/Cas/IPA',
		name: 'Cas_IPA',
		component: Cas_IPA,
		meta: {
			title: [
				"Cas",
				"IPA"
			].join(divider)
		}
	},
	{
		path: '/Cas/IvlivsCaesar',
		name: 'Cas_IvlivsCaesar',
		component: Cas_IvlivsCaesar,
		meta: {
			title: [
				"Cas",
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