export interface StudentModel {
  id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
}

export const createEmptyStudent = (): StudentModel => ({
  id: '',
  fullname: '',
  email: '',
  phoneNumber: '',
  isActive: false,
});
