// import { useState, useEffect } from 'react';

// export function useUserInitials(userId: number) {
//   const [initials, setInitials] = useState<string>('');

//   useEffect(() => {
//     if (!userId) return;
//     fetch(`http://localhost:8081/users/${userId}/initials`)
//       .then(res => res.json())
//       .then(data => setInitials(data.initials))
//       .catch(() => setInitials(''));
//   }, [userId]);

//   return initials;
// }
import { useState } from 'react';

export function useUserInitials(userId: number) {
  return `U${userId}`;
}