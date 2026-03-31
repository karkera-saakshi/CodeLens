import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  profile: z.object({
    avatar: z.string().optional(),
    bio: z.string().optional(),
    college: z.string().optional(),
    location: z.string().optional(),
    skills: z.array(
      z.object({
        name: z.string(),
        level: z.enum(["beginner", "intermediate", "advanced"])
      })
    ).optional()
  }).optional(),
  handles: z.object({
    codeforces: z.string().optional(),
    leetcode: z.string().optional(),
    github: z.string().optional()
  }).optional(),
  preferences: z.object({
    theme: z.enum(["light", "dark"]).optional(),
    emailNotifications: z.boolean().optional()
  }).optional()
});

const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.errors
        });
      }
      next(error);
    }
  };
};

export { updateProfileSchema, validate };
