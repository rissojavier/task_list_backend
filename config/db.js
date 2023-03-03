import mongoose from 'mongoose';

const conectarDB = async () => {
    try {

        const db = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxTimeMS: 300000
            });

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB conectado en: ${url}`);

    } catch (error) {

        console.log(`error: ${error.message}`);
        process.exit(1);
    }
};

export default conectarDB;
