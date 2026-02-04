type RouteMatch = {
  template: string
  status?: number
}

const exactRoutes: Record<string, RouteMatch> = {
  '/staff': { template: 'pages/staff/cases' },
  '/staff/verify-pop-photo': { template: 'pages/staff/verify-pop-photo' },
  '/staff/verify-success': { template: 'pages/staff/verify-success' },
  '/staff/verify-reject': { template: 'pages/staff/verify-reject' },
  '/supervisor': { template: 'pages/supervisor/placements' },
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
