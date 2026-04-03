/* =============================================
   CLOTHING FACTORY MANAGEMENT SYSTEM
   Shared App Logic — Refactored for Backend
   ============================================= */

'use strict';

/* ── i18n Dictionary ── */
const i18n = {
  en: {
    // Common
    appName:    'FabricPro',
    appSub:     'Factory Management',
    login:      'Login',
    logout:     'Logout',
    username:   'Username',
    password:   'Password',
    submit:     'Submit',
    cancel:     'Cancel',
    save:       'Save',
    close:      'Close',
    search:     'Search...',
    language:   'Language',
    settings:   'Settings',
    profile:    'Profile',
    dashboard:  'Dashboard',
    employees:  'Employees',
    tasks:      'Tasks',
    inventory:  'Inventory',
    orders:     'Orders',
    reports:    'Reports',
    payments:   'Payments',
    notifications: 'Notifications',
    back:       'Back',
    loading:    'Loading...',
    attendance: 'Attendance',
    qualityControl: 'Quality Control',
    performance:'Performance',

    // Login
    loginTitle:    'Welcome Back',
    loginSub:      'Sign in to your account',
    forgotPass:    'Forgot password?',
    rememberMe:    'Remember me',
    loginBtn:      'Sign In',
    loginError:    'Invalid username or password.',
    switchLangEn:  'EN',
    switchLangNe:  'नेपाली',

    // Dashboard
    totalEmployees:   'Total Employees',
    ordersProgress:   'Orders in Progress',
    completedItems:   'Completed Items',
    profitCost:       'Profit & Cost',
    production:       'Production Progress',
    recentOrders:     'Recent Orders',
    employeeList:     'Employee List',
    pendingPayments:  'Pending Payments',
    inventoryStatus:  'Inventory Status',
    lowStockAlert:    'Low Stock Alert',
    quickActions:     'Quick Actions',
    assignWork:       'Assign Work',
    sendMessage:      'Send Message',
    addEmployee:      'Add Employee',
    viewReports:      'View Reports',
    manageOrders:     'Manage Orders',
    exportData:       'Export CSV',

    // Roles
    sewing:    'Sewing',
    cutting:   'Cutting',
    finishing: 'Finishing',
    packaging: 'Packaging',
    admin:     'Admin',

    // Status
    completed:   'Completed',
    pending:     'Pending',
    inProgress:  'In Progress',
    approved:    'Approved',
    rejected:    'Rejected',
    lowStock:    'Low Stock',
    atRisk:      '⚠️ At Risk',
    onTrack:     '✓ On Track',

    // Worker
    myTasks:         'My Tasks',
    myEarnings:      'My Earnings',
    todayEarnings:   "Today's Earnings",
    weekEarnings:    'This Week',
    monthEarnings:   'This Month',
    piecesCompleted: 'Pieces Completed',
    ratePerPiece:    'Rate / Piece',
    markCompleted:   'Mark as Completed',
    requestMaterial: 'Request Material',
    applyLeave:      'Apply Leave',
    viewAll:         'View All',

    // Attendance
    checkIn:        'Check In',
    checkOut:       'Check Out',
    workingDays:    'Working Days',
    absences:       'Absences',
    attendanceRate: 'Attendance Rate',

    // Quality
    defective:      'Defective',
    qualityScore:   'Quality Score',
    reassign:       'Reassign',
    totalPieces:    'Total Pieces',

    // Performance
    rank:           'Rank',
    efficiency:     'Efficiency',
    piecesPerDay:   'Pieces/Day',
    topPerformer:   'Top Performer',
    bonus:          'Bonus',

    // Payment
    paymentHistory: 'Payment History',
    salary:         'Salary',
    markPaid:       'Mark Paid',
    paid:           'Paid',
    totalEarned:    'Total Earned',

    // Export
    exportCSV:      'Export CSV',
    exportPDF:      'Export PDF',

    // Task Submission
    taskSubmission:   'Task Submission',
    taskDetails:      'Task Details',
    taskName:         'Task Name',
    dueDate:          'Due Date',
    submitWork:       'Submit Completed Work',
    uploadProof:      'Upload Image Proof',
    uploadHint:       'Click to upload or drag & drop (optional)',
    submitSuccess:    'Task submitted successfully!',

    // Leave Request
    leaveRequest:   'Leave Request',
    leaveDate:      'Leave Date',
    leaveReason:    'Reason for Leave',
    reasonPlaceholder: 'Enter your reason...',
    submitLeave:    'Submit Leave Request',

    // Material Request
    materialRequest:  'Material Request',
    materialType:     'Material Type',
    cloth:            'Cloth',
    thread:           'Thread',
    buttons:          'Buttons',
    zipper:           'Zipper',
    liner:            'Liner',
    otherMaterial:    'Other',
    quantity:         'Quantity',
    unit:             'Unit',
    meters:           'Meters',
    pieces:           'Pieces',
    rolls:            'Rolls',
    submitRequest:    'Submit Request',
    urgency:          'Urgency',
    normal:           'Normal',
    urgent:           'Urgent',
    critical:         'Critical',

    // Settings
    appearance:     'Appearance',
    languagePref:   'Language Preference',
    profileInfo:    'Profile Information',
    fullName:       'Full Name',
    email:          'Email',
    phone:          'Phone',
    role:           'Role',
    changePassword: 'Change Password',
    currentPass:    'Current Password',
    newPass:        'New Password',
    confirmPass:    'Confirm Password',
    updateProfile:  'Update Profile',
    logoutBtn:      'Logout',
    settingsTitle:  'Settings',

    // Months for chart
    months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days:   ['Mon','Tue','Wed','Thu','Fri','Sat'],
  },

  ne: {
    appName:    'फ्याब्रिकप्रो',
    appSub:     'कारखाना व्यवस्थापन',
    login:      'लगइन',
    logout:     'बाहिर निस्कनुस्',
    username:   'प्रयोगकर्ता नाम',
    password:   'पासवर्ड',
    submit:     'पेश गर्नुस्',
    cancel:     'रद्द',
    save:       'सुरक्षित',
    close:      'बन्द',
    search:     'खोज्नुस्...',
    language:   'भाषा',
    settings:   'सेटिङ',
    profile:    'प्रोफाइल',
    dashboard:  'ड्यासबोर्ड',
    employees:  'कर्मचारीहरू',
    tasks:      'कामहरू',
    inventory:  'सामग्री',
    orders:     'अर्डरहरू',
    reports:    'रिपोर्ट',
    payments:   'भुक्तानी',
    notifications: 'सूचनाहरू',
    back:       'पछाडि',
    loading:    'लोड हुँदैछ...',
    attendance: 'उपस्थिति',
    qualityControl: 'गुणस्तर नियन्त्रण',
    performance:'प्रदर्शन',
    loginTitle:    'स्वागत छ',
    loginSub:      'आफ्नो खातामा साइन इन गर्नुहोस्',
    forgotPass:    'पासवर्ड भुल्नुभयो?',
    rememberMe:    'याद राख्नुस्',
    loginBtn:      'साइन इन',
    loginError:    'प्रयोगकर्ता नाम वा पासवर्ड गलत छ।',
    switchLangEn:  'EN',
    switchLangNe:  'नेपाली',
    totalEmployees:   'कुल कर्मचारी',
    ordersProgress:   'चलिरहेका अर्डर',
    completedItems:   'पूरा भएका वस्तुहरू',
    profitCost:       'नाफा र लागत',
    production:       'उत्पादन प्रगति',
    recentOrders:     'हालका अर्डरहरू',
    employeeList:     'कर्मचारी सूची',
    pendingPayments:  'बाँकी भुक्तानी',
    inventoryStatus:  'सामग्री स्थिति',
    lowStockAlert:    'कम स्टक सूचना',
    quickActions:     'छिटो कार्यहरू',
    assignWork:       'काम तोक्नुस्',
    sendMessage:      'सन्देश पठाउनुस्',
    addEmployee:      'कर्मचारी थप्नुस्',
    viewReports:      'रिपोर्ट हेर्नुस्',
    manageOrders:     'अर्डर व्यवस्थापन',
    exportData:       'CSV निर्यात',
    sewing:    'सिलाइ',
    cutting:   'काटिङ',
    finishing: 'फिनिसिङ',
    packaging: 'प्याकेजिङ',
    admin:     'प्रशासक',
    completed:   'पूरा भयो',
    pending:     'बाँकी',
    inProgress:  'भइरहेको',
    approved:    'स्वीकृत',
    rejected:    'अस्वीकृत',
    lowStock:    'कम स्टक',
    atRisk:      '⚠️ खतरामा',
    onTrack:     '✓ ठीकठाक',
    myTasks:         'मेरा कामहरू',
    myEarnings:      'मेरो कमाइ',
    todayEarnings:   'आजको कमाइ',
    weekEarnings:    'यस हप्ता',
    monthEarnings:   'यस महिना',
    piecesCompleted: 'पूरा गरिएका थान',
    ratePerPiece:    'थान अनुसार दर',
    markCompleted:   'पूरा भयो',
    requestMaterial: 'सामग्री माग्नुस्',
    applyLeave:      'बिदा निवेदन',
    viewAll:         'सबै हेर्नुस्',
    checkIn:        'चेकइन',
    checkOut:       'चेकआउट',
    workingDays:    'कार्य दिनहरू',
    absences:       'अनुपस्थिति',
    attendanceRate: 'उपस्थिति दर',
    defective:      'दोषयुक्त',
    qualityScore:   'गुणस्तर स्कोर',
    reassign:       'पुन: तोक्नुस्',
    totalPieces:    'कुल थान',
    rank:           'स्थान',
    efficiency:     'दक्षता',
    piecesPerDay:   'थान/दिन',
    topPerformer:   'शीर्ष',
    bonus:          'बोनस',
    paymentHistory: 'भुक्तानी इतिहास',
    salary:         'तलब',
    markPaid:       'भुक्तानी गर्नुस्',
    paid:           'भुक्तान',
    totalEarned:    'कुल कमाइ',
    exportCSV:      'CSV निर्यात',
    exportPDF:      'PDF निर्यात',
    taskSubmission:   'काम पेश',
    taskDetails:      'काम विवरण',
    taskName:         'कामको नाम',
    dueDate:          'म्याद',
    submitWork:       'पूरा भएको काम पेश गर्नुस्',
    uploadProof:      'प्रमाण फोटो अपलोड',
    uploadHint:       'क्लिक गर्नुस् वा छोड्नुस् (वैकल्पिक)',
    submitSuccess:    'काम सफलतापूर्वक पेश भयो!',
    leaveRequest:   'बिदा निवेदन',
    leaveDate:      'बिदाको मिति',
    leaveReason:    'बिदाको कारण',
    reasonPlaceholder: 'आफ्नो कारण लेख्नुस्...',
    submitLeave:    'बिदा निवेदन पठाउनुस्',
    materialRequest:  'सामग्री अनुरोध',
    materialType:     'सामग्रीको प्रकार',
    cloth:            'कपडा',
    thread:           'धागो',
    buttons:          'बटन',
    zipper:           'जिपर',
    liner:            'लाइनर',
    otherMaterial:    'अन्य',
    quantity:         'मात्रा',
    unit:             'इकाई',
    meters:           'मिटर',
    pieces:           'थान',
    rolls:            'रोल',
    submitRequest:    'अनुरोध पठाउनुस्',
    urgency:          'जरुरी स्तर',
    normal:           'सामान्य',
    urgent:           'जरुरी',
    critical:         'अत्यन्त जरुरी',
    appearance:     'उपस्थिति',
    languagePref:   'भाषा प्राथमिकता',
    profileInfo:    'प्रोफाइल जानकारी',
    fullName:       'पूरा नाम',
    email:          'इमेल',
    phone:          'फोन',
    role:           'भूमिका',
    changePassword: 'पासवर्ड परिवर्तन',
    currentPass:    'हालको पासवर्ड',
    newPass:        'नयाँ पासवर्ड',
    confirmPass:    'पुष्टि गर्नुस्',
    updateProfile:  'प्रोफाइल अद्यावधिक',
    logoutBtn:      'बाहिर निस्कनुस्',
    settingsTitle:  'सेटिङ',
    months: ['जन','फेब','मार्च','अप्रि','मे','जुन','जुला','अग','सेप','अक्टो','नोभ','डिस'],
    days:   ['सोम','मंगल','बुध','बिहि','शुक्र','शनि'],
  }
};

