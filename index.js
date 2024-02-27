const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'fitapp'
});

// Conexión a la base de datos
connection.connect(error => {
    if (error) {
        console.error('Error de conexión a la base de datos:', error);
        throw error;
    }
    console.log('Conexión a la base de datos MySQL establecida');
});

// Ruta para el registro de usuarios
app.post('/api/registro', (req, res) => {
    const { name, email, password } = req.body;
    const INSERT_USER_QUERY = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    connection.query(INSERT_USER_QUERY, [name, email, password], (error, results) => {
        if (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).send('Error interno del servidor');
        } else {
            res.status(200).send('Usuario registrado correctamente');
        }
    });
});
// Ruta para obtener todos los usuarios
app.get('/api/users', (req, res) => {
    const SELECT_USERS_QUERY = `SELECT * FROM users`;
    connection.query(SELECT_USERS_QUERY, (error, results) => {
        if (error) {
            console.error('Error al obtener los usuarios:', error);
            res.status(500).send('Error interno del servidor');
        } else {
            res.status(200).json(results);
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
