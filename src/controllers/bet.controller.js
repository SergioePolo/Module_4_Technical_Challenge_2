import { betModel } from "../models/bet.models.js";
import { rouletteModel } from "../models/roulette.models.js";

export const createBet = async ( req, res ) => {
    try {
        const data = req.body;

        const roulette = await rouletteModel.findById(data.rouletteId);

        if(!roulette || roulette.status !== 'open'){
            return res.status(404).json({
                msg: 'La ruleta no existe o no esta abierta, por favor revise la información'
            })
        }
        if( data.type === 'number' && (data.number <0 || data.number > 36)){
            return res.status(400).json({
                msg: 'El número a apostar no está dentro del rango'
            })
        }

        if( data.type === 'color' && !['red', 'black'].includes(data.color) ){
            return res.status(400).json({
                msg: 'El color a apostar no es valido'
            })
        }

        if( data.amount > 10000 ){
            return res.status(400).json({
                msg: 'El monto de la apuesta supera el máximo permitido'
            })
        }
        const newBet = await betModel.create(data);
        roulette.bets.push(newBet._id);
        await roulette.save();

        return res.status(200).json({
            msg: 'Apuesta creada correctamente'
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Se presentó un error al crear la apuesta',
            error: error.message
        })
    }
}