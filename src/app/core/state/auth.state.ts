import { signal } from "@angular/core";
import { User } from "../../models/user.model";

export const currentUser=signal<User | null>(null)
export const isLoggedIn = signal(false);

