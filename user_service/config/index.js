module.exports = {

    mongoConnection:{
        uri:`mongodb+srv://backend:admin@youcan-stable.ms4fp.mongodb.net/<dbname>?retryWrites=true&w=majority`,
        dbName:'userServiceDb',
    },
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // reconnectTries: 5,
        // reconnectInterval: 50000,
        // autoReconnect : true
    },
    SESConfig: {
        apiVersion: process.env.AWS_API_VERSION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    },

    jwtSecret: process.env.JWT_SECRET || 'IloveMyselfsomehow',
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "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"
};