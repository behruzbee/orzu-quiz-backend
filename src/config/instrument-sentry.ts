// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as Sentry from '@sentry/nestjs';

Sentry.init({
  dsn: "https://f33a9c0d14bd9bd6a807ef62057c95c1@o4509575682064384.ingest.de.sentry.io/4509575699234896", 
  sendDefaultPii: true,
});
