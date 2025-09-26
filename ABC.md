# CLAUDE.md - Performance Management System (PMS)

## 🚨 CRITICAL RULES
- **NEVER** commit directly to main branch - all changes via feature branches
- **ALWAYS** run tests before committing code - maintain 90%+ coverage
- **NEVER** hardcode sensitive data - use environment variables and secrets management
- **ALWAYS** use TypeScript strict mode for type safety
- **NEVER** modify /node_modules/, /build/, /.git/, or /dist/ directories
- **ALWAYS** follow conventional commits format: `type(scope): description`
- **NEVER** deploy to production without security review and approvals
- **ALWAYS** implement RBAC checks for API endpoints and UI components

## 🎯 PROJECT CONTEXT

### System Architecture
- **Dual-app architecture**: Common authentication gateway + PMS app (Tour Management future app)
- **Single sign-on portal**: One login allowing users to select application access
- **Microservices approach**: Auth service, PMS service, shared libraries
- **Database complexity**: 40+ tables including goals, reviews, performance zones, competencies
- **Review workflow**: Matrix system (Self → R1/Team Lead → R2/Manager → HR → Calibration)
- **Role hierarchy**: Super Admin → Admin → HR Manager → Department Manager → Team Lead → Employee

### Technology Stack
- **Backend**: NestJS 10+ with TypeScript 5+, REST APIs with OpenAPI 3.0
- **Frontend**: Next.js 14+ with React 18+, TypeScript, Tailwind CSS 3+
- **Database**: MySQL 8+ (primary), Redis 7+ (caching/sessions)
- **Storage**: AWS S3 for attachments, evidence, and documents
- **Authentication**: JWT with refresh tokens, OAuth2/OIDC support
- **Message Queue**: Bull/BullMQ with Redis for background jobs
- **Deployment**: Docker + Kubernetes on AWS EKS
- **Monitoring**: Sentry, Prometheus, Grafana, ELK stack

## 🔧 DEVELOPMENT PATTERNS

### Directory Structure
```
pms-platform/
├── apps/
│   ├── auth-gateway/          # Authentication service
│   ├── pms-backend/            # PMS NestJS backend
│   ├── pms-frontend/           # PMS Next.js frontend
│   └── tour-management/        # Future app placeholder
├── libs/
│   ├── shared-types/           # Shared TypeScript types
│   ├── shared-ui/             # Common React components
│   └── shared-utils/          # Common utilities
├── infrastructure/
│   ├── docker/                # Docker configurations
│   ├── k8s/                   # Kubernetes manifests
│   └── terraform/             # Infrastructure as code
├── .claude/
│   ├── agents/                # Sub-agent configurations
│   ├── commands/              # Custom commands
│   └── memory/                # Context storage
└── docs/
    ├── architecture/          # Architecture decisions
    └── api/                   # API documentation
```

### Git Workflow Rules
- **Feature branches**: `feature/PMS-XXX-description`
- **Bugfix branches**: `bugfix/PMS-XXX-description`
- **Hotfix branches**: `hotfix/critical-issue-description`
- **Release branches**: `release/v1.2.3`
- **Git worktrees**: Use for parallel feature development
- **Commit frequency**: Every logical unit of work (~100 lines max)
- **PR requirements**: 2+ approvals, all tests passing, security scan complete

### Code Standards
- **TypeScript**: Strict mode enabled, no any types
- **Testing**: TDD approach with Jest, 90% coverage minimum
- **Linting**: ESLint + Prettier configured with pre-commit hooks
- **Documentation**: JSDoc for complex functions, README for modules
- **Error handling**: Centralized error handling with proper logging
- **API design**: RESTful with OpenAPI documentation

## 🐝 SWARM ORCHESTRATION

### Sub-Agent Specialization
Configure specialized agents in `.claude/agents/`:

**database-architect**
- Design and optimize MySQL schemas
- Create migration scripts and indexes
- Implement data integrity constraints
- Design efficient query patterns

**api-developer**
- Build NestJS modules and controllers
- Implement authentication/authorization guards
- Create DTOs with validation
- Generate OpenAPI documentation

**frontend-engineer**
- Develop React components with TypeScript
- Implement state management patterns
- Create responsive UI with Tailwind
- Build interactive dashboards

**security-auditor**
- Review code for vulnerabilities
- Implement RBAC patterns
- Audit dependencies for security issues
- Ensure OWASP compliance

**devops-specialist**
- Configure Docker containers
- Set up Kubernetes deployments
- Implement CI/CD pipelines
- Configure monitoring and alerting

**test-engineer**
- Write comprehensive unit tests
- Create integration test suites
- Implement E2E testing with Cypress
- Maintain test coverage metrics

