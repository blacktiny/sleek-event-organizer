import request from '@/utils/request';

export type LoginParamsType = {
  email: string;
  password: string;
};

export async function accountLogin(params: LoginParamsType) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function changePasswordQuery(payload: any) {
  return request(`/auth/${payload.userId}/reset`, {
    method: 'POST',
    data: {
      entityId: payload.organizerId,
      newPassword: payload.newPassword,
      confirmPassword: payload.confirmPassword
    },
  });
}
