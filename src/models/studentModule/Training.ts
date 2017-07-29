export interface TrainingModel {
  id: string;
  name: string;
  markdownContent: string;
}

export const createEmptyTraining = (): TrainingModel => ({
  id: '',
  name: '',
  markdownContent: '',
});