/* ── Global State ── */
let currentLang = localStorage.getItem('cfms_lang') || 'en';
let currentData = {
  orders: [],
  employees: [],
  inventory: [],
  payments: [],
  attendance: [],
  quality: [],
  notifications: [],
  reports: [],
  workerTasks: [],
  materialRequests: [],
  leaveHistory: [],
  materialHistory: []
};

const t = (key) => (i18n[currentLang] || i18n.en)[key] || key;

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatNumber(value, fallback = '0') {
  const number = Number(value);
  return Number.isFinite(number) ? number.toLocaleString('en-IN') : fallback;
}

function formatCurrency(value, fallback = 'Rs 0') {
  const number = Number(value);
  return Number.isFinite(number) ? `Rs ${number.toLocaleString('en-IN')}` : fallback;
}

function formatDate(value, fallback = '--') {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function initials(name) {
  return String(name || 'U').split(' ').filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('') || 'U';
}

function parseJsonSafe(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

function normalizeRole(role) {
  const value = String(role || '').trim().toLowerCase();
  return ['admin', 'owner', 'manager', 'superadmin'].includes(value) ? 'admin' : 'worker';
}

function normalizeUser(user) {
  if (!user || typeof user !== 'object') return null;
  const name = user.name || user.full_name || user.username || 'User';
  return {
    id: user.id || user.user_id || '',
    name,
    username: user.username || name,
    role: normalizeRole(user.role || user.user_role || user.type),
    dept: user.dept || user.department || '',
    email: user.email || '',
    phone: user.phone || ''
  };
}

function getStoredUser() {
  return normalizeUser(parseJsonSafe(localStorage.getItem('cfms_user')));
}

function setStoredUser(user) {
  const normalized = normalizeUser(user);
  if (normalized) localStorage.setItem('cfms_user', JSON.stringify(normalized));
  return normalized;
}

function getCurrentPage() {
  const parts = window.location.pathname.split('/');
  return parts[parts.length - 1] || 'index.html';
}

function redirectForRole(role) {
  window.location.replace(normalizeRole(role) === 'admin' ? 'dashboard-owner.html' : 'dashboard-worker.html');
}

/* ── Utility Functions ── */
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('cfms_lang', lang);
  document.documentElement.lang = lang === 'ne' ? 'ne' : 'en';
  applyTranslations();
  updateLangButtons();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const attr = el.getAttribute('data-i18n-attr');
    if (attr) {
      el.setAttribute(attr, t(key));
    } else {
      el.textContent = t(key);
    }
  });
}

function updateLangButtons() {
  document.querySelectorAll('.lang-btn, .lang-pill').forEach(btn => {
    const lang = btn.getAttribute('data-lang');
    btn.classList.toggle('active', lang === currentLang);
  });
}

/* ── Authentication ── */
function requireAuth(requiredRole) {
  const page = getCurrentPage();
  const user = getStoredUser();

  if (page === 'index.html') {
    if (user) redirectForRole(user.role);
    return user;
  }

  if (!user) {
    window.location.replace('index.html');
    return null;
  }

  if (requiredRole && requiredRole !== 'any' && user.role !== requiredRole) {
    redirectForRole(user.role);
    return null;
  }

  return user;
}

async function doLogin(username, password) {
  const res = await apiFetch('login.php', {
    method: 'POST',
    data: { username, password },
    suppressToast: true
  });
  const user = normalizeUser(res.raw && (res.raw.user || (res.raw.data && res.raw.data.user) || res.raw.data));
  if (!res.success || !user) {
    return { success: false, message: res.message || t('loginError') };
  }
  setStoredUser(user);
  return { success: true, user, message: res.message || 'Login successful.' };
}

function logout() {
  localStorage.removeItem('cfms_user');
  window.location.replace('index.html');
}

/* ── API Helpers (Backend Ready) ── */
function normalizeApiResult(response, payload) {
  if (Array.isArray(payload)) {
    return { success: response.ok, data: payload, raw: payload, message: response.ok ? '' : `Request failed (${response.status})` };
  }

  if (payload && typeof payload === 'object') {
    const success = typeof payload.success === 'boolean'
      ? payload.success
      : typeof payload.status === 'string'
        ? ['success', 'ok'].includes(payload.status.toLowerCase())
        : response.ok;

    return {
      success,
      data: payload.data !== undefined ? payload.data : payload,
      raw: payload,
      message: payload.message || payload.error || payload.msg || (success ? '' : `Request failed (${response.status})`)
    };
  }

  return { success: response.ok, data: null, raw: payload, message: response.ok ? '' : `Request failed (${response.status})` };
}

function getArrayData(res, keys = []) {
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.raw)) return res.raw;
  if (res?.raw && typeof res.raw === 'object') {
    for (const key of keys) {
      if (Array.isArray(res.raw[key])) return res.raw[key];
    }
  }
  return [];
}

async function apiFetch(endpoint, options = {}) {
  const settings = {
    method: 'GET',
    data: null,
    query: null,
    suppressToast: false,
    ...options
  };

 const url = new URL(
  `/fabricpro/Backend/${String(endpoint).replace(/^\/+/, '')}`,
  window.location.origin
);
  if (settings.query) {
    Object.entries(settings.query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, value);
    });
  }

  const fetchOptions = {
    method: settings.method,
    credentials: 'same-origin',
    headers: { Accept: 'application/json' }
  };

  if (settings.method !== 'GET' && settings.data) {
    if (settings.data instanceof FormData) {
      fetchOptions.body = settings.data;
    } else {
      const formData = new FormData();
      Object.entries(settings.data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, value);
      });
      fetchOptions.body = formData;
    }
  }
  
  try {
    const response = await fetch(url.toString(), fetchOptions);
    const text = await response.text();
    const payload = text ? parseJsonSafe(text) || text : null;
    const result = normalizeApiResult(response, payload);

    if ((response.status === 401 || response.status === 403) && getCurrentPage() !== 'index.html') {
      localStorage.removeItem('cfms_user');
      window.location.replace('index.html');
      return { success: false, message: 'Session expired.' };
    }

    if (!result.success && !settings.suppressToast) {
      showToast(result.message || 'Request failed.', 'error');
    }

    return result;
  } catch (error) {
    if (!settings.suppressToast) showToast('Unable to connect to backend.', 'error');
    return { success: false, data: null, raw: null, message: error.message };
  }
}

