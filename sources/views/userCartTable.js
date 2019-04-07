import { JetView } from "webix-jet";
import { serverUrl } from "models/serverUrl";

const datatable_config = {
    rowHeight: 100,
    col_width: {
        col_1: 120,
        col_3: 120,
        col_4: 80,
        col_5: 80,
        col_6: 50,
    },
};

const makeOrderBtn_size = {
    width: 200,
};

export default class UserCartTableView extends JetView {
    config() {
        return {
            rows: [
                {
                    view: "datatable",
                    localId: "userCartTable",
                    url: `${serverUrl}user/cart/products`,
                    rowHeight: datatable_config.rowHeight,
                    select: true,
                    footer: true,
                    scrollX: false,
                    css: "main-table",
                    columns: [
                        {
                            header: "Image",
                            footer: { text: "Total:", colspan: 3 },
                            template: (obj) => {
                                return `
                                    <div class="product-table-img-wrap">
                                        <img src="${serverUrl}img/${obj.image}" class="product-table-img">
                                    </div>
                                `;
                            },
                            css: "prod_image",
                            width: datatable_config.col_width.col_1,
                        },
                        { id: "name", header: "Name", fillspace: true },
                        { id: "count", header: "Amounth", width: datatable_config.col_width.col_3 },
                        { id: "price", header: "Price", width: datatable_config.col_width.col_4 },
                        { id: "sum", header: "Sum", width: datatable_config.col_width.col_5, footer: { content: "summColumn" } },
                        { header: "", template: "<span class='webix_icon wxi-trash trash'></span>", width: datatable_config.col_width.col_6, css: "buy-column" },
                    ],
                    onClick: {
                        "trash": (event, row) => {
                            this.deleteProductFromUserCart(row.row);
                            return false;
                        }
                    },
                    on: {
                        onAfterLoad: function () {
                            if (this.count()) {
                                this.$scope.$$("makeOrderBtn").enable();
                            }
                        },
                    },
                },
                {
                    cols: [
                        {
                            view: "button",
                            label: "Make order",
                            localId: "makeOrderBtn",
                            width: makeOrderBtn_size.width,
                            click: () => {
                                this.show("./makeOrderForm");
                            },
                        },
                        { view: "spacer" },
                    ],
                },
            ],
        };
    }

    /***************************************************************************************************************/
    init() {
        this.$$("makeOrderBtn").disable();
    }

    deleteProductFromUserCart(id) {
        webix.ajax().post(`${serverUrl}cart/delete`, JSON.stringify({ id: id }))
            .then((response) => {
                const data = response.json();
                const userCartTable = this.$$("userCartTable");
                this.app.callEvent("changeCartBtnLabel", [data.allCount]);
                userCartTable.remove(data.removeId);

                if (!userCartTable.count()) {
                    this.$$("makeOrderBtn").disable();
                }
            })
            .catch(() => {
                webix.message("Server error :( Try later.");
            });
    }
}
