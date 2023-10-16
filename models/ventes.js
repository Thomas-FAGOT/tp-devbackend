const mongoose = require('mongoose');

const venteSchema = new mongoose.Schema({
  product: String,
  total: Number,
  customer: String,
});

const Vente = mongoose.model('Vente', venteSchema);

// Exportez le modèle pour pouvoir l'utiliser dans vos routes CRUD
module.exports = Vente;
