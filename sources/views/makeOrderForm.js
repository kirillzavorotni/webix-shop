import { JetView } from "webix-jet";
import { serverUrl } from "models/serverUrl";

const form_config = {
    label_size: {
        width: 160,
    },
};

const formRules = {
    "name": webix.rules.isNotEmpty,
    "email": webix.rules.isEmail,
    "phone": (value) => {
        const regexp = /^((\+3|7|5)+([0-9]){11})$/gm;
        const result = value.match(regexp);
        return true ? result : false;
    },
    "deliverType": webix.rules.isNotEmpty,
    "deliverAddress": webix.rules.isNotEmpty,
    "paymentType": webix.rules.isNotEmpty,
};

export default class MakeOrderFormView extends JetView {
    config() {
        return {
            view: "form",
            localId: "orderForm",
            autoheight: false,
            elements: [
                {
                    view: "text",
                    name: "name",
                    label: "Your name <span class='order-form-necess'>*</span>",
                    labelWidth: form_config.label_size.width,
                    invalidMessage: "Your name can not be empty",
                },
                {
                    view: "text",
                    name: "email",
                    label: "Email <span class='order-form-necess'>*</span>",
                    labelWidth: form_config.label_size.width,
                    invalidMessage: "Incorrect email",
                },
                {
                    view: "text",
                    name: "phone",
                    placeholder: "example +375336312345",
                    label: "Phone <span class='order-form-necess'>*</span>",
                    labelWidth: form_config.label_size.width,
                    invalidMessage: "Incorrect phone. format: +375331234567",
                },
                {
                    view: "richselect",
                    name: "deliverType",
                    label: "Delivery type",
                    options: `${serverUrl}delivery-type`,
                    value: 1,
                    labelWidth: form_config.label_size.width,
                    invalidMessage: "Can not be empty",
                },
                {
                    view: "text",
                    name: "deliverAddress",
                    label: "Delivery address <span class='order-form-necess'>*</span>",
                    labelWidth: form_config.label_size.width,
                    invalidMessage: "Delivery Address can not be empty",
                },
                {
                    view: "richselect",
                    name: "paymentType",
                    label: "Payment type",
                    options: `${serverUrl}payment-type`,
                    value: 1,
                    labelWidth: form_config.label_size.width,
                    invalidMessage: "Can not be empty",
                },
                { view: "spacer" },
                {
                    view: "button",
                    localId: "checkoutBtn",
                    label: "Checkout",
                    click: () => {
                        this.sendData();
                    }
                },
            ],
            rules: formRules,
        };
    }

    /***************************************************************************************************************/
    sendData() {
        const form = this.$$("orderForm");

        if (form.validate()) {
            this.$$("checkoutBtn").disable();
            const formValues = form.getValues();
            const formatDate = webix.Date.dateToStr("%Y-%m-%d %H-%i-%s");
            formValues.order_date = formatDate(new Date());

            webix.ajax().post(`${serverUrl}order/add`, JSON.stringify(formValues))
                .then(() => {
                    this.$$("checkoutBtn").enable();
                    form.clear();
                    form.clearValidation();
                    this.app.callEvent("changeCartBtnLabel", [0]);
                    webix.message("Order is processed");
                    this.show("./orderHistoryTable");
                })
                .catch(() => {
                    webix.message("Server error :( Try later.");
                });

        }
    }
}
