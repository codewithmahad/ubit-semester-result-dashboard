# Rules for Semester Result Dashboard

## Updating Student Results
- When updating student results from provided result sheets or images, **ONLY** update the results for students that already exist in the target file's `students` array.
- **DO NOT** append missing students or repeater students (e.g., students with an older batch roll number like `EB24...` in an `EB25...` list) to the student array.
- If a student in the provided source data is not found in the existing roster, simply skip them and ignore their result.
