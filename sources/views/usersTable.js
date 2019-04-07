import { JetView } from "webix-jet";
import userWindow from "views/userEditWindow";
import { serverUrl } from "models/serverUrl";

const datatable_config = {
	rowHeight: 80,
	col_width: {
		col_1: 40,
		col_2: 250,
		col_4: 250,
	},
};

export default class UserTableView extends JetView {
	config() {
		return {
			view: "datatable",
			localId: "userTable",
			url: `${serverUrl}user`,
			rowHeight: datatable_config.rowHeight,
			select: true,
			css: "main-table",
			columns: [
				{ id: "id", header: "#", width: datatable_config.col_width.col_1 },
				{ id: "name", header: ["Name", { content: "textFilter" }], width: datatable_config.col_width.col_2 },
				{ id: "email", header: ["Email", { content: "textFilter" }], fillspace: true, },
				{ id: "created_at", header: "Created at", width: datatable_config.col_width.col_4, }
			],
			on: {
				onItemDblClick: (id) => {
					const user = this.$$("userTable").getItem(id);
					this.userWindow.showWindow(user);
				},
			},
		};
	}

	/***************************************************************************************************************/
	init() {
		this.userWindow = this.ui(userWindow);

		this.on(this.app, "editUesrInUserTable", (data) => {
			this.$$("userTable").updateItem(data.id, data);
		});
	}
}
