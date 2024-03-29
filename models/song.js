const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => {
        return /(https?:\/\/(?:www\.)?)?(open\.spotify|soundcloud)\.com\/.*$/.test(
          v
        );
      },
      message: (props) =>
        `${props.value} is not a valid Spotify or SoundCloud URL!`,
    },
  },
  summary: {
    type: String,
  },
  artist: { type: Schema.Types.ObjectId, ref: "Artist", required: true },
  genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

songSchema.virtual("url").get(function () {
  return `/catalog/song/${this._id}`;
});

module.exports = mongoose.model("Song", songSchema);
