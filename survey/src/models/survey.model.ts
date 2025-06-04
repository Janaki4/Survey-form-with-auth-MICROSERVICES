import { Schema, model, Document } from 'mongoose';
import { QuestionType } from '../types/survey.types';

interface IQuestion {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
}

interface ISurvey extends Document {
  title: string;
  description: string;
  questions: IQuestion[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    id: string;
    username: string;
  };
}

interface ISurveyResponse extends Document {
  surveyId: Schema.Types.ObjectId;
  answers: {
    questionId: string;
    answer: string | string[];
  }[];
  submittedAt: Date;
}

const SurveySchema = new Schema<ISurvey>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [{
    id: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, enum: Object.values(QuestionType), required: true },
    options: [String],
    required: { type: Boolean, default: false }
  }],
  createdBy: {
    id: { type: String, required: true },
    username: { type: String, required: true }
  }
}, { timestamps: true });

const SurveyResponseSchema = new Schema<ISurveyResponse>({
  surveyId: { type: Schema.Types.ObjectId, ref: 'Survey', required: true },
  answers: [{
    questionId: { type: String, required: true },
    answer: { type: Schema.Types.Mixed, required: true }
  }],
  submittedAt: { type: Date, default: Date.now }
});

export const Survey = model<ISurvey>('Survey', SurveySchema);
export const SurveyResponse = model<ISurveyResponse>('SurveyResponse', SurveyResponseSchema); 