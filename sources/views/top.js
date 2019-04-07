import { JetView } from "webix-jet";
import { serverUrl } from "models/serverUrl";

const toolbar_config = {
    height: 35,
    css: "toolbar",
};

const toolbar_template_config = {
    templateShopName: { css: "templateShopName", width: 100 },
    templateUserName: { css: "templateUserName" },
};

const toolbar_btn_config = {
    bagBtn: { width: 100 },
    adminBtn: { width: 100 },
    historyBtn: { width: 100 },
    LogoutBtn: { width: 100 },
};

const tree_size = {
    width: 200,
};

const adminMenu_size = {
    width: 200,
};

export default class TopView extends JetView {
    config() {
        const tree = {
            view: "tree",
            localId: "categTree",
            width: tree_size.width,
            select: true,
            template: "{common.icon()} {common.folder()} <span>#name#<span>",
            url: `${serverUrl}tree`,
            on: {
                onItemClick: (id) => {
                    this.getFilteredData(id);
                }
            }
        };

        const adminMenu = {
            localId: "adminMenu",
            view: "menu",
            layout: "y",
            width: adminMenu_size.width,
            select: true,
            data: [
                { id: 1, value: "Clients info", view: "./usersTable" },
                { id: 2, value: "Orders", view: "./usersOrders" },
                { id: 3, value: "Add new product", view: "./addProductForm" }
            ],
            on: {
                onItemClick: (id) => {
                    const view = this.$$("adminMenu").getItem(id).view;
                    this.show(view);
                }
            },
        };

        return {
            rows: [
                {
                    cols: [
                        {
                            template: "<span class='logo-template'>XB shop</span>",
                            borderless: true,
                            css: toolbar_template_config.templateShopName.css,
                            width: toolbar_template_config.templateShopName.width,
                            onClick: {
                                "logo-template": () => {
                                    this.clickLogo();
                                }
                            }
                        },
                        {
                            template: "Hi, no-name",
                            localId: "userNameTemplate",
                            borderless: true,
                            css: toolbar_template_config.templateUserName.css,
                        },
                        {
                            view: "button",
                            label: "Admin",
                            localId: "adminButton",
                            css: "adminBtn",
                            width: toolbar_btn_config.adminBtn.width,
                            click: () => {
                                this.$$("categTree").hide();
                                this.$$("adminMenu").show();
                            }
                        },
                        {
                            view: "button",
                            label: "Logout",
                            width: toolbar_btn_config.bagBtn.width,
                            click: () => {
                                webix.ajax().get(`${serverUrl}logout`)
                                    .then(() => {
                                        window.location.reload(true);
                                    })
                                    .catch(() => {
                                        webix.message("Server error :( Try later.");
                                    });
                            }
                        },
                        {
                            view: "button",
                            label: "History",
                            width: toolbar_btn_config.historyBtn.width,
                            click: () => {
                                this.show("./orderHistoryTable");
                            },
                        },
                        {
                            view: "button",
                            localId: "cartBtn",
                            label: "Bag",
                            width: toolbar_btn_config.LogoutBtn.width,
                            click: () => {
                                this.show("./userCartTable");
                            }
                        },
                    ],
                    height: toolbar_config.height,
                    css: toolbar_config.css,
                },
                {
                    localId: "layout",
                    cols: [
                        {
                            rows: [
                                tree,
                                adminMenu
                            ],
                        },
                        { $subview: true },
                    ],
                },
            ],
        };
    }

    /****************************************************************************************************/
    init() {
        const adminBtn = this.$$("adminButton");
        adminBtn.disable();
        adminBtn.hide();
        webix.ajax().get(`${serverUrl}role`)
            .then((response) => {

                if (response.json() === "admin") {
                    adminBtn.show();
                    adminBtn.enable();
                }

            })
            .catch(() => {
                webix.message("Server error");
            });

        this.$$("adminMenu").hide();

        this.on(this.app, "changeCartBtnLabel", (count) => {
            this.$$("cartBtn").define("label", `Bag(${count})`);
            this.$$("cartBtn").refresh();
        });

        this.getCountProductInCart();
        this.getUserName();
    }

    clickLogo() {
        const adminMenu = this.$$("adminMenu");
        adminMenu.unselectAll();
        const tree = this.$$("categTree");
        tree.show();
        adminMenu.hide();
        this.show("./productTable");
        this.app.callEvent("refreshProductTableView");
        tree.unselectAll();
        tree.closeAll();
        tree.clearAll();
        tree.load(`${serverUrl}tree`);
    }

    getUserName() {
        webix.ajax().get(`${serverUrl}username`)
            .then((response) => {
                const userName = response.json();
                // define userNAme Template
                this.$$("userNameTemplate").define("template", `Hi, ${userName}`);
                this.$$("userNameTemplate").refresh();
            })
            .catch(() => {
                webix.message("Failed to get username");
            });
    }

    getCountProductInCart() {
        webix.ajax().get(`${serverUrl}cart/count`)
            .then((response) => {
                const productCount = response.json().count;
                // define cartBtn label
                this.$$("cartBtn").define("label", `Bag(${productCount})`);
                this.$$("cartBtn").refresh();
            })
            .catch(() => {
                webix.message("Server error :( Try later.");
            });
    }

    getFilteredData(id) {
        webix.ajax().post(`${serverUrl}products/part`, JSON.stringify({ id: id }))
            .then((response) => {
                this.app.callEvent("filterMainProductTable", [response.text()]);
            })
            .catch(() => {
                webix.message("Server error :( Try later.");
            });
    }
}
