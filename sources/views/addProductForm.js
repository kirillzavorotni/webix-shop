import { JetView } from "webix-jet";
import { serverUrl } from "models/serverUrl";

const formRules = {
    "name": webix.rules.isNotEmpty,
    "price": webix.rules.isNumber,
};

const form_config = {
    elements_margin: 10,
    labelWidth: 200,
    addProductBtn_width: 200,
};

export default class AddProductFormView extends JetView {
    config() {
        return {
            view: "form",
            localId: "addProdForm",
            rules: formRules,
            autoheight: false,
            elements: [
                {
                    margin: form_config.elements_margin,
                    rows: [
                        {
                            margin: form_config.elements_margin,
                            rows: [
                                {
                                    view: "text",
                                    label: "Name <span class='order-form-necess'>*</span>",
                                    placeholder: "Type name",
                                    name: "name",
                                    invalidMessage: "can be fill",
                                },
                                {
                                    view: "text",
                                    label: "Price <span class='order-form-necess'>*</span>",
                                    placeholder: "Type price",
                                    name: "price",
                                    invalidMessage: "can be number",
                                },
                                {
                                    cols: [
                                        {
                                            template: "Picture",
                                            css: "addProdForm-picture-template",
                                        },
                                        {
                                            view: "uploader",
                                            localId: "uploader",
                                            value: "Add picture",
                                            link: "uploaderProgress",
                                            multiple: false,
                                            accept: "image/png, image/jpeg",
                                            autosend: true,
                                            upload: `${serverUrl}images`,
                                            on: {
                                                onUploadComplete: (response) => {
                                                    this._pictureName = response.filename;
                                                    this.definePictTemplate(this._pictureName);
                                                }
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            localId: "pictureTemplate",
                            template: `
                                <div class="picture-template-wrap">
                                    <img src="${serverUrl}img/default.png" class="picture-template-img">
                                </div>
                            `,
                        },
                        {
                            view: "list",
                            id: "uploaderProgress",
                            type: "uploader",
                            autoheight: true,
                            borderless: true
                        },
                        {
                            view: "richselect",
                            localId: "groupSelect",
                            label: "Choose product group",
                            labelWidth: form_config.labelWidth,
                            suggest: {
                                url: `${serverUrl}group`,
                                body: {
                                    template: "#name#",
                                },
                            },
                        },
                        {
                            view: "richselect",
                            label: "Choose manufacturer",
                            localId: "manufSelect",
                            labelWidth: form_config.labelWidth,
                            suggest: {
                                url: `${serverUrl}manufacturer`,
                                body: {
                                    template: "#name#",
                                },
                            },
                        },
                        {
                            cols: [
                                { view: "spacer" },
                                {
                                    view: "button",
                                    label: "Add new product",
                                    click: () => {
                                        this.addProduct();
                                    },
                                    width: form_config.addProductBtn_width,
                                },
                            ],
                        },
                    ]
                },
            ],
        };
    }

    /****************************************************************************************************/
    addProduct() {
        const form = this.$$("addProdForm");

        if (form.validate()) {
            const groupId = this.$$("groupSelect").getValue();
            const featurersName = this.$$("manufSelect").getText();
            const values = form.getValues();
            values.groupId = groupId;
            values.featurersName = featurersName;

            if (this._pictureName) {
                values.picture = this._pictureName;
            }

            webix.ajax().post(`${serverUrl}product/add`, JSON.stringify(values))
                .then(() => {
                    form.clear();
                    form.clearValidation();
                    this.definePictTemplate("default.png");
                    this._pictureName = null;
                    webix.message("Product is added!");
                })
                .catch(() => {
                    webix.message("Server error");
                });
        }

    }

    definePictTemplate(fileName) {
        const template = `
            <div class="picture-template-wrap">
                <img src="${serverUrl}img/${fileName}" class="picture-template-img">
            </div>
        `;
        this.$$("pictureTemplate").define("template", template);
        this.$$("pictureTemplate").refresh();
    }
}
