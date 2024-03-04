import bcryptjs from 'bcryptjs';
import Usuario from '../user/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js'; 

export const login = async (req, res) => {
    const { correo, password, nombre } = req.body;

    try {
      let userLogin;
      if (correo) {
        userLogin = correo;
      } else if (nombre) {
        userLogin = nombre;
      } else {
        return res.status(400).json({
          msg: "Debe proporcionar correo o nombre para iniciar sesión",
        });
      }
  
      let usuario;
      if(userLogin.includes("@")) {
        usuario = await Usuario.findOne({correo});
  
      }else{
        usuario = await Usuario.findOne({nombre});
      }
    //const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Credenciales incorrectas, Correo no existe en la base de datos",
      });
    }
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "El usuario no existe en la base de datos",
      });
    }
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "La contraseña es incorrecta",
      });
    }
    const token = await generarJWT( usuario.id);

    res.status(200).json({
      msg: 'Login Ok!!!',
      usuario,
      token
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Comuniquese con el administrador",
    });
  }
}