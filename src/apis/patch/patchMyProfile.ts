import instance from '../axios';

interface IMyprofile {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
}

const patchMyprofile = async (data: IMyprofile): Promise<any> => {
  try {
    const res = await instance.patch('/users/me', data);

    return res;
  } catch (error) {
    return console.log(error); // eslint-disable-line no-console
  }
};

export default patchMyprofile;
