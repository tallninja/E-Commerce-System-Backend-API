export const couponGenerator = (length: number) => {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = uppercaseLetters.toLowerCase();
  const numbers = '01234567890';

  const corpus = uppercaseLetters + lowercaseLetters + numbers;
  let coupon = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * corpus.length);
    coupon += corpus[index];
  }

  return coupon;
};
