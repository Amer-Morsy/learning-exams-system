export default class UserStoragesSetting {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.haveMaxCountDirectories = false;
    this.maxCountDirectories = 0;
    this.nowCountDirectories = 0;
    this.usedDirectoriesPercentage = 0;
    this.usedDirectoriesPercentageText = "";
    this.haveMaxCountMediaFiles = false;
    this.maxCountMediaFiles = 0;
    this.nowCountMediaFiles = 0;
    this.usedMediaFilesPercentage = 0;
    this.usedMediaFilesPercentageText = "";
    this.haveMaxCountMediaLinks = false;
    this.maxCountMediaLinks = 0;
    this.nowCountMediaLinks = 0;
    this.usedMediaLinksPercentage = 0;
    this.usedMediaLinksPercentageText = "";
    this.haveMaxUserStorageSpaceSize = false;
    this.maxUserStorageSpaceSizeGB = 0;
    this.maxUserStorageSpaceSizeTextCurrent = "";
    this.nowUserStorageSpaceSizeGB = 0;
    this.nowUserStorageSpaceSizeTextCurrent = "";
    this.maxUserStorageSpaceSizePercentage = 0;
    this.maxUserStorageSpaceSizePercentageText = "";
  }
  fillData(data) {
    if (data) {
      this.haveMaxCountDirectories = data.haveMaxCountDirectories ?? false;
      this.maxCountDirectories = data.maxCountDirectories ?? 0;
      this.nowCountDirectories = data.nowCountDirectories ?? 0;
      this.usedDirectoriesPercentage = data.usedDirectoriesPercentage ?? 0;
      this.usedDirectoriesPercentageText =
        data.usedDirectoriesPercentageText ?? "";
      this.haveMaxCountMediaFiles = data.haveMaxCountMediaFiles ?? false;
      this.maxCountMediaFiles = data.maxCountMediaFiles ?? 0;
      this.nowCountMediaFiles = data.nowCountMediaFiles ?? 0;
      this.usedMediaFilesPercentage = data.usedMediaFilesPercentage ?? 0;
      this.usedMediaFilesPercentageText =
        data.usedMediaFilesPercentageText ?? "";
      this.haveMaxCountMediaLinks = data.haveMaxCountMediaLinks ?? false;
      this.maxCountMediaLinks = data.maxCountMediaLinks ?? 0;
      this.nowCountMediaLinks = data.nowCountMediaLinks ?? 0;
      this.usedMediaLinksPercentage = data.usedMediaLinksPercentage ?? 0;
      this.usedMediaLinksPercentageText =
        data.usedMediaLinksPercentageText ?? "";
      this.haveMaxUserStorageSpaceSize =
        data.haveMaxUserStorageSpaceSize ?? false;
      this.maxUserStorageSpaceSizeGB = data.maxUserStorageSpaceSizeGB ?? 0;
      this.maxUserStorageSpaceSizeTextCurrent =
        data.maxUserStorageSpaceSizeTextCurrent ?? "";
      this.nowUserStorageSpaceSizeGB = data.nowUserStorageSpaceSizeGB ?? 0;
      this.nowUserStorageSpaceSizeTextCurrent =
        data.nowUserStorageSpaceSizeTextCurrent ?? "";
      this.maxUserStorageSpaceSizePercentage =
        data.maxUserStorageSpaceSizePercentage ?? 0;
      this.maxUserStorageSpaceSizePercentageText =
        data.maxUserStorageSpaceSizePercentageText ?? "";
    } else {
      this.setInitialValue();
    }
  }
}
