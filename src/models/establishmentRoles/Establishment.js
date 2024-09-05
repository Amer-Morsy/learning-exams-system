export default class Establishment {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.establishmentToken = "";
    this.dailyCode = "";
    this.fullCode = "";
    this.establishmentNameCurrent = "";
    this.establishmentNameEn = "";
    this.establishmentNameAr = "";
    this.establishmentNameUnd = "";
    this.establishmentDescriptionCurrent = "";
    this.establishmentDescriptionEn = "";
    this.establishmentDescriptionAr = "";
    this.establishmentDescriptionUnd = "";
    this.establishmentImagePath = "";
    this.establishmentNotes = "";
    this.establishmentDisableStatus = false;
    this.establishmentArchiveStatus = false;
  }
  fillData(data) {
    if (data) {
      this.establishmentToken = data.establishmentToken;
      this.dailyCode = data.dailyCode;
      this.fullCode = data.fullCode;
      this.establishmentNameCurrent = data.establishmentNameCurrent;
      this.establishmentNameEn = data.establishmentNameEn;
      this.establishmentNameAr = data.establishmentNameAr;
      this.establishmentNameUnd = data.establishmentNameUnd;
      this.establishmentDescriptionCurrent =
        data.establishmentDescriptionCurrent;
      this.establishmentDescriptionEn = data.establishmentDescriptionEn;
      this.establishmentDescriptionAr = data.establishmentDescriptionAr;
      this.establishmentDescriptionUnd = data.establishmentDescriptionUnd;
      this.establishmentImagePath = data.establishmentImagePath;
      this.establishmentNotes = data.establishmentNotes;
      this.establishmentDisableStatus = data.establishmentDisableStatus;
      this.establishmentArchiveStatus = data.establishmentArchiveStatus;
    } else {
      this.setInitialValue();
    }
  }
}
