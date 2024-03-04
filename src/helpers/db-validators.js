import User from '../user/user.model.js';
import Public from '../publicacion/public.model.js';



export const existenteEmail = async (correo = '') => {
    const existeEmail = await User.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);

    if (!existeUsuario) {
        throw new Error(`El ID: ${id} No existe`);
    }
}

export const existePublicacionById = async (id = '') => {
    const existePublicacion = await Public.findById(id);

    if (!existePublicacion) {
        throw new Error(`El ID: ${id} No existe`);
    }
}