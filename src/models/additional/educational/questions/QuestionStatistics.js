export default class QuestionStatistics {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalTrueFlaseQuestionCount = 0;
    this.totalTrueFlaseQuestionPercentage = 0;
    this.totalTrueFlaseQuestionPercentageText = "";
    this.totalMCQQuestionCount = 0;
    this.totalMCQQuestionPercentage = 0;
    this.totalMCQQuestionPercentageText = "";
    this.totalArrivedQuestionCount = 0;
    this.totalArrivedQuestionPercentage = 0;
    this.totalArrivedQuestionPercentageText = "";
    this.totalSortQuestionCount = 0;
    this.totalSortQuestionPercentage = 0;
    this.totalSortQuestionPercentageText = "";
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
      this.totalTrueFlaseQuestionCount = data.totalTrueFlaseQuestionCount ?? 0;
      this.totalTrueFlaseQuestionPercentage =
        data.totalTrueFlaseQuestionPercentage ?? 0;
      this.totalTrueFlaseQuestionPercentageText =
        data.totalTrueFlaseQuestionPercentageText ?? "";
      this.totalMCQQuestionCount = data.totalMCQQuestionCount ?? 0;
      this.totalMCQQuestionPercentage = data.totalMCQQuestionPercentage ?? 0;
      this.totalMCQQuestionPercentageText =
        data.totalMCQQuestionPercentageText ?? "";
      this.totalArrivedQuestionCount = data.totalArrivedQuestionCount ?? 0;
      this.totalArrivedQuestionPercentage =
        data.totalArrivedQuestionPercentage ?? 0;
      this.totalArrivedQuestionPercentageText =
        data.totalArrivedQuestionPercentageText ?? "";
      this.totalSortQuestionCount = data.totalSortQuestionCount ?? 0;
      this.totalSortQuestionPercentage = data.totalSortQuestionPercentage ?? 0;
      this.totalSortQuestionPercentageText =
        data.totalSortQuestionPercentageText ?? "";
      this.totalCount = data.totalCount ?? 0;
      this.totalActiveCount = data.totalActiveCount ?? 0;
      this.totalBlockedCount = data.totalBlockedCount ?? 0;
      this.totalActivePercentage = data.totalActivePercentage ?? 0;
      this.totalActivePercentageText = data.totalActivePercentageText ?? "";
      this.totalBlockedPercentage = data.totalBlockedPercentage ?? 0;
      this.totalBlockedPercentageText = data.totalBlockedPercentageText ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
