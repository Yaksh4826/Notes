import userModel from "../models/userModel.js";

export const getMyProfile = async (req, res) => {
  let user = await userModel.findOne({ _id: req.user.id });
  res.send(user);
};

export const updateMyProfile = async (req, res) => {
  try {
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: req.user.id },
      { email: req.body.email, fullName: req.body.name },
      { new: true, runValidators: true }
    );


  res.send(updatedUser);

  } catch (e) {
    console.log(e);


    res.status(500).json({
      success: false,
      message: e.message
    });
  }
};



export const deleteMyProfile = async (req,res) => {
let deletedUser =  await findOneAndDelete({_id :req.user.id});
res.send(`Deleted the account for ${deletedUser.fullName}`);
}