/* ── UI Components ── */
function showToast(message, type = 'info', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    const style = document.createElement('style');
    style.textContent = '@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes toastOut{to{opacity:0;transform:translateY(-8px)}}';
    document.head.appendChild(style);
    container = document.createElement('div');
    container.className = 'toast-container';
    container.style.cssText = `position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;max-width:320px;`;
    document.body.appendChild(container);
  }

  const colors = { success: '#10B981', warning: '#F59E0B', error: '#EF4444', info: '#2563EB' };
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.style.cssText = `
    display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:12px;
    background:#fff;box-shadow:0 8px 24px rgba(0,0,0,.12);
    border-left:4px solid ${colors[type]||colors.info};
    font-family:sans-serif;font-size:.9rem;font-weight:500;color:#0f172a;
    min-width:240px;animation:slideIn .25s ease;
  `;
  
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut .2s ease forwards';
    setTimeout(() => toast.remove(), 200);
  }, duration);
}

function showInlineMessage(container, message, type = 'info') {
  if (!container) return;
  const palette = {
    info: ['#EFF6FF', '#1D4ED8', '#BFDBFE'],
    warning: ['#FFFBEB', '#92400E', '#FDE68A'],
    error: ['#FEF2F2', '#991B1B', '#FECACA']
  }[type] || ['#EFF6FF', '#1D4ED8', '#BFDBFE'];
  container.innerHTML = `<div style="padding:14px;border:1px solid ${palette[2]};border-radius:12px;background:${palette[0]};color:${palette[1]};font-size:.88rem;">${escapeHtml(message)}</div>`;
}

function setButtonLoading(button, loading, label = 'Loading...') {
  if (!button) return;
  if (loading) {
    if (!button.dataset.originalHtml) button.dataset.originalHtml = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `<span style="display:inline-block;width:14px;height:14px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:spin .6s linear infinite"></span><span>${escapeHtml(label)}</span>`;
  } else {
    button.disabled = false;
    if (button.dataset.originalHtml) {
      button.innerHTML = button.dataset.originalHtml;
      delete button.dataset.originalHtml;
    }
  }
}

function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}

