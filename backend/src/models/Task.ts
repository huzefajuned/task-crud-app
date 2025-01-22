import mongoose from "mongoose"
import { z } from "zod"

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
})

export type TaskInput = z.infer<typeof taskSchema>

export interface ITask extends TaskInput {
  _id: string
  timestamp: Date
}

const taskMongooseSchema = new mongoose.Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
})

export const Task = mongoose.model<ITask>("Task", taskMongooseSchema)

