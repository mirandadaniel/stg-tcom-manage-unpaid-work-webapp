type RouteMatch = {
  template: string
  status?: number
}

const exactRoutes: Record<string, RouteMatch> = {
  '/': { template: 'pages/index' },
  '/sign-out': { template: 'pages/index' },
  '/pop': { template: 'pages/pop/index' },
  '/pop/your-details': { template: 'pages/pop/details' },
  '/pop/your-progress': { template: 'pages/pop/progress' },
  '/pop/appointments': { template: 'pages/pop/appointments' },
  '/pop/conditions': { template: 'pages/pop/orderSummary' },
  '/pop/probation-conditions': { template: 'pages/pop/probationConditions' },
  '/pop/upw-conditions': { template: 'pages/pop/upwConditions' },
  '/pop/view-appointment': { template: 'pages/pop/view-appointment' },
  '/pop/view-past-appointment': { template: 'pages/pop/view-past-appointment' },
  '/pop/appointment-notify': { template: 'pages/pop/appointment-notify' },
  '/pop/appointment-notify-upload-evidence': { template: 'pages/pop/appointment-notify-upload-evidence' },
  '/staff': { template: 'pages/staff/cases' },
  '/staff/verify-pop-photo': { template: 'pages/staff/verify-pop-photo' },
  '/staff/verify-success': { template: 'pages/staff/verify-success' },
  '/staff/verify-reject': { template: 'pages/staff/verify-reject' },
  '/supervisor': { template: 'pages/supervisor/placements' },
  '/one-login': { template: 'pages/one-login/sign-in-or-create' },
  '/one-login/sign-in-or-create': { template: 'pages/one-login/sign-in-or-create' },
  '/one-login/enter-email-address': { template: 'pages/one-login/enter-email-address' },
  '/one-login/enter-email-address-login': { template: 'pages/one-login/enter-email-address-login' },
  '/one-login/enter-password': { template: 'pages/one-login/enter-password' },
  '/one-login/create-password': { template: 'pages/one-login/create-password' },
  '/one-login/check-phone': { template: 'pages/one-login/check-phone' },
  '/one-login/check-phone-login': { template: 'pages/one-login/check-phone-login' },
  '/one-login/get-security-code': { template: 'pages/one-login/get-security-code' },
  '/one-login/verify-security-code': { template: 'pages/one-login/verify-security-code' },
  '/one-login/account-created': { template: 'pages/one-login/account-created' },
  '/one-login/enter-phone-number': { template: 'pages/one-login/enter-phone-number' },
  '/pop/verify': { template: 'pages/pop-id/submit-photo' },
  '/pop/verify/options': { template: 'pages/pop-id/options' },
  '/pop/verify/upload-photo': { template: 'pages/pop-id/upload-photo' },
  '/pop/verify/display-photo': { template: 'pages/pop-id/display-photo' },
  '/pop/verify/take-photo': { template: 'pages/pop-id/take-photo' },
  '/pop/verify/check-photo': { template: 'pages/pop-id/check-photo' },
  '/pop/verify/reject-photo': { template: 'pages/pop-id/reject-photo' },
  '/pop/verify/uploading-photo': { template: 'pages/pop-id/uploading-photo' },
  '/pop/verify/confirm-photo': { template: 'pages/pop-id/submit-photo' },
  '/pop/verify/success': { template: 'pages/pop-id/success' },
  '/admin/password': { template: 'pages/prototype-admin/password' },
}

export const matchRouteToTemplate = (path: string): RouteMatch => {
  if (exactRoutes[path]) {
    return exactRoutes[path]
  }

  if (path.startsWith('/supervisor/view-placement/')) {
    return { template: 'pages/supervisor/view-placement' }
  }

  if (path.startsWith('/supervisor/check-in/')) {
    return { template: 'pages/supervisor/check-in' }
  }

  if (path.startsWith('/supervisor/check-out/')) {
    return { template: 'pages/supervisor/check-out' }
  }

  if (path.startsWith('/pop/verify/')) {
    const slug = path.replace('/pop/verify/', '')
    return { template: `pages/pop-id/${slug}` }
  }

  return { template: 'pages/404', status: 404 }
}
