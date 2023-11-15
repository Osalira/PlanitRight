import mongoose, { Schema, model, Types } from 'mongoose';
import 'dotenv/config';

const dbUri = process.env.CONNECTION_STRING;

 const db = mongoose.connect(dbUri).then(() => {
    console.log('Database connected');
  }).catch(err => {
    console.error('Database connection failed', err.message);
  });
  
export default db;

