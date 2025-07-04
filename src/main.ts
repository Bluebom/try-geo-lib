import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
  iconUrl: '/img/marker-icon.png',
  iconRetinaUrl:  '/img/marker-icon-2x.png',
  shadowUrl:  '/img/marker-shadow.png',
});

export default L;
