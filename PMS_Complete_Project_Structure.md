# Performance Management System - Complete Integrated Project Structure

## Root Project Structure

```
pms-ecosystem/
├── README.md
├── docker-compose.yml
├── .env.example
├── .gitignore
├── package.json (root workspace)
├── kubernetes/
│   ├── configmaps/
│   ├── deployments/
│   ├── services/
│   └── ingress/
├── scripts/
│   ├── setup.sh
│   ├── seed-data.sh
│   └── backup.sh
├── docs/
│   ├── api/
│   ├── database/
│   └── deployment/
│
├── common-auth-service/          # Shared Authentication Service
│   ├── backend/
│   └── frontend/
│
├── pms-service/                  # Performance Management Service  
│   ├── backend/
│   └── frontend/
│
├── tour-service/                 # Future Tour Management Service
│   ├── backend/
│   └── frontend/
│
├── shared/                       # Shared libraries and utilities
│   ├── types/
│   ├── utils/
│   ├── constants/
│   └── validations/
│
└── infrastructure/               # Infrastructure as Code
    ├── terraform/
    ├── ansible/
    └── monitoring/
```

---

## 1. Common Authentication Service Structure

### Backend (NestJS)
```
common-auth-service/
├── backend/
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   │
│   │   ├── config/                    # Configuration
│   │   │   ├── database.config.ts
│   │   │   ├── jwt.config.ts
│   │   │   ├── redis.config.ts
│   │   │   └── email.config.ts
│   │   │
│   │   ├── modules/
│   │   │   ├── auth/                  # Authentication Module
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── strategies/
│   │   │   │   │   ├── jwt.strategy.ts
│   │   │   │   │   ├── local.strategy.ts
│   │   │   │   │   └── refresh.strategy.ts
│   │   │   │   ├── guards/
│   │   │   │   │   ├── jwt.guard.ts
│   │   │   │   │   ├── roles.guard.ts
│   │   │   │   │   └── permissions.guard.ts
│   │   │   │   └── dto/
│   │   │   │       ├── login.dto.ts
│   │   │   │       ├── register.dto.ts
│   │   │   │       └── refresh.dto.ts
│   │   │   │
│   │   │   ├── users/                 # User Management
│   │   │   │   ├── users.module.ts
│   │   │   │   ├── users.controller.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── user.entity.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── create-user.dto.ts
│   │   │   │   │   ├── update-user.dto.ts
│   │   │   │   │   └── user-response.dto.ts
│   │   │   │   └── repositories/
│   │   │   │       └── users.repository.ts
│   │   │   │
│   │   │   ├── roles/                 # Role Management
│   │   │   │   ├── roles.module.ts
│   │   │   │   ├── roles.controller.ts
│   │   │   │   ├── roles.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── role.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-role.dto.ts
│   │   │   │       └── update-role.dto.ts
│   │   │   │
│   │   │   ├── departments/           # Department Management
│   │   │   │   ├── departments.module.ts
│   │   │   │   ├── departments.controller.ts
│   │   │   │   ├── departments.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── department.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-department.dto.ts
│   │   │   │       └── update-department.dto.ts
│   │   │   │
│   │   │   ├── domains/               # Domain Management
│   │   │   │   ├── domains.module.ts
│   │   │   │   ├── domains.controller.ts
│   │   │   │   ├── domains.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── domain.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-domain.dto.ts
│   │   │   │       └── update-domain.dto.ts
│   │   │   │
│   │   │   ├── projects/              # Project Management
│   │   │   │   ├── projects.module.ts
│   │   │   │   ├── projects.controller.ts
│   │   │   │   ├── projects.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── project.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-project.dto.ts
│   │   │   │       └── update-project.dto.ts
│   │   │   │
│   │   │   ├── organizations/         # Organization Management
│   │   │   │   ├── organizations.module.ts
│   │   │   │   ├── organizations.controller.ts
│   │   │   │   ├── organizations.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   ├── organization.entity.ts
│   │   │   │   │   └── operating-unit.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-org.dto.ts
│   │   │   │       └── create-opr.dto.ts
│   │   │   │
│   │   │   ├── sessions/              # Session Management
│   │   │   │   ├── sessions.module.ts
│   │   │   │   ├── sessions.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── session.entity.ts
│   │   │   │   └── dto/
│   │   │   │       └── session-info.dto.ts
│   │   │   │
│   │   │   └── entities/              # Entity Management
│   │   │       ├── entities.module.ts
│   │   │       ├── entities.controller.ts
│   │   │       ├── entities.service.ts
│   │   │       ├── entities/
│   │   │       │   └── entity.entity.ts
│   │   │       └── dto/
│   │   │           ├── create-entity.dto.ts
│   │   │           └── update-entity.dto.ts
│   │   │
│   │   ├── common/                    # Shared Components
│   │   │   ├── decorators/
│   │   │   │   ├── roles.decorator.ts
│   │   │   │   ├── permissions.decorator.ts
│   │   │   │   └── current-user.decorator.ts
│   │   │   ├── filters/
│   │   │   │   ├── http-exception.filter.ts
│   │   │   │   └── validation.filter.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── logging.interceptor.ts
│   │   │   │   └── timeout.interceptor.ts
│   │   │   ├── pipes/
│   │   │   │   └── validation.pipe.ts
│   │   │   ├── middlewares/
│   │   │   │   ├── cors.middleware.ts
│   │   │   │   └── logger.middleware.ts
│   │   │   └── types/
│   │   │       ├── auth.types.ts
│   │   │       ├── user.types.ts
│   │   │       └── common.types.ts
│   │   │
│   │   ├── database/                  # Database Configuration
│   │   │   ├── database.module.ts
│   │   │   ├── migrations/
│   │   │   │   ├── 001_create_users.ts
│   │   │   │   ├── 002_create_roles.ts
│   │   │   │   ├── 003_create_departments.ts
│   │   │   │   ├── 004_create_domains.ts
│   │   │   │   ├── 005_create_projects.ts
│   │   │   │   ├── 006_create_organizations.ts
│   │   │   │   └── 007_create_sessions.ts
│   │   │   ├── seeds/
│   │   │   │   ├── user.seed.ts
│   │   │   │   ├── role.seed.ts
│   │   │   │   ├── department.seed.ts
│   │   │   │   └── domain.seed.ts
│   │   │   └── factories/
│   │   │       ├── user.factory.ts
│   │   │       └── role.factory.ts
│   │   │
│   │   └── utils/                     # Utilities
│   │       ├── encryption.util.ts
│   │       ├── validation.util.ts
│   │       ├── date.util.ts
│   │       └── email.util.ts
│   │
│   ├── test/                         # Testing
│   │   ├── unit/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   └── roles/
│   │   ├── integration/
│   │   │   ├── auth.e2e-spec.ts
│   │   │   └── users.e2e-spec.ts
│   │   └── fixtures/
│   │       ├── users.fixture.ts
│   │       └── auth.fixture.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   ├── .env.example
│   ├── Dockerfile
│   └── docker-compose.yml
```

