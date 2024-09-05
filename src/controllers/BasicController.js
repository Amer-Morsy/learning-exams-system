// import store from "@/store";

export default class BasicController {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.propertry = null;
  }

  fillData(data) {
    if (data) {
      this.propertry = data.propertry;
    } else {
      this.setInitialValue();
    }
  }
}
