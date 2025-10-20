import express from 'express';
import {createTotpAccount} from './routes/2faRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/2fa/totp', createTotpAccount());

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
