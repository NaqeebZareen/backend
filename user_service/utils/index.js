function generateParamsForCrashReport(err) {
    let errorKeys = Object.keys(err);
    let error = '';
    errorKeys.forEach(key => {
        error += `${key} ===> ${err[key]}<br/>- - - - - - - - - - - - - - - - - - - - - - - - - - - -<br/>`
    });
    const params = {
        Source: 'hassan.ali@ukan.co',
        Destination: {
            ToAddresses: [
                'hassan.ali@ukan.co',
                'nadeem.qasmi@ukan.co',
                'habib@ukan.co'
            ]
        },
        ReplyToAddresses: [
            'hassan.ali@ukan.co'
        ],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<strong>Error Occured In Authentication Service! </strong>
                    <br/>please go and check the error log file for more details, the error is following: 
                    <br/><br/>${error}`
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: `Error Occured In Authentication Service`
            }
        }
    }
    return params;
}

module.exports={
    generateParamsForCrashReport
}