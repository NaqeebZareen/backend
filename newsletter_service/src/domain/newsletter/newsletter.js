module.exports = class Newsletter {
    constructor(emails,object) {
        this.to = emails;
        this.from = 'Support@youcan.tech';
        this.name='YouCan'
        this.subject='Newsletter From Youcan';
        this.html = object.newsletterHtml;
    }
}