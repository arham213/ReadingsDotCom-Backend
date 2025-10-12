import mongoose from "mongoose";

const RequestedBookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/
    },
    contactNo: {
        type: String,
        required: true,
        match: /^[0-9]{10,15}$/
    },
    requestType: {
        type: String,
        enum: ['link', 'title'],
        required: true
    },
    url: {
        type: String,
        required: function () {
            return this.requestType === 'link'
        }
    },
    title: {
        type: String,
        required: function () {
            return this.requestType === 'title'
        }
    },
    authorName: {
        type: String,
        required: function () {
            return this.requestType === 'title'
        }
    },
    ISBN: {
        type: String,
    },
    additionalInfo: {
        type: String
    },
    status: {
        type: String,
        enum: ['Approved', 'Pending' ,'Rejected']
    }
}, {timestamps: true})

const RequestedBookModel = mongoose.model('BookRequest', RequestedBookSchema);

export default RequestedBookModel;