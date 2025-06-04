import { z } from 'zod';
import { QuestionType } from '../types/survey.types';

const QuestionSchema = z.object({
  text: z.string().min(1),
  type: z.enum([QuestionType.SINGLE_CHOICE, QuestionType.MULTIPLE_CHOICE, QuestionType.TEXT]),
  options: z.array(z.string()).optional(),
  required: z.boolean().default(true)
});

export const CreateSurveySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  questions: z.array(QuestionSchema).min(1)
});

export const SubmitResponseSchema = z.object({
  answers: z.array(z.object({
    questionId: z.string(),
    value: z.union([z.string(), z.array(z.string())])
  }))
}); 