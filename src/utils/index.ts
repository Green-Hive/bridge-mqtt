import bcrypt from 'bcrypt';

export const hashString = async (input: string): Promise<string> => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed = await bcrypt.hash(input, salt);
    return hashed;
  } catch (error) {
    throw new Error('Error hashing the string');
  }
};

export const compareHash = async (input: string, hash: string): Promise<boolean> => {
    try {
      const match = await bcrypt.compare(input, hash);
      return match;
    } catch (error) {
      throw new Error('Error comparing the string');
    }
  };