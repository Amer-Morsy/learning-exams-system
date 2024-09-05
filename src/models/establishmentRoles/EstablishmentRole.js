import BaseEntityModel from "./../general/BaseEntityModel";
import Establishment from "./Establishment";
import defaultImg from "@/assets/images/establishmentRole.svg";

export default class EstablishmentRole extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue(userTypeToken = "") {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.establishmentRoleToken = "";
    this.authenticationLoginTypeToken = "";
    this.authenticationLoginTypeNameCurrent = "";
    this.codeInLoginTypeToken = "";
    this.codeInLoginTypeNameCurrent = "";
    this.establishmentRoleNameCurrent = "";
    this.establishmentRoleNameEn = "";
    this.establishmentRoleNameAr = "";
    this.establishmentRoleNameUnd = "";
    this.establishmentRoleDescriptionCurrent = "";
    this.establishmentRoleDescriptionAr = "";
    this.establishmentRoleDescriptionEn = "";
    this.establishmentRoleDescriptionUnd = "";
    this.establishmentRoleImagePath = "";
    this.establishmentRoleNotes = "";
    this.userTypeToken = userTypeToken ?? "";
    this.activationTypeToken = "";
    this.activationTypeNameCurrent = "";
    this.userTypeNameCurrent = "";
    this.userTypeNameAr = "";
    this.userTypeNameEn = "";
    this.userTypeNameUnd = "";
    this.establishmentRoleImageIsDefault = false;
    this.establishmentRoleImageSizeBytes = 0;
    this.establishmentRoleImageSizeTextCurrent = "";
    this.establishmentRoleImageSizeTextAr = "";
    this.establishmentRoleImageSizeTextEn = "";
    this.establishmentRoleImageSizeTextUnd = "";
    this.establishmentRoleDefaultStatus = false;
    this.establishmentToken = "";
    this.establishmentData = new Establishment();
    this.modulePrivilegeData = [];
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.establishmentRoleToken = data.establishmentRoleToken ?? "";
      this.authenticationLoginTypeToken =
        data.authenticationLoginTypeToken ?? "";
      this.authenticationLoginTypeNameCurrent =
        data.authenticationLoginTypeNameCurrent ?? "";
      this.codeInLoginTypeToken = data.codeInLoginTypeToken ?? "";
      this.codeInLoginTypeNameCurrent = data.codeInLoginTypeNameCurrent ?? "";
      this.establishmentRoleNameCurrent =
        data.establishmentRoleNameCurrent ?? "";
      this.establishmentRoleNameEn = data.establishmentRoleNameEn ?? "";
      this.establishmentRoleNameAr = data.establishmentRoleNameAr ?? "";
      this.establishmentRoleNameUnd = data.establishmentRoleNameUnd ?? "";
      this.establishmentRoleDescriptionCurrent =
        data.establishmentRoleDescriptionCurrent ?? "";
      this.establishmentRoleDescriptionAr =
        data.establishmentRoleDescriptionAr ?? "";
      this.establishmentRoleDescriptionEn =
        data.establishmentRoleDescriptionEn ?? "";
      this.establishmentRoleDescriptionUnd =
        data.establishmentRoleDescriptionUnd ?? "";
      this.establishmentRoleImagePath = data.establishmentRoleImagePath ?? "";
      this.establishmentRoleNotes = data.establishmentRoleNotes ?? "";
      this.userTypeToken = data.userTypeToken ?? "";
      this.activationTypeToken = data.activationTypeToken ?? "";
      this.activationTypeNameCurrent = data.activationTypeNameCurrent ?? "";
      this.userTypeNameCurrent = data.userTypeNameCurrent ?? "";
      this.userTypeNameAr = data.userTypeNameAr ?? "";
      this.userTypeNameEn = data.userTypeNameEn ?? "";
      this.userTypeNameUnd = data.userTypeNameUnd ?? "";
      this.establishmentRoleImageIsDefault =
        data.establishmentRoleImageIsDefault ?? false;
      this.establishmentRoleImageSizeBytes =
        data.establishmentRoleImageSizeBytes ?? 0;
      this.establishmentRoleImageSizeTextCurrent =
        data.establishmentRoleImageSizeTextCurrent ?? "";
      this.establishmentRoleImageSizeTextAr =
        data.establishmentRoleImageSizeTextAr ?? "";
      this.establishmentRoleImageSizeTextEn =
        data.establishmentRoleImageSizeTextEn ?? "";
      this.establishmentRoleImageSizeTextUnd =
        data.establishmentRoleImageSizeTextUnd ?? "";
      this.establishmentRoleDefaultStatus =
        data.establishmentRoleDefaultStatus ?? false;
      this.establishmentToken = data.establishmentToken ?? "";
      this.establishmentData.fillData(data.establishmentData);
      this.modulePrivilegeData = data.modulePrivilegeData ?? [];
    } else {
      this.setInitialValue();
    }
  }
}
