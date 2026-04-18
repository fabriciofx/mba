const { createApp } = require('./app');

const port = Number(process.env.PORT || 3000);
const { app, close } = createApp();

const server = app.listen(port, () => {
  console.log(`todo-api listening on ${port}`);
});

async function shutdown(signal) {
  console.log(`received ${signal}, shutting down`);

  server.close(async () => {
    try {
      await close();
    } catch (err) {
      console.error('error while closing resources', err);
    } finally {
      process.exit(0);
    }
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
