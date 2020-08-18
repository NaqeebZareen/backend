const crudRepository = require('../../infrastructure/repositories/simple_crud');
const SearchDeviceByOwner = require('../../domain/device/search_device_by_owner');
const FindDevice = require('../../domain/device/search_device');
const UserDeviceEntity = require('../../domain/device/user_device');

const DEVICE_COLLECTION = 'user_devices';

module.exports = class DeviceController {

    async create(deviceEntityObj) {
        let deviceEntity = new UserDeviceEntity(deviceEntityObj);
        let data = await crudRepository(DEVICE_COLLECTION).create(deviceEntity);
        return data;
    }

    createAndUpdateUser(deviceEntityObj) {
        return new Promise((resolve, reject) => {
            this.findDevice({ deviceId: deviceEntityObj.deviceId }).then(findData => {
                if (findData) {
                    this.updateDevice({ deviceId: deviceEntity.deviceId }, { currentUser: deviceEntity.currentUser })
                        .then(data => resolve(data))
                        .catch(err => reject(err));
                }
                else {
                    crudRepository(DEVICE_COLLECTION).create(deviceEntity)
                        .then(data => resolve(data))
                        .catch(err => reject(err));
                }
            }).catch(err => reject(err));
        })
    }

    findUserDeviceByEmail(ownerEmail) {
        return new Promise((resolve, reject) => {
            let deviceSearchEntity = new SearchDeviceByOwner(ownerEmail);
            crudRepository(DEVICE_COLLECTION).findOne(deviceSearchEntity)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    findDevice(device_id) {
        return new Promise((resolve, reject) => {
            let deviceSearchEntity = new FindDevice(device_id);
            crudRepository(DEVICE_COLLECTION).findOne(deviceSearchEntity)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    updateDevice(deviceId, arr) {
        return new Promise((resolve, reject) => {
            let deviceSearchEntity = new FindDevice(deviceId);
            crudRepository(DEVICE_COLLECTION).update(deviceSearchEntity, arr)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    getAllDevices() {
        return new Promise((resolve, reject) => {
            crudRepository(DEVICE_COLLECTION).findAll()
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
}