### Frontend (React/Next.js)
```
common-auth-service/
└── frontend/
    ├── src/
    │   ├── app/                      # Next.js App Router
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── globals.css
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   ├── register/
    │   │   │   └── page.tsx
    │   │   ├── dashboard/
    │   │   │   ├── page.tsx
    │   │   │   └── layout.tsx
    │   │   ├── users/
    │   │   │   ├── page.tsx
    │   │   │   ├── [id]/
    │   │   │   │   └── page.tsx
    │   │   │   └── create/
    │   │   │       └── page.tsx
    │   │   ├── roles/
    │   │   │   ├── page.tsx
    │   │   │   └── [id]/
    │   │   │       └── page.tsx
    │   │   ├── departments/
    │   │   │   ├── page.tsx
    │   │   │   └── [id]/
    │   │   │       └── page.tsx
    │   │   ├── domains/
    │   │   │   ├── page.tsx
    │   │   │   └── [id]/
    │   │   │       └── page.tsx
    │   │   ├── projects/
    │   │   │   ├── page.tsx
    │   │   │   └── [id]/
    │   │   │       └── page.tsx
    │   │   └── profile/
    │   │       └── page.tsx
    │   │
    │   ├── components/               # Reusable Components
    │   │   ├── ui/                   # Base UI Components
    │   │   │   ├── Button.tsx
    │   │   │   ├── Input.tsx
    │   │   │   ├── Modal.tsx
    │   │   │   ├── Table.tsx
    │   │   │   ├── Card.tsx
    │   │   │   ├── Loading.tsx
    │   │   │   └── index.ts
    │   │   ├── auth/                 # Auth Components
    │   │   │   ├── LoginForm.tsx
    │   │   │   ├── RegisterForm.tsx
    │   │   │   ├── ForgotPassword.tsx
    │   │   │   ├── ResetPassword.tsx
    │   │   │   └── AuthGuard.tsx
    │   │   ├── layout/               # Layout Components
    │   │   │   ├── Header.tsx
    │   │   │   ├── Sidebar.tsx
    │   │   │   ├── Footer.tsx
    │   │   │   ├── Navigation.tsx
    │   │   │   └── MainLayout.tsx
    │   │   ├── users/                # User Management
    │   │   │   ├── UserList.tsx
    │   │   │   ├── UserCard.tsx
    │   │   │   ├── UserForm.tsx
    │   │   │   ├── UserProfile.tsx
    │   │   │   └── UserSearch.tsx
    │   │   ├── roles/                # Role Management
    │   │   │   ├── RoleList.tsx
    │   │   │   ├── RoleCard.tsx
    │   │   │   ├── RoleForm.tsx
    │   │   │   └── PermissionMatrix.tsx
    │   │   ├── departments/          # Department Management
    │   │   │   ├── DepartmentList.tsx
    │   │   │   ├── DepartmentCard.tsx
    │   │   │   ├── DepartmentForm.tsx
    │   │   │   └── DepartmentTree.tsx
    │   │   ├── projects/             # Project Management
    │   │   │   ├── ProjectList.tsx
    │   │   │   ├── ProjectCard.tsx
    │   │   │   ├── ProjectForm.tsx
    │   │   │   └── ProjectTimeline.tsx
    │   │   └── common/               # Common Components
    │   │       ├── DataTable.tsx
    │   │       ├── SearchBar.tsx
    │   │       ├── FilterPanel.tsx
    │   │       ├── Pagination.tsx
    │   │       ├── ConfirmDialog.tsx
    │   │       └── ErrorBoundary.tsx
    │   │
    │   ├── hooks/                    # Custom Hooks
    │   │   ├── useAuth.ts
    │   │   ├── useUsers.ts
    │   │   ├── useRoles.ts
    │   │   ├── useDepartments.ts
    │   │   ├── useProjects.ts
    │   │   ├── useApi.ts
    │   │   ├── useLocalStorage.ts
    │   │   └── useDebounce.ts
    │   │
    │   ├── services/                 # API Services
    │   │   ├── api.ts
    │   │   ├── auth.service.ts
    │   │   ├── users.service.ts
    │   │   ├── roles.service.ts
    │   │   ├── departments.service.ts
    │   │   ├── projects.service.ts
    │   │   └── upload.service.ts
    │   │
    │   ├── store/                    # State Management (Zustand)
    │   │   ├── authStore.ts
    │   │   ├── userStore.ts
    │   │   ├── roleStore.ts
    │   │   ├── departmentStore.ts
    │   │   ├── projectStore.ts
    │   │   └── index.ts
    │   │
    │   ├── types/                    # TypeScript Types
    │   │   ├── auth.types.ts
    │   │   ├── user.types.ts
    │   │   ├── role.types.ts
    │   │   ├── department.types.ts
    │   │   ├── project.types.ts
    │   │   ├── api.types.ts
    │   │   └── common.types.ts
    │   │
    │   ├── utils/                    # Utilities
    │   │   ├── constants.ts
    │   │   ├── helpers.ts
    │   │   ├── validation.ts
    │   │   ├── formatters.ts
    │   │   ├── date.utils.ts
    │   │   └── auth.utils.ts
    │   │
    │   ├── styles/                   # Styling
    │   │   ├── globals.css
    │   │   ├── components.css
    │   │   └── auth.css
    │   │
    │   └── lib/                      # Configuration
    │       ├── auth.config.ts
    │       ├── api.config.ts
    │       └── next-auth.config.ts
    │
    ├── public/
    │   ├── images/
    │   ├── icons/
    │   └── favicon.ico
    │
    ├── package.json
    ├── tsconfig.json
    ├── next.config.js
    ├── tailwind.config.js
    ├── .env.local.example
    └── Dockerfile
```

