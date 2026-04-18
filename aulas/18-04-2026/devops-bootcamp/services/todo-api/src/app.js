const express = require('express');
const { Pool } = require('pg');

function buildDbConfigFromEnv() {
  return {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'todo',
    max: Number(process.env.DB_POOL_MAX || 5),
    idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS || 30000),
    connectionTimeoutMillis: Number(process.env.DB_CONN_TIMEOUT_MS || 2000)
  };
}

function createApp() {
  const app = express();
  app.use(express.json());

  let pool;
  const getPool = () => {
    if (!pool) {
      pool = new Pool(buildDbConfigFromEnv());
    }
    return pool;
  };

  app.get('/live', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/ready', async (req, res) => {
    try {
      await getPool().query('select 1');
      res.json({ status: 'ok' });
    } catch (err) {
      res.status(503).json({ status: 'error', error: 'db_unavailable' });
    }
  });

  app.get('/version', (req, res) => {
    res.json({ version: process.env.APP_VERSION || 'dev' });
  });

  app.get('/todos', async (req, res) => {
    const { rows } = await getPool().query('select id, title, done from todos order by id');
    res.json(rows);
  });

  app.post('/todos', async (req, res) => {
    const title = String(req.body?.title || '').trim();
    if (!title) {
      return res.status(400).json({ error: 'title_required' });
    }

    const { rows } = await getPool().query(
      'insert into todos(title, done) values($1,false) returning id, title, done',
      [title]
    );

    res.status(201).json(rows[0]);
  });

  app.patch('/todos/:id', async (req, res) => {
    const id = Number(req.params.id);
    const done = Boolean(req.body?.done);

    const { rows } = await getPool().query(
      'update todos set done=$1 where id=$2 returning id, title, done',
      [done, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'not_found' });
    }

    res.json(rows[0]);
  });

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  });

  return {
    app,
    close: async () => {
      if (pool) {
        await pool.end();
      }
    }
  };
}

module.exports = { createApp };
