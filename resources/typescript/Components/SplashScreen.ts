import * as $ from 'jquery';
import { $body } from '../Core/Body';
import { AboutMeSelectors } from "./AboutMe/AboutMeSelectors";

export const SplashScreen = (() => {

	const Selector = {
		CONTAINER: ".splashscreen",
		LOGO: {
			FULL : ".splashscreen__logo--full",
			EMPTY: ".splashscreen__logo--empty",
		},
		TITLE  : ".splashscreen__title",
		CAPTION: ".splashscreen__caption",
	}

	function initSplashScreenAnimation() {
		const { CONTAINER, LOGO, TITLE, CAPTION } = Selector;

		// Show full rotated logo with caption and title on start
		$(LOGO.FULL).fadeIn(1000);
		DoRotate(0);
		$(TITLE).fadeIn(2000);
		$(CAPTION).fadeIn(3000);

		// After 4 seconds start replacing full logo with empty one
		$(LOGO.FULL).delay(4000).fadeOut(500);
		$(LOGO.EMPTY).delay(5000).fadeIn(500);


		// Start replacing splash screen with AboutMe component
		$(TITLE).delay(3000).fadeOut(500);
		$(CAPTION).delay(2000).fadeOut(500);
		$(CONTAINER).delay(6500).fadeOut(500);
		$(LOGO.EMPTY).delay(1000).fadeOut(500);
		$(AboutMeSelectors.CONTAINER).delay(6500).show(500);


	}

	function DoRotate(degrees: number) {
		$(Selector.LOGO.FULL).css({
			transform: `rotate(${degrees}deg)`
		});
		AnimateRotate(0);
	}

	function AnimateRotate(degrees: number) {
		$({ deg: -45 }).animate({ deg: degrees }, {
			duration: 2000,
			step: (now) => {
				$(Selector.LOGO.FULL).css({
					transform: `rotate(${now}deg)`
				});
			}
		});
	}

	$body.ready(initSplashScreenAnimation);
})();



