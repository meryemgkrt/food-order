import * as Yup from 'yup';

const adminSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'User name must be at least 3 characters') // Minimum uzunluk kontrolü
    .max(20, 'User name must be at most 20 characters') // Maksimum uzunluk kontrolü
    .matches(/^[a-zA-Z0-9_]+$/, 'User name can only contain letters, numbers, and underscores') // Özel regex kontrolü
    .required('User name is required'), // Zorunlu alan
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters') // Minimum uzunluk kontrolü
    .max(20, 'Password must be at most 20 characters') // Maksimum uzunluk kontrolü
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter') // Büyük harf kontrolü
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter') // Küçük harf kontrolü
    .matches(/\d/, 'Password must contain at least one number') // Rakam kontrolü
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &)') // Özel karakter kontrolü
    .required('Password is required'), // Zorunlu alan
});

export default adminSchema;
