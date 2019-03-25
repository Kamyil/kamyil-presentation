import * as $               from "jquery";
import { $body }            from "../Core/Body";
import { AboutMeSelectors } from "./AboutMe/AboutMeSelectors";
import { TabClasses }       from "./TabClasses";

export const DarkMode = (() => {

    const Selector = {
        SWITCHER: ".darkmode__switcher",
        TAB:      {
            DEFAULT:      ".tab-default",
            ACTIVE:       ".tab-active",
            DEFAULT_DARK: ".tab-default-dark",
            ACTIVE_DARK:  ".tab-active-dark",
        }
    }
    const Paths    = {
        LIGHT_MODE_BG_IMAGE: "public/build/assets/images/background.png",
        DARK_MODE_BG_IMAGE:  "public/build/assets/images/bg-dark.jpg"
    }


    function toggleModes() {
        const isDarkModeOn: boolean = $(AboutMeSelectors.CONTAINER).data('dark-mode') as boolean;
        const { TAB_DEFAULT, TAB_ACTIVE, TAB_ACTIVE_DARK, TAB_DEFAULT_DARK } = TabClasses;

        if (isDarkModeOn) {
            $(Selector.SWITCHER).removeClass('active');
            $(Selector.TAB.DEFAULT_DARK).each((index, element) => { $(element).removeClass(TAB_DEFAULT_DARK).addClass(TAB_DEFAULT) });
            $(Selector.TAB.ACTIVE_DARK).removeClass(TAB_ACTIVE_DARK).addClass(TAB_ACTIVE);
            $(AboutMeSelectors.CONTENT.CONTAINER).removeClass('dark');
            $(AboutMeSelectors.CONTAINER)
                .data("dark-mode", false)
                .removeClass('dark');
            $body.attr('style', `background: url(${Paths.LIGHT_MODE_BG_IMAGE}) no-repeat center center fixed;`);
        } else {
            $(Selector.SWITCHER).addClass('active');
            $(Selector.TAB.DEFAULT).each((index, element) => { $(element).removeClass(TAB_DEFAULT).addClass(TAB_DEFAULT_DARK) });
            $(Selector.TAB.ACTIVE).removeClass(TAB_ACTIVE).addClass(TAB_ACTIVE_DARK);
            $(AboutMeSelectors.CONTENT.CONTAINER).addClass('dark');
            $(AboutMeSelectors.CONTAINER)
                .data('dark-mode', true)
                .addClass('dark');

            $body.attr('style', `background: url(${Paths.DARK_MODE_BG_IMAGE}) no-repeat center center fixed;`);
        }
    }

    $body.on('click', Selector.SWITCHER, toggleModes);
})();
