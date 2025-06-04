import { Router } from 'express';
import { SurveyController } from '../controllers/survey.controller';
import { SurveyService } from '../services/survey.service';
import { SurveyRepository } from '../repositories/survey.repository';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const surveyRepository = new SurveyRepository();
const surveyService = new SurveyService(surveyRepository);
const surveyController = new SurveyController(surveyService);

// Create a new survey (requires authentication)
router.post('/', authenticateToken, (req, res) => surveyController.createSurvey(req, res));

// Get all surveys
// router.get('/', (req, res) => surveyController.getAllSurveys(req, res));

// Get a specific survey by ID
router.get('/:id', (req, res) => surveyController.getSurvey(req, res));

// Submit a response to a survey
router.post('/:surveyId/responses', (req, res) => surveyController.submitResponse(req, res));

export default router; 