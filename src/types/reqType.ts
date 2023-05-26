import { User } from "@prisma/client";
import { Request} from "express";
import { type } from "os";

export type AuthRequest = Request & {user?: User}