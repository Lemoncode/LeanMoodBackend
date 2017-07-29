export interface StudentModel {
  id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
}

// TODO: Remove when connect with mongoose
export const getMockStudents = (): StudentModel[] => ([
  {
    id: '1',
    email: 'testEmail@lemoncode.net',
    fullname: 'Test Name',
    isActive: true,
    phoneNumber: '123456',
  },
]);
