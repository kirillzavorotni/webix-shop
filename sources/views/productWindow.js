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

export default class ProductWindowView extends JetView {
    config() {
        return {
            view: "window",
            head: {
                cols: [
                    {
                        localId: "productWindowHeadTpl",
                        template: "Device name",
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
                view: "template",
                localId: "productWindowBodyTemplate",
                template: "",
                onClick: {
                    "star": () => {
                        this.addRating();
                    }
                },
            }
        };
    }

    /****************************************************************************************************/
    addRating() {
        webix.ajax().post(`${serverUrl}star`, JSON.stringify(this._currentProduct))
            .then((response) => {
                const data = response.json();

                // change rating in productWindowTemplate and product table
                if (data.new_rating) {
                    // in window
                    this._currentProduct.rating = data.new_rating;
                    this._currentProduct.css = "clicked-rating-star";
                    this.defineWindowElements(this.getTemplate(this._currentProduct), this._currentProduct.name);
                    // in table
                    this.app.callEvent("changeRatingToProductTable", [this._currentProduct]);
                }

            })
            .catch(() => {
                webix.message("Server error :( Try later.");
            });
    }

    showWindow(product) {
        this._currentProduct = product;
        this.getRoot().show();
        this.defineWindowElements(this.getTemplate(product), product.name);
        // check clicked star for current user
        webix.ajax().post(`${serverUrl}check-star`, JSON.stringify(this._currentProduct))
            .then((response) => {
                const data = response.json();

                // change rating in productWindowTemplate and product table
                if (data.clicked) {
                    this._currentProduct.css = "clicked-rating-star";
                }

                this.defineWindowElements(this.getTemplate(this._currentProduct), this._currentProduct.name);
            })
            .catch(() => {
                webix.message("Server error :( Try later.");
            });
    }

    hideWindow() {
        this._currentProduct = null;
        this.defineWindowElements("", "");
        this.getRoot().hide();
    }

    defineWindowElements(bodyTpl, headTpl) {
        const productWindowBodyTemplate = this.$$("productWindowBodyTemplate");
        const productWindowHeadTpl = this.$$("productWindowHeadTpl");

        productWindowBodyTemplate.define("template", bodyTpl);
        productWindowHeadTpl.define("template", headTpl);
        productWindowBodyTemplate.refresh();
        productWindowHeadTpl.refresh();
    }

    getTemplate(product) {
        const defaultColorCss = "default-color-star";
        return `
            <div class="product-template-wrapp">
                <img src="${serverUrl}img/${product.image}" class="product-template-img">
                <div class="product-template-info-wrap">
                    <p class="product-template-name">Name: ${product.name}</p>
                    <p class="product-template-price">Price: ${product.price}</p>
                    <div class="product-template-rating-wrap">
                        <p class="product-template-rating">Rating: ${product.rating}</p>
                        <p class="product-template-rating-star star ${product.css || defaultColorCss}"><span class="webix_icon mdi mdi-star-half"></span></p>
                    </div>
                </div>
            </div>
        `;
    }
}
