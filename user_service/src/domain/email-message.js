module.exports = class Email {
    constructor(object)
    {
        this.to = object.to;
        this.from = object.from;
        this.subject = object.subject;
        this.text = object.text;
        this.html = object.html; 
    }
}