const sendgridMail = require('@sendgrid/mail')
const AnalytisController = require('./src/application/controllers/analytics');
const config = require('./config');

let analytics = new AnalytisController();
sendgridMail.setApiKey(config.SENDGRID_API_KEY);

var date = new Date()
date.setDate(new Date().getDate() - 1);
date.setHours(12, 00, 00);

(async function callFunction() {
    console.log('called');
    let data = await analytics.getAnalyticsReport();
    let email = {
        to: [{email: 'faizan.ali@youcan.tech', name:'Faizan Ali'},{email: 'hassan.ali@youcan.tech', name:'Hassan Ali'}],
        from: 'Support@youcan.tech',
        subject: `Daily Analytics Report --- ${new Date().toDateString()}`,
        html: `<table cellspacing="0" cellpadding="0" border="0">
        <tr>
          <th text="bold" width="150">News Analytics</th>
        </tr>
        <tr>
          <td width="350">Total News</td>
          <td width="150">${data[0].total_news}</td>
        </tr>
        <tr>
          <td width="350">News Added Today</td>
          <td width="150">${data[1].news_added_today}</td>
        </tr>
        <tr>
          <th text="bold" width="150">Activities Analytics</th>
        </tr>
        <tr>
          <td width="350">Total Activities</td>
          <td width="150">${data[2].total_activities}</td>
        </tr>
        <tr>
          <td width="350">Acive Activities</td>
          <td width="150">${data[4].active_activities}</td>
        </tr>
        <tr>
          <td width="350">Activities Added Today</td>
          <td width="150">${data[3].activities_added_today}</td>
        </tr>
        <tr>
          <th text="bold" width="150">User Analytics</th>
        </tr>
        <tr>
          <td width="350">Total users</td>
          <td width="150">${data[5]}</td>
        </tr>
        <tr>
          <td width="350">Users Added Today</td>
          <td width="150">${data[6]}</td>
        </tr>
      </table>`
    }
    sendgridMail.send(email)
        .then(data => console.log('Status Code from Sendgrid',data[0].statusCode))
        .catch(err => console.log(err));
    date.setDate(date.getDate() + 1);
    let dateinms = date.getTime() - new Date().getTime();
    setTimeout(callFunction, dateinms);
    console.log('Scheduled on => ', new Date(date.getTime() + 18000000));
})();
