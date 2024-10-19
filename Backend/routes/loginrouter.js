import Router from 'express';
import { register, login } from '../controllers/login.js';

const loginrouter=Router();

loginrouter.post('/register',register);
loginrouter.post('/login', login );

export default loginrouter;