# Contact inquiry delivery review

## Plan and requirements

Goal: avoid losing inquiries or telling visitors that TechPartner received a
message when the site only prepared an email. Use the existing website source
and no paid services, new accounts, secrets or integration calls during QA.

Current GitHub export: alexwboles/newtechpartner, main snapshot from September 2.
The public site's contact text and field IDs match this source, but its newer
navigation differs. This is NOT proof of the exact deployed revision. Base44's
connector currently requires reauthentication. Confirm the live source and
reconcile changes before any production deployment.

Acceptance criteria:

- An unconfigured webhook prepares an email draft without a network request or
  a false receipt claim. The visitor must explicitly send through their mail app.
- Name, business, email and message remain available until the visitor explicitly
  starts a new inquiry. No four-second automatic clearing.
- Webhook success is acknowledged only after a successful HTTP response with
  an explicit JSON `{"accepted":true}` acknowledgement;
  failures and timeouts are visible and leave the draft intact.
- Repeated clicks do not dispatch duplicate concurrent requests.
- The Vite build uses its supported public VITE_CONTACT_WEBHOOK_URL setting,
  rather than evaluating Next.js process.env in the browser.
- Email composition, copy/manual fallback and status/error messages are readable
  on desktop and mobile. Correct recipient: alexwboles@gmail.com.

## Design

Separate the actual preparation/delivery logic into a typed module used by the
React form and direct tests. It returns either an explicit email draft or a
submitted result; it never navigates to a mail app or clears form data itself.
The component owns visible progress, failure, copy fallback and explicit reset.
Only a configured webhook may receive a POST. No default destination or secret
is introduced. Its public URL must identify an owner-approved service.

## Development and testing

Work in qa/honest-contact-delivery. Exercise encoded email content and recipient,
no-network fallback, successful/delayed/error/timeout requests, input validation
and preservation. Compile the real shared module for dependency-free Node tests.
Build the complete site and review the local form in Edge at desktop/mobile
sizes. Local tests use synthetic inputs and fake request functions, with no
production webhook, paid API or email send.

## Deployment and maintenance

Push reviewed source and test evidence to this existing GitHub repository.
Do not deploy or alter the live Base44 app until its current source is available,
the patch is reconciled and Alex approves the specific release. Verify the actual
deployed contact workflow before calling it complete. A webhook response proves
request acceptance, not downstream email receipt; that requires separate checks
against the receiving service and inbox. Keep the no-webhook path honest.

## Verified review results — November 2, 2026

- `npm run test:contact`: passed against the compiled shared delivery module.
- `npm run build`: passed. Full `tsc --noEmit --incremental false`: passed.
  The existing App page-transition object needed a `Variants` type annotation;
  this changes type checking only, not rendered behavior.
- Targeted ESLint for App, ContactPage and the delivery module: passed.
- Edge desktop: prepared a correctly addressed draft using synthetic data;
  copy confirmation appeared and the draft remained available after four
  seconds. No email app was opened and no real email was sent during form QA.
- Edge 390px mobile: all content fit, document scroll width equaled 390px,
  the email handoff and manual-copy area were readable, and copy succeeded.
- A loopback-only fake receiver verified HTTP 503 and unconfirmed 200 errors,
  visible loading with disabled submit/fields, explicit acceptance, retained
  submitted details and the explicit reset. Four deliberate submissions made
  four requests. This proves local UI behavior, not production delivery.

The Base44 connector still reports UNAUTHORIZED after reconnection. Browser
access works after Alex signed into the owning account; the current source
search confirms ContactPage still uses NEXT_PUBLIC_CONTACT_WEBHOOK_URL.
The owning-account CLI login now works. The exact current ContactPage matched
the original export. Fixes were applied only to the isolated Base44 review
branch. The live deployment and main source remain unchanged.

## Local verification and endpoint contract

Run `npm ci --ignore-scripts`, `npm run test:contact`, then `npm run build`.
Use `npm run dev -- --host 127.0.0.1` for an isolated local review. Generated
test output and build files are ignored. Do not enter real client records.

The optional public Vite environment variable is documented in `.env.example`.
Without it the form only prepares an email; it does not send one. Changing the
variable requires rebuilding the site. An existing NEXT_PUBLIC setting alone
does not configure Vite. Confirm the current live configuration before release.

An approved webhook receives a JSON POST with `name`, `business`, `email`,
`message` and `subject`. It must support the site's CORS origin, validate inputs,
limit abuse, handle data privately and return a 2xx JSON `{"accepted":true}`
only after it has accepted the inquiry. Generic 200 pages, an empty 204 response
or `{"accepted":false}` are not confirmation. No endpoint is created by this
patch; its delivery, security and actual receiving inbox need separate checks.
Requests time out after 15 seconds. A timeout can occur after server acceptance,
so the UI advises checking before retrying to avoid duplicate inquiries.
