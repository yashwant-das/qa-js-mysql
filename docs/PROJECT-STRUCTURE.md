# Project Structure (Reorganized)

This document shows the current organized project structure following best practices.

## File Structure

```
database-sql-framework/
├── .github/
│   └── workflows/
│       └── test.yml        # GitHub Actions CI/CD workflow
├── docs/                   # Documentation files
│   ├── CHANGELOG.md        # Version history
│   ├── ENVIRONMENT.md      # Environment configuration guide
│   └── PROJECT-STRUCTURE.md # This file
├── python/
│   ├── src/
│   │   └── users.py       # Python unittest implementation
│   ├── notebooks/
│   │   └── users.ipynb    # Jupyter notebook
│   ├── requirements.txt   # Python dependencies
│   └── venv/              # Python virtual environment (git-ignored)
├── scripts/
│   └── setup-and-test.sh  # Complete setup and test script
├── src/
│   ├── config/
│   │   └── database.js    # Database configuration (renamed from config.js)
│   ├── queries/
│   │   └── user-queries.js # SQL queries (renamed from sqlQueries.js)
│   └── utils/
│       └── test-connection.js # Database connection tester
├── tests/
│   └── users.test.js      # Jest test suite
├── .env                   # Environment variables (created from .env.example)
├── .env.development       # Development-specific overrides
├── .env.example           # Environment template (Docker-ready)
├── .gitignore             # Git ignore rules
├── docker-compose.yml     # Docker MySQL setup
├── LICENSE                # ISC License
├── package.json           # Node.js dependencies and scripts
└── README.md              # Main documentation
```

## What Was Removed

### Files Removed:
- `test-without-docker.sh` - Alternative setup without Docker
- `run-tests.sh` - Old test runner
- `.env.local` - Redundant environment file
- `TESTING.md` - Detailed testing guide (merged into README)

### Simplified:
- `docker-compose.yml` - Removed obsolete version declaration
- `.env.example` - Focused on Docker setup as default
- `README.md` - Streamlined to Docker-first approach
- `package.json` - Added convenient database management scripts

## New NPM Scripts

```bash
npm run db:start          # Start MySQL container
npm run db:stop           # Stop MySQL container  
npm run db:logs           # View MySQL logs
npm run test:connection   # Test database connection
npm test                  # Run Node.js tests
npm run test:all          # Run complete test suite
npm run setup            # Install all dependencies
```

## Benefits of Reorganization

1. **Better Organization**: Logical grouping of related files
2. **Scalability**: Easy to add new features in dedicated directories
3. **Maintainability**: Clear separation of concerns
4. **Industry Standards**: Follows common project structure patterns
5. **Tooling Support**: Better IDE navigation and understanding

## Quick Start (Post-Reorganization)

```bash
# Clone and setup
git clone https://github.com/yashwant-das/database-sql-framework.git
cd database-sql-framework

# One-command setup and test
./scripts/setup-and-test.sh

# Or manual setup
npm run db:start
cp .env.example .env
npm install
npm test
```

The project structure now follows **industry best practices** with clear organization! 🚀
