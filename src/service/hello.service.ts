import Hello from "../model/Hello.model";

async function findOne(): Promise<Hello | null> {
  return await Hello.findOne({ raw: true });
}

export default {
  findOne,
};
