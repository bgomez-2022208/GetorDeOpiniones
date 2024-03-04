import mongoose from 'mongoose';

// Definir el esquema para el modelo de usuario
const PublicSchema = mongoose.Schema({
  titulo: {
    type: String,
    required: [true, "El titulo es obligatorio"],
  },
  categoria: {
    type: String,
    required: [true, "La categoria es obligatoria"],
  },
  textoPrincipal: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  
  status: {
    type: Boolean,
    default: true,
  },
  comentarios:{
    type: [String],
  },
  user:{
    type: [String],
  },
});



export default mongoose.model('public', PublicSchema);