# Changelog

<!-- markdownlint-configure-file {"MD024": {"siblings_only": true}} -->

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html) .

## [Unreleased]

### Changed

- Corrected setup instructions, environment-loading and CI descriptions.
- Documented destructive table setup and sequential execution against shared
  databases.
- Repaired the combined setup script's opening block and Python test path;
  simplified its output.

### Removed

- Duplicate Jupyter CRUD demonstration and project-structure guide.

## [1.2.0] - 2025-07-21

### Added

- Docker-first setup with docker-compose.yml
- Convenient npm scripts for database management
- Streamlined setup process
- GitHub Actions CI/CD workflow
- Organized project structure with dedicated directories

### Changed

- **BREAKING**: Simplified to Docker-only setup for consistency
- Updated documentation to focus on Docker workflow
- Streamlined environment configuration
- **BREAKING**: Reorganized project structure following best practices:
  - Moved source files to `/src` directory
  - Moved tests to `/tests` directory
  - Moved documentation to `/docs` directory
  - Moved scripts to `/scripts` directory
  - Reorganized Python files with `/src` and `/notebooks` subdirectories
- Renamed files for better clarity:
  - `config.js` → `src/config/database.js`
  - `sqlQueries.js` → `src/queries/user-queries.js`
- Updated all import paths and script references

### Removed

- Alternative setup scripts (test-without-docker.sh, run-tests.sh)
- Complex multi-provider documentation
- Redundant environment files (.env.local)
- Detailed testing guide (merged into README)
- CircleCI configuration (replaced with GitHub Actions)

### Fixed

- Removed obsolete docker-compose version warning
- Simplified package.json scripts

## [1.1.0] - 2025-07-21

### Added

- ISC License file (LICENSE)
- Comprehensive documentation in README.md
- Environment configuration with .env.example
- GitHub Actions workflow for automated testing
- Test runner script (run-tests.sh)
- Enhanced error handling and logging
- Jupyter notebook with interactive demonstrations

### Changed

- **BREAKING**: Updated to latest package versions:
  - Python: mysql-connector-python 8.0.26 → 9.3.0
  - Python: faker 8.10.0 → 37.4.2
  - Python: python-dotenv 0.19.0 → 1.1.1
  - Python: pytest 7.4.0 → 8.4.1
  - Node.js: jest 29.7.0 → 30.0.4
  - Node.js: mysql2 3.9.2 → 3.14.2
  - Node.js: dotenv 16.0.3 → 17.2.0
  - Node.js: faker 5.5.3 → @faker-js/faker 9.5.0 (modern package with
    `faker.person.fullName()` )
- Improved SQL security with parameterized queries
- Enhanced test coverage with UPDATE and DELETE operations
- Better database connection management
- Unified .gitignore for both Python and Node.js

### Security

- Fixed SQL injection vulnerabilities in JavaScript code
- Removed hardcoded database credentials
- Added secure environment variable configuration
- Implemented parameterized queries across all database operations

### Fixed

- Consistent error handling across implementations
- Proper database connection cleanup
- Cross-platform compatibility improvements

## [1.0.0] - 2025-07-21

### Initial Release

- Initial project setup
- Basic CRUD operations for MySQL database
- Node.js implementation with Jest testing
- Python implementation with unittest
- Basic GitHub Actions configuration
- Faker.js integration for test data generation
