import * as Yup from 'yup';
import { TipoDeCliente, CondicionIva } from '@prisma/client';

const validationSchema = Yup.object().shape({
  nombreCompleto: Yup.string().required('El nombre es obligatorio'),
  documento: Yup.number()
    .nullable()
    .when('tipoDeCliente', (tipoDeCliente, field) => (
      tipoDeCliente[0] === TipoDeCliente.INDIVIDUO // Comparing the first element of the array
        ? field.required('El documento es obligatorio')
        : field)),
  email: Yup.string().email('Formato de correo inválido'),
  condicionIva: Yup.string().required('La condición IVA es obligatoria'),
  cuit: Yup.string()
    .test(
      'cuit-validation',
      'El CUIT es obligatorio',
      (value, { parent }) => {
        const { condicionIva, tipoDeCliente } = parent;
        return !(
          (condicionIva === CondicionIva.ResponsableInscripto
            || tipoDeCliente === TipoDeCliente.EMPRESA)
            && !value
        );
      },
    )
    .matches(/^[0-9]{2}-[0-9]{8}-[0-9]{1}$/, 'El CUIT debe tener 11 dígitos y el formato XX-XXXXXXXX-X'),
  telefono: Yup.string().required('El teléfono es obligatorio'),
  esCuentaCorriente: Yup.boolean(),
});

export default validationSchema;
