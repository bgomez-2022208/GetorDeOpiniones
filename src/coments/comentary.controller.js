import User from '../user/user.model.js';
import Public from '../publicacion/public.model.js'
 
export const comentaryPost = async(req, res) =>{
    const { correo, comentarios, titulo } = req.body;
    try {
        console.log('hi');
        const user = await User.findOne({correo});
        const pub = await Public.findOne({titulo})

        if (!user) {
            console.log('hi2');
            return res.status(400).json({
                msg: "User not exist"
            });
        }

        if (!pub) {
            console.log('no se ha enctrado la publicacion');
            
        }

        pub.user.push(user.correo);
        pub.comentarios.push(comentarios);

        await pub.save();
 
        res.status(200).json({
            msg: "This user repeat",
            pub,
        });
 
    } catch (e) {
        console.log('hi4', e);
        res.status(500).json({
            msg:  "error when entering comment"
        });
    }
}


//prueba

export const comentaryDelete = async (req, res) => {
    const { correo, titulo, comentario } = req.body;
    try {
        // Buscar al usuario
        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(400).json({
                msg: "User not exist"
            });
        }

        // Buscar la publicación
        const pub = await Public.findOne({ titulo });
        if (!pub) {
            return res.status(400).json({
                msg: "Publicación no encontrada"
            });
        }

        // Buscar y eliminar el comentario del array
        const index = pub.comentarios.findIndex(comment => comment === comentario);
        if (index === -1) {
            return res.status(404).json({
                msg: "Comentario no encontrado"
            });
        }
        pub.comentarios.splice(index, 1);

        // Guardar los cambios en la publicación
        await pub.save();

        res.status(200).json({
            msg: "Comentario eliminado exitosamente",
            pub,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al eliminar comentario"
        });
    }
};