import app from './app.js';

const DEFAULT_PORT = 4000;
const PORT = Number(process.env.PORT || DEFAULT_PORT);

const server = app.listen(PORT, () => {
    console.log(`✓ Servidor corriendo en puerto ${PORT}`);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Error: el puerto ${PORT} ya está en uso. Cambia PORT en la variable de entorno o detén el proceso que lo está usando.`);
    } else {
        console.error('Error al iniciar servidor:', error);
    }
    process.exit(1);
});

// Capturar excepciones no manejadas
process.on('uncaughtException', (error) => {
    console.error('Excepción no capturada:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada sin manejo:', reason);
    process.exit(1);
});  