module.exports = {
    senecaConfigurations : {
        type        : 'amqp',
        url         : process.env.AMQP_URL || 'rabbitmq:5672',
        transport   : 'seneca-amqp-transport',
    },
    database: {
        connection: process.env.connection || 'mongodb://Administrator:' + encodeURIComponent('Qwerty12#$') + '@youcan-cluster-shard-00-00-ms4fp.gcp.mongodb.net:27017,youcan-cluster-shard-00-01-ms4fp.gcp.mongodb.net:27017,youcan-cluster-shard-00-02-ms4fp.gcp.mongodb.net:27017/server?ssl=true&replicaSet=Youcan-Cluster-shard-0&authSource=admin',
        dbName: 'server'
    },
    keys: {
        secret_jwt: "IloveMyselfsomehow"
    },
    generateParamsForCrashReport : (err) => {
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
                        Data: `<strong>Error Occured In Server (GATEWAY Service)! </strong>
                        <br/>please go and check the error log file for more details, the error is following: 
                        <br/><br/>${error}`
                    }
                },
                Subject: {
                        Charset: "UTF-8",
                        Data: `Error Occured In Server (GATEWAY Service)`
                }
            }
        }
        return params;
    },
    SESConfig : {
        apiVersion: '2010-12-01',
        accessKeyId: 'AKIAQQABUNF4R7YQZUW3',
        secretAccessKey: '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',
        region: 'us-east-1'
    }
};