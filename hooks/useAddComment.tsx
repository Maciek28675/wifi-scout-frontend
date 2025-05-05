// import { useState } from 'react';

// export function useAddComment() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const addComment = async (postId: number, content: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`http://localhost:8081/posts/${postId}/comments`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ content }),
//       });
//       if (!res.ok) throw new Error('Błąd dodawania komentarza');
//       return await res.json();
//     } catch (err: any) {
//       setError(err.message || 'Wystąpił błąd');
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { addComment, loading, error };
// }

import { useState } from 'react';

export function useAddComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addComment = async (postId: number, content: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      return { comment_id: Math.floor(Math.random() * 10000), postId, content };
    } catch (err: any) {
      setError('Wystąpił błąd');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addComment, loading, error };
}