export class PopupManager {
  static showPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.classList.add("active");
    }
  }

  static hidePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.classList.remove("active");
    }
  }

  static attachCloseEvent(popupId, closeButtonId) {
    const closeButton = document.getElementById(closeButtonId);
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        this.hidePopup(popupId);
      });
    }
  }
}