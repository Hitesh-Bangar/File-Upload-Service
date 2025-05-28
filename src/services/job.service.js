import { Job } from '../models/index.js';

export async function createJob(data) {
  return Job.create(data);
}

export async function updateJob(id, fields) {
  return Job.update(fields, { where: { id } });
}
