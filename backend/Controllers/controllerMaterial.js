const serviceMaterial = require('../Services/serviceMaterial');

exports.getMaterials = async (req, res) => {
    const response = await serviceMaterial.getMaterials();
    
    if(response.err){
        return res.status(500).json(response);
    }
    
    return res.json(response);
}

exports.getMaterialsByCategory = async (req, res) => {
    const response = await serviceMaterial.getMaterialsByCategory(req.body);
    
    if(response.err){
       return res.status(500).json(response);
    }

    return res.status(200).json(response);
}

exports.addMaterial = async (req, res) => {
    
    const response = await serviceMaterial.addMaterial(req.body);

    if(response.err){
        return res.status(500).json(response);
    }
    
    return res.status(200).json(response);
}