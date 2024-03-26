export const RolePermissions = {
  'super-admin': {
    auth: ['view'],
    'auth/admin': ['create'],
    'auth/reset': ['create'],
    roles: ['view', 'create', 'update', 'delete'],
    users: ['view', 'create', 'update', 'delete'],
    sites: ['view', 'create', 'update', 'delete'],
    departments: ['view', 'create', 'update', 'delete'],
    qrcode: ['view', 'create', 'delete'],
    vehicles: ['view', 'update', 'delete'],
    'live-status': ['view'],
    dashboard: ['view'],
  },
  admin: {
    auth: ['view'],
    'auth/admin': ['create'],
    'auth/reset': ['create'],
    roles: ['view', 'create', 'update', 'delete'],
    users: ['view', 'create', 'update', 'delete'],
    sites: ['view', 'create', 'update', 'delete'],
    departments: ['view', 'create', 'update', 'delete'],
    qrcode: ['view', 'create', 'delete'],
    vehicles: ['view', 'update', 'delete'],
    'live-status': ['view'],
    dashboard: ['view'],
  },
  manager: {
    auth: ['view'],
    'auth/admin': ['create'],
    'auth/reset': ['create'],
    roles: ['view', 'create', 'update', 'delete'],
    users: ['view', 'create', 'update', 'delete'],
    sites: ['view', 'create', 'update', 'delete'],
    departments: ['view', 'create', 'update', 'delete'],
    qrcode: ['view', 'create', 'delete'],
    vehicles: ['view', 'update', 'delete'],
    'live-status': ['view'],
    dashboard: ['view'],
  },
  'site-manager': {
    auth: ['view'],
    'auth/admin': ['create'],
    'auth/reset': [],
    roles: [],
    users: [],
    sites: [],
    departments: ['view'],
    qrcode: ['view'],
    vehicles: ['view', 'create', 'update', 'delete'],
    'live-status': ['view'],
    dashboard: [],
  },
};

export type DynamicRolePermissionType = {
  [K in keyof typeof RolePermissions]: string;
};

export type DynamicSitePermissionType = {
  [K in keyof (typeof RolePermissions)['admin']]: string[];
};
