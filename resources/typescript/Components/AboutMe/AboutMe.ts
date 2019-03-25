import * as $               from "jquery";
import { $body }            from "../../Core/Body";
import { AboutMeSelectors } from './AboutMeSelectors';
import { TabClasses }       from "../TabClasses";

export const AboutMe = (() => {

    function getSelectedTabNameAndSwitch(this) {
        const { CONTENT, TAB, HEADER_TITLE } = AboutMeSelectors;
        const $this: JQuery<HTMLElement>   = $(this);
        const contentToSwitchOn: string    = $this.data('tab-name');

        switchTabWithContent(TAB, contentToSwitchOn, false);
        switchTabWithContent(HEADER_TITLE, contentToSwitchOn, true);
        switchTabWithContent(CONTENT.SELF, contentToSwitchOn, true);
    }

    function switchTabWithContent(selector: string, contentToSwitchOn: string, hideElement: boolean) {
        const {CLASS_NAME} = AboutMeSelectors;
        const { TAB_DEFAULT, TAB_ACTIVE, TAB_ACTIVE_DARK, TAB_DEFAULT_DARK } = TabClasses;
        const isDarkModeOn: boolean = $(AboutMeSelectors.CONTAINER).data('dark-mode') as boolean;

        $(selector).each((index, element) => {
            if (isDarkModeOn) {
                $(element).hasClass(CLASS_NAME.CONTENT) ||
                $(element).hasClass(CLASS_NAME.HEADER_TITLE)
                    ? $(element).removeClass('active')
                    : $(element).removeClass(TAB_ACTIVE_DARK).addClass(TAB_DEFAULT_DARK);
            } else {
                $(element).hasClass(CLASS_NAME.CONTENT) ||
                $(element).hasClass(CLASS_NAME.HEADER_TITLE)
                    ? $(element).removeClass('active')
                    : $(element).removeClass(TAB_ACTIVE).addClass(TAB_DEFAULT);
            }

            hideElement ? $(element).hide('fast') : false;

            if (contentToSwitchOn == $(element).data("tab-name")) {
                if (isDarkModeOn) {
                    $(element).hasClass(CLASS_NAME.CONTENT) ||
                    $(element).hasClass(CLASS_NAME.HEADER_TITLE)
                        ? $(element).addClass('active')
                        : $(element).addClass(TAB_ACTIVE_DARK).removeClass(TAB_DEFAULT_DARK);
                } else {
                    $(element).hasClass(CLASS_NAME.CONTENT) ||
                    $(element).hasClass(CLASS_NAME.HEADER_TITLE)
                        ? $(element).addClass('active')
                        : $(element).addClass(TAB_ACTIVE).removeClass(TAB_DEFAULT);
                }

                $(element).show('slow');
            }
        });
    }

    $body.on('click', AboutMeSelectors.TAB, getSelectedTabNameAndSwitch);
})();
