const serviceEvent = require('../Services/serviceEvent');

exports.create = async (req, res) => {
    try{
        const data = req.body;
        const idOrganizador = req.id;

        const response = await serviceEvent.create(data, idOrganizador);

        if(response.err){
            return res.status(400).json(response);
        }

        return res.json(response);
    }catch (error){
        return res.status(500).json({
            err: true,
            message: error.message,
        });
    }
}

exports.getAvailable = async (req, res) => {
    try{
        const response = await serviceEvent.getAvailables();

        if(response.err){
            return res.status(400).json(response);
        }

        return res.status(201).json(response);
    }catch (error){
        return res.status(500).json({
            err: true,
            message: error.message,
        });
    }
}

exports.getEventsByStudent = async (req, res) => {
    try{
        const idEstudiante = req.id;

        const response = await serviceEvent.getEventsByStudent(idEstudiante);

        if(response.err){
            return res.status(400).json(response);
        }

        return res.json(response);
    }catch (error){
        return res.status(500).json({
            err: true,
            message: error.message,
        });
    }
}