function showPage(pageId) {
  document.querySelectorAll('.page-section').forEach(sec => {
    sec.classList.toggle('hidden', sec.id !== pageId);
  });
  
  // Update active nav state
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-nav') === pageId);
  });

  const titleEl = document.getElementById('pageTitle');
  if (titleEl) {
    const navItem = document.querySelector(`[data-nav="${pageId}"]`);
    if (navItem) {
      const span = navItem.querySelector('span');
      titleEl.textContent = span ? span.textContent : t(pageId);
    }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Shared Rendering Helpers ── */
const roleClass = r => ({sewing:'role-sewing',cutting:'role-cutting',finishing:'role-finishing'}[r]||'');
const stBadge = s => ({inProgress:'badge-primary',completed:'badge-success',pending:'badge-gray',approved:'badge-success',rejected:'badge-danger'}[s]||'badge-gray');

function filterNotifs(filter, button) {
  document.querySelectorAll('.filter-tab').forEach((tab) => tab.classList.toggle('active', tab === button));
  const list = document.getElementById('notifList');
  if (!list) return;
  const items = filter === 'all' ? currentData.notifications : currentData.notifications.filter((item) => item.type === filter);
  if (!items.length) {
    showInlineMessage(list, 'No notifications found for this filter.', 'info');
    return;
  }
  list.innerHTML = items.map((item) => `
    <div class="notif-item" style="${item.read ? 'opacity:.7' : ''}">
      <div class="notif-type-icon nti-${escapeHtml(item.type || 'task')}"></div>
      <div style="flex:1">
        <div style="font-weight:${item.read ? '500' : '700'}">${escapeHtml(item.title || 'Notification')}</div>
        <div style="font-size:.8rem">${escapeHtml(item.msg || item.message || '')}</div>
        <div style="font-size:.72rem">${escapeHtml(item.time || '')}</div>
      </div>
    </div>
  `).join('');
}


function markAllRead() {
  currentData.notifications = currentData.notifications.map((item) => ({ ...item, read: true }));
  filterNotifs('all', document.querySelector('.filter-tab[data-filter="all"]'));
  const badge = document.getElementById('notifBadge');
  const workerBadge = document.getElementById('wNotifBadge');
  if (badge) badge.textContent = '';
  if (workerBadge) workerBadge.textContent = '0';
  showToast('All notifications marked as read.', 'success');
}

/* ── DOM Initializer ── */
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  updateLangButtons();
  initPage();

  // Global Event Delegation
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action], [data-nav], [data-modal-target], [data-close-modal], [data-logout], .lang-btn, .lang-pill, .back-btn');
    if (!target) return;

    // Back Button
    if (target.classList.contains('back-btn')) {
      history.back();
      return;
    }

    // Logout
    if (target.hasAttribute('data-logout')) {
      logout();
      return;
    }

    // Action Handlers
    const action = target.getAttribute('data-action');
    if (action) {
      handleGlobalAction(action, target, e);
      return;
    }

    // Modal Controls
    if (target.hasAttribute('data-modal-target')) {
      openModal(target.getAttribute('data-modal-target'));
    }
    if (target.hasAttribute('data-close-modal')) {
      closeModal(target.getAttribute('data-close-modal'));
    }

    // Language switch
    if (target.classList.contains('lang-btn') || target.classList.contains('lang-pill')) {
      const l = target.getAttribute('data-lang');
      if (l) setLang(l);
      return;
    }

    // Page navigation
    if (target.hasAttribute('data-nav')) {
      const pageId = target.getAttribute('data-nav');
      if (document.querySelector('.worker-page')) switchWorkerPage(pageId);
      else if (typeof showPage === 'function') showPage(pageId);
      return;
    }
  });

  function handleGlobalAction(action, el, e) {
    switch (action) {
      // Export
      case 'export-orders': exportCSV(currentData.orders, 'orders.csv'); break;
      case 'export-payments': exportCSV(currentData.payments, 'payments.csv'); break;
      case 'export-reports': exportCSV(currentData.reports, 'reports.csv'); break;
      case 'export-attendance': exportCSV(currentData.attendance, 'attendance.csv'); break;
      case 'export-data': exportCSV(currentData.orders, 'factory-data.csv'); break;
      
      // Notifications
      case 'mark-all-read': markAllRead(); break;
      case 'filter-notifs': 
        filterNotifs(el.getAttribute('data-filter'), el); 
        break;
      
      // Worker Actions
      case 'worker-attend': handleWorkerAttend(); break;
      case 'nav-material': window.location.href = 'material-request.html'; break;
      case 'nav-leave': window.location.href = 'leave-request.html'; break;
      
      // Selectors
      case 'select-material':
        document.querySelectorAll('.material-btn').forEach(b => b.classList.remove('selected'));
        el.classList.add('selected');
        break;
      case 'select-urgency':
        const u = el.dataset.urgency;
        document.querySelectorAll('.urgency-btn').forEach(b => b.classList.remove('selected-normal', 'selected-urgent', 'selected-critical'));
        el.classList.add('selected-' + u);
        break;
      case 'select-leave-type':
        document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('selected'));
        el.classList.add('selected');
        break;
      
      // Submissions
      case 'submit-material': submitMaterialRequest(e); break;
      case 'submit-leave': submitLeaveRequest(e); break;
      case 'submit-task': submitTaskDone(e); break;
      case 'update-profile': saveProfile(e); break;
      case 'pay-worker':
        break;


    

      // Task Helpers
      case 'increment-pieces':
      case 'decrement-pieces':
        const sc = document.getElementById('submitCount');
        const pd = document.getElementById('piecesDone');
        if (sc) {
          let val = parseInt(sc.textContent);
          val = Math.max(1, val + (action === 'increment-pieces' ? 1 : -1));
          sc.textContent = val;
          if (pd) pd.value = val;
        }
        break;
      case 'trigger-upload': document.getElementById('fileInput')?.click(); break;
      case 'remove-image':
        const pb = document.getElementById('previewBox');
        const uz = document.getElementById('uploadZone');
        if (pb) pb.style.display = 'none';
        if (uz) uz.style.display = 'block';
        const fi = document.getElementById('fileInput');
        if (fi) fi.value = '';
        break;

      case 'check-updates': showToast('You are on the latest version', 'success'); break;
      case 'reassign-quality': showToast('Quality reassignment action recorded.', 'info'); break;
    }
  }

  // Global Change Handlers
  document.addEventListener('change', (e) => {
    const target = e.target;
    if (target.id === 'fileInput') {
      if (!target.files[0]) return;
      const url = URL.createObjectURL(target.files[0]);
      const img = document.getElementById('previewImg');
      const pb = document.getElementById('previewBox');
      const uz = document.getElementById('uploadZone');
      if (img) img.src = url;
      if (pb) pb.style.display = 'block';
      if (uz) uz.style.display = 'none';
    }
  });

  // Modal overlay closing
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal(e.target.id);
    }
  });

  // Common Form Handlers
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = loginForm.querySelector('button[type="submit"]');
      setButtonLoading(btn, true, 'Signing In...');
      
      const res = await doLogin(
        document.getElementById('username').value.trim(),
        document.getElementById('password').value
      );
      
      const errorEl = document.getElementById('errorMsg');
      if (res && res.success) {
        if (errorEl) errorEl.classList.add('hidden');
        showToast(res.message || 'Login successful.', 'success');
        setTimeout(() => {
          redirectForRole(res.user.role);
        }, 350);
      } else {
        if (errorEl) {
          errorEl.classList.remove('hidden');
          errorEl.querySelector('span').textContent = res ? res.message : t('loginError');
        }
        setButtonLoading(btn, false);
      }
    });

    const passToggle = document.getElementById('passToggle');
    if (passToggle) {
      passToggle.addEventListener('click', () => {
        const input = document.getElementById('password');
        const isPass = input.type === 'password';
        input.type = isPass ? 'text' : 'password';
        const eye = document.getElementById('eyeIcon');
        if (eye) {
          eye.innerHTML = isPass 
            ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`
            : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
        }
      });
    }
  }

  // Sidebar Toggle Helper
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.add('open');
      if (overlay) overlay.classList.add('open');
    });
    if (overlay) overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }
});
function redirectForRole(role) {
  if (role === "worker") {
    window.location.href = "dashboard-worker.html";
  } else if (role === "admin") {
    window.location.href = "dashboard-owner.html";
  } else {
    alert("Unknown role");
  }
}

/* ── Export Helper ── */
function exportCSV(rows, filename) {
  if (!rows || !rows.length) { showToast('No data to export', 'warning'); return; }
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(','),
    ...rows.map(r => headers.map(h => `"${(r[h]||'').toString().replace(/"/g,'""')}"`).join(','))
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename || 'export.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast('CSV exported successfully!', 'success');
}

/* ── Feature: Owner Dashboard ── */
async function loadOwnerDashboard() {
  const user = requireAuth('admin');
  if (!user) return;

  if (document.getElementById('ownerName')) {
    document.getElementById('ownerName').textContent = user.name;
  }
  if (document.getElementById('ownerNameWelcome')) {
    document.getElementById('ownerNameWelcome').textContent = user.name.split(' ')[0];
  }
  const ownerAvatar = document.getElementById('ownerAvatar') || document.querySelector('.user-profile-btn .avatar-placeholder');
  if (ownerAvatar) ownerAvatar.textContent = initials(user.name);

  // Render sub-components
  renderOwnerStats();
  renderOwnerEmployees();
  renderOwnerOrders();
  renderOwnerInventory();
  renderOwnerPayments();
  renderOwnerAttendance();
  renderOwnerQuality();
  renderOwnerPerformance();
  renderOwnerNotifs();
}

const stagePipe = cur => {
  const stages = ['cutting', 'sewing', 'finishing', 'packaging'];
  const ci = stages.indexOf(cur);
  return stages.map((s, i) => {
    const cls = i < ci ? 'done' : i === ci ? 'active' : '';
    const arrow = i < stages.length - 1 ? `<span class="stage-arrow${i < ci ? ' done' : ''}"></span>` : '';
    return `<span class="stage-step ${cls}">${s[0].toUpperCase() + s.slice(1)}</span>${arrow}`;
  }).join('');
};

async function renderOwnerStats() {
  const res = await apiFetch('get_dashboard_stats.php', { suppressToast: true });
  const stats = res.raw && (res.raw.stats || res.raw.data || res.data) || {};
  const totalEmployees = stats.totalEmployees ?? stats.total_employees ?? currentData.employees.length;
  const totalOrders = stats.ordersInProgress ?? stats.orders_in_progress ?? currentData.orders.filter((order) => order.status !== 'completed').length;
  const completedItems = stats.completedItems ?? stats.completed_items ?? currentData.orders.reduce((sum, order) => sum + Number(order.done || 0), 0);
  const revenue = stats.totalRevenue ?? stats.total_revenue ?? currentData.payments.reduce((sum, payment) => sum + Number(payment.salary || 0), 0);

  const totalEmpStat = document.getElementById('totalEmpStat');
  const totalOrdersStat = document.getElementById('totalOrdersStat');
  const totalItemsStat = document.getElementById('totalItemsStat');
  if (totalEmpStat) totalEmpStat.textContent = formatNumber(totalEmployees, '0');
  if (totalOrdersStat) totalOrdersStat.textContent = formatNumber(totalOrders, '0');
  if (totalItemsStat) totalItemsStat.textContent = formatNumber(completedItems, '0');
  const profitCard = document.querySelectorAll('.stat-card .stat-value')[3];
  if (profitCard) profitCard.textContent = formatCurrency(revenue, 'Rs 0');
  const empBadge = document.getElementById('empBadge');
  if (empBadge) empBadge.textContent = formatNumber(totalEmployees, '0');
  const ordersBadge = document.getElementById('ordersBadge');
  if (ordersBadge) ordersBadge.textContent = formatNumber(currentData.orders.length || totalOrders, '0');
  renderCharts(stats);
}

function renderCharts(stats = {}) {
  const series = Array.isArray(stats.productionSeries) ? stats.productionSeries : Array.isArray(stats.production_series) ? stats.production_series : [];
  const labels = Array.isArray(stats.productionLabels) ? stats.productionLabels : Array.isArray(stats.production_labels) ? stats.production_labels : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const chartData = series.length ? series : [240, 310, 280, 420, 380, 450];
  drawChart('productionChart', 'productionLabels', chartData, labels, '#2563EB');
  drawChart('rptProdChart', 'rptProdLabels', chartData, labels, '#10B981');
  const perfData = currentData.employees.slice(0, 6).map((employee) => Number(employee.pieces || 0));
  const perfLabels = currentData.employees.slice(0, 6).map((employee) => String(employee.name || '').split(' ')[0] || '-');
  if (perfData.length) drawChart('perfChart', 'perfLabels', perfData, perfLabels, '#7C3AED');
}

function drawChart(cId, lId, data, labels, color) {
  const max = Math.max(...data);
  const b = document.getElementById(cId);
  const l = document.getElementById(lId);
  if (!b || !l) return;
  b.innerHTML = '';
  l.innerHTML = '';
  data.forEach((v, i) => {
    const h = Math.max(20, Math.round((v / max) * 140));
    b.innerHTML += `<div class="chart-bar" style="height:${h}px;background:${color};opacity:${0.5 + (i / data.length) * 0.5}" title="${labels[i]}: ${v.toLocaleString()}"></div>`;
  });
  labels.forEach(lb => {
    l.innerHTML += `<span>${lb}</span>`;
  });
}

async function renderOwnerEmployees() {
  const res = await apiFetch('get_employees.php', { suppressToast: true });
  const table = document.getElementById('empTable');
  const list = document.getElementById('employeeList');
  const rows = getArrayData(res, ['employees', 'items']);
  if (!rows.length) {
    if (table) table.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No employee data available.</td></tr>';
    if (list) showInlineMessage(list, 'No employee data available right now.', 'info');
    return;
  }
  currentData.employees = rows;

  if (table) {
    table.innerHTML = rows.map(e => `
      <tr>
        <td><div class="flex items-center gap-2"><div class="avatar-placeholder avatar-sm" style="background:${e.color || '#2563EB'}">${escapeHtml(e.initials || initials(e.name))}</div>${escapeHtml(e.name || 'Employee')}</div></td>
        <td><span class="role-tag ${roleClass(e.role)}">${escapeHtml(e.role || 'sewing')}</span></td>
        <td><span class="badge ${stBadge(e.status)}">${escapeHtml(e.status || 'active')}</span></td>
        <td>${formatNumber(e.pieces || 0, '0')}</td>
        <td>${formatCurrency(e.earnings || 0, 'Rs 0')}</td>
        <td><button class="btn btn-secondary btn-sm" data-modal-target="assignModal">Assign</button></td>
      </tr>
    `).join('');
  }

  if (list) {
    list.innerHTML = rows.slice(0, 5).map(e => `
      <div class="list-item">
        <div class="avatar-placeholder avatar-md" style="background:${e.color || '#2563EB'}">${escapeHtml(e.initials || initials(e.name))}</div>
        <div class="list-item-info"><h4>${escapeHtml(e.name || 'Employee')}</h4><p>${formatNumber(e.pieces || 0, '0')} pieces today</p></div>
        <span class="role-tag ${roleClass(e.role)}">${escapeHtml(e.role || 'sewing')}</span>
      </div>
    `).join('');
  }

  const onlineCount = document.getElementById('onlineCount');
  if (onlineCount) {
    const present = rows.filter((employee) => String(employee.status || '').toLowerCase() !== 'absent').length;
    onlineCount.textContent = `${formatNumber(present, '0')} Online`;
  }
  renderOwnerStats();
}

async function renderOwnerOrders() {
  const res = await apiFetch('get_orders.php', { suppressToast: true });
  const tb = document.getElementById('ordersTable');
  const summary = document.getElementById('orderSummary');
  const rows = getArrayData(res, ['orders', 'items']);
  if (!rows.length) {
    if (tb) tb.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No orders available.</td></tr>';
    if (summary) summary.innerHTML = '';
    return;
  }

  currentData.orders = rows;
  if (tb) tb.innerHTML = rows.map(o => `
    <tr>
      <td style="font-weight:700;color:var(--primary)">${escapeHtml(o.id || o.order_id || '-')}</td>
      <td>${escapeHtml(o.product || o.product_name || 'Order')}</td>
      <td>${o.client || '—'}</td>
      <td>${formatNumber(o.qty || o.quantity || 0, '0')}</td>
      <td>${o.deadline || '—'} <span class="${o.delay ? 'delay-badge' : 'ontrack-badge'}">${o.delay ? '⚠️ At Risk' : '✓ On Track'}</span></td>
      <td><div class="stage-pipeline">${stagePipe(o.stage)}</div></td>
      <td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar" style="flex:1;min-width:60px"><div class="progress-bar-fill" style="width:${o.progress}%;background:${o.progress >= 100 ? 'var(--success)' : 'var(--primary)'}"></div></div><span style="font-size:.78rem;font-weight:700">${o.progress}%</span></div></td>
      <td><span class="badge ${stBadge(o.status)}">${escapeHtml(o.status || 'pending')}</span></td>
    </tr>
  `).join('');

  if (summary) {
    const total = rows.length,
          inProg = rows.filter(o => String(o.status || '').toLowerCase() !== 'completed').length,
          compl = rows.filter(o => String(o.status || '').toLowerCase() === 'completed').length;
    summary.innerHTML = `<div class="summary-chip">Total <span class="val">${total}</span></div><div class="summary-chip">In Progress <span class="val" style="color:var(--primary)">${inProg}</span></div><div class="summary-chip">Completed <span class="val" style="color:var(--success)">${compl}</span></div>`;
  }
  renderOwnerStats();
}

async function renderOwnerInventory() {
  const res = await apiFetch('get_inventory.php', { suppressToast: true });
  const tb = document.getElementById('invTable');
  const list = document.getElementById('inventoryList');
  const rows = getArrayData(res, ['inventory', 'materials', 'items']);
  if (!rows.length) {
    if (tb) tb.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No inventory data available.</td></tr>';
    if (list) showInlineMessage(list, 'Inventory data will appear here once available.', 'info');
    return;
  }

  currentData.inventory = rows;
  if (tb) {
    tb.innerHTML = rows.map(item => {
      const pct = Math.round((item.qty / item.max) * 100);
      const danger = item.qty <= item.threshold;
      const color = danger ? '#EF4444' : pct < 50 ? '#F59E0B' : '#10B981';
      return `
        <tr>
          <td style="font-weight:600">${item.name}</td>
          <td><span class="badge badge-gray" style="text-transform:capitalize">${item.category}</span></td>
          <td style="font-weight:700">${item.qty.toLocaleString()}</td><td>${item.unit}</td>
          <td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar" style="flex:1;min-width:80px"><div class="progress-bar-fill" style="width:${pct}%;background:${color}"></div></div><span style="font-size:.75rem;font-weight:700;color:${color}">${pct}%</span></div></td>
          <td><span class="badge ${danger ? 'badge-danger' : pct < 50 ? 'badge-warning' : 'badge-success'}">${danger ? 'Low Stock' : pct < 50 ? 'Moderate' : 'OK'}</span></td>
        </tr>
      `;
    }).join('');
  }

  if (list) {
    list.innerHTML = rows.slice(0, 6).map(item => {
      const pct = Math.round((item.qty / item.max) * 100);
      const danger = item.qty <= item.threshold;
      return `<div class="inv-row"><div class="inv-top"><span>${item.name}</span><span class="badge ${danger ? 'badge-danger' : 'badge-success'}">${item.qty} ${item.unit}</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%"></div></div></div>`;
    }).join('');
  }

  const lowStockCount = document.getElementById('lowStockCount');
  if (lowStockCount) {
    const low = rows.filter((item) => item.qty <= item.threshold).length;
    lowStockCount.textContent = `${formatNumber(low, '0')} Low Stock`;
  }
}

async function renderOwnerPayments() {
  const res = await apiFetch('get_payments.php', { suppressToast: true });
  const tb = document.getElementById('paymentsTable');
  const list = document.getElementById('paymentList');
  const rows = getArrayData(res, ['payments', 'items']);
  if (!rows.length) {
    if (tb) tb.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No payment records available.</td></tr>';
    if (list) showInlineMessage(list, 'No pending payments right now.', 'info');
    return;
  }

  currentData.payments = rows;
  if (tb) {
    tb.innerHTML = rows.map(p => `
      <tr>
        <td><div style="font-weight:600">${p.name}</div></td>
        <td>${p.period}</td>
        <td>${(p.pieces || 0).toLocaleString()}</td>
        <td>Rs ${(p.rate || 0).toLocaleString()}</td>
        <td>${p.bonus ? `<span style="color:var(--success)">+Rs ${p.bonus.toLocaleString()}</span>` : '—'}</td>
        <td style="font-weight:800">Rs ${p.salary.toLocaleString()}</td>
        <td><span class="ph-status ${p.status === 'paid' ? 'ph-paid' : 'ph-pending'}">${p.status}</span></td>
        <td>${p.status === 'pending' ? `<button class="btn btn-success btn-sm" data-action="pay-worker" data-id="${p.id}">Pay Now</button>` : `<span style="color:var(--text-muted)">${p.date || ''}</span>`}</td>
      </tr>
    `).join('');
  }

  if (list) {
    list.innerHTML = rows.filter(p => String(p.status || '').toLowerCase() === 'pending').slice(0, 4).map(p => {
      const ini = p.name.split(' ').slice(0, 2).map(n => n[0]).join('');
      return `<div class="pay-row"><div class="flex items-center gap-2"><div class="avatar-placeholder avatar-sm">${ini}</div><div><div style="font-weight:600">${p.name}</div><div style="font-size:.75rem">${p.period}</div></div></div><div class="flex gap-2"><span style="font-weight:700">Rs ${p.salary.toLocaleString()}</span><button class="btn btn-success btn-sm" data-action="pay-worker" data-id="${p.id}">Pay</button></div></div>`;
    }).join('');
  }
}

async function renderOwnerAttendance() {
  const res = await apiFetch('get_attendance.php', { suppressToast: true });
  const tb = document.getElementById('attendanceTable');
  const statsWrap = document.getElementById('attendanceStats');
  const rows = getArrayData(res, ['attendance', 'items']);
  if (!rows.length) {
    if (tb) tb.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No attendance data available.</td></tr>';
    if (statsWrap) statsWrap.innerHTML = '';
    return;
  }

  currentData.attendance = rows;
  if (tb) tb.innerHTML = rows.map(a => `
    <tr>
      <td>${a.name}</td><td>${a.date}</td>
      <td>${a.checkIn || '—'}</td><td>${a.checkOut || '—'}</td>
      <td style="font-weight:600">${a.hours || '—'}</td>
      <td><span class="badge ${a.status === 'present' ? 'badge-success' : 'badge-danger'}">${a.status}</span></td>
    </tr>
  `).join('');
  if (statsWrap) {
    const present = rows.filter((a) => String(a.status || '').toLowerCase() === 'present').length;
    const absent = rows.filter((a) => String(a.status || '').toLowerCase() === 'absent').length;
    const rate = rows.length ? Math.round((present / rows.length) * 100) : 0;
    statsWrap.innerHTML = `
      <div class="attendance-stat"><div class="as-val">${formatNumber(present, '0')}</div><div class="as-lbl">Present</div></div>
      <div class="attendance-stat"><div class="as-val">${formatNumber(absent, '0')}</div><div class="as-lbl">Absent</div></div>
      <div class="attendance-stat"><div class="as-val">${rate}%</div><div class="as-lbl">Attendance Rate</div></div>
    `;
  }

  const badge = document.getElementById('wNotifBadge');
  if (badge) badge.textContent = rows.filter((item) => !item.read).length || '0';
}

async function renderOwnerQuality() {
  const res = await apiFetch('get_quality.php', { suppressToast: true });
  const tb = document.getElementById('qualityTable');
  const rows = getArrayData(res, ['quality', 'items']);
  if (!rows.length) {
    if (tb) tb.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No quality data available.</td></tr>';
    return;
  }

  currentData.quality = rows;
  if (tb) tb.innerHTML = rows.map(q => {
    const cls = q.score >= 95 ? 'qs-high' : q.score >= 80 ? 'qs-medium' : 'qs-low';
    return `
      <tr>
        <td>${q.name}</td><td>${q.task}</td><td>${q.total}</td>
        <td style="color:var(--danger)">${q.defective}</td><td style="color:var(--success)">${q.total - q.defective}</td>
        <td><span class="quality-score ${cls}">${q.score}%</span></td>
        <td>${q.date}</td>
        <td><button class="btn btn-warning btn-sm" data-action="reassign-quality" data-id="${q.id}">Reassign</button></td>
      </tr>
    `;
  }).join('');
}

async function renderOwnerPerformance() {
  const res = await apiFetch('get_performance.php', { suppressToast: true });
  const lb = document.getElementById('perfLeaderboard');
  const tb = document.getElementById('perfTable');
  const rows = getArrayData(res, ['performance', 'items']);
  if (!rows.length) {
    if (lb) showInlineMessage(lb, 'Performance data is not available yet.', 'info');
    if (tb) tb.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No performance records available.</td></tr>';
    return;
  }
  currentData.reports = rows;

  if (lb) {
    lb.innerHTML = rows.slice(0, 5).map((e, i) => `
      <div class="perf-row">
        <div class="rank-badge rank-${i < 3 ? i + 1 : 'other'}">${i + 1}</div>
        <div class="avatar-placeholder avatar-sm" style="background:${e.color}">${e.initials}</div>
        <div class="perf-row-info"><h4>${e.name}</h4><p>${e.role} · Quality: ${e.quality}%</p></div>
        <div class="perf-eff"><div class="val">${e.piecesPerDay}</div><div class="lbl">pcs/day</div></div>
      </div>
    `).join('');
  }

  if (tb) {
    tb.innerHTML = rows.map((e, i) => `
      <tr>
        <td><div class="rank-badge rank-${i < 3 ? i + 1 : 'other'}">${i + 1}</div></td>
        <td><div class="flex items-center gap-2"><div class="avatar-placeholder avatar-sm" style="background:${e.color}">${e.initials}</div>${e.name}</div></td>
        <td><span class="role-tag ${roleClass(e.role)}">${e.role}</span></td>
        <td style="font-weight:700">${e.totalPieces.toLocaleString()}</td><td>${e.daysWorked}</td>
        <td style="font-weight:800;color:var(--primary)">${e.piecesPerDay} pcs/day</td>
        <td><span class="quality-score ${e.quality >= 95 ? 'qs-high' : 'qs-medium'}">${e.quality}%</span></td>
        <td style="font-size:.8rem">${e.suggestion || ''}</td>
      </tr>
    `).join('');
  }

  const rptPerfList = document.getElementById('rptPerfList');
  if (rptPerfList) {
    rptPerfList.innerHTML = rows.slice(0, 5).map((e) => `<div class="list-item"><div class="avatar-placeholder avatar-md" style="background:${e.color}">${e.initials}</div><div class="list-item-info"><h4>${e.name}</h4><p>${e.role} | ${e.quality}% quality</p></div><strong>${e.piecesPerDay}</strong></div>`).join('');
  }
}

async function renderOwnerNotifs() {
  const res = await apiFetch('get_notifications.php', { suppressToast: true });
  const nl = document.getElementById('notifList');
  const badge = document.getElementById('notifBadge');
  const rows = getArrayData(res, ['notifications', 'items']);
  if (!rows.length) {
    if (nl) showInlineMessage(nl, 'No notifications available.', 'info');
    if (badge) badge.textContent = '';
    return;
  }

  currentData.notifications = rows;
  if (nl) nl.innerHTML = rows.map(n => `
    <div class="notif-item" style="${n.read ? 'opacity:.7' : ''}">
      <div class="notif-type-icon nti-${n.type}"></div>
      <div style="flex:1"><div style="font-weight:${n.read ? '500' : '700'}">${n.title}</div><div style="font-size:.8rem">${n.msg}</div><div style="font-size:.72rem">${n.time}</div></div>
    </div>
  `).join('');
  if (badge) badge.textContent = rows.filter(n => !n.read).length || '';
  const workerBadge = document.getElementById('wNotifBadge');
  if (workerBadge) workerBadge.textContent = rows.filter(n => !n.read).length || '0';
}

/* ── Feature: Worker Dashboard ── */
async function loadWorkerDashboard() {
  const user = requireAuth('worker');
  if (!user) return;

  const first = user.name.split(' ')[0];
  const h = new Date().getHours();
  const greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  
  if (document.getElementById('workerGreeting')) {
    document.getElementById('workerGreeting').textContent = `${greet}, ${first} 👋`;
  }
  
  const initials = user.name.split(' ').slice(0, 2).map(n => n[0]).join('');
  ['workerAvatar', 'profileAvatar'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = initials;
  });

  if (document.getElementById('profileName')) document.getElementById('profileName').textContent = user.name;
  if (document.getElementById('profileDept')) document.getElementById('profileDept').textContent = (user.dept || 'Sewing') + ' Department';

  renderWorkerHome();
  renderWorkerTasks();
}

