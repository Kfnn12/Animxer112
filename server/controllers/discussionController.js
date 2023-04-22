const Discussions = require("../modal/discussionModal");
const Comments = require("../modal/commentsModal");

//Retrieve all the comments of a particular episode
const getComments = async(req, res) => {
    try {
        const _id = req.params._id;    
        const discussion = await Discussions.findById(_id).populate({ path: 'comments', populate: { path: "sender"}});
        if(discussion) {
            res.status(200).json(discussion);
        }
        else
            res.status(200).send("");
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const storeComments = async(req, res) => {
    try {
        const {sender, comment, _id} = req.body;

        const discussion = await Discussions.findById(_id);
        const newComment = new Comments({"sender": sender, "comment": comment, discussionId: _id});
        const savedComment = await newComment.save();
        if(discussion) {
            discussion.comments.push(savedComment._id);
            await discussion.save();
            res.status(201).json(discussion.comments);
        } else {
            const newDiscussion = await Discussions.create({"_id": _id, comments:[savedComment._id]});
            res.status(201).json(newDiscussion.comments);
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = {getComments, storeComments};