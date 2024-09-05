export default class BaseFilterReport {
  constructor() {
    this.setInitialValueBaseFilterReport();
  }
  setInitialValueBaseFilterReport() {
    // comman
    this.systemComponentHierarchyToken = "";
    this.systemComponentToken = "";
    this.educationalCategoryToken = "";
    this.sendTo = "";
    this.textSearch = "";
    this.dateTimeFromStartSearch = "";
    this.dateTimeFromEndSearch = "";
    this.dateTimeToStartSearch = "";
    this.dateTimeToEndSearch = "";
    // this.sortTokens = [];
  }
  fillDataBaseFilterReport(data) {
    if (data) {
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.systemComponentHierarchyToken =
        data.systemComponentHierarchyToken ?? "";
      this.systemComponentToken = data.systemComponentToken ?? "";
      this.sendTo = data.sendTo ?? "";
      this.textSearch = data.textSearch ?? "";
      this.dateTimeFromStartSearch = data.dateTimeFromStartSearch ?? "";
      this.dateTimeFromEndSearch = data.dateTimeFromEndSearch ?? "";
      this.dateTimeToStartSearch = data.dateTimeToStartSearch ?? "";
      this.dateTimeToEndSearch = data.dateTimeToEndSearch ?? "";
    } else {
      this.setInitialValueBaseFilterReport();
    }
  }
}
