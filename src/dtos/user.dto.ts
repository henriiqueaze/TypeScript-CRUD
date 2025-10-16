import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserDTO {
  @IsString()
  @IsNotEmpty({ message: "The name field cannot be empty" })
  name!: string;

  @IsEmail({}, { message: "Invalid Email" })
  @IsNotEmpty({ message: "The email field cannot be empty" })
  @IsString()
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "The password field cannot be empty" })
  @MinLength(6, { message: "the password field must have at least 6 characters"})
  password!: string;
}
