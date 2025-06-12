const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
    },
    groupName: {
        type: String,
    },
    bio: {
        type: String,
    },
    content: [
        {
            name: {
                type: String,
            },
            email: {
                type: String,
            },
            type: {
                type: String,
                enum: ['text', 'image', 'pdf'],
            },
            value: {
                type: String,
            },
            time: {
                type: Date,
            }
        }
    ],
})


const conversationData = new mongoose.model("conversation", conversationSchema);

module.exports = conversationData;