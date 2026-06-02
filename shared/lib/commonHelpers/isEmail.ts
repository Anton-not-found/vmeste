const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]{2,16}\.[a-zA-Z0-9-]{2,16}$/;

export const isEmail = (value: string): boolean => regex.test(value);