---

## 2. PMS Service Structure

### Backend (NestJS)
```
pms-service/
├── backend/
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   │
│   │   ├── config/                    # Configuration
│   │   │   ├── database.config.ts
│   │   │   ├── redis.config.ts
│   │   │   ├── s3.config.ts
│   │   │   └── notification.config.ts
│   │   │
│   │   ├── modules/
│   │   │   ├── auth/                  # Auth Integration
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── guards/
│   │   │   │   │   ├── jwt.guard.ts
│   │   │   │   │   ├── roles.guard.ts
│   │   │   │   │   └── permissions.guard.ts
│   │   │   │   └── strategies/
│   │   │   │       └── jwt.strategy.ts
│   │   │   │
│   │   │   ├── reviews/               # Review Management
│   │   │   │   ├── reviews.module.ts
│   │   │   │   ├── reviews.controller.ts
│   │   │   │   ├── reviews.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   ├── review-header.entity.ts
│   │   │   │   │   ├── review-detail.entity.ts
│   │   │   │   │   ├── review-comment.entity.ts
│   │   │   │   │   └── review-attachment.entity.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── create-review.dto.ts
│   │   │   │   │   ├── self-assessment.dto.ts
│   │   │   │   │   ├── r1-review.dto.ts
│   │   │   │   │   ├── r2-review.dto.ts
│   │   │   │   │   └── review-response.dto.ts
│   │   │   │   └── repositories/
│   │   │   │       ├── reviews.repository.ts
│   │   │   │       └── review-details.repository.ts
│   │   │   │
│   │   │   ├── review-cycles/         # Review Cycle Management
│   │   │   │   ├── review-cycles.module.ts
│   │   │   │   ├── review-cycles.controller.ts
│   │   │   │   ├── review-cycles.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   ├── review-cycle.entity.ts
│   │   │   │   │   ├── financial-year.entity.ts
│   │   │   │   │   └── review-schedule.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-cycle.dto.ts
│   │   │   │       ├── update-cycle.dto.ts
│   │   │   │       └── cycle-response.dto.ts
│   │   │   │
│   │   │   ├── kras/                  # KRA Management
│   │   │   │   ├── kras.module.ts
│   │   │   │   ├── kras.controller.ts
│   │   │   │   ├── kras.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   ├── kra.entity.ts
│   │   │   │   │   ├── kra-template.entity.ts
│   │   │   │   │   ├── kra-template-detail.entity.ts
│   │   │   │   │   └── kra-category.entity.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── create-kra.dto.ts
│   │   │   │   │   ├── create-template.dto.ts
│   │   │   │   │   └── kra-assignment.dto.ts
│   │   │   │   └── repositories/
│   │   │   │       ├── kras.repository.ts
│   │   │   │       └── templates.repository.ts
│   │   │   │
│   │   │   ├── goals/                 # Enhanced Goal Management
│   │   │   │   ├── goals.module.ts
│   │   │   │   ├── goals.controller.ts
│   │   │   │   ├── goals.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   ├── goal.entity.ts
│   │   │   │   │   ├── goal-category.entity.ts
│   │   │   │   │   ├── goal-template.entity.ts
│   │   │   │   │   ├── goal-progress.entity.ts
│   │   │   │   │   ├── goal-evidence.entity.ts
│   │   │   │   │   ├── goal-achievement-history.entity.ts
│   │   │   │   │   └── goal-kra-mapping.entity.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── create-goal.dto.ts
│   │   │   │   │   ├── update-goal-progress.dto.ts
│   │   │   │   │   ├── goal-evidence.dto.ts
│   │   │   │   │   └── goal-response.dto.ts
│   │   │   │   └── repositories/
│   │   │   │       ├── goals.repository.ts
│   │   │   │       ├── goal-progress.repository.ts
│   │   │   │       └── goal-evidence.repository.ts
│   │   │   │
│   │   │   ├── analytics/             # Analytics & Reporting
│   │   │   │   ├── analytics.module.ts
│   │   │   │   ├── analytics.controller.ts
│   │   │   │   ├── analytics.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   ├── performance-summary.entity.ts
│   │   │   │   │   ├── performance-history.entity.ts
│   │   │   │   │   ├── goal-analytics.entity.ts
│   │   │   │   │   └── zone-assignment.entity.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── analytics-filter.dto.ts
│   │   │   │   │   ├── performance-report.dto.ts
│   │   │   │   │   └── goal-analytics.dto.ts
│   │   │   │   └── services/
│   │   │   │       ├── performance.service.ts
│   │   │   │       ├── goal-analytics.service.ts
│   │   │   │       └── zone-calculation.service.ts
│   │   │   │
│   │   │   ├── notifications/         # Notification System
│   │   │   │   ├── notifications.module.ts
│   │   │   │   ├── notifications.controller.ts
│   │   │   │   ├── notifications.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   ├── notification.entity.ts
│   │   │   │   │   ├── reminder-queue.entity.ts
│   │   │   │   │   └── escalation-log.entity.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── create-notification.dto.ts
│   │   │   │   │   ├── send-email.dto.ts
│   │   │   │   │   └── notification-response.dto.ts
│   │   │   │   └── services/
│   │   │   │       ├── email.service.ts
│   │   │   │       ├── sms.service.ts
│   │   │   │       └── push.service.ts
│   │   │   │
│   │   │   ├── reviewers/             # Reviewer Management
│   │   │   │   ├── reviewers.module.ts
│   │   │   │   ├── reviewers.controller.ts
│   │   │   │   ├── reviewers.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── reviewer-mapping.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── assign-reviewer.dto.ts
│   │   │   │       └── reviewer-response.dto.ts
│   │   │   │
│   │   │   ├── zones/                 # Performance Zones
│   │   │   │   ├── zones.module.ts
│   │   │   │   ├── zones.controller.ts
│   │   │   │   ├── zones.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   ├── zone-config.entity.ts
│   │   │   │   │   └── zone-assignment-log.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── zone-config.dto.ts
│   │   │   │       └── zone-calculation.dto.ts
│   │   │   │
│   │   │   ├── uploads/               # File Management
│   │   │   │   ├── uploads.module.ts
│   │   │   │   ├── uploads.controller.ts
│   │   │   │   ├── uploads.service.ts
│   │   │   │   ├── entities/
│   │   │   │   │   └── file-attachment.entity.ts
│   │   │   │   └── dto/
│   │   │   │       ├── upload-file.dto.ts
│   │   │   │       └── file-response.dto.ts
│   │   │   │
│   │   │   └── reports/               # Report Generation
│   │   │       ├── reports.module.ts
│   │   │       ├── reports.controller.ts
│   │   │       ├── reports.service.ts
│   │   │       ├── dto/
│   │   │       │   ├── report-filter.dto.ts
│   │   │       │   └── report-response.dto.ts
│   │   │       └── templates/
│   │   │           ├── performance-report.template.ts
│   │   │           ├── goal-report.template.ts
│   │   │           └── department-report.template.ts
│   │   │
│   │   ├── common/                    # Shared Components
│   │   │   ├── decorators/
│   │   │   │   ├── current-user.decorator.ts
│   │   │   │   ├── roles.decorator.ts
│   │   │   │   └── permissions.decorator.ts
│   │   │   ├── filters/
│   │   │   │   ├── http-exception.filter.ts
│   │   │   │   └── validation.filter.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── logging.interceptor.ts
│   │   │   │   ├── transform.interceptor.ts
│   │   │   │   └── cache.interceptor.ts
│   │   │   ├── pipes/
│   │   │   │   ├── validation.pipe.ts
│   │   │   │   └── parse-object-id.pipe.ts
│   │   │   ├── middlewares/
│   │   │   │   ├── cors.middleware.ts
│   │   │   │   └── request-logging.middleware.ts
│   │   │   └── types/
│   │   │       ├── review.types.ts
│   │   │       ├── goal.types.ts
│   │   │       ├── analytics.types.ts
│   │   │       └── common.types.ts
│   │   │
│   │   ├── database/                  # Database Configuration
│   │   │   ├── database.module.ts
│   │   │   ├── migrations/
│   │   │   │   ├── 001_create_financial_years.ts
│   │   │   │   ├── 002_create_review_cycles.ts
│   │   │   │   ├── 003_create_kras.ts
│   │   │   │   ├── 004_create_kra_templates.ts
│   │   │   │   ├── 005_create_goals.ts
│   │   │   │   ├── 006_create_goal_categories.ts
│   │   │   │   ├── 007_create_goal_templates.ts
│   │   │   │   ├── 008_create_reviews.ts
│   │   │   │   ├── 009_create_review_details.ts
│   │   │   │   ├── 010_create_goal_progress.ts
│   │   │   │   ├── 011_create_goal_evidence.ts
│   │   │   │   ├── 012_create_reviewer_mappings.ts
│   │   │   │   ├── 013_create_notifications.ts
│   │   │   │   ├── 014_create_performance_zones.ts
│   │   │   │   ├── 015_create_analytics_tables.ts
│   │   │   │   └── 016_create_indexes.ts
│   │   │   ├── seeds/
│   │   │   │   ├── financial-year.seed.ts
│   │   │   │   ├── kra.seed.ts
│   │   │   │   ├── goal-category.seed.ts
│   │   │   │   ├── goal-template.seed.ts
│   │   │   │   └── zone-config.seed.ts
│   │   │   └── factories/
│   │   │       ├── review.factory.ts
│   │   │       ├── goal.factory.ts
│   │   │       └── kra.factory.ts
│   │   │
│   │   ├── jobs/                      # Background Jobs
│   │   │   ├── jobs.module.ts
│   │   │   ├── processors/
│   │   │   │   ├── review-reminder.processor.ts
│   │   │   │   ├── goal-progress.processor.ts
│   │   │   │   ├── zone-calculation.processor.ts
│   │   │   │   └── report-generation.processor.ts
│   │   │   └── schedulers/
│   │   │       ├── daily-reminder.scheduler.ts
│   │   │       ├── weekly-report.scheduler.ts
│   │   │       └── monthly-analytics.scheduler.ts
│   │   │
│   │   └── utils/                     # Utilities
│   │       ├── calculation.util.ts
│   │       ├── date.util.ts
│   │       ├── email-template.util.ts
│   │       ├── report.util.ts
│   │       └── zone.util.ts
│   │
│   ├── test/                         # Testing
│   │   ├── unit/
│   │   │   ├── reviews/
│   │   │   ├── goals/
│   │   │   ├── analytics/
│   │   │   └── zones/
│   │   ├── integration/
│   │   │   ├── review-flow.e2e-spec.ts
│   │   │   ├── goal-management.e2e-spec.ts
│   │   │   └── analytics.e2e-spec.ts
│   │   └── fixtures/
│   │       ├── review.fixture.ts
│   │       ├── goal.fixture.ts
│   │       └── kra.fixture.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   ├── .env.example
│   ├── Dockerfile
│   └── docker-compose.yml
```

