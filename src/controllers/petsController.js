const pets = require("../models/pets")

const getAllPets = (req, res) =>{  
    pets.find(function(err, petFound){
        if(err){
            res.status(500).send({message: err.message})
        } else {
            if(petFound && petFound.length > 0){
                res.status(200).send(petFound);
            } else {
                res.status(204).send();
            }
        }
    })
}

const getPet = (req, res) => { 
    const petId = req.params.id
    pets.findOne({id: petId}, function(err, petFound){
        if(err){
            res.status(500).send({message: err.message});
        } else {
            if(petFound){
                res.status(200).send(petFound);
            } else {
                res.status(204).send();
            }
        }
    })
}

const createPet = (req, res) => { 
    let { nomeFantasia, endereco, telefone, atende } = req.body
    let petId  = req.params.id;
    const pet = {
        "id": Math.random().toString(32).substr(2),
        nomeFantasia,
        endereco,
        telefone,
        atende
    }
    pets.findOne({ id: petId }, function (err, petFound) { 
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (petFound) { 
                let newPet = new pets(pet)
                newPet.save(function (err) { 
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        petFound.atende.push(pet); 
                        pets.updateOne({ id: requiredId }, { $set: { atende: petFound.atende } }, function (err) { 
                            if (err) {
                                res.status(500).send({ message: err.message }) 
                            }
                            res.status(201).send({
                                message: "Pet adicionado com sucesso!",
                                ...petFound.toJSON()
                            });
                        });
                    }
                })
            } else {
                res.status(404).send({ message: "Não encontramos o ID para adicionar o seu Pet" });
            }
        }
    })
};

const deletePet = (req, res) => { 
    const petId = req.params.id;
    pets.findOne({id: petId}, function (err, pet){
        if(err){
            res.status(500).send({message: err.message})
        }else{
            if(pet){
                pets.deleteOne({id: petId}, function (err){
                    if(err){
                        res.status(500).send({
                            message: err.message, 
                            status: "FAIL"
                        })
                    }else{
                        res.status(200).send({
                            message: "Pet removido com sucesso",
                            status: "SUCESS"
                        })
                    }
                })
            } else {
                res.status(404).send({message: "Não há pet para ser removido com esse ID"})
            }
        }
    })
}

const updateName = (req, res) => { 
    const petId = req.params.id;
    let newNome = req.body.nomeFantasia;

    pets.findOne({id: petId}, function(err, petFound){
        if(err){
            res.status(500).send({message: err.message})
        }else{
            if(petFound){
                pets.updateOne({id: petId}, {$set: {nomeFantasia: newNome}}, function (err){
                    if(err){
                        res.status(500).send({message: err.message})
                    }else{
                        res.status(200).send({message: "Nome alterado com sucesso"})
                    }
                })
            } else {
                res.status(204).send({message: "Não há id para atualizar"})
            }
        }
    })

}  


module.exports = {
    createPet,
    deletePet,
    updateName,
    updatePet,
    getAllPets,
    getPet,
}