const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const Vente = require('./models/ventes');

// URL de connexion à la base de données MongoDB
const dbURL = 'mongodb://localhost:27017/cours';

// Connexion à la base de données MongoDB
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connecté à la base de données MongoDB');
});


const port = 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

// Liste des utilisateurs (Read)
router.get('/ventes', (req, res) => {
    Vente.find({}, (err, ventes) => {
      if (err) {
        return res.status(500).json({ error: 'Une erreur est survenue.' });
      }
      res.json(ventes);
    });
  });
  
  // Route de création (POST) pour une vente
  router.post('/ventes', (req, res) => {
    const nouvelleVente = new Vente(req.body);
    nouvelleVente.save((err, vente) => {
      if (err) {
        return res.status(400).json({ error: 'Impossible de créer une nouvelle vente.' });
      }
      res.status(201).json(vente);
    });
  });
  
  // Route de mise à jour (PUT) pour une vente par son ID
  router.put('/ventes/:id', (req, res) => {
    Vente.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, vente) => {
      if (err) {
        return res.status(400).json({ error: 'Impossible de mettre à jour la vente.' });
      }
      res.json(vente);
    });
  });
  
  // Route de suppression (DELETE) pour une vente par son ID
  router.delete('/ventes/:id', (req, res) => {
    Vente.findByIdAndRemove(req.params.id, (err, vente) => {
      if (err) {
        return res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la vente.' });
      }
      res.json({ message: 'Vente supprimée avec succès.' });
    });
  });
  
  module.exports = router;
