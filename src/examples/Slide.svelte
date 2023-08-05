<script lang="ts">
	export let title: string;
	export let subtitle: string;

	const gradients = [
		'linear-gradient(to bottom right, #FF512F, #DD2476)',
		'linear-gradient(to bottom right, #FF61D2, #FE9090)',
		'linear-gradient(to bottom right, #FEE140, #FA709A)',
		'linear-gradient(to bottom right, #FDC830, #F37335)',
		'linear-gradient(to bottom right, #72FFB6, #10D164)',
		'linear-gradient(to bottom right, #FD8451, #FFBD6F)',
		'linear-gradient(to bottom right, #00C0FF, #4218B8)',
		'linear-gradient(to bottom right, #0100EC, #FB36F4)',
		'linear-gradient(to bottom right, #5761B2, #1FC5A8)',
		'linear-gradient(to bottom right, #FF3E9D, #0E1F40)',
		'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
		'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)'
	];
	const randomGragient = gradients[Math.floor(Math.random() * gradients.length)];
</script>

<div class="card w-full min-h-full text-primary-content" style:background={randomGragient}>
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>{subtitle}</p>
	</div>
</div>
