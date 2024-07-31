import axios from 'axios';

export default axios.create({
    baseURL:'https://bbb2-2600-6c64-61f0-1d20-1852-41b8-5033-3b1.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning": "true"}
});