import dotenv from 'dotenv';

dotenv.config()

const config = {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    persistencia: process.env.PERSISTENCIA,
    gmail_user: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD,
    node_env: process.env.NODE_ENV
}

export default config