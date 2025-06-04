import { Survey, SurveyResponse } from '../types/survey.types';
import { Survey as SurveyModel, SurveyResponse as SurveyResponseModel } from '../models/survey.model';

export class SurveyRepository {
  async createSurvey(survey: Survey): Promise<Survey> {
    const newSurvey = await SurveyModel.create(survey);
    const surveyObj = newSurvey.toObject();
    return {
      ...surveyObj,
      id: (surveyObj as any)._id.toString()
    } as Survey;
  }

  async getSurvey(id: string): Promise<Survey | undefined> {
    const survey = await SurveyModel.findById(id);
    if (!survey) return undefined;
    const surveyObj = survey.toObject();
    return {
      ...surveyObj,
      id: (surveyObj as any)._id.toString()
    } as Survey;
  }

  async getAllSurveys(): Promise<Survey[]> {
    const surveys = await SurveyModel.find();
    return surveys.map(survey => {
      const surveyObj = survey.toObject();
      return {
        ...surveyObj,
        id: (surveyObj as any)._id.toString()
      } as Survey;
    });
  }

  async submitResponse(response: Omit<SurveyResponse, 'id'>): Promise<SurveyResponse> {
    const newResponse = await SurveyResponseModel.create(response);
    const responseObj = newResponse.toObject();
    return {
      ...responseObj,
      id: (responseObj as any)._id.toString(),
      surveyId: (responseObj as any).surveyId.toString()
    } as SurveyResponse;
  }

  async getSurveyResponses(surveyId: string): Promise<SurveyResponse[]> {
    const responses = await SurveyResponseModel.find({ surveyId });
    return responses.map(response => {
      const responseObj = response.toObject();
      return {
        ...responseObj,
        id: (responseObj as any)._id.toString(),
        surveyId: (responseObj as any).surveyId.toString()
      } as SurveyResponse;
    });
  }
} 