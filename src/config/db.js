import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect (process.env.DBURL, {dbName: 'betsDB'});
        console.log('Conexión exitosa, bienvenido a MongoDB');
    } catch (error) {
        console.error('Error de conexión: ', error);
    }
}