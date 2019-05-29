<template>
	<div @click.prevent.stop="() => false" class="animated fadeIn">
		<img class="blink-image" src="../../assets/dvla-logo.jpg">
	</div>
</template>

<style scoped>
	div {
		position: fixed;
		top: 36%;
		left: calc(50% - 96px);
		z-index: 99999;
	}

	div::before {
		content: '';
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		padding: 99998px;
		background: rgba(0, 0, 0, 0.6);
	}

	/* Firefox old*/
	@-moz-keyframes blink {
	    0% {
	        opacity:1;
	    }
	    50% {
	        opacity:0;
	    }
	    100% {
	        opacity:1;
	    }
	}

	@-webkit-keyframes blink {
	    0% {
	        opacity:1;
	    }
	    50% {
	        opacity:0;
	    }
	    100% {
	        opacity:1;
	    }
	}

	/* IE */
	@-ms-keyframes blink {
	    0% {
	        opacity:1;
	    }
	    50% {
	        opacity:0;
	    }
	    100% {
	        opacity:1;
	    }
	}

	/* Opera and prob css3 final iteration */
	@keyframes blink {
	    0% {
	        opacity:1;
	    }
	    50% {
	        opacity:0;
	    }
	    100% {
	        opacity:1;
	    }
	}

	.blink-image {
		width: 200px;
	    -moz-animation: blink normal 2s infinite ease-in-out; /* Firefox */
	    -webkit-animation: blink normal 2s infinite ease-in-out; /* Webkit */
	    -ms-animation: blink normal 2s infinite ease-in-out; /* IE */
	    animation: blink normal 2s infinite ease-in-out; /* Opera and prob css3 final iteration */
	}
</style>