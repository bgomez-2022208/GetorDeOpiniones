import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Public from './public.model.js';

export const getPublic = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { status: true };

    const [total, publi] = await Promise.all([
        Public.countDocuments(query),
        Public.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.status(200).json({
        total,
        publi,
    });
}

export const createPublic = async (req, res) => {
    const { titulo, categoria, textoPrincipal } = req.body;
    const publi = new Public({ titulo, categoria, textoPrincipal });


    await publi.save();

    res.status(200).json({
        publi,
    });
}

export const getPublicacionById = async (req, res) => {
    const { id } = req.params;
    const publi = await Public.findOne({ _id: id });

    res.status(200).json({
        publi,
    });
}



export const updatePublic = async (req, res = response) =>{
    const { qualification, category, text} = req.body;

    const p = await Public.findOne({qualification});


    if (!p) {
        console.log('hi');
        return res.status(400).json({
            msg: "Esta publicacion no existe en la base de datos, porfavor, verifique qeu el titulo sea el correcto y no intente cambiar el titulo"
        });
    }
    p.qualification=qualification;
    p.category=category;
    p.text=text

    const pub = await Public.findByIdAndUpdate(p.id, p);

    res.status(200).json({
        msg: "this publication is update",
       pub
    });
}


export const publicacionDelete = async (req, res) =>{
    const { titulo } = req.body;

    const p = await Public.findOne({titulo});
    console.log(p);

    if (!p) {
        return res.status(400).json({
            msg: "El Titulo no existe en la base de datos, porfavor, verifique qeu el Titulo sea el correcto"
        });
    }

    p.state=false;

    const pub = await Public.findByIdAndUpdate(p.id, p);
    const publicacionAutenticado = req.usuario;

    res.status(200).json({
        msg: "Publicacion elimado",
        pub,
        publicacionAutenticado
    })
}
