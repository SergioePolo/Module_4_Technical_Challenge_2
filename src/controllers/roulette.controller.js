import { rouletteModel } from '../models/roulette.models.js';

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

export const closeRoulette = async (req, res) => {
    const rouletteId = req.params.id;
    try {
        const roulette = await rouletteModel.findById(rouletteId).populate('bets');
        
        if (!roulette) {
            return res.status(404).json({
                msg: 'No se encontró la ruleta deseada'
            });
        }
        
        if (roulette.status !== 'open') {
            return res.status(400).json({
                msg: 'La ruleta ya se encuentra cerrada'
            });
        }

        const winnerNumber = Math.floor(Math.random() * 37);
        const winnerColor = winnerNumber % 2 === 0 ? 'red' : 'black';

        const betsResults = await Promise.all(
            roulette.bets.map(async (bet) => {
                let won = false;
                let winnings = 0;

                if (bet.type === 'number' && bet.number === winnerNumber) {
                    won = true;
                    winnings = bet.amount * 5;
                }
                
                else if (bet.type === 'color' && bet.color === winnerColor) {
                    won = true;
                    winnings = bet.amount * 1.8;
                }

                bet.won = won;
                bet.winnings = winnings;
                await bet.save();

                return {
                    betId: bet._id,
                    type: bet.type,
                    amount: bet.amount,
                    won,
                    winnings
                };
            })
        );

        roulette.winnerNumber = winnerNumber;
        roulette.winnerColor = winnerColor;
        roulette.status = 'closed';
        await roulette.save();

        res.status(200).json({
            msg: 'Ruleta cerrada correctamente',
            winnerNumber,
            winnerColor,
            totalBets: roulette.bets.length,
            winningBets: betsResults.filter(b => b.won).length,
            betsResults
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Se presentó un error al momento de cerrar la mesa',
            error: error.message
        });
    }
};


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