import request from '@/utils/request';

export async function fetchVendors({ organizerId, status = '' }: any) {
  return request(`/organizer/${organizerId}/vendor/${status ? `?status=${status}` : ''}`, {
    method: 'GET',
  });
}

export async function inviteVendor({ organizerId, email, name }: any) {
  return request(`/organizer/${organizerId}/invite-vendor/?email=${email}&name=${name}`, {
    method: 'GET',
  });
}
