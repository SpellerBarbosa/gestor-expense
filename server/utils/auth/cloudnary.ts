import { v2 as cloudinary } from 'cloudinary';
import variableAmbient from '../common/env';

cloudinary.config({
    cloud_name: variableAmbient('CLOUDINARY_CLOUD_NAME'),
    api_key:variableAmbient('CLOUDINARY_API_KEY'),
    api_secret:variableAmbient('CLOUDINARY_API_SECRET'),
    secure: true
})

export default cloudinary;