const User = require("../modal/userModal");
const Discussions = require("../modal/discussionModal");
const Comments = require("../modal/commentsModal");


const getAllUser = async(req, res) => {
  try {
        const users = await User.find({isVerified: true});
        res.status(200).json({"users": users});
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllComment = async(req, res) => {
  try {
        const comments = await Comments.find({ reports: { $exists: true, $not: { $size: 0 } } });
        res.status(200).json({"comments": comments});
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteComment = async(req, res) => {
    try {
        const { _id, key } = req.params;
        const comment = Comments.findById(_id);
        if(key == process.env.ADMIN_KEY) {
            if(comment) {
                const discussionId = comment.discussionId;
                await Comments.findOneAndDelete(_id);
                await Discussions.findOneAndUpdate({_id: discussionId},{$pull: {comments: _id}},{new: true});
                res.status(200).json({"message": "Comment deleted successfully"});
            } else {
                res.status(200).json({"message": "Comment doesnt exist"});
            }
        } else {
            res.status(200).json({"message": "Invalid Admin Key"});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteUser = async(req, res) => {
    try {
        const { _id, key } = req.params;
        const user = User.findById(_id);
        if(key == process.env.ADMIN_KEY) {
            if(user) {
                await User.findOneAndDelete(_id);
                res.status(200).json({"message": "User deleted successfully"});
            } else {
                res.status(200).json({"message": "User doesnt exist"});
            }
        } else {
            res.status(200).json({"message": "Invalid Admin Key"});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getAllUser, getAllComment, deleteComment, deleteUser };