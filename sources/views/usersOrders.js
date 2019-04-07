import { JetView } from "webix-jet";
import changeOrderStatusWindow from "views/orderStatusWindow";
import { serverUrl } from "models/serverUrl";

const userOrderTable_config = {
    rowHeight: 60,
    col_width: {
        col_1: 40,
        col_3: 85,
        col_4: 100,
        col_5: 150,
        col_6: 120,
        col_7: 100,
        col_8: 70,
        col_9: 75,
        col_10: 160,
        col_11: 90,
    },
};

export default class UsersOrdersTableView extends JetView {
    config() {
        return {
            view: "datatable",
            localId: "usersOrders",
            select: true,
            url: `${serverUrl}order/all`,
            rowHeight: userOrderTable_config.rowHeight,
            columns: [
                { id: "id", header: "#", width: userOrderTable_config.col_width.col_1 },
                { id: "name", header: ["Product", { content: "textFilter" }], fillspace: true },
                { id: "count", header: "Amounth", width: userOrderTable_config.col_width.col_3 },
                { id: "buyer_name", header: ["Buyer name", { content: "textFilter" }], width: userOrderTable_config.col_width.col_4 },
                { id: "email", header: "Buyer email", width: userOrderTable_config.col_width.col_5 },
                { id: "phone", header: "Phone", width: userOrderTable_config.col_width.col_6 },
                { id: "address", header: "Address", width: userOrderTable_config.col_width.col_7 },
                { id: "delivery_id", header: "Delivery", collection: `${serverUrl}delivery-type`, width: userOrderTable_config.col_width.col_8 },
                { id: "payment_id", header: "Payment", collection: `${serverUrl}payment-type`, width: userOrderTable_config.col_width.col_9 },
                { id: "order_date", header: "Order date", width: userOrderTable_config.col_width.col_10 },
                { id: "status_id", header: "Status", collection: `${serverUrl}status-type`, width: userOrderTable_config.col_width.col_11 },
            ],
            on: {
                onItemDblClick: (id) => {
                    const order = this.$$("usersOrders").getItem(id);
                    this.changeOrderStatusWindow.showWindow(order);
                },
            },
        };
    }

    /***************************************************************************************************************/
    init() {
        this.on(this.app, "editOrderInOrderTable", (data) => {
            const orderTable = this.$$("usersOrders");
            orderTable.updateItem(data.id, data);
        });

        this.changeOrderStatusWindow = this.ui(changeOrderStatusWindow);
    }
}
