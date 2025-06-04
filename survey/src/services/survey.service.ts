import { v4 as uuidv4 } from 'uuid';
import { Survey, SurveyResponse, CreateSurveyInput } from '../types/survey.types';
import { UserInfo } from '../types/auth.types';
import { SurveyRepository } from '../repositories/survey.repository';

export class SurveyService {
  constructor(private surveyRepository: SurveyRepository) {}

  async createSurvey(input: CreateSurveyInput, user: UserInfo): Promise<Survey> {
    const survey = await this.surveyRepository.createSurvey({
      ...input,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: {
        id: user.id,
        username: user.username
      },
      questions: input.questions.map(q => ({
        ...q,
        id: uuidv4()
      }))
    });
    return survey;
  }

  async getSurvey(id: string): Promise<Survey> {
    const survey = await this.surveyRepository.getSurvey(id);
    if (!survey) {
      throw new Error('Survey not found');
    }
    return survey;
  }

  async getAllSurveys(): Promise<Survey[]> {
    return this.surveyRepository.getAllSurveys();
  }

  async submitResponse(surveyId: string, answers: Array<{ questionId: string; answer: string | string[] }>): Promise<SurveyResponse> {
    const survey = await this.getSurvey(surveyId);
    this.validateAnswers(survey, answers);
    
    const response = await this.surveyRepository.submitResponse({
      surveyId,
      answers,
      submittedAt: new Date()
    });
    return response;
  }

  private validateAnswers(survey: Survey, answers: Array<{ questionId: string; answer: string | string[] }>): void {
    const questionMap = new Map(survey.questions.map(q => [q.id, q]));
    
    for (const answer of answers) {
      const question = questionMap.get(answer.questionId);
      if (!question) {
        throw new Error(`Invalid question ID: ${answer.questionId}`);
      }

      if (question.required && !answer.answer) {
        throw new Error(`Question "${question.text}" is required`);
      }

      if (question.type === 'SINGLE_CHOICE' && Array.isArray(answer.answer)) {
        throw new Error(`Question "${question.text}" requires a single answer`);
      }

      if (question.type === 'MULTIPLE_CHOICE' && !Array.isArray(answer.answer)) {
        throw new Error(`Question "${question.text}" requires multiple answers`);
      }

      if (question.options && Array.isArray(answer.answer)) {
        const invalidOptions = answer.answer.filter(opt => !question.options?.includes(opt));
        if (invalidOptions.length > 0) {
          throw new Error(`Invalid options for question "${question.text}": ${invalidOptions.join(', ')}`);
        }
      }
    }
  }
} 