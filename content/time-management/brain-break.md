---
title: "Brain break"
weight: 6
excludeFromProgress: true
showAttribution: true
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
	<div class="fidget-container">
		<div id="fidget-grid">
			<!-- grid goes here -->
		</div>
		<div id="timer-container" class="timer">
			<svg class="timer-circle" viewBox="0 0 100 100">
				<circle class="timer-background" cx="50" cy="50" r="45"></circle>
				<circle class="timer-progress" cx="50" cy="50" r="45"></circle>
			</svg>
			<div id="digits" class="digit-container" hidden>
				<div class="digit" id="ten-minutes"></div>
				<div class="digit" id="minutes"></div>
				<div class="digit-separator">:</div>
				<div class="digit" id="ten-seconds"></div>
				<div class="digit" id="seconds"></div>
			</div>
		</div>
	</div>
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
<script src="/skills-for-nd-students/js/brain-break-timer.js?ver=1.2"></script>
<script src="/skills-for-nd-students/js/brain-break-fidget.js?ver=1.0"></script>