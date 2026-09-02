---
title: "Brain break"
weight: 6
excludeFromProgress: true
showAttribution: false
---
<style>
#riveCanvas {
  display: block;
  width: 100%;
  max-width: 856px;
  margin: 0 auto;
  cursor: pointer;
  aspect-ratio: 856 / 483;
}
</style>
<div class="content-856px-max">
	<p class="lead">After all that information, it's time for a little break...</p>
	<figure class="wide">
	<canvas id="riveCanvas" width="856" height="483"></canvas>
	<figcaption>
		<a href="https://rive.app/marketplace/18831-35392-form-fidget/">Form + Fidget</a> by 
		<a href="https://rive.app/@noodledesign/">noodledesign</a>, 
		licensed under 
		<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. 
	</figcaption>
	</figure>
</div>
<script src="https://unpkg.com/@rive-app/canvas@latest"></script>
<!-- <script>
new rive.Rive({
  src: '/skills-for-nd-students/riv/form-fidget.riv',
  canvas: document.getElementById('riveCanvas'),
  autoplay: true,
  stateMachines: ['State Machine 1'],
  onLoad: () => { console.log('Rive loaded'); },
  onError: (e) => { console.error('Rive error:', e); }
});
</script> -->
<div class="timer">
	<svg class="timer-circle" viewBox="0 0 100 100">
		<circle class="timer-background" cx="50" cy="50" r="45"></circle>
		<circle class="timer-progress" cx="50" cy="50" r="45"></circle>
	</svg>
	<div class="digit-container">
		<div class="digit" id="ten-minutes"></div>
		<div class="digit" id="minutes"></div>
		<div class="digit-separator">:</div>
		<div class="digit" id="ten-seconds"></div>
		<div class="digit" id="seconds"></div>
	</div>
</div>
<script src="/skills-for-nd-students/js/brain-break-timer.js?ver=1.1"></script>