import { JetView } from "webix-jet";
import { serverUrl } from "models/serverUrl";

const window_size = {
    width: 500,
    height: 350,
    position: "center",
};

const closeBtn_size = {
    width: 40,
};

const formRules = {
    "decline_reason": webix.rules.isNotEmpty,
    "status_id": webix.rules.isNotEmpty,
};

const formRichSelectWidth = {
    select_width: 130,
};

export default class OrderStatusWindowView extends JetView {
    config() {
        return {
            view: "window",
            head: {
                cols: [
                    {
                        localId: "userWindowHeadTpl",
                        template: "Change status",
                        borderless: true,
                        css: "productWindowHeadTemplate"
                    },
                    {
                        view: "button",
                        borderless: true,
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
                view: "form",
                localId: "orderStatusForm",
                rules: formRules,
                elements: [
                    {
                        view: "richselect",
                        localId: "selectOrderStatus",
                        options: `${serverUrl}status-type`,
                        label: "Choose status",
                        labelWidth: formRichSelectWidth.select_width,
                        name: "status_id",
                        on: {
                            onChange: (newVal) => {
                                this.checkStatus(newVal);
                            },
                        },
                        invalidMessage: "Can be filled",
                    },
                    {
                        view: "textarea",
                        localId: "textareaReason",
                        labelWidth: formRichSelectWidth.select_width,
                        label: "Indicate reason",
                        name: "decline_reason",
                        invalidMessage: "Can be filled",
                    },
                    {
                        view: "button",
                        label: "Save",
                        click: () => {
                            this.saveStatus();
                        }
                    },
                ],
            }
        };
    }

    /****************************************************************************************************/
    init() {
        this.$$("textareaReason").hide();
    }

    showWindow(order) {
        this.getRoot().show();
        this.$$("orderStatusForm").setValues(order);
        const textarea = this.$$("textareaReason");

        if (this.$$("selectOrderStatus").getValue() == 2) {
            textarea.show();
        } else {
            textarea.hide();
        }

    }

    hideWindow() {
        const orderStatusForm = this.$$("orderStatusForm");
        orderStatusForm.clear();
        orderStatusForm.clearValidation();
        this.getRoot().hide();
    }

    saveStatus() {
        const form = this.$$("orderStatusForm");

        if (this.$$("selectOrderStatus").getValue() == 1) {
            this.$$("textareaReason").setValue("no decline reason");
        }

        if (form.validate()) {
            const value = form.getValues();

            webix.ajax().post(`${serverUrl}order-status/update`, JSON.stringify(value))
                .then((response) => {
                    const data = response.json();
                    this.app.callEvent("editOrderInOrderTable", [data]);
                    this.hideWindow();
                })
                .catch(() => {
                    webix.message("Server error");
                });
        }

    }

    checkStatus(newVal) {
        const textarea = this.$$("textareaReason");

        if (newVal == 2) {
            textarea.show();
        } else {
            textarea.hide();
        }

    }
}
