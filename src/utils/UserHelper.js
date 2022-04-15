import { encode } from 'js-base64';

const UserHelper = {
  createCredentials(user) {
    console.log(user);
  },

  createSecureUser(user) {
    const encodedPassword = encode(user.password);

    return {
      ...user,
      password: encodedPassword,
    };
  },

  validatePassword(inputPassword, encodedPassword) {
    const encodedInputPaswword = encode(inputPassword);

    if (encodedInputPaswword !== encodedPassword) {
      throw new Error('Invalid Password !');
    }

    return true;
  },
};

export default UserHelper;
