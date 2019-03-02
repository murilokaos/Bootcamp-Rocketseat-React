import axios from 'axios';

export const getRepository = async (userRepository) => {
  // try {
  const sucess = await axios({
    method: 'GET',
    baseURL: `https://api.github.com/repos/${userRepository}`,
  });

  return sucess.data;
  //   } catch (error) {
  //     throw new Error({ status: error.status, msg: error });
  //   }
};

/*
Solução do diego, preferi deixar a minha que fiz antes do vídeo dele,
 teve 3 versões.
 */

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default api;