async function renderWorkerHome() {
  const res = await apiFetch('get_worker_stats.php', { suppressToast: true });
  const me = res.raw && (res.raw.data || res.raw.stats || res.data);
  if (!me) return;
  if (document.getElementById('wTotalEarnings')) document.getElementById('wTotalEarnings').textContent = `Rs ${(me.earnings || 0).toLocaleString()}`;
  if (document.getElementById('wTodayEarnings')) document.getElementById('wTodayEarnings').textContent = `Rs ${(me.todayEarnings || 0).toLocaleString()}`;
  if (document.getElementById('wWeekEarnings')) document.getElementById('wWeekEarnings').textContent = `Rs ${(me.weekEarnings || 0).toLocaleString()}`;
  if (document.getElementById('wPieces')) document.getElementById('wPieces').textContent = (me.pieces || 0).toLocaleString();
  if (document.getElementById('wQualScore')) document.getElementById('wQualScore').textContent = `${me.qualityScore || 98}%`;
  if (document.getElementById('wRank')) document.getElementById('wRank').textContent = `#${me.rank || '—'}`;
  if (document.getElementById('wEfficiency')) document.getElementById('wEfficiency').textContent = me.efficiency || '—';

  if (document.getElementById('wEarningsPeriod')) document.getElementById('wEarningsPeriod').textContent = me.periodLabel || me.period || 'Current Month';

  const btn = document.getElementById('wAttendBtn');
  const statusEl = document.getElementById('wAttendStatus');
  if (btn && statusEl) {
    if (me.attendance && me.attendance.checkOut) {
      btn.textContent = '✓ Done';
      btn.className = 'attend-card-btn done';
      statusEl.textContent = `Checked out at ${me.attendance.checkOut}`;
    } else if (me.attendance && me.attendance.checkIn) {
      btn.textContent = 'Check Out';
      btn.className = 'attend-card-btn check-out';
      statusEl.textContent = `Checked in at ${me.attendance.checkIn}`;
    } else {
      btn.textContent = 'Check In';
      btn.className = 'attend-card-btn check-in';
      statusEl.textContent = `Not checked in yet for ${new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short' })}`;
    }
  }

  renderWorkerRecentNotifs();
}