### Parallel Development Strategy
- Use Task tool for parallel agent execution
- Frontend and backend development in parallel branches
- Shared API contracts in `/libs/shared-types/`
- Mock servers for independent development
- Regular integration testing in staging

## 🧠 MEMORY MANAGEMENT

### Context Storage
- Architecture decisions in `/docs/architecture/ADR-*.md`
- API specifications in `/docs/api/openapi.yaml`
- Decision logs in `.claude/memory/decisions.md`
- Performance benchmarks in `/docs/performance/`
- Security audit reports in `/security/audits/`

### Progress Tracking
Maintain task list in `.claude/memory/tasks.md`:
```markdown
## Current Sprint
- [ ] Database schema design
- [ ] Authentication service setup
- [ ] Core API endpoints
- [ ] Frontend layout components
- [ ] Docker configuration

## In Progress
- ⏳ User authentication flow (api-developer)
- ⏳ Database migrations (database-architect)

## Completed
- ✅ Project structure setup
- ✅ Development environment configuration
```

## 🏗️ IMPLEMENTATION PHASES

### Phase 1: Foundation Setup (Week 1-2)
**Priority Tasks:**
1. **Project Initialization**
   - Create monorepo structure with Nx
   - Configure TypeScript, ESLint, Prettier
   - Set up Git hooks with Husky
   - Initialize Docker development environment

2. **Database Design**
   ```sql
   -- Core tables to implement
   employees, departments, positions, users, roles, permissions,
   role_permissions, user_roles, sessions, audit_logs
   ```

3. **Authentication Service**
   - JWT implementation with refresh tokens
   - OAuth2 integration (Google, Microsoft)
   - Session management with Redis
   - Password policies and MFA setup

4. **Base Infrastructure**
   - Docker Compose for local development
   - Basic CI/CD with GitHub Actions
   - Environment configuration management
   - Logging and error tracking setup

### Phase 2: Core PMS Features (Week 3-6)
**Goal Management Module:**
```typescript
// Entities to implement
Goal, Objective, KeyResult, GoalProgress, GoalAlignment
// Features
- SMART goals creation
- OKR management
- Goal cascading
- Progress tracking
- Goal analytics dashboard
```

**Review Management Module:**
```typescript
// Entities to implement
ReviewCycle, PerformanceReview, ReviewQuestion, ReviewResponse,
ReviewTemplate, ReviewWorkflow, CalibrationSession
// Features
- Review cycle configuration
- Multi-stage review workflow
- Review form builder
- Calibration tools
- Performance analytics
```

**Competency Framework:**
```typescript
// Entities to implement
Competency, CompetencyCategory, CompetencyLevel, 
RoleCompetency, EmployeeCompetency, SkillAssessment
// Features
- Competency library management
- Role-competency mapping
- Skill gap analysis
- Development recommendations
```

### Phase 3: Advanced Features (Week 7-10)
**360 Feedback System:**
- Feedback request management
- Anonymous feedback collection
- Multi-rater assessments
- Feedback analytics and reports

**Performance Analytics:**
- Individual performance dashboards
- Team performance metrics
- Department-level analytics
- Predictive analytics with ML integration

**Development Planning:**
- Individual Development Plans (IDP)
- Training recommendations
- Career path mapping
- Succession planning tools

### Phase 4: Production Readiness (Week 11-12)
**Security Hardening:**
- OWASP Top 10 compliance audit
- Penetration testing
- Security headers implementation
- Data encryption at rest and in transit

**Performance Optimization:**
- Database query optimization
- Redis caching implementation
- CDN configuration
- Load testing and tuning

**Deployment Pipeline:**
- Kubernetes manifests with Helm charts
- Blue-green deployment setup
- Monitoring and alerting configuration
- Disaster recovery procedures

## 🚀 COMMANDS

### Development Commands
```bash
# Development
npm run dev                    # Start all services in development
npm run dev:backend           # Start backend only
npm run dev:frontend          # Start frontend only

# Testing
npm run test                  # Run all tests
npm run test:unit            # Unit tests only
npm run test:integration     # Integration tests
npm run test:e2e             # End-to-end tests
npm run test:coverage        # Generate coverage report

# Building
npm run build                # Build all applications
npm run build:docker         # Build Docker images
npm run build:production     # Production optimized build

# Database
npm run db:migrate           # Run database migrations
npm run db:seed              # Seed development data
npm run db:reset             # Reset database

# Code Quality
npm run lint                 # Run ESLint
npm run format               # Format with Prettier
npm run type-check           # TypeScript type checking
npm run security-check       # Security vulnerability scan
```

### Custom Commands
Create in `.claude/commands/`:
- `setup-feature.md` - Initialize new feature module
- `deploy-staging.md` - Deploy to staging environment
- `create-migration.md` - Generate database migration
- `generate-api-client.md` - Generate TypeScript API client
- `security-audit.md` - Run comprehensive security checks

