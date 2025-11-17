import { rouletteModel } from '../models/roulette.models.js';

export const createRoulette = async ( req, res ) =>{
    const numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
    const colors = ['Red', 'Black'];

    try {
        const newRoulette = {
            rouletteNumbers: numbers,
            rouletteColors: colors
        }
        const roulette = await rouletteModel.create(newRoulette);

        return res.status(200).json({
            msg: 'Mesa de apuestas creada correctamente, las apuestas estan abiertas por un periodo de 10 minutos',
            id: roulette._id
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al momento de crear la mesa, por favor intentelo nuevamente',
            error: error.message
        })
    }
}

export const updateRoulette = async ( req, res ) =>{

}

export const getRoulettes = async ( req, res ) => {
    try {
        const roulettes = await rouletteModel.find();
        if(roulettes.length === 0){
            res.status(404).json({
                msg: 'Todavia no hay mesas creadas, te invitamos a que crees una antes de realizar essta operación'
            })
        }
        else{
            res.status(200).json({
                msg: 'Se encontraron las siguientes mesas para su revisión',
                data: roulettes
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg:'Error al listar las mesas de apuestas creadas',
            error: error.message
        })
    }
}