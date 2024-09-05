import GeneralDelete from "./../../general/GeneralDelete";

export default class EstablishmentRoleDelete extends GeneralDelete {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.userTypeToken = "";
  }
  fillData(data) {
    this.fillGeneralDeleteData(data);
    this.userTypeToken = data.userTypeToken || "";
  }
}
