import { JetView } from "webix-jet";
import prodWindow from "views/productWindow";
import { serverUrl } from "models/serverUrl";

const datatable_config = {
    rowHeight: 100,
    col_width: {
        col_1: 110,
        col_3: 100,
        col_4: 100,
        col_5: 150,
        col_6: 80,
    },
};

const counter_width = {
    width: 120,
};

export default class ProductTableView extends JetView {
    config() {

        webix.protoUI({
            name: "activeTable"
        }, webix.ui.datatable, webix.ActiveContent);

        return {
            view: "activeTable",
            localId: "mainProductTable",
            url: `${serverUrl}products`,
            rowHeight: datatable_config.rowHeight,
            css: "main-table",
            activeContent: {
                counter: {
                    view: "counter",
                    width: counter_width.width,
                }
            },
            columns: [
                {
                    header: "Image",
                    template: (obj) => {
                        return `
                            <div class="product-table-img-wrap">
                                <img src="${serverUrl}img/${obj.image}" class="product-table-img">
                            </div>
                        `;
                    },
                    width: datatable_config.col_width.col_1,
                    css: "prod_image",
                },
                { id: "name", header: ["Name", { content: "textFilter" }], fillspace: true },
                { id: "price", header: "Price", width: datatable_config.col_width.col_3 },
                { id: "rating", header: "Rating", width: datatable_config.col_width.col_4 },
                { id: "amounth", header: "Amounth", template: "{common.counter()}", width: datatable_config.col_width.col_5, css: "counter-column" },
                { header: "Buy", template: "<span class='webix_icon mdi mdi-cart cart'></span>", width: datatable_config.col_width.col_6, css: "buy-column" },
            ],
            onClick: {
                "cart": (event, row) => {
                    this.addProductToCart(row.row);
                    return false;
                }
            },
            on: {
                onItemDblClick: (id) => {
                    this.showProductWindow(id);
                }
            },
        };
    }

    /***************************************************************************************************************/
    init() {
        this.on(this.app, "filterMainProductTable", (data) => {
            const mainTable = this.$$("mainProductTable");
            mainTable.clearAll();
            mainTable.parse(data);
        });

        this.on(this.app, "refreshProductTableView", () => {
            const productTable = this.$$("mainProductTable");
            productTable.clearAll();
            productTable.load(`${serverUrl}products`);
        });

        this.on(this.app, "changeRatingToProductTable", (newData) => {
            const mainTable = this.$$("mainProductTable");
            mainTable.updateItem(newData.id, newData);
        });

        this.productWindow = this.ui(prodWindow);
    }

    showProductWindow(id) {
        const product = this.$$("mainProductTable").getItem(id);
        this.productWindow.showWindow(product);
    }

    addProductToCart(id) {
        const product = this.$$("mainProductTable").getItem(id);

        if (product.counter) {
            webix.ajax().post(`${serverUrl}cart`, JSON.stringify({ id: id, count: product.counter, name: product.name }))
                .then((response) => {
                    const data = response.json();
                    this.app.callEvent("changeCartBtnLabel", [data.allCount]);
                    webix.message(`${data.product_count} ${data.product_name} added to your bag`);
                })
                .catch(() => {
                    webix.message("Server error :( Try later.");
                });
        } else {
            webix.message("Please, choose product count");
        }

    }
}
