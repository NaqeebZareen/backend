module.exports = class UserDevice {
  constructor(object) {
    (() => {
      if (object.deviceName)
        this.deviceName = object.deviceName.toUpperCase();
      this.deviceType = object.deviceType.toUpperCase();
      this.deviceId = object.deviceId.toUpperCase();
      this.deviceStatus = 'ACTIVE';
      this.userId = object.userId;
    })();

  }
}