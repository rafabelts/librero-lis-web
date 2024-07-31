import { toast } from 'sonner';
import { User } from '../types';
import { SignUpFormData } from './auth';

export async function checkIfUserAlreadyAdded(studentId: string) {
  const response = await fetch(
    'http://localhost:3030/api/user/check',

    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        studentId: studentId,
      }),
    }
  );

  const responseData = await response.json();
  const resposeMessage = responseData.message;

  if (responseData.success) return resposeMessage;
  return toast.error(resposeMessage);
}

export async function getUser(userId: string): Promise<User | null> {
  const response = await fetch('http://localhost:3030/api/user/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      userId: userId,
    }),
  });

  const responseData = await response.json();
  const resposeMessage = responseData.message;

  if (responseData.success) return resposeMessage;
  return null;
}

export async function getUsers(userId: string) {
  const response = await fetch('http://localhost:3030/api/user/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      userId: userId,
    }),
  });
  const responseData = await response.json();
  const resposeMessage = responseData.message;

  if (responseData.success) return resposeMessage;
  return toast.error(resposeMessage);
}

export async function addUserService(userId: string, userData: SignUpFormData) {
  const response = await fetch(
    'http://localhost:3030/api/user/add',

    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        id: userId,
        studentId: userData.studentId,
        name: userData.name,
        email: userData.email,
      }),
    }
  );

  const responseData = await response.json();
  const resposeMessage = responseData.message;

  if (responseData.success) return toast.success(resposeMessage);
  return toast.error(resposeMessage);
}

export async function changeNameService(newName: string, userId: string) {
  const response = await fetch(
    'http://localhost:3030/api/user/change/name',

    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        newName: newName,
        userId: userId,
      }),
    }
  );

  const responseData = await response.json();
  const resposeMessage = responseData.message;

  if (responseData.success) return toast.success(resposeMessage);
  return toast.error(resposeMessage);
}
