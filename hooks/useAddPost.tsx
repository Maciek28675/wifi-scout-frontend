
// Uncomment the following code to use the API for adding posts

// import { useState } from 'react';

// interface AddPostData {
//     user_id: number;
//     title: string;
//     location: string;
//     time: string;
// }

// export function useAddPost() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const addPost = async (data: AddPostData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('http://localhost:8081/posts', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });
//       if (!response.ok) {
//         throw new Error('Błąd dodawania posta');
//       }
//       return await response.json();
//     } catch (err: any) {
//       setError(err.message || 'Wystąpił błąd');
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { addPost, loading, error };
// }

import { useState } from 'react';

interface AddPostData {
    user_id: number;
    title: string;
    location: string;
    time: string;
}

export function useAddPost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addPost = async (data: AddPostData) => {
    setLoading(true);
    setError(null);
    try {
      return { ...data, post_id: Math.floor(Math.random() * 10000) };
    } catch (err: any) {
      setError('Wystąpił błąd');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addPost, loading, error };
}