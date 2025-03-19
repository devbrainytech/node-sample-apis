import testSequelize from '../setup';

export const resetDatabase = async () => {
  await testSequelize.sync({ force: true });
};

export const closeDatabase = async () => {
  await testSequelize.close();
};
