const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Configure o arquivo de log
const logFile = path.join(__dirname, 'server.log');
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

// Função para registrar logs
function logMessage(message) {
    const timestamp = new Date().toISOString();
    logStream.write(`[${timestamp}] ${message}\n`);
    console.log(message);
}

// Capturar exceções não tratadas
process.on('uncaughtException', (err) => {
    logMessage(`Uncaught Exception: ${err.stack || err}`);
    process.exit(1); // Opcional: encerra o processo após capturar o erro
});

// Capturar rejeições não tratadas
process.on('unhandledRejection', (reason, promise) => {
    logMessage(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

// Middleware para capturar apenas erros nas rotas
app.use((req, res, next) => {
    res.on('finish', () => {
        if (res.statusCode >= 400) { // Se o status for 400 ou superior (erro)
            logMessage(`Error: ${req.method} ${req.url} - Status: ${res.statusCode}`);
        }
    });
    next();
});

// Defina o diretório estático para servir arquivos
app.use(express.static(__dirname));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'), (err) => {
        if (err) {
            logMessage(`Error serving file: /index.html - ${err.message}`);
            res.status(404).send('File not found');
        }
    });
});

// Rota para servir qualquer arquivo HTML diretamente
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, req.path), (err) => {
        if (err) {
            logMessage(`Error serving file: ${req.path} - ${err.message}`);
            res.status(404).send('File not found');
        }
    });
});

// Inicie o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logMessage(`Servidor rodando na porta ${PORT}`);
});
