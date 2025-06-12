const conversationData = require("../schema/ConversationData");


const fetchAllGroup = async (socket) => {
    try {
        const groupExists = await conversationData.find({});

        if (groupExists) {
            const mergeData = [];

            for (let i = 0; i < groupExists.length; i++) {
                mergeData.push({
                    groupName: groupExists[i].groupName,
                    bio: groupExists[i].bio,
                    createdAt: groupExists[i].createdAt,
                });
            }

            socket.emit("allGroups", {
                message: mergeData,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


const CreateGroup = async (data, socket) => {
    try {
        const { groupName, bio } = data;
        console.log(data);

        const ifExists = await conversationData.findOne({
            groupName: data.groupName,
        });

        if (ifExists) {
            return socket.emit("error", {
                message: "Group name must be Unique."
            });
        }

        const newGroup = new conversationData({
            createdAt: Date.now(),
            groupName: data.groupName,
            bio: data.bio,
        })
        const savedGroup = await newGroup.save();

        socket.emit("groupCreated", {
            message: savedGroup,
        });
    }
    catch (error) {
        console.log(error);
    }
}


const fetchMessages = async (socket, data) => {
    try {
        const { groupName } = data;

        const groupExists = await conversationData.findOne({
            groupName: data.groupName,
        });

        if (groupExists) {
            const mergeData = [];

            for (let i = 0; i < groupExists.content.length; i++) {
                mergeData.push({
                    name: groupExists.content[i].name,
                    email: groupExists.content[i].email,
                    type: groupExists.content[i].type,
                    value: groupExists.content[i].value,
                    time: groupExists.content[i].time,
                });
            }

            socket.emit("allMessages", {
                message: mergeData,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


const SendMessage = async (data, socket) => {
    try {
        const { groupName, name, email, type, value } = data;

        const ifExists = await conversationData.findOne({
            groupName: data.groupName,
        });

        if (ifExists) {

            const newMessage = {
                name: data.name,
                email: data.email,
                type: data.type,
                value: data.value,
                time: Date.now(),
            };

            const updatedConversation = await conversationData.findByIdAndUpdate(
                { _id: ifExists._id },
                {
                    $push: {
                        content: newMessage
                    }
                }
            );

            socket.to(data.groupName).emit("newMessage", {
                message: newMessage,
            });

            socket.emit("newMessage", {
                message: newMessage,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    fetchAllGroup, CreateGroup, SendMessage, fetchMessages
}