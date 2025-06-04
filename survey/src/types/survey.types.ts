export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TEXT = 'TEXT'
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
}

export interface CreateSurveyInput {
  title: string;
  description: string;
  questions: Omit<Question, 'id'>[];
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    id: string;
    username: string;
  };
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  answers: {
    questionId: string;
    answer: string | string[];
  }[];
  submittedAt: Date;
} 