### Frontend (React/Next.js)
```
pms-service/
└── frontend/
    ├── src/
    │   ├── app/                      # Next.js App Router
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── globals.css
    │   │   ├── dashboard/
    │   │   │   ├── page.tsx
    │   │   │   └── components/
    │   │   │       ├── DashboardOverview.tsx
    │   │   │       ├── PerformanceChart.tsx
    │   │   │       ├── GoalProgress.tsx
    │   │   │       └── RecentActivity.tsx
    │   │   ├── reviews/
    │   │   │   ├── page.tsx
    │   │   │   ├── active/
    │   │   │   │   └── page.tsx
    │   │   │   ├── history/
    │   │   │   │   └── page.tsx
    │   │   │   ├── [reviewId]/
    │   │   │   │   ├── page.tsx
    │   │   │   │   ├── self-assessment/
    │   │   │   │   │   └── page.tsx
    │   │   │   │   ├── r1-review/
    │   │   │   │   │   └── page.tsx
    │   │   │   │   └── r2-review/
    │   │   │   │       └── page.tsx
    │   │   │   └── components/
    │   │   │       ├── ReviewMatrix.tsx
    │   │   │       ├── ReviewStatus.tsx
    │   │   │       ├── ReviewComments.tsx
    │   │   │       ├── EvidenceUpload.tsx
    │   │   │       └── ReviewTimeline.tsx
    │   │   ├── goals/
    │   │   │   ├── page.tsx
    │   │   │   ├── my-goals/
    │   │   │   │   └── page.tsx
    │   │   │   ├── create/
    │   │   │   │   └── page.tsx
    │   │   │   ├── [goalId]/
    │   │   │   │   ├── page.tsx
    │   │   │   │   ├── progress/
    │   │   │   │   │   └── page.tsx
    │   │   │   │   └── evidence/
    │   │   │   │       └── page.tsx
    │   │   │   ├── history/
    │   │   │   │   └── page.tsx
    │   │   │   ├── analytics/
    │   │   │   │   └── page.tsx
    │   │   │   └── components/
    │   │   │       ├── GoalList.tsx
    │   │   │       ├── GoalCard.tsx
    │   │   │       ├── GoalForm.tsx
    │   │   │       ├── GoalProgress.tsx
    │   │   │       ├── GoalEvidence.tsx
    │   │   │       ├── GoalHistory.tsx
    │   │   │       ├── GoalKRAMapping.tsx
    │   │   │       └── CrossCycleAnalysis.tsx
    │   │   ├── kras/
    │   │   │   ├── page.tsx
    │   │   │   ├── templates/
    │   │   │   │   └── page.tsx
    │   │   │   ├── [kraId]/
    │   │   │   │   └── page.tsx
    │   │   │   └── components/
    │   │   │       ├── KRAList.tsx
    │   │   │       ├── KRAForm.tsx
    │   │   │       ├── KRATemplate.tsx
    │   │   │       └── KRAMapping.tsx
    │   │   ├── analytics/
    │   │   │   ├── page.tsx
    │   │   │   ├── performance/
    │   │   │   │   └── page.tsx
    │   │   │   ├── goals/
    │   │   │   │   └── page.tsx
    │   │   │   ├── trends/
    │   │   │   │   └── page.tsx
    │   │   │   └── components/
    │   │   │       ├── PerformanceCharts.tsx
    │   │   │       ├── GoalAnalytics.tsx
    │   │   │       ├── TrendAnalysis.tsx
    │   │   │       ├── ZoneDistribution.tsx
    │   │   │       └── ComparativeAnalysis.tsx
    │   │   ├── team/
    │   │   │   ├── page.tsx
    │   │   │   ├── performance/
    │   │   │   │   └── page.tsx
    │   │   │   ├── goals/
    │   │   │   │   └── page.tsx
    │   │   │   ├── reviews/
    │   │   │   │   └── page.tsx
    │   │   │   └── components/
    │   │   │       ├── TeamOverview.tsx
    │   │   │       ├── TeamPerformance.tsx
    │   │   │       ├── TeamGoals.tsx
    │   │   │       └── TeamReviews.tsx
    │   │   ├── admin/
    │   │   │   ├── page.tsx
    │   │   │   ├── cycles/
    │   │   │   │   ├── page.tsx
    │   │   │   │   └── [cycleId]/
    │   │   │   │       └── page.tsx
    │   │   │   ├── zones/
    │   │   │   │   └── page.tsx
    │   │   │   ├── templates/
    │   │   │   │   └── page.tsx
    │   │   │   ├── notifications/
    │   │   │   │   └── page.tsx
    │   │   │   └── components/
    │   │   │       ├── CycleManagement.tsx
    │   │   │       ├── ZoneConfiguration.tsx
    │   │   │       ├── TemplateBuilder.tsx
    │   │   │       └── NotificationSettings.tsx
    │   │   └── reports/
    │   │       ├── page.tsx
    │   │       ├── performance/
    │   │       │   └── page.tsx
    │   │       ├── goals/
    │   │       │   └── page.tsx
    │   │       └── components/
    │   │           ├── ReportBuilder.tsx
    │   │           ├── ReportViewer.tsx
    │   │           └── ExportOptions.tsx
    │   │
    │   ├── components/               # Reusable Components
    │   │   ├── ui/                   # Base UI Components
    │   │   │   ├── Button.tsx
    │   │   │   ├── Input.tsx
    │   │   │   ├── Select.tsx
    │   │   │   ├── TextArea.tsx
    │   │   │   ├── DatePicker.tsx
    │   │   │   ├── Modal.tsx
    │   │   │   ├── Table.tsx
    │   │   │   ├── Card.tsx
    │   │   │   ├── Badge.tsx
    │   │   │   ├── Progress.tsx
    │   │   │   ├── Loading.tsx
    │   │   │   ├── Chart.tsx
    │   │   │   └── FileUpload.tsx
    │   │   ├── layout/               # Layout Components
    │   │   │   ├── Header.tsx
    │   │   │   ├── Sidebar.tsx
    │   │   │   ├── Navigation.tsx
    │   │   │   ├── Breadcrumb.tsx
    │   │   │   ├── Footer.tsx
    │   │   │   └── MainLayout.tsx
    │   │   ├── common/               # Common Components
    │   │   │   ├── DataTable.tsx
    │   │   │   ├── SearchBar.tsx
    │   │   │   ├── FilterPanel.tsx
    │   │   │   ├── Pagination.tsx
    │   │   │   ├── ConfirmDialog.tsx
    │   │   │   ├── NotificationToast.tsx
    │   │   │   └── ErrorBoundary.tsx
    │   │   └── forms/                # Form Components
    │   │       ├── FormField.tsx
    │   │       ├── FormSelect.tsx
    │   │       ├── FormTextArea.tsx
    │   │       ├── FormDatePicker.tsx
    │   │       └── FormFileUpload.tsx
    │   │
    │   ├── hooks/                    # Custom Hooks
    │   │   ├── useAuth.ts
    │   │   ├── useReviews.ts
    │   │   ├── useGoals.ts
    │   │   ├── useKRAs.ts
    │   │   ├── useAnalytics.ts
    │   │   ├── useNotifications.ts
    │   │   ├── useFileUpload.ts
    │   │   ├── usePermissions.ts
    │   │   ├── useApi.ts
    │   │   ├── useLocalStorage.ts
    │   │   ├── useDebounce.ts
    │   │   └── useWebSocket.ts
    │   │
    │   ├── services/                 # API Services
    │   │   ├── api.ts
    │   │   ├── auth.service.ts
    │   │   ├── reviews.service.ts
    │   │   ├── goals.service.ts
    │   │   ├── kras.service.ts
    │   │   ├── analytics.service.ts
    │   │   ├── notifications.service.ts
    │   │   ├── upload.service.ts
    │   │   └── reports.service.ts
    │   │
    │   ├── store/                    # State Management (Zustand)
    │   │   ├── authStore.ts
    │   │   ├── reviewStore.ts
    │   │   ├── goalStore.ts
    │   │   ├── kraStore.ts
    │   │   ├── analyticsStore.ts
    │   │   ├── notificationStore.ts
    │   │   └── index.ts
    │   │
    │   ├── types/                    # TypeScript Types
    │   │   ├── auth.types.ts
    │   │   ├── review.types.ts
    │   │   ├── goal.types.ts
    │   │   ├── kra.types.ts
    │   │   ├── analytics.types.ts
    │   │   ├── notification.types.ts
    │   │   ├── api.types.ts
    │   │   └── common.types.ts
    │   │
    │   ├── utils/                    # Utilities
    │   │   ├── constants.ts
    │   │   ├── helpers.ts
    │   │   ├── validation.ts
    │   │   ├── formatters.ts
    │   │   ├── calculations.ts
    │   │   ├── date.utils.ts
    │   │   ├── file.utils.ts
    │   │   └── chart.utils.ts
    │   │
    │   ├── styles/                   # Styling
    │   │   ├── globals.css
    │   │   ├── components.css
    │   │   ├── dashboard.css
    │   │   ├── reviews.css
    │   │   ├── goals.css
    │   │   └── charts.css
    │   │
    │   └── lib/                      # Configuration
    │       ├── api.config.ts
    │       ├── chart.config.ts
    │       ├── upload.config.ts
    │       └── permissions.config.ts
    │
    ├── public/
    │   ├── images/
    │   ├── icons/
    │   ├── charts/
    │   └── favicon.ico
    │
    ├── package.json
    ├── tsconfig.json
    ├── next.config.js
    ├── tailwind.config.js
    ├── .env.local.example
    └── Dockerfile
```