## 🔒 SECURITY & COMPLIANCE

### Security Requirements
- **Authentication**: JWT with 15-minute access tokens, 7-day refresh tokens
- **Authorization**: RBAC with hierarchical roles and dynamic permissions
- **Data Protection**: AES-256 encryption, TLS 1.3 for transit
- **Audit Logging**: Comprehensive logs for all data access and modifications
- **Session Management**: Redis-based sessions with automatic expiration
- **Password Policy**: 12+ characters, complexity requirements, history tracking

### Compliance Standards
- **GDPR**: Data privacy, right to erasure, consent management
- **SOX**: Financial data integrity for compensation management
- **ISO 27001**: Information security management
- **OWASP**: Top 10 security vulnerabilities prevention

### RBAC Implementation
```typescript
// Role hierarchy
enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  HR_MANAGER = 'hr_manager',
  DEPARTMENT_MANAGER = 'dept_manager',
  TEAM_LEAD = 'team_lead',
  EMPLOYEE = 'employee'
}

// Permission structure
interface Permission {
  resource: string;  // e.g., 'reviews', 'goals', 'users'
  action: string;    // e.g., 'create', 'read', 'update', 'delete'
  scope?: string;    // e.g., 'own', 'team', 'department', 'all'
}
```

## 🧪 TESTING STRATEGY

### Test Coverage Requirements
- **Unit Tests**: 90% coverage for business logic
- **Integration Tests**: 80% coverage for API endpoints
- **E2E Tests**: Critical user journeys (login, review submission, goal creation)
- **Performance Tests**: API response time < 200ms p95
- **Security Tests**: OWASP ZAP scanning, dependency audits

### Test Organization
```
__tests__/
├── unit/           # Unit tests for services and utilities
├── integration/    # API endpoint tests
├── e2e/           # Cypress end-to-end tests
├── performance/   # Load and stress tests
└── security/      # Security-specific tests
```

## 📊 DATABASE SCHEMA

### Core Schema Design
```sql
-- Users and Authentication
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    mfa_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employee Information
CREATE TABLE employees (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNIQUE,
    employee_number VARCHAR(20) UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    department_id BIGINT,
    position_id BIGINT,
    manager_id BIGINT,
    hire_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Performance Reviews
CREATE TABLE performance_reviews (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    employee_id BIGINT,
    cycle_id BIGINT,
    review_stage ENUM('self', 'manager', 'skip_level', 'hr'),
    status ENUM('draft', 'submitted', 'approved'),
    overall_rating DECIMAL(3,2),
    submitted_at TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- Goals and OKRs
CREATE TABLE objectives (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    employee_id BIGINT,
    title VARCHAR(255),
    description TEXT,
    start_date DATE,
    end_date DATE,
    weight DECIMAL(3,2),
    status ENUM('draft', 'active', 'completed'),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
```

## 🌊 API DESIGN PATTERNS

### RESTful Endpoints Structure
```
/api/v1/
├── /auth
│   ├── POST   /login
│   ├── POST   /refresh
│   ├── POST   /logout
│   └── GET    /profile
├── /users
│   ├── GET    /           # List users (paginated)
│   ├── GET    /:id        # Get user details
│   ├── POST   /           # Create user
│   ├── PUT    /:id        # Update user
│   └── DELETE /:id        # Delete user
├── /reviews
│   ├── GET    /cycles     # List review cycles
│   ├── GET    /:id        # Get review details
│   ├── POST   /submit     # Submit review
│   └── PUT    /:id/approve # Approve review
├── /goals
│   ├── GET    /           # List goals
│   ├── POST   /           # Create goal
│   ├── PUT    /:id        # Update goal
│   └── POST   /:id/progress # Update progress
```

### Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata?: {
    timestamp: string;
    version: string;
    pagination?: PaginationInfo;
  };
}
```

## 🐳 DEPLOYMENT CONFIGURATION

### Docker Setup
```dockerfile
# Multi-stage Dockerfile for production
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS dev-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM dev-deps AS build
COPY . .
RUN npm run build

FROM node:20-alpine AS production
RUN addgroup -g 1001 -S nodejs && adduser -S pms -u 1001
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER pms
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### Kubernetes Configuration
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pms-backend
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
  template:
    spec:
      containers:
      - name: pms-backend
        image: pms/backend:latest
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
```

## MCP INTEGRATIONS

### MCP Server Configuration
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-mysql"],
      "env": {
        "MYSQL_CONNECTION_STRING": "${DATABASE_URL}"
      }
    },
    "aws": {
      "command": "npx",
      "args": ["-y", "aws-mcp-server"],
      "env": {
        "AWS_ACCESS_KEY_ID": "${AWS_KEY}",
        "AWS_SECRET_ACCESS_KEY": "${AWS_SECRET}"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "slack-mcp-server"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_TOKEN}"
      }
    }
  }
}
```

