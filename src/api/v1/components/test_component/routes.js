import express from 'express';

const testRoutes = express.Router();

//======================== GET ========================
testRoutes.get('/', somemiddleware, somecontroller);
//======================== POST ========================
//======================== PUT ========================
//======================== DELETE ========================

export default testRoutes;
