const express = require('express');
const path = require('path');
const app = express();

// Defina o diretório estático para servir arquivos
app.use(express.static(__dirname));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para servir qualquer arquivo HTML diretamente
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

// Inicie o servidor
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
