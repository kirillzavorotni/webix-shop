import { JetView } from "webix-jet";
import declineReasonWindow from "views/declineReasonWindow";
import { serverUrl } from "models/serverUrl";

const datatable_size = {
    rowHeight: 60,
    rows_size: {
        col_2: 90,
        col_3: 100,
        col_4: 100,
        col_5: 100,
        col_6: 200,
        col_7: 100,
    },
};

export default class OrderHistoryTableView extends JetView {
    config() {
        return {
            view: "datatable",
            localId: "userCartTable",
            select: true,
            url: `${serverUrl}user/order`,
            rowHeight: datatable_size.rowHeight,
            columns: [
                { id: "name", header: ["Product", { content: "textFilter" }], fillspace: true },
                { id: "count", header: "Amounth", width: datatable_size.rows_size.col_2 },
                { id: "address", header: "Address", width: datatable_size.rows_size.col_3 },
                { id: "delivery_id", header: "Delivery", width: datatable_size.rows_size.col_4, collection: `${serverUrl}delivery-type` },
                { id: "payment_id", header: "Payment", width: datatable_size.rows_size.col_5, collection: `${serverUrl}payment-type` },
                { id: "order_date", header: "Order date", width: datatable_size.rows_size.col_6 },
                { id: "status_id", header: "Status", width: datatable_size.rows_size.col_7, collection: `${serverUrl}status-type` },
            ],
            on: {
                onItemClick: (id) => {
                    this.itemClick(id);
                },
            },
        };
    }

    /***************************************************************************************************************/
    init() {
        this.declineReasonWindow = this.ui(declineReasonWindow);
    }

    itemClick(id) {
        const product = this.$$("userCartTable").getItem(id);
        if (id.column === "status_id" && product.status_id == 2) {
            const declineReason = product.decline_reason;
            this.declineReasonWindow.showWindow(declineReason);
        }
    }
}
