import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(organizerId: string): Promise<any> {
  return request(`/organizer/${organizerId}`);
}

export async function queryUpdate(payload: any): Promise<any> {
  return request(`/organizer/${payload.organizerId}`, {
    method: 'PUT',
    data: payload.data,
  });
}

export async function queryUpload(form: FormData): Promise<any> {
  return request('/file/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data;' },
    data: form,
  });
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
