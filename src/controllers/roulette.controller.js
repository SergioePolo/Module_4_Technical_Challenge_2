import { rouletteModel } from '../models/roulette.models.js';
import { betModel } from '../models/bet.models.js';

export const createRoulette = async ( req, res ) =>{
    try {
        const roulette = await rouletteModel.create({});
        console.log(roulette)
        return res.status(201).json({
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

export const openRoulette = async ( req, res ) =>{
    const rouletteId = req.params.id;
    
    try {
        const roulette = await rouletteModel.findById(rouletteId);
        if(!roulette) return res.status(404).json({msg: 'No se encontro la ruleta buscada'});
        if (roulette.status === 'open') return res.status(400).json({msg: 'La ruleta ya se encuentra abierta'});
        roulette.status = 'open';

        await roulette.save();
        res.status(200).json({msg: 'Ruleta abierta con éxito todos pueden apostar'})
    } catch (error) {
        res.status(500).json({
            msg: 'Error al abrir la mesa de apuestas',
            error: error.message
        })
    }
}

export const closeRoulette = async ( req, res ) =>{
    const rouletteId = req.params.id;
    try {
        const roulette = await rouletteModel.findById(rouletteId).populate('bets');
        if(!roulette) return res.status(400).json({
            msg: 'No se encontró la ruleta desaeada'
        })
        if(roulette.status !== 'open') return res.status(400).json({
            msg: 'La ruleta ya se encuentra cerrada'
        })

        const winnerNumber = Math.floor(Math.random()*37);
        const winnerColor = Math.floorwinnerNumber % 2 === 0 ? 'red': 'black';

        roulette = {
            ...roulette,
            winnerNumber: winnerNumber,
            winnerColor: winnerColor,
            status: 'closed'
        }

        await roulette.save();

        res.status(200).json({
            msg: 'Ruleta cerrada correctamente',
            winnerNumber,
            winnerColor
        })
        
    } catch (error) {
        res.status(500).json({
            msg: 'Se presento un erro al momento de cerrar la mesa',
            error: error.message
        })
    }
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