import React, { useState, useEffect } from "react";
import CourseList from './CourseList';
import courseStore from '../stores/courseStore';
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";
import { toast } from 'react-toastify';



function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());


  useEffect(() => {
    courseStore.addChangeListener(onChange); //qui ci stiamo iscrivendo allo store 
    courseStore.getCourses().length === 0 && loadCourses();
    return () => courseStore.removeChangeListener(onChange); //pulisce quando ci spostiamo su un altra pagina
  }, []);

  const onChange = () => {
    setCourses(courseStore.getCourses());    
  }
  const handleDelete = (id) => {
     deleteCourse(id);
     toast.success('Course removed.')

  }
  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} deleteCourse={handleDelete}/>
    </>
  );
}

export default CoursesPage;
