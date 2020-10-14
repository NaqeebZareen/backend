const { Subscription } = require('../../domain/newsletter')
const { subscribersRepo } = require('../../infrastructure/repositories')


module.exports = class SubscriptionController {

    async addNewSubscriber(arr) {
        let newsletterEntity = new Subscription(arr);
        subscribersRepo.addNewSubscriber(newsletterEntity)
            .then(data => console.log(data))
            .catch(err => console.log(err));
        return newsletterEntity;
    }

    async removeSubscriber(arr) {
        subscribersRepo.removeSubscriber(arr.email)
            .then(data => console.log(data))
            .catch(err => console.log(err));
        return arr.email;
    }

    async getSubscriberList() {
        return await subscribersRepo.getSubscribers()
            .catch(err => console.log(err));
    }
}