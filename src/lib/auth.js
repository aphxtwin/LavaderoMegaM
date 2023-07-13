import { jwtVerify } from "jose"

export const getJwtSecretKey = ()=>{
    const secret = process.env.JWT_SECRET_KEY
    if (!secret || secret.length === 0){
        throw new Error('No se ha declarado ninguna variable JWT_SECRET_KEY en el entorno.')
    }
    return secret
}

export async function verifyAuth(token) {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
        return verified.payload
    } catch(error){
        throw new Error('El token ha expirado.')
    }
}
