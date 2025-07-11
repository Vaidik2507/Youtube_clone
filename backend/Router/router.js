import express from 'express';
import cors from 'cors';
import auth from './auth.js';

const router = express.Router();

router.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["POST", "GET"],
        credentials: true,
    })
)
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(auth);

export default router;