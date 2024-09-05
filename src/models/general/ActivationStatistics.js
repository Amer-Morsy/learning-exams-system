export default class ActivationStatistics {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCount = 0;
    this.totalActiveCount = 0;
    this.totalBlockedCount = 0;
    this.totalActivePercentage = 0;
    this.totalActivePercentageText = "";
    this.totalBlockedPercentage = 0;
    this.totalBlockedPercentageText = "";
  }
  fillData(data) {
    if (data) {
      this.totalCount = data.totalCount || 0;
      this.totalActiveCount = data.totalActiveCount || 0;
      this.totalBlockedCount = data.totalBlockedCount || 0;
      this.totalActivePercentage = data.totalActivePercentage || 0;
      this.totalActivePercentageText = data.totalActivePercentageText || "";
      this.totalBlockedPercentage = data.totalBlockedPercentage || 0;
      this.totalBlockedPercentageText = data.totalBlockedPercentageText || "";
    } else {
      this.setInitialValue();
    }
  }
}
