import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '', password: '', email: '', nombreCompleto: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register(formData);
            alert('Usuario registrado exitosamente. Ya puedes iniciar sesión.');
            navigate('/login');
        } catch (error) {
            alert('Error al registrar: ' + error.message);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
                <input name="username" placeholder="Usuario" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Correo Electrónico" onChange={handleChange} required />
                <input name="nombreCompleto" placeholder="Nombre Completo" onChange={handleChange} required />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterPage;