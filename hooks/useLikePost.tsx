// import { useState } from 'react';

// export function useLikePost() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const likePost = async (postId: number) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`http://localhost:8081/posts/${postId}/like`, {
//         method: 'POST',
//       });
//       if (!res.ok) throw new Error('Błąd like\'owania');
//       return await res.json();
//     } catch (err: any) {
//       setError(err.message || 'Wystąpił błąd');
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { likePost, loading, error };
// }

import { useState } from 'react';

export function useLikePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const likePost = async (postId: number) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { postId, liked: true };
    } catch (err: any) {
      setError('Wystąpił błąd');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { likePost, loading, error };
}