async function renderWorkerTasks() {
  const res = await apiFetch('get_worker_tasks.php', { suppressToast: true });
  const list = document.getElementById('workerTaskList');
  const rows = getArrayData(res, ['tasks', 'items']);
  currentData.workerTasks = rows;
  if (!list) return;
  if (!rows.length) {
    showInlineMessage(list, 'No active tasks assigned right now.', 'info');
    return;
  }

  list.innerHTML = rows.map((task) => {
    const target = Number(task.target || task.target_pieces || task.qty || 0);
    const done = Number(task.done || task.completed || 0);
    const progress = Number(task.progress || (target ? (done / target) * 100 : 0));
    return `
      <div class="task-card">
        <div class="task-card-header">
          <div>
            <div class="task-card-title">${escapeHtml(task.product || task.task || 'Task')}</div>
            <div class="text-muted" style="font-size:.8rem;">${escapeHtml(task.stage || task.department || 'Production')}</div>
          </div>
          <span class="badge ${stBadge(task.status)}">${escapeHtml(task.status || 'inProgress')}</span>
        </div>
        <div class="task-card-meta">
          <div class="task-card-meta-item">Target: ${formatNumber(target, '0')}</div>
          <div class="task-card-meta-item">Done: ${formatNumber(done, '0')}</div>
        </div>
        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:6px;"><span>Due ${escapeHtml(formatDate(task.dueDate || task.due_date || task.deadline, '--'))}</span><strong>${Math.round(progress)}%</strong></div>
          <div class="progress-bar"><div class="progress-bar-fill blue" style="width:${Math.round(progress)}%"></div></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
          <div style="font-size:.82rem;color:var(--text-secondary);">Rate: ${formatCurrency(task.rate || task.rate_per_piece || 0, 'Rs 0')}</div>
          <a class="btn btn-primary btn-sm" href="task-submission.html?id=${encodeURIComponent(task.id || task.task_id || '')}">Submit Work</a>
        </div>
      </div>
    `;
  }).join('');
}

