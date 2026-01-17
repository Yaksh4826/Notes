import userModel from "../models/userModel.js";


export const getAllUsers = async (req, res) => {
  let users = await userModel.find();
  return res.send(users);
};


export const getUserById = async (req,res) => {
    let user  =  await  userModel.findOne({_id:req.params.id});
    return res.send(user);
}

export const deleteUser =  async (req,res) => {
      let deletedUser  =  await  userModel.findOneAndDelete({_id:req.params.id});
    return res.send(deleteUser);

}