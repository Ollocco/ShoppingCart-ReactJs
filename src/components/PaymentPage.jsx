import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import '../styles/PaymentPage.css'; 
import { useCart } from './CartContext';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function PaymentPage() {
    const { isOpenPayment, closePaymentPage } = useCart();

    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [dni, setDNI] = useState('');
    const [errors, setErrors] = useState({});
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    const handleInputChange = (field, value) => {
        // Actualiza el estado según el campo modificado
        switch (field) {
            case 'number':
                // Permite solo números
                const cleanedValueNumber = value.replace(/\D/g, '');

                // Formatea el número en bloques de 4 dígitos con guiones
                const formattedNumber = cleanedValueNumber
                    .substring(0, 16) // Limita a 16 dígitos
                    .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4')
                    .trim();

                setNumber(formattedNumber);
                // Validaciones Nro tarjeta
                if (!formattedNumber) {
                    setErrors({ ...errors, number: 'El número de tarjeta es obligatorio' });
                } else {
                    setErrors({ ...errors, number: '' });
                }
                break;
            case 'name':
                const formattedName = value.replace(/[^a-zA-Z\s]/g, '')
                setName(formattedName);
                // Validaciones para el nombre (solo letras)
                if (!/^[a-zA-Z\s]*$/.test(value.trim())) {
                    setErrors({ ...errors, name: 'El nombre debe contener solo letras' });
                } else {
                    setErrors({ ...errors, name: '' });
                }
                break;
            case 'expiry':
                setExpiry(value);
                // Validación para la fecha de vencimiento (MM/YY)
                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value.trim())) {
                    setErrors({ ...errors, expiry: 'Formato de fecha inválido (MM/YY)' });
                } else {
                    setErrors({ ...errors, expiry: '' });
                }
                break;
            case 'cvc':
                // Permite solo números
                const cleanedValueCVC = value.replace(/\D/g, '');

                // Formatea el número en bloques de 4 dígitos con guiones
                const formattedCVC = cleanedValueCVC
                    .substring(0, 3)
                    .trim();

                setCvc(formattedCVC);
                // Realiza validación para el CVC (solo números y hasta 3 caracteres)
                if (!/^[0-9*]{0,3}$/.test(value.trim())) {
                    setErrors({ ...errors, cvc: 'El CVC debe contener solo números y tener hasta 3 caracteres' });
                } else {
                    setErrors({ ...errors, cvc: '' });
                }
                break;
            case 'dni':
                const cleanedValueDNI = value.replace(/\D/g, '');
                const formattedDNI = cleanedValueDNI
                    .substring(0, 8)
                    .trim();
                setDNI(formattedDNI);
                break;
            default:
                break;
        }
    };

    const handleNext = () => {
        // Validaciones Antes de confirmar la compra
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            console.log('Formulario válido. Avanzar al siguiente paso.');
            setPaymentSuccess(true);
        } else {
            console.error('Formulario inválido. Corrige los errores.');
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        // validaciones para cada campo - retorna un objeto con errores
        const validationErrors = {};

        if (!number.trim()) {
            validationErrors.number = 'El número de tarjeta es obligatorio';
        }

        if (!name.trim()) {
            validationErrors.name = 'El nombre es obligatorio';
        }

        if (!expiry.trim()) {
            validationErrors.expiry = 'La fecha de vencimiento es obligatoria';
        }

        if (!cvc.trim()) {
            validationErrors.cvc = 'El CVC es obligatorio';
        }

        if (!dni.trim()) {
            validationErrors.dni = 'El campo DNI es obligatorio';
        }

        return validationErrors;
    };

    return (
        <div className={`modal ${isOpenPayment? 'active' : ''}`}>
            <form className='paymentPage-form'>
                <h1>CHECKOUT</h1>
                <h2>Payment method</h2>
                <TextField
                    id="number"
                    label="Card Number"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    variant="outlined"
                    value={number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    error={!!errors.number}
                    helperText={errors.number || ' '}
                    className={errors.number ? 'error' : ''}
                />

                <TextField
                    id="name"
                    label="Name"
                    placeholder="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name || ' '}
                    className={errors.name ? 'error' : ''}
                />

                <TextField
                    id="expiry"
                    label="Expiry"
                    placeholder="MM/YY"
                    variant="outlined"
                    value={expiry}
                    onChange={(e) => handleInputChange('expiry', e.target.value)}
                    error={!!errors.expiry}
                    helperText={errors.expiry || ' '}
                    className={errors.expiry ? 'error' : ''}
                />

                <TextField
                    id="cvc"
                    label="CVC"
                    placeholder="XXX"
                    variant="outlined"
                    value={cvc}
                    onChange={(e) => handleInputChange('cvc', e.target.value)}
                    error={!!errors.cvc}
                    helperText={errors.cvc || ' '}
                    className={errors.cvc ? 'error' : ''}
                />

                <TextField
                    id="dni"
                    label="DNI"
                    placeholder="DNI"
                    variant="outlined"
                    value={dni}
                    onChange={(e) => handleInputChange('dni', e.target.value)}
                />
                <Button variant="contained" onClick={closePaymentPage}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleNext}>
                    Pay
                </Button>
                {paymentSuccess && (
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        The payment was made successfully! — <strong> Thanks for your purchase!</strong>
                    </Alert>
                )}
            </form>
        </div>
    );
}


    