async function renderWorkerRecentNotifs() {
  const res = await apiFetch('get_notifications.php', { suppressToast: true });
  const rn = document.getElementById('wRecentNotifs');
  const rows = getArrayData(res, ['notifications', 'items']);
  currentData.notifications = rows;
  if (!rn) return;
  if (!rows.length) {
    showInlineMessage(rn, 'No notifications available.', 'info');
    return;
  }

  const icons = { task: '🔵', payment: '🟢', leave: '🟡', material: '🔴' };
  rn.innerHTML = rows.slice(0, 3).map(n => `
    <div class="notif-item">
      <div class="notif-type-icon nti-${n.type}"><span style="font-size:14px">${icons[n.type] || '🔔'}</span></div>
      <div>
        <div style="font-size:.875rem;font-weight:${n.read ? '500' : '700'};margin-bottom:2px">${n.title}</div>
        <div style="font-size:.8rem;color:var(--text-secondary)">${n.msg}</div>
        <div style="font-size:.72rem;color:var(--text-muted);margin-top:3px">${n.time}</div>
      </div>
    </div>
  `).join('');
}

async function handleWorkerAttend() {
  const res = await apiFetch('worker_attendance.php', { method: 'POST' });
  if (res.success) {
    showToast(res.message, 'success');
    renderWorkerHome();
  }
}

async function renderWorkerEarnings() {
  const res = await apiFetch('get_worker_earnings.php', { suppressToast: true });
  const tb = document.getElementById('wPayHistory');
  const data = res.raw && (res.raw.data || res.data);
  if (!data || !tb) {
    if (tb) showInlineMessage(tb, 'Payment history is not available yet.', 'info');
    return;
  }
  if (document.getElementById('wEarningsTotal')) document.getElementById('wEarningsTotal').textContent = `Rs ${data.totalPaid.toLocaleString()}`;
  if (document.getElementById('wEarningsPcs')) document.getElementById('wEarningsPcs').textContent = data.totalPieces.toLocaleString();
  if (document.getElementById('wEarningsBonus')) document.getElementById('wEarningsBonus').textContent = `Rs ${data.totalBonus.toLocaleString()}`;
  if (document.getElementById('wEarningsCycle')) document.getElementById('wEarningsCycle').textContent = data.cycleLabel || data.period || 'Current cycle';

  const history = Array.isArray(data.history) ? data.history : [];
  if (!history.length) {
    showInlineMessage(tb, 'Payment history is not available yet.', 'info');
    return;
  }

  tb.innerHTML = history.map(p => `
    <div class="ph-row">
      <div>
        <div style="font-weight:600;font-size:.88rem">${p.period}</div>
        <div class="ph-period">${(p.pieces || 0).toLocaleString()} pcs × Rs ${p.rate}${p.bonus ? ` + Rs ${p.bonus.toLocaleString()} bonus` : ''}</div>
      </div>
      <div style="text-align:right">
        <div class="ph-amount">Rs ${p.salary.toLocaleString()}</div>
        <span class="ph-status ${p.status === 'paid' ? 'ph-paid' : 'ph-pending'}">${p.status}</span>
      </div>
    </div>
  `).join('');
}

async function renderWorkerNotifs() {
  const res = await apiFetch('get_notifications.php', { suppressToast: true });
  const nl = document.getElementById('wNotifList');
  const rows = getArrayData(res, ['notifications', 'items']);
  if (!nl) return;
  if (!rows.length) {
    showInlineMessage(nl, 'No notifications available.', 'info');
    return;
  }

  nl.innerHTML = rows.map(n => `
    <div class="notif-item">
      <div class="notif-type-icon nti-${n.type}"></div>
      <div>
        <div style="font-size:.875rem;font-weight:${n.read ? '500' : '700'};margin-bottom:2px">${n.title}</div>
        <div style="font-size:.8rem;color:var(--text-secondary)">${n.msg}</div>
        <div style="font-size:.72rem">${n.time}</div>
      </div>
    </div>
  `).join('');
}

async function renderWorkerProfile() {
  const res = await apiFetch('get_worker_profile.php', { suppressToast: true });
  const me = res.raw && (res.raw.data || res.data);
  if (!me) return;
  if (document.getElementById('profPieces')) document.getElementById('profPieces').textContent = (me.piecesTotal || 0).toLocaleString();
  if (document.getElementById('profEarnings')) document.getElementById('profEarnings').textContent = `Rs ${(me.totalEarnings || 0).toLocaleString()}`;
  if (document.getElementById('profQuality')) document.getElementById('profQuality').textContent = `${me.qualityScore || 98}%`;
}

function switchWorkerPage(id) {
  document.querySelectorAll('.worker-page').forEach(p => p.classList.toggle('hidden', p.id !== id));
  document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.toggle('active', b.getAttribute('data-nav') === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'wEarnings') renderWorkerEarnings();
  else if (id === 'wNotifs') renderWorkerNotifs();
  else if (id === 'wProfile') renderWorkerProfile();
}

/* ── Feature: Settings ── */
async function loadSettings() {
  const user = getStoredUser() || {};
  if (!user.name) return;

  if (document.getElementById('settingsName')) document.getElementById('settingsName').textContent = user.name;
  if (document.getElementById('settingsAvatar')) {
    document.getElementById('settingsAvatar').textContent = user.name.split(' ').slice(0, 2).map(n => n[0]).join('');
  }
  
  const roleEl = document.getElementById('settingsRole');
  if (roleEl) {
    roleEl.textContent = user.role === 'admin' ? 'Factory Owner · Admin' : `${user.dept || 'Sewing'} Department · Worker`;
  }

  const nameInput = document.getElementById('pName');
  if (nameInput) nameInput.value = user.name;
  const emailInput = document.getElementById('pEmail');
  if (emailInput) emailInput.value = user.email || '';
  const phoneInput = document.getElementById('pPhone');
  if (phoneInput) phoneInput.value = user.phone || '';
  const roleInput = document.getElementById('pRole');
  if (roleInput) roleInput.value = user.role === 'admin' ? 'Admin' : 'Worker';

  // Sync lang pills
  document.querySelectorAll('.lang-pill').forEach(p => {
    p.classList.toggle('active', p.getAttribute('data-lang') === currentLang);
  });

  if (document.getElementById('statWorkers')) {
    if (user.role === 'admin') {
      document.getElementById('statWorkers').textContent = formatNumber(currentData.employees.length, '0');
      document.getElementById('statOrders').textContent = formatNumber(currentData.orders.length, '0');
      document.getElementById('statRevenue').textContent = formatCurrency(currentData.payments.reduce((sum, item) => sum + Number(item.salary || 0), 0), 'Rs 0');
    } else {
      document.getElementById('statWorkers').textContent = formatNumber(document.getElementById('profPieces')?.textContent || 0, '0');
      document.getElementById('statOrders').textContent = formatNumber(currentData.workerTasks.length, '0');
      document.getElementById('statRevenue').textContent = document.getElementById('profEarnings')?.textContent || 'Rs 0';
    }
  }
}

async function saveProfile() {
  const name = document.getElementById('pName').value;
  const email = document.getElementById('pEmail').value;
  const phone = document.getElementById('pPhone').value;

  const res = await apiFetch('update_profile.php', {
    method: 'POST',
    data: { name, email, phone }
  });

  if (res.success) {
    const user = getStoredUser() || {};
    user.name = name;
    user.email = email;
    user.phone = phone;
    localStorage.setItem('cfms_user', JSON.stringify(user));
    showToast('Profile updated successfully!', 'success');
    loadSettings();
  }
}

async function handlePassChange(e) {
  e.preventDefault();
  const newPass = document.getElementById('newPass').value;
  const confPass = document.getElementById('confPass').value;

  if (newPass !== confPass) {
    showToast('Passwords do not match', 'error');
    return;
  }

  const res = await apiFetch('change_password.php', {
    method: 'POST',
    data: {
      current_password: document.getElementById('currentPass') ? document.getElementById('currentPass').value : '',
      new_password: newPass
    }
  });

  if (res.success) {
    showToast('Password changed successfully!', 'success');
    e.target.reset();
  }
}

/* ── Feature: Worker Actions (Material, Leave, Task) ── */
async function submitMaterialRequest(e) {
  if (e) e.preventDefault();
  const type = document.querySelector('.material-btn.selected')?.dataset.type || 'other';
  const qty = document.getElementById('qty').value;
  const unit = document.getElementById('unitSel').value;
  const urgency = document.querySelector('.urgency-btn[class*="selected-"]')?.dataset.urgency || 'normal';
  const notes = document.getElementById('notes')?.value || '';
  const spec = document.getElementById('spec')?.value || '';
  const submitButton = document.querySelector('button[form="materialForm"]') || document.querySelector('#materialForm button[type="submit"]');

  if (!qty || qty < 1) {
    showToast('Please enter a valid quantity', 'warning');
    return;
  }

  setButtonLoading(submitButton, true, 'Submitting...');
  const res = await apiFetch('material.php', {
    method: 'POST',
    data: { type, qty, unit, urgency, notes, specification: spec }
  });
  setButtonLoading(submitButton, false);

  if (res.success) {
    showToast('Material request submitted!', 'success');
    currentData.materialHistory = [];
    await initMaterialPage();
  }
}

