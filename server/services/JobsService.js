import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class JobsService {
  async getJob(jobId) {
    const job = await dbContext.Jobs.findById(jobId).populate('seller', 'name picture')
    if (!job) {
      throw new BadRequest('Invalid Id')
    }
    return job
  }
  async getJobs() {
    const jobs = await dbContext.Jobs.find()
    return jobs
  }

}
export const jobsService = new JobsService()