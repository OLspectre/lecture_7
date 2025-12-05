// IMPORTS
import express from "express";
import { router as api } from './route/api.js'

import { config } from 'dotenv';
config();

export const app = express();

// Redirect requests to api route
app.use("/api", api);






