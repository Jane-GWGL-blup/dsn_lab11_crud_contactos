const { errorMonitor } = require('events');
const path = require('path');
const Contacto = require('../models/contactos');

exports.index = function (req, res) {
    res.sendFile(path.resolve('views/contactos.html'));
};

exports.create = async (req, res) => {
        const { nombre, apellido, email, telefono, direccion, _id } = req.body;

        

        console.log("new Contacto "+newContacto);
        console.log(req.body);
        console.log(_id);

        if (req.body._id) {
                console.log("ID: "+ req.body._id);
                await Contacto.findByIdAndUpdate(_id, {
                        nombre: nombre,
                        apellido: apellido,
                        email: email,
                        telefono: telefono,
                        direccion: direccion,    
                }, { new: true });
                res.redirect('/contactos');
        } else {
        
        var newContacto = new Contacto({
                nombre,
                apellido,
                email,
                telefono,
                direccion,
        });
        
        newContacto.save(function (err) {
                if(err) {
                //res.status(400).send('Unable to save contactos database, probably email ');
                console.log(err)
                res.status(400).render('errorcontacto')
               
            } else {
                res.redirect('/contactos');
            }
      });
    }
    
};

exports.deleteContacto = async (req, res) => {
        const { id } = req.params;
        console.log("Entre al delete")
        console.log("ID: "+ id)
        
        Contacto.findByIdAndRemove(id,function(err, contacto){
                if(err){
                        return res.send(500, err);
                }else{
                        res.redirect('/contactos');
                }
        });
    }

exports.list = function (req, res) {
        Contacto.find({}).exec(function (err, contactos) {
                if (err) {
                        return res.send(500, err);
                }
                res.render('getcontacto', {
                        contactos: contactos
             });
        });
};