---

## 3. Shared Libraries Structure

```
shared/
├── types/                           # Common TypeScript Types
│   ├── auth.types.ts
│   ├── user.types.ts
│   ├── api.types.ts
│   ├── response.types.ts
│   └── index.ts
├── utils/                           # Common Utilities
│   ├── validation.utils.ts
│   ├── date.utils.ts
│   ├── crypto.utils.ts
│   ├── format.utils.ts
│   └── index.ts
├── constants/                       # Common Constants
│   ├── api.constants.ts
│   ├── auth.constants.ts
│   ├── error.constants.ts
│   └── index.ts
├── validations/                     # Common Validations
│   ├── auth.validation.ts
│   ├── user.validation.ts
│   ├── common.validation.ts
│   └── index.ts
└── package.json
```

---

## 4. Infrastructure Structure

```
infrastructure/
├── terraform/                       # Infrastructure as Code
│   ├── modules/
│   │   ├── vpc/
│   │   ├── rds/
│   │   ├── redis/
│   │   ├── s3/
│   │   └── kubernetes/
│   ├── environments/
│   │   ├── dev/
│   │   ├── staging/
│   │   └── production/
│   └── main.tf
├── kubernetes/                      # Kubernetes Manifests
│   ├── namespaces/
│   ├── configmaps/
│   ├── secrets/
│   ├── deployments/
│   │   ├── auth-service.yaml
│   │   └── pms-service.yaml
│   ├── services/
│   ├── ingress/
│   └── monitoring/
├── ansible/                         # Configuration Management
│   ├── playbooks/
│   ├── roles/
│   └── inventory/
└── monitoring/                      # Monitoring & Observability
    ├── prometheus/
    ├── grafana/
    ├── elk/
    └── jaeger/
```

