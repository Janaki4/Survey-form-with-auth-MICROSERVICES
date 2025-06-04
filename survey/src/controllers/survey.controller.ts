import { Request, Response } from 'express';
import { SurveyService } from '../services/survey.service';
import { CreateSurveySchema, SubmitResponseSchema } from '../schemas/survey.schema';

// Extend Express Request type to include user
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    username: string;
    role: string;
    tokenType: 'access' | 'refresh';
  };
}

export class SurveyController {
  constructor(private surveyService: SurveyService) {}

  async createSurvey(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const validationResult = CreateSurveySchema.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({ error: validationResult.error.errors[0].message });
        return;
      }

      const survey = await this.surveyService.createSurvey(validationResult.data, req.user);
      res.status(201).json(survey);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getSurvey(req: Request, res: Response): Promise<void> {
    try {
      const survey = await this.surveyService.getSurvey(req.params.id);
      res.json(survey);
    } catch (error) {
      if ((error as Error).message === 'Survey not found') {
        res.status(404).json({ error: 'Survey not found' });
        return;
      }
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getAllSurveys(_req: Request, res: Response): Promise<void> {
    try {
      const surveys = await this.surveyService.getAllSurveys();
      res.json(surveys);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async submitResponse(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = SubmitResponseSchema.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({ error: validationResult.error.errors[0].message });
        return;
      }

      const { surveyId } = req.params;
      const response = await this.surveyService.submitResponse(surveyId, validationResult.data.answers.map(a => ({
        questionId: a.questionId,
        answer: a.value
      })));
      res.status(201).json(response);
    } catch (error) {
      if ((error as Error).message === 'Survey not found') {
        res.status(404).json({ error: 'Survey not found' });
        return;
      }
      res.status(500).json({ error: (error as Error).message });
    }
  }
} 