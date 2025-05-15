const { APIError } = require('../error');
const Card = require('../models/ftCard.model');

const create = async (title, group, image) => {
  const existCard = await Card.findOne({ title, group, image }).lean();
  if (existCard) {
    throw new APIError('Future Teller card already exists!', 409);
  }

  const card = new Card({
    title,
    group,
    image,
  });
  await card.save();

  return card;
};

const findAllByGroup = async (query) => {
  const cards = await Card.find({ group: query }).lean();
  if (cards.length === 0) {
    throw new APIError('No Future Teller card found!', 404);
  }

  return cards;
};

const findOne = async (id) => {
  const card = await Card.findById(id).lean();
  if (!card) {
    throw new APIError('Future Teller card not found!', 404);
  }

  return card;
};

const update = async (id, title, group, image) => {
  const existCard = await Card.findOne({
    title,
    group,
    image,
    _id: { $ne: id },
  }).lean();
  if (existCard) {
    throw new APIError('Future Teller card already exists!', 409);
  }

  const card = await Card.findByIdAndUpdate(id, { title, group, image }, { new: true });
  if (!card) {
    throw new APIError('Future Teller card not found!', 404);
  }

  return card;
};

const remove = async (id) => {
  const card = await Card.findByIdAndDelete(id);
  if (!card) {
    throw new APIError('Future Teller card not found!', 404);
  }
};

module.exports = { create, findAllByGroup, findOne, update, remove };