---

## 5. Root Level Configuration Files

```
pms-ecosystem/
├── package.json                     # Root workspace configuration
├── docker-compose.yml               # Complete system setup
├── docker-compose.dev.yml           # Development environment
├── docker-compose.prod.yml          # Production environment
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore patterns
├── README.md                        # Project documentation
├── CONTRIBUTING.md                  # Contribution guidelines
├── CHANGELOG.md                     # Version history
└── LICENSE                          # License file
```

## Key Integration Points

1. **Authentication Integration**: Both services use the common auth service for JWT validation
2. **Database Connection**: PMS service connects to both auth and PMS databases
3. **Shared Types**: Common TypeScript types are shared across all services
4. **API Gateway**: Single entry point routing to appropriate services
5. **File Storage**: Shared S3 configuration for uploads across services
6. **Monitoring**: Unified monitoring and logging across all services

## Development Workflow

1. **Local Development**: Use Docker Compose for complete local setup
2. **Database Migrations**: Separate migration scripts for each service
3. **Testing**: Independent test suites for each service with shared fixtures
4. **Deployment**: Kubernetes manifests for scalable deployment
5. **Monitoring**: Integrated observability stack with metrics, logs, and traces

This structure provides complete separation of concerns while enabling seamless integration between the authentication system and PMS service, with room for future services like Tour Management.
