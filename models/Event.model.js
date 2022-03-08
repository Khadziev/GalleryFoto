const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        text: {
            type: String,
            require: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        child: {
            ref: "Child",
            type: Schema.Types.ObjectId,
        },
    },
    { timestamps: true }
);



const Event = model("Event", eventSchema );

module.exports = Event