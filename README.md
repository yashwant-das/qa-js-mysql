# qa-js-mysql

[![Tests](https://github.com/yashwant-das/qa-js-mysql/actions/workflows/test.yml/badge.svg)](https://github.com/yashwant-das/qa-js-mysql/actions/workflows/test.yml)

Tests MySQL queries with Jest against a database running in Docker: create, read, update and delete on a users table, using parameterized queries.

`python/` has the same checks written with Python unittest, and a Jupyter notebook for exploring the data.

## Prerequisites

- Docker
- Node.js 20.19+ (CI uses 22)
- Python 3.10+ (only for `python/`)

## Run the Jest tests

```bash
npm run db:start        # MySQL in Docker; allow about 10 seconds on first start
cp .env.example .env    # works as-is with the Docker database
npm install
npm test
npm run db:stop
```

`npm run test:connection` checks the database connection on its own.

## Run the Python tests

```bash
cd python
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python src/users.py
```

## Run everything

`./scripts/setup-and-test.sh` checks the prerequisites, starts MySQL, installs both sets of dependencies and runs both suites.

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
│   ├── notebooks/
│   │   └── users.ipynb    # Jupyter notebook for interactive testing
│   └── requirements.txt   # Python dependencies
├── docker-compose.yml     # Docker MySQL setup
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

### Interactive Notebook

The Jupyter notebook (`python/notebooks/users.ipynb`) provides:

- Step-by-step database operations
- Interactive code execution
- Educational documentation
- Visual feedback on operations

## Security Features

✅ **Parameterized Queries**: Prevents SQL injection attacks  
✅ **Environment Variables**: Secure credential management  
✅ **No Hardcoded Credentials**: All sensitive data externalized  
✅ **Input Validation**: Proper data type handling  

## CI/CD

The project includes GitHub Actions workflow for:

- Automated testing on push/pull requests
- Node.js and Python test execution in parallel
- MySQL database service integration
- Cross-platform testing on Ubuntu
- Test result reporting and artifact storage

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
npm run setup            # Install all dependencies
```

## System Requirements

- Node.js 20.19+ (CI uses 22)
- Python 3.10+ (only for `python/`)
- Docker (for MySQL database)

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DB_HOST` | Database host address | localhost | Yes |
| `DB_USER` | Database username | - | Yes |
| `DB_PASSWORD` | Database password | - | Yes |
| `DB_PORT` | Database port | 3306 | No |
| `DB_NAME` | Database name | UsersDB | No |

## Troubleshooting

### Common Issues

1. **Connection Refused**: Check if MySQL server is running and credentials are correct
2. **Access Denied**: Verify user permissions and password
3. **Database Not Found**: Ensure the database exists or has proper creation permissions
4. **Port Issues**: Check if the specified port is correct and not blocked by firewall

### Debug Mode

For Node.js debugging, set the environment variable:

```bash
DEBUG=mysql* npm test
```

For Python debugging, enable logging:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## License

ISC License - see [LICENSE](LICENSE) file for details

For version history and changes, see [docs/CHANGELOG.md](docs/CHANGELOG.md)
