const User = require("../modal/userModal");
const bcrypt = require("bcrypt");
const sendVerificationEmail = require("../utils/email");

const imgs = [
  "https://i.ibb.co/56w2WWV/images-q-tbn-ANd9-Gc-Qo-Wng-A9o-rk-TEZWKg-T3zgh-QCmh-DR-Q2-KFm-Q3dt-Pw-W0-Co-Hio-B-m-VFQ44rdxd9-FQM4.jpg",
 "https://i.ibb.co/HG41T5g/images-q-tbn-ANd9-Gc-SIZBPpit-WVw-Vv-OWR3yn-Ki-Kg-HEYEm-Q2-Zm487w-usqp-CAU.jpg", 
 "https://i.ibb.co/Lg0Wv8y/images-q-tbn-ANd9-Gc-Sspe4-Sy-j-XWf-Fw-QIp-Qpr-FPav-DGK5-SKArfhrw-usqp-CAU.jpg", 
 "https://i.ibb.co/sJPVdF8/2wPVNZ.jpg", 
 "https://i.ibb.co/QH8H6g5/wp10142858.jpg"];

const addUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;

      // Check if user already exists
      const user = await User.findOne({"email": email});
      if (user && user.isVerified == true) {
        return res.status(400).json({ error: 'User already exists' });
      }
      if(!user) {
        // Hash the password and store the user in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        const random = Math.floor(verificationCode%5);
        console.log(random);
        await User.create({ name, email, password: hashedPassword, verificationCode: verificationCode, profile:  imgs[random]});
        await sendVerificationEmail(email, verificationCode);

        res.status(201).json({ message: `Verification code send to ${email}` });
      } else {
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const hashedPassword = await bcrypt.hash(password, 10);

        user.verificationCode = verificationCode;
        user.name = name;
        user.password = hashedPassword;

        await user.save();
        await sendVerificationEmail(email, verificationCode);

        res.status(201).json({ message: `Verification code send to ${email}` });
      }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const verify = async(req, res) => {
  try {
    const {email, verificationCode} = req.body;
    const user = await User.findOne({ "email": email });
      if (!user) {
          return res.status(401).json({ error: 'User Doesnt exist' });
      }
      console.log(user.v)
    if(user.verificationCode == verificationCode) {
      user.isVerified = true;
      await user.save();
      res.status(200).json({message: "Verification Successfull"});
    } else {
      res.status(400).json({error: "Invalid OTP"});
    }
    
  } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const loginUser = async(req, res) => {
    try {

        const { email, password } = req.body;

      // Find the user in the database
        const user = await User.findOne({ "email": email, isVerified: true });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

      // Check if the password matches the hashed password in the database
        const passwordMatches = await bcrypt.compare(password, user.password);
        console.log(passwordMatches);
        console.log(user);
        if (!passwordMatches) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
         //res.json({ token });
        res.json(user);

    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const changePassword = async(req, res) => {
  try {
    const {email, password} = req.body;
    const user = User.findOne({"email": email, isVerified: true});
    if(user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
      await User.updateOne({"email": email}, {"$set": {"password": hashedPassword, "isVerified": false, "verificationCode": verificationCode}});
      await sendVerificationEmail(email, verificationCode);

      res.status(201).json({ message: `Verification code send to ${email}` });
    } else {
      res.status(400).json({error: "User Doesnt exists"});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const toggleBookmark = async(req, res) => {
  try {
    const { _id, animeId } = req.body;
    const user = await User.findOne({"_id": _id, isVerified: true});
    if(user) {
      if(user.bookmarks.includes(animeId)) {
        await User.findOneAndUpdate({"_id": _id}, {"$pull": {"bookmarks": animeId}});
        res.status(201).json({message: `Bookmark removed to ${animeId}`});
      } else {
        user.bookmarks.push(animeId);
        await user.save();
        res.status(201).json({message: `Bookmark added to ${animeId}`});
      }
    } else {
      res.status(201).json({message: "User doesnt Exist"});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getBookmarks = async(req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findOne({"_id": _id, isVerified: true});
    if(user) {
      res.status(200).json(user.bookmarks);
    } else {
      res.status(201).json({message: "User doesnt Exist"});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const changeProfile = async(req, res) => {
  try {
    const { _id, image } = req.body;
    const user = await User.find({"_id": _id, isVerified: true});
    if(user) {
      user.profile = image;
      await user.save();
      res.status(200).json({"message": "Proflie changed successfully"});
    } else {
      res.status(200).json({error: "User Doesnt exists"});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  } 
}

const changeName = async(req, res) => {
  try {
    const {_id, name} = req.body;
    const user = User.find({"_id": _id, isVerified: true})
    if(user) {
      await User.updateOne({"_id": _id}, {"$set": {"name": name}});
      res.status(200).json({message: "name Updated"});
    } else {
      res.status(200).json({error: "User Doesnt exists"});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
} 

const addHistory = async(req, res) => {
  try {
    const {_id, animeId, epId} = req.body;
    const user = User.find({"_id": _id, isVerified: true})
    if(user) {
      const newAnime = {
        animeId: animeId,
        epId: epId
      }
      user.history.push(newAnime);
      await user.save();
      res.status(200).json({message: "history updated"});
    } else {
      res.status(200).json({error: "User Doesnt exists"});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getHistory = async(req, res) => {
  try {
    const {_id} = req.params;
    const user = User.find({"_id": _id, isVerified: true})
    if(user) {
      res.status(200).json(user.history);
    } else {
      res.status(200).json({error: "User Doesnt exists"});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const clearHistory = async(req, res) => {
  try {
    const {_id} = req.params;
    const user = User.find({"_id": _id, isVerified: true})
    if(user) {
      user.history = [];
      await user.save();
      res.status(200).json({message: "history deleted"});
    } else {
      res.status(200).json({error: "User Doesnt exists"});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getUser = async(req, res) => {
  try {
    const {_id} = req.params;
    const user = await User.findOne({"_id": _id, isVerified: true});
    console.log(user);
    if(user) {
      res.status(200).json({user: user});
    } else {
      res.status(200).json({error: "User Doesnt exists"});
    }
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = { addUser, loginUser,  changePassword,  verify, getBookmarks, toggleBookmark, changeName,  changeProfile, getHistory, addHistory, clearHistory, getUser };