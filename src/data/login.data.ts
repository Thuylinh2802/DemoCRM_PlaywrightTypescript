export const loginData = [
    {
    name: 'Login success',
    email: 'admin@example.com',
    password: '123456',
    expected: 'success'
  },
  {
    name: 'Login fail with wrong password',
    email: 'admin@example.com',
    password: '1234567',
    expected: 'fail'
  },
  {
    name: 'Login fail with wrong email',
    email: 'wrong@exampleee.com',
    password: '123456',
    expected: 'fail'
  },
  {
    name: 'Login fail with empty email',
    email: '',
    password: '123456',
    expected: 'fail'
  },
  {
    name: 'Login fail with empty email password',
    email: 'admin@example.com',
    password: '',
    expected: 'fail'
  }
];