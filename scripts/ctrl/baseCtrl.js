import { PopupManager } from "../utils/popupManager.js";

export class BaseCtrl {
  constructor() {
    this.popupManager = PopupManager;
  }

  showPopup(popupId) {
    this.popupManager.showPopup(popupId);
  }

  hidePopup(popupId) {
    this.popupManager.hidePopup(popupId);
  }

  attachPopupEvents(popupId, closeButtonId) {
    this.popupManager.attachCloseEvent(popupId, closeButtonId);
  }
}