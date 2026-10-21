# qa-js-mysql

[![Tests](https://github.com/yashwant-das/qa-js-mysql/actions/workflows/test.yml/badge.svg)](https://github.com/yashwant-das/qa-js-mysql/actions/workflows/test.yml)

Tests MySQL queries with Jest against a database running in Docker: create,
read, update and delete on a users table, using parameterized queries.

`python/` has the same checks written with Python unittest.

## Prerequisites

- Docker and the `docker-compose` command (used by the npm scripts)
- Node.js 20.19+ (CI uses 22)
- Python 3.10+ (only for `python/`)

Use a disposable test database: both suites drop and recreate the `users` table.
Run the suites sequentially when they share a database.

## Run the Jest tests

Run these commands from the repository root:

```bash
npm run db:start        # Wait for MySQL to accept connections before running tests
cp .env.example .env    # works as-is with the Docker database
npm install
npm test
npm run db:stop
```

`npm run test:connection` checks the database connection on its own.

## Run the Python tests

Create the root `.env` file and start MySQL as shown above. Run all commands
below from the repository root (`qa-js-mysql/`); no `cd python` is needed. The
virtual environment activation command is for bash/zsh.

```bash
python3 -m venv python/venv
source python/venv/bin/activate
python -m pip install -r python/requirements.txt
python python/src/users.py
```

## Run everything

`./scripts/setup-and-test.sh` checks the prerequisites, starts MySQL, installs
both sets of dependencies and runs both suites.

## Project Structure

```text
qa-js-mysql/
├── .github/
│   └── workflows/
│       └── test.yml       # GitHub Actions CI/CD workflow
├── docs/                  # Documentation
│   ├── CHANGELOG.md
│   └── ENVIRONMENT.md
├── src/                   # Source code
│   ├── config/
│   │   └── database.js    # Database configuration
│   ├── queries/
│   │   └── user-queries.js # SQL queries with parameterized statements
│   └── utils/
│       └── test-connection.js
├── tests/                 # Test files
│   └── users.test.js      # Jest test suite
├── scripts/               # Build and setup scripts
│   └── setup-and-test.sh
├── python/                # Python implementation
│   ├── src/
│   │   └── users.py       # Python unittest implementation
│   └── requirements.txt   # Python dependencies
├── docker-compose.yml     # Docker MySQL setup
├── babel.config.js        # Babel configuration for Jest
├── package-lock.json      # Locked Node.js dependency versions
├── package.json           # Node.js dependencies and scripts
└── .env.example           # Environment variables template
```

## Database Schema

The project uses a simple `users` table:

```sql
CREATE TABLE `users` (
  `id` INT(2) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;
```

## Testing Details

### Node.js Tests (Jest)

- **Test Framework**: Jest
- **Database Library**: mysql2 with promise support
- **Features**:
  - Connection pooling
  - Automatic table setup/teardown
  - Fake data generation with Faker.js
  - Parameterized queries for security

### Python Tests (unittest)

- **Test Framework**: unittest
- **Database Library**: mysql-connector-python
- **Features**:
  - Environment variable configuration
  - Class-based test structure
  - Secure parameterized queries
  - Fake data generation with Faker

## Security Features

- **Parameterized Queries**: SQL values are passed separately from query text.
- **Environment Variables**: Database clients read credentials from environment
  variables or `.env` .
- **Local Credentials**: `.env` is ignored by Git. Docker and template
  credentials are committed development defaults.

The code does not implement explicit input validation.

## CI/CD

The project includes GitHub Actions workflow for:

- Automated testing on pushes to `main` and `develop` , and pull requests
  targeting `main`
- Node.js and Python test execution in parallel
- MySQL database service integration
- Testing on Ubuntu with Node.js 22 and Python 3.12
- Test output in GitHub Actions job logs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## Useful Commands

```bash
# Database management
npm run db:start          # Start MySQL container
npm run db:stop           # Stop MySQL container
npm run db:logs           # View MySQL logs

# Testing
npm run test:connection   # Test database connection
npm test                  # Run Node.js tests
npm run test:all          # Run complete test suite

# Setup
# Install dependencies; activate a Python virtual environment first
npm run setup
```

## System Requirements

- Node.js 20.19+ (CI uses 22)
- Python 3.10+ (only for `python/`)
- Docker (for MySQL database)

## Environment Variables Reference

Set all five values for consistent behavior across both suites and the
connection checker. These are the values supplied by `.env.example` , rather
than defaults shared by all clients:

| Variable      | Description           | Docker template value |
| ------------- | --------------------- | --------------------- |
| `DB_HOST`     | Database host address | localhost             |
| `DB_USER`     | Database username     | test_user             |
| `DB_PASSWORD` | Database password     | test_password         |
| `DB_PORT`     | Database port         | 3306                  |
| `DB_NAME`     | Database name         | UsersDB               |

See [environment configuration](docs/ENVIRONMENT.md) for loading behavior and
client defaults.

## Troubleshooting

### Common Issues

1. **Connection Refused**: Check if MySQL server is running and credentials are
   correct
2. **Access Denied**: Verify user permissions and password
3. **Database Not Found**: Ensure the database exists or has proper creation
   permissions
4. **Port Issues**: Check if the specified port is correct and not blocked by
   firewall

### Connection Diagnostics

Run `npm run test:connection` from the repository root to check the configured
connection and execute a basic query. The utility requires a root `.env` file.
Use `npm run db:logs` to inspect MySQL startup or server errors.

### Debug Mode

For Node.js MySQL protocol debugging, temporarily add `debug: true` to the
`dbConfig` object in `src/config/database.js` , then run:

```bash
npm test
```

The `mysql2` driver reads its connection's `debug` option; setting
`DEBUG=mysql*` alone does not enable it. Remove the temporary option after
debugging. Protocol logs can contain query values, so avoid sharing them without
checking their contents.

For Python connector logging, add the following before opening the database
connection in `python/src/users.py` :

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

Then run `python python/src/users.py` from the repository root with the virtual
environment activated. The output depends on which messages the connector emits;
this does not enable MySQL server query logging.

## License

MIT. See [LICENSE](LICENSE).

For version history and changes, see [docs/CHANGELOG.md](docs/CHANGELOG.md)
