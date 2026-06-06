const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'cloudapp-secret',
    resave: false,
    saveUninitialized: true
}));

// Rutas GET
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/formulario', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'formulario.html'));
});

app.get('/imagen', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'imagen.html'));
});

app.get('/tabla', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'tabla.html'));
});

// Ruta POST - Guardar formulario en sesión
app.post('/formulario', (req, res) => {
    const { nombre, ciudad, fecha } = req.body;

    if (!req.session.registros) {
        req.session.registros = [];
    }

    req.session.registros.push({ nombre, ciudad, fecha });

    res.redirect('/tabla');
});

// Ruta GET - Tabla lee la sesión
app.get('/tabla', (req, res) => {
    const registros = req.session.registros || [];
    res.sendFile(path.join(__dirname, 'views', 'tabla.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});

// API para que la tabla obtenga los registros
app.get('/api/registros', (req, res) => {
    res.json(req.session.registros || []);
});