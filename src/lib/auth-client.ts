// Website sign-in (Firebase Authentication). The Firebase SDK is only downloaded when someone
// actually uses a sign-in form, so login pages stay fast and other pages load no auth code at all.
import cfg from '../data/auth.json';

export const authConfigured = Boolean(cfg.firebase.apiKey && cfg.firebase.projectId);
export const microsoftEnabled = authConfigured && cfg.microsoft.enabled && Boolean(cfg.microsoft.tenantId);

let loaded: Promise<{ auth: import('firebase/auth').Auth; fb: typeof import('firebase/auth') }> | undefined;
export function loadAuth() {
  loaded ??= Promise.all([import('firebase/app'), import('firebase/auth')]).then(([app, fb]) => {
    const auth = fb.getAuth(app.initializeApp(cfg.firebase));
    return { auth, fb };
  });
  return loaded;
}

// Friendly messages for the errors people actually hit.
const messages: Record<string, string> = {
  'auth/invalid-credential': 'That email and password don’t match our records.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'This account has been turned off. Please contact Level Up.',
  'auth/too-many-requests': 'Too many attempts. Please wait a few minutes and try again.',
  'auth/email-already-in-use': 'An account with this email already exists. Try logging in instead.',
  'auth/weak-password': 'Please choose a password with at least 8 characters.',
  'auth/network-request-failed': 'We couldn’t reach the sign-in service. Check your connection and try again.',
  'auth/popup-closed-by-user': 'The Microsoft sign-in window was closed before finishing.',
  'auth/unauthorized-domain': 'Sign-in isn’t enabled for this web address yet. Please contact Level Up.',
};
export const friendly = (e: unknown) => {
  const code = (e as { code?: string })?.code ?? '';
  if (code.startsWith('auth/api-key') || code === 'auth/invalid-api-key' || code === 'auth/configuration-not-found' || code === 'auth/operation-not-allowed')
    return 'Website sign-in isn’t fully set up yet. Please use the Level Up App, or email hello@levelupcincinnati.org.';
  return messages[code] ?? 'Something went wrong. Please try again, or email hello@levelupcincinnati.org.';
};

export const isStaffEmail = (email?: string | null) => !!email && email.toLowerCase().endsWith('@' + cfg.microsoft.staffEmailDomain);
export const links = cfg.links;
export const tenantId = cfg.microsoft.tenantId;
