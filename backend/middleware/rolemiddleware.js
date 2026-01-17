

const  isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.send("Admin Access Only");
  }
  else{
    next();
  }
 
};

export default isAdmin;