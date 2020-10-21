const { News, SearchNewsById, SearchNews } = require('../../domain/news')
const newsRepository = require('../../infrastructure/repositories/news')


module.exports = class UserController {

    async findNewsById(filterObject) {
        // let newsSearchEntity = new SearchNewsById(newsIdObject);
        let offset = Math.floor(Math.random() * 250);
        let data = await newsRepository.searchDetailedNews(filterObject.newsId, filterObject.userId, offset);
        console.log('similar news with data=>>>', data);
        return data;
        // return { userData, userDetailData }
    }

    async filterNewsByIds(arr) {
        return await newsRepository.searchNewsByIdArray(arr.newsIdArray);
    }

    async filterNews(filterObject) {
        let userSearchEntity = new SearchNews(filterObject);
        let data = await newsRepository.searchNews(userSearchEntity, filterObject.limit, filterObject.offset);
        return data;
    }

    async upVoteNews(arr) {
        let data = null;
        let userVoteData = await newsRepository.getUserVote(arr.newsId, arr.userId);
        if (!userVoteData) {
            newsRepository.addUserVote(arr.newsId, arr.userId, true, false, false);
            data = await newsRepository.upVoteNews(arr.newsId);
        }
        else {
            if (userVoteData.positive_voted)
                throw new Error(`User has Already Up Voted the News with ID ${arr.newsId}`);
            else newsRepository.updateUserVote(arr.newsId, arr.userId, true, false, false);
            if (userVoteData.negative_voted)
                newsRepository.updateVotes(arr.newsId, false, true, false);
            if (userVoteData.unsure)
                newsRepository.updateVotes(arr.newsId, false, false, true);
            data = await newsRepository.upVoteNews(arr.newsId);
        }
        data.up_voted = true;
        return data;
    }

    async downVoteNews(arr) {
        let data = null;
        let userVoteData = await newsRepository.getUserVote(arr.newsId, arr.userId);
        console.log(userVoteData);
        if (!userVoteData) {
            newsRepository.addUserVote(arr.newsId, arr.userId, false, true, false);
            data = await newsRepository.downVoteNews(arr.newsId);
        }
        else {
            if (userVoteData.negative_voted)
                throw new Error(`User has Already Down Voted the News with ID ${arr.newsId}`);
            else newsRepository.updateUserVote(arr.newsId, arr.userId, false, true, false);
            if (userVoteData.positive_voted)
                newsRepository.updateVotes(arr.newsId, true, false, false);
            if (userVoteData.unsure)
                newsRepository.updateVotes(arr.newsId, false, false, true);
            data = await newsRepository.downVoteNews(arr.newsId);
        }
        data.down_voted = true;
        return data;
    }

    async removeUpVoteFromNews(arr) {
        let data = {};
        let userVoteData = await newsRepository.getUserVote(arr.newsId, arr.userId);
        console.log(userVoteData);
        if (!userVoteData)
            throw new Error(`No record to found to remove the Up vote`);
        else if (userVoteData.positive_voted)
            data = await newsRepository.removeUpVoteFromNews(arr.newsId, arr.userId);
        else throw new Error(`User didn't have any positive votes for news ${arr.newsId}`);
        return data;
    }

    async removeDownVoteFromNews(arr) {
        let data = {};
        let userVoteData = await newsRepository.getUserVote(arr.newsId, arr.userId);
        console.log(userVoteData);
        if (!userVoteData)
            throw new Error(`No record to found to remove the Down vote`);
        else if (userVoteData.negative_voted)
            data = await newsRepository.removeDownVoteFromNews(arr.newsId, arr.userId);
        else throw new Error(`User didn't have any negative votes for news ${arr.newsId}`);
        return data;
    }

    async unsureVoteNews(arr) {
        let data = null;
        let userVoteData = await newsRepository.getUserVote(arr.newsId, arr.userId);
        if (!userVoteData) {
            newsRepository.addUserVote(arr.newsId, arr.userId, false, false, true);
            data = await newsRepository.unsureVoteNews(arr.newsId);
        }
        else {
            if (userVoteData.unsure)
                throw new Error(`User has Already unsure Voted the News with ID ${arr.newsId}`);
            else newsRepository.updateUserVote(arr.newsId, arr.userId, false, false, true);
            if (userVoteData.positive_voted)
                newsRepository.updateVotes(arr.newsId, true, false, false);
            if (userVoteData.negative_voted)
                newsRepository.updateVotes(arr.newsId, false, true, false);
            data = await newsRepository.unsureVoteNews(arr.newsId);
        }
        data.unsure_voted = true;
        return data;
    }

    async removeUnsureVoteFromNews(arr) {
        let data = {};
        let userVoteData = await newsRepository.getUserVote(arr.newsId, arr.userId);
        console.log(userVoteData);
        if (!userVoteData)
            throw new Error(`No record to found to remove the unsure vote`);
        else if (userVoteData.unsure)
            data = await newsRepository.removeUnsureVoteFromNews(arr.newsId, arr.userId);
        else throw new Error(`User didn't have any unsure votes for news ${arr.newsId}`);
        return data;
    }
}