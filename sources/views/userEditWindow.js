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
    "name": webix.rules.isNotEmpty,
    "email": webix.rules.isEmail,
};

export default class UserWindowView extends JetView {
    config() {
        return {
            view: "window",
            head: {
                cols: [
                    {
                        localId: "userWindowHeadTpl",
                        template: "User info",
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
                localId: "userForm",
                rules: formRules,
                elements: [
                    {
                        view: "text",
                        label: "User name",
                        name: "name",
                        invalidMessage: "Can be filled",
                    },
                    {
                        view: "text",
                        label: "User email",
                        name: "email",
                        invalidMessage: "Can be email",
                    },
                    {
                        view: "button",
                        label: "Save",
                        click: () => {
                            this.saveUserInfo();
                        }
                    },
                ],
            }
        };
    }

    /****************************************************************************************************/
    init() {

    }

    showWindow(user) {
        const form = this.$$("userForm");
        this.getRoot().show();
        form.setValues(user);
    }

    hideWindow() {
        const form = this.$$("userForm");
        form.clear();
        form.clearValidation();
        this.getRoot().hide();
    }

    saveUserInfo() {
        const form = this.$$("userForm");

        if (form.validate()) {
            const value = form.getValues();

            webix.ajax().post(`${serverUrl}user/update`, JSON.stringify(value))
                .then((response) => {
                    const data = response.json();
                    this.app.callEvent("editUesrInUserTable", [data]);
                    this.hideWindow();
                })
                .catch(() => {
                    webix.message("Server error");
                });
        }

    }
}
