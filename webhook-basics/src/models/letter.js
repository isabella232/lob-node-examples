const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Letter schema definition
var LetterSchema = new Schema(
  {
    letterId: { type: String, required: true },
    description: { type: String, default: null },
    metadata: { type: Schema.Types.Mixed, default: null },
    to: { type: Schema.Types.Mixed, default: null },
    from: { type: Schema.Types.Mixed, default: null },

    color: { type: Boolean, default: true },
    double_sided: { type: String, required: true },
    address_placement: { type: String, default: null },
    return_envelope: { type: Boolean, default: false },
    perforated_page: { type: String, default: null },
    custom_envelope: { type: String, default: null },
    extra_service: { type: String, default: null },
    mail_type: { type: String, default: null },
    url: { type: String, default: null },
    merge_variables: { type: Schema.Types.Mixed, default: null },
    template_id: { type: String, default: null },
    template_version_id: { type: String, default: null },
    carrier: { type: String, default: null },
    tracking_number: { type: String, default: null },
    tracking_events: [Array],
    thumbnails: [
      {
        small: { type: String, default: null },
        medium: { type: String, default: null },
        large: { type: String, default: null },
      }
    ],
    expected_delivery_date: { type: String, default: null },
    date_created: { type: Date, default: null },
    date_modified: { type: Date, default: null },
    send_date: { type: Date, default: null },
    object: { type: String, default: null },

    // For event tracking
    reference_id: { type: String, default: null },
    event_id:  {  type: String, default: null },
    event_type:  { type: Schema.Types.Mixed, default: null }

  },
  { timestamps: true }
);

// Exports the LetterSchema for use elsewhere.
module.exports = mongoose.model("Letter", LetterSchema);