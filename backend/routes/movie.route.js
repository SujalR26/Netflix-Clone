import express from 'express';
import { ENV_VARS } from '../config/envVars.js';
import { getMovieDetails, getMoviesByCategory, getMovieTrailers, getSimilarMovies, getTrendingMovie } from '../controllers/movie.controller.js';

const router=express.Router();

router.get('/trending',getTrendingMovie);
router.get('/:id/trailers',getMovieTrailers);
router.get('/:id/details',getMovieDetails);
router.get('/:id/similar',getSimilarMovies);
router.get('/:category',getMoviesByCategory);

export default router;

