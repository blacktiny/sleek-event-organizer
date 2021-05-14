import request from '@/utils/request';

export async function fetchHomeAnalytics(organizerId: string) {
  return request(`/organizer/${organizerId}/home`, {
    method: 'GET',
  });
}

export async function fetchRevenueVendorAnalytics({ organizerId, vendorId }: any) {
  return request(`/organizer/${organizerId}/analytics/vendor/${vendorId}`, {
    method: 'GET',
  });
}

export async function fetchRevenueEventAnalytics({ organizerId, eventId }: any) {
  return request(`/organizer/${organizerId}/analytics/event/${eventId}`, {
    method: 'GET',
  });
}
