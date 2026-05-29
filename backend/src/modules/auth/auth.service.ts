import { prisma } from "../../config/db";
import { generateToken } from "../../utils/jwt";
import { LoginInput, RegisterInput } from "./auth.types";
import bcrypt from "bcrypt";

export const registerUser = async (data: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export const loginUser = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if(!isPasswordValid){
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.id);

  return {
    user : {
        id:user.id,
        name:user.name,
        email:user.email
    },
    token,
  }
};
