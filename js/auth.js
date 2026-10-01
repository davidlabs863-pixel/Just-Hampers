(function () {
  const STORAGE_KEY = 'justHampersGoogleUser';
  const CLIENT_ID = window.GOOGLE_CLIENT_ID || '410425343051-kheo733k6m58j9k4um2qba3433q4pjis.apps.googleusercontent.com';
  let googleSdkPromise = null;
  let googleInitialized = false;

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[character]));
  }

  function readStoredUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function writeStoredUser(user) {
    if (!user) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  function getDisplayName(user) {
    if (!user) return 'Guest';
    const names = [user.given_name, user.family_name].filter(Boolean);
    if (user.name) return user.name;
    if (names.length) return names.join(' ');
    return 'Google user';
  }

  function getFirstName(user) {
    if (!user) return 'there';
    return user.given_name || user.name?.split(' ')[0] || 'there';
  }

  function renderAuthWidget() {
    const roots = document.querySelectorAll('[data-auth-root]');
    const user = readStoredUser();

    roots.forEach((root) => {
      if (user) {
        root.innerHTML = `
          <div class="auth-chip is-signed-in" aria-live="polite">
            ${user.picture ? `<img class="auth-avatar" src="${escapeHtml(user.picture)}" alt="${escapeHtml(getDisplayName(user))} profile picture">` : `<span class="auth-avatar auth-avatar-fallback" aria-hidden="true">${escapeHtml(getDisplayName(user).charAt(0).toUpperCase())}</span>`}
            <div class="auth-copy">
              <span>Welcome</span>
              <strong>${escapeHtml(getDisplayName(user))}</strong>
            </div>
            <button class="auth-signout" type="button" data-auth-action="signout">Sign out</button>
          </div>
        `;
      } else {
        root.innerHTML = '';
        if (googleInitialized) {
          window.google.accounts.id.renderButton(root, {
            theme: 'outline',
            size: 'medium',
            text: 'signin_with',
            shape: 'pill'
          });
        } else {
          root.innerHTML = '<button class="auth-button" type="button" data-auth-action="signin"><span aria-hidden="true">G</span>Sign in with Google</button>';
        }
      }
    });

    const welcomeTargets = document.querySelectorAll('[data-auth-welcome]');
    welcomeTargets.forEach((element) => {
      if (user) {
        element.textContent = `Welcome, ${getDisplayName(user)}`;
      } else {
        element.textContent = 'Welcome, guest';
      }
    });
  }

  function handleCredentialResponse(response) {
    if (!response?.credential) return;

    try {
      const base64Payload = response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const normalized = base64Payload.length % 4 === 0 ? base64Payload : base64Payload + '='.repeat(4 - (base64Payload.length % 4));
      const payload = JSON.parse(atob(normalized));
      const user = {
        name: payload.name || '',
        given_name: payload.given_name || '',
        family_name: payload.family_name || '',
        email: payload.email || '',
        picture: payload.picture || '',
        sub: payload.sub || ''
      };
      writeStoredUser(user);
      renderAuthWidget();
      document.dispatchEvent(new CustomEvent('justHampers:auth-change', { detail: user }));
    } catch (error) {
      console.warn('Just Hampers could not parse the Google user payload.', error);
    }
  }

  function initializeGoogleSdk() {
    if (!CLIENT_ID || CLIENT_ID.includes('YOUR_GOOGLE_CLIENT_ID')) return Promise.reject(new Error('Google client ID is not configured.'));
    if (googleInitialized) return Promise.resolve();
    if (googleSdkPromise) return googleSdkPromise;

    googleSdkPromise = new Promise((resolve, reject) => {
      if (window.google?.accounts?.id) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error('Google Identity Services failed to load.'));
      document.head.appendChild(script);
    }).then(() => {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false
      });
      googleInitialized = true;
      renderAuthWidget();
    }).catch((error) => {
      googleSdkPromise = null;
      throw error;
    });

    return googleSdkPromise;
  }

  async function signInWithGoogle() {
    try {
      await initializeGoogleSdk();
    } catch (error) {
      window.alert('Google sign-in could not load. Check your connection and the authorized website origins in Google Cloud Console.');
      return;
    }
  }

  function signOut() {
    writeStoredUser(null);
    renderAuthWidget();
    document.dispatchEvent(new CustomEvent('justHampers:auth-change', { detail: null }));
  }

  document.addEventListener('click', (event) => {
    const actionTarget = event.target.closest('[data-auth-action]');
    if (!actionTarget) return;

    const action = actionTarget.dataset.authAction;
    if (action === 'signin') signInWithGoogle();
    if (action === 'signout') signOut();
  });

  renderAuthWidget();
  initializeGoogleSdk().catch((error) => console.warn(error.message));

  window.JustHampersAuth = {
    getCurrentUser: readStoredUser,
    isSignedIn: () => Boolean(readStoredUser()),
    getDisplayName,
    getFirstName,
    renderAuthWidget,
    signInWithGoogle,
    signOut,
    initializeGoogleSdk
  };
})();
