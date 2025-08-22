<template>
	<table>
		<tr>
			<th><router-link to="AbR">AbugidaR</router-link></th>
			<th><router-link to="AlD">AlphabetD</router-link></th>
		</tr>
		<tr>
			<td>
				<span class="AbugidaR">Abu;gi;'da.</span>
			</td>
			<td>
				<span class="AlphabetD">Alfubet.</span>
			</td>
		</tr>
	</table>
</template>

<style scoped>
table {
	text-align:
		center;
}

.AbugidaR::before {
	content: "^"
}
</style>