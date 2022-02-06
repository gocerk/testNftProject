import { createApp } from 'vue'
import App from './App.vue'
import 'wave-ui/dist/wave-ui.css';
import WaveUI from 'wave-ui';

const app = createApp(App);
new WaveUI(app);

app.mount('#app')