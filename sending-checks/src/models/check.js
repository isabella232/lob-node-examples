const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Check schema definition
const CheckSchema = new Schema(
    {
        checkId: { type: String, required: true },
        description: { type: String, default: null },
        to: { type: Schema.Types.Mixed, default: null },
        from: { type: Schema.Types.Mixed, default: null },
        bank_account: { type: Object, default: null },
        amount: { type: Number, default: null }
    },    { timestamps: true }
);

// Exports the CheckSchema for use elsewhere.
module.exports = mongoose.model("Check", CheckSchema);
