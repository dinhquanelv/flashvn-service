const { APIError } = require('../error');
const Suggest = require('../models/ftSuggest.model');

const create = async (step, time, title, content, suggest, emoji) => {
  const existSuggest = await Suggest.findOne({ step, time, title, content, suggest, emoji }).lean();
  if (existSuggest) {
    throw new APIError('Future Teller suggest already exists!', 409);
  }

  const newSuggest = new Suggest({ step, time, title, content, suggest, emoji });
  await newSuggest.save();

  return newSuggest;
};

const findAll = async () => {
  const suggests = await Suggest.find().lean();
  if (suggests.length === 0) {
    throw new APIError('No Future Teller suggests found!', 404);
  }

  return suggests;
};

const findOne = async (id) => {
  const suggest = await Suggest.findById(id).lean();
  if (!suggest) {
    throw new APIError('Future Teller suggest not found!', 404);
  }

  return suggest;
};

const update = async (id, step, time, title, content, suggest, emoji) => {
  const existSuggest = await Suggest.findOne({ step, time, title, content, suggest, emoji, _id: { $ne: id } });
  if (existSuggest) {
    throw new APIError('Future Teller suggest already exists!', 409);
  }

  const updatedSuggest = await Suggest.findByIdAndUpdate(
    id,
    { step, time, title, content, suggest, emoji },
    { new: true },
  );
  if (!updatedSuggest) {
    throw new APIError('Future Teller suggest not found!', 404);
  }

  return updatedSuggest;
};

const remove = async (id) => {
  const deletedSuggest = await Suggest.findByIdAndDelete(id);
  if (!deletedSuggest) {
    throw new APIError('Future Teller suggest not found!', 404);
  }
};

module.exports = { create, findAll, findOne, update, remove };
