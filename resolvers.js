const { User, SpinList, Name } = require('./db');

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.findAll();
    },
    getSpinLists: async () => {
      return await SpinList.findAll();
    },
    getNames: async (_, { spinListId }) => {
      return await Name.findAll({ where: { SpinListId: spinListId } });
    },
    getRandomName: async (_, { spinListId }) => {
      const names = await Name.findAll({ where: { SpinListId: spinListId } });
      if (names.length === 0) return null;
      return names[Math.floor(Math.random() * names.length)];
    },
  },
  Mutation: {
    createUser: async (_, { username }) => {
      return await User.create({ username });
    },
    createSpinList: async (_, { userId, title }) => {
      const user = await User.findByPk(userId);
      if (!user) throw new Error('User not found');
      const spinList = await SpinList.create({ title, UserId: userId });
      console.log('Created SpinList:', spinList.toJSON());
      return spinList;
    },
    addName: async (_, { spinListId, value }) => {
      const spinList = await SpinList.findByPk(spinListId);
      if (!spinList) throw new Error('SpinList not found');
      return await Name.create({ value, SpinListId: spinListId });
    },
    clearNames: async (_, { spinListId }) => {
      await Name.destroy({ where: { SpinListId: spinListId } });
      return true;
    },
    spinTemporaryNames: async(_, { names }) => {
      if(!names || names.length === 0) {
        throw new Error('Please provide at least one name')
      }
      const randomIndex = Math.floor(Math.random() * names.length);
      return names[randomIndex];
    }
  },
  User: {
    spinLists: async (parent) => {
      const spinLists = await SpinList.findAll({ where: { UserId: parent.id } });
      console.log(`SpinLists for User ${parent.id}:`, spinLists);
      return spinLists;
    },
  },
  SpinList: {
    user: async (parent) => {
      return await User.findByPk(parent.UserId);
    },
    names: async (parent) => {
      return await Name.findAll({ where: { SpinListId: parent.id } });
    },
  },
  Name: {
    spinList: async (parent) => {
      return await SpinList.findByPk(parent.SpinListId);
    },
  },
};

module.exports = resolvers;
