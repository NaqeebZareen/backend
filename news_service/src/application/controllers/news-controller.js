const { News, SearchNewsById, SearchNews } = require('../../domain/news')
const newsRepository = require('../../infrastructure/repositories/news')


module.exports = class UserController {

    async findNewsById(newsIdObject) {
        // let newsSearchEntity = new SearchNewsById(newsIdObject);
        let offset=Math.floor(Math.random() * 250); 
        let data= await newsRepository.searchDetailedNews(newsIdObject.newsId,offset);
        console.log('similar news with data=>>>',data);
        return data;
        // return { userData, userDetailData }
    }

    async filterNewsByIds(arr) {
        return await newsRepository.searchNewsByIdArray(arr.newsIdArray);
    }

    async filterNews(filterObject) {
        let userSearchEntity = new SearchNews(filterObject);
        let data=await newsRepository.searchNews(userSearchEntity,filterObject.limit,filterObject.offset,);
        data.no_of_news=data.length;
        console.log('data from db id =?????',data);
        return data;
    }
}