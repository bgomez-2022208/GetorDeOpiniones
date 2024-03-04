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