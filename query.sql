-- UPDATE users SET password = 'newpass' WHERE id = 2;
-- SELECT * FROM courses;
SELECT 
    students.id AS student_id,
    CONCAT(first_name, ' ', last_name) AS full_name,
    course_id,
    name,
    type
FROM students
LEFT JOIN courses
ON students.course_id = courses.id