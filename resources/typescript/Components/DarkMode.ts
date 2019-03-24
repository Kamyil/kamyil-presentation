import * as $ from "jquery";
import { $body } from "../Core/Body";
import { AboutMeSelectors } from "./AboutMe/AboutMeSelectors";

export const DarkMode = (() => {

    const Selector = {
        SWITCHER: ".darkmode__switcher",
        TAB: {
            DEFAULT     : ".tab-default",
            ACTIVE      : ".tab-active",
            DEFAULT_DARK: ".tab-default-dark",
            ACTIVE_DARK : ".tab-active",
        }
    }

    function toggleModes() {
        const isDarkModeOn: boolean = $(AboutMeSelectors.CONTAINER).data('dark-mode') as boolean;
        
        if (isDarkModeOn) {
            $(AboutMeSelectors.CONTENT.CONTAINER).removeClass('dark');
            $(Selector.TAB.ACTIVE_DARK).removeClass('tab-active-dark').addClass('tab-active');
            $(Selector.SWITCHER).removeClass('active');
            $(Selector.TAB.DEFAULT_DARK).each((index, element) => { $(element).removeClass('tab-default-dark').addClass('tab-default') });
            $(Selector.TAB.ACTIVE_DARK).each((index, element) => { $(element).removeClass('tab-active-dark').addClass('tab-active') });
            $(AboutMeSelectors.CONTAINER)
                .data("dark-mode", false)
                .removeClass('dark');
            // $body.css('background', 'background: url("public/build/assets/images/background.png") no-repeat center center fixed;');
        } else {
            $(AboutMeSelectors.CONTENT.CONTAINER).addClass('dark');
            $(Selector.TAB.ACTIVE).removeClass('tab-active').addClass('tab-active-dark');
            $(Selector.SWITCHER).addClass('active');
            $(Selector.TAB.DEFAULT).each((index, element) => { $(element).removeClass('tab-default').addClass('tab-default-dark') });
            $(Selector.TAB.ACTIVE).each((index, element) => { $(element).removeClass('tab-active').addClass('tab-active-dark') });
            $(AboutMeSelectors.CONTAINER)
                .data('dark-mode', true)
                .addClass('dark');
                
            // $(AboutMeSelectors.CONTAINER).css('background', 'background: url("public/build/assets/images/bg-dark.png") no-repeat center center fixed;');
        }
    }

    $body.on('click', Selector.SWITCHER, toggleModes);
})();