## PLAN MODE USAGE

### Planning Strategy
When tackling complex features, use Plan Mode (Shift+Tab twice):

1. **Architecture Planning** (Opus 4.1):
   - Analyze requirements and constraints
   - Design system architecture
   - Plan database schema changes
   - Break down into implementable tasks

2. **Implementation** (Auto Mode - Sonnet 4):
   - Execute planned tasks sequentially
   - Write code following patterns
   - Run tests and validate
   - Handle debugging and optimization

### Task Breakdown Example
```markdown
## Feature: 360-Degree Feedback Implementation

### Planning Phase (Plan Mode):
1. Analyze feedback collection requirements
2. Design database schema for feedback
3. Plan API endpoints and workflows
4. Design UI components and flows
5. Identify integration points

### Implementation Phase:
1. Create database migrations
2. Implement NestJS feedback module
3. Build API endpoints with guards
4. Create React feedback components
5. Integrate with notification service
6. Write comprehensive tests
7. Document API and usage
```

## MONITORING & OBSERVABILITY

### Logging Strategy
- **Application logs**: Winston with structured logging
- **Audit logs**: Separate audit trail for compliance
- **Error tracking**: Sentry integration with alerts
- **Performance monitoring**: APM with New Relic
- **Infrastructure logs**: ELK stack for aggregation

### Metrics Collection
```typescript
// Key metrics to track
interface PerformanceMetrics {
  apiResponseTime: number;      // Target: < 200ms p95
  databaseQueryTime: number;    // Target: < 100ms p95
  errorRate: number;            // Target: < 0.1%
  activeUsers: number;          // Real-time monitoring
  requestsPerSecond: number;    // Capacity planning
}
```

### Alerting Rules
- API response time > 500ms for 5 minutes
- Error rate > 1% for 10 minutes
- Database connection pool exhaustion
- Memory usage > 80% sustained
- Failed authentication attempts > 10 per minute

## DEVELOPMENT WORKFLOW

### Feature Development Process
1. **Planning**:
   - Create feature branch from develop
   - Use Plan Mode for architecture design
   - Create task breakdown in todo list
   
2. **Implementation**:
   - TDD approach with failing tests first
   - Implement feature following patterns
   - Regular commits with conventional format
   - Update documentation as you code

3. **Testing**:
   - Unit tests for all new code
   - Integration tests for API endpoints
   - E2E tests for user workflows
   - Security scanning for vulnerabilities

4. **Review**:
   - Create pull request with template
   - Request reviews from team
   - Address feedback and iterate
   - Ensure all checks pass

5. **Deployment**:
   - Merge to develop for staging
   - Automated deployment to staging
   - QA verification and approval
   - Production deployment with monitoring

### Daily Development Commands
```bash
# Start your day
git fetch --all
git checkout develop
git pull origin develop
git checkout -b feature/PMS-XXX-description

# During development
npm run dev                  # Start development servers
npm run test:watch           # Run tests in watch mode
npm run lint:fix            # Fix linting issues

# Before committing
npm run test                # Ensure tests pass
npm run lint                # Check code style
npm run build               # Verify build succeeds

# Commit changes
git add .
git commit -m "feat(module): implement feature"
git push origin feature/PMS-XXX-description
```

## SUCCESS CRITERIA

### Technical Requirements
- ✅ 90%+ test coverage across all modules
- ✅ API response time < 200ms for 95% of requests
- ✅ Zero critical security vulnerabilities
- ✅ 99.9% uptime SLA
- ✅ Supports 10,000+ concurrent users

### Feature Completeness
- ✅ Complete authentication system with SSO
- ✅ Full goal and OKR management
- ✅ Comprehensive review workflow
- ✅ 360-degree feedback system
- ✅ Advanced analytics and reporting
- ✅ Mobile-responsive UI
- ✅ Real-time notifications
- ✅ Audit trail for compliance

### Quality Standards
- ✅ TypeScript strict mode compliance
- ✅ No ESLint errors or warnings
- ✅ Comprehensive API documentation
- ✅ User documentation complete
- ✅ Performance benchmarks met
- ✅ Security audit passed

---

## IMPORTANT NOTES

1. **Always prioritize security** - Never compromise on authentication, authorization, or data protection
2. **Test-driven development** - Write tests before implementation
3. **Documentation as code** - Keep docs updated with code changes
4. **Performance matters** - Profile and optimize regularly
5. **User experience first** - Focus on intuitive, responsive interfaces
6. **Scalability by design** - Build for growth from day one
7. **Continuous improvement** - Regular refactoring and optimization

Remember: This is an enterprise system handling sensitive employee data. Quality, security, and reliability are non-negotiable. When in doubt, choose the more secure, more tested, more documented approach.