async function submitLeaveRequest(e) {
  if (e) e.preventDefault();
  const type = document.querySelector('.type-btn.selected')?.dataset.type || 'casual';
  const start = document.getElementById('leaveDate')?.value;
  const end = document.getElementById('leaveEnd')?.value || start;
  const reason = document.getElementById('leaveReason')?.value || '';
  const submitButton = document.querySelector('button[form="leaveForm"]') || document.querySelector('#leaveForm button[type="submit"]');

  if (!start || !reason.trim()) {
    showToast('Please complete the leave form', 'warning');
    return;
  }

  setButtonLoading(submitButton, true, 'Submitting...');
  const res = await apiFetch('leave.php', {
    method: 'POST',
    data: { type, start_date: start, end_date: end, reason }
  });
  setButtonLoading(submitButton, false);

  if (res.success) {
    showToast('Leave request submitted!', 'success');
    currentData.leaveHistory = [];
    await initLeavePage();
  }
}

async function submitTaskDone(e) {
  if (e) e.preventDefault();
  const taskId = new URLSearchParams(window.location.search).get('id');
  const pieces = document.getElementById('piecesDone').value;
  const notes = document.getElementById('taskNotes').value;
  const fileInput = document.getElementById('fileInput');
  const submitButton = document.querySelector('#taskForm button[type="submit"]') || document.getElementById('submitBtn');

  if (!pieces || pieces < 1) {
    showToast('Please enter pieces completed', 'warning');
    return;
  }

  const formData = new FormData();
  formData.append('task_id', taskId || '');
  formData.append('pieces_done', pieces);
  formData.append('notes', notes || '');
  if (fileInput && fileInput.files && fileInput.files[0]) {
    formData.append('proof_image', fileInput.files[0]);
  }

  setButtonLoading(submitButton, true, 'Submitting...');
  const res = await apiFetch('task.php', {
    method: 'POST',
    data: formData
  });
  setButtonLoading(submitButton, false);

  if (res.success) {
    showToast('Task submitted successfully!', 'success');
    await initTaskSubmission();
  }
}

async function initLeavePage() {
  requireAuth('worker');
  const leaveDate = document.getElementById('leaveDate');
  const leaveEnd = document.getElementById('leaveEnd');
  const historyList = document.getElementById('leaveHistoryList');
  const today = new Date().toISOString().split('T')[0];
  if (leaveDate) leaveDate.min = today;
  if (leaveEnd) leaveEnd.min = today;

  const res = await apiFetch('get_leave_history.php', { suppressToast: true });
  const rows = getArrayData(res, ['history', 'leaves', 'items']);
  currentData.leaveHistory = rows;
  if (!historyList) return;
  if (!rows.length) {
    showInlineMessage(historyList, 'No leave history available yet.', 'info');
    return;
  }
  historyList.innerHTML = rows.slice(0, 5).map((item) => `
    <div class="history-item">
      <div class="history-item-left">
        <div class="history-icon" style="background:#EFF6FF;color:#2563EB;">${escapeHtml(String(item.type || 'L').charAt(0).toUpperCase())}</div>
        <div><div style="font-weight:600;font-size:.88rem;">${escapeHtml(item.type || 'Leave')}</div><div style="font-size:.78rem;color:var(--text-secondary);">${escapeHtml(formatDate(item.start_date || item.date, '--'))}${item.end_date ? ` - ${escapeHtml(formatDate(item.end_date, '--'))}` : ''}</div></div>
      </div>
      <span class="badge ${stBadge(item.status)}">${escapeHtml(item.status || 'pending')}</span>
    </div>
  `).join('');
}

async function initMaterialPage() {
  requireAuth('worker');
  const requestList = document.getElementById('recentRequestsList');
  const res = await apiFetch('get_material_requests.php', { suppressToast: true, query: { mine: 1 } });
  const rows = getArrayData(res, ['requests', 'materials', 'items']);
  currentData.materialHistory = rows;
  if (!requestList) return;
  if (!rows.length) {
    showInlineMessage(requestList, 'No recent material requests found.', 'info');
    return;
  }
  requestList.innerHTML = rows.slice(0, 5).map((item) => `
    <div class="recent-item">
      <div>
        <div style="font-size:.88rem;font-weight:600;">${escapeHtml(item.material || item.type || 'Material')}</div>
        <div style="font-size:.78rem;color:var(--text-secondary);">${formatNumber(item.qty || item.quantity || 0, '0')} ${escapeHtml(item.unit || 'pcs')}</div>
      </div>
      <span class="badge ${stBadge(item.status)}">${escapeHtml(item.status || 'pending')}</span>
    </div>
  `).join('');
}

async function initTaskSubmission() {
  const taskId = new URLSearchParams(window.location.search).get('id');
  if (!taskId) return;

  const res = await apiFetch('get_task_details.php', { suppressToast: true, query: { id: taskId } });
  const task = res.raw && (res.raw.data || res.data);
  if (!task) return;
  const t = task;
  if (document.querySelector('.task-title')) document.querySelector('.task-title').textContent = `${t.product} — ${t.stage}`;
  if (document.getElementById('targetCount')) document.getElementById('targetCount').textContent = formatNumber(task.target || task.target_pieces || task.qty || 0, '0');
  if (document.getElementById('doneCount')) document.getElementById('doneCount').textContent = formatNumber(task.done || task.completed || 0, '0');
  if (document.getElementById('pieceRate')) document.getElementById('pieceRate').textContent = formatCurrency(task.rate || task.rate_per_piece || 0, 'Rs 0');
  if (document.getElementById('earnAmt')) document.getElementById('earnAmt').textContent = formatCurrency((task.done || 0) * (task.rate || 0), 'Rs 0');
  if (document.getElementById('progressPct')) document.getElementById('progressPct').textContent = `${Math.round(Number(task.progress || 0))}%`;
  const pb = document.getElementById('progressBar');
  if (pb) pb.style.width = `${Math.round(Number(task.progress || 0))}%`;
}

/* ── Page Routing Logic ── */
function initPage() {
  const path = window.location.pathname;
  if (path.endsWith('index.html') || path === '/' || path === '') {
    requireAuth(null);
  } else if (path.includes('dashboard-owner.html')) {
    loadOwnerDashboard();
    const formMap = [
      ['assignForm', 'assign.php', 'Task assigned successfully.', 'assignModal'],
      ['msgForm', 'message.php', 'Message sent successfully.', 'msgModal'],
      ['newOrderForm', 'order.php', 'Order created successfully.', 'newOrderModal'],
      ['addStockForm', 'stock.php', 'Stock updated successfully.', 'addStockModal'],
      ['qualityForm', 'quality.php', 'Quality record saved successfully.', 'qualityModal']
    ];
    formMap.forEach(([id, endpoint, message, modalId]) => {
      const form = document.getElementById(id);
      if (form && !form.dataset.bound) {
        form.dataset.bound = 'true';
        form.addEventListener('submit', async (event) => {
          event.preventDefault();
          const submitButton = form.querySelector('button[type="submit"]');
          setButtonLoading(submitButton, true, 'Saving...');
          const result = await apiFetch(endpoint, { method: 'POST', data: new FormData(form) });
          setButtonLoading(submitButton, false);
          if (result.success) {
            showToast(result.message || message, 'success');
            closeModal(modalId);
            form.reset();
          }
        });
      }
    });
  } else if (path.includes('dashboard-worker.html')) {
    loadWorkerDashboard();
  } else if (path.includes('settings.html')) {
    requireAuth('any');
    loadSettings();
    const profileForm = document.getElementById('profileForm');
    const passwordForm = document.getElementById('passwordForm');
    if (profileForm && !profileForm.dataset.bound) {
      profileForm.dataset.bound = 'true';
      profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        saveProfile();
      });
    }
    if (passwordForm && !passwordForm.dataset.bound) {
      passwordForm.dataset.bound = 'true';
      passwordForm.addEventListener('submit', handlePassChange);
    }
  } else if (path.includes('leave-request.html')) {
    initLeavePage();
    const leaveForm = document.getElementById('leaveForm');
    if (leaveForm && !leaveForm.dataset.bound) {
      leaveForm.dataset.bound = 'true';
      leaveForm.addEventListener('submit', submitLeaveRequest);
    }
  } else if (path.includes('material-request.html')) {
    initMaterialPage();
    const materialForm = document.getElementById('materialForm');
    if (materialForm && !materialForm.dataset.bound) {
      materialForm.dataset.bound = 'true';
      materialForm.addEventListener('submit', submitMaterialRequest);
    }
  } else if (path.includes('task-submission.html')) {
    requireAuth('worker');
    initTaskSubmission();
    const taskForm = document.getElementById('taskForm');
    if (taskForm && !taskForm.dataset.bound) {
      taskForm.dataset.bound = 'true';
      taskForm.addEventListener('submit', submitTaskDone);
    }
  }
}
