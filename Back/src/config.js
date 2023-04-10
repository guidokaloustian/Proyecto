import dotenv from 'dotenv';

dotenv.config()

const obj = {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI
}

export default obj