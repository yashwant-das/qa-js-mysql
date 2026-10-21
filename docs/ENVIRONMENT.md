# Environment configuration

Use a disposable database. Both test suites drop and recreate the `users` table,
so do not point them at a database containing data you need.

## Files Overview

### `.env` (Git-ignored)

- Stores local database connection values.
- Copy `.env.example` to create it; the template matches the Docker setup.

### `.env.example` (tracked)

- Provides connection values for Docker and example settings for external
  databases.
- Keep it updated when configuration changes; do not put real credentials in it.

### `.env.development` (tracked)

- Is present in the repository but is not automatically loaded by either
  implementation.
- Do not rely on it for overrides or put private credentials in it.

## Docker setup

From the repository root:

```bash
cp .env.example .env
npm install
npm run db:start
# Wait for MySQL to accept connections before continuing.
npm run test:connection
```

The template matches the credentials in `docker-compose.yml` . Editing `.env`
changes the clients' configuration; it does not change the Docker server's
credentials. MySQL stores its initialized database in the `mysql_data` volume,
which survives `npm run db:stop` .

## Variables

Set all five values for consistent behavior across the JavaScript and Python
tools:

| Variable      | Purpose                   | Docker template value |
| ------------- | ------------------------- | --------------------- |
| `DB_HOST`     | MySQL host                | `localhost`           |
| `DB_USER`     | MySQL user                | `test_user`           |
| `DB_PASSWORD` | MySQL password            | `test_password`       |
| `DB_PORT`     | MySQL port                | `3306`                |
| `DB_NAME`     | Existing database to test | `UsersDB`             |

The JavaScript test configuration falls back to `localhost` , port `3306` ,
database `UsersDB` , and empty user/password values. The Python configuration
has no explicit defaults. The connection-check utility reads the variables
directly.

## Loading behavior

JavaScript uses `dotenv.config()` to load `.env` from the current working
directory. Run npm commands from the repository root.

Python uses `load_dotenv()` to search for `.env` starting from the script's
directory and continuing through parent directories. The root `.env` is found
when running `python src/users.py` from `python/` .

Existing process environment variables take precedence over values loaded from
`.env` in both implementations. Neither implementation automatically loads
`.env.development` or selects files based on `NODE_ENV` .

The connection-check utility also requires a `.env` file in the current working
directory, even if variables are already exported.

## External MySQL database

Replace the template values with your test database's connection details. Create
the database first and grant the user permission to create and drop the `users`
table and perform CRUD operations.

From the repository root:

```bash
cp .env.example .env
# Edit .env with your test database connection details.
npm install
npm run test:connection
```

For example, replace these placeholders with values from your database provider:

```env
DB_HOST=your-test-database-host
DB_USER=your-test-user
DB_PASSWORD=your-test-password
DB_PORT=3306
DB_NAME=your-test-database
```

The current connection configurations do not expose TLS options. Providers
requiring TLS need a code change as well as credentials.

## Best Practices

1. Keep real credentials out of tracked files.
2. Keep `.env.example` synchronized with configuration changes.
3. Use the Docker database for a consistent local setup.
4. Check the connection before running the suites.
5. Run suites sequentially against a shared disposable database.

## Troubleshooting

- Connection refused: check Docker is running, inspect `npm run db:logs` , and
  wait for MySQL startup to finish.
- Access denied: check credentials and grants. Existing Docker volumes keep
  their initialized credentials.
- Unknown database: create the configured database or correct `DB_NAME`.
- Port already in use: stop the conflicting service or change the published port
  in `docker-compose.yml` and match it with `DB_PORT` .

`.env` is ignored by Git. Keep real credentials out of committed files;
`.env.example` and `.env.development` are tracked.
