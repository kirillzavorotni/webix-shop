import { JetView } from "webix-jet";

const window_size = {
    width: 500,
    height: 350,
    position: "center",
};

const closeBtn_size = {
    width: 40,
};

export default class DeclineReasonWindowView extends JetView {
    config() {
        return {
            view: "window",
            head: {
                cols: [
                    {
                        localId: "productWindowHeadTpl",
                        template: "Decline reason",
                        borderless: true,
                        css: "productWindowHeadTemplate"
                    },
                    {
                        view: "button",
                        type: "icon",
                        icon: "wxi-close",
                        width: closeBtn_size.width,
                        css: "productWindowCloseBtn",
                        click: () => {
                            this.hideWindow();
                        }
                    },
                ],
            },
            width: window_size.width,
            height: window_size.height,
            position: window_size.position,
            modal: true,
            body: {
                view: "template",
                localId: "productWindowBodyTemplate",
                css: "decline-reason-template-body",
                template: "Product was lost",
            }
        };
    }

    /****************************************************************************************************/

    showWindow(declineReason) {
        this.getRoot().show();
        const windowBodyTpl = this.$$("productWindowBodyTemplate");
        windowBodyTpl.define("template", declineReason);
        windowBodyTpl.refresh();
    }

    hideWindow() {
        const windowBodyTpl = this.$$("productWindowBodyTemplate");
        windowBodyTpl.define("template", "");
        windowBodyTpl.refresh();
        this.getRoot().hide();
    }
}
