import { useState, useEffect } from 'react';
import { auth } from '@/firebase/config';  
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SignOutButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Observamos el estado de autenticación del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Limpiar el observador cuando se desmonte el componente
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);  // Usamos la función signOut de Firebase
      console.log('Usuario cerrado sesión');
      router.push('/login');  // Redirigir al login después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <>
      {user ? (
        <>
          <button className="bg-blue-500 text-white font-semibold rounded-lg p-2 font-sans hidden md:flex" onClick={handleSignOut}>Cerrar sesión</button>
          <button className='flex bg-blue-500 rounded-lg p-2 md:hidden dark:bg-black' title='Cerrar sesion' onClick={handleSignOut}>
            <Image src='/LogOut.svg' width={40} height={40} alt='Cerrar sesion'></Image>
          </button>
        </>
        
      ) : (
        <p>Cerrando sesion...</p>
      )}
    </>
  );
};

export default SignOutButton;
