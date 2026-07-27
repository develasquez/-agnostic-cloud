# Security Checklist — Developer Documentation Site

## Requirement Completeness

- [ ] CHK001 Are credential/authentication patterns documented for each cloud provider (AWS IAM, GCP Service Accounts, Azure RBAC)? [Spec §FR-005, FR-012]
- [ ] CHK002 Is there documentation on how each cloud's default credential chain works when `config` is empty? [Spec §Assumptions, Gap]
- [ ] CHK003 Are the security implications of running local emulators (no real auth, plaintext communication) explicitly documented? [Spec §US5, Gap]
- [ ] CHK004 Is there guidance on least-privilege IAM policies for each service type (storage, secrets, kms, etc.)? [Gap]
- [ ] CHK005 Are encryption-in-transit and encryption-at-rest behaviors documented per service and per cloud? [Gap]
- [ ] CHK006 Is there documentation about TLS/SSL configuration required for each provider SDK? [Gap]

## Requirement Clarity

- [ ] CHK007 Is the difference between library-level auth (config credentials) and cloud-level auth (IAM roles) clearly explained? [Clarity, Spec §Config]
- [ ] CHK008 Are the `credential` vs `credentials` field options clearly distinguished (singular TokenCredential vs plural AWS credentials object)? [Clarity, Spec §Azure]
- [ ] CHK009 Is the retry mechanism's interaction with auth failures documented (e.g., does it retry on AuthError)? [Clarity, Spec §SC-005]
- [ ] CHK010 Is it clear which errors are auth-related versus service-related across all packages? [Clarity, Spec §FR-010]

## Requirement Consistency

- [ ] CHK011 Is the credential terminology consistent across all 7 package docs ("credential" / "credentials" / "auth" / "token")? [Consistency]
- [ ] CHK012 Are security notes consistent across cloud tabs (all 3 clouds mention similar security considerations)? [Consistency, Spec §CloudTabs]
- [ ] CHK013 Is the error hierarchy naming consistent for auth errors (all packages use `AuthError`)? [Consistency, Spec §FR-010]

## Acceptance Criteria Quality

- [ ] CHK014 Are the emulator security caveats testable — can a developer verify they understand the risks? [Measurability, Spec §US5]
- [ ] CHK015 Is the CI/CD security posture verifiable (e.g., no secrets in GHA logs, no untrusted PRs deploying)? [Measurability, Spec §US8]

## Scenario Coverage

- [ ] CHK016 Does the quickstart cover authentication setup for each cloud? [Coverage, Spec §US3]
- [ ] CHK017 Does the emulators guide warn against using emulator credentials in production? [Coverage, Spec §US5]
- [ ] CHK018 Does the migration guide cover cross-cloud credential handling (source/destination with different auth)? [Coverage, Spec §US4]
- [ ] CHK019 Does the LLM Reference include token/credential parameter types? [Coverage, Spec §US6]

## Edge Case Coverage

- [ ] CHK020 Are expired-credential error patterns documented? [Edge Case]
- [ ] CHK021 Is the behavior documented when no credential is configured and no default chain exists? [Edge Case, Spec §FR-010]
- [ ] CHK022 Are cross-cloud auth migration edge cases covered (e.g., source AWS with IAM role, dest GCP with service account key)? [Edge Case, Spec §US4]
- [ ] CHK023 Is credential rotation/renewal guidance provided for long-running applications? [Edge Case, Gap]

## Non-Functional Requirements (Security)

- [ ] CHK024 Are there documented recommendations for secret rotation intervals? [Gap]
- [ ] CHK025 Is there guidance on which auth methods are production-suitable vs development-only? [Gap]
- [ ] CHK026 Is the supply chain security posture documented (peer dependencies, npm audit)? [Gap]
- [ ] CHK027 Is there documentation about audit logging for each cloud provider's service? [Gap]

## Dependencies & Assumptions

- [ ] CHK028 Does the docs assume the user already has cloud credentials configured? [Assumption, Spec §Assumptions]
- [ ] CHK029 Are the emulators clearly documented as "NOT for production use"? [Assumption, Spec §US5]
- [ ] CHK030 Is the peer-dependency security model explained (user installs SDK, library doesn't pin versions)? [Assumption, Gap]

## Ambiguities & Conflicts

- [ ] CHK031 Is it clear whether the documentation provides security guidance or defers to cloud provider docs? [Ambiguity]
- [ ] CHK032 Is there potential conflict between "easy to use" (SC-001: under 5 min) and "secure by default" if quickstart skips IAM setup? [Conflict, Spec §SC-001 vs SC-003]
- [ ] CHK033 Is the line between "library handles auth" vs "user must configure auth" unambiguous? [Ambiguity, Spec §Config]
