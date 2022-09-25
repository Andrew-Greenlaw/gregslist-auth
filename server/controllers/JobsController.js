import { Auth0Provider } from "@bcwdev/auth0provider";
import { get } from "mongoose";
import { jobsService } from "../services/JobsService.js";
import BaseController from "../utils/BaseController.js";

export class JobsController extends BaseController {
  constructor() {
    super('/api/jobs')
    this.router
      .get('', this.getJobs)
      .get('/:jobId', this.getJob)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createJob)
  }
  async createJob(arg0, createJob) {
    throw new Error("Method not implemented.");
  }
  async getJob(req, res, next) {
    try {
      const job = await jobsService.getJob(req.params.jobId)
      res.send(job)
    } catch (error) {
      next(error)
    }
  }
  async getJobs(req, res, next) {
    try {
      const jobs = await jobsService.getJobs()
      res.send(jobs)
    } catch (error) {
      next(error)
    }
  }
}