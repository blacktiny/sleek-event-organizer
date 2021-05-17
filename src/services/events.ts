import request from '@/utils/request';

export async function addNewEvent(data: any) {
  return request(`/event`, {
    method: 'POST',
    data
  });
}

export async function deleteEvent(eventId: string) {
  return request(`/event/${eventId}`, { method: 'DELETE' });
}

export async function fetchEvents({ organizerId, filter }: any) {
  return request(
    `/organizer/${organizerId}/event/?${
      filter ? `eventCalendar.startTimestamp=${filter}&&` : ''
    }status=ACTIVE`,
    {
      method: 'GET',
    },
  );
}

export async function fetchEventDetail(eventId: string) {
  return request(`/event/${eventId}/details`, {
    method: 'GET',
  });
}

export async function fetchEventInvites(eventId: string) {
  return request(`/event/${eventId}/invite`, {
    method: 'GET',
  });
}

export async function inviteEvent({ eventId, data }: any) {
  return request(`/event/${eventId}/invite`, {
    method: 'POST',
    data
  });
}

export async function updateEvent({ eventId, data }: any) {
  return request(`/event/${eventId}`, {
    method: 'PUT',
    data
  });
}

export async function deleteInvite({ eventId, inviteId }: any) {
  return request(`/event/${eventId}/invite/${inviteId}`, { method: 'DELETE' });
}
