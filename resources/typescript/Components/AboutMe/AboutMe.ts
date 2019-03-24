import * as $               from "jquery";
import { $body }            from "../../Core/Body";
import { AboutMeSelectors } from './AboutMeSelectors';

export const AboutMe = (() => {

    function getSelectedTabNameAndSwitch(this) {
        const { CONTENT, TAB, HEADER_TITLE } = AboutMeSelectors;
        const $this: JQuery<HTMLElement>   = $(this);
        const contentToSwitchOn: string    = $this.data('tab-name');

        switchTabWithContent(TAB, contentToSwitchOn, false);
        switchTabWithContent(HEADER_TITLE, contentToSwitchOn, true);
        switchTabWithContent(CONTENT, contentToSwitchOn, true);
    }

    function switchTabWithContent(selector: string, contentToSwitchOn: string, hideElement: boolean) {
        const { CLASS_NAME } = AboutMeSelectors;
        $(selector).each((index, element) => {

            $(element).hasClass(CLASS_NAME.CONTENT) ||
            $(element).hasClass(CLASS_NAME.HEADER_TITLE)
                ? $(element).removeClass('active')
                : $(element).removeClass('tab-active').addClass('tab-default');

            hideElement ? $(element).hide('fast') : false;

            if (contentToSwitchOn == $(element).data("tab-name")) {
                $(element).hasClass(CLASS_NAME.CONTENT) ||
                $(element).hasClass(CLASS_NAME.HEADER_TITLE)
                    ? $(element).addClass('active')
                    : $(element).addClass('tab-active').removeClass('tab-default');
                $(element).show('slow');
            }
        });
    }

    $body.on('click', AboutMeSelectors.TAB, getSelectedTabNameAndSwitch);
})();
