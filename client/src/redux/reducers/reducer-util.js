export const deleteScreamUtl = (screams, id) => {
  console.log("screams:", screams);
  const index = screams.findIndex(scream => scream.screamId === id);
  console.log("index:", index);
  console.log("splice:", screams.splice(index, 1));
  return screams.splice(index, 1);
};
