function injectUserBookmarks(dataArray, bookmarksArray) {
    if (dataArray && bookmarksArray) {
        let bookmarkedNews = bookmarksArray.news;
        if (bookmarkedNews.length > 0) {
            dataArray.map(obj => {
                if (bookmarkedNews.includes(obj.id))
                    obj.is_bookmarked = true;
            })
        }
    }
    return dataArray;
}

function injectUserBookmarksInDetailAndSimilar(dataObject, bookmarksArray) {
    console.log(`inside injecting with data object=> `,dataObject,bookmarksArray);
    if (dataObject && bookmarksArray) {
        let bookmarkedNews = bookmarksArray.news;
        if (bookmarkedNews.includes(dataObject.id))
            dataObject.is_bookmarked = true;
    }
    console.log(`returning from injecting with data object=> `,dataObject);
    return dataObject;
}

function addPaginationToRespons(dataArray, dataProperty, pageNo) {
    let paginatedData = {};
    paginatedData[dataProperty] = dataArray;
    paginatedData.no_of_records = dataArray.length;
    paginatedData.page_no = pageNo;
    return { Ok: paginatedData };
}

module.exports = {
    injectUserBookmarks,
    injectUserBookmarksInDetailAndSimilar,
    addPaginationToRespons
}